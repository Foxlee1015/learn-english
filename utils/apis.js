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
