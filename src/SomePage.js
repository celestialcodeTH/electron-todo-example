import React from "react";
import { Link } from "react-router-dom"
import logo from "./logo.svg";

const SomePage = ({ history }) => {
  return (
    <header className="App-header" style={{ background: "red" }}>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
       SomePage page 
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <button onClick={() => history.push("/")}>To Home</button>
      <button onClick={() => history.push("/about")}>To About</button>
      <button onClick={() => history.push("/somepage")}>To Some page</button>
      <Link to="/somepage">To somepage</Link>
    </header>
  );
};

export default SomePage;
