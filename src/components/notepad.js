import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  getRecorddata,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../db/index";
import {
  sortArray,
  // fieldTypeHtmltoDBmapping,
  getLocalData,
  // serverButtonHandler,
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
    // let {
    //   tablename,
    //   defaultsortparam,
    //   enablelocaldbdata,
    //   parentid,
    //   // defaultdatafilter,
    //   iscreateactive,
    //   isviewactive,
    //   iseditactive,
    //   isdeleteactive,
    // } = this.props.compprops;

    let { noteid, action } = this.props;

    if (noteid && action === "view") {
      let props = { action: action, noteid: noteid };
      await this.getServerData(props);
    } else if (noteid && action === "edit") {
      let props = { action: action, noteid: noteid };
      await this.getServerData(props);
    } else if (action === "create") {
      this.insertEditableDiv();
    }
  }

  getServerData = async (props) => {
    let { action, noteid } = props;

    // alert("1-" + noteid);
    console.log(this.props);
    let localdata = getLocalData(this.props);

    let result = await getRecorddata({
      objectName: "note",
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
              action: action,
            };
            this.insertEditableDivHandler(divProps);
          }
          if (notepadDataArraySorted[i].type === "canvas") {
            let props = {
              order: notepadDataArraySorted[i].order,
              defaultdrawHistory: notepadDataArraySorted[i].defaultdrawHistory,
              action: action,
            };
            this.insertPaintHandler(props);
          }
        }

        this.setState({
          order: order,
          recorddata: result.dataprops.Items[0],
          action: action,
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
    this.setState({
      order: order,
      //  isEdit: true
    });
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
    let { action } = this.props;
    let { order } = this.state;
    order = parseInt(order) + 1;
    let props = {
      order: order,
      defaultdrawHistory: [],
      action: action,
    };
    this.insertPaintHandler(props);

    this.setState({ order: order }, () => {
      order = parseInt(order) + 1;
      // let divProps = {
      //   innerHTML: "&nbsp;",
      //   order: order,
      //   editable: true };
      this.insertEditableDiv({});
    });
  };

  insertPaintHandler = (props) => {
    let { order, defaultdrawHistory, action } = props;
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
      action: action,
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
    let {
      tablename,
      defaultsortparam,
      //enablelocaldbdata,
      parentid,
      //  defaultdatafilter,
      // iscreateactive,
      // isviewactive,
      // iseditactive,
      // isdeleteactive,
    } = this.props.compprops;

    let localdata = getLocalData(this.props);
    let { noteid, action } = this.props;
    console.log(noteid);
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
    recorddata.parentid = parentid;
    if (action === "create") {
      recorddata.orgname = localdata.orgname;
      let d = new Date();

      recorddata.id = defaultsortparam + "-" + parentid + "-" + d.getTime();
      // if (defaultdatafilter && Object.keys(defaultdatafilter).length > 0) {
      //   for (let j in defaultdatafilter) {
      //     recorddata[j] = defaultdatafilter[j];
      //   }
      // }

      let result = await createRecord({
        objectName: tablename,
        objectData: recorddata,
      });
      if (result.isSuccess === "false") {
        alert(result.message);
      } else {
        // this.resetUI();
        // let props = { editable: false, noteid: recorddata.id };
        // await this.getServerData(props);
        //   this.props.refreshNote({ noteid: recorddata.id });
        this.props.childnoteHandler({
          action: "view",
          recordid: recorddata.id,
        });
      }
    } else {
      let objectPrimaryKeyValue = {
        orgname: recorddata.orgname,
        id: recorddata.id,
      };
      let target = {};
      let recordDataUpdating = Object.assign(target, recorddata);
      delete recordDataUpdating.orgname;
      delete recordDataUpdating.id;

      let result = await updateRecord({
        objectName: tablename,
        objectPrimaryKeyValue: objectPrimaryKeyValue,
        objectData: recordDataUpdating,
      });
      if (result.isSuccess === "false") {
        alert(result.message);
      } else {
        this.props.childnoteHandler({
          action: "view",
          recordid: recorddata.id,
        });
      }
    }
    console.log(recorddata);
  };

  editNote = async () => {
    let { noteid } = this.props;
    let props = { action: "edit", recordid: noteid };
    this.props.childnoteHandler(props);
  };

  cancelEditNote = async () => {
    let { noteid } = this.props;
    let props = { action: "view", recordid: noteid };
    this.props.childnoteHandler(props);
  };

  resetUI = () => {
    document.getElementById("notepadedit").innerHTML = "";
  };

  deleteNote = async (props) => {
    let { recorddata } = this.state;
    let localdata = getLocalData(this.props);

    let result = await deleteRecord({
      objectName: "note",
      objectPrimaryKeyValue: { id: recorddata.id, orgname: localdata.orgname },
    });
    if (result.isSuccess === "false") {
      alert(result.message);
    } else {
      let props = { action: "", recordid: "" };
      this.props.childnoteHandler(props);
    }
  };

  noteTitleChange = (e) => {
    let { recorddata } = this.state;
    recorddata.label = e.target.value;
  };

  render() {
    console.log(this.props);
    let { isEdit, recorddata } = this.state;
    let {
      noteid,
      createNote,
      action,
      iseditactive,
      isdeleteactive,
    } = this.props;
    let mainpanelHtml = [];
    let notepageHtml = [];

    notepageHtml.push(
      <>
        <div className="org-flexbasis-100p org-mflexbasis-90p org-lflexbasis-90p">
          <Rte
            iscreateactive="false"
            htmlid="notepadedit"
            noteid={noteid}
            createNote={createNote}
            insertPaint={this.insertPaint}
            editNote={this.editNote}
            saveNotes={this.saveNotes}
            cancelEditNote={this.cancelEditNote}
            deleteNote={this.deleteNote}
            isEdit={isEdit}
            action={action}
            iseditactive={iseditactive}
            isdeleteactive={isdeleteactive}
          />
          <div>
            {action === "create" || action === "edit" ? (
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
