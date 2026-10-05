import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

/**
 * Live membership for the signed-in Firebase account.
 *
 * @returns {{ user: object|null, path: string|null, authReady: boolean,
 *   loading: boolean, doc: object|null, error: Error|null, isPaid: boolean }}
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

    async function readMembership() {
      try {
        const userRef = doc(db, "users", emailPrefix);
        const userSnapshot = await getDoc(userRef);
        const exists = userSnapshot.exists();
        const userData = exists ? userSnapshot.data() : null;

        console.info("Firebase membership document exists:", exists);
        console.info("Firebase membership Firestore data:", userData);

        if (active) {
          setSnapshot({ uid, path, loaded: true, doc: userData, error: null });
        }
      } catch (error) {
        console.error("Firebase membership Firestore read failed:", {
          projectId: db.app.options.projectId,
          uid,
          email,
          path,
          error,
        });
        if (active) {
          setSnapshot({ uid, path, loaded: true, doc: null, error });
        }
      }
    }

    readMembership();
    return () => {
      active = false;
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
  };
}
