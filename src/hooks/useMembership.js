import { useEffect, useState } from "react";

// Caches the Firebase modules once loaded, so repeated dynamic imports never
// re-fetch the SDK chunk.
let firebaseModulesPromise = null;
function loadFirebaseModules() {
  if (!firebaseModulesPromise) {
    firebaseModulesPromise = Promise.all([
      import("../firebase"),
      import("firebase/auth"),
      import("firebase/firestore"),
    ]).then(([{ auth, db }, authMod, fsMod]) => ({
      auth,
      db,
      onAuthStateChanged: authMod.onAuthStateChanged,
      doc: fsMod.doc,
      onSnapshot: fsMod.onSnapshot,
    }));
  }
  return firebaseModulesPromise;
}

/**
 * Live membership for the signed-in Firebase account.
 *
 * @returns {{ user: object|null, path: string|null, authReady: boolean,
 *   loading: boolean, doc: object|null, error: Error|null, isPaid: boolean,
 *   orderId: string }}
 */
export default function useMembership() {
  // NOTE: auth starts as "not ready" because the Firebase SDK is loaded on
  // demand (see loadFirebaseModules) so RequirePaid never drags the whole
  // ~700 kB SDK into the startup bundle. RequirePaid already renders a
  // "Checking your login…" screen while authReady is false, so the extra
  // async hop is invisible. onAuthStateChanged fires immediately with the
  // current user once the SDK is ready, so the final state is identical.
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [snapshot, setSnapshot] = useState({
    uid: null,
    path: null,
    loaded: false,
    doc: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    let unsubscribe = () => {};
    loadFirebaseModules()
      .then(({ auth, onAuthStateChanged }) => {
        if (cancelled) return;
        unsubscribe = onAuthStateChanged(auth, (user) => {
          setFirebaseUser(user);
          setAuthReady(true);
        });
      })
      .catch((err) => {
        console.error("Firebase auth init failed:", err);
        if (!cancelled) setAuthReady(true);
      });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const email = firebaseUser?.email ?? null;
  const atIndex = typeof email === "string" ? email.indexOf("@") : -1;
  const emailPrefix = atIndex > 0 ? email.slice(0, atIndex).toLowerCase() : "";
  const path = emailPrefix ? `users/${emailPrefix}` : null;

  useEffect(() => {
    if (!authReady || !firebaseUser) return undefined;

    if (!path || !email) {
      console.error("Cannot read Firestore membership without an email:", {
        user: firebaseUser,
        email,
      });
      return undefined;
    }

    const uid = firebaseUser.uid;
    let cancelled = false;
    let active = true;
    let unsubscribe = () => {};
    loadFirebaseModules()
      .then(({ db, doc, onSnapshot }) => {
        if (cancelled) return;
        console.info("Firebase membership lookup user:", firebaseUser);
        console.info("Firebase membership lookup email:", email);
        console.info("Firebase membership document ID:", emailPrefix);
        console.info("Firebase membership Firestore path:", path);
        console.info("Firebase membership project ID:", db.app.options.projectId);

        // Subscribe rather than one-shot getDoc: after a payment the client writes
        // isPaid=true, and a static read leaves this page showing "Free" (and the
        // Pay button) until a full reload. onSnapshot pushes that write straight back
        // into state, so the badge flips to Paid immediately.
        const userRef = doc(db, "users", emailPrefix);
        unsubscribe = onSnapshot(
          userRef,
          (snap) => {
            if (!active) return;
            const exists = snap.exists();
            const userData = exists ? snap.data() : null;
            console.info("Firebase membership document exists:", exists);
            console.info("Firebase membership Firestore data:", userData);
            setSnapshot({ uid, path, loaded: true, doc: userData, error: null });
          },
          (error) => {
            if (!active) return;
            console.error("Firebase membership Firestore read failed:", {
              projectId: db.app.options.projectId,
              uid,
              email,
              path,
              error,
            });
            setSnapshot({ uid, path, loaded: true, doc: null, error });
          },
        );
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Firebase membership Firestore read failed:", {
          uid,
          email,
          path,
          error,
        });
        setSnapshot({ uid, path, loaded: true, doc: null, error });
      });

    return () => {
      cancelled = true;
      active = false;
      unsubscribe();
    };
  }, [authReady, firebaseUser, email, emailPrefix, path]);

  const matchesCurrentUser =
    snapshot.uid === (firebaseUser?.uid ?? null) && snapshot.path === path;
  const currentSnapshot = matchesCurrentUser
    ? snapshot
    : {
        loaded: !firebaseUser || !path,
        doc: null,
        error:
          firebaseUser && !path
            ? new Error(
                "The authenticated Firebase user has no usable email address.",
              )
            : null,
      };
  const loading =
    !authReady || (!!firebaseUser && !!path && !currentSnapshot.loaded);

  return {
    user: firebaseUser,
    authReady,
    path,
    loading,
    doc: currentSnapshot.doc,
    error: currentSnapshot.error,
    isPaid: currentSnapshot.doc?.isPaid === true,
    orderId:
      typeof currentSnapshot.doc?.orderId === "string"
        ? currentSnapshot.doc.orderId
        : "",
  };
}
