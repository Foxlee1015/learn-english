import Cookies from "universal-cookie";
import { server } from "../config";

export const setHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  if (session) {
    headers["Authorization"] = session;
  }
  return headers;
};

export const postUserLike = async ({ resources, ...data }, callback) => {
  const res = await fetch(`${server}/api/${resources}/likes`, {
    body: JSON.stringify(data),
    headers: setHeaders(),
    method: "POST",
  });
  if (res.status === 200) {
    callback();
  }
};

export const postNewUser = async (
  user,
  callback = () => {},
  failCallack = () => {}
) => {
  const data = new FormData();
  data.append("name", user.name);
  data.append("password", user.password);
  data.append("password_confirm", user.password_confirm);
  const res = await fetch(`${server}/api/users/`, {
    body: data,
    method: "POST",
  });
  if (res.status === 201) {
    callback();
  } else {
    const response = await res.json();
    failCallack(response.message);
  }
};