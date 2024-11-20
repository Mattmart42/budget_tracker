import { useState, useEffect } from "react"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"

export function login() {
  return signInWithPopup(auth, new GoogleAuthProvider())
}

export function logout() {
  return signOut(auth)
}

export function loggedInUserDisplayName() {
  return auth.currentUser.displayName
}

export function useAuthentication() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null)
    })
  }, [])
  return user
}

auth.onAuthStateChanged(async (user) => {
  if (user) {
      const userRef = doc(db, "users", user.uid);
      
      // Set initial data if the document doesn't already exist
      await setDoc(userRef, {
          name: user.displayName || "Anonymous",
          createdAt: new Date(),
      }, { merge: true }); // `merge: true` ensures existing data isn't overwritten
      console.log("User document connected/created!");
  } else {
      console.log("No user signed in.");
  }
});