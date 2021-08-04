import { AUTHENTICATE, DEAUTHENTICATE, REAUTHENTICATE } from "../actionTypes";

const initialState = {
  loggedIn: false,
  name: null,
  is_admin: 0,
}


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
    case REAUTHENTICATE:
      return { loggedIn: true, ...action.payload };
    case DEAUTHENTICATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;
