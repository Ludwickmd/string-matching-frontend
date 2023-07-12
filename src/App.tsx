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
  const [matchedString, setMatchedString] = useState<any>(null);
  
  const getStringMatcher = async (event: any) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: userQuery,
        value: stringInput,
      }),
    }).then((res) => res.json());
    setListofPossibleCombination(response);
    const filteredMatchedString = response.filter(
      (string: any) => userQuery === string.value
    );
    setMatchedString(filteredMatchedString);
  };

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
          {matchedString?.map((filter:any,index:number) => {
            return (
              <p key={index}>
                Result : {userQuery}{" "}
                <span>
                  {" "}
                  (Query found at {filter?.starts} to{" "}
                  {filter?.ends})
                </span>
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
