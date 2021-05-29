import React from "react";
import { Link } from "react-router-dom";

const h1 = {
  marginTop: "500",
  color: "black",
  textAlign: "center",
  display: "block",
};

const s404 = {
  fontSize: "15em",
  textAlign: "center",
};

const NotFound = () => {
  return (
    <div className="outer">
      <h1 style={s404}>404</h1>
      <Link class="text-dark" to="/" style={h1}>
        <h1>Not Found!</h1>
      </Link>
    </div>
  );
};

export default NotFound;
