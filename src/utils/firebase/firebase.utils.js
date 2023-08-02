import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeyUEE0LuJCoYKptlMh3WKsI0Vt6QaHuI",
  authDomain: "crwn-clothing-db-291e2.firebaseapp.com",
  projectId: "crwn-clothing-db-291e2",
  storageBucket: "crwn-clothing-db-291e2.appspot.com",
  messagingSenderId: "10493081979",
  appId: "1:10493081979:web:60560e9e429e3bc99f25de",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
  ) => {
  if (!userAuth) return;  
  
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};


export const createAuthUserWithEmailAndPasword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPasword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password);
}