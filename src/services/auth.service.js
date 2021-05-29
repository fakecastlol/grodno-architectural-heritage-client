import axios from "axios";
import API_URL from "../constants/api.url";
import authHeader from "../helpers/auth-header";

const register = async (email, password) => {
  try {
    return await axios
      .post(API_URL + "register", {
        email,
        password,
      })
      .then(() => login(email, password));
  } catch (e) {
    console.error(e.message);
  }
};

const login = async (email, password) => {
  try {
    return await axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      });
  } catch (e) {
    console.error(e.message);
  }
};

const confirmRegister = async (token) => {
  try {
    return await axios.post(
      API_URL + "confirmregister",
      {},
      { headers: authHeader() }
    );
  } catch (e) {
    console.error(e.message);
  }
};

const forgotPassword = async (email) => {
  try {
    return axios.post(API_URL + "forgot", {
      email,
    });
  } catch (e) {
    console.error(e.message);
  }
};

const logout = () => {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.error(e.message);
  }
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    console.error(e.message);
  }
};

export {
  register,
  login,
  confirmRegister,
  forgotPassword,
  logout,
  getCurrentUser,
};
