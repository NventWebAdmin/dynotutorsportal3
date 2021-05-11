import {
  getRecordsAWS,
  getRecordAWS,
  createRecordAWS,
  updateRecordAWS,
  deleteRecordAWS,
} from "./aws";
import {
  getRecordsFirebase,
  getRecordFirebase,
  createRecordFirebase,
  updateRecordFirebase,
  deleteRecordFirebase,
} from "./firebase";

import { configdata } from "../config";

export function getImageRecordsStorage(dataprops) {
  let recArray;
  if (configdata().imagestoragevendor === "aws") {
    recArray = getRecordsAWS(dataprops);
  }
  if (configdata().imagestoragevendor === "firebase") {
    recArray = getRecordsFirebase(dataprops);
  }

  return recArray;
}

export function getImageRecordStorage(dataprops) {
  let rec;
  if (configdata().imagestoragevendor === "aws") {
    rec = getRecordAWS(dataprops);
  }
  if (configdata().imagestoragevendor === "firebase") {
    rec = getRecordFirebase(dataprops);
  }
  return rec;
}

export function createImageRecordStorage(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().imagestoragevendor === "aws") {
    rec = createRecordAWS(dataprops);
  }
  if (configdata().imagestoragevendor === "firebase") {
    rec = createRecordFirebase(dataprops);
  }
  return rec;
}

export function updateRecord(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().imagestoragevendor === "aws") {
    rec = updateRecordAWS(dataprops);
  }
  if (configdata().imagestoragevendor === "firebase") {
    rec = updateRecordFirebase(dataprops);
  }
  return rec;
}

export function deleteRecord(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().imagestoragevendor === "aws") {
    rec = deleteRecordAWS(dataprops);
  }
  if (configdata().imagestoragevendor === "firebase") {
    rec = deleteRecordFirebase(dataprops);
  }
  return rec;
}
