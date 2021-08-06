import { SET_AREA_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
  areaError: null
};

const areaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AREA_ERRORS:
      return {
        ...state,
        areaError: action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        areaError: null
      };

    default:
      return state;
  }
};

export default areaReducer;
