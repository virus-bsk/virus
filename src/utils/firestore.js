// Thin Firestore helpers, mirroring utils/realtimeDB.js: every call resolves to
// { ok: true, ... } or { ok: false, error } so callers never need try/catch.
// Paths use the same "collection/id" string form as the RTDB helper.
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

// Field sentinels and query builders re-exported so the UI layer imports only
// from this module, never from "firebase/firestore" directly.
export {
  arrayRemove,
  arrayUnion,
  increment,
  limit,
  orderBy,
  serverTimestamp,
  where,
};

// "users/abc123" -> ["users", "abc123"] (Firestore wants the parts separately).
function toSegments(path) {
  return String(path ?? "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
}

function documentRef(path) {
  const segments = toSegments(path);
  if (segments.length === 0 || segments.length % 2 !== 0) {
    throw new Error(
      `Invalid document path "${path}" — expected "collection/id" or "collection/id/subcollection/id".`,
    );
  }
  return doc(db, ...segments);
}

function collectionRef(path) {
  const segments = toSegments(path);
  if (segments.length === 0 || segments.length % 2 !== 1) {
    throw new Error(
      `Invalid collection path "${path}" — expected "collection" or "collection/id/subcollection".`,
    );
  }
  return collection(db, ...segments);
}

function withConstraints(path, constraints) {
  const base = collectionRef(path);
  return constraints.length ? query(base, ...constraints) : base;
}

function snapshotToDoc(snap) {
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Add a document with an auto-generated id (docs: addDoc).
export async function addDocument(collectionPath, value) {
  try {
    const ref = await addDoc(collectionRef(collectionPath), value);
    return { ok: true, id: ref.id, path: `${collectionPath}/${ref.id}` };
  } catch (err) {
    return { ok: false, error: err };
  }
}

// Create or overwrite "collection/id". Pass { merge: true } as the third
// argument to merge fields into an existing document instead of replacing it.
export async function setDocument(path, value, options = {}) {
  try {
    const ref = documentRef(path);
    await setDoc(ref, value, options);
    return { ok: true, id: ref.id };
  } catch (err) {
    return { ok: false, error: err };
  }
}

// Patch only the given fields. Dot notation updates nested fields without
// clobbering their siblings, e.g. { "favorites.color": "Red" }.
export async function updateDocument(path, partial) {
  try {
    await updateDoc(documentRef(path), partial);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err };
  }
}

export async function getDocument(path, options = {}) {
  try {
    const snap = await getDoc(documentRef(path), options);
    return { ok: true, exists: snap.exists(), value: snapshotToDoc(snap) };
  } catch (err) {
    return { ok: false, error: err };
  }
}

export async function getCollection(collectionPath, constraints = []) {
  try {
    const snap = await getDocs(withConstraints(collectionPath, constraints));
    return { ok: true, value: snap.docs.map(snapshotToDoc) };
  } catch (err) {
    return { ok: false, error: err };
  }
}

export async function removeDocument(path) {
  try {
    await deleteDoc(documentRef(path));
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err };
  }
}

// Live document listener. Returns an unsubscribe function; the callback gets
// (value, error) and value is null when the document does not exist.
export function subscribeDocument(path, callback) {
  let unsubscribe = () => {};
  try {
    unsubscribe = onSnapshot(
      documentRef(path),
      (snap) => callback(snapshotToDoc(snap), null),
      (error) => callback(null, error),
    );
  } catch (err) {
    callback(null, err);
  }
  return () => unsubscribe();
}

// Live collection listener, e.g. subscribeCollection("messages", setRows).
export function subscribeCollection(collectionPath, callback, constraints = []) {
  let unsubscribe = () => {};
  try {
    unsubscribe = onSnapshot(
      withConstraints(collectionPath, constraints),
      (snap) => callback(snap.docs.map(snapshotToDoc), null),
      (error) => callback(null, error),
    );
  } catch (err) {
    callback(null, err);
  }
  return () => unsubscribe();
}

// Firestore returns Timestamp objects — run them through this before
// formatting, e.g. asDate(doc.date)?.toLocaleDateString().
export function asDate(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
