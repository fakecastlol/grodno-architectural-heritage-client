import { GET_USER_DATA, SET_MESSAGE } from "../constants/action.types";

import AdminService from "../services/admin.service";

export const getUser = (id) => (dispatch) => {
  return AdminService.getUser(id)
    .then((response) => {
      dispatch({
        type: GET_USER_DATA,
        payload: response.data,
      });
      // return Promise.resolve(response.data);
    })
    .catch((e) => console.log(e));
};
