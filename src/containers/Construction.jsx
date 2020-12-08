import React, { useState, useEffect } from "react";
import { UserService } from "../services";
import Map from "./Map/Map.jsx";

const cont = {
//   width: "960px",
//   display: "flex",
//   justifyContent: "center",
//   marginTop: "40px",
  //   backgroundColor: "#291818",
//   height: "inherit",
};

const Construction = () => {
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
    // <div className="outer">
    //   <div className="inner" style={inner}>
    <div className="container" style={cont}>
      <Map></Map>
    </div>
    //   </div>
    // </div>
  );
};

export default Construction;
