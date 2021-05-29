/* eslint-disable import/no-anonymous-default-export */

import { GET_USER_DATA } from "../constants/action.types";

const initialState = { isLoading: true };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
