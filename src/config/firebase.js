// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQJILp14XiyycUN5Xxy12Se54kzIHkTW8",
  authDomain: "khanasabkeliye.firebaseapp.com",
  projectId: "khanasabkeliye",
  storageBucket: "khanasabkeliye.appspot.com",
  messagingSenderId: "867887283134",
  appId: "1:867887283134:web:e447b8175460a97732d7ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;