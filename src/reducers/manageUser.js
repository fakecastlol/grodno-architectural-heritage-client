/* eslint-disable import/no-anonymous-default-export */

import { GET_USER_DATA } from "../actions/types";

const initialState = { isLoading: true };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_DATA:
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
