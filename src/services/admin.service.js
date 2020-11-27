import axios from "axios";
import API_URL from './api.url'
import authHeader from './auth-header'

const getUsers = () => {
    return axios.get(API_URL + 'users');
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


  

export default {
    getUsers,
    getUser
}