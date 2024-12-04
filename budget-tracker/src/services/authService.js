import { useState, useEffect } from "react"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
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

    // Check if the user document exists
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Create the document only if it doesn't exist
      await setDoc(userRef, {
        name: user.displayName || "Anonymous",
        createdAt: new Date(),
      });
      console.log("User document created!");
    } else {
      console.log("User document already exists.");
    }
  } else {
    console.log("No user signed in.");
  }
});