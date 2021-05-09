import React, { Component } from "react";
import {
  getRecorddata,
  createRecord,
  updateRecord,
  bulkcreateRecord,
  deleteRecord,
} from "../db/index";
import {
  sortArray,
  fieldTypeHtmltoDBmapping,
  getLocalData,
  getDynamicCompPropsData,
  serverButtonHandler,
  dataReplaceHandler,
} from "../js/index";
import Htmlform from "./htmlformnew";
import Calender from "./calender";
import Note from "./notepadlist";
import { GetLocalIcon, GetGoogleIcon } from "./icons";
import Recorddatarelatedlist from "./recorddatarelatedlist2";
/*
 

*/
class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutrecordData: {},
      recordData: {},
      showUI: false,
      activeTabName: "",
    };
  }

  async componentDidMount() {
    let {
      newlayoutid,
      viewlayoutid,
      editlayoutid,
      tablename,
      recordid,
      action,
    } = this.props.compprops;
    let props = {};
    props.tablename = tablename;

    if (action === "view") {
      props.layoutid = viewlayoutid;
      props.recordid = recordid;
      await this.getServerData(props);
    }
    if (action === "new") {
      props.layoutid = newlayoutid;
      props.recordid = "";
      await this.getServerData(props);
    }
  }
  getServerData = async (props) => {
    console.log(props);
    let { layoutid, tablename, recordid } = props;
    let localdata = getLocalData(this.props);
    // if (recordid != "") {
    //   localdata.recordid = recordid;
    // }

    let layoutdataParams = {
      objectName: "tablelayout",
      objectData: {},
      keyConditions: [
        {
          field: "orgname",
          value: localdata.orgname,
          expression: "=",
        },
        {
          field: "id",
          value: layoutid,
          expression: "beginswith",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };
    console.log(layoutdataParams);
    let layoutdataresult = await getRecorddata(layoutdataParams);
    if (layoutdataresult.isSuccess === "false") {
      alert("data" + layoutdataresult.message);
    } else {
      let layoutrecordDataList = layoutdataresult.dataprops.Items;
      console.log(layoutrecordDataList);

      if (recordid === "") {
        this.setState({ showUI: false }, () => {
          this.setState({
            layoutrecordData: layoutrecordDataList[0],
            recordData: {},
            showUI: true,
          });
        });
      } else {
        let dataParams = {
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
              value: recordid,
              expression: "=",
            },
          ],
          filterConditions: [],
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
          if (recordDataList.length > 0) {
            this.setState({ showUI: false }, () => {
              this.setState({
                layoutrecordData: layoutrecordDataList[0],
                recordData: recordDataList[0],
                showUI: true,
              });
            });
          }
        }
      }
    }
  };

  saveRecord = async (e, props) => {
    let {
      viewlayoutid,
      editlayoutid,
      tablename,
      recordid,
      //   defaultdatafilter,
    } = this.props.compprops;
    let { layoutbuttonresult } = props;

    let { recordData } = this.state;
    // let result = await updateRecord({
    //   objectName: tablename,
    //   objectData: recordData,
    // });
    // if (result.isSuccess === "false") {
    //   alert(result.message);
    // } else {
    //   let props = {};
    //   props.tablename = tablename;
    //   props.layoutid = viewlayoutid;
    //   props.recordid = recordData.id;
    //   // await this.getServerData(props);
    //   this.props.clickHandler(e, { recordid: recordData.id });
    // }

    let objectPrimaryKeyValue = {
      orgname: recordData.orgname,
      id: recordData.id,
    };

    const target = {};

    let recordDataUpdating = Object.assign(
      target,
      layoutbuttonresult.recordData
    );
    delete recordDataUpdating.orgname;
    delete recordDataUpdating.id;
    // console.log(defaultdatafilter);
    // if (defaultdatafilter && Object.keys(defaultdatafilter).length > 0) {
    //   for (let i in defaultdatafilter) {
    //     recordDataUpdating[i] = defaultdatafilter[i];
    //   }
    // }
    console.log(recordDataUpdating);
    let result = await updateRecord({
      objectName: tablename,
      objectPrimaryKeyValue: objectPrimaryKeyValue,
      objectData: recordDataUpdating,
    });
    if (result.isSuccess === "false") {
      alert(result.message);
    } else {
      let props = {};
      props.tablename = tablename;
      props.layoutid = viewlayoutid;
      props.recordid = recordData.id;
      this.props.clickHandler(e, { recordid: recordData.id });
    }
  };

  deleteRecord = async () => {
    let {
      viewlayoutid,
      editlayoutid,
      tablename,
      recordid,
    } = this.props.compprops;
    let { recordData } = this.state;
    let localdata = getLocalData(this.props);

    let result = await deleteRecord({
      objectName: tablename,
      objectPrimaryKeyValue: { id: recordData.id, orgname: localdata.orgname },
    });
    if (result.isSuccess === "false") {
      alert(result.message);
    } else {
      window.location.reload();
    }
  };

  editRecord = async () => {
    let { recordData } = this.state;
    let {
      viewlayoutid,
      editlayoutid,
      tablename,
      recordid,
    } = this.props.compprops;
    let props = {};
    props.tablename = tablename;
    props.layoutid = editlayoutid;
    props.recordid = recordData.id;
    await this.getServerData(props);
  };

  createRecord = async (e, props) => {
    let localdata = getLocalData(this.props);
    let {
      viewlayoutid,
      editlayoutid,
      tablename,
      recordid,
      // defaultdatafilter,
    } = this.props.compprops;
    let { layoutbuttonresult } = props;

    let { recordData } = this.state;
    // console.log(recordData);
    // recordData.orgname = localdata.orgname;
    // let n = new Date();
    // recordData.id = idbeginswith + "-" + localdata.userid + "-" + n.getTime();

    // if (Object.keys(defaultdatafilter).length > 0) {
    //   for (let i in defaultdatafilter) {
    //     recordData[i] = defaultdatafilter[i];
    //   }
    // }
    // alert();

    let result = await createRecord({
      objectName: tablename,
      objectData: layoutbuttonresult.recordData,
    });
    if (result.isSuccess === "false") {
      alert(result.message);
    } else {
      let props = {};
      props.tablename = tablename;
      props.layoutid = viewlayoutid;
      props.recordid = recordData.id;
      //  await this.getServerData(props);
      this.props.clickHandler(e, { recordid: recordData.id });
    }
  };

  cancelEdit = async () => {
    let { recordData } = this.state;
    let {
      viewlayoutid,
      editlayoutid,
      tablename,
      recordid,
    } = this.props.compprops;
    let props = {};
    props.tablename = tablename;
    props.layoutid = viewlayoutid;
    props.recordid = recordData.id;
    await this.getServerData(props);
  };

  // changeHanlder = (e) => {
  //   let dataset = e.target.dataset;
  //   let { recordData } = this.state;
  //   recordData[dataset.name] = e.target.value;
  //   console.log(recordData);
  //   this.setState({ recordData: recordData });
  // };

  changeHanlder = (e, props) => {
    let {
      inputLabel,
      inputName,
      inputType,
      clientstatename,
      clientstatetype,
      inputValue,
    } = props;
    console.log(inputName);
    let { recordData } = this.state;
    if (inputName.includes(".")) {
      let fieldnamearray = inputName.split(".");
      if (recordData[fieldnamearray[0]]) {
        recordData[fieldnamearray[0]][fieldnamearray[1]] = inputValue;
      } else {
        let fieldvalueobj = {};
        fieldvalueobj[fieldnamearray[1]] = inputValue;
        recordData[fieldnamearray[0]] = fieldvalueobj;
      }
    } else {
      recordData[inputName] = inputValue;
    }
    this.setState({ recordData: recordData });
  };

  layoutButtonHandler = async (props) => {
    console.log(this.props);
    console.log(this.props);
    // let { defaultdatafilter } = this.props.compprops;
    let { buttonProps } = props;
    let { recordData, layoutrecordData } = this.state;
    let localdata = getLocalData(this.props);
    let buttons = layoutrecordData.compprops.buttons;
    let error = "";
    for (let i in buttons) {
      if (buttons[i].name === buttonProps.name) {
        console.log(buttons[i]);
        let validations = buttons[i].action.validations;
        let datareplaceparams = buttons[i].action.datareplaceparams;
        let redirection = buttons[i].action.redirection;
        console.log(datareplaceparams);
        if (datareplaceparams && Object.keys(datareplaceparams).length > 0) {
          recordData = await dataReplaceHandler({
            localdata: localdata,
            recorddata: recordData,
            datareplaceparams: datareplaceparams,
            //   defaultdatafilter: defaultdatafilter,
            compprops: this.props.compprops,
          });
        }

        if (validations && Object.keys(validations).length > 0) {
          error = this.validateHandler({
            recorddata: recordData,
            validations: validations,
          });
        }
      }
    }
    console.log(recordData);
    let resultProps = { error: error, recordData: recordData };
    return resultProps;
  };

  clickHandler = async (e) => {
    let { recordData } = this.state;
    let dataset = e.target.dataset;
    if (dataset.name === "new-cancel") {
      window.location.reload();
    }
    if (dataset.name === "new-create") {
      let layoutbuttonresult = await this.layoutButtonHandler({
        buttonProps: { name: "new-create" },
      });
      if (layoutbuttonresult.error === "") {
        this.createRecord(e, { layoutbuttonresult: layoutbuttonresult });
      }
    }

    if (dataset.name === "edit-cancel") {
      this.cancelEdit();
    }
    if (dataset.name === "edit-save") {
      let layoutbuttonresult = await this.layoutButtonHandler({
        buttonProps: { name: "edit-save" },
      });
      if (layoutbuttonresult.error === "") {
        this.saveRecord(e, { layoutbuttonresult: layoutbuttonresult });
      }
    }

    if (dataset.name === "view-delete") {
      this.deleteRecord();
    }
    if (dataset.name === "view-edit") {
      this.editRecord();
    }

    if (dataset.type === "mainpaneltab") {
      // let url = new URL(document.location);
      // let newurl = new URL(
      //   url.pathname + "?id=" + recordData.id + "&mainpaneltab=" + dataset.name,
      //   url.origin
      // );
      // window.location.assign(newurl);

      this.setState({ showUI: false }, () => {
        this.setState({
          activeTabName: dataset.name,
          showUI: true,
        });
      });
    }
  };

  // validate = () => {
  //   let { layoutrecordData, recordData, showUI } = this.state;
  //   let validations = layoutrecordData.compprops.validations;
  //   return this.validateHandler({
  //     recorddata: recordData,
  //     validations: validations,
  //   });
  // };

  validateHandler = (props) => {
    let error = "";
    let { recorddata, validations } = props;
    console.log(props);
    let requiredfields = validations.requiredfields;
    if (Object.keys(requiredfields).length > 0) {
      for (let i in requiredfields) {
        if (recorddata[i] == "" || recorddata[i] == undefined) {
          error = error + "  " + requiredfields[i] + ", ";
        }
      }
    }
    if (error !== "") {
      alert(error + "is required");
    }
    return error;
  };

  render() {
    console.log(this.props);

    let localdata = getLocalData(this.props);
    let url = new URL(document.location);
    // var searchParams = new URLSearchParams(url.search);
    let { action, recordid } = this.props.compprops;

    let { layoutrecordData, recordData, showUI, activeTabName } = this.state;
    let highlightpanel,
      tabs,
      relatedlist,
      buttons,
      mainpanelwidth,
      relatedlistwidth,
      mainpanelclass,
      relatedlistclass,
      defaultmainpaneltab;

    console.log(layoutrecordData);
    console.log(recordData);

    if (Object.keys(layoutrecordData).length > 0) {
      console.log(layoutrecordData.compprops);
      console.log(layoutrecordData.compprops.highlightpanel);
      buttons = layoutrecordData.compprops.buttons;
      highlightpanel = layoutrecordData.compprops.highlightpanel;
      tabs = layoutrecordData.compprops.mainpaneltabs;

      defaultmainpaneltab = layoutrecordData.compprops.defaultmainpaneltab;
      //  if (searchParams.get("mainpaneltab")) {
      //    defaultmainpaneltab = searchParams.get("mainpaneltab");
      //  }
      if (activeTabName != "") {
        defaultmainpaneltab = activeTabName;
      }
      relatedlist = layoutrecordData.compprops.relatedlist;
      mainpanelwidth = layoutrecordData.compprops.mainpanelwidth;
      relatedlistwidth = layoutrecordData.compprops.relatedlistwidth;

      mainpanelclass =
        "org-flexbasis-100p org-mflexbasis-" +
        mainpanelwidth +
        " " +
        "org-lflexbasis-" +
        mainpanelwidth;
      relatedlistclass =
        "org-flexbasis-100p org-mflexbasis-" +
        relatedlistwidth +
        " " +
        "org-lflexbasis-" +
        relatedlistwidth;
    }

    let mainPanelHtml = [];
    let introHtml = [];
    let tabHtml = [];
    let detailContentHtml = [];
    let relatedContentHtml = [];
    let relatedHtml = [];
    let activetab = defaultmainpaneltab;

    let highlightpanelColumnHtml = [];
    let tabheaderHtml = [];

    // layout buttons
    let buttonsArray = [];
    let buttonsArraySorted = [];
    if (buttons && Object.keys(buttons).length > 0) {
      for (let i in buttons) {
        buttonsArray.push(buttons[i]);
      }
      buttonsArraySorted = sortArray(buttonsArray, "order", "integer");
    }

    let buttonsHtml = [];
    if (buttonsArraySorted.length > 0) {
      for (let i = 0; i < buttonsArraySorted.length; i++) {
        buttonsHtml.push(
          <button
            data-name={buttonsArraySorted[i].name}
            onClick={this.clickHandler}
          >
            {buttonsArraySorted[i].label}
          </button>
        );
      }
      detailContentHtml.push(<div className=" ">{buttonsHtml}</div>);
    }

    // highlightpanel >>
    if (highlightpanel && highlightpanel.fields) {
      let nooffields = Object.keys(highlightpanel.fields).length;
      let percentage = 100 / nooffields;
      if (nooffields === 3) {
        percentage = 33;
      }
      let percentageClass =
        "org-flexbasis-100p org-mflexbasis-" +
        percentage +
        "p org-lflexbasis-" +
        percentage +
        "p";

      let highlightpanelfieldArray = [];
      let highlightpanelfieldArraySorted = [];
      if (
        highlightpanel.fields &&
        Object.keys(highlightpanel.fields).length > 0
      ) {
        for (let i in highlightpanel.fields) {
          highlightpanelfieldArray.push(highlightpanel.fields[i]);
        }
        highlightpanelfieldArraySorted = sortArray(
          highlightpanelfieldArray,
          "order",
          "integer"
        );
      }

      for (let i = 0; i < highlightpanelfieldArraySorted.length; i++) {
        highlightpanelColumnHtml.push(
          <div className={percentageClass}>
            <div>{highlightpanelfieldArraySorted[i].label}</div>
            <div>{recordData[highlightpanelfieldArraySorted[i].name]}</div>
          </div>
        );
      }
      detailContentHtml.push(
        <div className="org-fr ">{highlightpanelColumnHtml}</div>
      );
    }

    // highlightpanel <<
    console.log(tabs);
    // tab content >>
    let tabsArray = [];
    let tabsArraySorted = [];
    if (tabs && Object.keys(tabs).length > 0) {
      for (let i in tabs) {
        tabsArray.push(tabs[i]);
      }
      tabsArraySorted = sortArray(tabsArray, "order", "integer");
    }

    if (tabsArraySorted.length > 0) {
      if (tabsArraySorted.length > 1) {
        for (let i = 0; i < tabsArraySorted.length; i++) {
          if (activetab === tabsArraySorted[i].name) {
            tabheaderHtml.push(
              <div
                className="sp org-lightgreybg"
                data-name={tabsArraySorted[i].name}
                data-type="mainpaneltab"
                onClick={this.clickHandler}
              >
                {tabsArraySorted[i].label}
              </div>
            );
          } else {
            tabheaderHtml.push(
              <div
                data-name={tabsArraySorted[i].name}
                data-type="mainpaneltab"
                className="sp"
                onClick={this.clickHandler}
              >
                {tabsArraySorted[i].label}
              </div>
            );
          }
        }

        detailContentHtml.push(<div className="org-fr ">{tabheaderHtml}</div>);
      }
      for (let i = 0; i < tabsArraySorted.length; i++) {
        if (activetab === tabsArraySorted[i].name) {
          let tabcontenthtml = [];

          if (
            tabsArraySorted[i].sections &&
            tabsArraySorted[i].type === "recorddata"
          ) {
            for (let j in tabsArraySorted[i].sections) {
              let sectionHtml = [];
              let sectionHtml1 = [];
              let dataprops = [];

              for (let k in tabsArraySorted[i].sections[j].columns) {
                let defaultvalue = "";
                console.log(recordData);
                if (action == "view") {
                  // if name is object
                  let fieldname =
                    tabsArraySorted[i].sections[j].columns[k].name;
                  if (fieldname.includes(".")) {
                    let fieldnamearray = fieldname.split(".");
                    defaultvalue = recordData[fieldnamearray[0]]
                      ? recordData[fieldnamearray[0]][fieldnamearray[1]]
                      : "";
                  } else {
                    defaultvalue =
                      recordData[
                        tabsArraySorted[i].sections[j].columns[k].name
                      ];
                  }
                } else {
                  defaultvalue = tabsArraySorted[i].sections[j].columns[k]
                    .defaultvalue
                    ? tabsArraySorted[i].sections[j].columns[k].defaultvalue
                    : "";
                }

                dataprops.push({
                  label: tabsArraySorted[i].sections[j].columns[k].label
                    ? tabsArraySorted[i].sections[j].columns[k].label
                    : "",
                  name: tabsArraySorted[i].sections[j].columns[k].name
                    ? tabsArraySorted[i].sections[j].columns[k].name
                    : "",
                  defaultvalue: defaultvalue,

                  type: tabsArraySorted[i].sections[j].columns[k].type
                    ? tabsArraySorted[i].sections[j].columns[k].type
                    : "",
                  clientstatename: tabsArraySorted[i].sections[j].columns[k]
                    .clientstatename
                    ? tabsArraySorted[i].sections[j].columns[k].clientstatename
                    : "",
                  clientstatetype: tabsArraySorted[i].sections[j].columns[k]
                    .clientstatetype
                    ? tabsArraySorted[i].sections[j].columns[k].clientstatetype
                    : "",
                  width: tabsArraySorted[i].sections[j].columns[k].width
                    ? tabsArraySorted[i].sections[j].columns[k].width
                    : "",
                  height: tabsArraySorted[i].sections[j].columns[k].height
                    ? tabsArraySorted[i].sections[j].columns[k].height
                    : "",
                  placeholder: tabsArraySorted[i].sections[j].columns[k]
                    .placeholder
                    ? tabsArraySorted[i].sections[j].columns[k].placeholder
                    : "",
                  required: tabsArraySorted[i].sections[j].columns[k].required
                    ? tabsArraySorted[i].sections[j].columns[k].required
                    : "",
                });
              }

              tabcontenthtml.push(<div className="org-fr">{sectionHtml}</div>);
              tabcontenthtml.push(
                <div className="org-fr">
                  <Htmlform
                    inputChanged={this.changeHanlder}
                    clkHandler={this.clkHandler}
                    inputKeyUp={this.inputKeyUp}
                    dataprops={dataprops}
                    bgcolor=""
                    activeTabName="1"
                  />
                </div>
              );
            }
          }
          if (tabsArraySorted[i].type === "component") {
            let compprops = tabsArraySorted[i].compprops;
            console.log(compprops);
            // let compprops2 = {
            //   orgname: "preply",
            //   userprofileid: "guest",
            //   userid: "usr-pradeep",
            //   tablename: "event",
            //   datadisplaytype: "",
            //   viewname: "",
            //   defaultsortparam: "evt",
            //   hidesidebar: "true",
            //   hidedisplaytypepanel: "true",
            //   enablelocaldbdata: "true",
            //   defaultdatafilter: {
            //     subject: "maths",
            //     class: "first",
            //   },
            // };
            // let compprops3 = {
            //   orgname: { value: "", type: "localdata", name: "orgname" },
            //   userprofileid: {
            //     value: "",
            //     type: "localdata",
            //     name: "userprofileid",
            //   },
            //   userid: { value: "", type: "localdata", name: "userid" },
            //   tablename: { value: "event", type: "text", name: "" },
            //   datadisplaytype: { value: "", type: "text", name: "" },
            //   viewname: { value: "", type: "text", name: "" },
            //   defaultsortparam: { value: "evt", type: "text", name: "" },
            //   hidesidebar: { value: "true", type: "text", name: "" },
            //   hidedisplaytypepanel: { value: "true", type: "text", name: "" },
            //   enablelocaldbdata: { value: "true", type: "text", name: "" },
            //   defaultdatafilter: {
            //     value: {
            //       subject: "maths",
            //       class: "first",
            //     },
            //     type: "object",
            //     name: "",
            //   },
            // };

            let finalcompprops = getDynamicCompPropsData({
              compprops: compprops,
              localdata: localdata,
              recorddata: recordData,
            });
            console.log(finalcompprops);
            /*
            let compprops =    {
              orgname: { "value" : "" , "type":"localdata", "name":"orgname"},
              userprofileid: { "value" : "" , "type":"localdata", "name":"userprofileid"},
              userid: { "value" : "" , "type":"localdata", "name":"userid"},
              tablename: { "value" : "event" , "type":"text", "name":""},
              datadisplaytype: { "value" : "" , "type":"text", "name":""},
              viewname: { "value" : "" , "type":"text", "name":""},
              defaultsortparam: { "value" : "evt" , "type":"text", "name":""},,
              hidesidebar:{ "value" : "true" , "type":"text", "name":""},,
              hidedisplaytypepanel: { "value" : "true" , "type":"text", "name":""},
              enablelocaldbdata: { "value" : "true" , "type":"text", "name":""},
              defaultdatafilter: { "value" : {
                subject: "maths",
                class: "first",
              } , "type":"object", "name":""} ,
            };

            */

            if (tabsArraySorted[i].componentname === "calender") {
              tabcontenthtml.push(
                <div className="org-lightgreybg" style={{ width: "100%" }}>
                  <Calender {...this.props} compprops={finalcompprops} />
                </div>
              );
            }

            if (tabsArraySorted[i].componentname === "note") {
              tabcontenthtml.push(
                <div style={{ width: "100%", overflow: "auto" }}>
                  <Note {...this.props} compprops={finalcompprops} />
                </div>
              );
            }
          }
          detailContentHtml.push(tabcontenthtml);
        }
      }
    }
    // relatedlist >>
    let relatedlistHtml = [];
    if (relatedlist) {
      for (let i in relatedlist) {
        relatedlistHtml.push(
          <>
            <Recorddatarelatedlist
              {...this.props}
              compprops={{ metadata: relatedlist[i] }}
            />
          </>
        );
      }
    }
    // relatedlist <<

    mainPanelHtml.push(
      <div className="org-fr">
        <div className={mainpanelclass}>{detailContentHtml}</div>
        <div className={relatedlistclass}>{relatedlistHtml}</div>
      </div>
    );
    // tabpanel <<

    return <>{showUI === true ? mainPanelHtml : ""}</>;
  }
}

export default F;
