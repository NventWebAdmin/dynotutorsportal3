import firebase from "firebase";
import React from "react";
import axios from "axios";

var config = {
  apiKey: "AIzaSyCV4ykN9qy5eIaWuTJX3UftfcH6VsXDfXk",
  authDomain: "nventweb.firebaseapp.com",
  databaseURL: "https://nventweb.firebaseio.com",
  projectId: "nventweb",
  storageBucket: "nventweb.appspot.com",
  messagingSenderId: "596282375955",
  appId: "1:596282375955:web:9f66e0aab426513c3da4e6",
  measurementId: "G-CP4VBGX4S4",
};

export function getRecordsFirebase() {
  let recArray = ["test", "test2"];
  return recArray;
}

export function getRecordFirebase(recId) {
  let rec = { name: recId, phone: "123" };
  return rec;
}

export const getallRecords = (url, params, callbackf) => {
  console.log("te");
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  var recordsRef = firebase.database().ref("appone");
  recordsRef.on("value", function (snapshot) {
    console.log(JSON.stringify(snapshot.val()));
    //updateStarCount(postElement, snapshot.val());
    // if (callbackf) callbackf(snapshot.val());
  });

  return "test";
};

export async function createRecordFirebase(recId) {
  let result = { isSuccess: "false", message: "", dataprops: {} };

  return result;
}

export async function updateRecordFirebase(dataprops) {
  console.log(dataprops);
  let result = { isSuccess: "false", message: "", dataprops: {} };
  console.log(result);

  return result;
}

export async function deleteRecordFirebase(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };

  return result;
}
