
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDGKe0NZQoO1ytHPsE32xGn3IRZLnxw4pQ",
  authDomain: "budget-tracker-8f187.firebaseapp.com",
  projectId: "budget-tracker-8f187",
  storageBucket: "budget-tracker-8f187.firebasestorage.app",
  messagingSenderId: "374496622450",
  appId: "1:374496622450:web:21ff0cfc0caab86e74cfeb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)