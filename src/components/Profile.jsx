import React from "react";
import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment'

const container = {
  marginTop: 100
}

const info ={
  textAlign: 'left',
  marginLeft: 350,
  marginTop: 50
}

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const formatRegistration = moment(currentUser.user.registrationDate).format('MMMM Do YYYY');
  const formatLastVisited = moment(currentUser.user.lastVisited).format('MMMM Do YYYY, h:mm:ss a');


  return (
    <div className="container" style={container}>
        <h3>
          Profile 
        </h3>
      <div className="info" style={info}>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <p>
        <strong>First name:</strong> {currentUser.user.firstName}
      </p>
      <p>
        <strong>Last name:</strong> {currentUser.user.lastName}
      </p>
      <p>
        <strong>Login:</strong> {currentUser.user.login}
      </p>
      <p>
        <strong>Registration date:</strong> {formatRegistration}
      </p>
      <p>
        <strong>Last visited:</strong> {formatLastVisited}
      </p>
      <p>
        <strong>Location:</strong> {currentUser.user.location}
      </p>
      <p>
        <strong>Article count:</strong> {currentUser.user.articleCount}
      </p>
      <p>
        <strong>Messages count:</strong> {currentUser.user.messagesCount}
      </p>
      <p>
        <strong>Rank:</strong> {currentUser.user.rank}
      </p>
      </div>
    </div>
  );
};

export default Profile;
