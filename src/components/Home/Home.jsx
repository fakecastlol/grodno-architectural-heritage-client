import React, { useState, useEffect } from "react";
import {UserService} from "../../services";

const h1 = {
  marginTop: 450,
};

const Home = () => {
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
    <div className="container">
      <h1 style={h1}>This applcation is under development</h1>
    </div>
  );
};

export default Home;
