import React, { useEffect } from "react";
import logo from "./logo.svg";


const About = ({ history }) => {
  useEffect(() => {
    window.ipcRenderer.on("asynchronous-reply", (event, arg) => {
      console.log("arg = ", arg)
    })
  }, [])
  return (
    <header className="App-header" style={{ background: "purple" }}>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
       About page 
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <button onClick={() => window.ipcRenderer.send("asynchronous-message")}>Action</button>
      <button onClick={() => {
        const s = window.ipcRenderer.sendSync("sync-message")
        console.log("sync action =", s)
        }}>Action Sync</button>
      <button onClick={() => history.push("/")}>To Home</button>
      <button onClick={() => history.push("/about")}>To About</button>
      <button onClick={() => history.push("/somepage")}>To Some page</button>
    </header>
  );
};

export default About;
