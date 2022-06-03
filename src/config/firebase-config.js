// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtSWc9b1AuyP0cA1pl4u_dfNLy2xGjKAc",
  authDomain: "ssd-face-recog.firebaseapp.com",
  projectId: "ssd-face-recog",
  storageBucket: "ssd-face-recog.appspot.com",
  messagingSenderId: "83667209665",
  appId: "1:83667209665:web:49355d8b566f89f3fc7340",
  measurementId: "G-D0LTSKN0V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const database = getDatabase(app);