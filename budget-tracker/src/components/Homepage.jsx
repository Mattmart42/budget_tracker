import { useAuthentication } from "../services/authService"
import { useState, useEffect, useMemo } from "react";
import { updateSpending, resetSpending, getSpending } from "../services/userService";

export function HomePage() {
  const [food, setFood] = useState(0)
  const [home, setHome] = useState(0)
  const [transportation, setTransportation] = useState(0)
  const [entertainment, setEntertainment] = useState(0)
  const [shopping, setShopping] = useState(0)
  const [other, setOther] = useState(0)
  
  const [spendingData, setSpendingData] = useState([]);

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
        },
        {
          label: "Budget",
          data: [250, 100, 100, 200, 200, 100],
        },
      ],
    },
  }), [spendingData]);

  const chartUrl = useMemo(() => {
    return `https://quickchart.io/chart?width=500&height=300&chart=${encodeURIComponent(
      JSON.stringify(chartData)
    )}`;
  }, [chartData]);

  function addUserData({ food, home, transportation, entertainment, shopping, other }) {
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
  
  function resetUserData({ food, home, transportation, entertainment, shopping, other }) {
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

  function handleInputChange(event, setter) {
    const value = event.target.value;
    setter(value);
  }

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
        <button onClick={() => addUserData({ food, home, transportation, entertainment, shopping, other })} id="updateSpendingButton">Update Spending</button>
        <br></br>
        <br></br>
        <button onClick={() => resetUserData({ food, home, transportation, entertainment, shopping, other })} id="resetSpendingButton">Reset Spending</button>
        <br></br>
      </article>
      <>
        <img src={chartUrl} alt="Spending Chart" />
      </>
    </div>
  );
}
