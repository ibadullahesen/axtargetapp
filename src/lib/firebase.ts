import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // BURANI ƏVVƏL KOPYALADIĞIN REAL CONFIG İLƏ DƏYİŞ
  apiKey: "AIzaSyC-QALot6Wp5_mVe4s3ekB8JWq-qDUUOqQ",           // sənin real apiKey
  authDomain: "premiumstore-adece.firebaseapp.com",
  projectId: "premiumstore-adece",
  storageBucket: "premiumstore-adece.firebasestorage.app",
  messagingSenderId: "1058991155256",
  appId: "1:1058991155256:web:942e3aaa544570355f9ecd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
