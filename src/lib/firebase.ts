import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLIIwjmCoUPQxJwL6Yb-4qAinrOb6QR8M",
  authDomain: "memory-match-d134d.firebaseapp.com",
  projectId: "memory-match-d134d",
  storageBucket: "memory-match-d134d.firebasestorage.app",
  messagingSenderId: "276544892041",
  appId: "1:276544892041:web:0fd146166ebac230a56a58"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
