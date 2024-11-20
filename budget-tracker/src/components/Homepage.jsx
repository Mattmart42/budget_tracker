import { login, logout, loggedInUserDisplayName } from "../services/authService"
import { useState } from "react";



export function getUid(){
  const uid = user.uid;
  console.log("User ID:", uid);
}

export function HomePage() {
  const [balance, setBalance] = useState(Number)
  const [budget, setBudget] = useState(Number)
  return (
    <div className="homepage">
      <h1>. </h1>
      <input value="100" id="balance"></input>
      <br></br>
      <input value="20" id="budget"></input>
      <br></br><br></br>
      <button onClick="addUserData({ balance, budget });" id="submit">submit</button>
    </div>
  );

  function addUserData({ balance, budget }) {
    updateUser({ balance, budget }).then((user) => {
      setBalance(document.getElementById("balance"))
      setBudget(budget)
    })
  }
  
}
