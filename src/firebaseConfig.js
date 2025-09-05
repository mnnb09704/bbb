import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCaXV61yBdetPVW36zOfmZyGCvv6zNWgG4",
  authDomain: "gpt-gheck.firebaseapp.com",
  databaseURL: "https://gpt-gheck-default-rtdb.firebaseio.com",
  projectId: "gpt-gheck",
  storageBucket: "gpt-gheck.firebasestorage.app",
  messagingSenderId: "56291992821",
  appId: "1:56291992821:web:1b35c7323ac3c3b26d91bc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);