import React from "react";
import axios from "axios";
let createAPIUrl = "https://1e4loh865h.execute-api.us-east-2.amazonaws.com/DEV";

{
  /*
////////get data
 let result = await getRecorddata({
        objectName: "student",
        objectData: {},
        keyConditions: [
          { field: "startdate", value: 1, expression: ">" },
          { field: "class", value: "first", expression: "=" },
        ],
        filterConditions: [
          { field: "rollnumber", value: 1, expression: "=" },
          { field: "age", value: "first", expression: "=" },
        ],
      });
      console.log(result);
      if (result.isSuccess === "false") {
        this.setState(
          {
            showNotification: "false",
            notificationMessages: [],
          },

          () =>
            this.setState({
              showNotification: "true",
              notificationMessages: [
                {
                  name: "message1",
                  message: result.message,
                  type: "error",
                },
              ],
            })
        );
      } else {
        this.setState(
          {
            showNotification: "false",
            notificationMessages: [],
          },

          () =>
            this.setState({
              showNotification: "true",
              notificationMessages: [
                {
                  name: "message1",
                  message: "data retrieved",
                  type: "info",
                },
              ],
            })
        );
      }
      
  //////////////insert record
let result = await createRecord({
        objectName: "product",
        objectData: {
          Id: "id2",
          name: "pradeeprao",
          city: "dallas",
          phone: "1234",
          state: "texas",
          zip: "75206",
        },
      });
      if (result.isSuccess === "false") {
        this.setState(
          {
            showNotification: "false",
            notificationMessages: [],
          },

          () =>
            this.setState({
              showNotification: "true",
              notificationMessages: [
                {
                  name: "message1",
                  message: result.message,
                  type: "error",
                },
              ],
            })
        );
      } else {
        this.setState(
          {
            showNotification: "false",
            notificationMessages: [],
          },

          () =>
            this.setState({
              showNotification: "true",
              notificationMessages: [
                {
                  name: "message1",
                  message: "data inserted",
                  type: "info",
                },
              ],
            })
        );
      }

//////////////update record
let result = await updateRecord({
  objectName: "product",
  objectPrimaryKeyValue: { Id: "id1" },
  objectData: {
    name: "pradeeprao",
    city: "dallas",
    phone: "1234",
    state: "texas",
    zip: "75206",
  },
});
if (result.isSuccess === "false") {
  this.setState(
    {
      showNotification: "false",
      notificationMessages: [],
    },

    () =>
      this.setState({
        showNotification: "true",
        notificationMessages: [
          {
            name: "message1",
            message: result.message,
            type: "error",
          },
        ],
      })
  );
} else {
  this.setState(
    {
      showNotification: "false",
      notificationMessages: [],
    },

    () =>
      this.setState({
        showNotification: "true",
        notificationMessages: [
          {
            name: "message1",
            message: "data updated",
            type: "info",
          },
        ],
      })
  );
}

///////////////delete item


 let result = await deleteRecord({
        objectName: "account",
        objectPrimaryKeyValue: { Id: "id1" },
      });
      if (result.isSuccess === "false") {
        this.setState(
          {
            showNotification: "false",
            notificationMessages: [],
          },

          () =>
            this.setState({
              showNotification: "true",
              notificationMessages: [
                {
                  name: "message1",
                  message: result.message,
                  type: "error",
                },
              ],
            })
        );
      } else {
        this.setState(
          {
            showNotification: "false",
            notificationMessages: [],
          },

          () =>
            this.setState({
              showNotification: "true",
              notificationMessages: [
                {
                  name: "message1",
                  message: "data deleted",
                  type: "info",
                },
              ],
            })
        );
      }


      ///////bulkcreated
          let result = await bulkcreateRecord({
          objectName: "student",
          objectListData: [
            { orgname: "gouthama", id: "tsest" },
            { orgname: "gouthama", id: "tsest2" },
          ],
        });
        if (result.isSuccess === "false") {
          alert(result.message);
        } else {
          console.log(result);
        }


*/
}

export function getRecordsAWS() {
  let recArray = ["test", "test2"];
  return recArray;
}

