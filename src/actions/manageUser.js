import { GET_USER_DATA, SET_MESSAGE } from "../constants/action.types";

import {AdminService} from "../services";

export const getUser = (id) => (dispatch) => {
  console.log(id);
  return AdminService.getUser(id)
    .then((response) => {
      console.log(response);
      dispatch({
        type: GET_USER_DATA,
        payload: response.data,
      });
      // return Promise.resolve(response.data);
    })
    .catch((e) => console.log(e));
};
