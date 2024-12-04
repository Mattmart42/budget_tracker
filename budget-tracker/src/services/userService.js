import { db } from "../firebaseConfig"
import {
  collection,
  query,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  orderBy,
  limit,
  doc,
  FieldValue,
  increment,
  Timestamp,
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";

 export async function updateSpending({ userId, food, home, transportation, entertainment, shopping, other }) {
    
    const data = { food, home, transportation, entertainment, shopping, other }
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      food: increment(food),
      home: increment(home),
      transportation: increment(transportation),
      entertainment: increment(entertainment),
      shopping: increment(shopping),
      other: increment(other)
  });
  }

  export async function resetSpending({ userId, food, home, transportation, entertainment, shopping, other }) {
    
    const data = { food, home, transportation, entertainment, shopping, other }
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      food: 0,
      home: 0,
      transportation: 0,
      entertainment: 0,
      shopping: 0,
      other: 0
  });
  }


  export function getSpending(userId) {
    const userRef = doc(db, 'users', userId);
    userRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        console.log("Food Budget:", data.food);
        console.log("Home Budget:", data.home);
        console.log("Transportation Budget:", data.transportation);
        console.log("Food Budget:", data.entertainment);
        console.log("Food Budget:", data.shopping);
        console.log("Food Budget:", data.other);
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

export function listenToSpending(userId) {
  const userRef = doc(db, 'users', userId);
    userRef.onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        updateSpendingUI(data.spending);
      }
    });
  }







    
  