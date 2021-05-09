import React from "react";
import { consoleLog } from ".";

/*


  readDatafromIndexDb = async () => {
    let result = await readFromIndexDB("test", (a) => {
      console.log(a);
    });
  };

  addDatatoIndexDb = async () => {
    let result = await addToIndexDB("a", "b", (a) => {
      console.log(a);
    });
  };

  removedataFromIndexDB = async () => {
    let result = await removeFromIndexDB("test", (a) => {
      console.log(a);
    });
  };
*/

//prefixes of implementation that we want to test
let indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

//prefixes of window.IDB objects
let IDBTransaction =
  window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction;
window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

const orgdata = [];
var db;
var request = window.indexedDB.open("org-localdb", 1);

request.onerror = function (event) {
  console.log("error: ");
};

request.onsuccess = function (event) {
  db = request.result;
  console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("orgdata", { keyPath: "name" });

  for (var i in orgdata) {
    objectStore.add(orgdata[i]);
  }
};

export async function readFromIndexDB(name, callback) {
  console.log(name);
  let result = { isSuccess: "false", message: "", data: {} };

  var transaction = await db.transaction(["orgdata"]);
  var objectStore = transaction.objectStore("orgdata");
  var request = objectStore.get(name);

  request.onerror = await function (event) {
    result = {
      isSuccess: "false",
      message: "Unable to retrieve data",
      data: {},
    };
    callback(result);
  };

  request.onsuccess = await function (event) {
    // Do something with the request.result!
    if (request.result) {
      result = {
        isSuccess: "true",
        message: "",
        data: request.result,
      };
      callback(result);
    } else {
      result = {
        isSuccess: "false",
        message: "data not found",
        data: {},
      };
      callback(result);
    }
  };
}

export function readAllFromIndexDB() {
  var objectStore = db.transaction("orgdata").objectStore("orgdata");

  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor) {
      console.log(
        "Name for id " +
          cursor.key +
          " is " +
          cursor.value.name +
          ",         Age: " +
          cursor.value.age +
          ", Email: " +
          cursor.value.email
      );
      cursor.continue();
    } else {
      console.log("No more entries!");
    }
  };
}

export async function addToIndexDB(name, value, callback) {
  console.log(name);
  let result = { isSuccess: "false", message: "", data: {} };
  var request = await db
    .transaction(["orgdata"], "readwrite")
    .objectStore("orgdata")
    .add({ name: name, value: value });

  request.onsuccess = await function (event) {
    console.log("succss");
    result = { isSuccess: "true", message: "added to localdb", data: {} };
    callback(result);
  };

  request.onerror = await function (event) {
    console.log("failed");
    result = {
      isSuccess: "false",
      message: "unabled to add / already exists",
      data: {},
    };
    callback(result);
  };
  return result;
}

export async function removeFromIndexDB(name, callback) {
  var request = await db
    .transaction(["orgdata"], "readwrite")
    .objectStore("orgdata")
    .delete(name);

  request.onsuccess = function (event) {
    let result = { isSuccess: "true", message: "removed", data: {} };
    callback(result);
  };
}
