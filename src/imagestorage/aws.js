//import React from "react";
import axios from "axios";
import {
  getImagefromData,
  getVideofromData,
  getPDFfromData,
} from "../js/getMultiMediafromData";

let createAPIUrl = "https://1e4loh865h.execute-api.us-east-2.amazonaws.com/DEV";

var albumBucketName = "imageuploadpr";
var bucketRegion = "us-east-2";
var IdentityPoolId = "us-east-2:2f0b38a1-03d4-4622-aa8a-7465bd2fea18";

window.AWS.config.update({
  region: bucketRegion,
  credentials: new window.AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

var s3 = new window.AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName },
});

/*
// load image
 getImageRecordStorage({
      folderUrl: "student",
      fileName: "sri",
      fileEvent: "",
      callback: (result) => {
        console.log(result);
        if (result.isSuccess == "true") {
          let imageTest = document.getElementById("inputfileitemimg");
          imageTest.src = result.dataprops.data;
        } else {
          this.props.reduxprops.setnotificationCompdata({
            showNotification: "true",
            notificationMessages: [
              {
                name: "message1",
                message: result.message,
                type: "error",
              },
            ],
          });
        }
      },
    });

   
    // uploadimage
    let result = await createImageRecordStorages({
      folderUrl: "student",
      fileName: "sri",
      fileEvent: e,
      callback: (result) => {
        console.log(result);
        if (result.isSuccess == "true") {
          let imageTest = document.getElementById("inputfileitemimg");
          imageTest.src = result.dataprops.Location;
        } else {
          this.props.reduxprops.setnotificationCompdata({
            showNotification: "true",
            notificationMessages: [
              {
                name: "message1",
                message: result.message,
                type: "error",
              },
            ],
          });
        }
      },
    });

*/

// function getHtml(template) {
//   return template.join("\n");
// }

export let getRecordsAWS = async (dataprops) => {
  let result = { isSuccess: "false", message: "", dataprops: {} };
  let folderUrl = dataprops.folderUrl;
  let recArray = ["test", "test2"];
  let prefix = folderUrl;
  // prefix = "gouthama/student/ST-PREK-jovi";
  s3.listObjects({ Delimiter: "", Prefix: prefix }, function (err, data) {
    if (err) {
      console.log(err);
      result = {
        isSuccess: "true",
        message: "error retriving file from storage",
        dataprops: {},
      };
      dataprops.callback(result);
      return alert("There was an error listing your albums: " + err.message);
    } else {
      console.log(data);
      console.log(JSON.stringify(data));
      let fileNames = [];
      var albums = data.Contents.map(function (content) {
        console.log(content.Key.replace(data.Prefix + "/", ""));
        let filname = content.Key.replace(data.Prefix + "/", "");
        let timenumber = content.LastModified.getTime();
        fileNames.push({
          name: filname,
          label: filname,
          lastmodified: content.LastModified,
          timenumber: timenumber,
        });
        return fileNames;
        // var prefix = content.Key;
        // var folderUrl = decodeURIComponent(prefix.replace("/", ""));
        // console.log(folderUrl);
        // return getHtml([
        //   "<li>",
        //   "<span onclick=\"deleteAlbum('" + folderUrl + "')\">X</span>",
        //   "<span onclick=\"viewAlbum('" + folderUrl + "')\">",
        //   folderUrl,
        //   "</span>",
        //   "</li>",
        // ]);
      });
      console.log(albums);
      result = {
        isSuccess: "true",
        message: " retrieved file names from storage",
        dataprops: {
          fileNames: fileNames,
        },
      };
      dataprops.callback(result);
      // var message = albums.length
      //   ? getHtml([
      //       "<p>Click on an album name to view it.</p>",
      //       "<p>Click on the X to delete the album.</p>",
      //     ])
      //   : "<p>You do not have any albums. Please Create album.";
      // var htmlTemplate = [
      //   "<h2>Albums</h2>",
      //   message,
      //   "<ul>",
      //   getHtml(albums),
      //   "</ul>",
      //   "<button onclick=\"createAlbum(prompt('Enter Album Name:'))\">",
      //   "Create New Album",
      //   "</button>",
      // ];
      // document.getElementById("appss").innerHTML = getHtml(htmlTemplate);
    }
  });

  return recArray;
};

function encode(data) {
  let buf = Buffer.from(data);
  console.log(buf);
  let base64 = buf.toString("base64");
  return base64;
}

