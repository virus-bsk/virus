// Firebase utils for managing product-based company jobs.
// Path: jobs/{auto-id} collection, updated by admin, read by MAANG prep page.
// Only direct apply links, product-based companies only.
import {
  addDocument,
  getCollection,
  removeDocument,
  serverTimestamp,
  subscribeCollection,
  updateDocument,
} from "./firestore";
import { clineChat } from "../services/cline";

export const JOBS_COLLECTION = "jobs";

// Validate that a job entry meets the requirements:
// - Direct apply link (not a career portal)
// - Product-based company
export function validateJob(job) {
  const errors = [];
  if (!job.title?.trim()) errors.push("Job title is required");
  if (!job.company?.trim()) errors.push("Company name is required");
  if (!job.description?.trim()) errors.push("Description is required");
  if (!job.experience?.trim()) errors.push("Experience is required");
  if (!job.applyLink?.trim()) errors.push("Apply link is required");

  // Check for direct apply link (not a career portal home page).
  // Note: boards.greenhouse.io/<co>/jobs/<id> and jobs.lever.co/<co>/<id>
  // ARE direct links even though the URL contains the word "jobs".
  const link = job.applyLink?.trim();
  if (link) {
    let host;
    let path;
    try {
      const url = new URL(link);
      host = url.hostname.toLowerCase();
      path = url.pathname.toLowerCase().replace(/\/+$/, "");
    } catch {
      errors.push("Apply link must be a valid URL");
      return errors;
    }
    const blockedHosts = ["careers", "jobs", "recruiting", "talent", "hire"];
    const isBlockedHost = blockedHosts.some(
      (h) => host === h || host.startsWith(`${h}.`),
    );
    const blockedPaths = ["/careers", "/jobs", "/hiring", "/openings", "/open-roles"];
    const isBlockedPath = blockedPaths.includes(path);
    if (isBlockedHost || isBlockedPath) {
      errors.push("Apply link must be a direct job application link, not a career portal");
    }
  }

  return errors;
}

