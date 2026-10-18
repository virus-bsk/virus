// Admin console – Cline Models tab.
// Lets the admin add/remove AI models used by Cline with automatic failover.
// Stored in Firestore at clineModels/global.
import { useEffect, useState } from "react";
import {
  getClineModels,
  setClineModels,
  DEFAULT_CLINE_MODELS,
} from "../utils/clineModels";
import "../pages/Admin.css";

export default function AdminClineModels() {
  const [models, setModels] = useState(DEFAULT_CLINE_MODELS);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [newModel, setNewModel] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getClineModels()
      .then((m) => {
        setModels(m);
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

  const addModel = () => {
    const trimmed = newModel.trim();
    if (!trimmed) return;
    if (models.includes(trimmed)) {
      setToast({ type: "error", message: "Model already exists." });
      return;
    }
    setModels([...models, trimmed]);
    setNewModel("");
  };

  const removeModel = (idx) => {
    // Keep at least one model.
    if (models.length <= 1) {
      setToast({ type: "error", message: "Keep at least one model." });
      return;
    }
    setModels(models.filter((_, i) => i !== idx));
  };

  const save = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const res = await setClineModels(models);
      if (!res.ok) throw new Error(res.error?.message || "Save failed");
      setToast({ type: "success", message: "Cline models saved." });
    } catch (err) {
      setToast({ type: "error", message: `Save failed: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <h2>Cline Models</h2>
        <span className="admin-code">clineModels/global</span>
      </div>
      <p className="admin-note">
        Add up to 4 AI models for Cline with automatic failover. If one model
        returns an error (rate limit, 403, etc.), the next model is tried.
      </p>

      {!loaded && <p className="admin-note">Loading…</p>}
      {loaded && error && (
        <p className="admin-note admin-warning">
          Read failed: {error}
        </p>
      )}

      {loaded && (
        <div className="admin-form">
          <label className="admin-label">
            Add model
            <div style={{ display: "flex", gap: 8 }}>
              <input
                className="admin-input"
                placeholder="e.g. anthropic/claude-sonnet-5.5"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addModel()}
              />
              <button
                type="button"
                className="admin-btn"
                onClick={addModel}
                disabled={!newModel.trim() || models.includes(newModel.trim())}
              >
                Add
              </button>
            </div>
          </label>

          <div className="admin-note" style={{ marginTop: 12 }}>
            <strong>Configured models (failover order):</strong>
            <ul style={{ marginTop: 8, paddingLeft: 20 }}>
              {models.map((m, i) => (
                <li key={i} style={{ marginBottom: 6, display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", flex: 1 }}>{i + 1}. {m}</span>
                  <button
                    type="button"
                    className="admin-btn admin-btn-small"
                    onClick={() => removeModel(i)}
                    style={{ padding: "2px 8px", fontSize: "12px" }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="admin-btn"
            onClick={save}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save Cline models"}
          </button>

          {models.length !== DEFAULT_CLINE_MODELS.length && (
            <p className="admin-note" style={{ marginTop: 8, color: "#666" }}>
              {models.length} model(s) configured.
            </p>
          )}
        </div>
      )}

      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </section>
  );
}