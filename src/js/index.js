import React from "react";
//import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";

export const consoleLog = (isallowlogs, str) => {
  if (isallowlogs) {
    console.log(str);
  }
};

export const showError = (props) => {
  let htmlArray = document.getElementsByClassName("org-datainput");
  let htmlErrorArray = document.getElementsByClassName("org-datainputerror");
  for (let i = 0; i < htmlErrorArray.length; i++) {
    htmlErrorArray[i].style.display = "none";
  }
  for (let i = 0; i < htmlArray.length; i++) {
    for (let j = 0; j < props.length; j++) {
      console.log(htmlArray[i]);
      console.log(props);
      // console.log(props[htmlArray[i]);
      if (props && props[j].name === htmlArray[i].dataset.name) {
        let error =
          "<div style='color:red;' class='org-datainputerror'>" +
          props[j].message +
          "</div>";
        htmlArray[i].insertAdjacentHTML("afterend", error);
      }
    }
  }
};

export const sortArray = (items, orderby, typeofsortby) => {
  // sort by value
  if (typeofsortby === "integer") {
    return items.sort(function (a, b) {
      return a[orderby] - b[orderby];
    });
  }

  // sort by name
  if (typeofsortby === "string") {
    return items.sort(function (a, b) {
      var nameA = a[orderby].toUpperCase(); // ignore upper and lowercase
      var nameB = b[orderby].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
};
export function GetAlphabetPanel(params) {
  let alphabethtml = [];

  let letterOnclick = (e) => {
    params.aplhabetOnClickjs(e.target.innerHTML);
  };

  alphabethtml.push(
    <div>
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        A
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        B
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        C
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        D
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        E
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        F
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        G
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        H
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        I
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        J
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        K
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        L
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        M
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        N
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        O
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        P
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        Q
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        R
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        S
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        T
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        U
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        V
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        W
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        X
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        Y
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        Z
      </span>
      &nbsp;|&nbsp;
      <span
        style={{ padding: "2px" }}
        className="org-cursor"
        onClick={letterOnclick}
      >
        All
      </span>
    </div>
  );
  return alphabethtml;
}

export const fieldTypeHtmltoDBmapping = (props) => {
  let { fieldType, inputOrOutput } = props;
  console.log(fieldType);
  console.log(inputOrOutput);
  let output = "";
  if (fieldType === "text") {
    if (inputOrOutput === "input") {
      output = "inputtext";
    } else {
      output = "outputtext";
    }
  }
  if (fieldType === "button") {
    if (inputOrOutput === "input") {
      output = "button";
    } else {
      output = "button";
    }
  }
  if (fieldType === "buttonpanel") {
    if (inputOrOutput === "input") {
      output = "buttonpanel";
    } else {
      output = "buttonpanel";
    }
  }
  if (fieldType === "email") {
    if (inputOrOutput === "input") {
      output = "inputemail";
    } else {
      output = "outputtext";
    }
  }
  if (fieldType === "number") {
    if (inputOrOutput === "input") {
      output = "inputnumber";
    } else {
      output = "outputtext";
    }
  }
  if (fieldType === "select") {
    if (inputOrOutput === "input") {
      output = "inputselect";
    } else {
      output = "outputtext";
    }
  }

  if (fieldType === "image") {
    if (inputOrOutput === "input") {
      output = "inputimage";
    } else {
      output = "outputimage";
    }
  }

  return output;
};

export const dataReplaceHandler = async (props) => {
  let {
    clickprops,
    compprops,
    localdata,
    recorddata,
    datareplaceparams,
    //    defaultdatafilter,
  } = props;
  console.log(props);
  if (Object.keys(datareplaceparams).length > 0) {
    for (let j in datareplaceparams) {
      let fieldvalue = datareplaceparams[j].replacetext;
      for (let k in datareplaceparams[j].replaceparams) {
        if (datareplaceparams[j].replaceparams[k].type === "localdata") {
          fieldvalue = fieldvalue.replace(
            k,
            localdata[datareplaceparams[j].replaceparams[k].name]
          );
        }
        if (datareplaceparams[j].replaceparams[k].type === "recorddata") {
          fieldvalue = fieldvalue.replace(
            k,
            recorddata[datareplaceparams[j].replaceparams[k].name]
          );
        }
        if (datareplaceparams[j].replaceparams[k].type === "compprops") {
          fieldvalue = fieldvalue.replace(
            k,
            compprops[datareplaceparams[j].replaceparams[k].name]
          );
        }
        // if (
        //   datareplaceparams[j].replaceparams[k].type === "defaultdatafilter"
        // ) {
        //   fieldvalue = fieldvalue.replace(
        //     k,
        //     defaultdatafilter[datareplaceparams[j].replaceparams[k].name]
        //   );
        // }
        if (datareplaceparams[j].replaceparams[k].type === "text") {
          fieldvalue = fieldvalue.replace(
            k,
            datareplaceparams[j].replaceparams[k].value
          );
        }
      }
      recorddata[j] = fieldvalue;
    }
  }

  return recorddata;
};

export const filterArraybyObject = (props) => {
  let { data, filter } = props;
  let filtereddata = [];
  console.log(data);
  if (filter && Object.keys(filter).length > 0) {
    for (let i = 0; i < data.length; i++) {
      let localdbdatavar = data[i];
      let isequal = true;
      for (let j in filter) {
        if (filter[j] !== localdbdatavar[j]) {
          isequal = false;
        }
        if (localdbdatavar[j] === undefined) {
          isequal = false;
        }
      }
      if (isequal === true) {
        filtereddata.push(localdbdatavar);
      }
    }
  } else {
    filtereddata = data;
  }
  console.log(filtereddata);
  return filtereddata;
};

export const serverButtonHandler = async (props) => {
  // let { clickprops, localdata, recorddata } = props;
  // console.log(clickprops);
  // let metadataParams = {
  //   objectName: "layoutactions",
  //   objectData: {},
  //   keyConditions: [
  //     {
  //       field: "orgname",
  //       value: localdata.orgname,
  //       expression: "=",
  //     },
  //     {
  //       field: "id",
  //       value: clickprops.actionid,
  //       expression: "=",
  //     },
  //   ],
  //   filterConditions: [],
  //   pageSize: "",
  //   limit: "",
  //   exclusiveStartKey: "",
  // };
  // console.log("metadataParams" + JSON.stringify(metadataParams));
  // let metadataresult = await getRecorddata(metadataParams);
  // if (metadataresult.isSuccess === "false") {
  //   alert("metadata" + metadataresult.message);
  // } else {
  //   if (metadataresult.dataprops.Items[0]) {
  //     console.log(metadataresult);
  //     let action = metadataresult.dataprops.Items[0].action;
  //     if (action.type === "redirect") {
  //       if (action.nexturl.type === "new") {
  //         let nexturl = action.nexturl;
  //         let replacetext = nexturl.replacetext;
  //         for (let replaceparamI in nexturl.replaceparams) {
  //           let replaceparam = nexturl.replaceparams[replaceparamI];
  //           if (replaceparam.type === "localdata") {
  //             replacetext = replacetext.replace(
  //               replaceparamI,
  //               localdata[replaceparam.name]
  //             );
  //           }
  //           if (replaceparam.type === "clickprops") {
  //             replacetext = replacetext.replace(
  //               replaceparamI,
  //               clickprops[replaceparam.name]
  //             );
  //           }
  //           if (replaceparam.type === "recorddata") {
  //             replacetext = replacetext.replace(
  //               replaceparamI,
  //               recorddata[replaceparam.name]
  //             );
  //           }
  //         }
  //         console.log(replacetext);
  //         window.location.assign(replacetext);
  //       }
  //       if (action.nexturl.type === "old") {
  //         window.history.back();
  //       }
  //     }
  //     if (action.type === "dataupdateandredirect") {
  //       if (action.nexturl.type === "new") {
  //         console.log(action);
  //         //dataupdate
  //         for (let objectvar in action.dataupdate) {
  //           let object = action.dataupdate[objectvar];
  //           let objectTableName = object.tablename;
  //           let objectfields = object.fields;
  //           for (let objectfield in objectfields) {
  //             let objectfieldvaluereplacetext =
  //               objectfields[objectfield].replacetext;
  //             console.log(objectfieldvaluereplacetext);
  //             for (let replaceparam in objectfields[objectfield]
  //               .replaceparams) {
  //               let replaceparamvalue =
  //                 objectfields[objectfield].replaceparams[replaceparam];
  //               console.log(replaceparamvalue);
  //               if (replaceparamvalue.type === "recorddata") {
  //                 objectfieldvaluereplacetext = objectfieldvaluereplacetext.replace(
  //                   replaceparam,
  //                   recorddata[replaceparamvalue.name]
  //                 );
  //               }
  //               if (replaceparamvalue.type === "localdata") {
  //                 objectfieldvaluereplacetext = objectfieldvaluereplacetext.replace(
  //                   replaceparam,
  //                   localdata[replaceparamvalue.name]
  //                 );
  //               }
  //               if (replaceparamvalue.type === "clickprops") {
  //                 objectfieldvaluereplacetext = objectfieldvaluereplacetext.replace(
  //                   replaceparam,
  //                   clickprops[replaceparamvalue.name]
  //                 );
  //               }
  //             }
  //             console.log(objectfieldvaluereplacetext);
  //             recorddata[objectfield] = objectfieldvaluereplacetext;
  //           }
  //           console.log(recorddata);
  //           let result = await createRecord({
  //             objectName: objectTableName,
  //             objectData: recorddata,
  //           });
  //           if (result.isSuccess === "false") {
  //             alert(result.message);
  //           } else {
  //             ////////// redirection
  //             let nexturl = action.nexturl;
  //             if (nexturl) {
  //               let replacetext = nexturl.replacetext;
  //               for (let replaceparamI in nexturl.replaceparams) {
  //                 let replaceparam = nexturl.replaceparams[replaceparamI];
  //                 if (replaceparam.type === "localdata") {
  //                   replacetext = replacetext.replace(
  //                     replaceparamI,
  //                     localdata[replaceparam.name]
  //                   );
  //                 }
  //                 if (replaceparam.type === "recorddata") {
  //                   replacetext = replacetext.replace(
  //                     replaceparamI,
  //                     recorddata[replaceparam.name]
  //                   );
  //                 }
  //                 if (replaceparam.type === "clickprops") {
  //                   replacetext = replacetext.replace(
  //                     replaceparamI,
  //                     clickprops[replaceparam.name]
  //                   );
  //                 }
  //               }
  //               console.log(replacetext);
  //               window.location.assign(replacetext);
  //             }
  //             ////////
  //           }
  //         }
  //       }
  //       if (action.nexturl.type === "old") {
  //         window.history.back();
  //       }
  //     }
  //   }
  // }
};
export const getMonthStringDisplay = (props) => {
  let { monthIndex } = props;
  let monthStringDisplay = "";
  if (monthIndex === 0) {
    monthStringDisplay = "JAN";
  }
  if (monthIndex === 1) {
    monthStringDisplay = "FEB";
  }
  if (monthIndex === 2) {
    monthStringDisplay = "MAR";
  }
  if (monthIndex === 3) {
    monthStringDisplay = "APR";
  }
  if (monthIndex === 4) {
    monthStringDisplay = "MAY";
  }
  if (monthIndex === 5) {
    monthStringDisplay = "JUN";
  }
  if (monthIndex === 6) {
    monthStringDisplay = "JUL";
  }
  if (monthIndex === 7) {
    monthStringDisplay = "AUG";
  }
  if (monthIndex === 8) {
    monthStringDisplay = "SEP";
  }
  if (monthIndex === 9) {
    monthStringDisplay = "OCT";
  }
  if (monthIndex === 10) {
    monthStringDisplay = "NOV";
  }
  if (monthIndex === 11) {
    monthStringDisplay = "DEC";
  }
  return monthStringDisplay;
};
export const getMonthDigitalDisplay = (props) => {
  let { monthIndex } = props;
  let monthDigitalDisplay = "";
  if (monthIndex < 9) {
    monthIndex = monthIndex + 1;
    monthDigitalDisplay = "0" + monthIndex;
  } else {
    monthDigitalDisplay = parseInt(monthIndex) + 1;
  }

  return monthDigitalDisplay;
};

export const getDateDigitalDisplay = (props) => {
  let { dateIndex } = props;
  let dateDigitalDisplay = "";
  if (dateIndex < 10) {
    dateDigitalDisplay = "0" + dateIndex;
  } else {
    dateDigitalDisplay = dateIndex;
  }

  return dateDigitalDisplay;
};

export const getDayStringDisplay = (props) => {
  let { dayIndex } = props;
  if (dayIndex === 0) {
    dayIndex = "SUN";
  }
  if (dayIndex === 1) {
    dayIndex = "MON";
  }
  if (dayIndex === 2) {
    dayIndex = "TUES";
  }
  if (dayIndex === 3) {
    dayIndex = "WED";
  }
  if (dayIndex === 4) {
    dayIndex = "THURS";
  }
  if (dayIndex === 5) {
    dayIndex = "FRI";
  }
  if (dayIndex === 6) {
    dayIndex = "SAT";
  }

  return dayIndex;
};

export const getUniqueArray = (props) => {
  let { dataArray, param } = props;
  let uniqueDataArray = [];
  for (let i = 0; i < dataArray.length; i++) {
    let dataArrayVar = dataArray[i];
    let isExist = false;
    for (let j = 0; j < uniqueDataArray.length; j++) {
      let uniqueDataArrayVar = uniqueDataArray[j];
      if (dataArrayVar[param] === uniqueDataArrayVar[param]) {
        isExist = true;
      }
    }
    if (isExist === false) {
      uniqueDataArray.push(dataArrayVar);
    }
  }
  return uniqueDataArray;
};
export const getLocalData = (props) => {
  console.log(props);
  let routerpropsparams = props.routerprops.match.params;
  let urlsearchparams = new URLSearchParams(props.routerprops.location.search);

  let localdata = {};
  let d = new Date();
  localdata["currenttimestring"] = d.toISOString();
  localdata["currenttimeinteger"] = d.getTime();

  localdata["orgname"] = "gouthama";
  localdata["userprofileid"] = "gouthama-admin";
  localdata["userid"] = "pradeep";
  localdata["appname"] = sessionStorage.getItem("");

  localdata["defaultorgname"] = "postpaidtutors";
  localdata["defaultadminuserid"] = "usr-admin";
  localdata["defaultuserprofileid"] = "learner";

  localdata["orgname"] = sessionStorage.getItem("orgname");
  localdata["userprofileid"] = sessionStorage.getItem("userprofileid");
  localdata["userroleid"] = sessionStorage.getItem("userroleid");
  localdata["userid"] = sessionStorage.getItem("userid");
  localdata["appname"] = sessionStorage.getItem("appname");

  // localdata["appname"] = routerpropsparams.appname
  //   ? routerpropsparams.appname.toLowerCase()
  //   : undefined;

  localdata["maintab"] = routerpropsparams.maintab
    ? routerpropsparams.maintab.toLowerCase()
    : "";

  localdata["dropdown"] = routerpropsparams.dropdown
    ? routerpropsparams.dropdown.toLowerCase()
    : "";

  localdata["rightdropdown"] = routerpropsparams.rightdropdown
    ? routerpropsparams.rightdropdown.toLowerCase()
    : "";

  localdata["urlsearchparams"] = urlsearchparams;
  let recordId = urlsearchparams.get("id");
  let viewname = urlsearchparams.get("viewname");
  let relatedviewname = urlsearchparams.get("relatedviewname");
  localdata["recordid"] = recordId ? recordId.toLowerCase() : "";
  localdata["viewname"] = viewname ? viewname.toLowerCase() : "";
  localdata["relatedviewname"] = relatedviewname
    ? relatedviewname.toLowerCase()
    : "";

  return localdata;
};

export const getDynamicCompPropsData = (props) => {
  let { compprops, localdata, recorddata } = props;
  console.log(props);
  let modifiedcompprops = {};
  for (let i in compprops) {
    if (compprops[i].type === "text") {
      modifiedcompprops[i] = compprops[i].value;
    }
    if (compprops[i].type === "object") {
      let objParams = compprops[i].value;
      let modifiedobjParams = {};
      console.log(objParams);
      for (let j in objParams) {
        if (objParams[j].type === "text") {
          modifiedobjParams[j] = objParams[j].value;
        }
        if (objParams[j].type === "localdata") {
          modifiedobjParams[j] = localdata[objParams[j].name];
        }

        if (objParams[j].type === "recorddata") {
          modifiedobjParams[j] = recorddata[objParams[j].name];
        }
        // if (objParams[j].type === "compprops") {
        //   modifiedobjParams[j] = compprops[j];
        // }
      }
      modifiedcompprops[i] = modifiedobjParams;
    }
    if (compprops[i].type === "localdata") {
      modifiedcompprops[i] = localdata[compprops[i].name];
    }
    if (compprops[i].type === "recorddata") {
      console.log(recorddata);
      modifiedcompprops[i] = recorddata[compprops[i].name];
    }
    // if (compprops[i].type === "compprops") {
    //   modifiedcompprops[i] = compprops[i];
    // }
    console.log(modifiedcompprops);
    console.log(i);
    console.log(compprops[i]);
  }
  return modifiedcompprops;
};

// export function GetCreateEditRecordPagelayout(params) {
//   console.log(params);
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center"
//       }}
//     >
//       <div
//         className="mediumfont greybg"
//         style={{
//           textAlign: "left",
//           width: "80%",
//           padding: "5px 0px"
//         }}
//       >
//         Basic Information
//       </div>
//       <div className="smallfont" style={{ textAlign: "left", width: "80%" }}>
//         Name
//       </div>
//       <input
//         className="largeinput"
//         style={{ width: "80%", marginBottom: "8px" }}
//       />
//       <div className="smallfont" style={{ textAlign: "left", width: "80%" }}>
//         API
//       </div>
//       <input
//         className="largeinput"
//         style={{ width: "80%", marginBottom: "8px" }}
//       />
//     </div>
//   );
// }

// export function SortArrayObjectbyField(params) {
//   let dataObjectjsarray = [];
//   for (let key in params.dataObjectjs) {
//     dataObjectjsarray.push(params.dataObjectjs[key].fields);
//   }
//   function compare(a, b) {
//     // Use toUpperCase() to ignore character casing
//     let afieldvalue = a[params.fieldname];
//     let bfieldvalue = b[params.fieldname];
//     let comparison = 0;
//     if (afieldvalue === null || afieldvalue === undefined) {
//       comparison = -1;
//     } else if (bfieldvalue === null || bfieldvalue === undefined) {
//       comparison = 1;
//     } else {
//       const valueA = afieldvalue.toUpperCase();
//       const valueB = bfieldvalue.toUpperCase();

//       if (valueA > valueB) {
//         comparison = 1;
//       } else if (valueA < valueB) {
//         comparison = -1;
//       }
//     }
//     return comparison;
//   }

//   dataObjectjsarray.sort(compare);

//   let dataObjectjssorted = {};
//   for (let key in dataObjectjsarray) {
//     let fieldsjs = {};
//     fieldsjs.fields = dataObjectjsarray[key];
//     dataObjectjssorted[dataObjectjsarray[key].Name] = fieldsjs;
//   }
//   return dataObjectjssorted;
// }
// export function GetTablefromObjects(params) {}
// export function GetFirstkeyfromObject(params) {
//   let dataarray = [];
//   for (let key in params.dataObjectjs) {
//     dataarray.push(params.dataObjectjs[key]);
//   }
//   dataarray.sort(function(a, b) {
//     return a.order - b.order;
//   });
//   let firstkey = "";
//   if (dataarray.length > 0) {
//     firstkey = dataarray[0].label;
//   }
//   return firstkey;
// }
// export function GetHtmlArrayfromObject(params) {
//   // get repeatedhtml from objectarray based on label, name field value like <div>test1</div><div>test2</div> from {{name:"test1",label:"test1"},{name:"test2",label:"test2"}}
//   let htmlarray = [];
//   let propvalues = {};
//   let dataarray = [];

//   for (let key in params.dataObjectjs) {
//     dataarray.push(params.dataObjectjs[key]);
//   }
//   dataarray.sort(function(a, b) {
//     return a.order - b.order;
//   });

//   if (params.classNamejs) {
//     propvalues["className"] = params.classNamejs;
//   }

//   if (params.stylejs) {
//     propvalues["style"] = params.stylejs;
//   }

//   for (let key in dataarray) {
//     let dataarrayvar = dataarray[key];

//     if (params.idjs) {
//       propvalues["id"] = params.idjs + dataarrayvar.name;
//       propvalues["data-name"] = dataarrayvar.name;
//     }

//     if (params.onClickjs) {
//       let onclickfunction = e => {
//         params.onClickjs(e.target.id);
//       };
//       propvalues["onClick"] = onclickfunction;
//     }

//     let newelement = React.createElement(
//       params.tagnamejs,
//       propvalues,
//       dataarrayvar.label
//     );
//     if (params.parenttagnamejs) {
//       let parentpropvalues = {};
//       if (params.parentclassNamejs) {
//         parentpropvalues.className = params.parentclassNamejs;
//       }
//       if (params.parentstylejs) {
//         parentpropvalues.style = params.parentstylejs;
//       }

//       let siblingsparentpropvalues = {};
//       if (params.siblingsparentclassNamejs) {
//         siblingsparentpropvalues.className = params.siblingsparentclassNamejs;
//       }

//       if (params.siblingsparentidjs) {
//         siblingsparentpropvalues.id =
//           params.siblingsparentidjs + dataarrayvar.name;
//         siblingsparentpropvalues["data-name"] = dataarrayvar.name;
//       }

//       if (params.siblingsparentonClickjs) {
//         let onclickfunction = e => {
//           params.siblingsparentonClickjs(e.target.id);
//         };
//         siblingsparentpropvalues["onClick"] = onclickfunction;
//       }

//       let childhtml = [];
//       childhtml.push(dataarrayvar.label);

//       if (params.statichtmlsibiling) {
//         childhtml.push(params.statichtmlsibiling);
//       }
//       let siblingsparentelement = React.createElement(
//         params.siblingsparenttagnamejs,
//         siblingsparentpropvalues,
//         childhtml
//       );
//       newelement = React.createElement(
//         params.parenttagnamejs,
//         parentpropvalues,
//         siblingsparentelement
//       );
//     }
//     htmlarray.push(newelement);
//   }

//   return htmlarray;
// }
// export function gethtmlbasedonotherobject(params) {
//   // get repeatedhtml from objectarray based on other object label, name field value like <div>test1</div><div>test2</div> from {{name:"test1",label:"test1"},{name:"test2",label:"test2"}}

//   // params.dataObjectjs
//   // params.datalabelObjectjs
//   // params.datacolumnObjectjs
//   // params.datarowObjectjs

//   let dataobjectarrayhtml = [];
//   let labelarrayhtml = [];
//   let columnarrayhtml = [];
//   let rowarrayhtml = [];
//   let tablearrayhtml = [];

//   let dataobjectpropvalues = {};
//   let labelpropvalues = {};
//   let columnpropvalues = {};
//   let rowpropvalues = {};
//   let tablepropvalues = {};
//   let dataarray = [];

//   for (let key in params.dataObjectjs) {
//     dataarray.push(params.dataObjectjs[key]);
//   }

//   dataarray.sort(function(a, b) {
//     return a.order - b.order;
//   });

//   let labelarray = [];
//   for (let key in params.labeldataObjectjs) {
//     labelarray.push(params.labeldataObjectjs[key]);
//   }
//   labelarray.sort(function(a, b) {
//     return a.order - b.order;
//   });

//   if (params.classNamejs) {
//     dataobjectpropvalues["className"] = params.classNamejs;
//   }

//   if (params.stylejs) {
//     dataobjectpropvalues["style"] = params.stylejs;
//   }

//   if (params.labelclassNamejs) {
//     labelpropvalues["className"] = params.labelclassNamejs;
//   }

//   if (params.labelstylejs) {
//     labelpropvalues["style"] = params.labelstylejs;
//   }

//   if (params.columnclassNamejs) {
//     columnpropvalues["className"] = params.columnclassNamejs;
//   }

//   if (params.columnstylejs) {
//     columnpropvalues["style"] = params.columnstylejs;
//   }

//   if (params.rowclassNamejs) {
//     rowpropvalues["className"] = params.rowclassNamejs;
//   }

//   if (params.rowstylejs) {
//     rowpropvalues["style"] = params.rowstylejs;
//   }

//   if (params.tableclassNamejs) {
//     tablepropvalues["className"] = params.tableclassNamejs;
//   }

//   if (params.tablestylejs) {
//     tablepropvalues["style"] = params.tablestylejs;
//   }

//   if (params.tableidjs) {
//     tablepropvalues["id"] = params.tableidjs;
//     tablepropvalues["data-name"] = params.tableidjs;
//   }
//   if (params.tableonClickjs) {
//     let onclickfunction = e => {
//       params.tableonClickjs(e.target.id);
//     };
//     tablepropvalues["onClick"] = onclickfunction;
//   }
//   rowarrayhtml = [];
//   for (let key in dataarray) {
//     let dataarrayvar = dataarray[key].fields;

//     columnarrayhtml = [];

//     if (params.rowidjs) {
//       rowpropvalues["id"] = params.rowidjs + dataarrayvar.Name;

//       rowpropvalues["data-name"] = dataarrayvar.Name;
//     }
//     if (params.rowonClickjs) {
//       let onclickfunction = e => {
//         params.rowonClickjs(e.target.id);
//       };
//       rowpropvalues["onClick"] = onclickfunction;
//     }

//     if (params.columnidjs) {
//       columnpropvalues["id"] = params.columnidjs + dataarrayvar.Name;
//       columnpropvalues["data-name"] = dataarrayvar.Name;
//     }
//     if (params.columnonClickjs) {
//       let onclickfunction = e => {
//         params.columnonClickjs(e.target.id);
//       };
//       columnpropvalues["onClick"] = onclickfunction;
//     }

//     let mainobjectfieldhtml = [];
//     if (labelarray) {
//       for (let labelkey in labelarray) {
//         let labelarrayvar = labelarray[labelkey];

//         if (params.idjs) {
//           dataobjectpropvalues["id"] = params.idjs + dataarrayvar.Name;
//           dataobjectpropvalues["data-name"] = dataarrayvar.Name;
//         }
//         if (params.onClickjs) {
//           let onclickfunction = e => {
//             params.onClickjs(e.target.id);
//           };
//           dataobjectpropvalues["onClick"] = onclickfunction;
//         }

//         if (params.labelidjs) {
//           labelpropvalues["id"] = params.labelidjs + labelarrayvar.name;
//           labelpropvalues["data-name"] = labelarrayvar.name;
//         }
//         if (params.labelonClickjs) {
//           let onclickfunction = e => {
//             params.labelonClickjs(e.target.id);
//           };
//           labelpropvalues["onClick"] = onclickfunction;
//         }

//         let labelelement = React.createElement(
//           params.labeltagnamejs,
//           labelpropvalues,
//           labelarrayvar.label
//         );

//         let fieldelement = React.createElement(
//           params.tagnamejs,
//           dataobjectpropvalues,
//           dataarrayvar[labelarrayvar.name]
//         );
//         let columnelement = [];
//         if (params.isshowlabel) {
//           columnelement.push(labelelement);
//         }

//         columnelement.push(fieldelement);

//         columnarrayhtml.push(
//           React.createElement(
//             params.columntagnamejs,
//             columnpropvalues,
//             columnelement
//           )
//         );
//       }
//     }
//     rowarrayhtml.push(
//       React.createElement(params.rowtagnamejs, rowpropvalues, columnarrayhtml)
//     );
//   }
//   if (params.tabletagnamejs) {
//     tablearrayhtml.push(
//       React.createElement(params.tabletagnamejs, tablepropvalues, rowarrayhtml)
//     );
//     return tablearrayhtml;
//   }
//   return rowarrayhtml;
// }
// export function GettableHtmlfromObject(params) {
//   let thobject = params.thobjectjs;
//   let tdobject = params.tdobjectjs;
//   let orderby = "name";

//   let thparams = {};

//   thparams.tagnamejs = "th";
//   let thonclick = () => {
//     alert();
//   };
//   thparams.onClickjs = thonclick;
//   thparams.dataObjectjs = thobject;
//   thparams.stylejs = { fontSize: "40px" };
//   thparams.idjs = "listpage-objectsetupicon-";
//   thparams.classNamejs = "bluefont  ";

//   thparams.statichtmlsibiling = [];
//   thparams.statichtmlsibiling.push(
//     <i class="material-icons smallleftpadding org-cursor">
//       keyboard_arrow_down
//     </i>
//   );
//   thparams.siblingsparentclassNamejs = "spacebetween";
//   thparams.siblingsparenttagnamejs = "span";

//   //thparams.parentclassNamejs = "spacebetween";
//   thparams.parenttagnamejs = "th";
//   thparams.parentstylejs = {
//     width: "50%"
//   };

//   let thhtml = GetHtmlArrayfromObject(thparams);

//   let throwhtml = React.createElement("tr", {}, thhtml);
//   //return thhtml;

//   let tdparams = {};

//   tdparams.dataObjectjs = tdobject;
//   tdparams.tagnamejs = "span";
//   let onclickfunction = () => {
//     alert();
//   };
//   tdparams.onClickjs = onclickfunction;
//   tdparams.stylejs = { fontSize: "30px" };
//   tdparams.idjs = "listpage-objectsetupicon-";
//   tdparams.classNamejs = " bluefont  ";

//   tdparams.labeldataObjectjs = thobject;
//   tdparams.labeltagnamejs = "th";
//   let labelonclickfunction = () => {
//     alert();
//   };
//   tdparams.labelonClickjs = labelonclickfunction;
//   tdparams.labelstylejs = { fontSize: "30px" };
//   tdparams.labelidjs = "listpage-objectsetupicon-";
//   tdparams.labelclassNamejs = " bluefont  ";

//   tdparams.columntagnamejs = "td";
//   let columnonclickfunction = () => {
//     alert();
//   };
//   tdparams.columnonClickjs = columnonclickfunction;
//   tdparams.columnstylejs = { fontSize: "30px" };
//   tdparams.columnidjs = "listpage-objectsetupicon-";
//   tdparams.columnclassNamejs = " bluefont   ";

//   tdparams.rowtagnamejs = "tr";
//   let rowonclickfunction = () => {
//     alert();
//   };
//   tdparams.rowonClickjs = rowonclickfunction;
//   tdparams.rowstylejs = { fontSize: "30px" };
//   tdparams.rowidjs = "listpage-objectsetupicon-";
//   tdparams.rowclassNamejs = " bluefont   ";

//   tdparams.isshowlabel = false;

//   let tdhtml = gethtmlbasedonotherobject(tdparams);

//   //return tdhtml;
//   let tableelement = [];
//   tableelement.push(throwhtml);
//   tableelement.push(tdhtml);
//   let tablehtml = React.createElement(
//     "table",
//     { border: "1px", className: "col-12 table tableclass" },
//     tableelement
//   );
//   return tablehtml;
// }
