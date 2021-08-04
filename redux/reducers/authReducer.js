import { AUTHENTICATE, DEAUTHENTICATE, REAUTHENTICATE } from "../actionTypes";

const authReducer = (state = { loggedIn: null }, action) => {
  console.log(action);
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, loggedIn: true };
    case REAUTHENTICATE:
      return { ...state, ...action.payload, loggedIn: true };
    case DEAUTHENTICATE:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
