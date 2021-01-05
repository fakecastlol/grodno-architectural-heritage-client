import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import moment from "moment";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { ProfileService, AdminService } from "../../services";
import "../../index.css";
import "./profile.css";
import ImageField from "../../components/ImageField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image, { propTypes } from "react-bootstrap/Image";
import ImageUploader from "react-images-upload";
import { updateProfile } from "../../actions/profile";
import API_URL from "../../constants/api.url";
import axios from "axios";
import authHeader from "../../helpers/auth-header";
import { getUser } from "../../actions/manageUser";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import { required, validEmail } from "../../helpers/validation";

const container = {
  marginTop: 100,
};

const info = {
  textAlign: "left",
  // marginLeft: 350,
  // marginTop: 20,
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
  const form = useRef();
  const checkBtn = useRef();
  const { message } = useSelector((state) => state.message);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user: userField, isLoading } = useSelector(
    (state) => state.manageUser
  );
  const [successful, setSuccessful] = useState(false);

  const [formData, setFormData] = useState({});

  const [image, setImage] = useState();
  const [preview, setPreview] = useState(image);

  useEffect(() => {
    handleGetImage();
  }, [currentUser]);

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

  const handleSwitchViewProfile = async () => {
    setIsSwitchOn(!isSwitchOn);
    await dispatch(getUser(currentUser.user.id));
    await handleGetImage();
  };

  const handleApplyChanges = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setSuccessful(true);
      ProfileService.updateProfile(formData);
      uploadImage(image);
      // window.location.reload();
    } else {
      setSuccessful(false);
    }
  };

  // console.log("userProfile", formData);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const formatRegistration = moment(currentUser.user.registrationDate).format(
    "MMMM Do YYYY"
  );
  const formatLastVisited = moment(currentUser.user.lastVisited).format(
    "MMMM Do YYYY, h:mm a"
  );

  const uploadImage = (files) => {
    console.log(files);
    const formData = new FormData();
    try {
      formData.append("File", files);
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

  const handleGetImage = () => {
    ProfileService.getProfileImage(currentUser.user.id)
      .then((resp) => {
        setImage(resp.data || "");
        setPreview(resp.data || "");
      })
      .catch(() => setImage(""));
  };

  const onSavePreviewImage = (picture) => {
    setImage(picture.target.files[0]);
    setPreview(URL.createObjectURL(picture.target.files[0]));
    console.log("give me a pic", image);
  };

  // const handleUploadImage = (picture) => {
  //   uploadImage(picture);
  //   console.log("deleted");
  // };
  let imgPreview;
  if (preview) {
    imgPreview = <img src={preview} alt="" />;
  }

  if (isLoading) return <div></div>;

  return (
    <div className="outer">
      <div className="inner">
        <Form onSubmit={handleApplyChanges} ref={form}>
          <h3>Profile</h3>
          {!successful && (
            <div>
              <div className="info" style={info}>
                {isSwitchOn ? (
                  <div>
                    <form>
                      <div className="form-group preview">{imgPreview}</div>

                      <div className="form-group">
                        <input
                          type="file"
                          // className="form-control"
                          onChange={onSavePreviewImage}
                        />
                      </div>
                    </form>

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
                            validations={[required, validEmail]}
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
                    <div class="container img">
                      {/* {image && <img src={image} height={100} width={100} />} */}
                      <div className="form-group preview">{imgPreview}</div>
                    </div>
                    <p>
                      <strong>Email:</strong> {userField.email}
                    </p>
                    {userField.firstName && (
                      <p>
                        <strong>First name:</strong> {userField.firstName}
                      </p>
                    )}
                    {userField.lastName && (
                      <p>
                        <strong>Last name:</strong> {userField.lastName || ""}
                      </p>
                    )}
                    {userField.login && (
                      <p>
                        <strong>Login:</strong> {userField.login || ""}
                      </p>
                    )}
                    <p>
                      <strong>Registration date:</strong> {formatRegistration}
                    </p>
                    <p>
                      <strong>Last visited:</strong> {formatLastVisited}
                    </p>
                    {userField.location && (
                      <p>
                        <strong>Location:</strong> {userField.location || ""}
                      </p>
                    )}
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
                  onClick={() => {
                    handleSwitchViewProfile();
                  }}
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
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Profile;
