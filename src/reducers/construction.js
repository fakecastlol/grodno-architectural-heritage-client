/* eslint-disable import/no-anonymous-default-export */
import {
  GET_CONSTRUCTION_DATA,
  GET_CONSTRUCTIONS_DATA,
} from "../constants/action.types";

const initialState = { isLoading: true };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONSTRUCTION_DATA:
      return {
        ...state,
        construction: payload,
        isLoading: false,
      };

    case GET_CONSTRUCTIONS_DATA:
      return {
        ...state,
        constructions: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
