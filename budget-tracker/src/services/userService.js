import { db } from "../firebaseConfig"
import {
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function updateUser({ userId, balance, weeklyBudget }) {
    const data = { balance, weeklyBudget, date: Timestamp.now() }
    const userRef = doc(db, 'users', userId);
    const docRef = await setDoc(userRef, { balance: balance, weeklyBudget: weeklyBudget }, { merge: true });
    return { id: docRef.id, ...data }
  }







    
  