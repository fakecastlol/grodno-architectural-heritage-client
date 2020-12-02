import { UPDATE_USER_PROFILE, SET_MESSAGE } from "../constants/action.types";
import ProfileService from "../services/profile.service";

export const updateProfile = (user) => (dispatch) => {
    return ProfileService.updateProfile(user)
      .then((response) => {
        dispatch({
          type: UPDATE_USER_PROFILE,
          payload: response.data,
        });
        // return Promise.resolve(response.data);
      })
      .catch((e) => console.log(e));
  };
  