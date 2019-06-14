import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import SomePage from "./SomePage";
import logo from "./logo.svg";
import "./App.css";
import Page1 from "./Page1";
// const { ipcRenderer } = window.require('electron')
// https://github.com/electron/electron/issues/9920

function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/somepage">Some Page</Link>
          </li>
        </ul>
        <Route path="/" component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/somepage/" component={SomePage} />
      </Router>
    </div>
  );
}

export default App;
