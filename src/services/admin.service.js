import axios from "axios";
import API_URL from "../constants/api.url";
import authHeader from "../helpers/auth-header";


const getUsers = () => {
  return axios.get(API_URL + "users");
};

const getUser = async (id) => {
  try {
    return await axios.get(API_URL + "getuser", {
      headers: authHeader(),
      params: { id },
    });
    // console.log(data);
  } catch (e) {}
};

const deleteUser = async (id) => {
  try {
    console.log(id);
    return await axios.delete(API_URL + "delete", {
      headers: authHeader(),
      data: { id },
    });
  } catch (e) {}
};

const setRole = async (id, role) => {
  console.log(id, role);
  try {
    return await axios.post(
      API_URL + "role",
      { id, role },
      {
        headers: authHeader(),
      }
    );
  } catch (e) {}
};

export default {
  getUsers,
  getUser,
  deleteUser,
  setRole,
};
