import axios from "axios";
import API_URL from "../constants/api.url";
import authHeader from "../helpers/auth-header";

const getConstructions = async () => {
  return await axios.get(API_URL + "constructions");
};

const getAllConstructions = async () => {
  return await axios.get(API_URL + "getallconstructions");
};

const getConstruction = async (id) => {
  try {
    console.log(id);
    return await axios.get(API_URL + "getconstruction", {
      // headers: authHeader(),
      params: { id },
    });
    // console.log(data);
  } catch (e) {}
};

const createConstruction = async (construction) => {
  try {
    return await axios.post(API_URL + "createconstruction", construction);
  } catch (e) {}
};

const updateConstruction = async (construction) => {
  try {
    return await axios.post(API_URL + "updateconstruction", construction, {
      // headers: authHeader(),
    });
  } catch (e) {}
};

const deleteConstruction = async (id) => {
  try {
    console.log(id);
    return await axios.delete(API_URL + "deleteconstruction", {
      //   headers: authHeader(),
      data: { id },
    });
  } catch (e) {}
};

export {
  getConstruction,
  getConstructions,
  getAllConstructions,
  createConstruction,
  updateConstruction,
  deleteConstruction,
};
