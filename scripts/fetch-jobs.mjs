// scripts/fetch-jobs.mjs
// ---------------------------------------------------------------------------
// Daily job fetcher: asks Cline (OpenAI-compatible chat completions) for fresh
// openings at product-based companies and stores them in the Firestore
// "jobs" collection — which the MAANG Preparation page renders live.
//
// Rules enforced by the prompt AND validated here:
//   - Product-based companies only (no service/consulting firms)
//   - Direct apply links only (no career-portal homepages)
//
// Zero npm dependencies: uses Node's built-in crypto for the Google service
// account JWT and Firestore's REST API for reads/writes.
//
// Environment:
//   CLINE_API_KEY            - Cline API key (app.cline.bot)
//   CLINE_BASE_URL           - optional, default https://api.cline.bot/api/v1
//   CLINE_MODELS             - optional, comma-separated failover model list
//   FIREBASE_SERVICE_ACCOUNT - Firestore service account JSON (single line)
//   FIREBASE_PROJECT_ID      - optional (falls back to service account project)
//
// Model failover: models are resolved in order
//   1. Firestore clineModels/global doc (admin console "Cline Models" tab)
//   2. CLINE_MODELS env
//   3. built-in defaults
// If one model fails (rate limit, 401/402/403, 5xx), the next one is tried.
// ---------------------------------------------------------------------------

import crypto from "node:crypto";

const CLINE_BASE_URL = (
  process.env.CLINE_BASE_URL || "https://api.cline.bot/api/v1"
).replace(/\/+$/, "");
const CLINE_API_KEY = process.env.CLINE_API_KEY || process.env.VITE_CLINEC_API_KEY;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "";

const FAILOVER_STATUS_CODES = new Set([401, 402, 403, 408, 429, 500, 502, 503, 504]);

const DEFAULT_MODELS = [
  "nvidia/nemotron-3.5-super-vl:free",
  "meta/muse-spark-open",
  "xingchen-agi/xing4.0-29b-a4b:free",
  "reflection/beam-1.0-501b-a23b",
];

// --- Google service account auth (RS256 JWT -> OAuth access token) ----------

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function serviceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT env is required (service account JSON).");
  }
  return JSON.parse(raw);
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/datastore",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claims}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsigned)
    .sign(sa.private_key);
  const jwt = `${unsigned}.${base64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token exchange failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()).access_token;
}

// --- Firestore REST helpers --------------------------------------------------

function docsUrl(projectId, collection, documentId) {
  const base = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}`;
  return documentId ? `${base}/${documentId}` : base;
}

function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(toFirestoreValue) } };
  }
  return {
    mapValue: {
      fields: Object.fromEntries(
        Object.entries(value)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, toFirestoreValue(v)]),
      ),
    },
  };
}

function fromFirestoreValue(v) {
  if (v === null || v === undefined) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) {
    const date = new Date(v.timestampValue);
    return { toDate: () => date, seconds: Math.floor(date.getTime() / 1000) };
  }
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(fromFirestoreValue);
  if ("mapValue" in v) {
    return Object.fromEntries(
      Object.entries(v.mapValue.fields || {}).map(([k, fv]) => [k, fromFirestoreValue(fv)]),
    );
  }
  return null;
}

function docToObj(doc) {
  const out = { id: doc.name.split("/").pop() };
  for (const [k, v] of Object.entries(doc.fields || {})) out[k] = fromFirestoreValue(v);
  return out;
}

