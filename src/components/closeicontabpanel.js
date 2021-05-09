import React, { Component } from "react";
import {
  sortArray,
  fieldTypeHtmltoDBmapping,
  getLocalData,
  serverButtonHandler,
} from "../js/index";
import {
  GetGoogleIcon,
  GetFontAwesomeIcon,
  GetBoostrapIcon,
  GetLocalIcon,
} from "./icons";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";

// events
// update tabpanel tabs
//  this.setState({
//   datasyncEventprops: {
//     name: "addtab",
//     data: { label: "newlabel", name: "newname" },
//     componenthtmlid: "all",
//   },
// });

export default class F extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mainpanelHtml: [] };
  }

  async componentDidMount() {
    console.log(this.props.compprops);
    let {
      orgname,
      userprofileid,
      userid,
      recordid,
      tablename,
      actionname,
      tabactionid,
      lastcloseiconactionid,
      listnviewhomeactionid,
    } = this.props.compprops;
    let tabs = {};
    let activetab = "";

    let localStorageDataString = localStorage.getItem(
      "listnviewpanel-" + tablename
    );
    let localStorageData = JSON.parse(localStorageDataString);

    // if list  page url
    if (recordid == null) {
      activetab = "listhome";
      // if local storage data exists
      if (localStorageData) {
        let isRecExists = false;

        for (let rec in localStorageData) {
          if (localStorageData[rec].name == activetab) {
            isRecExists = true;
          }
        }

        // if list not exists in localdata
        if (isRecExists == false) {
          for (let rec in localStorageData) {
            let olddata = localStorageData[rec];
            localStorageData[rec].order = parseInt(olddata.order) + 1;
          }

          localStorageData[activetab.toLowerCase()] = {
            order: 0,
            label: "listhome",
            name: "listhome",
            action: { type: "layoutaction", id: listnviewhomeactionid },
          };
        }
      } else {
        localStorageData = {};
        localStorageData[activetab.toLowerCase()] = {
          order: "0",
          label: "listhome",
          name: "listhome",
          action: { type: "layoutaction", id: listnviewhomeactionid },
        };
      }

      localStorage.setItem(
        "listnviewpanel-" + tablename,
        JSON.stringify(localStorageData)
      );

      // get all tabs and active tab from local storage, and update component ui
      tabs = JSON.parse(localStorage.getItem("listnviewpanel-" + tablename));
      this.setComponentData(tabs, activetab);
    } else {
      alert("TEs");
      // if record  page
      let dataParams = {};
      dataParams = {
        objectName: tablename,
        objectData: {},
        keyConditions: [
          { field: "orgname", value: orgname, expression: "=" },
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

      // get recorddata to get record id label to display on tab panel
      let dataresult = await getRecorddata(dataParams);
      if (dataresult.isSuccess === "false") {
        alert("data" + dataresult.message);
      } else {
        let recordDataList = dataresult.dataprops.Items;
        console.log(recordDataList[0]);
        activetab = recordDataList[0].id;

        let isRecExists = false;
        let totalNoofRec = 0;

        // if  local storage exists
        if (localStorageData) {
          for (let rec in localStorageData) {
            // new tab order
            totalNoofRec = totalNoofRec + 1;

            // if record id tab already exist in localstorage tabs
            if (localStorageData[rec].name == activetab) {
              isRecExists = true;
            }
          }
          if (isRecExists == false) {
            localStorageData[activetab.toLowerCase()] = {
              order: totalNoofRec,
              label: recordDataList[0].name,
              name: recordDataList[0].id.toLowerCase(),
              action: { type: "layoutaction", id: tabactionid },
            };
          }
        } else {
          // if tabs local storage not exists
          localStorageData = {};
          localStorageData["listhome"] = {
            order: 0,
            label: "listhome",
            name: "listhome",
            action: { type: "layoutaction", id: listnviewhomeactionid },
          };
          localStorageData[activetab.toLowerCase()] = {
            order: 1,
            label: recordDataList[0].name,
            name: recordDataList[0].id.toLowerCase(),
            action: { type: "layoutaction", id: tabactionid },
          };
        }

        localStorage.setItem(
          "listnviewpanel-" + tablename,
          JSON.stringify(localStorageData)
        );

        tabs = JSON.parse(localStorage.getItem("listnviewpanel-" + tablename));
        this.setComponentData(tabs, activetab);
        console.log(activetab);
      }
    }
  }

  // when datasyncevent is came from parent comps
  componentDidUpdate = async (prevProps) => {
    let {
      orgname,
      userprofileid,
      userid,
      recordid,
      tablename,
      actionname,
      tabactionid,
      lastcloseiconactionid,
      listnviewhomeactionid,
    } = this.props.compprops;
    let { componenthtmlid } = this.props;
    console.log(this.props);
    let datasyncEventprops = this.props.datasyncEventprops;

    if (
      prevProps &&
      JSON.stringify(this.props.datasyncEventprops) !=
        JSON.stringify(prevProps.datasyncEventprops)
    ) {
      if (
        datasyncEventprops.componenthtmlid == "all" ||
        datasyncEventprops.componenthtmlid == componenthtmlid
      ) {
        if (datasyncEventprops.name == "addtab") {
          let addedtabdetail = datasyncEventprops.data;
          let tabsObj = JSON.parse(
            localStorage.getItem("listnviewpanel-" + tablename)
          );
          let addedtaborder = Object.keys(tabsObj).length + 1;
          tabsObj[addedtabdetail.name.toLowerCase()] = {
            order: addedtaborder,
            label: addedtabdetail.label,
            name: addedtabdetail.name.toLowerCase(),
            action: { type: "layoutaction", id: tabactionid },
          };
          localStorage.setItem(
            "listnviewpanel-" + tablename,
            JSON.stringify(tabsObj)
          );

          let activetab = "";
          if (recordid == null) {
            activetab = "listhome";
          } else {
            activetab = recordid;
          }
          this.setComponentData(tabsObj, activetab);
        }
      }
    }
  };

  setComponentData = (tabs, activetab) => {
    console.log(tabs);
    let tabsHtml = [];

    let dataprops = tabs;
    let activeTabName = activetab;
    // sort tabs by order
    let datapropsarray = [];
    let datapropsarraysorted = [];
    for (let i in dataprops) {
      datapropsarray.push(dataprops[i]);
    }
    datapropsarraysorted = sortArray(datapropsarray, "order", "integer");

    // order 0 activetab
    if (activeTabName == "" || activeTabName == undefined) {
      activeTabName = datapropsarraysorted[0].name;
    }

    // iterate over tabs
    for (let i = 0; i < datapropsarraysorted.length; i++) {
      console.log(datapropsarraysorted[i]);
      console.log(activeTabName);

      tabsHtml.push(
        <>
          {/* if list tab */}
          {datapropsarraysorted[i].name == "listhome" ? (
            <div
              className={
                datapropsarraysorted[i].name == activeTabName
                  ? "sp activeblack"
                  : "sp"
              }
              data-name={datapropsarraysorted[i].name}
              data-label={datapropsarraysorted[i].label}
              data-type={datapropsarraysorted[i].type}
              data-actionid={
                datapropsarraysorted[i].action
                  ? datapropsarraysorted[i].action.id
                  : ""
              }
              onClick={this.onTabOpen}
            >
              home
            </div>
          ) : (
            <>
              {/* if record tab */}
              <div
                className={
                  datapropsarraysorted[i].name == activeTabName
                    ? "sp activeblack"
                    : "sp"
                }
                data-name={datapropsarraysorted[i].name}
                data-label={datapropsarraysorted[i].label}
                data-type={datapropsarraysorted[i].type}
                data-actionid={
                  datapropsarraysorted[i].action
                    ? datapropsarraysorted[i].action.id
                    : ""
                }
                onClick={this.onTabOpen}
              >
                {datapropsarraysorted[i].label}
              </div>
              <GetLocalIcon
                className={
                  datapropsarraysorted[i].name == activeTabName
                    ? "sp activeblack"
                    : "sp"
                }
                name="close"
                data-name={datapropsarraysorted[i].name}
                data-label={datapropsarraysorted[i].label}
                data-type={datapropsarraysorted[i].type}
                data-actionid={
                  datapropsarraysorted[i].action
                    ? datapropsarraysorted[i].action.id
                    : ""
                }
                onClick={this.onTabClose}
              />
            </>
          )}
        </>
      );
    }
    this.setState({ mainpanelHtml: tabsHtml });
  };

  onTabOpen = (e) => {
    let localdata = getLocalData(this.props);
    let clickprops = {
      actionid: e.target.dataset.actionid,
      recordid: e.target.dataset.name,
    };
    this.props.serverButtonHandler({
      localdata: localdata,
      clickprops: clickprops,
      recorddata: "",
    });
  };

  onTabClose = (e) => {
    console.log(e.target.dataset);
    let {
      orgname,
      userprofileid,
      userid,
      recordid,
      tablename,
      actionname,
      tabactionid,
      lastcloseiconactionid,
      listnviewhomeactionid,
    } = this.props.compprops;

    let { label, name } = e.target.dataset;
    let newtabactionid = "";

    let tabs = JSON.parse(localStorage.getItem("listnviewpanel-" + tablename));
    let newtabsObj = {};
    // remove key
    for (let tabname in tabs) {
      if (tabname != name) {
        newtabsObj[tabname] = tabs[tabname];
      }
    }
    // change order
    let localstoragetabs = [];
    for (let newtabI in newtabsObj) {
      localstoragetabs.push(newtabsObj[newtabI]);
    }
    let localstoragetabssorted = sortArray(
      localstoragetabs,
      "order",
      "integer"
    );
    console.log(localstoragetabssorted);
    // reupdate order
    let newLocalStoragearrayObj = {};
    let newOrder = 0;
    let newactivetabname = "";
    for (let i in localstoragetabssorted) {
      localstoragetabssorted[i].order = newOrder;
      newOrder = newOrder + 1;
      newLocalStoragearrayObj[localstoragetabssorted[i].name] =
        localstoragetabssorted[i];
      // new active tab will be last in order after removal
      newactivetabname = localstoragetabssorted[i].name;
      newtabactionid = localstoragetabssorted[i].action.id;
    }
    console.log(newactivetabname);

    localStorage.setItem(
      "listnviewpanel-" + tablename,
      JSON.stringify(newtabsObj)
    );

    // redirect new url if activetab is closed
    if (e.target.dataset.name.toLowerCase() == recordid.toLowerCase()) {
      let localdata = getLocalData(this.props);
      let clickprops;
      if (newactivetabname == "listhome") {
        clickprops = {
          actionid: listnviewhomeactionid,
          recordid: "",
        };
      } else {
        clickprops = {
          actionid: newtabactionid,
          recordid: newactivetabname,
        };
      }

      this.props.serverButtonHandler({
        localdata: localdata,
        clickprops: clickprops,
        recorddata: "",
      });
    } else {
      // if inactive tab closed
      if (recordid == null) {
        this.setComponentData(
          JSON.parse(localStorage.getItem("listnviewpanel-" + tablename)),
          "listhome"
        );
      } else {
        this.setComponentData(
          JSON.parse(localStorage.getItem("listnviewpanel-" + tablename)),
          recordid
        );
      }
    }
  };

  render() {
    console.log(this.props.style);

    return (
      <>
        <div
          id={this.props.htmlid}
          style={{
            color: "black",
            width: "100%",
            backgroundColor:
              this.props.bgcolor === "" ? "#F2F2F2" : this.props.bgcolor,
          }}
        >
          <div className="org-fr org-fjc-s org-bdb">
            {this.state.mainpanelHtml}
          </div>
        </div>
      </>
    );
  }
}
