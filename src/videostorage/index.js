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

import {
  getRecordsYoutube,
  getRecordYoutube,
  createRecordYoutube,
  updateRecordYoutube,
  deleteRecordYoutube,
} from "./youtube";

import { configdata } from "../config";

export function getVideoRecordsStorage(dataprops) {
  let recArray;
  if (configdata().videostoragevendor === "aws") {
    recArray = getRecordsAWS(dataprops);
  }
  if (configdata().videostoragevendor === "firebase") {
    recArray = getRecordsFirebase(dataprops);
  }
  if (configdata().videostoragevendor === "youtube") {
    recArray = getRecordsYoutube(dataprops);
  }

  return recArray;
}

export function getVideoRecordStorage(dataprops) {
  let rec;
  if (configdata().videostoragevendor === "aws") {
    rec = getRecordAWS(dataprops);
  }
  if (configdata().videostoragevendor === "firebase") {
    rec = getRecordFirebase(dataprops);
  }
  if (configdata().videostoragevendor === "youtube") {
    rec = getRecordYoutube(dataprops);
  }
  return rec;
}

export function createVideoRecordStorage(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().videostoragevendor === "aws") {
    rec = createRecordAWS(dataprops);
  }
  if (configdata().videostoragevendor === "firebase") {
    rec = createRecordFirebase(dataprops);
  }
  if (configdata().videostoragevendor === "youtube") {
    rec = createRecordYoutube(dataprops);
  }
  return rec;
}

export function updateVideoRecord(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().videostoragevendor === "aws") {
    rec = updateRecordAWS(dataprops);
  }
  if (configdata().videostoragevendor === "firebase") {
    rec = updateRecordFirebase(dataprops);
  }
  if (configdata().videostoragevendor === "youtube") {
    rec = updateRecordYoutube(dataprops);
  }
  return rec;
}

export function deleteVideoRecord(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().videostoragevendor === "aws") {
    rec = deleteRecordAWS(dataprops);
  }
  if (configdata().videostoragevendor === "firebase") {
    rec = deleteRecordFirebase(dataprops);
  }
  if (configdata().videostoragevendor === "youtube") {
    rec = deleteRecordYoutube(dataprops);
  }
  return rec;
}
