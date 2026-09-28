import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUser } from "../utils/auth";
import { subscribeDocument } from "../utils/firestore";
import { userPath } from "../utils/userProfile";

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

  const path = session ? userPath(session) : null;

  const [snapshot, setSnapshot] = useState({
    loaded: false,
    doc: null,
    error: null,
  });

  useEffect(() => {
    // Wait for Firebase Auth to restore before touching Firestore; otherwise
    // the first request goes out with request.auth == null and is denied.
    if (!path || !authReady) return undefined;

    // onSnapshot always delivers asynchronously, so no state is set
    // synchronously during the effect itself.
    const unsubscribe = subscribeDocument(path, (value, error) => {
      setSnapshot({ loaded: true, doc: value, error });
    });

    return () => unsubscribe();
  }, [path, authReady]);

  // While Firebase Auth is still restoring, report loading (not an error) so
  // RequirePaid shows the spinner instead of the denial screen.
  const loading = !!path && (!authReady || !snapshot.loaded);

  return {
    user: session,
    authEmail,
    authReady,
    path,
    // No path (signed out) is not a loading state — RequirePaid redirects first.
    loading,
    doc: snapshot.doc,
    error: authReady ? snapshot.error : null,
    isPaid: snapshot.doc?.isPaid === true,
  };
}