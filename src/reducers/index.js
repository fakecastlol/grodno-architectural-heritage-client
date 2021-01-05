import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import manageUser from "./manageUser";
import profile from "./profile";
import construction from "./construction";

export default combineReducers({
  auth,
  message,
  manageUser,
  profile,
  construction,
});
