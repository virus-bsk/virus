import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const PROFILE_DOCUMENT = "portfolio/venkatesh-bharath";

export async function loadPortfolioProfile() {
  const snapshot = await getDoc(doc(db, PROFILE_DOCUMENT));
  if (!snapshot.exists()) return null;

  const { content } = snapshot.data();
  if (typeof content !== "string") {
    throw new Error("The portfolio profile in Firestore has an invalid format.");
  }
  const profile = JSON.parse(content);
  if (!profile || typeof profile !== "object" || Array.isArray(profile)) {
    throw new Error("The portfolio profile text must contain a JSON object.");
  }
  return profile;
}

export async function savePortfolioProfile(profile) {
  const publicProfile = { ...profile };
  delete publicProfile.phone;
  await setDoc(doc(db, PROFILE_DOCUMENT), {
    content: JSON.stringify(publicProfile),
  });
}
