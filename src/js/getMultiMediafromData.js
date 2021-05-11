//import React, { Component } from "react";
//const fs = require("fs");

function encode(data) {
  console.log(data);
  let buf = Buffer.from(data);
  console.log(buf);
  let base64 = buf.toString("base64");
  console.log(base64);

  let buff = new Buffer(base64, "base64");
  console.log(buff);

  var x = Buffer.compare(buf, buff);
  console.log(x);

  return base64;
}

export let getImagefromData = (databody, dataprops) => {
  var mimes = {
    jpeg: "data:image/jpeg;base64,",
  };
  let url = mimes.jpeg + encode(databody);
  return url;
  // return (
  //   <>
  //     <img
  //       src={url}
  //       width="100%"
  //       height="100%"
  //       style={{ objectFit: "cover" }}
  //       // onClick={this.dataprops.onClick}
  //       // data-name={this.dataprops.name}
  //     />
  //   </>
  // );
};

export let getVideofromData = (databody, dataprops) => {
  console.log(databody);
  var mimes = {
    jpeg: "data:image/jpeg;base64,",
  };
  let url = mimes.jpeg + encode(databody);
  return url;
  // return (
  //   <>
  //     <img
  //       src={url}
  //       width="100%"
  //       height="100%"
  //       style={{ objectFit: "cover" }}
  //       // onClick={this.dataprops.onClick}
  //       // data-name={this.dataprops.name}
  //     />
  //   </>
  // );
};

export let getPDFfromData = (databody, dataprops) => {
  //  var canvaselement = document.createElement("canvas");
  var canvaselement = document.getElementById("theCanvas2");

  // var b64 = "";

  // b64 = encode(data.Body);

  // Decode Base64 to binary and show some information about the PDF file (note that I skipped all checks)
  // var bin = atob(b64);

  // console.log("PDF Version:", bin.match(/^.PDF-([0-9.]+)/)[1]);
  // console.log(
  //   "Create Date:",
  //   bin.match(/<xmp:CreateDate>(.+?)<\/xmp:CreateDate>/)[1]
  // );
  // console.log(
  //   "Modify Date:",
  //   bin.match(/<xmp:ModifyDate>(.+?)<\/xmp:ModifyDate>/)[1]
  // );
  // console.log(
  //   "Creator Tool:",
  //   bin.match(/<xmp:CreatorTool>(.+?)<\/xmp:CreatorTool>/)[1]
  // );

  // var obj = document.createElement("object");
  // obj.style.width = "100%";
  // obj.style.height = "80vh";
  // obj.type = "application/pdf";
  // obj.data = "data:application/pdf;base64," + b64;
  // document.body.appendChild(obj);

  // var link = document.createElement("a");
  // link.innerHTML = "Download PDF file";
  // link.download = "file.pdf";
  // link.href = "data:application/octet-stream;base64," + b64;
  // document.body.appendChild(link);
  // var mimes = {
  //   jpeg: "data:image/jpeg;base64,",
  // };

  var pdfData = atob(encode(databody));
  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var pdfjsLib = window["pdfjs-dist/build/pdf"];
  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "//mozilla.github.io/pdf.js/build/pdf.worker.js";
  var loadingTask = pdfjsLib.getDocument({ data: pdfData });
  loadingTask.promise.then(
    function (pdf) {
      var pageNumber = dataprops.pdfpageNumber;
      pdf.getPage(pageNumber).then(function (page) {
        console.log("Page loaded");
        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });
        var canvas = document.getElementById(dataprops.htmlId);
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log("Page rendered");
        });
      });
    },
    function (reason) {
      console.error(reason);
    }
  );
  return canvaselement;
};
