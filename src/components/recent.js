import React, { Component } from "react";
import { GetLocalIcon, GetGoogleIcon } from "./icons";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";
import { sortArray, fieldTypeHtmltoDBmapping } from "../js/index";
import { getLocalData, serverButtonHandler } from "../js/index";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = { recordDataList: [] };
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
  }

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

    let dataParams = {
      objectName: tableName,
      objectData: {},
      keyConditions: [
        {
          field: "orgname",
          value: orgname,
          expression: "=",
        },
        {
          field: "userid",
          value: userId,
          expression: "=",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };
    let dataresult = await getRecorddata(dataParams);
    if (dataresult.isSuccess === "false") {
      alert("data" + dataresult.message);
    } else {
      console.log(dataresult.dataprops.Items);
      if (dataresult.dataprops.Items.length > 0) {
        let recordDataList = dataresult.dataprops.Items[0].data;
        console.log(recordDataList);
        this.setState({ recordDataList: recordDataList });
      }
    }
  }

  openRecord = (props) => {
    console.log(props);
    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      datadisplaytype,
      viewname,
      viewactionid,
      viewnewtabactionid,
    } = this.props.compprops;
    let localdata = getLocalData(this.props);
    let { sametab, recordid, objectname } = props;

    if (sametab) {
      this.props.serverButtonHandler({
        localdata: localdata,
        clickprops: {
          actionid: viewactionid,
          recordid: recordid,
          sametab: sametab,
          objectname: objectname,
        },
      });
    } else {
      this.props.serverButtonHandler({
        localdata: localdata,
        clickprops: {
          actionid: viewnewtabactionid,
          recordid: recordid,
          sametab: sametab,
          objectname: objectname,
        },
      });
    }
  };
  render() {
    let { recordDataList } = this.state;
    let allobjectdatalist = [];
    let allobjectdatalistSorted = [];
    console.log(recordDataList);
    for (let i in recordDataList) {
      let objectlistdata = recordDataList[i].list;
      console.log(objectlistdata);
      for (let j in objectlistdata) {
        allobjectdatalist.push(objectlistdata[j]);
      }
    }
    console.log(allobjectdatalist);
    allobjectdatalistSorted = sortArray(allobjectdatalist, "time", "integer");
    console.log(allobjectdatalistSorted);

    let recentrecordArrayhtml = [];
    for (let i = 0; i < allobjectdatalistSorted.length; i++) {
      recentrecordArrayhtml.push(
        <>
          <span
            className="org-fr cursorpointer"
            style={{ border: "1px solid grey" }}
          >
            <span
              onClick={() =>
                this.openRecord({
                  sametab: false,
                  recordid: allobjectdatalistSorted[i].recordid,
                  objectname: allobjectdatalistSorted[i].objectname,
                })
              }
            >
              <GetGoogleIcon name="search" />
            </span>
            <span className="org-fc">
              <span
                className="mf "
                onClick={() =>
                  this.openRecord({
                    sametab: true,
                    recordid: allobjectdatalistSorted[i].recordid,
                    objectname: allobjectdatalistSorted[i].objectname,
                  })
                }
              >
                {allobjectdatalistSorted[i].title}
              </span>
              <span
                className="sf "
                onClick={() =>
                  this.openRecord({
                    sametab: true,
                    recordid: allobjectdatalistSorted[i].recordid,
                    objectname: allobjectdatalistSorted[i].objectname,
                  })
                }
              >
                {allobjectdatalistSorted[i].subtitle}
              </span>
            </span>
          </span>
        </>
      );
    }
    return recentrecordArrayhtml;
  }
}

export default F;
