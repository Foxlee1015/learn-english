import { AUTHENTICATE, DEAUTHENTICATE } from "../actionTypes";

const authReducer = (state = { loggedIn: null }, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, loggedIn: true };
    case DEAUTHENTICATE:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

export default authReducer;