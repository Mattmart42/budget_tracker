import { db } from "../firebaseConfig"
import { getDoc, updateDoc, doc, increment, onSnapshot } from "firebase/firestore"

export async function updateSpending({ userId, food, home, transportation, entertainment, shopping, other }) {
  if (!userId) {
    throw new Error("User ID is required to update spending.");
  }
  const userRef = doc(db, 'users', userId);
  const data = {
    food: food || 0,
    home: home || 0,
    transportation: transportation || 0,
    entertainment: entertainment || 0,
    shopping: shopping || 0,
    other: other || 0,
  };
  await updateDoc(userRef, {
    food: increment(data.food),
    home: increment(data.home),
    transportation: increment(data.transportation),
    entertainment: increment(data.entertainment),
    shopping: increment(data.shopping),
    other: increment(data.other),
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

export async function getSpending({ userId }) {
  if (!userId) {
    console.error("User ID is null. Cannot fetch spending data.");
    return [];
  }
  try {
    const data = await getUserData({ userId });
    if (data) {
      const dataList = [
        data.food || 0,
        data.home || 0,
        data.transportation || 0,
        data.entertainment || 0,
        data.shopping || 0,
        data.other || 0,
      ];
      console.log("Spending data:", dataList);
      return dataList;
    } else {
      console.error("No data found for the user.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching spending data:", error);
    return [];
  }
}

export async function updateBudget({ userId, foodBudget, homeBudget, transportationBudget, entertainmentBudget, shoppingBudget, otherBudget }) {
  if (!userId) {
    throw new Error("User ID is required to update budget.");
  }
  const userRef = doc(db, 'users', userId);
  const data = {
    foodBudget: foodBudget || 0,
    homeBudget: homeBudget || 0,
    transportationBudget: transportationBudget || 0,
    entertainmentBudget: entertainmentBudget || 0,
    shoppingBudget: shoppingBudget || 0,
    otherBudget: otherBudget || 0,
  };
  await updateDoc(userRef, {
    foodBudget: increment(data.foodBudget),
    homeBudget: increment(data.homeBudget),
    transportationBudget: increment(data.transportationBudget),
    entertainmentBudget: increment(data.entertainmentBudget),
    shoppingBudget: increment(data.shoppingBudget),
    otherBudget: increment(data.otherBudget),
  });
}

export async function resetBudget({ userId, foodBudget, homeBudget, transportationBudget, entertainmentBudget, shoppingBudget, otherBudget }) {
  const data = { foodBudget, homeBudget, transportationBudget, entertainmentBudget, shoppingBudget, otherBudget }
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    foodBudget: 0,
    homeBudget: 0,
    transportationBudget: 0,
    entertainmentBudget: 0,
    shoppingBudget: 0,
    otherBudget: 0
  });
}

export async function getBudget({ userId }) {
  if (!userId) {
    console.error("User ID is null. Cannot fetch budget data.");
    return [];
  }
  try {
    const data = await getUserData({ userId });
    if (data) {
      const dataList = [
        data.foodBudget || 0,
        data.homeBudget || 0,
        data.transportationBudget || 0,
        data.entertainmentBudget || 0,
        data.shoppingBudget || 0,
        data.otherBudget || 0,
      ];
      console.log("Budget data:", dataList);
      return dataList;
    } else {
      console.error("No data found for the user.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching budget data:", error);
    return [];
  }
}

export async function getUserData({ userId }) {
  if (!userId) {
    console.error("User ID is null. Cannot fetch user data.");
    return null;
  }
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
