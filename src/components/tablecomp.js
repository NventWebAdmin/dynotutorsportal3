import React from "react";
import "../App.css";
import { sortArray, GetAlphabetPanel } from "../js/index";
import Paginationcomp from "./pagination";
import { GetLocalIcon, GetGoogleIcon } from "./icons";

export default class F extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startOfRows: 0,
      noofRowsPerPage: 10,
      totalRows: 0,
      downloadTableasCSV: false,
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
        sortedColumn: "",
      });
    }
  }

  onTabledropdownChange = (e) => {
    this.props.tableOnclick({
      tableName: e.target.dataset.tablename,
      itemLabel: "",
      itemName: e.target.value,
      itemType: "tabledropdown",
      actionid: e.target.dataset.actionid,
    });
  };

  tableActionBtnClick = (e) => {
    let itemListData = [];
    let { recordDataTemp } = this.state;
    if (
      e.target.dataset.name == "upload" ||
      e.target.dataset.name == "download"
    ) {
      let tableCheckBoxElements = document.querySelectorAll(
        ".tablecompinputcheckbox"
      );
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

  alphabetPanelClick = (a) => {
    console.log(a);
    let { recordDataTemp, sortedColumn } = this.state;
    if (sortedColumn != "") {
      let recordData = [];
      if (a == "All") {
        this.setState({ recordData: recordDataTemp });
      } else {
        for (let i in recordDataTemp) {
          let sortedColumnValue = recordDataTemp[i][sortedColumn];
          if (sortedColumnValue) {
            if (sortedColumnValue.toLowerCase().startsWith(a.toLowerCase())) {
              recordData.push(recordDataTemp[i]);
            }
          }
        }

        this.setState({ recordData: recordData });
      }
    }
  };

  tableThClick = (e) => {
    console.log(e.target.dataset.name);
    let { recordData } = this.state;
    console.log(recordData);
    let recordDataSorted = sortArray(
      recordData,
      e.target.dataset.name,
      "string"
    );
    console.log(recordDataSorted);
    this.setState({
      recordData: recordDataSorted,
      sortedColumn: e.target.dataset.name,
    });
  };

  tableTdNameLinkClick = (e) => {
    this.props.tableOnclick({
      itemLabel: e.target.dataset.label,
      itemName: e.target.dataset.id,
      actionid: e.target.dataset.actionid,
      itemType: "tabletdnamelink",
    });
  };

  tableNoofRowsPerPageChange = (e) => {
    this.setState({ noofRowsPerPage: e.target.value, startOfRows: 0 });
  };

  tablepaginationLinkClick = (buttonName) => {
    console.log(buttonName);
    let { startOfRows, noofRowsPerPage, totalRows } = this.state;
    let nextstartOfRows = parseInt(startOfRows) + parseInt(noofRowsPerPage);
    let previousstartOfRows = parseInt(startOfRows) - parseInt(noofRowsPerPage);
    if (buttonName == "first") {
      this.setState({ startOfRows: 0 });
    }
    if (buttonName == "next") {
      this.setState({ startOfRows: nextstartOfRows });
    }
    if (buttonName == "previous") {
      this.setState({ startOfRows: previousstartOfRows });
    }
    if (buttonName == "last") {
      this.setState({ startOfRows: totalRows - noofRowsPerPage });
    }
  };

  selectAllRows = (e) => {
    console.log(e.target.dataset);
    let tableCheckBoxElements = document.querySelectorAll(
      ".tablecompinputcheckbox"
    );
    console.log(tableCheckBoxElements);
    for (let i = 0; i < tableCheckBoxElements.length; i++) {
      if (
        e.target.dataset.tablehtmlid ==
        tableCheckBoxElements[i].dataset.tablehtmlid
      ) {
        tableCheckBoxElements[i].checked = e.target.checked;
      }
    }
    this.selectRow(e);
  };

  selectRow = (e) => {
    console.log(e.target.dataset);
    let { recordDataTemp } = this.state;
    let selectedrecordData = [];

    let tableCheckBoxElements = document.querySelectorAll(
      ".tablecompinputcheckbox"
    );
    console.log(tableCheckBoxElements);
    for (let i = 0; i < tableCheckBoxElements.length; i++) {
      if (
        e.target.dataset.tablehtmlid ==
        tableCheckBoxElements[i].dataset.tablehtmlid
      ) {
        if (tableCheckBoxElements[i].checked == true) {
          console.log(tableCheckBoxElements[i]);
          for (let j = 0; j < recordDataTemp.length; j++) {
            if (
              tableCheckBoxElements[i].dataset.rowhtmlid1 ==
                recordDataTemp[j][this.props.rowhtmlid1] &&
              tableCheckBoxElements[i].dataset.rowhtmlid2 ==
                recordDataTemp[j][this.props.rowhtmlid2]
            ) {
              selectedrecordData.push(recordDataTemp[j]);
            }
          }
        }
      }
    }
    this.setState({ selectedrecordData: selectedrecordData });

    console.log(selectedrecordData);

    // this.props.tableOnChange({
    //   clientstatename: e.target.dataset.clientstatename,
    //   clientstatetype: e.target.dataset.clientstatetype,
    //   recordDataArray: selectedrecordData,
    //   itemType: "tablecheckbox",
    // });
  };

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

  render() {
    let {
      recordData,
      noofRowsPerPage,
      startOfRows,
      sortedColumn,
      downloadTableasCSV,
    } = this.state;
    console.log(recordData);
    let {
      columnMetadata,
      activeTableviewName,
      tablehtmlid,
      clientstatename,
      clientstatetype,
      tableName,
      rowhtmlid1,
      rowhtmlid2,
      viewnamedropdownchangeaction,
    } = this.props;
    //  alert(JSON.stringify(this.props));
    //  alert(JSON.stringify(viewnamedropdownchangeaction));
    let csvDownloadString = "";
    let tablemetaData = columnMetadata;
    let tableData = recordData;
    let thNameList = [];
    let thNameListObject = [];

    let endOfRows = parseInt(startOfRows) + parseInt(noofRowsPerPage) - 1;
    let isShowSelectionCheckbox = true;
    // table dropdown html
    let tableMetaDataArray = [];
    let tableMetaDataArraySorted = [];
    for (let i in tablemetaData) {
      tableMetaDataArray.push(tablemetaData[i]);
    }
    console.log(tableMetaDataArray);

    // soring table metadata by order value so that first will be default shown
    tableMetaDataArraySorted = sortArray(
      tableMetaDataArray,
      "order",
      "integer"
    );
    console.log(tableMetaDataArraySorted);

    // prepare th data, buttondata
    let buttonsHtml = [];
    let thRowHtml = [];
    let tableViewSelectionDropdownHtml = [];
    let tableViewSelectionDropdownItemHtml = [];
    let tableViewSelectionDropdownButtonItemHtml = [];

    for (let i = 0; i < tableMetaDataArraySorted.length; i++) {
      let metadataItem = tableMetaDataArraySorted[i];
      if (activeTableviewName === metadataItem.name) {
        //tableviewdropdown
        tableViewSelectionDropdownItemHtml.push(
          <option value={metadataItem.name} selected>
            {metadataItem.label}
          </option>
        );
        tableViewSelectionDropdownButtonItemHtml.push(
          <button
            onClick={this.tableActionBtnClick}
            data-name={metadataItem.name}
            data-actionid=""
            data-actiontype=""
          >
            {metadataItem.label}
          </button>
        );

        // button array
        let buttonsArray = [];
        let buttonsArraySorted = [];
        for (let buttonI in metadataItem.buttons) {
          buttonsArray.push(metadataItem.buttons[buttonI]);
        }

        buttonsArraySorted = sortArray(buttonsArray, "order", "integer");
        console.log(buttonsArray);
        console.log(buttonsArraySorted);
        //buttonarrayhtml
        for (let i = 0; i < buttonsArraySorted.length; i++) {
          console.log(i);
          console.log(buttonsArraySorted[i]);
          buttonsHtml.push(
            <button
              onClick={this.tableActionBtnClick}
              data-name={buttonsArraySorted[i].name}
              data-actionid={buttonsArraySorted[i].action.id}
              data-actiontype={buttonsArraySorted[i].action.type}
            >
              {buttonsArraySorted[i].label}
            </button>
          );
        }

        // th html
        let thArray = [];
        let thArraySorted = [];
        let thItemHtml = [];
        for (let columnI in metadataItem.columns) {
          thArray.push(metadataItem.columns[columnI]);
        }

        thArraySorted = sortArray(thArray, "order", "integer");
        console.log(thArray);
        console.log(thArraySorted);
        if (isShowSelectionCheckbox) {
          thItemHtml.push(
            <th>
              <input
                type="checkbox"
                onChange={this.selectAllRows}
                data-tablehtmlid={tablehtmlid}
                data-clientstatename={clientstatename}
                data-clientstatetype={clientstatetype}
              />
            </th>
          );
        }

        for (let i = 0; i < thArraySorted.length; i++) {
          console.log(i);
          console.log(thArraySorted[i]);
          thNameListObject[thArraySorted[i].name] = thArraySorted[i];
          console.log(thNameListObject);
          thNameList.push(thArraySorted[i].name);
          // prepare thitems if tablemetadata
          thItemHtml.push(
            <th>
              <div className="org-cursor hoverclass org-fr org-fai-c ">
                <span
                  onClick={this.tableThClick}
                  data-name={thArraySorted[i].name}
                >
                  {thArraySorted[i].label.toUpperCase()}
                </span>
                {sortedColumn == thArraySorted[i].name ? (
                  <GetGoogleIcon
                    name="unfold_more"
                    onClick={this.tableThClick}
                    data-name={thArraySorted[i].name}
                  />
                ) : (
                  ""
                )}
              </div>
            </th>
          );
        }
        // prepare th row if  table metadata
        thRowHtml.push(
          <tr style={{ backgroundColor: "grey" }}>{thItemHtml}</tr>
        );
      } else {
        //tableviewdropdown
        tableViewSelectionDropdownItemHtml.push(
          <option value={metadataItem.name}>{metadataItem.label}</option>
        );
        tableViewSelectionDropdownButtonItemHtml.push(
          <button
            onClick={this.tableActionBtnClick}
            data-name={metadataItem.name}
            data-actionid=""
            data-actiontype=""
          >
            {metadataItem.label}
          </button>
        );
      }
    }
    console.log(tablemetaData);
    tableViewSelectionDropdownHtml.push(
      <select
        onChange={this.onTabledropdownChange}
        data-actionid={viewnamedropdownchangeaction.id}
        data-tablename={tableName}
      >
        {tableViewSelectionDropdownItemHtml}
      </select>
    );

    let totalRowHtml = [];

    let thItemHtmlIfnoTablemetadata = [];

    // preparing table th html if columnmetadata is not given
    if (!tablemetaData && tableData) {
      for (let i = 0; i < tableData.length; i++) {
        let tableDataItem = tableData[i];
        console.log(tableDataItem);
        if (isShowSelectionCheckbox) {
          thItemHtmlIfnoTablemetadata.push(
            <th>
              <input
                type="checkbox"
                onChange={this.selectAllRows}
                data-tablehtmlid={tablehtmlid}
                data-clientstatename={clientstatename}
                data-clientstatetype={clientstatetype}
              />
            </th>
          );
        }
        for (let j in tableDataItem) {
          if (!thNameList.toString().includes(j)) {
            thNameList.push(j);
            thItemHtmlIfnoTablemetadata.push(
              <th>
                <div className="org-cursor hoverclass org-fr org-fai-c">
                  <span onClick={this.tableThClick} data-name={j}>
                    {j.toUpperCase()}
                  </span>
                  {sortedColumn == j ? (
                    <GetGoogleIcon
                      name="unfold_more"
                      onClick={this.tableThClick}
                      data-name={j}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </th>
            );
          }
        }
      }
      // prepare th row if no table metadata
      thRowHtml.push(
        <tr style={{ backgroundColor: "grey" }} data-tablehtmlid={tablehtmlid}>
          {thItemHtmlIfnoTablemetadata}
        </tr>
      );
    }

    totalRowHtml.push(thRowHtml);

    // preparing table body
    let totalRows = 0;
    let csvThDownloadString = "";
    let csvTrDownloadArray = [];
    let csvTrDownloadString = "";

    if (tableData) {
      console.log(tableData);
      console.log(thNameList);

      csvThDownloadString = thNameList.join(",") + "\n";
      console.log(csvThDownloadString);

      let tdRowhtml = [];
      let tdHtml = [];
      totalRows = tableData.length;

      for (
        let tableDataItem = startOfRows;
        tableDataItem <= endOfRows;
        tableDataItem++
      ) {
        if (tableData[tableDataItem]) {
          console.log(tableDataItem);
          console.log(tableData[tableDataItem]);
          let trItem = tableData[tableDataItem];
          tdHtml = [];

          tdHtml.push(
            <td data-tablename={tableName}>
              <input
                type="checkbox"
                onChange={this.selectRow}
                className="tablecompinputcheckbox"
                data-tablehtmlid={tablehtmlid}
                data-rowhtmlid1={trItem[rowhtmlid1]}
                data-rowhtmlid2={trItem[rowhtmlid2]}
                data-clientstatename={clientstatename}
                data-clientstatetype={clientstatetype}
              />
            </td>
          );

          let csvTdDownloadArrayItem = [];
          let csvTdDownloadStringItem = "";
          for (let thItem in thNameList) {
            csvTdDownloadArrayItem.push(trItem[thNameList[thItem]]);
            let listnviewactionid = "";
            if (
              thNameListObject[thNameList[thItem]].listnviewaction &&
              thNameListObject[thNameList[thItem]].listnviewaction.id
            ) {
              listnviewactionid =
                thNameListObject[thNameList[thItem]].listnviewaction.id;
            }
            tdHtml.push(
              <td
                onClick={this.tableTdNameLinkClick}
                data-id={trItem.id}
                data-label={trItem[thNameList[thItem]]}
                data-tablename={tableName}
                data-actionid={thNameListObject[thNameList[thItem]].action.id}
              >
                {trItem[thNameList[thItem]]}
                {/* {listnviewactionid == "" ? (
                  ""
                ) : (
                  <span
                    onClick={this.tableTdNameLinkClick}
                    data-id={trItem.id}
                    data-label={trItem[thNameList[thItem]]}
                    data-tablename={tableName}
                    data-actionid={listnviewactionid}
                  >
                    listnview
                  </span>
                )} */}
              </td>
            );
          }
          csvTdDownloadStringItem = csvTdDownloadArrayItem.join(",");
          csvTrDownloadArray.push(csvTdDownloadStringItem);
          tdRowhtml.push(<tr>{tdHtml}</tr>);
        }
      }
      csvTrDownloadString = csvTrDownloadArray.join("\n");
      totalRowHtml.push(tdRowhtml);

      csvDownloadString = csvThDownloadString + csvTrDownloadString;

      if (downloadTableasCSV == true) {
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          `data:text/plain;charset=utf-8, ${csvDownloadString}`
        );
        element.setAttribute("download", `${"fileName"}.csv`);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        this.setState({ downloadTableasCSV: false });
      }
    }
    console.log(this.props);
    return (
      <div className="org-frnw">
        {/* <div className="org-flexbasis-100p org-mflexbasis-15p org-lflexbasis-15p org-fc">
          {tableViewSelectionDropdownButtonItemHtml}
        </div> */}
        <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p">
          {buttonsHtml}
          <div className="org-fr org-fjc-sb">
            {tableViewSelectionDropdownHtml}
            <GetAlphabetPanel aplhabetOnClickjs={this.alphabetPanelClick} />
          </div>
          <div style={{ maxHeight: "300px", overflow: "auto" }}>
            <table id="table1" style={{ width: "100%" }}>
              {totalRowHtml}
            </table>
          </div>
          <div className="org-fr org-fjc-c  org-fai-c ">
            <Paginationcomp
              clkHandler={this.tablepaginationLinkClick}
              rowprops={{
                startOfRows: startOfRows,
                noofRowsPerPage: noofRowsPerPage,
                totalRows: totalRows,
              }}
            />
            <select
              style={{ paddingLeft: "10px" }}
              onChange={this.tableNoofRowsPerPageChange}
              value={noofRowsPerPage}
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          {true ? (
            <button
              onClick={this.tableActionBtnClick}
              data-name=""
              data-actionid=""
              data-actiontype="morerecordsbutton"
            >
              More
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
