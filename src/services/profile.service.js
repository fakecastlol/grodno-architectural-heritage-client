import axios from "axios";
import API_URL from "../constants/api.url";
import authHeader from "../helpers/auth-header";

const updateProfile = async (user) => {
  try {
    return await axios.post(API_URL + "updateprofile", user, {
      headers: authHeader(),
    });
  } catch (e) {
    console.error(e.message);
  }
};

const getProfileImage = async (id) => {
  try {
    return await axios.get(API_URL + "getpic", {
      headers: authHeader(),
      params: { id },
    });
  } catch (e) {
    console.error(e.message);
  }
};

const confirmEmail = async (email, token) => {
  try {
    return await axios.post(API_URL + "confirmemail", {
      email,
      token,
    });
  } catch (e) {
    console.error(e.message);
  }
};

export { updateProfile, getProfileImage, confirmEmail };
