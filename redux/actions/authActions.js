import { server } from "../../config";
import { AUTHENTICATE, DEAUTHENTICATE, REAUTHENTICATE } from "../actionTypes";
import Cookies from "universal-cookie";

export const authenticate =
  (user, successCallback, failCallback, finishCallback) => (dispatch) => {
    fetch(`${server}/sessions/`, {
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
          const { session, name, is_admin } = response.result;
          cookies.set("EID_SES", session, {
            path: "/",
            maxAge: 60 * 60 * 24,
          });
          dispatch({ type: AUTHENTICATE, payload: { name, is_admin } });
          successCallback();
        }
      })
      .catch(() => {
        failCallback("Sever error");
      })
      .finally(() => {
        finishCallback();
      });
  };

export const reauthenticate =
  (successCallback = () => {}, failCallback = () => {}) =>
  (dispatch) => {
    const cookies = new Cookies();
    const session = cookies.get("EID_SES");
    if (session) {
      fetch(`${server}/sessions/validate`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: session,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((response) => {
          dispatch({ type: REAUTHENTICATE, payload: response.result });
          successCallback();
        })
        .catch((err) => {
          dispatch({ type: DEAUTHENTICATE });
          failCallback();
        });
    } else {
      dispatch({ type: DEAUTHENTICATE });
      failCallback();
    }
  };

export const deauthenticate = () => (dispatch) => {
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  cookies.remove("EID_SES", { path: "/" });
  fetch(`${server}/sessions/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: session,
    },
    method: "DELETE",
  }).then((response) => {
    dispatch({ type: DEAUTHENTICATE });
  });
};
