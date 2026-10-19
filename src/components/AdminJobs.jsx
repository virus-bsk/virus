// Admin console — AI Jobs tab (semi-automatic application pipeline: paste a
// job description, Gemini scores fit against the saved profile and drafts a
// cover letter plus tailored resume bullets, then one click opens the job
// page for manual submission. LinkedIn/Naukri block automated posting from
// the browser (CORS + ToS), so submission stays human — everything before it
// is automated here). Visible only inside the hidden admin console.
import { useEffect, useMemo, useState } from "react";
import {
  addDocument,
  asDate,
  getCollection,
  getDocument,
  removeDocument,
  serverTimestamp,
  setDocument,
  updateDocument,
} from "../utils/firestore";
import { auth } from "../firebase";
import { userDocId } from "../utils/userProfile";
import "../pages/Admin.css";

const JOBS = "jobApps";
const PROFILE_PATH = "jobProfile/admin";

// Dynamic import for GoogleGenAI to reduce initial bundle size
let googleGenAILib = null;

const loadGoogleGenAI = async () => {
  if (googleGenAILib) return googleGenAILib;
  const module = await import("@google/genai");
  googleGenAILib = module;
  return module;
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const initializeAI = async () => {
  const { GoogleGenAI } = await loadGoogleGenAI();
  return apiKey ? new GoogleGenAI({ apiKey }) : null;
};

// Try-in-order fallback chain for the AI Jobs tab — all three verified
// working against this API key (tested 2026-10-16): the retired 2.x GA models
// return 404 and the 3.6+ models currently 503 for this key, so stick to
// these. ResumeBuilder.jsx keeps its own separate chain — do not sync.
const AI_MODELS = ["gemini-3.5-flash", "gemini-3-flash-preview", "gemini-3.5-flash-lite"];

const STATUSES = [
  { id: "saved", label: "Saved" },
  { id: "applied", label: "Applied" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
  { id: "rejected", label: "Rejected" },
];

const STATUS_CLASS = {
  saved: "",
  applied: " admin-status-applied",
  interview: " admin-status-interview",
  offer: " admin-status-offer",
  rejected: " admin-status-rejected",
};

function scoreClass(score) {
  if (score >= 70) return "admin-score-good";
  if (score >= 40) return "admin-score-mid";
  return "admin-score-low";
}

function toMs(v) {
  if (!v) return 0;
  if (typeof v.toMillis === "function") return v.toMillis();
  if (v instanceof Date) return v.getTime();
  return Number(v) || 0;
}

// Skill category labels — mirror SKILL_LABELS in ResumeBuilder.jsx (not
// exported there) so imported profiles read the same as the resume preview.
const SKILL_LABELS = {
  languages: "Languages",
  frameworks: "Frameworks",
  frontend: "Frontend",
  databases: "Databases",
  devops: "DevOps",
  testing: "Testing",
  cloud: "Cloud",
  messaging: "Messaging",
  concepts: "Core Concepts",
};

// Compact plain-text rendition of the resume saved by Resume Builder (shape:
// EMPTY_RESUME in ResumeBuilder.jsx, at resume/{email-prefix}). This is what
// Gemini sees as candidate context. Empty rows are skipped and the result is
// capped at 6000 chars to match the prompt's own slicing.
function resumeToProfileText(r) {
  const clean = (v) => String(v ?? "").trim();
  const lines = [];
  const head = [clean(r.name), clean(r.title), clean(r.location)].filter(Boolean).join(" — ");
  if (head) lines.push(head, "");
  if (clean(r.summary)) lines.push("SUMMARY", clean(r.summary), "");
  const skills = Object.entries(r.skills || {})
    .map(([k, v]) => [SKILL_LABELS[k] || k, clean(v)])
    .filter(([, v]) => v);
  if (skills.length) {
    lines.push("SKILLS");
    skills.forEach(([label, v]) => lines.push(`${label}: ${v}`));
    lines.push("");
  }
  const exp = (Array.isArray(r.experience) ? r.experience : [])
    .filter((e) => clean(e.role) || clean(e.company));
  if (exp.length) {
    lines.push("EXPERIENCE");
    exp.forEach((e) => {
      const when = [
        clean(e.startDate) ? `${clean(e.startDate)} – ${clean(e.endDate) || "Present"}` : "",
        clean(e.location),
      ].filter(Boolean).join(", ");
      lines.push(`${clean(e.role) || "Role"} at ${clean(e.company) || "Company"}${when ? ` (${when})` : ""}`);
      (Array.isArray(e.points) ? e.points : []).map(clean).filter(Boolean).forEach((p) => lines.push(`- ${p}`));
    });
    lines.push("");
  }
  const projects = (Array.isArray(r.projects) ? r.projects : []).filter((p) => clean(p.name));
  if (projects.length) {
    lines.push("PROJECTS");
    projects.forEach((p) => {
      lines.push(`${clean(p.name)}${clean(p.techStack) ? ` (${clean(p.techStack)})` : ""}`);
      (Array.isArray(p.points) ? p.points : []).map(clean).filter(Boolean).forEach((pt) => lines.push(`- ${pt}`));
    });
    lines.push("");
  }
  const edu = (Array.isArray(r.education) ? r.education : [])
    .filter((e) => clean(e.degree) || clean(e.institution));
  if (edu.length) {
    lines.push("EDUCATION");
    edu.forEach((e) => {
      const meta = [
        [clean(e.startYear), clean(e.endYear)].filter(Boolean).join(" – "),
        clean(e.cgpa) ? `CGPA ${clean(e.cgpa)}` : "",
      ].filter(Boolean).join(", ");
      lines.push([clean(e.degree), clean(e.institution)].filter(Boolean).join(", ") + (meta ? ` [${meta}]` : ""));
    });
    lines.push("");
  }
  const certs = (Array.isArray(r.certificates) ? r.certificates : []).filter((c) => clean(c.name));
  if (certs.length) {
    lines.push("CERTIFICATES");
    certs.forEach((c) => lines.push(`- ${clean(c.name)}${clean(c.issuer) ? ` — ${clean(c.issuer)}` : ""}`));
  }
  return lines.join("\n").trim().slice(0, 6000);
}

function buildPrompt(profile, job) {
  const prof = String(profile || "").slice(0, 6000);
  const jd = String(job.jd || "").slice(0, 8000);
  return `You are an expert technical recruiter and career coach helping ONE candidate evaluate and apply for ONE specific role.

CANDIDATE PROFILE:
${prof}

JOB TITLE: ${job.title || "Not given"}
COMPANY: ${job.company || "Not given"}

JOB DESCRIPTION:
${jd}

Respond with ONLY a JSON object — no markdown fences, no commentary — with exactly these keys:
{
  "score": <integer 0-100, honest overall fit, never inflated>,
  "verdict": <one sentence>,
  "strengths": <2-4 strings, why this profile fits>,
  "gaps": <0-3 strings, what is missing>,
  "coverLetter": <150-200 words, plain text, no markdown, addressed to this role>,
  "tailoredBullets": <3-5 strings, resume-style bullets using ONLY real skills/experience from the profile, quantified where the profile allows>
}`;
}

async function runAi(ai, profile, job) {
  if (!ai) throw new Error("VITE_GEMINI_API_KEY is missing.");
  const prompt = buildPrompt(profile, job);
  let response = null;
  let lastError = null;
  for (const model of AI_MODELS) {
    try {
      response = await ai.models.generateContent({
        model,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
      if (response?.text) break;
    } catch (err) {
      lastError = err;
      console.warn(`AI jobs model '${model}' failed:`, err?.message);
    }
  }
  if (!response?.text && lastError) throw lastError;
  const text = (response?.text || "").trim();
  const jsonStr = text
    .replace(/^```json\s*/, "")
    .replace(/```$/, "")
    .replace(/^```\s*/, "")
    .replace(/```$/, "")
    .trim();
  const fit = JSON.parse(jsonStr);
  fit.score = Math.max(0, Math.min(100, Math.round(Number(fit.score) || 0)));
  fit.verdict = String(fit.verdict || "");
  fit.coverLetter = String(fit.coverLetter || "");
  fit.strengths = Array.isArray(fit.strengths) ? fit.strengths.map(String) : [];
  fit.gaps = Array.isArray(fit.gaps) ? fit.gaps.map(String) : [];
  fit.tailoredBullets = Array.isArray(fit.tailoredBullets) ? fit.tailoredBullets.map(String) : [];
  return fit;
}
export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [draft, setDraft] = useState({ title: "", company: "", url: "", jd: "" });
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState("");
  const [profileDraft, setProfileDraft] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await getCollection(JOBS);
      if (!active) return;
      if (res.ok) setJobs((res.value || []).slice().sort((a, b) => toMs(b.createdAt) - toMs(a.createdAt)));
      else setError(res.error);
      setLoading(false);
    })();
    (async () => {
      const res = await getDocument(PROFILE_PATH);
      if (!active) return;
      if (res.ok && res.exists) {
        setProfile(res.value?.summary ?? "");
        setProfileDraft(res.value?.summary ?? "");
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const stats = useMemo(() => ({
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interview: jobs.filter((j) => j.status === "interview").length,
    offer: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  }), [jobs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      if (filter !== "all" && j.status !== filter) return false;
      if (!q) return true;
      return [j.title, j.company, j.url].filter(Boolean).some((v) => String(v).toLowerCase().includes(q));
    });
  }, [jobs, search, filter]);

  const viewing = jobs.find((j) => j.id === viewId) || null;
  const urlOk = !draft.url.trim() || /^https?:\/\//i.test(draft.url.trim());
  const valid = draft.title.trim().length > 0 && draft.jd.trim().length >= 40 && urlOk;
  const profileReady = profile.trim().length > 0;

  const saveProfile = async () => {
    if (profileSaving || !profileDraft.trim()) return;
    setProfileSaving(true);
    const res = await setDocument(
      PROFILE_PATH,
      { summary: profileDraft.trim(), updatedAt: serverTimestamp() },
      { merge: true },
    );
    setProfileSaving(false);
    if (!res.ok) {
      setToast({
        type: "error",
        message: res.error?.code === "permission-denied" ? "Denied: publish updated firestore.rules." : "Profile save failed.",
      });
      return;
    }
    setProfile(profileDraft.trim());
    setToast({ type: "success", message: "Profile saved — AI will use it as context." });
  };

  // Pull the candidate summary straight from the resume saved in Resume
  // Builder (resume/{email-prefix} — owner-readable under the existing
  // published rules, so no rules change is needed for this) and persist it as
  // the AI context. Still editable afterwards via Save profile.
  const importFromResume = async () => {
    if (importing) return;
    const email = auth.currentUser?.email || "";
    if (!email) {
      setToast({ type: "error", message: "Not signed in — reload the page." });
      return;
    }
    setImporting(true);
    const res = await getDocument(`resume/${userDocId(email)}`);
    setImporting(false);
    if (!res.ok) {
      setToast({
        type: "error",
        message: res.error?.code === "permission-denied" ? "Denied: publish updated firestore.rules." : "Resume load failed.",
      });
      return;
    }
    if (!res.exists || !res.value) {
      setToast({ type: "error", message: "No saved resume yet — build one in Resume Builder first." });
      return;
    }
    const text = resumeToProfileText(res.value);
    if (!text) {
      setToast({ type: "error", message: "Your resume has no content yet — fill it in Resume Builder." });
      return;
    }
    setProfileDraft(text);
    setProfileSaving(true);
    const save = await setDocument(PROFILE_PATH, { summary: text, updatedAt: serverTimestamp() }, { merge: true });
    setProfileSaving(false);
    if (!save.ok) {
      setToast({ type: "error", message: "Imported into the box above — click Save profile to keep it." });
      return;
    }
    setProfile(text);
    setToast({ type: "success", message: "Profile imported from your resume and saved." });
  };

  const addJob = async () => {
    if (!valid || saving) return;
    setSaving(true);
    const payload = {
      title: draft.title.trim().slice(0, 120),
      company: draft.company.trim().slice(0, 80),
      url: draft.url.trim(),
      jd: draft.jd.trim(),
      status: "saved",
      fit: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const res = await addDocument(JOBS, payload);
    setSaving(false);
    if (!res.ok) {
      setToast({
        type: "error",
        message: res.error?.code === "permission-denied" ? "Denied: publish updated firestore.rules." : "Save failed.",
      });
      return;
    }
    setJobs((prev) => [{ ...payload, id: res.id, createdAt: new Date() }, ...prev]);
    setDraft({ title: "", company: "", url: "", jd: "" });
    setToast({ type: "success", message: `Queued “${payload.title}”.` });
  };
  const setStatus = async (job, status) => {
    const res = await updateDocument(`${JOBS}/${job.id}`, { status, updatedAt: serverTimestamp() });
    if (!res.ok) {
      setToast({ type: "error", message: "Status update failed." });
      return;
    }
    setJobs((prev) => prev.map((x) => (x.id === job.id ? { ...x, status } : x)));
  };

  const handleAi = async (job) => {
    if (busyId) return;
    const ai = await initializeAI();
    if (!ai) {
      setToast({ type: "error", message: "Gemini key missing (VITE_GEMINI_API_KEY)." });
      return;
    }
    if (!profileReady) {
      setToast({ type: "error", message: "Save your profile summary first — AI needs it to score fit." });
      return;
    }
    setBusyId(job.id);
    try {
      const fit = await runAi(ai, profile, job);
      const res = await updateDocument(`${JOBS}/${job.id}`, { fit, updatedAt: serverTimestamp() });
      if (!res.ok) throw new Error("Could not save the AI result.");
      setJobs((prev) => prev.map((x) => (x.id === job.id ? { ...x, fit } : x)));
      setToast({ type: "success", message: `Fit ${fit.score}/100 — cover letter & bullets ready.` });
    } catch (err) {
      setToast({ type: "error", message: `AI failed: ${err?.message || "unknown error"}` });
    } finally {
      setBusyId(null);
    }
  };

  const removeJob = async (job) => {
    if (!window.confirm(`Delete “${job.title}”?`)) return;
    const res = await removeDocument(`${JOBS}/${job.id}`);
    if (!res.ok) {
      setToast({ type: "error", message: "Delete failed." });
      return;
    }
    setJobs((prev) => prev.filter((x) => x.id !== job.id));
    if (viewId === job.id) setViewId(null);
    setToast({ type: "success", message: "Deleted." });
  };

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({ type: "success", message: `${label} copied.` });
    } catch {
      setToast({ type: "error", message: "Clipboard blocked — select and copy manually." });
    }
  };
  return (
    <section>
      <div className="admin-stats">
        <div className="admin-stat"><span className="admin-stat-num">{stats.total}</span><span>Total</span></div>
        <div className="admin-stat"><span className="admin-stat-num">{stats.applied}</span><span>Applied</span></div>
        <div className="admin-stat"><span className="admin-stat-num">{stats.interview}</span><span>Interview</span></div>
        <div className="admin-stat"><span className="admin-stat-num">{stats.offer}</span><span>Offers</span></div>
        <div className="admin-stat"><span className="admin-stat-num">{stats.rejected}</span><span>Rejected</span></div>
      </div>

      <div className="admin-card">
        <div className="admin-card-head"><h2>Candidate profile — AI context</h2></div>
        <p className="admin-note">One-time summary of skills/experience — Gemini uses it to score fit and tailor drafts. Import it from the resume saved in Resume Builder, or write it manually; saved to <code className="admin-code">{PROFILE_PATH}</code>.</p>
        <label className="admin-label">Summary
          <textarea
            className="admin-input admin-textarea"
            rows={5}
            maxLength={6000}
            placeholder="e.g. 4 yoe backend engineer — Java, Spring Boot, Go, PostgreSQL, AWS (S3, Lambda), Redis, Kafka; built payment and order services handling ~2M req/day; B.Tech CSE 2019…"
            value={profileDraft}
            onChange={(e) => setProfileDraft(e.target.value)}
          />
        </label>
        <div className="admin-ai-actions">
          <button type="button" className="admin-btn" onClick={saveProfile} disabled={!profileDraft.trim() || profileSaving}>
            {profileSaving ? "Saving…" : "Save profile"}
          </button>
          <button type="button" className="admin-btn admin-btn-ghost" onClick={importFromResume} disabled={importing}>
            {importing ? "Importing…" : "Import from my resume"}
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-head"><h2>Add job</h2></div>
        <p className="admin-note">Copy the posting from Naukri/LinkedIn/any ATS and paste it below. AI scores & drafts here; submission stays one click on the job site (LinkedIn/Naukri block automated posting from browsers).</p>
        <div className="admin-form-wide">
          <div className="admin-row admin-row-title">
            <label className="admin-label">Title<input className="admin-input" maxLength={120} placeholder="Senior Backend Engineer" value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} /></label>
            <label className="admin-label">Company<input className="admin-input" maxLength={80} placeholder="Company" value={draft.company} onChange={(e) => setDraft((d) => ({ ...d, company: e.target.value }))} /></label>
          </div>
          <label className="admin-label">Job URL (optional — used for the one-click apply link)
            <input className="admin-input" placeholder="https://…" value={draft.url} onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))} />
          </label>
          {!urlOk && <p className="admin-note admin-warning">URL must start with http:// or https:// (or leave empty).</p>}
          <label className="admin-label">Job description
            <textarea
              className="admin-input admin-textarea"
              rows={6}
              placeholder="Paste the full job description here…"
              value={draft.jd}
              onChange={(e) => setDraft((d) => ({ ...d, jd: e.target.value }))}
            />
          </label>
          <button type="button" className="admin-btn" onClick={addJob} disabled={!valid || saving}>
            {saving ? "Adding…" : "Add to tracker"}
          </button>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-card-head"><h2>Applications</h2></div>
        <p className="admin-note">Run AI to get an honest fit score plus a tailored cover letter & resume bullets, then open the job page and submit in one click.</p>
        <div className="admin-filters">
          <input className="admin-input" placeholder="Search title / company / link…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="admin-input admin-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        {loading && <p className="admin-note">Loading…</p>}
        {error && <p className="admin-note admin-warning">Load failed: {error.code || error.message}. If permission-denied, publish the updated firestore.rules.</p>}
        {!loading && !error && filtered.length === 0 && <p className="admin-note">No jobs match — add one above.</p>}
        {!loading && !error && filtered.length > 0 && (
          <div className="admin-table-wrap"><table className="admin-table">
            <thead><tr><th>Job</th><th>Fit</th><th>Status</th><th>Added</th><th></th></tr></thead>
            <tbody>{filtered.map((j) => (
              <tr key={j.id}>
                <td>
                  <span className="admin-user-cell">
                    <strong>{j.title}</strong>
                    <span className="admin-note">{j.company || "—"}</span>
                  </span>
                </td>
                <td>{j.fit
                  ? <span className={`admin-badge ${scoreClass(j.fit.score)}`}>{j.fit.score}/100</span>
                  : <span className="admin-note">—</span>}</td>
                <td>
                  <select className="admin-input admin-select" value={j.status || "saved"} onChange={(e) => setStatus(j, e.target.value)}>
                    {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </td>
                <td>{asDate(j.createdAt)?.toLocaleDateString() || "—"}</td>
                <td>
                  <div className="admin-row-actions">
                    <button type="button" className="admin-btn admin-btn-small" disabled={busyId === j.id} onClick={() => handleAi(j)}>
                      {busyId === j.id ? "Scoring…" : j.fit ? "Re-run AI" : "Run AI"}
                    </button>
                    <button type="button" className="admin-btn admin-btn-small admin-btn-ghost" onClick={() => setViewId(j.id)}>View</button>
                    <button type="button" className="admin-btn admin-btn-small admin-btn-danger" onClick={() => removeJob(j)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </div>
      {viewing && (
        <div className="admin-modal-backdrop" onClick={() => setViewId(null)}>
          <div className="admin-modal admin-modal-wide" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h3>{viewing.title}{viewing.company ? ` — ${viewing.company}` : ""}</h3>
              <div className="admin-ai-actions">
                {viewing.url && <a className="admin-btn admin-btn-small" href={viewing.url} target="_blank" rel="noreferrer">Open job page ↗</a>}
                <button type="button" className="admin-btn admin-btn-small admin-btn-ghost" onClick={() => setViewId(null)}>Close</button>
              </div>
            </div>
            <div className="admin-detail-grid">
              <div className="admin-detail"><span className="admin-detail-k">Status</span><span className="admin-detail-v"><span className={`admin-badge${STATUS_CLASS[viewing.status] || ""}`}>{STATUSES.find((s) => s.id === viewing.status)?.label || "Saved"}</span></span></div>
              <div className="admin-detail"><span className="admin-detail-k">Added</span><span className="admin-detail-v">{asDate(viewing.createdAt)?.toLocaleDateString() || "—"}</span></div>
            </div>
            <h4 className="admin-sub">Job description</h4>
            <div className="admin-jd">{viewing.jd}</div>
            <h4 className="admin-sub">AI analysis</h4>
            {!viewing.fit && (
              <div className="admin-ai-actions">
                <p className="admin-note">Not analysed yet.</p>
                <button type="button" className="admin-btn admin-btn-small" disabled={busyId === viewing.id} onClick={() => handleAi(viewing)}>
                  {busyId === viewing.id ? "Scoring…" : "Run AI"}
                </button>
              </div>
            )}
            {viewing.fit && (
              <div className="admin-ai-block">
                <div className="admin-ai-actions">
                  <span className={`admin-badge ${scoreClass(viewing.fit.score)}`}>Fit {viewing.fit.score}/100</span>
                  <button type="button" className="admin-btn admin-btn-small" disabled={busyId === viewing.id} onClick={() => handleAi(viewing)}>
                    {busyId === viewing.id ? "Scoring…" : "Re-run AI"}
                  </button>
                </div>
                {viewing.fit.verdict && <p className="admin-ai-verdict">{viewing.fit.verdict}</p>}
                {viewing.fit.strengths?.length > 0 && (
                  <>
                    <h4 className="admin-sub">Strengths</h4>
                    <ul className="admin-ai-list">{viewing.fit.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </>
                )}
                {viewing.fit.gaps?.length > 0 && (
                  <>
                    <h4 className="admin-sub">Gaps</h4>
                    <ul className="admin-ai-list">{viewing.fit.gaps.map((g, i) => <li key={i}>{g}</li>)}</ul>
                  </>
                )}
                {viewing.fit.coverLetter && (
                  <>
                    <h4 className="admin-sub">Cover letter</h4>
                    <div className="admin-ai-cover">{viewing.fit.coverLetter}</div>
                    <button type="button" className="admin-btn admin-btn-small admin-btn-ghost" onClick={() => copyText(viewing.fit.coverLetter, "Cover letter")}>Copy cover letter</button>
                  </>
                )}
                {viewing.fit.tailoredBullets?.length > 0 && (
                  <>
                    <h4 className="admin-sub">Tailored resume bullets</h4>
                    <ul className="admin-ai-list">{viewing.fit.tailoredBullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                    <button type="button" className="admin-btn admin-btn-small admin-btn-ghost" onClick={() => copyText(viewing.fit.tailoredBullets.map((b) => `• ${b}`).join("\n"), "Bullets")}>Copy bullets</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <div className={`admin-toast admin-toast-${toast.type}`}>{toast.message}</div>}
    </section>
  );
}





