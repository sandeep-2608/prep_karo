// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEvA_8ucV1Lu2I5q3-rGOO8DPKZ8ZXcV8",
    authDomain: "prepkaro-d31a6.firebaseapp.com",
    projectId: "prepkaro-d31a6",
    storageBucket: "prepkaro-d31a6.firebasestorage.app",
    messagingSenderId: "65967133463",
    appId: "1:65967133463:web:7ca939298cd7a992f0dd52",
    measurementId: "G-0301HP3W9L"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);