import React, { useEffect, useState } from "react";
import axios from "axios";

const Suggestion = () => {
  const [fetched, setFetched] = useState(true);
  const [queries, setQueries] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("queriesArrayInSession");
    const retrievedArray = storedData ? JSON.parse(storedData) : null; // Check if storedData is not null

    if (retrievedArray && retrievedArray.length !== 0) {
      setQueries(retrievedArray);
    } else {
      // If no stored data, initialize with default query
      setQueries([
        {
          quer: {
            answerFromGemini: "What would you like to eat today?",
          },
          sendOrReceive: "receive",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    // Store queries in sessionStorage whenever it changes
    sessionStorage.setItem("queriesArrayInSession", JSON.stringify(queries));
  }, [queries]);

  const appendValue = async () => {
    if (!currentQuery.trim()) {
      alert("Please enter a query.");
      return;
    }
    setFetched(false);
    const objectNew = {
      quer: currentQuery,
      sendOrReceive: "send",
    };

    // Update queries state
    setQueries((prevQueries) => [...prevQueries, objectNew]);

    try {
      const response = await axios.get(
        "import.meta.env.VITE_URL/API/aiFoodDelivery/geminiRes",
        {
          params: {
            userReq: currentQuery,
          },
        }
      );

      if (response) {
        setFetched(true);
        setCurrentQuery("");
        const objectForResponse = {
          quer: response.data,
          sendOrReceive: "receive",
        };
        setQueries((prevQueries) => [...prevQueries, objectForResponse]);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
      setFetched(true);
    }
  };

  return (
    <div className="suggestion-parent">
      <h1 className="suggestion-heading">
        Suggest <span>Me</span>
      </h1>
      <div className="suggestion-details">
        <div className="huihuihui">Not sure what to order?</div>
        Let us help! Simply tell us your mood or craving, and we'll suggest the
        perfect meal to satisfy your taste buds. Whether you're looking for
        comfort food, a healthy option, or something indulgent, we’ve got you
        covered!
      </div>
      <div className="main-suggestion">
        <textarea
          readOnly={!fetched}
          className="textarea"
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
        ></textarea>
        <button onClick={appendValue}>Send</button>
      </div>
      <div className="suggestions-listout">
        {queries.length != 0 &&
          queries.map((item, index) => {
            if (item.sendOrReceive == "send") {
              return (
                <div key={index} className="temp-temp">
                  <textarea readOnly className="suggestions-listout-right">
                    {item.quer}
                  </textarea>
                </div>
              );
            } else if (item.sendOrReceive == "receive") {
              return (
                <h1 key={index} className="suggestions-listout-left">
                  {item.quer?.answerFromGemini}
                </h1>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Suggestion;

//SESSION STORAGE NOT WORKING
