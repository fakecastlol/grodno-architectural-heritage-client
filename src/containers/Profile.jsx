import React, { useState } from "react";
import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import '../index.css'

const container = {
  marginTop: 100
}

const info ={
  textAlign: 'left',
  // marginLeft: 350,
  marginTop: 20
}

const formStyle = {
  // display: "flex",
  width: "100%",
  // marginLeft: 10
  marginRight: 40,
  // marginTop: 'auto'
}

const pStyle = {
  display: "flex",
  justifyContent: "space-between"
}

const applyStyle = {
  // marginLeft: "100" 
  margin: "auto"
}

const editStyle = {
  margin: "auto"
}

const buttons = {
  display: "flex",
  justifyContent: "space-between"
}

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchViewProfile = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const formatRegistration = moment(currentUser.user.registrationDate).format('MMMM Do YYYY');
  const formatLastVisited = moment(currentUser.user.lastVisited).format('MMMM Do YYYY, h:mm:ss a');




  return (
    <div className="outer">
    <div className="inner">
    <Form >
        <h3>
          Profile 
        </h3>
      <div className="info" style={info} >
        {
        isSwitchOn 
        ? 
        <div>
            <div style={pStyle}>
            <strong>Email:</strong>             
              <div className="form-group" 
                // style={formStyle}
              >
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder={currentUser.user.email}
                  style={formStyle}
                />
              </div>      
            </div>

            <div style={pStyle}>
            <strong>First name:</strong>             
              <div className="form-group" 
                // style={formStyle}
              >
                <Input
                  type="text"
                  className="form-control"
                  name="text"
                  placeholder={currentUser.user.firstName}
                  style={formStyle}
                />
              </div>      
            </div>    
            
               <div style={pStyle}>
            <strong>Last name:</strong>             
              <div className="form-group" 
                // style={formStyle}
              >
                <Input
                  type="text"
                  className="form-control"
                  name="text"
                  placeholder={currentUser.user.lastName}
                  style={formStyle}
                />
              </div>      
            </div>

            <div style={pStyle}>
            <strong>Login:</strong>             
              <div className="form-group" 
                // style={formStyle}
              >
                <Input
                  type="text"
                  className="form-control"
                  name="text"
                  placeholder={currentUser.user.login}
                  style={formStyle}
                />
              </div>      
            </div>

            <div style={pStyle}>
            <strong>Location:</strong>             
              <div className="form-group" 
                // style={formStyle}
              >
                <Input
                  type="text"
                  className="form-control"
                  name="text"
                  placeholder={currentUser.user.location}
                  style={formStyle}
                />
              </div>      
            </div>

        </div>
          :
          <>
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
          </>
      }
      </div>
      <div style={buttons}>
      <button
        type="button"
        class="btn btn-secondary"
        onClick={() => handleSwitchViewProfile()}
        
        style={editStyle}
      >
        {
          isSwitchOn ?  'Close' : 'Edit infomation' 
          
        }
      </button>
      {
        isSwitchOn &&
      <button
              type="button"
              class="btn btn-secondary"
              onClick={() => handleSwitchViewProfile()}
              style={applyStyle}
            >
              {`Apply changes`}
      </button>
      }
      </div>
    </Form>
</div>
</div>
  );
};

export default Profile;
