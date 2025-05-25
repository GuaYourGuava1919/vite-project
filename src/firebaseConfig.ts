// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNv67xukm6zDENYLsORsWej5WTEEgoop4",
  authDomain: "xyz-6a983.firebaseapp.com",
  projectId: "xyz-6a983",
  storageBucket: "xyz-6a983.firebasestorage.app",
  messagingSenderId: "70987350301",
  appId: "1:70987350301:web:de13858b41eec1548861f4",
  measurementId: "G-2ZL8Z2TSGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };