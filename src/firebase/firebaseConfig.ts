// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACWkMosOjbVCJJIiZUO78WaxwSpv8hKug",
  authDomain: "ticktick-f4f63.firebaseapp.com",
  projectId: "ticktick-f4f63",
  storageBucket: "ticktick-f4f63.appspot.com",
  messagingSenderId: "1000812617195",
  appId: "1:1000812617195:web:9f41a1c0cc36c47e484dae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
