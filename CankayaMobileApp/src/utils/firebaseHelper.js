import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDk2fi8ETSlFPow0wxVxHpL3nu0THplXZA",
    authDomain: "cankaya-mobile-app.firebaseapp.com",
    projectId: "cankaya-mobile-app",
    storageBucket: "cankaya-mobile-app.appspot.com",
    messagingSenderId: "575932021265",
    appId: "1:575932021265:web:25bc0f516c6a549aa98fb0",
    measurementId: "G-QK23QMPDN0",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const firebaseAuth = getAuth(app);
