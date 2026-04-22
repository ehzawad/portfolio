import type { PortfolioContent } from "../types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export function hasFirebaseConfig() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId,
  );
}

export async function loadFirebasePortfolio(): Promise<PortfolioContent | null> {
  if (!hasFirebaseConfig()) {
    return null;
  }

  const [{ initializeApp }, { doc, getDoc, getFirestore }] = await Promise.all([
    import("firebase/app"),
    import("firebase/firestore"),
  ]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const snapshot = await getDoc(doc(db, "portfolio", "live"));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as PortfolioContent;
}
