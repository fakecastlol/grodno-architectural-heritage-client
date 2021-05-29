import axios from "axios";
import authHeader from "../helpers/auth-header";
import API_URL from "../constants/api.url";

const getPublicContent = async () => {
  try {
    return await axios.get(API_URL + "all");
  } catch (e) {
    console.error(e.message);
  }
};

const getUserBoard = async () => {
  try {
    return await axios.get(API_URL + "user", { headers: authHeader() });
  } catch (e) {
    console.error(e.message);
  }
};

const getModeratorBoard = async () => {
  try {
    return await axios.get(API_URL + "mod", { headers: authHeader() });
  } catch (e) {
    console.error(e.message);
  }
};

const getAdminBoard = async () => {
  try {
    return await axios.get(API_URL + "admin", { headers: authHeader() });
  } catch (e) {
    console.error(e.message);
  }
};

export { getPublicContent, getUserBoard, getModeratorBoard, getAdminBoard };
