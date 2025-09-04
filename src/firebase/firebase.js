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
  apiKey: "AIzaSyAruPkpD_MuD44VZz5e9ji4T0ARmIk5a20",
  authDomain: "docsvisita.firebaseapp.com",
  projectId: "docsvisita",
  storageBucket: "docsvisita.firebasestorage.app",
  messagingSenderId: "498625541429",
  appId: "1:498625541429:web:e8068cb5d7e2b25c65c87c",
  measurementId: "G-28F8WN0TJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };