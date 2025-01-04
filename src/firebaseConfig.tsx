// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore for Firestore

// Your web app's Firebase configuration
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

// Initialize Auth and Firestore with the modular SDK
export const auth = getAuth(app); // Get Auth instance
export const db = getFirestore(app); // Get Firestore instance