export async function getRecordAWS(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };
  let endurl = createAPIUrl + "/" + dataprops.objectName + "/retrieve";
  console.log(endurl);

  let keyConditions = dataprops.keyConditions;
  let filterConditions = dataprops.filterConditions;

  let KeyConditionExpression = "";
  let filterConditionExpression = "";
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};
  let index = 0;
  let lastIndex = keyConditions.length - 1;
  for (let i in keyConditions) {
    console.log(i);
    let keyindex = "#a" + index;
    ExpressionAttributeNames[keyindex] = keyConditions[i].field;
    let valueindex = ":x" + index;
    ExpressionAttributeValues[valueindex] = keyConditions[i].value;
    if (index < lastIndex) {
      if (keyConditions[i].expression == "beginswith") {
        KeyConditionExpression =
          KeyConditionExpression +
          "begins_with (" +
          "#a" +
          index +
          " " +
          "," +
          " :" +
          "x" +
          index +
          ") and ";
      } else {
        KeyConditionExpression =
          KeyConditionExpression +
          "#a" +
          index +
          " " +
          keyConditions[i].expression +
          " :" +
          "x" +
          index +
          " and ";
      }
    } else {
      // KeyConditionExpression =
      //   KeyConditionExpression +
      //   "#a" +
      //   index +
      //   " " +
      //   keyConditions[i].expression +
      //   " :" +
      //   "x" +
      //   index +
      //   " ";

      ///////
      if (keyConditions[i].expression == "beginswith") {
        KeyConditionExpression =
          KeyConditionExpression +
          "begins_with (" +
          "#a" +
          index +
          " " +
          "," +
          " :" +
          "x" +
          index +
          ")";
      } else {
        KeyConditionExpression =
          KeyConditionExpression +
          "#a" +
          index +
          " " +
          keyConditions[i].expression +
          " :" +
          "x" +
          index +
          " ";
      }
      /////
    }
    index = index + 1;
  }

  let filterindex = 0;
  let filterlastIndex = filterConditions.length - 1;
  for (let i in filterConditions) {
    console.log(i);
    let keyindex = "#b" + filterindex;
    ExpressionAttributeNames[keyindex] = filterConditions[i].field;
    let valueindex = ":y" + filterindex;
    ExpressionAttributeValues[valueindex] = filterConditions[i].value;
    if (filterindex < filterlastIndex) {
      filterConditionExpression =
        filterConditionExpression +
        "#b" +
        filterindex +
        " " +
        filterConditions[i].expression +
        " :" +
        "y" +
        filterindex +
        " and ";
    } else {
      filterConditionExpression =
        filterConditionExpression +
        "#b" +
        filterindex +
        " " +
        filterConditions[i].expression +
        " :" +
        "y" +
        filterindex +
        " ";
    }
    filterindex = filterindex + 1;
  }

  console.log(KeyConditionExpression);
  console.log(filterConditionExpression);
  console.log(ExpressionAttributeNames);
  console.log(ExpressionAttributeValues);

  let params = {
    FilterExpression: filterConditionExpression,
    KeyConditionExpression: KeyConditionExpression,
    ExpressionAttributeNames: ExpressionAttributeNames,
    ExpressionAttributeValues: ExpressionAttributeValues,
    PageSize: dataprops.pageSize,
    Limit: dataprops.limit,
    ExclusiveStartKey: dataprops.exclusiveStartKey,
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

export async function bulkcreateRecordAWS(dataprops) {
  console.log(dataprops);
  let result = { isSuccess: "false", message: "", dataprops: {} };

  let endurl = createAPIUrl + "/" + dataprops.objectName + "/bulkcreate";
  console.log(endurl);
  let objectListData = dataprops.objectListData;
  let objectListDatatobeSent = [];
  for (let objectData in objectListData) {
    objectListDatatobeSent.push({
      PutRequest: {
        Item: objectListData[objectData],
      },
    });
  }
  let datatobesent = {};
  datatobesent[dataprops.objectName] = objectListDatatobeSent;

  let axiosresult = await axios
    .post(endurl, datatobesent, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      result = {
        isSuccess: "true",
        message: "user loggedin",
        dataprops: response.data,
      };
      return result;
    })
    .catch((error) => {
      console.log(error);
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

export async function createRecordAWS(dataprops) {
  console.log(dataprops);
  let result = { isSuccess: "false", message: "", dataprops: {} };

  let endurl = createAPIUrl + "/" + dataprops.objectName + "/create";
  console.log(endurl);

  let objectData = dataprops.objectData;
  let n = new Date();
  objectData.createdtime = n.getTime();
  objectData.lastupdatedtime = n.getTime();
  let axiosresult = await axios
    .post(endurl, objectData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      result = {
        isSuccess: "true",
        message: "user loggedin",
        dataprops: response.data,
      };
      return result;
    })
    .catch((error) => {
      console.log(error);
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

export async function updateRecordAWS(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };
  let endurl = createAPIUrl + "/" + dataprops.objectName + "/update";
  console.log(endurl);
  let n = new Date();
  dataprops.objectData.lastupdatedtime = n.getTime();
  let fieldProps = dataprops.objectData;

  let objectData = dataprops.objectData;
  let UpdateExpression = "set ";
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};
  let index = 0;
  let lastIndex = Object.keys(fieldProps).length - 1;
  for (let i in fieldProps) {
    console.log();
    let keyindex = "#a" + index;
    ExpressionAttributeNames[keyindex] = i;
    let valueindex = ":x" + index;
    ExpressionAttributeValues[valueindex] = fieldProps[i];
    if (index < lastIndex) {
      UpdateExpression =
        UpdateExpression + "#a" + index + " = :" + "x" + index + " , ";
    } else {
      UpdateExpression =
        UpdateExpression + "#a" + index + " = :" + "x" + index + " ";
    }
    index = index + 1;
  }

  console.log(ExpressionAttributeValues);
  objectData = {
    Key: dataprops.objectPrimaryKeyValue,
    UpdateExpression: UpdateExpression,
    ExpressionAttributeNames: ExpressionAttributeNames,
    ExpressionAttributeValues: ExpressionAttributeValues,
  };
  console.log(objectData);
  let axiosresult = await axios
    .post(endurl, objectData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
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

export async function deleteRecordAWS(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };
  let endurl = createAPIUrl + "/" + dataprops.objectName + "/delete";
  console.log(endurl);

  let objectData = {
    Key: dataprops.objectPrimaryKeyValue,
  };
  let axiosresult = await axios
    .post(endurl, objectData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
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
