import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-53bc4.firebaseapp.com",
  projectId: "mern-blog-53bc4",
  storageBucket: "mern-blog-53bc4.appspot.com",
  messagingSenderId: "888876964503",
  appId: "1:888876964503:web:bcaf5c964404296888a7d2"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);