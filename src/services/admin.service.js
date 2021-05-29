import axios from "axios";
import API_URL from "../constants/api.url";
import authHeader from "../helpers/auth-header";

const getUsers = async (params) => {
  try {
    return await axios.get(API_URL + "users", {
      headers: authHeader(),
      params,
    });
  } catch (e) {
    console.error(e.message);
  }
};

const getUser = async (id) => {
  try {
    return await axios.get(API_URL + "getuser", {
      headers: authHeader(),
      params: { id },
    });
  } catch (e) {
    console.error(e.message);
  }
};

const deleteUser = async (id) => {
  try {
    return await axios.delete(API_URL + "delete", {
      headers: authHeader(),
      data: { id },
    });
  } catch (e) {
    console.error(e.message);
  }
};

const setRole = async (id, role) => {
  try {
    return await axios.post(
      API_URL + "role",
      { id, role },
      {
        headers: authHeader(),
      }
    );
  } catch (e) {
    console.error(e.message);
  }
};

export { getUsers, getUser, deleteUser, setRole };
