import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import moment from "moment";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import ProfileService from "../services/profile.service";
import AdminService from "../services/admin.service";
import "../index.css";
import "./profile.css";
import ImageField from "../components/ImageField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ImageUploader from "react-images-upload";
import { updateProfile } from "../actions/profile";
import API_URL from "../constants/api.url";
import axios from "axios";
import authHeader from "../helpers/auth-header";
import { getUser } from "../actions/manageUser";

const container = {
  marginTop: 100,
};

const info = {
  textAlign: "left",
  // marginLeft: 350,
  marginTop: 20,
};

const formStyle = {
  // display: "flex",
  width: "100%",
  // marginLeft: 10
  marginRight: 40,
  // marginTop: 'auto'
};

const pStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const applyStyle = {
  // marginLeft: "100"
  margin: "auto",
};

const editStyle = {
  margin: "auto",
};

const buttons = {
  display: "flex",
  justifyContent: "space-between",
};

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user: userField, isLoading } = useSelector(
    (state) => state.manageUser
  );

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isLoading) {
      setFormData({
        id: userField.id,
        email: userField.email,
        firstName: userField.firstName,
        lastName: userField.lastName,
        login: userField.login,
        location: userField.location,
      });
    }
  }, [isLoading, setFormData, userField]);

  useEffect(() => {
    dispatch(getUser(currentUser.user.id));
  }, [dispatch, currentUser.user.id]);

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onChangeFormData = (e, fieldName) => {
    const data = e.target.value;
    setFormData((profile) => ({ ...profile, [fieldName]: data }));
  };

  const handleSwitchViewProfile = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const handleApplyChanges = (e) => {
    e.preventDefault();
    ProfileService.updateProfile(formData);
    console.log("userProfile", formData);
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const formatRegistration = moment(currentUser.user.registrationDate).format(
    "MMMM Do YYYY"
  );
  const formatLastVisited = moment(currentUser.user.lastVisited).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  const uploadImage = (files) => {
    const formData = new FormData();
    try {
      formData.append("File", files[0]);
      formData.append("Id", currentUser.user.id);
      axios.post(API_URL + "updatepic", formData, {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
          type: "formData",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeImage = (picture) => {
    uploadImage(picture);
  };

  // const handleUploadImage = (picture) => {
  //   uploadImage(picture);
  // }

  if (isLoading) return <div></div>;

  return (
    <div className="outer">
      <div className="inner">
        <Form onSubmit={handleApplyChanges}>
          <h3>Profile</h3>
          <div className="info" style={info}>
            {isSwitchOn ? (
              <div>

              <button
                type="submit"
                class="btn btn-secondary upload-file"
                style={applyStyle}
                // onClick={handleUploadImage}
              >
                {`Upload file`}
              </button>

                <ImageUploader
                  withIcon={false}
                  buttonText="Choose images"
                  onChange={onChangeImage}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                  withPreview
                  fileSizeError=" file size is too big"
                />

             
              

                <div className="fields">
                <div style={pStyle}>
                  <strong>Email:</strong>
                  <div
                    className="form-group"
                    // style={formStyle}
                  >
                    <Input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      style={formStyle}
                      onChange={(e) => onChangeFormData(e, "email")}
                    />
                  </div>
                </div>

                <div style={pStyle}>
                  <strong>First name:</strong>
                  <div
                    className="form-group"
                    // style={formStyle}
                  >
                    <Input
                      type="text"
                      className="form-control"
                      name="text"
                      value={formData.firstName}
                      style={formStyle}
                      onChange={(e) => onChangeFormData(e, "firstName")}
                    />
                  </div>
                </div>

                <div style={pStyle}>
                  <strong>Last name:</strong>
                  <div
                    className="form-group"
                    // style={formStyle}
                  >
                    <Input
                      type="text"
                      className="form-control"
                      name="text"
                      value={formData.lastName}
                      style={formStyle}
                      onChange={(e) => onChangeFormData(e, "lastName")}
                    />
                  </div>
                </div>

                <div style={pStyle}>
                  <strong>Login:</strong>
                  <div
                    className="form-group"
                    // style={formStyle}
                  >
                    <Input
                      type="text"
                      className="form-control"
                      name="text"
                      value={formData.login}
                      style={formStyle}
                      onChange={(e) => onChangeFormData(e, "login")}
                    />
                  </div>
                </div>

                <div style={pStyle}>
                  <strong>Location:</strong>
                  <div
                    className="form-group"
                    // style={formStyle}
                  >
                    <Input
                      type="text"
                      className="form-control"
                      name="text"
                      value={formData.location}
                      style={formStyle}
                      onChange={(e) => onChangeFormData(e, "location")}
                    />
                  </div>
                </div>
              </div>
              </div>
            ) : (
              <>
                <p>
                  <strong>Email:</strong> {userField.email}
                </p>
                <p>
                  <strong>First name:</strong> {userField.firstName}
                </p>
                <p>
                  <strong>Last name:</strong> {userField.lastName}
                </p>
                <p>
                  <strong>Login:</strong> {userField.login}
                </p>
                <p>
                  <strong>Registration date:</strong> {formatRegistration}
                </p>
                <p>
                  <strong>Last visited:</strong> {formatLastVisited}
                </p>
                <p>
                  <strong>Location:</strong> {userField.location}
                </p>
                <p>
                  <strong>Article count:</strong> {userField.articleCount}
                </p>
                <p>
                  <strong>Messages count:</strong> {userField.messagesCount}
                </p>
                <p>
                  <strong>Rank:</strong> {userField.rank}
                </p>
              </>
            )}
          </div>
          <div style={buttons}>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => handleSwitchViewProfile()}
              style={editStyle}
            >
              {isSwitchOn ? "Close" : "Edit infomation"}
            </button>
            {isSwitchOn && (
              <button
                type="submit"
                class="btn btn-secondary"
                style={applyStyle}
              >
                {`Apply changes`}
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
