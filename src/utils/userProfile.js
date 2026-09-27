// The signed-in user's Firestore document lives at users/{uid}. This module is
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

// "abc123" -> "users/abc123"
export function userPath(uid) {
  return `${USERS_COLLECTION}/${String(uid ?? "").trim()}`;
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
// shape used in the Firestore console (userName, email, isPaid, date).
export function buildNewUserDocument(user, explicitName) {
  return {
    userName: resolveUserName(user, explicitName),
    email: user?.email ?? "",
    // isPaid and date are written on creation only; from then on they are
    // server-owned and the security rules reject any client write to them.
    isPaid: false,
    date: serverTimestamp(),
  };
}

/**
 * Decide what (if anything) to write for a signed-in account, given what is
 * currently stored. Pure, so the "never clobber isPaid/date" rules can be tested
 * without a database.
 *
 * @param {object} user - the Firebase Auth user (email, displayName)
 * @param {object|null} storedDoc - the existing users/{uid} data, or null
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
  // isPaid and date are server-owned and must never appear in the patch.
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
 * Store the signed-in account in Firestore as users/{uid}. Called after every
 * successful sign-in so the document exists even if the user never opens
 * /profile. Existing documents are never clobbered: only a blank userName and a
 * changed email are patched, and isPaid/date are left untouched.
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

    const path = userPath(user.uid);
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
