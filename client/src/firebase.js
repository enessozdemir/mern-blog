// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-53bc4.firebaseapp.com",
  projectId: "mern-blog-53bc4",
  storageBucket: "mern-blog-53bc4.appspot.com",
  messagingSenderId: "888876964503",
  appId: "1:888876964503:web:bcaf5c964404296888a7d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);