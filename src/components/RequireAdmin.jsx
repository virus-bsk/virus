import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAdminEmail } from "../utils/admin";

// Invisible gate: non-admins are bounced to home (not to /login, so the
// route's existence is not advertised). Nothing links here except an
// admin-only NavBar entry.
export default function RequireAdmin({ children }) {
  const location = useLocation();
  const [state, setState] = useState({ ready: false, admin: false });

  useEffect(() => {
    // Firebase is loaded on demand: this gate is imported by App.jsx into the
    // startup bundle, and a static import would pull the whole SDK along.
    let cancelled = false;
    let unsubscribe = () => {};
    Promise.all([import("firebase/auth"), import("../firebase")])
      .then(([{ onAuthStateChanged }, { auth }]) => {
        if (cancelled) return;
        unsubscribe = onAuthStateChanged(auth, (user) => {
          setState({ ready: true, admin: isAdminEmail(user?.email) });
        });
      })
      .catch((err) => {
        console.error("Firebase auth init failed:", err);
        if (!cancelled) setState({ ready: true, admin: false });
      });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  if (!state.ready) return null;
  if (!state.admin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
