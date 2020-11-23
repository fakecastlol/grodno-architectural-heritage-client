import axios from "axios";

const API_URL = "https://localhost:5001";

const getUsers = () => {
    return axios.get(API_URL + '/users');
};


export default {
    getUsers
}