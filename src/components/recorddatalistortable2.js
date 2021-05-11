import React, { Component } from "react";
import { getRecorddata } from "../db/index";
import Tablecomp from "./tablecomp2";
import {
  getLocalData,
  //  serverButtonHandler,
  filterArraybyObject,
} from "../js/index";
//import { GetFontAwesomeIcon, GetGoogleIcon } from "./icons";
import Recorddataeditview from "./recorddataeditview2";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordDataList: [],
      recordData: {},
      action: "",
      activetableviewItem: {},
      windowtype: "hsplit",
      clickedrecordid: "",
      showUI: false,
      multiselectclickedrecordids: [],
    };
  }

  async componentDidMount() {
    // let clickedrecordid = "";
    let url = new URL(document.location);
    console.log(url);
    // var searchParams = new URLSearchParams(url.search);

    // if (searchParams.get("id")) {
    //   clickedrecordid = searchParams.get("id");
    // }

    let {
      tablename,
      comphtmlid,
      recordeditviewprops,
      showallrecordsubscribe,
      parentobjectfilter,
      showallrecords,
      enablelocaldbdata,
      listdisplaytype,
      defaultdatafilter,
      viewname,
      defaulttableviewnamebeginswith,
      recordviewfieldname,
      showrecordeditview,
    } = this.props.compprops;
    console.log(comphtmlid);
    console.log(recordeditviewprops);
    console.log(showallrecordsubscribe);
    console.log(parentobjectfilter);
    console.log(showallrecords);
    console.log(enablelocaldbdata);
    console.log(listdisplaytype);
    console.log(defaultdatafilter);
    console.log(recordviewfieldname);
    console.log(showrecordeditview);

    this.getRecordListMetadataAndDatafromServer({
      tablename: tablename,
      viewname: viewname,
      defaulttableviewnamebeginswith: defaulttableviewnamebeginswith,
      clickedrecordid: "",
    });
  }

  async getRecordListMetadataAndDatafromServer(props) {
    let { recordviewfieldname, defaultdatafilter } = this.props.compprops;
    let {
      tablename,
      viewname,
      defaulttableviewnamebeginswith,
      clickedrecordid,
    } = props;
    let tableviewdataParams = {};
    let dataParams = {};
    let localdata = getLocalData(this.props);

    let datasortparamequalsto = "",
      datasortparambeginswith = "";

    tableviewdataParams = {
      objectName: "tableview2",
      objectData: {},
      keyConditions: [
        {
          field: "orgname",
          value: localdata.orgname,
          expression: "=",
        },
        {
          field: "id",
          value: defaulttableviewnamebeginswith,
          expression: "beginswith",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };
    console.log(tableviewdataParams);
    let tableviewdataresult = await getRecorddata(tableviewdataParams);
    if (tableviewdataresult.isSuccess === "false") {
      alert("data" + tableviewdataresult.message);
    } else {
      let tableviewrecordDataList = tableviewdataresult.dataprops.Items;
      console.log(tableviewrecordDataList);
      let activetableviewItem;
      for (let i = 0; i < tableviewrecordDataList.length; i++) {
        if (viewname === tableviewrecordDataList[i].id) {
          activetableviewItem = tableviewrecordDataList[i];
        }
        console.log(activetableviewItem);
      }
      if (activetableviewItem.keycondition.expression === "beginswith") {
        datasortparambeginswith =
          activetableviewItem.keycondition.value.replacetext;

        for (let j in activetableviewItem.keycondition.value.replaceparams) {
          if (
            activetableviewItem.keycondition.value.replaceparams[j].type ===
            "localdata"
          ) {
            console.log(localdata);
            datasortparambeginswith = datasortparambeginswith.replace(
              j,
              localdata[
                activetableviewItem.keycondition.value.replaceparams[j].name
              ]
            );
          }
        }
        console.log(datasortparambeginswith);
      }
      if (activetableviewItem.keycondition.expression === "equalsto") {
      }
      console.log(datasortparambeginswith);
      if (datasortparamequalsto !== "") {
        dataParams = {
          objectName: tablename,
          objectData: {},
          keyConditions: [
            {
              field: "orgname",
              value: localdata.orgname,
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

      if (datasortparambeginswith !== "") {
        dataParams = {
          objectName: tablename,
          objectData: {},
          keyConditions: [
            {
              field: "orgname",
              value: localdata.orgname,
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

      let dataresult = await getRecorddata(dataParams);
      if (dataresult.isSuccess === "false") {
        alert("data" + dataresult.message);
      } else {
        //  let recordDataList = dataresult.dataprops.Items;
        //  console.log(recordDataList);

        let recordDataList = filterArraybyObject({
          data: dataresult.dataprops.Items,
          filter: defaultdatafilter,
        });
        console.log(recordDataList);
        this.setState(
          {
            showUI: false,
          },
          () => {
            if (recordDataList.length > 0) {
              if (clickedrecordid === "") {
                clickedrecordid = recordDataList[0][recordviewfieldname];
              }
              this.setState({
                recordDataList: recordDataList,
                activetableviewItem: activetableviewItem,
                clickedrecordid: clickedrecordid,
                showUI: true,
                action: "view",
              });
            } else {
              this.setState({
                recordDataList: [],
                activetableviewItem: activetableviewItem,
                showUI: true,
                action: "list",
              });
            }
          }
        );
      }
    }
  }

  clickHandler = (e, props) => {
    let { multiselectclickedrecordids } = this.state;
    let dataset = e.target.dataset;
    let {
      tablename,
      viewname,
      defaulttableviewnamebeginswith,
      comphtmlid,
    } = this.props.compprops;

    if (dataset.type === "new") {
      this.setState({ showUI: false }, () => {
        this.setState({ clickedrecordid: "", showUI: true, action: "new" });
      });
    }
    if (dataset.type === "view") {
      this.setState({ showUI: false }, () => {
        this.setState({
          clickedrecordid: dataset.name,
          showUI: true,
          action: "view",
        });
      });
    }
    if (dataset.type === "multiselectview") {
      if (multiselectclickedrecordids.indexOf(dataset.name) !== -1) {
        let pos = multiselectclickedrecordids.indexOf(dataset.name);
        multiselectclickedrecordids.splice(pos, 1);
      } else {
        multiselectclickedrecordids.push(dataset.name);
      }
      this.setState({ showUI: false }, () => {
        this.setState({
          multiselectclickedrecordids: multiselectclickedrecordids,
          showUI: true,
          action: "multiselectview",
        });
        this.props.createSyncEvent({
          comphtmlid: comphtmlid,
          data: { multiselectclickedrecordids: multiselectclickedrecordids },
        });
      });
    }
    if (dataset.name === "new-create" || dataset.name === "edit-save") {
      this.getRecordListMetadataAndDatafromServer({
        tablename: tablename,
        viewname: viewname,
        defaulttableviewnamebeginswith: defaulttableviewnamebeginswith,
        clickedrecordid: props.recordid,
      });
    }
  };

  changeHanlder = (e) => {
    // let dataset = e.target.dataset;
    // let { recordData } = props;
    // console.log(recordData);
  };

  openwindow = (props) => {
    let { type } = props;
    this.setState({ windowtype: type });
  };

  render() {
    let {
      recordDataList,
      activetableviewItem,
      windowtype,
      clickedrecordid,
      showUI,
      action,
      multiselectclickedrecordids,
    } = this.state;
    let {
      recordviewfieldname,
      showrecordeditview,
      listdisplaytype,
    } = this.props.compprops;
    let recordeditviewprops = this.props.compprops.recordeditviewprops;

    console.log(multiselectclickedrecordids);
    console.log(activetableviewItem);
    let buttonsHtml = [];
    let columns, buttons;

    if (activetableviewItem.data) {
      columns = activetableviewItem.data.columns;
      buttons = activetableviewItem.data.buttons;
    }
    console.log(buttons);
    if (buttons && Object.keys(buttons).length > 0) {
      for (let i in buttons) {
        buttonsHtml.push(
          <button
            data-name={buttons[i].name}
            data-type={buttons[i].name}
            onClick={(e) => this.clickHandler(e, {})}
          >
            {buttons[i].label}
          </button>
        );
      }
    }
    console.log(this.props);
    let multiselectlistHtml = [];
    if (listdisplaytype === "multiselectlist") {
      if (recordDataList) {
        for (let i = 0; i < recordDataList.length; i++) {
          let isclicked = false;
          for (let j = 0; j < multiselectclickedrecordids.length; j++) {
            if (multiselectclickedrecordids[j] === recordDataList[i].id) {
              isclicked = true;
            }
          }
          if (isclicked === true) {
            multiselectlistHtml.push(
              <div
                data-name={recordDataList[i].id}
                data-type="multiselectview"
                onClick={(e) => this.clickHandler(e, {})}
                className="org-bluebg"
              >
                {recordDataList[i].label}
              </div>
            );
          } else {
            multiselectlistHtml.push(
              <div
                data-name={recordDataList[i].id}
                data-type="multiselectview"
                onClick={(e) => this.clickHandler(e, {})}
              >
                {recordDataList[i].label}
              </div>
            );
          }
        }
      }
    }

    return (
      <>
        {showUI === true ? (
          <div>
            {/* <div className="org-fr">
              <div
                onClick={() => {
                  this.openwindow({ type: "hsplit" });
                }}
              >
                hspilt
              </div>
              <div
                onClick={() => {
                  this.openwindow({ type: "vsplit" });
                }}
              >
                vspilt
              </div>
              <div
                onClick={() => {
                  this.openwindow({ type: "over" });
                }}
              >
                overthewindow
              </div>
            </div> */}
            {/* {windowtype === "over" ? (
              <>
                <Tablecomp
                  compprops={{
                    columns: columns,
                    buttons: buttons,
                    recordDataList: recordDataList,
                  }}
                />
                <div
                  style={{
                    position: "fixed",
                    right: 0,
                    top: 0,
                    width: "40%",
                    height: "100%",
                    backgroundColor: "wheat",
                  }}
                  className="sp"
                >
                  <div className="org-fr org-fjc-e">
                    <div></div>
                    <div>
                      <GetFontAwesomeIcon name="close" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )} */}
            {windowtype === "hsplit" && showrecordeditview === "true" ? (
              <div className="org-fr">
                <div className="org-flexbasis-100p org-mflexbasis-30p org-lflexbasis-30p ">
                  {buttonsHtml}
                  {listdisplaytype === "table" ? (
                    <>
                      {" "}
                      <Tablecomp
                        compprops={{
                          columns: columns,
                          buttons: buttons,
                          recordDataList: recordDataList,
                          recordviewfieldname: recordviewfieldname,
                        }}
                        clickHandler={this.clickHandler}
                        changeHanlder={this.changeHanlder}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {listdisplaytype === "multiselectlist" ? (
                    <div className="org-fr">{multiselectlistHtml}</div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="org-flexbasis-100p org-mflexbasis-70p org-lflexbasis-70p  ">
                  <Recorddataeditview
                    {...this.props}
                    compprops={{
                      tablename: recordeditviewprops.tablename,
                      viewlayoutid: recordeditviewprops.viewlayoutid,
                      editlayoutid: recordeditviewprops.editlayoutid,
                      newlayoutid: recordeditviewprops.newlayoutid,
                      action: action,
                      recordid: clickedrecordid,
                      idbeginswith: recordeditviewprops.idbeginswith,
                      //   defaultdatafilter: {},
                    }}
                    styleprops={{
                      width: "100%",
                      height: "30vh",
                      backgroundColor: "",
                      overflow: "auto",
                    }}
                    clickHandler={this.clickHandler}
                    changeHanlder={this.changeHanlder}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {windowtype === "hsplit" && showrecordeditview !== "true" ? (
              <div className="org-fr">
                <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p ">
                  {buttonsHtml}
                  {listdisplaytype === "table" ? (
                    <>
                      {" "}
                      <Tablecomp
                        compprops={{
                          columns: columns,
                          buttons: buttons,
                          recordDataList: recordDataList,
                          recordviewfieldname: recordviewfieldname,
                        }}
                        clickHandler={this.clickHandler}
                        changeHanlder={this.changeHanlder}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {listdisplaytype === "multiselectlist" ? (
                    <div className="org-fr">{multiselectlistHtml}</div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            {/* {windowtype === "vsplit" ? (
              <>
                <div style={{ height: "30vh", overflow: "auto" }}>
                  <Tablecomp
                    compprops={{
                      columns: columns,
                      buttons: buttons,
                      recordDataList: recordDataList,
                    }}
                  />
                  <Tablecomp
                    compprops={{
                      columns: columns,
                      buttons: buttons,
                      recordDataList: recordDataList,
                    }}
                  />
                  <Tablecomp
                    compprops={{
                      columns: columns,
                      buttons: buttons,
                      recordDataList: recordDataList,
                    }}
                  />
                </div>
                <div className="org-fr org-fjc-e org-fai-c org-redbg">
                  <div></div>
                  <div>
                    <GetFontAwesomeIcon name="close" />
                  </div>
                </div>
              </>
            ) : (
              ""
            )} */}
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default F;
