import React from "react";
import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';

const container = {
  marginTop: 100
}

const info ={
  textAlign: 'left',
  marginLeft: 350,
  marginTop: 100
}

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container" style={container}>
        <h3>
          Profile 
        </h3>
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
      </div>
    </div>
  );
};

export default Profile;
