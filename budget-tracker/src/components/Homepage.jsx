import { login, logout, loggedInUserDisplayName, useAuthentication } from "../services/authService"
import { useState } from "react";
import { updateSpending, resetSpending } from "../services/userService";

export function HomePage() {
  const [balance, setBalance] = useState(Number)
  const [budget, setBudget] = useState(Number)

  const [food, setFood] = useState(Number)
  const [home, setHome] = useState(Number)
  const [transportation, setTransportation] = useState(Number)
  const [entertainment, setEntertainment] = useState(Number)
  const [shopping, setShopping] = useState(Number)
  const [other, setOther] = useState(Number)
  const user = useAuthentication()
  let userId = user ? user.uid : null;

  return (
    <div className="homepage">
      <h1>Categories</h1>
      <article>
        <form>
          <div>
            <label>Food: </label>
            <input
              type="number"
              value={food}
              onChange={(e) => handleInputChange(e, setFood)}
            />
          </div>
          <div>
            <label>Home: </label>
            <input
              type="number"
              value={home}
              onChange={(e) => handleInputChange(e, setHome)}
            />
          </div>
          <div>
            <label>Transportation: </label>
            <input
              type="number"
              value={transportation}
              onChange={(e) => handleInputChange(e, setTransportation)}
            />
          </div>
          <div>
            <label>Entertainment: </label>
            <input
              type="number"
              value={entertainment}
              onChange={(e) => handleInputChange(e, setEntertainment)}
            />
          </div>
          <div>
            <label>Shopping: </label>
            <input
              type="number"
              value={shopping}
              onChange={(e) => handleInputChange(e, setShopping)}
            />
          </div>
          <div>
            <label>Other: </label>
            <input
              type="number"
              value={other}
              onChange={(e) => handleInputChange(e, setOther)}
            />
          </div>
        </form>
        <br></br>
        <button onClick={() => addUserData({ food, home, transportation, entertainment, shopping, other })} id="submit">Update Spending</button>
        <br></br>
        <button onClick={() => resetUserData({ food, home, transportation, entertainment, shopping, other })} id="reset">Reset</button>
        <br></br>
      </article>
    </div>
  );

  function addUserData({ food, home, transportation, entertainment, shopping, other }) {
    updateSpending({ userId, food, home, transportation, entertainment, shopping, other }).then((user) => {
      setFood(food);
      setHome(home);
      setTransportation(transportation);
      setEntertainment(entertainment);
      setShopping(shopping);
      setOther(other);
    })
  }
  
  function resetUserData({ food, home, transportation, entertainment, shopping, other }) {
    resetSpending({ userId, food, home, transportation, entertainment, shopping, other }).then((user) => {
      setFood(0);
      setHome(0);
      setTransportation(0);
      setEntertainment(0);
      setShopping(0);
      setOther(0);
    })
  }

  function handleInputChange(event, setter) {
    const value = event.target.value;
    setter(value);
  }
}
