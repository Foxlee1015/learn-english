import { server } from "../../config";
import { AUTHENTICATE, DEAUTHENTICATE } from "../actionTypes";
import Cookies from "universal-cookie";

export const authenticate =
  (user, successCallback, failCallback) => (dispatch) => {
    fetch(`${server}/api/sessions/`, {
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 400) {
          failCallback("Please check your username and password");
        } else {
          failCallback("Sever error");
        }
      })
      .then((response) => {
        if (response && response.result) {
          const cookies = new Cookies();
          cookies.set("EID_SES", response.result, {
            path: "/",
            maxAge: 60 * 60 * 24,
          });
          dispatch({ type: AUTHENTICATE });
          successCallback();
        }
      })
      .catch(() => {
        failCallback("Sever error");
      });
  };

export const reauthenticate = () => (dispatch) => {
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  if (session) {
    fetch(`${server}/api/sessions/validate`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: session,
      },
    })
      .then((response) => {
        dispatch({ type: AUTHENTICATE });
      })
      .catch(() => {
        dispatch({ type: DEAUTHENTICATE });
      });
  } else {
    dispatch({ type: DEAUTHENTICATE });
  }
};

export const deauthenticate = () => (dispatch) => {
  console.log("dde");
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  cookies.remove("EID_SES", { path: "/" });
  fetch(`${server}/api/sessions/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: session,
    },
    method: "DELETE",
  }).then((response) => {
    dispatch({ type: DEAUTHENTICATE });
  });
};
