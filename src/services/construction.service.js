import axios from "axios";
import API_URL from "../constants/api.url";
import authHeader from "../helpers/auth-header";

const getConstructions = async (params) => {
  try {
    return await axios.get(API_URL + "constructions", {
      // headers: authHeader(),
      params,
    });
  } catch (e) {
    console.error(e.message);
  }
};

// const addImage = async () => {
//   try {
//     return await axios.post(API_URL + "addimage")
//   } catch (e) {
//     console.error(e.message);
//   }
// };

const getAllConstructions = async () => {
  try {
    return await axios.get(API_URL + "getallconstructions");
  } catch (e) {
    console.error(e.message);
  }
};

const getConstruction = async (id) => {
  try {
    return await axios.get(API_URL + "getconstruction", {
      // headers: authHeader(),
      params: { id },
    });
  } catch (e) {
    console.error(e.message);
  }
};

const createConstruction = async (construction) => {
  try {
    return await axios.post(API_URL + "createconstruction", construction);
  } catch (e) {
    console.error(e.message);
  }
};

const updateConstruction = async (construction) => {
  try {
    return await axios.post(API_URL + "updateconstruction", construction, {
      // headers: authHeader(),
    });
  } catch (e) {
    console.error(e.message);
  }
};

const deleteConstruction = async (id) => {
  try {
    return await axios.delete(API_URL + "deleteconstruction", {
      //   headers: authHeader(),
      data: { id },
    });
  } catch (e) {
    console.error(e.message);
  }
};

export {
  getConstruction,
  getConstructions,
  getAllConstructions,
  createConstruction,
  updateConstruction,
  deleteConstruction,
};
