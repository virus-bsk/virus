import { useEffect, useState } from "react";
import { getDocument, setDocument, subscribeDocument, updateDocument } from "../utils/firestore";
import "../pages/Admin.css";

const PATH = "pricing/maang_kit";

export default function AdminPricing() {
  const [live, setLive] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [draft, setDraft] = useState({ label: "", amount: "", currency: "INR" });
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsub = subscribeDocument(PATH, (v, e) => {
      setLoaded(true); setError(e); setLive(v);
      if (v && !touched) setDraft({ label: v.label ?? "", amount: v.amount ?? "", currency: v.currency ?? "INR" });
    });
    return () => unsub();
  }, [touched]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const n = Number(draft.amount);
  const valid = draft.label.trim() && Number.isFinite(n) && n > 0 && draft.currency.trim().length === 3;

  const save = async () => {
    if (!valid || saving) return;
    setSaving(true);
    const check = await getDocument(PATH);
    const payload = { label: draft.label.trim(), amount: n, currency: draft.currency.trim().toUpperCase() };
    const res = check.ok && check.exists ? await updateDocument(PATH, payload) : await setDocument(PATH, payload);
    setSaving(false);
    if (!res.ok) {
      setToast({ type: "error", message: res.error?.code === "permission-denied" ? "Denied: publish updated firestore.rules." : "Save failed." });
      return;
    }
    setTouched(false);
    setToast({ type: "success", message: `Price live: ${payload.currency} ${payload.amount}.` });
  };

  return (
    <section className="admin-card">
      <h2>Pricing — <code>{PATH}</code></h2>
      {!loaded && <p className="admin-note">Loading…</p>}
      {loaded && error && <p className="admin-note admin-warning">Read failed: {error.code || error.message}</p>}
      {loaded && !error && !live && <p className="admin-note">No doc yet — save to create it.</p>}
      {loaded && !error && live && <p className="admin-note">Live: <strong>{live.label}</strong> — <strong>{live.currency} {String(live.amount)}</strong></p>}
      <div className="admin-form">
        <label className="admin-label">Label<input className="admin-input" value={draft.label} onChange={(e) => { setTouched(true); setDraft((d) => ({ ...d, label: e.target.value })); }} /></label>
        <div className="admin-row">
          <label className="admin-label">Amount<input className="admin-input" type="number" min="1" value={draft.amount} onChange={(e) => { setTouched(true); setDraft((d) => ({ ...d, amount: e.target.value })); }} /></label>
          <label className="admin-label">Currency<input className="admin-input" value={draft.currency} maxLength={3} onChange={(e) => { setTouched(true); setDraft((d) => ({ ...d, currency: e.target.value })); }} /></label>
        </div>
        <button type="button" className="admin-btn" onClick={save} disabled={!valid || saving}>{saving ? "Saving…" : "Save pricing"}</button>
      </div>
      {toast && <div className={`admin-toast admin-toast-${toast.type}`}>{toast.message}</div>}
    </section>
  );
}