export async function getRecordAWS(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };
  let folderUrl = dataprops.folderUrl;
  let fileName = dataprops.fileName;
  // let pdfpageNumber = dataprops.pdfpageNumber;
  let keyParam = folderUrl + "/" + fileName;
  var params = {
    Bucket: albumBucketName,
    Key: keyParam,
  };
  s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      /////////
      // The Base64 string of a simple PDF file
      var b64 = "";

      b64 = encode(data.Body);
      let datacontentType = data.ContentType;
      // Decode Base64 to binary and show some information about the PDF file (note that I skipped all checks)
      var bin = atob(b64);
      console.log(data);
      console.log(data.Body);
      console.log(encode(data.Body));

      console.log(bin);
      console.log("File Size:", Math.round(bin.length / 1024), "KB");

      // Embed the PDF into the HTML page and show it to the user
      ////////////
      if (datacontentType.toLowerCase().includes("pdf")) {
        result = {
          isSuccess: "true",
          message: "photo retrieved",
          dataprops: {
            imgtag: "",
            pdftag: getPDFfromData(data.Body, dataprops),
            sourcetype: "PDF",
          },
        };
      } else if (
        datacontentType.toLowerCase().includes("jpg") ||
        datacontentType.toLowerCase().includes("jpeg") ||
        datacontentType.toLowerCase().includes("png")
      ) {
        result = {
          isSuccess: "true",
          message: "photo retrieved",
          dataprops: {
            imgtag: "",
            imgsrc: getImagefromData(data.Body, dataprops),
            pdftag: "",
            sourcetype: "IMG",
          },
        };
      } else if (
        datacontentType.toLowerCase().includes("webm") ||
        datacontentType.toLowerCase().includes("flv") ||
        datacontentType.toLowerCase().includes("mpg") ||
        datacontentType.toLowerCase().includes("mpeg") ||
        datacontentType.toLowerCase().includes("3gp") ||
        datacontentType.toLowerCase().includes("flv") ||
        datacontentType.toLowerCase().includes("mp4")
      ) {
        result = {
          isSuccess: "true",
          message: "photo retrieved",
          dataprops: {
            imgtag: "",
            imgsrc: "",
            vidsrc: getVideofromData(data.Body, dataprops),
            pdftag: "",
            sourcetype: "VID",
          },
        };
      } else {
        result = {
          isSuccess: "true",
          message: "photo retrieved",
          dataprops: {
            imgtag: "",
            imgsrc: getImagefromData(data.Body, dataprops),
            pdftag: "",
            sourcetype: "IMG",
          },
        };
      }

      dataprops.callback(result);
    } // successful response
    /*
     data = {
      AcceptRanges: "bytes", 
      ContentLength: 3191, 
      ContentType: "image/jpeg", 
      ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
      LastModified: <Date Representation>, 
      Metadata: {
      }, 
      TagCount: 2, 
      VersionId: "null"
     }
     */
  });
  return result;
}

// function b64toBlob(b64Data, contentType, sliceSize) {
//   contentType = contentType || "";
//   sliceSize = sliceSize || 512;

//   var byteCharacters = atob(b64Data);
//   var byteArrays = [];

//   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     var slice = byteCharacters.slice(offset, offset + sliceSize);

//     var byteNumbers = new Array(slice.length);
//     for (var i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     var byteArray = new Uint8Array(byteNumbers);

//     byteArrays.push(byteArray);
//   }

//   var blob = new Blob(byteArrays, { type: contentType });
//   return blob;
// }

export async function createRecordAWS(dataprops) {
  console.log(dataprops);
  let result = { isSuccess: "false", message: "", dataprops: {} };
  let folderUrl = dataprops.folderUrl;
  let fileName = dataprops.fileName;
  let fileEvent = dataprops.fileEvent;
  var files, file, fileSuffix;
  fileSuffix = "";
  if (fileEvent !== "") {
    files = fileEvent.target.files;
    if (!files || !files.length) {
      return alert("Please choose a file to upload first.");
    }
    file = files[0];
  } else {
    //file = dataprops.fileSrc.file;

    let dataUrl = document.getElementById(dataprops.filehtmlId).src.split(",");
    let base64 = dataUrl[1];
    let mime = dataUrl[0].match(/:(.*?);/)[1];
    let bin = atob(base64);
    let length = bin.length;
    // From http://stackoverflow.com/questions/14967647/ (continues on next line)
    // encode-decode-image-with-base64-breaks-image (2013-04-21)
    let buf = new ArrayBuffer(length);
    let arr = new Uint8Array(buf);
    bin.split("").forEach((e, i) => (arr[i] = e.charCodeAt(0)));
    console.log(mime);
    if (mime.toLowerCase().includes("jpg")) {
      fileSuffix = "jpg";
    } else if (mime.toLowerCase().includes("jpeg")) {
      fileSuffix = "jpeg";
    } else if (mime.toLowerCase().includes("png")) {
      fileSuffix = "png";
    } else {
      fileSuffix = "jpeg";
    }
    console.log(fileSuffix);
    let f = new File([buf], "filename", { type: mime }); // note: [buf]
    // let blobUrl = URL.createObjectURL(f);
    file = f;
    // let link = document.createElement("a");
    // link.href = blobUrl;
    // link.download = "filename";
    // link.innerHTML = "Download file.";
    // document.getElementById("url1").appendChild(link);
  }
  console.log(file);

  var albumPhotosKey = folderUrl + "/";
  var photoKey = albumPhotosKey + fileName;
  //  photoKey = "/a/b/c";
  var upload = new window.AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: file,
      ACL: "public-read",
    },
  });
  var promise = upload.promise();
  promise.then(
    function (data) {
      console.log(data);
      result = {
        isSuccess: "true",
        message: "Successfully uploaded photo.",
        dataprops: data,
      };
      dataprops.callback(result);
      //     viewAlbum(folderUrl);
    },
    function (err) {
      result = {
        isSuccess: "false",
        message: "There was an error uploading" + err.message,
        dataprops: {},
      };
      dataprops.callback(result);
      // return alert("There was an error uploading your photo: ", err.message);
    }
  );

  return result;
}

export async function updateRecordAWS(dataprops) {
  console.log(dataprops);

  let result = { isSuccess: "false", message: "", dataprops: {} };
  let endurl = createAPIUrl + "/" + dataprops.objectName + "/update";
  console.log(endurl);

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
        UpdateExpression + "#a" + index + " = :x" + index + " , ";
    } else {
      UpdateExpression =
        UpdateExpression + "#a" + index + " = :x" + index + " ";
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
