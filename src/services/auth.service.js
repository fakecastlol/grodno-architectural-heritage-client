import axios from "axios";
import API_URL from './api.url'

const register = (email, password) => {
  return axios
    .post(API_URL + "register", {
      email,
      password,
    })
    .then(() => login(email, password));
  // .then((response) => {
  //   console.log(response.data)
  //   if (response.data.token) {
  //     console.log(response.data.token)
  //     localStorage.setItem("user", JSON.stringify(response.data));
  //   }
  //   return response;
  // });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
