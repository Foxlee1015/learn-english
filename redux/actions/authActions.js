import { server } from "../../config";
import { AUTHENTICATE, DEAUTHENTICATE } from "../actionTypes";
import Cookies from "universal-cookie";

export const authenticate = (user) => (dispatch) => {
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
        dispatch({ type: AUTHENTICATE});
      }
    });
};

export const reauthenticate = ()  => (dispatch)=> {
  const cookies = new Cookies();
  const session = cookies.get("EID_SES")
  if (session) {
    fetch(`${server}/api/sessions/validate`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": session
      }
    })
      .then((response) => {
          dispatch({ type: AUTHENTICATE});
      })
      .catch(()=>{
        dispatch({ type: DEAUTHENTICATE})
      });
  } else {
    dispatch({ type: DEAUTHENTICATE})
  }
};

export const deauthenticate = ()  => (dispatch) => {
  const cookies = new Cookies();
  const session = cookies.get("EID_SES")
  fetch(`${server}/api/sessions/`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": session
    },
    method: "DELETE",
  })
    .then((response) => {
        cookies.remove("EID_SES")
        dispatch({ type: DEAUTHENTICATE});
    });
};
