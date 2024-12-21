// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2TOxGH7d6cTmyw84hKARqYvUD0xqMaN8",
  authDomain: "ev-battery-diagnosis.firebaseapp.com",
  projectId: "ev-battery-diagnosis",
  storageBucket: "ev-battery-diagnosis.firebasestorage.app",
  messagingSenderId: "751049498171",
  appId: "1:751049498171:web:2ac9694d757eea12da461e",
  measurementId: "G-296GJ93T6E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