async function firestore(token, projectId, method, collection, { documentId, body } = {}) {
  const res = await fetch(docsUrl(projectId, collection, documentId), {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firestore ${method} ${collection} failed (${res.status}): ${text}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}


// --- Cline chat with model failover -----------------------------------------

async function clineChatWithFailover(models, prompt) {
  let lastError = null;
  for (const model of models) {
    try {
      const res = await fetch(`${CLINE_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CLINE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          stream: false,
          temperature: 0.5,
        }),
      });

      if (!res.ok) {
        lastError = new Error(`Model "${model}" returned HTTP ${res.status}`);
        if (!FAILOVER_STATUS_CODES.has(res.status)) throw lastError;
        console.warn(`⚠ Model "${model}" failed (HTTP ${res.status}), trying next…`);
        continue;
      }

      const data = await res.json();
      const choices = data?.data?.choices ?? data?.choices ?? [];
      const content = choices?.[0]?.message?.content || "";
      if (!content) {
        lastError = new Error(`Model "${model}" returned an empty response`);
        continue;
      }
      console.log(`✓ Model "${model}" answered.`);
      return content;
    } catch (err) {
      lastError = err;
      if (err.name === "TypeError" && err.message.includes("fetch")) continue;
      console.warn(`⚠ Model "${model}" error: ${err.message}, trying next…`);
    }
  }
  throw lastError || new Error("All Cline models failed.");
}

// --- Job validation (mirrors src/utils/jobs.js rules) ------------------------

function isValidJob(job) {

// --- Prompt + main ------------------------------------------------------------

const JOBS_PROMPT = `You are a job research assistant. Find currently OPEN job openings at PRODUCT-BASED technology companies only.

Product-based companies include: Google, Meta, Amazon, Apple, Netflix, Microsoft, Adobe, Uber, Nvidia, Atlassian, Salesforce, Zoho, Flipkart, Swiggy, Zerodha, Razorpay, PhonePe, Freshworks, Postman, Databricks, Snowflake, Stripe, Airbnb, Spotify, LinkedIn, Twitter/X, Oracle (product teams), IBM (product teams), Samsung R&D, Qualcomm, Intuit, VMware, Cloudflare, Figma, Notion, Datadog.

EXCLUDE service/consulting companies: TCS, Infosys, Wipro, HCL, Capgemini, Accenture, Cognizant, Tech Mahindra, LTIMindtree, WNS, EXL, NTT Data, Deloitte, EY, KPMG, PwC, Sapient, Luxoft, GlobalLogic, EPAM.

For each job provide:
- title: exact job title
- company: company name
- description: 1-2 sentence summary of the role and responsibilities
- experience: required experience range (e.g. "0-2 years", "3-5 years")
- applyLink: the DIRECT job application link (ATS links like boards.greenhouse.io/<company>/jobs/<id>, jobs.lever.co/<company>/<id>, or the company's own apply page for a specific job ID). NEVER link a generic careers homepage.

Return ONLY a JSON array of 8-10 jobs. No other text. Make sure every apply link points to a specific individual job posting, not a company career home page.`;

async function main() {
  if (!CLINE_API_KEY) throw new Error("CLINE_API_KEY env is required.");
  const sa = serviceAccount();
  const projectId = FIREBASE_PROJECT_ID || sa.project_id;
  if (!projectId) throw new Error("FIREBASE_PROJECT_ID or service account project_id required.");

  console.log(`Fetching jobs via Cline (${CLINE_BASE_URL})…`);
  const token = await getAccessToken(sa);

  // 1. Resolve model list: Firestore admin config > CLINE_MODELS env > defaults.
  let models = DEFAULT_MODELS;
  try {
    const cfg = await firestore(token, projectId, "GET", "clineModels/global");
    const configured = cfg?.fields?.models?.arrayValue?.values;
    if (configured?.length) {
      models = configured.map((v) => v.stringValue).filter(Boolean);
      console.log(`Models from admin console: ${models.join(", ")}`);
    }
  } catch (_) {
    console.log("clineModels/global not found — using default model list.");
  }
  if (process.env.CLINE_MODELS) {
    const envModels = process.env.CLINE_MODELS
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);
    if (envModels.length) models = envModels;
  }

  // 2. Existing apply links (for dedupe).
  const existingLinks = new Set();
  const listRes = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/jobs?pageSize=500`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (listRes.ok) {
    const listData = await listRes.json();
    for (const doc of listData.documents || []) {
      const obj = docToObj(doc);
      if (obj.applyLink) existingLinks.add(String(obj.applyLink).toLowerCase());
    }
  }
  console.log(`${existingLinks.size} existing job(s) in Firestore.`);

  // 3. Ask Cline for fresh jobs (with automatic model failover).
  const raw = await clineChatWithFailover(models, JOBS_PROMPT);
  const jobs = parseJobsJson(raw).filter(isValidJob);
  console.log(`${jobs.length} valid job(s) in Cline response.`);

  // 4. Store only new links in Firestore.
  let added = 0;
  let skipped = 0;
  for (const job of jobs) {
    const link = String(job.applyLink).trim();
    if (existingLinks.has(link.toLowerCase())) {
      skipped++;
      continue;
    }
    await firestore(token, projectId, "POST", "jobs", {
      body: {
        fields: {
          title: toFirestoreValue(String(job.title).trim()),
          company: toFirestoreValue(String(job.company).trim()),
          description: toFirestoreValue(String(job.description).trim()),
          experience: toFirestoreValue(String(job.experience).trim()),
          applyLink: toFirestoreValue(link),
          source: toFirestoreValue("cline"),
          createdAt: { timestampValue: new Date().toISOString() },
          updatedAt: { timestampValue: new Date().toISOString() },
        },
      },
    });
    existingLinks.add(link.toLowerCase());
    added++;
    console.log(`+ ${job.title} @ ${job.company}`);
  }

  console.log(`\nDone. ${added} new job(s) added, ${skipped} duplicate(s) skipped.`);
}

main().catch((err) => {
  console.error("fetch-jobs failed:", err.message);
  process.exit(1);
});

  if (!job?.title || !job?.company || !job?.description || !job?.experience || !job?.applyLink) {
    return false;
  }
  const link = String(job.applyLink).trim();
  if (!/^https?:\/\//i.test(link)) return false;
  const lower = link.toLowerCase();
  // Reject career-portal landing pages.
  if (/\b(careers|career-portal|work-with-us|join-us)\b/i.test(lower)) return false;
  if (/\/(jobs|careers)\/?$/i.test(lower)) return false; // bare listing home
  return true;
}

function parseJobsJson(text) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start === -1 || end === -1) {
    throw new Error("No JSON array found in Cline response.");
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}
