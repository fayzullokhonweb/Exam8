import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCd5Snqczes6rTy1Z3HfO6iMZrFtFHdg-Y",
  authDomain: "myexam-66ae9.firebaseapp.com",
  projectId: "myexam-66ae9",
  storageBucket: "myexam-66ae9.appspot.com",
  messagingSenderId: "493606047109",
  appId: "1:493606047109:web:1143c7903e08379f8208ec",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
