import React, { Component } from "react";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";
//import { sortArray, fieldTypeHtmltoDBmapping } from "../../js/index";
//import Htmlform from "./htmlformnew";
//import Tabpanel from "./tabpanel";
import Listtable from "./listtable";
import Tablecomp from "./tablecomp";
//import { GetLocalIcon, GetGoogleIcon } from "./icons";
import { getLocalData, serverButtonHandler } from "../js/index";

/*
  <Recorddata
                    {...this.props}
                    compprops={{
                      orgname: "gouthama",
                      userProfileId: "gouthama-admin",
                      userId: "",
                      parenttableName: "",
                      tableName: "student",
                      parentRecId: "",
                    }}
                    styleprops={{
                      width: "100%",
                      height: "30vh",
                      backgroundColor: "",
                      overflow: "auto",
                    }}
                  />

*/
class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPanelHtmlObj: [],
      recorddata: {},
      dataParams: {},
      LastEvaluatedKey: "",
      // when more button is clicked
      morerecorddata: [],
      // on updaterecorddata datasync event
      updaterecorddata: [],
    };
  }

  async componentDidMount() {
    console.log(this.props);
    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      datadisplaytype,
      viewname,
    } = this.props.compprops;
    if (viewname == null) {
      viewname = "recentlyviewed";
    }
    this.getRecordListMetadataAndDatafromServer({
      orgname: orgname,
      userProfileId: userprofileid,
      userId: userid,
      tableName: tablename,
      datasortparambeginswith: "",
      datasortparamequalsto: "",
      action: "",
      viewName: viewname,
      datadisplaytype: datadisplaytype,
    });
    alert(userprofileid);
    alert(tablename);
    alert(datadisplaytype);
  }

  clickHandler = async (props) => {
    console.log(props);
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
    if (itemType == "tabletdnamelink") {
      this.props.serverButtonHandler({
        localdata: localdata,
        clickprops: {
          actionid: actionid,
          recordid: itemName,
        },
      });
    }
    if (itemType == "layoutbutton") {
      this.props.serverButtonHandler({
        localdata: localdata,
        clickprops: {
          actionid: actionid,
          recordid: "",
        },
      });
    }
    if (itemType == "layoutaction") {
      this.props.serverButtonHandler({
        localdata: localdata,
        clickprops: {
          actionid: actionid,
          recordid: "",
        },
      });
    }
    if (itemType == "tabledropdown") {
      this.props.serverButtonHandler({
        localdata: localdata,
        clickprops: {
          actionid: actionid,
          viewname: itemName,
        },
      });
    }
    if (itemType == "morerecordsbutton") {
      this.morerecordsOnclick();
    }
  };

  inputKeyupHandler = () => {};

  async getRecordListMetadataAndDatafromServer(props) {
    let {
      orgname,
      userProfileId,
      userId,
      tableName,
      datasortparambeginswith,
      datasortparamequalsto,
      action,
      viewName,
      datadisplaytype,
    } = props;
    let { mainPanelHtmlObj } = this.state;
    alert(viewName);
    let metadataParams = {};
    let dataParams = {};

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
          value: userProfileId + "-" + tableName + "-" + datadisplaytype,
          expression: "=",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };
    console.log("metadataParams" + JSON.stringify(metadataParams));
    let metadataresult = await getRecorddata(metadataParams);
    if (metadataresult.isSuccess === "false") {
      alert("metadata" + metadataresult.message);
    } else {
      if (metadataresult.dataprops.Items[0]) {
        console.log(metadataresult.dataprops.Items[0]);

        // column data for table
        let columnMetadata = metadataresult.dataprops.Items[0].data;

        let viewnamedropdownchangeaction =
          metadataresult.dataprops.Items[0].viewnamedropdownchangeaction;
        let serverretriverowslimit =
          metadataresult.dataprops.Items[0].serverretriverowslimit;
        console.log(viewnamedropdownchangeaction);
        let listrecordcompsperrow =
          metadataresult.dataprops.Items[0].listrecordcompsperrow;
        console.log(columnMetadata);
        console.log(viewName);
        console.log(datasortparambeginswith);
        console.log(datasortparamequalsto);

        // tableview defult sortparam  get all data if no tableview name given
        let defaultIdsortparam =
          metadataresult.dataprops.Items[0].defaultidsortparam;
        if (
          viewName != ""
          //&&
          //     datasortparambeginswith == "" &&
          //    datasortparamequalsto == ""
        ) {
          if (viewName != "recentlyviewed") {
            // table view not recentlyviewed
            for (let i in columnMetadata) {
              if (columnMetadata[i].name == viewName) {
                datasortparambeginswith = columnMetadata[i].idsortparam;
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
            filterConditions: [],
            pageSize: 1,
            limit: serverretriverowslimit,
            exclusiveStartKey: "",
          };
        } else {
          // no tableview name given get data based on equalsto or begin with
          if (datasortparamequalsto != "") {
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
                  value: datasortparamequalsto,
                  expression: "=",
                },
              ],
              filterConditions: [],
              pageSize: "",
              limit: "",
              exclusiveStartKey: "",
            };
          }

          // get records begin with data
          if (datasortparambeginswith != "") {
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
              filterConditions: [],
              pageSize: "",
              limit: "",
              exclusiveStartKey: "",
            };
          }
        }
        console.log("dataParams" + JSON.stringify(dataParams));
        let dataresult = await getRecorddata(dataParams);
        if (dataresult.isSuccess === "false") {
          alert("data" + dataresult.message);
        } else {
          let recordDataList = dataresult.dataprops.Items;
          let LastEvaluatedKey = dataresult.dataprops.LastEvaluatedKey;
          console.log(dataParams);
          console.log("========");
          console.log(dataresult);
          console.log(datadisplaytype);
          if (datadisplaytype == "list") {
            let tablehtmlid = tableName + "view";
            mainPanelHtmlObj[tablehtmlid] = React.createElement(
              Listtable,
              {
                componentname: "Listtable",
                dataProps: {
                  name: "meganavpanel-list-content-recordname",
                  type: "meganavpanel-list-content-recordname",
                },
                columnMetadata: columnMetadata,
                tableOnclick: this.clickHandler,
                tableOnChange: this.inputChangeHandler,
                recordData: recordDataList,
                activeTableviewName: viewName,
                tableName: tableName,
                tablehtmlid: tablehtmlid,
                rowhtmlid1: "id",
                rowhtmlid2: "id",
                clientstatename: tableName,
                clientstatetype: "recordlistdata",
                listrecordcompsperrow: listrecordcompsperrow,
                viewnamedropdownchangeaction: viewnamedropdownchangeaction,
              },
              ""
            );
          } else {
            let tablehtmlid = tableName + "view";
            mainPanelHtmlObj[tablehtmlid] = React.createElement(
              Tablecomp,
              {
                componentname: "Tablecomp",
                dataProps: {
                  name: "meganavpanel-list-content-recordname",
                  type: "meganavpanel-list-content-recordname",
                },
                columnMetadata: columnMetadata,
                tableOnclick: this.clickHandler,
                tableOnChange: this.inputChangeHandler,
                recordData: recordDataList,
                activeTableviewName: viewName,
                tableName: tableName,
                tablehtmlid: tableName + "view",
                rowhtmlid1: "id",
                rowhtmlid2: "id",
                clientstatename: tableName,
                clientstatetype: "recordlistdata",
                morerecordData: [],
                viewnamedropdownchangeaction: viewnamedropdownchangeaction,
              },
              ""
            );
          }
          this.setState({
            mainPanelHtmlObj: mainPanelHtmlObj,
            LastEvaluatedKey: LastEvaluatedKey,
            dataParams: dataParams,
          });
        }
      } else {
        alert("please enter validate url");
      }
    }
  }

  // get static component
  getStaticReactcompfromDynamic(comp, propsfromlocalparent) {
    console.log(comp);
    let componentname = comp.props.componentname;
    let componentprops = comp.props;
    console.log(comp.props);
    let componenthtml = [];
    if (componentname == "Tablecomp") {
      componenthtml.push(
        <Tablecomp {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }
    if (componentname == "Listtable") {
      componenthtml.push(
        <Listtable {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }
  }

  // when more button on table or list comp is clicked
  morerecordsOnclick = async () => {
    let dataParams = this.state.dataParams;
    let LastEvaluatedKey = this.state.LastEvaluatedKey;
    if (LastEvaluatedKey != "" && LastEvaluatedKey != undefined) {
      dataParams.exclusiveStartKey = LastEvaluatedKey;

      let dataresult = await getRecorddata(dataParams);
      if (dataresult.isSuccess === "false") {
        alert("data" + dataresult.message);
      } else {
        let recordDataList = dataresult.dataprops.Items;
        LastEvaluatedKey = dataresult.dataprops.LastEvaluatedKey;
        console.log(LastEvaluatedKey);
        console.log(recordDataList);
        this.setState({
          LastEvaluatedKey: LastEvaluatedKey,
          morerecorddata: recordDataList,
        });
      }
    }
  };

  // when datasyncevent is came from parent comps
  componentDidUpdate = async (prevProps) => {
    let { componenthtmlid } = this.props;
    console.log(this.props);
    let datasyncEventprops = this.props.datasyncEventprops;

    if (
      prevProps &&
      JSON.stringify(this.props.datasyncEventprops) !=
        JSON.stringify(prevProps.datasyncEventprops)
    ) {
      if (
        datasyncEventprops.componenthtmlid == "all" ||
        datasyncEventprops.componenthtmlid == componenthtmlid
      ) {
        if (datasyncEventprops.name == "updaterecorddata") {
          this.setState({ updaterecorddata: datasyncEventprops.data });
        }
      }
    }
  };

  serverEventHandler = () => {};

  render() {
    let { mainPanelHtmlObj, morerecorddata } = this.state;
    console.log(morerecorddata);
    console.log(mainPanelHtmlObj);
    let mainpanelHtml = [];
    console.log(this.props);
    for (let i in mainPanelHtmlObj) {
      let Staticcomp = this.getStaticReactcompfromDynamic(mainPanelHtmlObj[i], {
        morerecorddata: morerecorddata,
        updaterecorddata: this.state.updaterecorddata,
      });
      mainpanelHtml.push(Staticcomp);
    }

    return (
      <div id={this.props.htmlid} style={{ ...this.props.styleprops }}>
        {mainpanelHtml}
      </div>
    );
  }
}

export default F;
