/* eslint-disable */
import { SIGNIN, SIGNUP, LOGOUT, SET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
  authError: null,
  isAuthenticated: false,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        isAuthenticated: false
      };

    case SIGNIN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true
      };

    case SET_ERRORS:
      return {
        ...state,
        authError: action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        authError: null
      };

    case LOGOUT:
      return initialState;

    default:
      return initialState;
  }
};

export default authReducer;
