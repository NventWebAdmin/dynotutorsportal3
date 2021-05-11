//import React from "react";
//import { MediaUploader } from "./cors_upload";
import axios from "axios";
import // getImagefromData,
// getVideofromData,
// getPDFfromData,
"../js/getMultiMediafromData";

//let youtubeApiUrl = "https://www.googleapis.com/youtube/v3/";

export let getRecordsYoutube = async (dataprops) => {
  //let result = { isSuccess: "false", message: "", dataprops: {} };
  // let folderUrl = dataprops.folderUrl;
  let recArray = ["test", "test2"];
  // let prefix = folderUrl;
  return recArray;
};

export async function getRecordYoutube(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };
  //let folderUrl = dataprops.folderUrl;
  //let fileName = dataprops.fileName;
  // let pdfpageNumber = dataprops.pdfpageNumber;
  // let keyParam = folderUrl + "/" + fileName;

  let getresult = await axios
    .get(
      "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&include_granted_scopes=true&state=state_parameter_passthrough_value&response_type=token&client_id=896269655884-86g035o98bggg9ai522t1621e5a0qh45.apps.googleusercontent.com"
    )
    .then((err) => console.log(JSON.stringify(err)))
    .catch((err) => console.log(JSON.stringify(err)));
  console.log(getresult);
  const config = {
    headers: {
      Authorization: `Bearer `,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log(config);
  const bodyParameters = {
    snippet: {
      categoryId: "22",
      description: "Description of uploaded video.",
      title: "Test video upload.",
    },
    status: {
      privacyStatus: "private",
    },
  };

  console.log(bodyParameters);

  // let axiosresult = await axios
  //   .post(
  //     "https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatus&key=AIzaSyDl9YbnIoB7IMBXp3tp03QNH8Eb3B5AuDA",
  //     bodyParameters,
  //     config
  //   )
  //   .then((err) => console.log(JSON.stringify(err)))
  //   .catch((err) => console.log(JSON.stringify(err)));

  // result = axiosresult;
  console.log(result);

  return result;
}

export async function createRecordYoutube(dataprops) {
  console.log(dataprops);
  let result = { isSuccess: "false", message: "", dataprops: {} };
  //  let folderUrl = dataprops.folderUrl;
  //  let fileName = dataprops.fileName;
  // let fileEvent = dataprops.fileEvent;
  // var files, file, fileSuffix;

  const config = {
    headers: {
      Authorization: `Bearer ${"token"}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const bodyParameters = {
    snippet: {
      categoryId: "22",
      description: "Description of uploaded video.",
      title: "Test video upload.",
    },
    status: {
      privacyStatus: "private",
    },
  };

  let axiosresult = axios
    .post(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatus&key=[YOUR_API_KEY]",
      bodyParameters,
      config
    )
    .then((err) => console.log(err))
    .catch((err) => console.log(err));

  result = axiosresult;
  console.log(result);

  return result;
}

export async function updateRecordYoutube(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };

  return result;
}

export async function deleteRecordYoutube(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };

  return result;
}
