import React, { useState, useEffect } from "react";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {}, []);

  const containerStyle = {
    marginTop: 100,
    color: "black",
  };

  return (
    <div className="container" style={containerStyle}>
      <h3>User page</h3>
    </div>
  );
};

export default BoardUser;
