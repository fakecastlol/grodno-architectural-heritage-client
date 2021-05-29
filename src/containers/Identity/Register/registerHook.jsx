import { useDispatch } from "react-redux";
import { register } from "../../../actions/auth";
import { useState } from "react";
import { registerAlert } from "./registerAlert";

const useRegister = (push) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return [
    loading,
    (email, password, confirmPassword) => {
      setLoading(true);
      dispatch(register(email, password, confirmPassword))
        .then(() => {
          push("/profile");
          registerAlert(loading);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
  ];
};

export default useRegister;
