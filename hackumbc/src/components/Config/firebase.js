// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2cbKuXV_oHOATeRy7EdSube8C4cAjFjc",
  authDomain: "hackumbc-9cd60.firebaseapp.com",
  projectId: "hackumbc-9cd60",
  storageBucket: "hackumbc-9cd60.appspot.com",
  messagingSenderId: "617320581493",
  appId: "1:617320581493:web:3e73fdea5e1fdb2a0d2b3c",
  measurementId: "G-4B2FVL1GLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);