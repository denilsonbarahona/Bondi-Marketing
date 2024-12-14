import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
export { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
export { getAuth, signInWithEmailAndPassword } from "firebase/auth";

let app: ReturnType<typeof initializeApp> | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

export function initializeFirebaseClient(config: any) {
  if (!app) {
    app = initializeApp(config);
    db = getFirestore(app);
  }

  if (typeof window !== "undefined" && !analytics) {
    isSupported()
      .then((supported) => {
        if (supported) {
          analytics = getAnalytics(app!);
        }
      })
      .catch((error) => {
        console.error("Failed to initialize Firebase Analytics:", error);
      });
  }
}

export { logEvent, analytics, db };
