import React from "react";

export let getLocalStoragehandle = (param) => {
  return localStorage.getItem(param);
};

export let setLocalStoragehandle = (param1, param2) => {
  localStorage.setItem(param1, param2);
  console.log(localStorage);
  return true;
};

export let getSessionStoragehandle = (param) => {
  console.log("getsessionstorage");

  return sessionStorage.getItem(param);
};

export let setSessionStoragehandle = (param1, param2) => {
  sessionStorage.setItem(param1, param2);
  console.log(localStorage);
  return true;
};
