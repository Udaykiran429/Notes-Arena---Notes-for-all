// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3csnKqe-fk4RTkqlOtTURI50a01zJ_rs",
  authDomain: "notes-arena---notes-for-all.firebaseapp.com",
  projectId: "notes-arena---notes-for-all",
  storageBucket: "notes-arena---notes-for-all.firebasestorage.app",
  messagingSenderId: "243010814919",
  appId: "1:243010814919:web:747aec62b04109fdd8cfe2",
  measurementId: "G-NYJD4VFX7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { analytics };
export default app;