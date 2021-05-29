import { UPDATE_USER_PROFILE } from "../constants/action.types";
import {ProfileService} from "../services";

export const updateProfile = (user) => (dispatch) => {
  return ProfileService.updateProfile(user)
    .then((response) => {
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: response.data,
      });
    })
    .catch((e) => console.log(e));
};
