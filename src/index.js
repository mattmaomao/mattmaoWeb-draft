import React from "react";
import ReactDOM from "react-dom/client";
import { Landing } from "./pages/Landing";
import reportWebVitals from "./reportWebVitals";
import "./styles/style.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API,
  // authDomain: "mattmaoweb.firebaseapp.com",
  projectId: "mattmaoweb",
  // storageBucket: "mattmaoweb.appspot.com",
  // messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_FB_APPID,
  // measurementId: process.env.REACT_APP_FB_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Landing db={db} auth={auth} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
