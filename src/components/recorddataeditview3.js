import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  getRecorddata,
  createRecord,
  bulkcreateRecord,
  updateRecord,
  deleteRecord,
} from "../db/index";
import {
  sortArray,
  fieldTypeHtmltoDBmapping,
  getLocalData,
  serverButtonHandler,
} from "../js/index";

import Paintpad from "./paintpad";
import Rte from "./richtexteditor";
class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultdrawHistoryObj: {},
      order: 0,
      recorddata: {},
      isEdit: "",
    };
  }

  async componentDidMount() {
    let { noteid } = this.props;

    if (noteid) {
      let props = { editable: false, noteid: noteid };
      await this.getServerData(props);
    } else {
      this.insertEditableDiv();
    }
  }

  getServerData = async (props) => {
    let { editable, noteid } = props;

    // alert("1-" + noteid);
    console.log(this.props);
    let localdata = getLocalData(this.props);

    let result = await getRecorddata({
      objectName: "mycourse",
      objectData: {},
      keyConditions: [
        { field: "orgname", value: localdata.orgname, expression: "=" },
        { field: "id", value: noteid, expression: "=" },
      ],
      filterConditions: [],
    });

    console.log(result);
    if (result.isSuccess === "false") {
      alert("url not found");
    } else {
      console.log(result.dataprops.Items[0]);
      console.log(JSON.parse(result.dataprops.Items[0].data));
      if (result.dataprops && result.dataprops.Items) {
        let order = 0;
        let notepadDataArray = JSON.parse(result.dataprops.Items[0].data);
        let notepadDataArraySorted = sortArray(
          notepadDataArray,
          "order",
          "integer"
        );
        for (let i = 0; i < notepadDataArraySorted.length; i++) {
          order++;
          if (notepadDataArraySorted[i].type === "div") {
            let divProps = {
              innerHTML: notepadDataArraySorted[i].innerhtml,
              order: notepadDataArraySorted[i].order,
              editable: editable,
            };
            this.insertEditableDivHandler(divProps);
          }
          if (notepadDataArraySorted[i].type === "canvas") {
            let props = {
              order: notepadDataArraySorted[i].order,
              defaultdrawHistory: notepadDataArraySorted[i].defaultdrawHistory,
              editable: editable,
            };
            this.insertPaintHandler(props);
          }
        }

        this.setState({
          order: order,
          recorddata: result.dataprops.Items[0],
          isEdit: editable,
        });
      }
    }

    //let paintProps = { id: "id1", htmlArray: "<div>Tewst</div>" };
    // this.insertPaint(divProps);
  };

  paintpadAttachHandler = (props) => {
    let { defaultdrawHistoryObj } = this.state;
    console.log(props);
    let { drawHistory, order } = props;
    defaultdrawHistoryObj[order] = drawHistory;
    this.setState({ defaultdrawHistoryObj: defaultdrawHistoryObj });
  };

  insertEditableDiv = (props) => {
    let { order } = this.state;
    order = parseInt(order) + 1;
    let divProps = {
      innerHTML: "&nbsp;",
      order: order,
      editable: true,
    };
    this.insertEditableDivHandler(divProps);
    this.setState({ order: order, isEdit: true });
  };

  insertEditableDivHandler = (props) => {
    let { innerHTML, order } = props;

    var paintParentNextDiv = document.createElement("div");
    paintParentNextDiv.setAttribute("class", "notepadedit-div");
    paintParentNextDiv.setAttribute("contenteditable", props.editable);
    paintParentNextDiv.setAttribute("data-order", order);
    paintParentNextDiv.innerHTML = innerHTML;
    document
      .getElementById("notepadedit")
      .insertAdjacentElement("beforeend", paintParentNextDiv);
    // if(props.order === undefined ||){
    //  this.setState({ order: parseInt(order) + 1 });
    // }
  };

  insertPaint = () => {
    let { order } = this.state;
    order = parseInt(order) + 1;
    let props = {
      order: order,
      defaultdrawHistory: [],
      editable: true,
    };
    this.insertPaintHandler(props);

    this.setState({ order: order }, () => {
      order = parseInt(order) + 1;
      let divProps = { innerHTML: "&nbsp;", order: order, editable: true };
      this.insertEditableDiv(divProps);
    });
  };

  insertPaintHandler = (props) => {
    let { order, defaultdrawHistory, editable } = props;
    let parentDivId = "notepadedit-canvasdiv-" + order;
    let canvasId = "notepadedit-canvas-" + order;
    let hiddenDivId = "notepadedit-canvas-hiddendiv" + order;
    // parent div
    var paintParentDiv = document.createElement("div");
    paintParentDiv.setAttribute("id", parentDivId);
    paintParentDiv.setAttribute("style", "width:100%;height:50%;");
    paintParentDiv.setAttribute("class", "notepadedit-canvas");
    paintParentDiv.setAttribute("data-order", order);

    document
      .getElementById("notepadedit")
      .insertAdjacentElement("beforeend", paintParentDiv);

    // paintpad comp

    let compprops = {
      order: order,
      canvashtmlid: canvasId,
      canvashtmlparentdivid: parentDivId,
      hiddendivhtmlid: hiddenDivId,
      editable: editable,
      defaultdrawHistory: defaultdrawHistory,
    };
    let onattach = this.paintpadAttachHandler;

    let paintElement = React.createElement(
      Paintpad,
      { compprops: compprops, onattach: onattach },
      null
    );

    let paintElementHmtl = [];
    paintElementHmtl.push(paintElement);

    ReactDOM.render(paintElementHmtl, document.getElementById(parentDivId));
  };

  saveNotes = async () => {
    let localdata = getLocalData(this.props);
    let { noteid, createNote } = this.props;
    let { recorddata } = this.state;
    let { defaultdrawHistoryObj } = this.state;
    let divandcanvasEle = [];
    let divElements = document.getElementsByClassName("notepadedit-div");
    for (let i = 0; i < divElements.length; i++) {
      console.log(divElements[i].innerHTML);
      divandcanvasEle.push({
        type: "div",
        order: divElements[i].dataset.order,
        innerhtml: divElements[i].innerHTML,
      });
    }

    let canvasElements = document.getElementsByClassName("notepadedit-canvas");
    for (let i = 0; i < canvasElements.length; i++) {
      console.log(canvasElements[i]);
      console.log(canvasElements[i].dataset.order);
      console.log(defaultdrawHistoryObj[canvasElements[i].dataset.order]);
      divandcanvasEle.push({
        type: "canvas",
        order: canvasElements[i].dataset.order,
        defaultdrawHistory:
          defaultdrawHistoryObj[canvasElements[i].dataset.order],
      });
    }
    console.log(divandcanvasEle);
    console.log(JSON.stringify(divandcanvasEle));
    recorddata.data = JSON.stringify(divandcanvasEle);

    if (createNote === true) {
      recorddata.orgname = localdata.orgname;
      let d = new Date();

      recorddata.id = "mc-" + localdata.userid + "-" + d.getTime();
    }
    console.log(recorddata);

    let result = await createRecord({
      objectName: "mycourse",
      objectData: recorddata,
    });
    if (result.isSuccess === "false") {
      alert(result.message);
    } else {
      // this.resetUI();
      // let props = { editable: false, noteid: recorddata.id };
      // await this.getServerData(props);
      this.props.refreshNote({ noteid: recorddata.id });
    }
  };

  editNote = async () => {
    let { noteid } = this.props;
    this.resetUI();
    let props = { editable: true, noteid: noteid };
    await this.getServerData(props);
  };

  cancelEditNote = async () => {
    let { noteid } = this.props;
    this.resetUI();
    let props = { editable: false, noteid: noteid };
    await this.getServerData(props);
  };

  resetUI = () => {
    document.getElementById("notepadedit").innerHTML = "";
  };

  deleteNote = async (props) => {
    let { recorddata } = this.state;
    let localdata = getLocalData(this.props);

    let result = await deleteRecord({
      objectName: "mycourse",
      objectPrimaryKeyValue: { id: recorddata.id, orgname: localdata.orgname },
    });
    if (result.isSuccess === "false") {
      alert(result.message);
    } else {
      window.location.reload();
    }
  };

  noteTitleChange = (e) => {
    let { recorddata } = this.state;
    recorddata.label = e.target.value;
  };

  render() {
    let { isEdit, recorddata } = this.state;
    let { noteid, createNote } = this.props;
    let mainpanelHtml = [];
    let notepageHtml = [];

    notepageHtml.push(
      <>
        <div className="org-flexbasis-100p org-mflexbasis-90p org-lflexbasis-90p">
          <Rte
            htmlid="notepadedit"
            noteid={noteid}
            createNote={createNote}
            insertPaint={this.insertPaint}
            editNote={this.editNote}
            saveNotes={this.saveNotes}
            cancelEditNote={this.cancelEditNote}
            deleteNote={this.deleteNote}
          />
          <div>
            {isEdit === true ? (
              <div>
                <input
                  defaultValue={recorddata.label}
                  onChange={this.noteTitleChange}
                />
              </div>
            ) : (
              <div>{recorddata.label}</div>
            )}
          </div>

          <div
            id="notepadedit"
            contentEditable="true"
            style={{
              width: "100%",
              height: "100vh",
              backgroundColor: "lightyellow",
              color: "black",
              position: "relative",
              overflow: "auto",
            }}
          >
            {/* <div className="notepadedit-div org-bb" contenteditable="true"></div> */}
          </div>
        </div>
      </>
    );
    mainpanelHtml.push(notepageHtml);

    return <>{mainpanelHtml}</>;
  }
}

export default F;
