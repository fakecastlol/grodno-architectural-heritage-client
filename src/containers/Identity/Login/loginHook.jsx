import { useDispatch } from "react-redux";
import { login } from "../../../actions/auth";
import { useState } from "react";
import { loginAlert } from "./loginAlert";

const useLogin = (push) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return [
    loading,
    (email, password) => {
      setLoading(true);
      dispatch(login(email, password))
        .then(() => {
          push("/profile");
          loginAlert(loading);
          // setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
  ];
};

export default useLogin;
