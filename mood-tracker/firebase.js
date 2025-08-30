// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrWHUyRS2ylommR3wIfzM7oHt9WLahgow",
  authDomain: "mood-tracker-1e3a9.firebaseapp.com",
  databaseURL: "https://mood-tracker-1e3a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mood-tracker-1e3a9",
  storageBucket: "mood-tracker-1e3a9.firebasestorage.app",
  messagingSenderId: "78958871817",
  appId: "1:78958871817:web:ef09dc28cf8eeed6ecffd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };