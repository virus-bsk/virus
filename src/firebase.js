// Firebase app initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import {
  getAuth,
  onAuthStateChanged,
  connectAuthEmulator,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSAjzynHVkDeVySMRwZwc_6W3SJtuba4M",
  authDomain: "bskcoding-vb.firebaseapp.com",
  databaseURL: "https://bskcoding-vb-default-rtdb.firebaseio.com",
  projectId: "bskcoding-vb",
  storageBucket: "bskcoding-vb.firebasestorage.app",
  messagingSenderId: "433970548419",
  appId: "1:433970548419:web:b23633d69c733202ad1c76",
  measurementId: "G-WG0PC34MSQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// App Check must be initialized before Firestore so requests include attestation.
const recaptchaEnterpriseSiteKey = import.meta.env
  .VITE_RECAPTCHA_ENTERPRISE_SITE_KEY;
if (typeof window !== "undefined") {
  if (recaptchaEnterpriseSiteKey) {
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(recaptchaEnterpriseSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } else {
    console.error(
      "Firebase App Check is enforced for Firestore, but VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is not configured.",
    );
  }
}

// Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// Local emulator support for Authentication
const useAuthEmulator = import.meta.env.VITE_USE_AUTH_EMULATOR === "true";
const authEmulatorHost =
  import.meta.env.VITE_AUTH_EMULATOR_HOST || "127.0.0.1:9099";
if (useAuthEmulator && typeof window !== "undefined") {
  connectAuthEmulator(auth, `http://${authEmulatorHost}`);
  console.log("Firebase Auth connected to emulator:", authEmulatorHost);
}

// Analytics (Browser only)
try {
  if (typeof window !== "undefined") {
    getAnalytics(app);
  }
} catch (error) {
  console.warn("Analytics initialization failed:", error);
}

// Export App
export default app;

export const googleProvider = new GoogleAuthProvider();

// Store logged-in user in localStorage
if (typeof window !== "undefined") {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const currentUser = {
        id: user.uid,
        name: user.displayName || user.email?.split("@")[0] || "",
        email: user.email,
      };

      localStorage.setItem("bsk_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("bsk_current_user");
    }
  });
}
