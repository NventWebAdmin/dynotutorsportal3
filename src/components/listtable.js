import React, { Component } from "react";
import { sortArray, fieldTypeHtmltoDBmapping } from "../js/index";
import Htmlform from "./htmlformnew";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainpanelHtml: [],
      recordData: [],
      recordDataTemp: [],
      selectedrecordData: [],
      updaterecorddatafromstate: [],
      morerecorddatafromstate: [],
    };
  }
  componentDidMount() {
    if (this.props.recordData) {
      let totalRows = this.props.recordData.length;
      this.setState({
        totalRows: totalRows,
        recordData: this.props.recordData,
        recordDataTemp: this.props.recordData,
        selectedColumn: "",
      });
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.morerecorddata);
    let {
      recordData,
      recordDataTemp,
      updaterecorddatafromstate,
      morerecorddatafromstate,
    } = this.state;
    let { morerecorddata, updaterecorddata } = this.props;
    let { prevmorerecorddata, prevupdaterecorddata } = prevProps;
    if (
      JSON.stringify(morerecorddatafromstate) != JSON.stringify(morerecorddata)
    ) {
      for (let i in morerecorddata) {
        recordDataTemp.push(morerecorddata[i]);
      }
      this.setState({
        recordDataTemp: recordDataTemp,
        recordData: recordData,
        morerecorddatafromstate: morerecorddata,
      });
    }

    if (
      JSON.stringify(updaterecorddatafromstate) !=
      JSON.stringify(updaterecorddata)
    ) {
      for (let i in recordDataTemp) {
        for (let j in updaterecorddata) {
          if (recordDataTemp[i].id == updaterecorddata[j].id) {
            recordDataTemp[i] = Object.assign(
              recordDataTemp[i],
              updaterecorddata[j]
            );
          }
        }

        for (let i in recordData) {
          for (let j in updaterecorddata) {
            if (recordData[i].id == updaterecorddata[j].id) {
              recordData[i] = Object.assign(recordData[i], updaterecorddata[j]);
            }
          }
        }

        this.setState({
          recordDataTemp: recordDataTemp,
          recordData: recordData,
          updaterecorddatafromstate: updaterecorddata,
        });
      }
    }
  }

  tableActionBtnClick = (e) => {
    console.log(e.target.dataset);
    let itemListData = [];
    let { recordDataTemp } = this.state;
    if (
      e.target.dataset.name == "upload" ||
      e.target.dataset.name == "download"
    ) {
      let tableCheckBoxElements = document.querySelectorAll(
        ".tablecompinputcheckbox"
      );
      console.log(tableCheckBoxElements);
      for (let i = 0; i < tableCheckBoxElements.length; i++) {
        for (let j = 0; j < recordDataTemp.length; j++) {
          if (
            tableCheckBoxElements[i].dataset.rowhtmlid1 ==
              recordDataTemp[j][this.props.rowhtmlid1] &&
            tableCheckBoxElements[i].checked
          ) {
            itemListData.push(recordDataTemp[j]);
          }
        }
      }
      console.log(itemListData);
      if (e.target.dataset.name == "upload") {
        this.props.tableOnclick({
          itemLabel: "",
          itemName: e.target.dataset.name,
          itemType: "tablebutton",
          itemData: "",
          itemListData: itemListData,
        });
      }

      if (e.target.dataset.name == "download") {
        this.setState({ downloadTableasCSV: true });
      }
    } else {
      this.props.tableOnclick({
        itemLabel: "",
        itemName: e.target.dataset.name,
        itemType: e.target.dataset.actiontype,
        itemId: e.target.dataset.actionid,
        actionid: e.target.dataset.actionid,
        itemData: "",
        itemListData: itemListData,
      });
    }
  };

  updateComponentData() {}

  render() {
    let {
      columnMetadata,

      activeTableviewName,
      listrecordcompsperrow,
    } = this.props;
    let { recordData } = this.state;
    let mainpanelHtml = [];

    let activeColumnMetadata = columnMetadata[activeTableviewName];
    console.log(activeColumnMetadata);

    // buttons
    let activeButtons = activeColumnMetadata.buttons;
    let buttonsArray = [];
    let buttonsArraySorted = [];
    let buttonsArrayHtml = [];
    for (let i in activeButtons) {
      buttonsArray.push(activeButtons[i]);
    }
    buttonsArraySorted = sortArray(buttonsArray, "order", "integer");
    for (let i in buttonsArraySorted) {
      buttonsArrayHtml.push(<button>{buttonsArraySorted[i].label}</button>);
    }
    mainpanelHtml.push(buttonsArrayHtml);

    // dropdown
    let dropdownOptionsHtml = [];
    let dropdownArray = [];
    let dropdownArraySorted = [];

    for (let i in columnMetadata) {
      dropdownArray.push(columnMetadata[i]);
    }
    dropdownArraySorted = sortArray(dropdownArray, "order", "integer");
    for (let i in dropdownArraySorted) {
      dropdownOptionsHtml.push(<option>{dropdownArraySorted[i].label}</option>);
    }
    mainpanelHtml.push(<select>{dropdownOptionsHtml} </select>);

    // datapanel
    let dataHtml = [];
    let dataprops = [];
    let columnsArray = [];
    let columnsArraySorted = [];

    for (let i in activeColumnMetadata.columns) {
      columnsArray.push(activeColumnMetadata.columns[i]);
    }
    columnsArraySorted = sortArray(columnsArray, "order", "integer");
    for (let i in recordData) {
      let fieldDataprops = [];
      for (let j in columnsArraySorted) {
        fieldDataprops.push({
          label: columnsArraySorted[j].label,
          name: "",

          type: fieldTypeHtmltoDBmapping({
            fieldType: columnsArraySorted[j].type,
            inputOrOutput: "output",
          }),

          width: columnsArraySorted[j] ? columnsArraySorted[j].width : "50%",

          height: columnsArraySorted[j] ? columnsArraySorted[j].height : "50%",
          hidelabel: columnsArraySorted[j].hidelabel,
          direction: columnsArraySorted[j].direction,
          placeholder: "",
          required: "false",
          readonly: "true",

          defaultvalue: recordData[i][columnsArraySorted[j].name],

          clientstatename: "",
          clientstatetype: "",
        });
      }
      let listrecordcompsperrowpercentage = 100 / listrecordcompsperrow + "%";
      console.log(listrecordcompsperrowpercentage);
      dataHtml.push(
        <Htmlform
          style={{ width: listrecordcompsperrowpercentage }}
          inputChanged=""
          clkHandler={this.clickHandler}
          inputKeyUp=""
          dataprops={fieldDataprops}
          bgcolor=""
        />
      );
    }

    mainpanelHtml.push(
      <div
        className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p org-bb org-fr org-fjc-sb org-fai-s "
        style={{
          backgroundColor: "#F2F2F2",
        }}
      >
        {dataHtml}
      </div>
    );

    console.log(columnMetadata);

    console.log(this.props);

    return (
      <div className="org-fr">
        <div>
          <input />
        </div>
        <div>
          <div>{mainpanelHtml}</div>
          <div>
            <button
              onClick={this.tableActionBtnClick}
              data-name=""
              data-actionid=""
              data-actiontype="morerecordsbutton"
            >
              More
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default F;
