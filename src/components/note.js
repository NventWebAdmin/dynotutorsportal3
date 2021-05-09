import React, { Component } from "react";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";
import { sortArray, fieldTypeHtmltoDBmapping } from "../js/index";
import { getLocalData, serverButtonHandler } from "../js/index";
import Rteditor from "./richtexteditor";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        let notedata = dataresult.dataprops.Items[0].data;
        console.log(notedata);
        document.getElementById("utilitynoteeditablediv").innerHTML = notedata;
      }
    }
  }

  handleSave = async () => {
    let localdata = getLocalData(this.props);
    console.log(localdata);
    let { orgname, userid } = localdata;

    alert(document.getElementById("utilitynoteeditablediv").innerHTML);
    let recorddata = {
      orgname: orgname,
      userid: userid,
      data: document.getElementById("utilitynoteeditablediv").innerHTML,
    };
    let result = await createRecord({
      objectName: "note",
      objectData: recorddata,
    });
    if (result.isSuccess === "false") {
      alert(result.message);
    } else {
      console.log(recorddata);
    }
  };

  render() {
    return (
      <>
        {/* <textarea
        style={{
          width: "100%",
          height: "50vh",

          backgroundColor: "#FFFACD",
          color: "black",
        }}
        onBlur={this.handleSave}
      >
        test
      </textarea> */}
        <div
          style={{
            width: "100%",
            height: "50vh",
            backgroundColor: "#FFFACD",
            color: "black",
          }}
          contenteditable="true"
          id="utilitynoteeditablediv"
        ></div>
        <Rteditor htmlid="utilitynoteeditablediv" />
        <button contenteditable="true" onClick={this.handleSave}>
          Save
        </button>
      </>
    );
  }
}

export default F;
