import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser =  AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">      
        <h3>
          <strong>{currentUser.user.email}</strong> Profile 
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.user.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <strong>Authorities:</strong> {currentUser.user.role} 
        {/* // && currentUser.role.map
          ((role) => <li key={index}>{role}</li>)} */}
      
    </div>
  );
};

export default Profile;
