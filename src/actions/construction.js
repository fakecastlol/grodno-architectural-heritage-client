import {
  GET_CONSTRUCTION_DATA,
  GET_CONSTRUCTIONS_DATA,
  SET_MESSAGE,
} from "../constants/action.types";
import { ConstructionService } from "../services";

export const getConstruction = (id) => (dispatch) => {
  console.log(id);
  return ConstructionService.getConstruction(id)
    .then((response) => {
      console.log(response);
      dispatch({
        type: GET_CONSTRUCTION_DATA,
        payload: response.data,
      });
      // return Promise.resolve(response.data);
    })
    .catch((e) => console.log(e));
};

export const getConstructions = () => (dispatch) => {
  console.log();
  return ConstructionService.getAllConstructions()
    .then((response) => {
      console.log(response);
      dispatch({
        type: GET_CONSTRUCTIONS_DATA,
        payload: response.data,
      });
      // return Promise.resolve(response.data);
    })
    .catch((e) => console.log(e));
};
