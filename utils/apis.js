import Cookies from "universal-cookie";
import { server } from "../config";

const checkIfSessionExists = () => {
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  if (session) {
    return true;
  } else {
    return false;
  }
};

export const setHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  if (session) {
    headers["Authorization"] = session;
  }
  return headers;
};

export const postUserLike = async (
  { resources, ...data },
  callback,
  failCallback
) => {
  if (!checkIfSessionExists()) {
    failCallback("Please login first");
    return;
  }
  const res = await fetch(`${server}/api/${resources}/likes`, {
    body: JSON.stringify(data),
    headers: setHeaders(),
    method: "POST",
  });
  if (res.status === 200) {
    callback();
  } else if (res.status === 401) {
    failCallback("Please login.");
  } else {
    failCallback("Something went wrong.");
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

export const postIdiom = async (data, callback) => {
  if (!checkIfSessionExists()) {
    return;
  }
  const res = await fetch(`${server}/api/idioms/`, {
    body: JSON.stringify(data),
    headers: setHeaders(),
    method: "POST",
  });
  if (res.status === 201) {
    callback();
  }
};

export const postPhrasalVerb = async (data, callback) => {
  if (!checkIfSessionExists()) {
    return;
  }
  const res = await fetch(`${server}/api/phrasal-verbs/`, {
    body: JSON.stringify(data),
    headers: setHeaders(),
    method: "POST",
  });
  if (res.status === 201) {
    callback();
  }
};

export const deleteResource = async (resource, _id, callback) => {
  if (!checkIfSessionExists()) {
    return;
  }
  const res = await fetch(`${server}/api/${resource}/?_id=${_id}`, {
    headers: setHeaders(),
    method: "DELETE",
  });
  if (res.status === 200) {
    callback();
  }
};
