import {
  getRecordsAWS,
  getRecordAWS,
  createRecordAWS,
  updateRecordAWS,
  deleteRecordAWS,
  bulkcreateRecordAWS,
} from "./aws";
import {
  getRecordsFirebase,
  getRecordFirebase,
  createRecordFirebase,
  updateRecordFirebase,
  deleteRecordFirebase,
  bulkcreateRecordFirebase,
} from "./firebase";
import { configdata } from "../config";

export function getRecordsdata() {
  let recArray;
  if (configdata.dbvendor == "aws") {
    recArray = getRecordsAWS();
  }
  if (configdata.dbvendor == "firebase") {
    recArray = getRecordsFirebase();
  }

  return recArray;
}

export function getRecorddata(dataprops) {
  let rec;
  if (configdata().dbvendor == "aws") {
    rec = getRecordAWS(dataprops);
  }
  if (configdata().dbvendor == "firebase") {
    rec = getRecordFirebase(dataprops);
  }
  return rec;
}

export function createRecord(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().dbvendor == "aws") {
    rec = createRecordAWS(dataprops);
  }
  if (configdata().dbvendor == "firebase") {
    rec = createRecordFirebase(dataprops);
  }
  return rec;
}

export function bulkcreateRecord(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().dbvendor == "aws") {
    rec = bulkcreateRecordAWS(dataprops);
  }
  if (configdata().dbvendor == "firebase") {
    rec = bulkcreateRecordFirebase(dataprops);
  }
  return rec;
}

export function updateRecord(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().dbvendor == "aws") {
    rec = updateRecordAWS(dataprops);
  }
  if (configdata().dbvendor == "firebase") {
    rec = updateRecordFirebase(dataprops);
  }
  return rec;
}

export function deleteRecord(dataprops) {
  console.log(dataprops);
  let rec;
  if (configdata().dbvendor == "aws") {
    rec = deleteRecordAWS(dataprops);
  }
  if (configdata().dbvendor == "firebase") {
    rec = deleteRecordFirebase(dataprops);
  }
  return rec;
}
