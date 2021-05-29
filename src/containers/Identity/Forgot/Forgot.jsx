import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { forgotPassword } from "../../../services/auth.service";
import { required, validEmail } from "../../../helpers/validation";
import "../identity.css";

const forgotForm = {
  maxWidth: "400px",
};

const Forgot = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleSend = (e) => {
    e.preventDefault();

    setMessage("");
    // setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      forgotPassword(email);
      setLoading(true).catch(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="outer">
      <div className="inner" style={forgotForm}>
        <Form onSubmit={handleSend} ref={form}>
          {!loading ? (
            <div>
              <h3>Password recovery</h3>

              <div>
                <label>
                  A letter will be sent to your email with a new password
                </label>
                <div className="form-group">
                  <Input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-dark btn-lg btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2>Check your email!</h2>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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

export default Forgot;
