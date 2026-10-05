// The signed-in user's Firestore document lives at users/{email-prefix}: the
// part before "@" in the account email, lowercased (the document "bharathbsk97"
// in the Firebase console is the prefix of "bharathbsk97@gmail.com"). This module is
// the single place that knows its shape: login writes it through
// storeUserOnLogin() and /profile reads and edits it. Built on utils/firestore.js
// so every call resolves to { ok, ... } or { ok: false, error } — never a throw.
import {
  getDocument,
  serverTimestamp,
  setDocument,
  updateDocument,
} from "./firestore";

export const USERS_COLLECTION = "users";

// Longest accepted user name. Shared with pages/Profile.jsx (input maxLength)
// and with the security rules, which reject longer values.
export const MAX_USER_NAME_LENGTH = 60;

/**
 * Document id for an account: the lowercased email prefix ("bharathbsk97" for
 * "bharathbsk97@gmail.com"). Accepts a Firebase Auth user ({ uid, email }), the
 * localStorage session ({ id, email }), or a plain string (an email, or a raw
 * id used verbatim as the fallback).
 */
export function userDocId(user) {
  let email = "";
  if (typeof user === "string") email = user;
  else if (typeof user?.email === "string") email = user.email;

  const trimmed = String(email ?? "").trim();
  const at = trimmed.indexOf("@");
  if (at > 0) return trimmed.slice(0, at).toLowerCase();
  if (typeof user === "string") return trimmed;

  // No usable email (rare): fall back to the Auth uid so a document still exists.
  return String(user?.uid ?? user?.id ?? "").trim();
}

// { email: "bharathbsk97@gmail.com" } -> "users/bharathbsk97"
export function userPath(user) {
  return `${USERS_COLLECTION}/${userDocId(user)}`;
}

// Prefer a name the user typed, then the Auth display name, then the email
// prefix. Always trimmed and capped so a create can never violate the rules.
export function resolveUserName(user, explicitName) {
  const candidates = [
    explicitName,
    user?.displayName,
    user?.email?.split("@")[0],
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim().slice(0, MAX_USER_NAME_LENGTH);
    }
  }

  return "";
}

// The fields written when an account signs in for the first time, mirroring the
// shape used in the Firestore console (userName, email, isPaid, orderId, date).
export function buildNewUserDocument(user, explicitName) {
  return {
    userName: resolveUserName(user, explicitName),
    email: user?.email ?? "",
    // isPaid, orderId and date are written on creation only; from then on they
    // are server-owned and the security rules reject any client write to them.
    // orderId holds the Cashfree / payment order id once the user pays, so
    // paid details stay verifiable. Empty until the server sets it.
    isPaid: false,
    orderId: "",
    date: serverTimestamp(),
  };
}

/**
 * Decide what (if anything) to write for a signed-in account, given what is
 * currently stored. Pure, so the "never clobber isPaid/date" rules can be tested
 * without a database.
 *
 * @param {object} user - the Firebase Auth user (email, displayName)
 * @param {object|null} storedDoc - the existing users/{email-prefix} data, or null
 * @param {string} [explicitName] - a name the user just typed (sign up)
 * @returns {{ action: "create"|"patch"|"none", document?: object,
 *   fields?: object }} "create" for a missing document, "patch" with only stale
 *   client-owned fields, "none" when there is nothing to write
 */
export function planUserStore(user, storedDoc, explicitName) {
  if (!storedDoc) {
    return {
      action: "create",
      document: buildNewUserDocument(user, explicitName),
    };
  }

  const fields = {};

  // Only repair fields a client owns, and only when they are actually stale —
  // isPaid, orderId and date are server-owned and must never appear in the patch.
  if (!String(storedDoc.userName ?? "").trim()) {
    fields.userName = resolveUserName(user, explicitName);
  }

  if ((storedDoc.email ?? "") !== (user?.email ?? "")) {
    fields.email = user?.email ?? "";
  }

  return Object.keys(fields).length
    ? { action: "patch", fields }
    : { action: "none" };
}

/**
 * Store the signed-in account in Firestore as users/{email-prefix}. Called
 * after every successful sign-in so the document exists even if the user never
 * opens /profile. Existing documents are never clobbered: only a blank userName and a
 * changed email are patched, and isPaid/orderId/date are left untouched.
 *
 * @param {object} user - the Firebase Auth user (uid, email, displayName)
 * @param {{ name?: string }} [options] - a name the user just typed (sign up)
 * @returns {Promise<{ ok: boolean, path: string|null, created?: boolean,
 *   patched?: string[], error?: Error }>} a result object, never a rejection
 */
export async function storeUserOnLogin(user, { name } = {}) {
  try {
    if (!user?.uid) {
      return {
        ok: false,
        path: null,
        error: new Error("No signed-in user to store."),
      };
    }

    const path = userPath(user);
    const existing = await getDocument(path);

    if (!existing.ok) {
      return { ok: false, path, error: existing.error };
    }

    const existingDoc = existing.exists ? existing.value : null;
    const plan = planUserStore(user, existingDoc, name);

    if (plan.action === "create") {
      const created = await setDocument(path, plan.document);
      return created.ok
        ? { ok: true, path, created: true, patched: [] }
        : { ok: false, path, error: created.error };
    }

    if (plan.action === "none") {
      return { ok: true, path, created: false, patched: [] };
    }

    const updated = await updateDocument(path, plan.fields);
    return updated.ok
      ? { ok: true, path, created: false, patched: Object.keys(plan.fields) }
      : { ok: false, path, error: updated.error };
  } catch (err) {
    return { ok: false, path: null, error: err };
  }
}
