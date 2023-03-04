import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth"; 
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC6bhUIxX3by5AbPsyQRiXjVYKfp2WMkSA",
  authDomain: "learning-793f0.firebaseapp.com",
  projectId: "learning-793f0",
  storageBucket: "learning-793f0.appspot.com",
  messagingSenderId: "734938534850",
  appId: "1:734938534850:web:6cebbdd842b3f79200fc5b",
  measurementId: "G-5PREK988R6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)


