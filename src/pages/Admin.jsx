import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { isAdminEmail } from "../utils/admin";
import AdminUsers from "../components/AdminUsers";
import AdminPricing from "../components/AdminPricing";
import "../pages/Admin.css";

export default function Admin() {
  const [email, setEmail] = useState(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("users");
  useEffect(() => {
    const u = onAuthStateChanged(auth, (x) => { setEmail(x?.email ?? null); setReady(true); });
    return () => u();
  }, []);
  if (!ready) return <div className="admin-page"><p className="admin-note">Checking…</p></div>;
  if (!isAdminEmail(email)) return <div className="admin-page"><section className="admin-card"><h2>Not found</h2></section></div>;
  return (
    <div className="admin-page">
      <h1>Admin console</h1>
      <p className="admin-note">Private — <code>{email}</code></p>
      <div className="admin-tabs">
        <button type="button" className={`admin-tab${tab === "users" ? " admin-tab-active" : ""}`} onClick={() => setTab("users")}>Users</button>
        <button type="button" className={`admin-tab${tab === "pricing" ? " admin-tab-active" : ""}`} onClick={() => setTab("pricing")}>Pricing</button>
      </div>
      {tab === "users" ? <AdminUsers /> : <AdminPricing />}
    </div>
  );
}