// Add a new job.
export async function addJob(job) {
  const errors = validateJob(job);
  if (errors.length > 0) {
    return { ok: false, error: errors.join(". ") };
  }
  const res = await addDocument(JOBS_COLLECTION, {
    ...job,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return res;
}

// Get all jobs.
export async function getJobs() {
  const res = await getCollection(JOBS_COLLECTION);
  if (!res.ok) return { ok: false, error: res.error };
  return { ok: true, value: res.value || [] };
}

// Subscribe to jobs (live updates).
export function subscribeJobs(callback) {
  return subscribeCollection(JOBS_COLLECTION, callback);
}

// Update a job.
export async function updateJob(jobId, updates) {
  const errors = validateJob({ ...updates });
  if (errors.length > 0) {
    return { ok: false, error: errors.join(". ") };
  }
  const res = await updateDocument(`${JOBS_COLLECTION}/${jobId}`, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
  return res;
}

// Remove a job.
export async function removeJob(jobId) {
  return await removeDocument(`${JOBS_COLLECTION}/${jobId}`);
}

// Prompt used by the AI job finder (same rules as scripts/fetch-jobs.mjs).
export const FIND_JOBS_PROMPT = `You are a job research assistant. Find currently OPEN job openings at PRODUCT-BASED technology companies only.

Product-based companies include: Google, Meta, Amazon, Apple, Netflix, Microsoft, Adobe, Uber, Nvidia, Atlassian, Salesforce, Zoho, Flipkart, Swiggy, Zerodha, Razorpay, PhonePe, Freshworks, Postman, Databricks, Snowflake, Stripe, Airbnb, Spotify, LinkedIn, Twitter/X, Oracle (product teams), IBM (product teams), Samsung R&D, Qualcomm, Intuit, VMware, Cloudflare, Figma, Notion, Datadog.

EXCLUDE service/consulting companies: TCS, Infosys, Wipro, HCL, Capgemini, Accenture, Cognizant, Tech Mahindra, LTIMindtree, WNS, EXL, NTT Data, Deloitte, EY, KPMG, PwC, Sapient, Luxoft, GlobalLogic, EPAM.

For each job provide:
- title: exact job title
- company: company name
- description: 1-2 sentence summary of the role and responsibilities
- experience: required experience range (e.g. "0-2 years", "3-5 years")
- applyLink: the DIRECT job application link (ATS links like boards.greenhouse.io/<company>/jobs/<id>, jobs.lever.co/<company>/<id>, or the company's own apply page for a specific job ID). NEVER link a generic careers homepage.

Return ONLY a JSON array of 8-10 jobs. No other text. Make sure every apply link points to a specific individual job posting, not a company career home page.`;

// Extract the first JSON array from an AI response (strips code fences/prose).
function parseJobsJson(raw) {
  if (Array.isArray(raw)) return raw;
  let text = String(raw || "").trim();
  text = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    /* fall through to regex extraction */
  }
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) return [];
  try {
    return JSON.parse(match[0]);
  } catch {
    return [];
  }
}

// Ask Cline AI for fresh product-company jobs and store the new ones in
// Firestore. Used by the admin "Find Jobs with AI (Now)" button; the same
// job flow runs automatically every night via the GitHub Actions cron.
// Returns { ok, added, skipped, error? }.
export async function fetchJobsWithAI() {
  const raw = await clineChat(FIND_JOBS_PROMPT);
  const parsed = parseJobsJson(raw);
  if (parsed.length === 0) {
    return { ok: false, error: "AI returned no jobs. Try again." };
  }

  // Existing apply links, for dedupe.
  const existing = await getJobs();
  const existingLinks = new Set(
    (existing.ok ? existing.value : []).map((j) =>
      String(j.applyLink || "").toLowerCase(),
    ),
  );

  let added = 0;
  let skipped = 0;
  const seenInBatch = new Set();
  for (const item of parsed) {
    const job = {
      title: String(item.title || "").trim(),
      company: String(item.company || "").trim(),
      description: String(item.description || "").trim(),
      experience: String(item.experience || "").trim(),
      applyLink: String(item.applyLink || item.link || "").trim(),
    };
    const linkKey = job.applyLink.toLowerCase();
    if (validateJob(job).length > 0 || !linkKey || seenInBatch.has(linkKey)) {
      continue;
    }
    if (existingLinks.has(linkKey)) {
      skipped++;
      continue;
    }
    const res = await addJob(job);
    if (res.ok) {
      added++;
      seenInBatch.add(linkKey);
      existingLinks.add(linkKey);
    }
  }
  return { ok: true, added, skipped };
}

// ---------------------------------------------------------------------------
// Manual trigger for the daily jobs cron workflow
// (.github/workflows/fetch-jobs.yml). The automatic schedule (06:00 UTC
// daily) is NOT changed — this only dispatches an EXTRA run of the same
// workflow on demand via GitHub's REST API (workflow_dispatch), e.g. from
// the admin console's "Run Daily Fetch Cron Now" button.
//
// Requires VITE_GITHUB_DISPATCH_TOKEN: a fine-grained personal access token
// scoped to THIS repository only, with Account permissions -> Actions:
// Read and write. Optional VITE_GITHUB_REPO overrides the target
// (default bskcoding/bskcoding).
// Returns { ok, error? }.
// ---------------------------------------------------------------------------
export const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || "bskcoding/bskcoding";
export const GITHUB_FETCH_WORKFLOW_URL = `https://github.com/${GITHUB_REPO}/actions/workflows/fetch-jobs.yml`;

export async function runDailyJobsCron() {
  const token = import.meta.env.VITE_GITHUB_DISPATCH_TOKEN;
  if (!token) {
    return {
      ok: false,
      error:
        "Manual trigger is not configured: set VITE_GITHUB_DISPATCH_TOKEN (fine-grained PAT, Actions: Read and write) in .env / GitHub secrets. The daily 06:00 UTC cron still runs on schedule.",
    };
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/fetch-jobs.yml/dispatches`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ref: "main" }),
      },
    );

    // 204 No Content on success.
    if (res.ok) return { ok: true };

    let detail = "";
    try {
      const data = await res.json();
      if (data?.message) detail = ` — ${data.message}`;
    } catch {
      /* non-JSON error body */
    }
    const hints = {
      401: "Token is invalid or expired.",
      403: "Token does not have Actions read/write access to the repository.",
      404: "Repository or workflow not found (check VITE_GITHUB_REPO and token scope).",
      422: "Workflow file is missing from the main branch or lacks a workflow_dispatch trigger.",
    };
    return {
      ok: false,
      error: `GitHub dispatch failed (${res.status})${detail}. ${hints[res.status] || "Try again."}`,
    };
  } catch (err) {
    return { ok: false, error: `GitHub dispatch failed: ${err.message}` };
  }
}

export default {
  JOBS_COLLECTION,
  validateJob,
  addJob,
  getJobs,
  subscribeJobs,
  updateJob,
  removeJob,
  FIND_JOBS_PROMPT,
  fetchJobsWithAI,
  GITHUB_REPO,
  GITHUB_FETCH_WORKFLOW_URL,
  runDailyJobsCron,
};