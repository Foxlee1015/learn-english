import { server } from "../../config";
import { AUTHENTICATE, DEAUTHENTICATE } from "../actionTypes";

export const authenticate = (user) => (dispatch) => {
  console.log(user);
  fetch(`${server}/api/sessions/`, {
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((res) => res.json())
    .then((response) => {
      if (response && response.result) {
        const cookies = new Cookies();
        cookies.set("EID_SES", response.result, {
          path: "/",
          maxAge: 60 * 60 * 24,
        });
        dispatch({ type: AUTHENTICATE, payload: true });
      }
    });
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};

export const deauthenticate = () => {
  return (dispatch) => {
    removeCookie("token");
    Router.push("/");
    dispatch({ type: DEAUTHENTICATE });
  };
};
