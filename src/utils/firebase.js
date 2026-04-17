// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxdyj9RxbmB6520DllPNGN2jgHS7yNNmM",
  authDomain: "recharge-plus-1e437.firebaseapp.com",
  projectId: "recharge-plus-1e437",
  storageBucket: "recharge-plus-1e437.firebasestorage.app",
  messagingSenderId: "435283149225",
  appId: "1:435283149225:web:17b3b8e521c2c4067004b8",
  measurementId: "G-CZ2J4P5Y6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely (it may not be needed immediately)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn('Analytics initialization failed:', error);
}

export const auth = getAuth(app);
export const db = getFirestore(app);