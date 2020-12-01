import React, { useState, useRef } from "react";
import { useSelector} from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import moment from 'moment'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import ProfileService from '../services/profile.service'
import AdminService from '../services/admin.service'
import '../index.css'
import './profile.css'
import ImageField from '../components/ImageField'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import ImageUploader from 'react-images-upload';

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
  // const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

  // const handleImage = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () =>{
  //     if(reader.readyState === 2){
  //       this.setState({profileImg: reader.result})
  //     }
  //   }
  //   reader.readAsDataURL(e.target.files[0])
  // };

  // const userId = currentUser.user.id;

  
  // console.log(getUser)

  

  const [formData, setFormData] = useState({
    id: currentUser.user.id,   
    email: currentUser.user.email,
    firstName: currentUser.user.firstName,
    lastName: currentUser.user.lastName,
    login: currentUser.user.login,
    location: currentUser.user.location
 });

//  const getUser = AdminService.getUser(userId).then(
   
//  );

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onChangeFormData = (e, fieldName) => {
    const data = e.target.value;
    setFormData((profile) => ({ ...profile, [fieldName]: data })); 
    // console.log(asd)
  };

  const handleSwitchViewProfile = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const handleApplyChanges = (e) => {
    e.preventDefault()
    ProfileService.updateProfile(formData);
    console.log('userProfile', formData);
  }
  const [pic, setPic] = useState({ pictures: [] });

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const formatRegistration = moment(currentUser.user.registrationDate).format('MMMM Do YYYY');
  const formatLastVisited = moment(currentUser.user.lastVisited).format('MMMM Do YYYY, h:mm:ss a');


  

  const onChangeImage = (picture) => {
    setPic({
      pictures : pic,
    });
  }

  return (
    <div className="outer">
    <div className="inner">
    <Form 
      onSubmit={handleApplyChanges} 
    >
        <h3>
          Profile 
        </h3>
      <div className="info" style={info} >
        {
        isSwitchOn 
        ? 
        <div>

            <ImageUploader
                withIcon={false}
                buttonText='Choose images'
                onChange={onChangeImage}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview
                fileSizeError=" file size is too big"
            />  

            <div style={pStyle}>
            <strong>Email:</strong>             
              <div className="form-group" 
                // style={formStyle}
              >
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  style={formStyle}
                  onChange={(e) => onChangeFormData(e, 'email')}
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
                  value={formData.firstName}
                  style={formStyle}
                  onChange={(e) => onChangeFormData(e, 'firstName')}
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
                  value={formData.lastName}
                  style={formStyle}
                  onChange={(e) => onChangeFormData(e, 'lastName')}
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
                  value={formData.login}
                  style={formStyle}
                  onChange={(e) => onChangeFormData(e, 'login')}
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
                  value={formData.location}
                  style={formStyle}
                  onChange={(e) => onChangeFormData(e, 'location')}
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
        type="submit"
        class="btn btn-secondary"
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
