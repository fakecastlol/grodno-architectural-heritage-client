import React from "react";
import AuthService from "../services/auth.service";

const container = {
  marginTop: 100
}

const info ={
  textAlign: 'left',
  marginLeft: 350,
  marginTop: 100
}

const Profile = () => {
  const currentUser =  AuthService.getCurrentUser();

  return (
    <div className="container" style={container}>
      {/* <header className="jumbotron">       */}
        <h3>
          {/* <strong>{currentUser.user.email}</strong>  */}
          Profile 
        </h3>
      {/* </header> */}
      <div className="info" style={info}>
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
    </div>
  );
};

export default Profile;
