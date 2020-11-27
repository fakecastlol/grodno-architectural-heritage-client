import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import manageUser from "./manageUser";

export default combineReducers({
  auth,
  message,
  manageUser,
});
