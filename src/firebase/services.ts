import {
  signInWithEmailAndPassword,
  getAuth,
  db,
  setDoc,
  doc,
  collection,
} from "./client";

const signIn = async (authEmail: string, authPassword: string) => {
  const auth = getAuth();
  if (!auth?.currentUser) {
    return await signInWithEmailAndPassword(auth, authEmail, authPassword);
  }
};

export const setEmail = async (
  email: string,
  authEmail: string,
  authPassword: string
) => {
  if (!db) return;
  await signIn(authEmail, authPassword);
  const ref = doc(collection(db, "emails"));
  await setDoc(ref, { email });
};
