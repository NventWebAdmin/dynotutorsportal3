import React, { Component } from "react";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";

import Recorddatalist from "./recorddatalistortable";
import Recorddatanew from "./recorddatanew";
import Recorddataeditview from "./recorddataeditview";
import Recorddatarelatedlist from "./recorddatarelatedlist";
import Tabpanel from "./tabpanel";
import Closeicontabpanel from "./closeicontabpanel";
import Callcentercomp from "./callcenter";
import Spinner from "./spinner";
import Chat from "./chat2";
import Mail from "./mail";
import Note from "./note";
import Calender from "./calender";
import Recent from "./recent";
import {
  sortArray,
  fieldTypeHtmltoDBmapping,
  getLocalData,
  serverButtonHandler,
} from "../js/index";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainpanelStateObj: {},
      datasyncEventprops: {},
      showspinner: "false",
      chatBodyArray: [
        { label: "hi Madhav", name: "home", src: "local", userName: "PR" },
        { label: "hi pradeep", name: "account", src: "remote", userName: "MK" },
        {
          label: "how are you",
          name: "account2",
          src: "remote",
          userName: "MK",
        },
        {
          label: "wat are you doing",
          name: "case",
          src: "local",
          userName: "PR",
        },
        {
          label: "are you going to dallas",
          name: "contact",
          src: "local",
          userName: "PR",
        },
        { label: "or new york", name: "home", src: "local", userName: "PR" },
        { label: "no", name: "account", src: "remote", userName: "MK" },
        {
          label: "wer r you going",
          name: "case",
          src: "local",
          userName: "PR",
        },
        { label: "Contact", name: "contact", src: "local", userName: "PR" },
        { label: "Home", name: "home", src: "remote", userName: "MK" },
        { label: "Account", name: "account", src: "local", userName: "PR" },
        { label: "Case", name: "case", src: "local", userName: "PR" },
        { label: "Contact", name: "contact", src: "remote", userName: "MK" },
        { label: "Home", name: "home", src: "local", userName: "PR" },
        { label: "Account", name: "account", src: "remote", userName: "MK" },
        { label: "Case", name: "case", src: "local", userName: "PR" },
        { label: "Contact", name: "contact", src: "local", userName: "PR" },
      ],
    };
  }

  // load server ui components on load
  async componentDidMount() {
    this.loadServerComponents({
      oldmainpanelStateObj: {},
      updatedutilityname: "",
      clickprops: {},
    });
  }

  // load server ui components on load
  loadServerComponents = async (props) => {
    let mainpanelStateObj = {};
    let {
      oldmainpanelStateObj,
      updatedutilityname,
      clickprops,
      recorddata,
    } = props;
    let { codesourceobject, utilityname } = this.props;
    console.log(props);
    if (updatedutilityname != "") {
      utilityname = updatedutilityname;
    }
    console.log(codesourceobject);
    let localdata = getLocalData(this.props);

    // get server components from url based on app, sidetab, action names
    let result = {};
    if (codesourceobject == "pageperprofile") {
      if (localdata.appname == undefined) {
        localdata.appname = "";
      }
      if (localdata.sidetabname == undefined) {
        localdata.sidetabname = "";
      }
      if (localdata.actionname == undefined) {
        localdata.actionname = "";
      }
      result = await getRecorddata({
        objectName: codesourceobject,
        objectData: {},
        keyConditions: [
          { field: "orgname", value: localdata.orgname, expression: "=" },
          { field: "id", value: "PP", expression: "beginswith" },
        ],
        filterConditions: [
          { field: "appname", value: localdata.appname, expression: "=" },
          {
            field: "maintabname",
            value: localdata.maintabname,
            expression: "=",
          },
          {
            field: "sidetabname",
            value: localdata.sidetabname,
            expression: "=",
          },
          { field: "actionname", value: localdata.actionname, expression: "=" },
        ],
      });
    } else if (codesourceobject == "utilityperprofile") {
      result = await getRecorddata({
        objectName: codesourceobject,
        objectData: {},
        keyConditions: [
          { field: "orgname", value: localdata.orgname, expression: "=" },
          { field: "id", value: "UP", expression: "beginswith" },
        ],
        filterConditions: [
          { field: "utilityname", value: utilityname, expression: "=" },
        ],
      });
    }
    console.log(result);
    if (result.isSuccess === "false") {
      alert("url not found");
    } else {
      console.log(result.dataprops);
      if (result.dataprops && result.dataprops.Items) {
        // list of server components
        let servercomponents = result.dataprops.Items[0].dataprops.components;
        let servercomponentsArray = [];
        for (let i in servercomponents) {
          servercomponentsArray.push(servercomponents[i]);
        }
        let servercomponentsArraySorted = sortArray(
          servercomponentsArray,
          "order",
          "integer"
        );

        for (let servercomponentI in servercomponentsArraySorted) {
          let componentHtml;
          let finalcomponentprops = {};
          let finalstyleprops = {};
          let servercomponent = servercomponentsArraySorted[servercomponentI];

          for (let prop in servercomponent) {
            // compoentn props
            if (prop == "compprops") {
              let comppropstemp = servercomponent[prop];

              console.log(comppropstemp);
              for (let comppropstempI in comppropstemp) {
                console.log(comppropstempI);
                let compproptemp = comppropstemp[comppropstempI];
                console.log(compproptemp);
                // assign from localdata to component prop
                if (compproptemp.type == "localdata") {
                  finalcomponentprops[comppropstempI] =
                    localdata[compproptemp.name];
                  console.log(finalcomponentprops);
                }

                if (compproptemp.type == "clickprops") {
                  finalcomponentprops[comppropstempI] =
                    clickprops[compproptemp.name];
                  console.log(finalcomponentprops);
                }

                if (compproptemp.type == "recorddata") {
                  alert(JSON.stringify(recorddata));
                  alert(compproptemp.name);
                  finalcomponentprops[comppropstempI] =
                    recorddata[compproptemp.name];
                  console.log(finalcomponentprops);
                }

                // assign static text to component prop
                if (compproptemp.type == "text") {
                  finalcomponentprops[comppropstempI] = compproptemp.value;
                }

                if (compproptemp.type == "object") {
                  finalcomponentprops[comppropstempI] = compproptemp.value;
                }
              }
            }

            //  style props
            if (prop == "styleprops") {
              let stylepropstemp = servercomponent[prop];
              console.log(stylepropstemp);
              for (let stylepropstempI in stylepropstemp) {
                let styleproptemp = stylepropstemp[stylepropstempI];
                console.log(styleproptemp);
                if (styleproptemp.type == "localdata") {
                  finalstyleprops[styleproptemp.name] =
                    localdata[styleproptemp.name];
                }
                if (styleproptemp.type == "text") {
                  finalstyleprops[styleproptemp.name] = styleproptemp.value;
                }
              }
            }
          }
          console.log(finalcomponentprops);

          // dynamicall create component
          componentHtml = React.createElement(
            this.getComponentfromText(servercomponent.componentname),
            {
              ...this.props,
              componentname: servercomponent.componentname,
              htmlid: servercomponent.htmlid,
              serverButtonHandler: this.serverButtonHandler,
              compprops: finalcomponentprops,
              styleprops: finalstyleprops,
            },
            ""
          );

          // if  old comp data needed from previous button click
          if (oldmainpanelStateObj[servercomponent.htmlid]) {
            // if there is local component data
            mainpanelStateObj[servercomponent.htmlid] =
              oldmainpanelStateObj[servercomponent.htmlid];
          } else {
            mainpanelStateObj[servercomponent.htmlid] = componentHtml;
          }
        }

        this.setState(
          {
            mainpanelStateObj: oldmainpanelStateObj,
          },
          () => {
            this.setState({
              mainpanelStateObj: mainpanelStateObj,
            });
          }
        );
      }
    }
  };

  // all server buttons handler on UI
  serverButtonHandler = async (props) => {
    let { mainpanelStateObj } = this.state;
    let oldmainpanelStateObj = {};
    let { clickprops, localdata, recorddata } = props;
    console.log(clickprops);

    // layout action / button metadata from server
    let metadataParams = {
      objectName: "layoutactions",
      objectData: {},
      keyConditions: [
        {
          field: "orgname",
          value: localdata.orgname,
          expression: "=",
        },
        {
          field: "id",
          value: clickprops.actionid,
          expression: "=",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };

    console.log("metadataParams" + JSON.stringify(metadataParams));
    let metadataresult = await getRecorddata(metadataParams);
    if (metadataresult.isSuccess === "false") {
      alert("metadata" + metadataresult.message);
    } else {
      if (metadataresult.dataprops.Items[0]) {
        console.log(metadataresult);
        let action = metadataresult.dataprops.Items[0].action;
        alert(action.type);
        // if datasync event
        if (action.type == "datasyncevent") {
          this.setState({ datasyncEventprops: action.eventprops });
        }

        // if rediret / refresh
        if (
          action.type == "redirect" ||
          action.type == "redirectnewtab" ||
          action.type == "refresh"
        ) {
          if (action.nexturl.type == "new") {
            let nexturl = action.nexturl;
            let replacetext = nexturl.replacetext;
            for (let replaceparamI in nexturl.replaceparams) {
              let replaceparam = nexturl.replaceparams[replaceparamI];
              if (replaceparam.type == "localdata") {
                replacetext = replacetext.replace(
                  replaceparamI,
                  localdata[replaceparam.name]
                );
              }
              if (replaceparam.type == "clickprops") {
                replacetext = replacetext.replace(
                  replaceparamI,
                  clickprops[replaceparam.name]
                );
              }
              if (replaceparam.type == "recorddata") {
                replacetext = replacetext.replace(
                  replaceparamI,
                  recorddata[replaceparam.name]
                );
              }
            }
            console.log(replacetext);
            // if redrect
            if (action.type == "redirect") {
              window.location.assign(replacetext);
            }
            if (action.type == "redirectnewtab") {
              window.open(replacetext, "_blank");
            }

            // if refresh
            if (action.type == "refresh") {
              let donotrefreshcomponentshtmlid =
                action.donotrefreshcomponentshtmlid;
              for (let donotrefreshcomponentshtmlidI in donotrefreshcomponentshtmlid) {
                console.log(mainpanelStateObj[donotrefreshcomponentshtmlidI]);
                if (mainpanelStateObj[donotrefreshcomponentshtmlidI]) {
                  oldmainpanelStateObj[donotrefreshcomponentshtmlidI] =
                    mainpanelStateObj[donotrefreshcomponentshtmlidI];
                }
              }

              this.props.routerprops.history.push(replacetext);
              this.loadServerComponents({
                oldmainpanelStateObj: oldmainpanelStateObj,
                updatedutilityname: "",
                clickprops: clickprops,
                recorddata: recorddata,
              });
            }
          }
          // if redirect old or refresh old
          if (action.nexturl.type == "old") {
            window.history.back();
          }
        }
        if (action.type == "utitlitychange") {
          alert();
          if (action.nexturl.type == "new") {
            let nexturl = action.nexturl;
            let replacetext = nexturl.replacetext;
            for (let replaceparamI in nexturl.replaceparams) {
              let replaceparam = nexturl.replaceparams[replaceparamI];
              if (replaceparam.type == "localdata") {
                replacetext = replacetext.replace(
                  replaceparamI,
                  localdata[replaceparam.name]
                );
              }
              if (replaceparam.type == "clickprops") {
                replacetext = replacetext.replace(
                  replaceparamI,
                  clickprops[replaceparam.name]
                );
              }
              if (replaceparam.type == "recorddata") {
                replacetext = replacetext.replace(
                  replaceparamI,
                  recorddata[replaceparam.name]
                );
              }
            }
            console.log(replacetext);

            // if refresh
            if (action.type == "utitlitychange") {
              alert();
              let donotrefreshcomponentshtmlid =
                action.donotrefreshcomponentshtmlid;
              for (let donotrefreshcomponentshtmlidI in donotrefreshcomponentshtmlid) {
                console.log(mainpanelStateObj[donotrefreshcomponentshtmlidI]);
                if (mainpanelStateObj[donotrefreshcomponentshtmlidI]) {
                  oldmainpanelStateObj[donotrefreshcomponentshtmlidI] =
                    mainpanelStateObj[donotrefreshcomponentshtmlidI];
                }
              }

              // this.props.routerprops.history.push(replacetext);
              this.loadServerComponents({
                oldmainpanelStateObj: oldmainpanelStateObj,
                updatedutilityname: replacetext,
                clickprops: clickprops,
                recorddata: recorddata,
              });
            }
          }
          // if redirect old or refresh old
          if (action.nexturl.type == "old") {
            window.history.back();
          }
        }
        if (
          action.type == "dataupdateandredirect" ||
          action.type == "dataupdateandrefresh" ||
          action.type == "dataupdateandutilitychange"
        ) {
          alert();
          //dataupdate
          for (let objectvar in action.dataupdate) {
            let object = action.dataupdate[objectvar];
            let objectTableName = object.tablename;
            let objectfields = object.fields;
            for (let objectfield in objectfields) {
              let objectfieldvaluereplacetext =
                objectfields[objectfield].replacetext;
              console.log(objectfieldvaluereplacetext);
              for (let replaceparam in objectfields[objectfield]
                .replaceparams) {
                let replaceparamvalue =
                  objectfields[objectfield].replaceparams[replaceparam];
                console.log(replaceparamvalue);
                if (replaceparamvalue.type == "recorddata") {
                  objectfieldvaluereplacetext = objectfieldvaluereplacetext.replace(
                    replaceparam,
                    recorddata[replaceparamvalue.name]
                  );
                }
                if (replaceparamvalue.type == "localdata") {
                  objectfieldvaluereplacetext = objectfieldvaluereplacetext.replace(
                    replaceparam,
                    localdata[replaceparamvalue.name]
                  );
                }
                if (replaceparamvalue.type == "clickprops") {
                  objectfieldvaluereplacetext = objectfieldvaluereplacetext.replace(
                    replaceparam,
                    clickprops[replaceparamvalue.name]
                  );
                }
              }
              console.log(objectfieldvaluereplacetext);
              recorddata[objectfield] = objectfieldvaluereplacetext;
            }
            alert(recorddata);
            let result = await createRecord({
              objectName: objectTableName,
              objectData: recorddata,
            });
            if (result.isSuccess === "false") {
              alert(result.message);
            } else {
              ////////// redirection
              let nexturl = action.nexturl;
              if (nexturl) {
                let replacetext = nexturl.replacetext;
                for (let replaceparamI in nexturl.replaceparams) {
                  let replaceparam = nexturl.replaceparams[replaceparamI];
                  if (replaceparam.type == "localdata") {
                    replacetext = replacetext.replace(
                      replaceparamI,
                      localdata[replaceparam.name]
                    );
                  }
                  if (replaceparam.type == "recorddata") {
                    replacetext = replacetext.replace(
                      replaceparamI,
                      recorddata[replaceparam.name]
                    );
                  }
                  if (replaceparam.type == "clickprops") {
                    replacetext = replacetext.replace(
                      replaceparamI,
                      clickprops[replaceparam.name]
                    );
                  }
                }
                console.log(replacetext);

                if (action.nexturl.type == "new") {
                  // if databaseupdate and redirect new
                  if (action.type == "dataupdateandredirect") {
                    window.location.assign(replacetext);
                  }
                  // if databaseupdate and refresh new
                  if (action.type == "dataupdateandrefresh") {
                    let donotrefreshcomponentshtmlid =
                      action.donotrefreshcomponentshtmlid;
                    for (let donotrefreshcomponentshtmlidI in donotrefreshcomponentshtmlid) {
                      oldmainpanelStateObj[donotrefreshcomponentshtmlidI] =
                        donotrefreshcomponentshtmlid[
                          donotrefreshcomponentshtmlidI
                        ];
                    }

                    this.props.routerprops.history.push(replacetext);
                    this.loadServerComponents({
                      oldmainpanelStateObj: oldmainpanelStateObj,
                      updatedutilityname: "",
                      clickprops: clickprops,
                      recorddata: recorddata,
                    });
                  }
                  if (action.type == "dataupdateandutilitychange") {
                    let donotrefreshcomponentshtmlid =
                      action.donotrefreshcomponentshtmlid;
                    for (let donotrefreshcomponentshtmlidI in donotrefreshcomponentshtmlid) {
                      console.log(
                        mainpanelStateObj[donotrefreshcomponentshtmlidI]
                      );
                      if (mainpanelStateObj[donotrefreshcomponentshtmlidI]) {
                        oldmainpanelStateObj[donotrefreshcomponentshtmlidI] =
                          mainpanelStateObj[donotrefreshcomponentshtmlidI];
                      }
                    }

                    // this.props.routerprops.history.push(replacetext);
                    this.loadServerComponents({
                      oldmainpanelStateObj: oldmainpanelStateObj,
                      updatedutilityname: replacetext,
                      clickprops: clickprops,
                      recorddata: recorddata,
                    });
                  }
                }
                // if databaseupdate and redirect/refresh old
                if (action.nexturl.type == "old") {
                  window.history.back();
                }
              }
            }
          }
        }
      }
    }
  };

  // dynamic component creation
  getComponentfromText(componentname) {
    console.log(componentname);
    if (componentname == "recorddatalist") {
      return Recorddatalist;
    }
    if (componentname == "recorddatanew") {
      return Recorddatanew;
    }
    if (componentname == "recorddataeditview") {
      return Recorddataeditview;
    }
    if (componentname == "recorddatarelatedlist") {
      return Recorddatarelatedlist;
    }
    if (componentname == "tabpanel") {
      return Tabpanel;
    }

    if (componentname == "closeicontabpanel") {
      return Closeicontabpanel;
    }

    if (componentname == "chat") {
      return Chat;
    }

    if (componentname == "mail") {
      return Mail;
    }

    if (componentname == "recent") {
      return Recent;
    }

    if (componentname == "note") {
      return Note;
    }

    if (componentname == "calender") {
      return Calender;
    }

    if (componentname == "callcenter") {
      return Callcentercomp;
    }
  }

  // static component creation from dynamic comp input
  getStaticReactcompfromDynamic(comp, propsfromlocalparent) {
    console.log(comp);
    let componentname = comp.props.componentname;
    let componentprops = comp.props;
    let componenthtml = [];
    console.log(componentname);
    console.log(propsfromlocalparent);
    if (componentname == "recorddatalist") {
      componenthtml.push(
        <Recorddatalist {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }
    if (componentname == "recorddatanew") {
      componenthtml.push(
        <Recorddatanew {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }
    if (componentname == "recorddataeditview") {
      componenthtml.push(
        <Recorddataeditview {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }
    if (componentname == "recorddatarelatedlist") {
      componenthtml.push(
        <Recorddatarelatedlist {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }
    if (componentname == "tabpanel") {
      componenthtml.push(
        <Tabpanel {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }

    if (componentname == "closeicontabpanel") {
      componenthtml.push(
        <Closeicontabpanel {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }

    if (componentname == "chat") {
      console.log(propsfromlocalparent);
      componenthtml.push(
        <Chat {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }

    if (componentname == "mail") {
      console.log(propsfromlocalparent);
      componenthtml.push(
        <Mail {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }

    if (componentname == "recent") {
      console.log(propsfromlocalparent);
      componenthtml.push(
        <Recent {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }

    if (componentname == "note") {
      console.log(propsfromlocalparent);
      componenthtml.push(
        <Note {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }

    if (componentname == "calender") {
      console.log(propsfromlocalparent);
      componenthtml.push(
        <Calender {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }

    if (componentname == "callcenter") {
      console.log(propsfromlocalparent);
      componenthtml.push(
        <Callcentercomp {...componentprops} {...propsfromlocalparent} />
      );
      return componenthtml;
    }
  }

  // datasync event update between comps
  startDatasyncEvent = (props) => {
    console.log(props);

    // update tabpanel tabs
    // this.setState({
    //   datasyncEventprops: {
    //     name: "addtab",
    //     data: { label: "newlabel", name: "newname" },
    //     componenthtmlid: "all",
    //   },
    // });
  };

  localchatInputSubmit = (e) => {
    console.log(e);
    let chatBodyArray = this.state.chatBodyArray;
    chatBodyArray.push({ label: e, name: e, src: "local", userName: "PR" });

    this.setState({ chatBodyArray: chatBodyArray });
  };

  render() {
    let { mainpanelStateObj, showspinner } = this.state;
    let mainpanelHtml = [];

    for (let i in mainpanelStateObj) {
      console.log(mainpanelStateObj[i]);
      console.log(this.state.datasyncEventprops);
      let Staticcomp = this.getStaticReactcompfromDynamic(
        mainpanelStateObj[i],
        {
          datasyncEventprops: this.state.datasyncEventprops,
          localParentProps: this.props.localParentProps,
        }
      );
      mainpanelHtml.push(Staticcomp);
    }

    return (
      <>
        {/* <input id="remote-input" onKeyUp={this.remoteInputChange} />
        <input id="remote-input2" onKeyUp={this.remoteInputChange2} /> */}
        {/* <Chat
          chatHeader="Welcome, How can I assist you today ?"
          chatBodyArray={this.state.chatBodyArray}
          localchatInputSubmit={this.localchatInputSubmit}
        /> */}
        {/* <Chat
          {...this.props}
          compprops={{
            orgname: "gouthama",
            userProfileId: "gouthama-admin",
            userId: "",
            parenttableName: "",
            tableName: "student",
            parentRecId: "",
          }}
        /> */}

        {/* <div className="uigenspinner" style={{ display: "none" }}>
          <Spinner />
        </div> */}
        {/* <div onClick={this.startDatasyncEvent}>tes</div> */}
        {mainpanelHtml}
      </>
    );
  }
}

export default F;
