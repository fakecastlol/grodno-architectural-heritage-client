import React, { useState, useEffect } from "react";
import { confirmRegister } from "../../../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmedSuccess } from "./ConfirmedSuccess";
import { ConfirmedError } from "./ConfirmedError";
import "./confirmed.css";

const ConfirmRegister = () => {
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    if (currentUser.user.role === 5) {
      confirmRegister();
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser.token, dispatch, currentUser.user.id, currentUser.user.role]);

  return (
    <div className="container confirmed-style">
      {loading ? <ConfirmedSuccess /> : <ConfirmedError />}
    </div>
  );
};

export default ConfirmRegister;
