import React, { Component } from "react";
import { getRecorddata } from "../db/index";
import { getLocalData } from "../js/index";

/*
compprops:{ metadata: {
        label: "Calender",
        objectname: "lessonevent",
        parentfield: "lessonid",
        idbeginswith: "le",
        fields: {
          id: { label: "Id", name: "id" },
          lessonid: { label: "Lesson Id", name: "lessonid" },
        },
      },
    }
*/

class F extends Component {
  constructor(props) {
    super(props);
    this.state = { recordDataList: [] };
  }

  async componentDidMount() {
    let localdata = getLocalData(this.props);
    console.log(localdata);
    let { metadata } = this.props.compprops;

    let dataParams = {
      objectName: metadata.objectname,
      objectData: {},
      keyConditions: [
        {
          field: "orgname",
          value: localdata.orgname,
          expression: "=",
        },
        {
          field: "id",
          value: metadata.idbeginswith,
          expression: "beginswith",
        },
      ],
      filterConditions: [
        {
          field: metadata.parentfield,
          value: localdata.recordid,
          expression: "=",
        },
      ],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };
    console.log(dataParams);
    let dataresult = await getRecorddata(dataParams);
    if (dataresult.isSuccess === "false") {
      alert("data" + dataresult.message);
    } else {
      let recordDataList = dataresult.dataprops.Items;
      console.log(recordDataList);
      this.setState({ recordDataList: recordDataList });
    }
  }
  render() {
    let { recordDataList } = this.state;
    let { metadata } = this.props.compprops;
    let fields = metadata.fields;
    console.log(fields);
    let tableHtml = [];
    let trHtml = [];
    for (let j in fields) {
      trHtml.push(<th>{fields[j].label}</th>);
    }
    for (let i = 0; i < recordDataList.length; i++) {
      let tdHtml = [];
      for (let j in fields) {
        tdHtml.push(<td>{recordDataList[i][j]}</td>);
      }
      trHtml.push(<tr>{tdHtml}</tr>);
    }
    tableHtml.push(
      <div>
        <div>{metadata.label}</div>
        <table>{trHtml}</table>
      </div>
    );
    return <> {tableHtml} </>;
  }
}

export default F;
