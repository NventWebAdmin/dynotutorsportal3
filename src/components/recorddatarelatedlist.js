import React, { Component } from "react";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";
import {
  sortArray,
  fieldTypeHtmltoDBmapping,
  getLocalData,
  serverButtonHandler,
} from "../js/index";

import Htmlform from "./htmlformnew";
import Tabpanel from "./tabpanel";
import Tablecomp from "./tablecomp";
import { GetLocalIcon, GetGoogleIcon } from "./icons";

/*
  <Recorddata
                    {...this.props}
                    compprops={{
                      orgname: "gouthama",
                      userProfileId: "gouthama-admin",
                      userId: "",
                      parenttableName: "class",
                      tableName: "student",
                      parentRecId: "PREK",
                    }}
                    styleprops={{
                      width: "100%",
                      height: "30vh",
                      backgroundColor: "",
                      overflow: "auto",
                    }}
                  />



  ////datasyncevents
    update table records
    this.setState({
      datasyncEventprops: {
        name: "updaterecorddata",
        data: [
          { id: "CS-First", teacher: "tes" },
          { id: "CS-PREK", teacher: "tes" },
        ],
        componenthtmlid: "all",
      },
    });                
*/

class F extends Component {
  constructor(props) {
    super(props);
    this.state = { mainPanelHtml: [], recorddata: {} };
  }

  async componentDidMount() {
    console.log(this.props);
    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      defaulttablename,
      parenttablename,
      parentrecid,
      recordid,
      datadisplaytype,
    } = this.props.compprops;
    console.log(this.props);
    if (tablename == "" || tablename == undefined) {
      tablename = defaulttablename;
    }

