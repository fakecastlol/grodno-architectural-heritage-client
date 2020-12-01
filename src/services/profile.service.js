import axios from "axios";
import API_URL from '../constants/api.url'
import authHeader from "../helpers/auth-header";

const updateProfile = async (user) => {
    try {
        return await axios.post(
          API_URL + "updateprofile",
           user, 
          {
            headers: authHeader(),
          }
        );
      } catch (e) {}
};

export default {
    updateProfile
};

