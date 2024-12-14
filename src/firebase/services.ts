import {
  signInWithEmailAndPassword,
  getAuth,
  db,
  setDoc,
  doc,
  collection,
} from "./firebase";

const signIn = async () => {
  const auth = getAuth();
  if (!auth?.currentUser) {
    return await signInWithEmailAndPassword(
      auth,
      process.env.NEXT_PUBLIC_EMAIL as string,
      process.env.NEXT_PUBLIC_PASSWORD as string
    );
  }
};

export const setEmail = async (email: string) => {
  await signIn();
  const ref = doc(collection(db, "emails"));
  await setDoc(ref, { email });
};
