import React from "react";
import ReactDOM from "react-dom/client";
import { Landing } from "./pages/Landing";
import "./styles/style.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKiCGokkMbKHjOvJDh9jYrhHsRCd2LK80",
  authDomain: "mattmaoweb.firebaseapp.com",
  projectId: "mattmaoweb",
  storageBucket: "mattmaoweb.appspot.com",
  messagingSenderId: "138185237948",
  appId: "1:138185237948:web:56c56dd7a7aa6a8e94b7b9",
  measurementId: "G-KE711Q1XTD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Landing db={db} />
  </React.StrictMode>
);
