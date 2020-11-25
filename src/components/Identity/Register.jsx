import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import {register} from '../../actions/auth'

import './identity.css'

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  
  const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();

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
      if (password !== confirmPassword) {
        alert("Passwords don't match");
      } else {
              
      e.preventDefault();
        //e.stopPropogation();
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        dispatch(register(email, password, confirmPassword))
          .then(() => {
            setSuccessful(true);
            props.history.push("/home");
            // window.location.reload();
          })
          .catch(() => {
            setSuccessful(false);
          });
      }
      
      }
      
    };
  
    return (
      <div className="outer">
        <div className="inner">
  
          <Form onSubmit={handleRegister} ref={form}>
              <h3> Register</h3>
            {!successful && (
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
                    validations={[required]}
                  />
                </div>
  
                <div className="form-group">
                  <button className="btn btn-dark btn-lg btn-block">Sign Up</button>
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

            <p className="forgot-password text-right">
                    Already registered <a href="/login">log in?</a>
                </p>
          </Form>
        </div>
      </div>
    );
  };
  
  export default Register;
  