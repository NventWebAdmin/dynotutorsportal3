import React, { Component } from "react";
import Notepad from "./notepad";
import { getRecorddata } from "../db/index";
import {
  // sortArray,
  // fieldTypeHtmltoDBmapping,
  getLocalData,
  // serverButtonHandler,
  filterArraybyObject,
} from "../js/index";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      activeNoteId: "",
      showUI: false,
      createNote: false,
      action: "",
    };
  }

  async componentDidMount() {
    let {
      tablename,
      comphtmlid,
      showallrecordsubscribe,
      parentobjectfilter,
      showallrecords,
      enablelocaldbdata,
      listdisplaytype,
      defaultdatafilter,
      defaultsortparam,
      parentid,
      iscreateactive,
      isviewactive,
      iseditactive,
      isdeleteactive,
    } = this.props.compprops;
    console.log(comphtmlid);
    console.log(showallrecordsubscribe);
    console.log(parentobjectfilter);
    console.log(showallrecords);
    console.log(listdisplaytype);
    console.log(defaultdatafilter);
    console.log(iscreateactive);
    console.log(isviewactive);
    console.log(iseditactive);
    console.log(isdeleteactive);

    let props = {
      tablename: tablename,
      defaultsortparam: defaultsortparam,
      enablelocaldbdata: enablelocaldbdata,
      parentid: parentid,
      //  defaultdatafilter: defaultdatafilter,
      activeNoteId: "",
      action: "",
    };
    await this.getServerData(props);
  }

  getServerData = async (props) => {
    let {
      defaultdatafilter,
      showallrecordsubscribe,
      parentobjectfilter,
      showallrecords,
    } = this.props.compprops;
    let {
      tablename,
      defaultsortparam,
      //  enablelocaldbdata,
      parentid,
      //  defaultdatafilter,
      activeNoteId,
      action,
      //  showallrecordsubscribe,
      //  parentobjectfilter,
      //  showallrecords,
    } = props;
    console.log(props);
    let localdata = getLocalData(this.props);

    let dataParamsresult = {};
    let rsdataParamsresult = {};
    let dataParamsBeginswith = "";
    let recordData = [];
    let recordDataFinal = [];
    let rsData = [];
    // let rsDataFinal = [];

    if (
      showallrecordsubscribe === "true" ||
      Object.keys(parentobjectfilter).length > 0 ||
      showallrecords === "true"
    ) {
      dataParamsBeginswith = defaultsortparam + "-";
    } else {
      dataParamsBeginswith = defaultsortparam + "-" + parentid;
    }

    dataParamsresult = await getRecorddata({
      objectName: tablename,
      objectData: {},
      keyConditions: [
        { field: "orgname", value: localdata.orgname, expression: "=" },
        {
          field: "id",
          value: dataParamsBeginswith,
          expression: "beginswith",
        },
      ],
      filterConditions: [],
    });
    if (dataParamsresult.isSuccess === "false") {
      alert("url not found");
    } else {
      recordData = dataParamsresult.dataprops.Items;
    }
    console.log(recordData);

    if (
      showallrecordsubscribe === "true" ||
      Object.keys(parentobjectfilter).length > 0
    ) {
      rsdataParamsresult = await getRecorddata({
        objectName: parentobjectfilter.objectname,
        objectData: {},
        keyConditions: [
          {
            field: "orgname",
            value: localdata.orgname,
            expression: "=",
          },
          {
            field: "id",
            value: parentobjectfilter.beginswith + localdata.userid,
            expression: "beginswith",
          },
        ],
        filterConditions: [],
        pageSize: "",
        limit: "",
        exclusiveStartKey: "",
      });

      if (rsdataParamsresult.isSuccess === "false") {
        alert("url not found");
      } else {
        rsData = rsdataParamsresult.dataprops.Items;
        console.log(rsData);
        let subscribetoIds = [];
        for (let i = 0; i < rsData.length; i++) {
          let rsDatavar = rsData[i];
          subscribetoIds.push(rsDatavar[parentobjectfilter.fieldname]);
        }
        console.log(subscribetoIds);
        for (let j = 0; j < recordData.length; j++) {
          let recordDataVar = recordData[j];
          if (
            subscribetoIds.indexOf(
              recordDataVar[parentobjectfilter.childfieldname]
            ) !== -1 ||
            recordDataVar[parentobjectfilter.childfieldname] ===
              localdata.userid
          ) {
            recordDataFinal.push(recordData[j]);
          }
        }
      }
    } else {
      recordDataFinal = recordData;
    }
    console.log(recordDataFinal);
    recordDataFinal = filterArraybyObject({
      data: recordDataFinal,
      filter: defaultdatafilter,
    });

    if (recordDataFinal.length > 0) {
      if (activeNoteId === "" && recordDataFinal.length > 0) {
        activeNoteId = recordDataFinal[0].id;
      }

      if (action === "") {
        action = recordDataFinal[0] ? "view" : "create";
      }

      this.setState({ showUI: false }, () => {
        this.setState({
          showUI: true,
          notes: recordDataFinal,
          activeNoteId: activeNoteId,
          // createNote: filtereddata[0] ? false : true,
          action: action,
        });
      });
    } else {
      this.setState({ showUI: false }, () => {
        this.setState({
          showUI: true,
          notes: [],
          activeNoteId: "",
          action: "create",
          //createNote: true,
        });
      });
    }
  };

  noteHeadingClk = (noteid) => {
    this.setState({ showUI: false }, () => {
      this.setState({
        showUI: true,
        activeNoteId: noteid,
        //  createNote: false,
        action: "view",
      });
    });
  };
  addNote = () => {
    let { notes } = this.state;
    notes.push({});
    this.setState({ showUI: false }, () => {
      this.setState({ showUI: true, activeNoteId: "", action: "create" });
    });
  };

  refreshNote = async (props) => {
    let { noteid } = props;
    let {
      tablename,
      defaultsortparam,
      enablelocaldbdata,
      parentid,
      //    showallrecordsubscribe,
      //   parentobjectfilter,
      //   showallrecords,
    } = this.props.compprops;
    let serverprops = {
      tablename: tablename,
      defaultsortparam: defaultsortparam,
      enablelocaldbdata: enablelocaldbdata,
      parentid: parentid,
      //  defaultdatafilter: defaultdatafilter,
      activeNoteId: noteid,
      action: "view",
    };

    await this.getServerData(serverprops);
    // this.setState({ showUI: false }, () => {
    //   this.setState({
    //     showUI: true,
    //     activeNoteId: noteid,
    //     createNote: false,
    //   });
    // });
  };
  childnoteHandler = async (props) => {
    let { recordid, action } = props;
    let {
      tablename,
      defaultsortparam,
      enablelocaldbdata,
      parentid,
    } = this.props.compprops;
    let serverprops = {
      tablename: tablename,
      defaultsortparam: defaultsortparam,
      enablelocaldbdata: enablelocaldbdata,
      parentid: parentid,
      //  defaultdatafilter: defaultdatafilter,
      activeNoteId: recordid,
      action: action,
    };

    await this.getServerData(serverprops);
    // this.setState({ showUI: false }, () => {
    //   this.setState({
    //     showUI: true,
    //     activeNoteId: noteid,
    //     createNote: false,
    //   });
    // });
  };

  render() {
    let {
      iscreateactive,
      //   isviewactive,
      iseditactive,
      isdeleteactive,
    } = this.props.compprops;
    let { notes, activeNoteId, showUI, action } = this.state;
    console.log(this.props.compprops);
    let mainpanelHtml = [];
    let notepageHtml = [];
    let notesHtml = [];
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === activeNoteId) {
        notesHtml.push(
          <div
            onClick={() => {
              this.noteHeadingClk(notes[i].id);
            }}
            className="org-greybg"
          >
            {notes[i].label}
          </div>
        );
      } else {
        notesHtml.push(
          <div
            onClick={() => {
              this.noteHeadingClk(notes[i].id);
            }}
          >
            {notes[i].label}
          </div>
        );
      }
    }
    // if (notes.length > 0 && activeNoteId === "") {
    //   activeNoteId = notes[0].id;
    // }

    notepageHtml.push(
      <div className="org-fr">
        <div className="org-flexbasis-100p org-mflexbasis-10p org-lflexbasis-10p">
          {notesHtml}

          {action === "list" || action === "view" ? (
            iscreateactive === "true" ? (
              <div onClick={this.addNote}>+</div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="org-flexbasis-100p org-mflexbasis-90p org-lflexbasis-90p">
          {showUI === false ? (
            ""
          ) : (
            <Notepad
              {...this.props}
              noteid={activeNoteId}
              iseditactive={iseditactive}
              isdeleteactive={isdeleteactive}
              // createNote={createNote}
              action={action}
              //   refreshNote={this.refreshNote}
              childnoteHandler={this.childnoteHandler}
              //   defaultdatafilter={defaultdatafilter}
            />
          )}
        </div>
      </div>
    );
    mainpanelHtml.push(notepageHtml);

    return <>{mainpanelHtml}</>;
  }
}

export default F;
