import React, { Component } from "react";

/*
format : 
 <Tablecomp
              compprops={{
                columns: columns,
                buttons: buttons,
                recordDataList: recordDataList,
              }}
            />

     columns: {
      "0": {
        "label": "Id",
        "name": "id",
        "type": ""
      },
      "1": {
        "label": "Start Date",
        "name": "startdate",
        "type": ""
      }
    }

  buttons:
  recordDatalist:  [{id:""},{id:""}]        
*/
class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {
      columns,
      buttons,
      recordDataList,
      recordviewfieldname,
    } = this.props.compprops;
    console.log(this.props);
    console.log(buttons);
    let mainpanelHtml = [];
    let tableHtml = [];
    let trrowHtml = [];
    let throwHtml = [];
    for (let i in columns) {
      throwHtml.push(<th>{columns[i].label}</th>);
    }
    console.log(recordDataList);

    if (recordDataList) {
      for (let i = 0; i < recordDataList.length; i++) {
        let tdcolumnHtml = [];
        for (let j in columns) {
          let recordDataItem = recordDataList[i];
          let columndata = columns[j];
          console.log(recordDataItem);
          console.log(columndata);
          tdcolumnHtml.push(
            <td
              data-name={recordDataItem[recordviewfieldname]}
              data-type="view"
              onClick={(e) => this.props.clickHandler(e, {})}
            >
              {recordDataItem[columndata.name]}
            </td>
          );
        }
        trrowHtml.push(<tr>{tdcolumnHtml}</tr>);
      }
      tableHtml.push(
        <table>
          <tr>{throwHtml}</tr>
          {trrowHtml}
        </table>
      );
      mainpanelHtml.push(<div>{tableHtml}</div>);
    }
    return <>{mainpanelHtml}</>;
  }
}

export default F;
