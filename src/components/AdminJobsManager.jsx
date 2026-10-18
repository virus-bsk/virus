// Admin console – Job Manager tab.
// Add/manage product-based company jobs with direct apply links.
// Stored in Firestore at jobs/{id}.
import { useEffect, useState } from "react";
import {
  addJob,
  fetchJobsWithAI,
  getJobs,
  removeJob,
  validateJob,
} from "../utils/jobs";
import "../pages/Admin.css";

export default function AdminJobsManager() {
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    experience: "",
    applyLink: "",
  });
  const [saving, setSaving] = useState(false);
  const [aiFetching, setAiFetching] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getJobs()
      .then((r) => {
        setJobs(r.value || []);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    const errors = validateJob(form);
    if (errors.length > 0) {
      setToast({ type: "error", message: errors.join(". ") });
      setSaving(false);
      return;
    }
    const res = await addJob(form);
    if (!res.ok) {
      const msg =
        res.error?.code === "permission-denied"
          ? "Denied: publish the updated firestore.rules (jobs collection) in the Firebase console."
          : typeof res.error === "string"
            ? res.error
            : res.error?.message || "Add failed";
      setToast({ type: "error", message: msg });
    } else {
      setToast({ type: "success", message: "Job added." });
      setForm({ title: "", company: "", description: "", experience: "", applyLink: "" });
      getJobs().then((r) => setJobs(r.value || []));
    }
    setSaving(false);
  };

  const handleRemove = async (jobId) => {
    const res = await removeJob(jobId);
    if (!res.ok) {
      setToast({ type: "error", message: res.error?.message || "Remove failed" });
      return;
    }
    setToast({ type: "success", message: "Job removed." });
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  // Optional: trigger the AI job finder immediately from the browser.
  // Every night the same flow runs automatically via the GitHub Actions
  // cron (.github/workflows/fetch-jobs.yml) — no action needed from you.
  const handleAIFetch = async () => {
    setAiFetching(true);
    try {
      const res = await fetchJobsWithAI();
      if (!res.ok) {
        setToast({ type: "error", message: res.error || "AI fetch failed" });
      } else {
        setToast({
          type: "success",
          message: `AI added ${res.added} new job(s), skipped ${res.skipped} duplicate(s).`,
        });
        if (res.added > 0) {
          const r = await getJobs();
          setJobs(r.value || []);
        }
      }
    } catch (err) {
      setToast({ type: "error", message: `AI fetch failed: ${err.message}` });
    }
    setAiFetching(false);
  };

  if (!loaded) {
    return <div className="admin-card"><p className="admin-note">Loading…</p></div>;
  }
  if (error) {
    return <div className="admin-card"><p className="admin-note admin-warning">Read failed: {error}</p></div>;
  }

  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <h2>Job Manager</h2>
        <span className="admin-code">jobs collection</span>
      </div>
      <p className="admin-note">
        <strong>No daily work needed.</strong> AI fetches fresh product-company
        jobs automatically every night (GitHub Actions cron at 06:00 UTC) and
        they appear on the MAANG Preparation page. Use the buttons below only
        to run it on demand or edit entries manually.
      </p>
      <button
        type="button"
        onClick={handleAIFetch}
        disabled={aiFetching}
        className="admin-btn"
        style={{ marginBottom: 20 }}
      >
        {aiFetching ? "AI is searching for jobs…" : "Find Jobs with AI (Now)"}
      </button>

      <p className="admin-note" style={{ marginBottom: 8 }}>
        <strong>Or add one manually</strong> — direct apply links only, no
        career portals, no service-based companies:
      </p>

      <form onSubmit={handleAdd} className="admin-form" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label className="admin-label">Job Title</label>
            <input
              className="admin-input"
              placeholder="e.g. Software Engineer"
              value={form.title}
              onChange={handleChange("title")}
            />
          </div>
          <div>
            <label className="admin-label">Company Name</label>
            <input
              className="admin-input"
              placeholder="e.g. Google"
              value={form.company}
              onChange={handleChange("company")}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label className="admin-label">Description</label>
            <textarea
              className="admin-input"
              placeholder="Brief job description"
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
            />
          </div>
          <div>
            <label className="admin-label">Experience</label>
            <input
              className="admin-input"
              placeholder="e.g. 3-5 years"
              value={form.experience}
              onChange={handleChange("experience")}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label className="admin-label">Direct Apply Link</label>
            <input
              className="admin-input"
              placeholder="https://company.com/apply/..."
              value={form.applyLink}
              onChange={handleChange("applyLink")}
            />
          </div>
        </div>
        <button
          type="submit"
          className="admin-btn"
          disabled={saving}
        >
          {saving ? "Adding…" : "Add Job"}
        </button>
      </form>

      <div className="admin-note" style={{ marginBottom: 12 }}>
        <strong>{jobs.length} job(s)</strong>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Title</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Company</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Experience</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Apply Link</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{job.title}</td>
                <td style={{ padding: "8px" }}>{job.company}</td>
                <td style={{ padding: "8px" }}>{job.experience}</td>
                <td style={{ padding: "8px" }}>
                  <a href={job.applyLink} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>
                    Apply
                  </a>
                </td>
                <td style={{ padding: "8px" }}>
                  <button
                    type="button"
                    onClick={() => handleRemove(job.id)}
                    className="admin-btn admin-btn-small"
                    style={{ padding: "4px 8px", fontSize: "12px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </section>
  );
}