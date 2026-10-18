// Firebase utils for managing the list of Cline models with failover.
// Path: clineModels/global (single doc, updated by admin, read by cline service)
import {
  getDocument,
  setDocument,
  serverTimestamp,
} from "./firestore";

export const CLINE_MODELS_PATH = "clineModels/global";

// Default fallback models if Firebase config is missing.
export const DEFAULT_CLINE_MODELS = [
  "nvidia/nemotron-3.5-super-vl:free",
  "meta/muse-spark-open",
  "xingchen-agi/xing4.0-29b-a4b:free",
  "reflection/beam-1.0-501b-a23b",
];

// Reads the cline models config doc from Firestore.
export async function getClineModels() {
  const res = await getDocument(CLINE_MODELS_PATH);
  if (!res.ok || !res.exists) return DEFAULT_CLINE_MODELS;
  return res.value?.models ?? DEFAULT_CLINE_MODELS;
}

// Writes (merges) the models list to Firestore.
export async function setClineModels(models) {
  return await setDocument(
    CLINE_MODELS_PATH,
    { models, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export default {
  CLINE_MODELS_PATH,
  DEFAULT_CLINE_MODELS,
  getClineModels,
  setClineModels,
};