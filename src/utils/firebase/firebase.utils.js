import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdRMbqraYR8kUxQqS-F4qlJHtQI131Vh8",
  authDomain: "crwn-clothing-db-1fcde.firebaseapp.com",
  projectId: "crwn-clothing-db-1fcde",
  storageBucket: "crwn-clothing-db-1fcde.appspot.com",
  messagingSenderId: "496200788266",
  appId: "1:496200788266:web:0d06472d2d0290d59f1653",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// create Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// export Auth functions
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// create document for authenticated user
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user doesn't exist in Firestore, use the user info we get from userAuth and create user doc in Firestore
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
