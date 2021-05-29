import {
  GET_CONSTRUCTION_DATA,
  GET_CONSTRUCTIONS_DATA,
  SET_MESSAGE,
} from "../constants/action.types";
import { ConstructionService } from "../services";

export const getConstruction = (id) => (dispatch) => {
  return ConstructionService.getConstruction(id)
    .then((response) => {
      dispatch({
        type: GET_CONSTRUCTION_DATA,
        payload: response.data,
      });
    })
    .catch((e) => console.log(e));
};

export const getConstructions = () => (dispatch) => {
  return ConstructionService.getAllConstructions()
    .then((response) => {
      dispatch({
        type: GET_CONSTRUCTIONS_DATA,
        payload: response.data,
      });
    })
    .catch((e) => console.log(e));
};
