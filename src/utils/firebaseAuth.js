import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { storeUserOnLogin } from "./userProfile";

// Every successful sign-in mirrors the account into Firestore as users/{uid}, so
// the document is stored on login instead of only when /profile is saved.
// Best-effort by design: auth must never fail because Firestore is unreachable
// or the security rules deny the write, so storeUserOnLogin reports the problem
// instead of throwing and we only log it.
async function storeUserInFirestore(user, name) {
  try {
    const result = await storeUserOnLogin(user, { name });

    if (!result.ok) {
      console.warn(
        `Could not store ${result.path || "the user document"} in Firestore:`,
        result.error?.code || result.error?.message || result.error,
        "— check that the Firestore rules allow a signed-in user to write their own users/{uid} document.",
      );
    }

    return result;
  } catch (err) {
    console.warn("Could not store the user document in Firestore:", err);
    return { ok: false, path: null, error: err };
  }
}

export async function registerWithEmail(name, email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser && name) {
      await updateProfile(auth.currentUser, { displayName: name });
    }
    await storeUserInFirestore(cred.user, name);
    return cred.user;
  } catch (err) {
    console.error("Firebase register error:", err.code || err.message, err);
    // Rethrow a clearer error for UI handling
    const msg = err.code
      ? `${err.code}: ${err.message}`
      : err.message || "Registration failed";
    const e = new Error(msg);
    e.code = err.code;
    throw e;
  }
}

export async function loginWithEmail(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await storeUserInFirestore(cred.user);
    return cred.user;
  } catch (err) {
    console.error("Firebase login error:", err.code || err.message, err);
    const msg = err.code
      ? `${err.code}: ${err.message}`
      : err.message || "Login failed";
    const e = new Error(msg);
    e.code = err.code;
    throw e;
  }
}

export async function loginWithGoogle() {
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    await storeUserInFirestore(cred.user);
    return cred.user;
  } catch (err) {
    console.error("Firebase Google login error:", err.code || err.message, err);
    const msg = err.code
      ? `${err.code}: ${err.message}`
      : err.message || "Google login failed";
    const e = new Error(msg);
    e.code = err.code;
    throw e;
  }
}

export async function logout() {
  await signOut(auth);
}

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(
      "Firebase resetPassword error:",
      err.code || err.message,
      err,
    );
    const msg = err.code
      ? `${err.code}: ${err.message}`
      : err.message || "Password reset failed";
    const e = new Error(msg);
    e.code = err.code;
    throw e;
  }
}

// Returns the list of provider ids linked to the current user
// e.g. ["password"], ["google.com"], or a mix.
export function getUserProviderIds() {
  const user = auth.currentUser;
  if (!user) return [];
  return (user.providerData || []).map((p) => p.providerId);
}

// True when the account was created with Email/Password auth
export function isPasswordProvider() {
  return getUserProviderIds().includes("password");
}

// True when the account uses Google Sign-In
export function isGoogleProvider() {
  return getUserProviderIds().includes("google.com");
}

// True when the user is currently signed in with Email/Password
export function isSignedInWithPassword() {
  const user = auth.currentUser;
  if (!user) return false;
  // Check the current provider (the one used for this session)
  return user.providerData[0]?.providerId === "password";
}

// True when the user is currently signed in with Google
export function isSignedInWithGoogle() {
  const user = auth.currentUser;
  if (!user) return false;
  // Check the current provider (the one used for this session)
  return user.providerData[0]?.providerId === "google.com";
}

/**
 * Change the current user's password.
 * For Email/Password accounts, if currentPassword is provided, we re-authenticate first.
 * If currentPassword is not provided (for linked accounts), we skip re-authentication.
 *
 * @param {string} newPassword - the new password
 * @param {string} [currentPassword] - existing password (optional, for re-authentication)
 */
export async function changePassword(newPassword, currentPassword) {
  const user = auth.currentUser;
  if (!user) {
    const e = new Error("No authenticated user found.");
    e.code = "auth/no-current-user";
    throw e;
  }

  // Re-authenticate Email/Password users before updating the password.
  // Only re-authenticate if currentPassword is provided
  if (currentPassword && isSignedInWithPassword()) {
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);
    } catch (err) {
      console.error(
        "Firebase re-authentication error:",
        err.code || err.message,
        err,
      );
      const e = new Error(err.message || "Re-authentication failed");
      e.code = err.code;
      throw e;
    }
  }

  try {
    await updatePassword(user, newPassword);
    return true;
  } catch (err) {
    console.error(
      "Firebase updatePassword error:",
      err.code || err.message,
      err,
    );
    const e = new Error(err.message || "Password update failed");
    e.code = err.code;
    throw e;
  }
}

// Quick runtime sanity check helper (callable from UI/console)
export function validateFirebaseConfig() {
  const missing = [];
  try {
    // check basic fields on the app instance
    const appConfig = auth?.app?.options || null;
    if (!appConfig) return { ok: false, error: "Firebase app not initialized" };
    if (!appConfig.apiKey) missing.push("apiKey");
    if (!appConfig.authDomain) missing.push("authDomain");
    if (!appConfig.projectId) missing.push("projectId");
    if (missing.length) return { ok: false, missing };
    return { ok: true, config: appConfig };
  } catch (err) {
    return { ok: false, error: err.message || String(err) };
  }
}
