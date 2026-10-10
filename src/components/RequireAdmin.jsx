import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { isAdminEmail } from "../utils/admin";

// Invisible gate: non-admins are bounced to home (not to /login, so the
// route's existence is not advertised). Nothing links here except an
// admin-only NavBar entry.
export default function RequireAdmin({ children }) {
  const location = useLocation();
  const [state, setState] = useState({ ready: false, admin: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ ready: true, admin: isAdminEmail(user?.email) });
    });
    return () => unsubscribe();
  }, []);

  if (!state.ready) return null;
  if (!state.admin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