    this.getRecordListMetadataAndDatafromServer({
      orgname: orgname,
      userProfileId: userprofileid,
      userId: userid,
      tableName: tablename,
      parenttableName: parenttablename,
      datasortparambeginswith: "",
      datasortparamequalsto: "",
      filterfieldvalue: parentrecid,
      action: "",
      viewName: "all",
      datadisplaytype: datadisplaytype,
    });
  }

  tabclkHanlder = (props) => {
    let { tabLabel, tabName, tabType } = props;
    console.log(props);
    let inputrecorddatatabcontentArray = document.getElementsByClassName(
      "inputrecorddatatabcontent"
    );

    for (let i = 0; i < inputrecorddatatabcontentArray.length; i++) {
      console.log(inputrecorddatatabcontentArray[i]);
      if (tabName == inputrecorddatatabcontentArray[i].dataset.tabname) {
        inputrecorddatatabcontentArray[i].style.display = "flex";
      } else {
        inputrecorddatatabcontentArray[i].style.display = "none";
      }
    }
  };
  subsectionclkHanlder = (tabName, sectionName, subsectionName) => {
    let isValid = true;

    let htmlformsubsectioncontentArray = document.getElementsByClassName(
      "htmlformsubsectioncontent"
    );

    for (let i = 0; i < htmlformsubsectioncontentArray.length; i++) {
      console.log(htmlformsubsectioncontentArray[i]);
      if (
        tabName == htmlformsubsectioncontentArray[i].dataset.tabname &&
        sectionName == htmlformsubsectioncontentArray[i].dataset.sectionname
      ) {
        if (htmlformsubsectioncontentArray[i].style.display == "flex") {
          //reset subsection errors
          let errorelements = htmlformsubsectioncontentArray[
            i
          ].getElementsByClassName("htmlforminputitemerror");
          for (let j = 0; j < errorelements.length; j++) {
            errorelements[j].style.display = "none";
          }

          //validate childs
          for (let childrenI in htmlformsubsectioncontentArray[
            i
          ].getElementsByTagName("*")) {
            let children = htmlformsubsectioncontentArray[
              i
            ].getElementsByTagName("*")[childrenI];
            console.log(children);
            if (this.inputElementValidate(children) == false) {
              isValid = false;
            }
          }
        }
      }
    }

    if (isValid == true) {
      for (let i = 0; i < htmlformsubsectioncontentArray.length; i++) {
        console.log(htmlformsubsectioncontentArray[i]);
        if (
          tabName == htmlformsubsectioncontentArray[i].dataset.tabname &&
          sectionName == htmlformsubsectioncontentArray[i].dataset.sectionname
        ) {
          if (
            subsectionName ==
            htmlformsubsectioncontentArray[i].dataset.subsectionname
          ) {
            htmlformsubsectioncontentArray[i].style.display = "flex";
          } else {
            htmlformsubsectioncontentArray[i].style.display = "none";
          }
        }
      }
    }
  };

  inputElementValidate = (htmllement) => {
    let isValid = true;
    if (htmllement && htmllement.required) {
      if (htmllement.value.trim() == "" || htmllement.value == undefined) {
        htmllement.style.borderBottomColor = "red";
        htmllement.style.borderBottomWidth = "2px";
        var newDiv = document.createElement("div");
        var newContent = document.createTextNode("This is required");
        newDiv.setAttribute("class", "htmlforminputitemerror");
        newDiv.appendChild(newContent);

        htmllement.insertAdjacentElement("afterend", newDiv);
        isValid = false;
      } else {
        htmllement.style.borderBottomColor = htmllement.style.borderRightColor;
        htmllement.style.borderBottomWidth = htmllement.style.borderRightWidth;
      }
    }
    return isValid;
  };

  inputChangeHandler = () => {};

  clickHandler = async (props) => {
    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      recordnamelinkactionid,
      recordnewbuttonactionid,
    } = this.props.compprops;
    let { itemType, itemId, itemName, actionid } = props;
    let localdata = getLocalData(this.props);
    console.log(props);
    if (itemType == "tabletdnamelink") {
      serverButtonHandler({
        localdata: localdata,
        clickprops: {
          actionid: actionid,
          recordid: itemName,
        },
      });
    }
    if (itemType == "layoutbutton") {
      serverButtonHandler({
        localdata: localdata,
        clickprops: {
          actionid: actionid,
          recordid: "",
        },
      });
    }
    if (itemType == "tabledropdown") {
    }

    //   serverButtonHandler({ localdata: localdata, clickprops: props });
  };

  inputKeyupHandler = () => {};

  async getRecordListMetadataAndDatafromServer(props) {
    let {
      orgname,
      userProfileId,
      userId,
      tableName,
      parenttableName,
      datasortparambeginswith,
      datasortparamequalsto,
      filterfieldvalue,
      action,
      viewName,
      datadisplaytype,
    } = props;

    let metadataParams = {};
    let dataParams = {};
    let dataprops = [];
    let mainPanelHtml = [];

    // tableview metadata
    metadataParams = {
      objectName: "tableview",
      objectData: {},
      keyConditions: [
        {
          field: "orgname",
          value: orgname,
          expression: "=",
        },
        {
          field: "tableviewid",
          value:
            userProfileId +
            "-" +
            parenttableName +
            "-" +
            tableName +
            "-" +
            datadisplaytype,
          expression: "=",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };
    console.log(metadataParams);
    let metadataresult = await getRecorddata(metadataParams);
    if (metadataresult.isSuccess === "false") {
      alert("metadata" + metadataresult.message);
    } else {
      if (metadataresult.dataprops.Items[0]) {
        // column data for table
        let columnMetadata = metadataresult.dataprops.Items[0].data;
        let viewnamedropdownchangeaction =
          metadataresult.dataprops.Items[0].viewnamedropdownchangeaction;
        console.log(columnMetadata);
        // tableview defult sortparam  get all data if no tableview name given
        let defaultIdsortparam =
          metadataresult.dataprops.Items[0].defaultidsortparam;
        let defaultfilterfieldname =
          metadataresult.dataprops.Items[0].defaultfilterfieldname;
        if (
          viewName != "" &&
          datasortparambeginswith == "" &&
          datasortparamequalsto == ""
        ) {
          if (viewName != "recentlyviewed") {
            // table view not recentlyviewed
            for (let i in columnMetadata) {
              if (columnMetadata[i].name == viewName) {
                datasortparambeginswith = columnMetadata[i].idsortparam;
                defaultfilterfieldname = columnMetadata[i].filterfieldname;
                console.log(columnMetadata[i]);
              }
            }
          } else {
            // tableview recentlyviewd
            datasortparambeginswith = defaultIdsortparam;
          }
          dataParams = {
            objectName: tableName,
            objectData: {},
            keyConditions: [
              {
                field: "orgname",
                value: orgname,
                expression: "=",
              },
              {
                field: "id",
                value: datasortparambeginswith,
                expression: "beginswith",
              },
            ],
            filterConditions: [
              {
                field: defaultfilterfieldname,
                value: filterfieldvalue,
                expression: "=",
              },
            ],
          };
          console.log(dataParams);
        } else {
          // // no tableview name given get data based on equalsto or begin with
          // if (datasortparamequalsto != "") {
          //   dataParams = {
          //     objectName: tableName,
          //     objectData: {},
          //     keyConditions: [
          //       {
          //         field: "orgname",
          //         value: orgname,
          //         expression: "=",
          //       },
          //       {
          //         field: "id",
          //         value: datasortparamequalsto,
          //         expression: "=",
          //       },
          //     ],
          //     filterConditions: [
          //       {
          //         field: defaultfilterfieldname,
          //         value: filterfieldvalue,
          //         expression: "=",
          //       },
          //     ],
          //   };
          // }
          // // get records begin with data
          // if (datasortparambeginswith != "") {
          //   dataParams = {
          //     objectName: tableName,
          //     objectData: {},
          //     keyConditions: [
          //       {
          //         field: "orgname",
          //         value: orgname,
          //         expression: "=",
          //       },
          //       {
          //         field: "id",
          //         value: datasortparambeginswith,
          //         expression: "beginswith",
          //       },
          //     ],
          //     filterConditions: [
          //       {
          //         field: defaultfilterfieldname,
          //         value: filterfieldvalue,
          //         expression: "=",
          //       },
          //     ],
          //   };
          // }
        }
        console.log(dataParams);
        let dataresult = await getRecorddata(dataParams);
        if (dataresult.isSuccess === "false") {
          alert("data" + dataresult.message);
          console.log(dataParams);
        } else {
          let recordDataList = dataresult.dataprops.Items;
          console.log(recordDataList);
          mainPanelHtml.push(
            <Tablecomp
              dataProps={{
                name: "meganavpanel-list-content-recordname",
                type: "meganavpanel-list-content-recordname",
              }}
              columnMetadata={columnMetadata}
              tableOnclick={this.clickHandler}
              tableOnChange={this.inputChangeHandler}
              recordData={recordDataList}
              activeTableviewName={viewName}
              tableName={tableName}
              tablehtmlid={tableName + "view"}
              rowhtmlid1="id"
              rowhtmlid2="id"
              clientstatename={tableName}
              clientstatetype="recordlistdata"
              viewnamedropdownchangeaction={viewnamedropdownchangeaction}
            />
          );
          this.setState({ mainPanelHtml: mainPanelHtml });
          console.log(dataParams);
        }
      } else {
        alert("please enter validatee url");
      }
    }
    ///////////////////////////
  }

  render() {
    return (
      <div id={this.props.htmlid} style={this.props.styleprops}>
        {this.state.mainPanelHtml}
      </div>
    );
  }
}

export default F;
