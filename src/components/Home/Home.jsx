import React from "react";
import logo from "./logo.svg";
import "./home.css";

const h1 = {
  // marginTop: 150,
};

const Home = () => {
  return (
      <div className="container home-container">
        <img style={h1} src={logo} className="App-logo" alt="logo" />
        <h1>This applcation is under development</h1>
      </div>
  );
};

export default Home;
