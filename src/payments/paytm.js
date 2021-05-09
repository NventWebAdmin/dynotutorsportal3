import React from "react";
import axios from "axios";
let apiUrl = "https://";

{
  /*

*/
}

export async function makePaymentPaytm(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };
  let endurl = createAPIUrl + "/" + dataprops.objectName + "/retrieve";
  console.log(endurl);

  let params = {
    FilterExpression: filterConditionExpression,
  };
  console.log(params);
  let axiosresult = await axios
    .post(endurl, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("response on" + dataprops.objectName);
      console.log(response);
      result = {
        isSuccess: "true",
        message: "user loggedin",
        dataprops: response.data,
      };
      return result;
    })
    .catch((error) => {
      console.log(error.response);
      let errormessage = "";
      if (error.response) {
        errormessage = error.response.data.message;
      } else {
        errormessage = JSON.stringify(error);
      }
      result = {
        isSuccess: "false",
        message: errormessage,
        dataprops: {},
      };
      return result;
    });
  result = axiosresult;
  console.log(result);

  return result;
}

export async function checkPaymentPaytm(dataprops) {}
