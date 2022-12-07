import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUYTZOD3_AoS4PozJz5pRo2F569SUgvgo",
  authDomain: "crwn-clothing-db-e29ff.firebaseapp.com",
  projectId: "crwn-clothing-db-e29ff",
  storageBucket: "crwn-clothing-db-e29ff.appspot.com",
  messagingSenderId: "773673657393",
  appId: "1:773673657393:web:5298bc51f67eae99082110",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
