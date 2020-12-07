import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../services";
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

const container = {
  width: "auto",
};

const NotFound = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="outer">
      <h1 style={s404}>404</h1>
      <Link class="text-dark" to="/" style={h1}>
        <h1>Not Found! Go Home</h1>
      </Link>
    </div>
  );
};

export default NotFound;
