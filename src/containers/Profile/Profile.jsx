import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { ProfileService } from "../../services";
import API_URL, { GetDefaultPic } from "../../constants/api.url";
import axios from "axios";
import authHeader from "../../helpers/auth-header";
import { getUser } from "../../actions/manageUser";
import CheckButton from "react-validation/build/button";
import { required, validEmail } from "../../helpers/validation";
import { manageUserSelector } from "./profileSelectors";
import "../../index.css";
import "./profile.css";
import ProfileInfo from "./ProfileInfo";
import { confirmEmail } from "../../services/profile.service";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(image);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const form = useRef();
  const checkBtn = useRef();
  const { message } = useSelector((state) => state.message);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user: userField, isLoading } = useSelector(manageUserSelector);

  const onChangeFormData = (e, fieldName) => {
    const data = e.target.value;
    setFormData((profile) => ({ ...profile, [fieldName]: data }));
  };

  const handleSwitchViewProfile = async () => {
    setIsSwitchOn(!isSwitchOn);
    dispatch(getUser(currentUser.user.id));
    // handleGetImage();
  };

  const handleApplyChanges = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      setLoading(false);
      ProfileService.updateProfile(formData);
      if (!preview) uploadImage(image);
    } else {
      setLoading(true);
    }
  };

  const handleConfirmEmail = (e) => {
    confirmEmail(currentUser.user.email, currentUser.token);
  };

  const [formatRegistration, formatLastVisited] = useMemo(() => {
    return [
      moment(currentUser.user.registrationDate).format("MMMM Do YYYY"),
      moment(currentUser.user.lastVisited).format("MMMM Do YYYY, h:mm a"),
    ];
  }, [currentUser.user.registrationDate, currentUser.user.lastVisited]);

  const uploadImage = (files) => {
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
      console.erorr(e);
    }
  };

  const onSavePreviewImage = (picture) => {
    setImage(picture.target.files[0]);
    setPreview(URL.createObjectURL(picture.target.files[0]));
  };

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

  let imgPreview;
  if (preview) {
    imgPreview = <img src={preview || GetDefaultPic} alt="" />;
  }

  if (isLoading) return <div></div>;

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="outer">
      <div className="inner profile-form">
        <Form onSubmit={handleApplyChanges} ref={form}>
          <h3>Profile</h3>
          {!loading && (
            <div>
              <div className="info info-form">
                {isSwitchOn ? (
                  <div>
                    <form>
                      <div className="form-group preview">{imgPreview}</div>

                      <div className="form-group">
                        <input type="file" onChange={onSavePreviewImage} />
                      </div>
                    </form>

                    <div className="fields">
                      <div className="pStyle">
                        <strong>Email:</strong>
                        <div className="form-group">
                          <Input
                            type="email"
                            className="form-control formStyle"
                            name="email"
                            value={formData.email}
                            onChange={(e) => onChangeFormData(e, "email")}
                            validations={[required, validEmail]}
                          />
                        </div>
                      </div>

                      <div className="pStyle">
                        <strong>First name:</strong>
                        <div className="form-group">
                          <Input
                            type="text"
                            className="form-control formStyle"
                            name="text"
                            value={formData.firstName}
                            onChange={(e) => onChangeFormData(e, "firstName")}
                          />
                        </div>
                      </div>

                      <div className="pStyle">
                        <strong>Last name:</strong>
                        <div className="form-group">
                          <Input
                            type="text"
                            className="form-control formStyle"
                            name="text"
                            value={formData.lastName}
                            onChange={(e) => onChangeFormData(e, "lastName")}
                          />
                        </div>
                      </div>

                      <div className="pStyle">
                        <strong>Login:</strong>
                        <div className="form-group">
                          <Input
                            type="text"
                            className="form-control formStyle"
                            name="text"
                            value={formData.login}
                            onChange={(e) => onChangeFormData(e, "login")}
                          />
                        </div>
                      </div>

                      <div className="pStyle">
                        <strong>Location:</strong>
                        <div className="form-group">
                          <Input
                            type="text"
                            className="form-control formStyle"
                            name="text"
                            value={formData.location}
                            onChange={(e) => onChangeFormData(e, "location")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ProfileInfo
                    imgPreview={imgPreview}
                    userField={userField}
                    formatRegistration={formatRegistration}
                    formatLastVisited={formatLastVisited}
                  />
                )}
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="btn btn-secondary editStyle"
                  onClick={() => {
                    handleSwitchViewProfile();
                  }}
                >
                  {isSwitchOn ? "Close" : "Edit infomation"}
                </button>
                {isSwitchOn && (
                  <button type="submit" class="btn btn-secondary applyStyle">
                    {`Apply changes`}
                  </button>
                )}
                {!isSwitchOn && userField.role === 5 && (
                  <button
                    // type="submit"
                    className="btn btn-secondary applyStyle"
                    onClick={handleConfirmEmail}
                  >
                    {`Confirm email`}
                  </button>
                )}
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  loading ? "alert alert-success" : "alert alert-danger"
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
