import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {
  required,
  validEmail,
  vpassword,
  vConfirmPassword,
} from "../../../helpers/validation";
import useRegister from "./registerHook";
import "../identity.css";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, register] = useRegister(props.history.push);

  const form = useRef();
  const checkBtn = useRef();

  const { message } = useSelector((state) => state.message);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      register(email, password, confirmPassword);
    }
  };

  return (
    <div className="outer">
      <div className="inner">
        <Form onSubmit={handleRegister} ref={form}>
          {!loading && <h3> Register</h3>}
          {!loading ? (
            <div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirm password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  validations={[required, vConfirmPassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-dark btn-lg btn-block">
                  Sign Up
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Register success!</h2>
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

          {!loading && (
            <div>
              <p className="forgot-password text-right">
                Forgot <a href="/forgot">password?</a>
              </p>
              <p className="forgot-password text-right">
                Already registered <a href="/login">log in?</a>
              </p>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Register;
