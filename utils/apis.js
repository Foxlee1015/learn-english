import Cookies from "universal-cookie";
import { server } from "../config";
import { createQueryParams } from "./utils";

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
  const res = await fetch(`${server}/${resources}/likes`, {
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
  callback = () => { },
  failCallack = () => { }
) => {
  const data = new FormData();
  data.append("name", user.name);
  data.append("password", user.password);
  data.append("password_confirm", user.password_confirm);
  const res = await fetch(`${server}/users/`, {
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
  const res = await fetch(`${server}/idioms/`, {
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
  const res = await fetch(`${server}/phrasal-verbs/`, {
    body: JSON.stringify(data),
    headers: setHeaders(),
    method: "POST",
  });
  if (res.status === 201) {
    callback();
  }
};

export const deletePhrasalVerb = async (_id, callback) => {
  if (!checkIfSessionExists()) {
    return;
  }
  const params = createQueryParams({
    _id
  })
  const res = await fetch(`${server}/phrasal-verbs/?${params}`, {
    headers: setHeaders(),
    method: "DELETE",
  });
  if (res.status === 200) {
    callback();
  }
};


export const deleteIdiom = async (_id, callback) => {
  if (!checkIfSessionExists()) {
    return;
  }
  const params = createQueryParams({
    _id
  })
  const res = await fetch(`${server}/idioms/?${params}`, {
    headers: setHeaders(),
    method: "DELETE",
  });
  if (res.status === 200) {
    callback();
  }
};
