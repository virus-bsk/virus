import { useCallback, useEffect, useMemo, useState } from "react";
import { asDate, getCollection, updateDocument } from "../utils/firestore";
import "../pages/Admin.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    const res = await getCollection("users");
    if (res.ok) setUsers(res.value || []);
    else setError(res.error);
    setLoading(false);
  }, []);
  useEffect(() => {
    let active = true;
    (async () => {
      const res = await getCollection("users");
      if (!active) return;
      if (res.ok) setUsers(res.value || []);
      else setError(res.error);
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const stats = useMemo(() => {
    const paid = users.filter((u) => u.isPaid === true).length;
    return { total: users.length, paid, free: users.length - paid };
  }, [users]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (filter === "paid" && u.isPaid !== true) return false;
      if (filter === "free" && u.isPaid === true) return false;
      if (!q) return true;
      return [u.userName, u.email, u.id, u.orderId, u.mobileNumber]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [users, search, filter]);
  const openEdit = (u) => {
    setEditing(u);
    setDraft({ userName: u.userName ?? "", mobileNumber: u.mobileNumber ?? "", isPaid: u.isPaid === true, orderId: u.orderId ?? "", paymentId: u.paymentId ?? "" });
    setIsEditing(false);
  };
  const saveEdit = async () => {
    if (!editing) return;
    const name = String(draft.userName ?? "").trim();
    if (!name) { setToast({ type: "error", message: "Name cannot be empty." }); return; }
    const mobile = String(draft.mobileNumber ?? "").trim();
    if (mobile && !/^[6-9]\d{9}$/.test(mobile)) { setToast({ type: "error", message: "Mobile: 10 digits or empty." }); return; }
    setSaving(true);
    const payload = { userName: name.slice(0, 60), isPaid: draft.isPaid === true, orderId: String(draft.orderId ?? ""), mobileNumber: mobile };
    if (String(draft.paymentId ?? "").trim()) payload.paymentId = String(draft.paymentId).trim();
    const res = await updateDocument(`users/${editing.id}`, payload);
    setSaving(false);
    if (!res.ok) {
      setToast({ type: "error", message: res.error?.code === "permission-denied" ? "Denied: publish updated firestore.rules." : (res.error?.message || "Save failed.") });
      return;
    }
    setUsers((prev) => prev.map((x) => (x.id === editing.id ? { ...x, ...payload } : x)));
    setEditing(null);
    setIsEditing(false);
    setToast({ type: "success", message: `Saved ${editing.id}.` });
  };
  const fmtDate = (v) => { const d = asDate(v); return d ? d.toLocaleString() : "—"; };
  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <h2>Logged-in users ({stats.total})</h2>
        <button type="button" className="admin-btn admin-btn-ghost" onClick={load} disabled={loading}>{loading ? "Loading…" : "↻ Refresh"}</button>
      </div>
      <div className="admin-stats">
        <div className="admin-stat"><span className="admin-stat-num">{stats.total}</span><span>Total</span></div>
        <div className="admin-stat admin-stat-paid"><span className="admin-stat-num">{stats.paid}</span><span>Paid</span></div>
        <div className="admin-stat"><span className="admin-stat-num">{stats.free}</span><span>Free</span></div>
      </div>
      <div className="admin-filters">
        <input className="admin-input" placeholder="Search name, email, order…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="admin-input admin-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option><option value="paid">Paid</option><option value="free">Free</option>
        </select>
      </div>
      {loading && <p className="admin-note">Loading users…</p>}
      {!loading && error && <p className="admin-note admin-warning">List failed: {error.code || error.message}. Publish updated rules for admin list.</p>}
      {!loading && !error && filtered.length === 0 && <p className="admin-note">No users match.</p>}
      {!loading && !error && filtered.length > 0 && (
        <div className="admin-table-wrap"><table className="admin-table">
          <thead><tr><th>User</th><th>Status</th><th>Joined</th><th></th></tr></thead>
          <tbody>{filtered.map((u) => (
            <tr key={u.id}>
              <td>
                <span className="admin-user-cell">
                  <strong>{u.userName || "—"}</strong>
                  <code className="admin-id" title={u.id}>{u.id}</code>
                </span>
              </td>
              <td><span className={`admin-badge${u.isPaid === true ? " admin-badge-paid" : ""}`}>{u.isPaid === true ? "Paid" : "Not paid"}</span></td>
              <td>{fmtDate(u.date)}</td>
              <td><button type="button" className="admin-btn admin-btn-small" onClick={() => openEdit(u)}>View</button></td>
            </tr>))}
          </tbody></table></div>
      )}
      {editing && (
        <div className="admin-modal-backdrop" onClick={() => !saving && setEditing(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="admin-modal-head">
              <h3>User details</h3>
              {!isEditing && <button type="button" className="admin-btn admin-btn-small" onClick={() => setIsEditing(true)}>Edit</button>}
            </div>
            <p className="admin-note"><code className="admin-code">{editing.id}</code></p>
            <div className="admin-detail-grid">
              <div className="admin-detail"><span className="admin-detail-k">Email</span><span className="admin-detail-v">{editing.email || "—"}</span></div>
              <div className="admin-detail"><span className="admin-detail-k">Joined</span><span className="admin-detail-v">{fmtDate(editing.date)}</span></div>
            </div>
            {isEditing ? (
              <>
                <label className="admin-label">User name<input className="admin-input" value={draft.userName} maxLength={60} onChange={(e) => setDraft((d) => ({ ...d, userName: e.target.value }))} /></label>
                <label className="admin-label">Mobile<input className="admin-input" value={draft.mobileNumber} maxLength={10} onChange={(e) => setDraft((d) => ({ ...d, mobileNumber: e.target.value }))} /></label>
                <label className="admin-label">Order ID<input className="admin-input" value={draft.orderId} onChange={(e) => setDraft((d) => ({ ...d, orderId: e.target.value }))} /></label>
                <label className="admin-label">Payment ID<input className="admin-input" value={draft.paymentId} onChange={(e) => setDraft((d) => ({ ...d, paymentId: e.target.value }))} /></label>
                <label className="admin-check"><input type="checkbox" checked={draft.isPaid === true} onChange={(e) => setDraft((d) => ({ ...d, isPaid: e.target.checked }))} /> Paid access</label>
                <div className="admin-modal-actions">
                  <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setIsEditing(false)} disabled={saving}>Cancel</button>
                  <button type="button" className="admin-btn" onClick={saveEdit} disabled={saving}>{saving ? "Saving…" : "Save"}</button>
                </div>
              </>
            ) : (
              <>
                <div className="admin-detail-grid">
                  <div className="admin-detail"><span className="admin-detail-k">User name</span><span className="admin-detail-v">{editing.userName || "—"}</span></div>
                  <div className="admin-detail"><span className="admin-detail-k">Mobile</span><span className="admin-detail-v">{editing.mobileNumber || "—"}</span></div>
                  <div className="admin-detail"><span className="admin-detail-k">Order ID</span><span className="admin-detail-v">{editing.orderId || "—"}</span></div>
                  <div className="admin-detail"><span className="admin-detail-k">Payment ID</span><span className="admin-detail-v">{editing.paymentId || "—"}</span></div>
                </div>
                <div className="admin-detail admin-detail-solo"><span className="admin-detail-k">Status</span><span className="admin-detail-v"><span className={`admin-badge${editing.isPaid === true ? " admin-badge-paid" : ""}`}>{editing.isPaid === true ? "Paid" : "Not paid"}</span></span></div>
                <div className="admin-modal-actions">
                  <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setEditing(null)}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {toast && <div className={`admin-toast admin-toast-${toast.type}`}>{toast.message}</div>}
    </section>
  );
}
