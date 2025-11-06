import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAuBrKQMH2MuyIKMt21YwFo_96dBDAzsp0",
    authDomain: "notcopy-aee3a.firebaseapp.com",
    projectId: "notcopy-aee3a",
    storageBucket: "notcopy-aee3a.firebasestorage.app",
    messagingSenderId: "1054968366421",
    appId: "1:1054968366421:web:55d3309ebeeafe544f9bdc",
    measurementId: "G-NLVPXDP420"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);