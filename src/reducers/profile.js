/* eslint-disable import/no-anonymous-default-export */

import { UPDATE_USER_PROFILE } from "../constants/action.types";

const initialState = { isLoading: true };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_PROFILE:
      console.log(payload)
      return {
        ...state,
        user: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
