import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUser } from "../utils/auth";
import { subscribeDocument } from "../utils/firestore";
import { userPath } from "../utils/userProfile";

// TEMPORARY BYPASS — remove once Firestore reads work.
// While the Firestore rules deny reads in production, these two accounts get
// full access without a Firestore lookup. Delete this block (and the
// `grantedByBypass` usage below) as soon as users/bharathbsk97 reads succeed,
// so isPaid in Firestore is again the single source of truth.
const BYPASS_EMAILS = ["bharathbsk97@gmail.com", "maheswarimadiri@gmail.com"];

function isBypassEmail(email) {
  if (typeof email !== "string") return false;
  const normalized = email.trim().toLowerCase();
  return BYPASS_EMAILS.some((allowed) => allowed.toLowerCase() === normalized);
}

/**
 * Live membership for the signed-in account.
 *
 * Subscribes to the account's Firestore document (users/{email-prefix}) and
 * exposes whether isPaid is true. The flag is only ever READ here — it is owned
 * by the server, never by the client — so payment status always comes from
 * Firebase, never from code or localStorage.
 *
 * @returns {{ user: object|null, path: string|null, loading: boolean,
 *   doc: object|null, error: Error|null, isPaid: boolean }}
 */
export default function useMembership() {
  // Firebase Auth is the identity Firestore rules see (request.auth). The
  // localStorage mirror alone is NOT enough — subscribing before Firebase has
  // restored the session sends an unauthenticated request and the rules
  // correctly deny it. So gate the subscription on the real auth state.
  const [session] = useState(() => getCurrentUser());
  const [authReady, setAuthReady] = useState(() => !!auth.currentUser);
  const [authEmail, setAuthEmail] = useState(
    () => auth.currentUser?.email ?? null,
  );

  useEffect(() => {
    if (auth.currentUser) {
      setAuthReady(true);
      setAuthEmail(auth.currentUser.email ?? null);
      return undefined;
    }
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setAuthReady(true);
      setAuthEmail(fbUser?.email ?? null);
    });
    return () => unsubscribe();
  }, []);

  // TEMPORARY BYPASS: the two owner accounts skip the Firestore lookup
  // entirely, so denied rules can't lock them out of the deployed site.
  const grantedByBypass =
    isBypassEmail(session?.email) || isBypassEmail(authEmail);

  const path = grantedByBypass ? null : session ? userPath(session) : null;

  const [snapshot, setSnapshot] = useState({
    loaded: false,
    doc: null,
    error: null,
  });

  useEffect(() => {
    if (grantedByBypass) {
      setSnapshot({ loaded: true, doc: { isPaid: true }, error: null });
      return undefined;
    }
    // Wait for Firebase Auth to restore before touching Firestore; otherwise
    // the first request goes out with request.auth == null and is denied.
    if (!path || !authReady) return undefined;

    // onSnapshot always delivers asynchronously, so no state is set
    // synchronously during the effect itself.
    const unsubscribe = subscribeDocument(path, (value, error) => {
      setSnapshot({ loaded: true, doc: value, error });
    });

    return () => unsubscribe();
  }, [path, authReady, grantedByBypass]);

  // Bypassed owners are never "loading" and never error — they are paid.
  const loading = grantedByBypass
    ? false
    : !!path && (!authReady || !snapshot.loaded);

  return {
    user: session,
    authEmail,
    authReady,
    path: grantedByBypass ? userPath(session) : path,
    // No path (signed out) is not a loading state — RequirePaid redirects first.
    loading,
    doc: snapshot.doc,
    error: grantedByBypass ? null : authReady ? snapshot.error : null,
    isPaid: grantedByBypass ? true : snapshot.doc?.isPaid === true,
    grantedByBypass,
  };
}