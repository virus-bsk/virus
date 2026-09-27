import { useEffect, useState } from "react";
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
  // The session mirror written at login (utils/auth.js); stable for the
  // lifetime of the component, which is mounted per route.
  const [user] = useState(() => getCurrentUser());
  const path = user ? userPath(user) : null;

  const [snapshot, setSnapshot] = useState({
    loaded: false,
    doc: null,
    error: null,
  });

  useEffect(() => {
    if (!path) return undefined;

    // onSnapshot always delivers asynchronously, so no state is set
    // synchronously during the effect itself.
    const unsubscribe = subscribeDocument(path, (value, error) => {
      setSnapshot({ loaded: true, doc: value, error });
    });

    return () => unsubscribe();
  }, [path]);

  return {
    user,
    path,
    // No path (signed out) is not a loading state — RequirePaid redirects first.
    loading: !!path && !snapshot.loaded,
    doc: snapshot.doc,
    error: snapshot.error,
    isPaid: snapshot.doc?.isPaid === true,
  };
}