// Firestore service for portfolio skills — stored as their own document
// so skills can be updated independently of the full profile JSON blob.
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const SKILLS_DOCUMENT = "portfolio-skills/venkatesh-bharath";

export async function loadPortfolioSkills() {
  const snapshot = await getDoc(doc(db, SKILLS_DOCUMENT));
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  return data.skills || null;
}

export async function savePortfolioSkills(skills) {
  await setDoc(doc(db, SKILLS_DOCUMENT), {
    skills,
    updatedAt: serverTimestamp(),
  });
}