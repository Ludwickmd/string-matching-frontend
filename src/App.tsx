import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [listOfPossibleCombination, setListofPossibleCombination] = useState(
    []
  );
  const [stringInput, setStringInput] = useState("");
  const [userQuery, setUserQuery] = useState("");

  const getStringMatcher = async (event: any) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: userQuery,
      }),
    }).then((res) => res.json());
    setListofPossibleCombination(response);
  };

  const getMatchingPortion = (combination:any) => {
  if (combination && combination.value) {
    const queryIndex = combination.value.indexOf(userQuery);
    if (queryIndex > -1) {
      const matchingText = userQuery;
      const startIndex = queryIndex;
      const endIndex = queryIndex + userQuery.length - 1;
      const prefix = combination.value.substring(0, startIndex);
      const suffix = combination.value.substring(endIndex + 1);

      return {
        matchingText,
        startIndex,
        endIndex,
        prefix,
        suffix,
      };
    }
  }
  return {
    matchingText: "",
    startIndex: -1,
    endIndex: -1,
    prefix: "",
    suffix: "",
  };
};


  const filteredCombinations = listOfPossibleCombination.filter(
    (combination) => {
      const { matchingText } = getMatchingPortion(combination);
      return matchingText !== "";
    }
  );

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>String Matching Using Vite and React JS</h1>
      <form className="card" onSubmit={getStringMatcher}>
        <input
          type="text"
          placeholder="Enter a string"
          value={stringInput}
          onChange={(event) => {
            setStringInput(event.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Enter your query"
          value={userQuery}
          onChange={(event) => {
            setUserQuery(event.target.value);
          }}
        />

        <button type="submit">Submit</button>
        <div>
          {filteredCombinations.map((combination: any, index) => {
            const { matchingText, startIndex, endIndex } =
              getMatchingPortion(combination);
            return (
              <p key={index}>
                Result {index + 1}: {combination.value}
                {startIndex > -1 && (
                  <span>
                    {" "}
                    (Query found at index {startIndex} to {endIndex})
                  </span>
                )}
              </p>
            );
          })}
        </div>
      </form>
      <p className="read-the-docs">
        The Prototype was made by Jose Gabriel Abaya, Francis Ludwick Madrid,
        Sean Patrick Uy, and Miguel Angelo Cervantes.
      </p>
    </>
  );
}

export default App;
