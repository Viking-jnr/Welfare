// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVDi-EQ1DpmcyjU93lSjgmvCDY1U7ed0s",
  authDomain: "welfare1234-7563speedy.firebaseapp.com",
  projectId: "welfare1234-7563speedy",
  storageBucket: "welfare1234-7563speedy.firebasestorage.app",
  messagingSenderId: "205301748297",
  appId: "1:205301748297:web:46ef5886059070069ee598"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

//Initialize Firestore
export const db = getFirestore(app);
export const storage= getStorage(app);