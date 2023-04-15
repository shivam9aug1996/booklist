// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGOqjk-GMx3Dz1FYIN4D0KeQAg312aCmQ",
  authDomain: "booklist-503f3.firebaseapp.com",
  projectId: "booklist-503f3",
  storageBucket: "booklist-503f3.appspot.com",
  messagingSenderId: "1051285253051",
  appId: "1:1051285253051:web:45455d63374e36acb0329e",
  measurementId: "G-7TYS5GM1BH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;
