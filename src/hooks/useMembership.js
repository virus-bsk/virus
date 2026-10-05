import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

/**
 * Live membership for the signed-in Firebase account.
 *
 * @returns {{ user: object|null, path: string|null, authReady: boolean,
 *   loading: boolean, doc: object|null, error: Error|null, isPaid: boolean,
 *   orderId: string }}
 */
export default function useMembership() {
  const [firebaseUser, setFirebaseUser] = useState(() => auth.currentUser);
  const [authReady, setAuthReady] = useState(() => auth.currentUser != null);
  const [snapshot, setSnapshot] = useState({
    uid: null,
    path: null,
    loaded: false,
    doc: null,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthReady(true);
    });
    return () => unsubscribe();
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
    let active = true;
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
    const unsubscribe = onSnapshot(
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

    return () => {
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
