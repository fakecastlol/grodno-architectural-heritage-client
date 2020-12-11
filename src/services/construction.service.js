import axios from "axios";
import API_URL from "../constants/api.url";
import authHeader from "../helpers/auth-header";

const getConstruction = () => {
  return axios.get(API_URL + "constructions");
};
