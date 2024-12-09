import { useAuthentication } from "../services/authService"
import { useState, useEffect, useMemo } from "react";
import { updateSpending, resetSpending, getSpending, updateBudget, resetBudget, getBudget } from "../services/userService";

export function HomePage() {
  const [food, setFood] = useState(0)
  const [home, setHome] = useState(0)
  const [transportation, setTransportation] = useState(0)
  const [entertainment, setEntertainment] = useState(0)
  const [shopping, setShopping] = useState(0)
  const [other, setOther] = useState(0)

  const [foodBudget, setFoodBudget] = useState(0)
  const [homeBudget, setHomeBudget] = useState(0)
  const [transportationBudget, setTransportationBudget] = useState(0)
  const [entertainmentBudget, setEntertainmentBudget] = useState(0)
  const [shoppingBudget, setShoppingBudget] = useState(0)
  const [otherBudget, setOtherBudget] = useState(0)
  
  const [spendingData, setSpendingData] = useState([]);

  const [budgetData, setBudgetData] = useState([]);

  const user = useAuthentication()
  let userId = user ? user.uid : null;
  
  useEffect(() => {
    if (userId) {
      getSpending({ userId })
        .then((data) => {
          console.log("Fetched spending data:", data);
          setSpendingData(data);
        })
        .catch((error) => {
          console.error("Error fetching spending data:", error);
        });
    }
  }, [userId]); 

  useEffect(() => {
    if (userId) {
      getBudget({ userId })
        .then((data) => {
          console.log("Fetched budget data:", data);
          setBudgetData(data);
        })
        .catch((error) => {
          console.error("Error fetching budget data:", error);
        });
    }
  }, [userId]); 

  const chartData = useMemo(() => ({
    type: "bar",
    data: {
      labels: [
        "Food",
        "Home",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Other",
      ],
      datasets: [
        {
          label: "Spending",
          data: spendingData,
          backgroundColor: [
            "#76E076",
          ],
        },
        {
          label: "Budget",
          data: budgetData,
          backgroundColor: [
            "#646CFF",
          ],
        },
      ],
    },
  }), [spendingData, budgetData]);

  const chartUrl = useMemo(() => {
    const chartWidth = Math.min(window.innerWidth * 0.8, 600);
    const chartHeight = chartWidth * 0.6;
    
    return `https://quickchart.io/chart?width=${chartWidth}&height=${chartHeight}&chart=${encodeURIComponent(
      JSON.stringify(chartData)
    )}`;
  }, [chartData]);

  function addUserSpending({ food, home, transportation, entertainment, shopping, other }) {
    updateSpending({ userId, food, home, transportation, entertainment, shopping, other })
      .then(() => {
        console.log("Spending data updated successfully");
        getSpending({ userId })
          .then((data) => {
            console.log("Fetched updated spending data:", data);
            setSpendingData(data);
          })
          .catch((error) => {
            console.error("Error fetching updated spending data:", error);
          });
        setFood(food);
        setHome(home);
        setTransportation(transportation);
        setEntertainment(entertainment);
        setShopping(shopping);
        setOther(other);
      })
      .catch((error) => {
        console.error("Error updating spending data:", error);
      });
  }
  
  function resetUserSpending({ food, home, transportation, entertainment, shopping, other }) {
    resetSpending({ userId, food, home, transportation, entertainment, shopping, other })
      .then(() => {
        setFood(0);
        setHome(0);
        setTransportation(0);
        setEntertainment(0);
        setShopping(0);
        setOther(0);
        setSpendingData([]);
      })
      .catch((error) => {
        console.error("Error updating spending data:", error);
      });
  }

  function addUserBudget({ foodBudget, homeBudget, transportationBudget, entertainmentBudget, shoppingBudget, otherBudget }) {
    updateBudget({ userId, foodBudget, homeBudget, transportationBudget, entertainmentBudget, shoppingBudget, otherBudget })
      .then(() => {
        console.log("Budget data updated successfully");
        getBudget({ userId })
          .then((data) => {
            console.log("Fetched updated budget data:", data);
            setBudgetData(data);
          })
          .catch((error) => {
            console.error("Error fetching updated budget data:", error);
          });
        setFoodBudget(foodBudget);
        setHomeBudget(homeBudget);
        setTransportationBudget(transportationBudget);
        setEntertainmentBudget(entertainmentBudget);
        setShoppingBudget(shoppingBudget);
        setOtherBudget(otherBudget);
      })
      .catch((error) => {
        console.error("Error updating budget data:", error);
      });
  }
  
  function resetUserBudget({ foodBudget, homeBudget, transportationBudget, entertainmentBudget, shoppingBudget, otherBudget }) {
    resetBudget({ userId, foodBudget, homeBudget, transportationBudget, entertainmentBudget, shoppingBudget, otherBudget })
      .then(() => {
        setFoodBudget(0);
        setHomeBudget(0);
        setTransportationBudget(0);
        setEntertainmentBudget(0);
        setShoppingBudget(0);
        setOtherBudget(0);
        setBudgetData([]);
      })
      .catch((error) => {
        console.error("Error updating budget data:", error);
      });
  }

  function handleInputChange(event, setter) {
    const value = event.target.value;
    setter(value);
  }

  return (
    <div className="homepage">
      <article>
        <div className="buttonBar">
          <h2>Budget</h2>
          <div className="buttons">
            <button onClick={() => addUserBudget({ foodBudget, homeBudget, transportationBudget, entertainmentBudget, shoppingBudget, otherBudget })} id="updateBudgetButton">Update Budget</button>
            <br></br>
            <button onClick={() => resetUserBudget({ foodBudgetBudget, homeBudget, transportationBudget, entertainmentBudget, shoppingBudget, otherBudget })} id="resetBudgetButton">Reset Budget</button>
          </div>
        </div>
        <form>
          <div>
            <label>Food: </label>
            <input
              type="number"
              value={foodBudget}
              onChange={(e) => handleInputChange(e, setFoodBudget)}
            />
          </div>
          <div>
            <label>Home: </label>
            <input
              type="number"
              value={homeBudget}
              onChange={(e) => handleInputChange(e, setHomeBudget)}
            />
          </div>
          <div>
            <label>Transportation: </label>
            <input
              type="number"
              value={transportationBudget}
              onChange={(e) => handleInputChange(e, setTransportationBudget)}
            />
          </div>
          <div>
            <label>Entertainment: </label>
            <input
              type="number"
              value={entertainmentBudget}
              onChange={(e) => handleInputChange(e, setEntertainmentBudget)}
            />
          </div>
          <div>
            <label>Shopping: </label>
            <input
              type="number"
              value={shoppingBudget}
              onChange={(e) => handleInputChange(e, setShoppingBudget)}
            />
          </div>
          <div>
            <label>Other: </label>
            <input
              type="number"
              value={otherBudget}
              onChange={(e) => handleInputChange(e, setOtherBudget)}
            />
          </div>
        </form>
      </article>
      <article>
        <div className="buttonBar">
          <h2>Spending</h2>
          <div className="buttons">
            <button onClick={() => addUserSpending({ food, home, transportation, entertainment, shopping, other })} id="updateSpendingButton">Update Spending</button>
            <br></br>
            <button onClick={() => resetUserSpending({ food, home, transportation, entertainment, shopping, other })} id="resetSpendingButton">Reset Spending</button>
          </div>
        </div>
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
      </article>
      <>
        <img src={chartUrl} alt="Spending Chart" />
      </>
    </div>
  );
}
