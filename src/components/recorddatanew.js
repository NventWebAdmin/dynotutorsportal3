import React, { Component } from "react";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";
import {
  sortArray,
  fieldTypeHtmltoDBmapping,
  getLocalData,
  serverButtonHandler,
} from "../js/index";
import Htmlform from "./htmlformnew";
import Tabpanel from "./tabpanel";
import { GetLocalIcon, GetGoogleIcon } from "./icons";

/*
 let urlsearchparams = new URLSearchParams(
      this.props.routerprops.location.search
    );

/////
   <Recorddatanew
          {...this.props}
          compprops={{
            orgname: "gouthama",
            userprofileid: "gouthama-admin",
            userid: "",
            parenttablename: "",
            tablename: "student2",
            parentrecid: "",
            recordid: "AC-fdf-fdfdfdd",
            action: "new",
            urlsearchparams: urlsearchparams,
          }}
          styleprops={{
            width: "100%",
            height: "",
            backgroundColor: "",
            overflow: "auto",
          }}
        />

*/
class F extends Component {
  constructor(props) {
    super(props);
    this.state = { mainPanelHtml: [], recorddata: {} };
  }

  async componentDidMount() {
    console.log(this.props);
    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      actionname,
      urlsearchparams,
    } = this.props.compprops;
    let routerpropsparams = this.props.routerprops.match.params;

    this.getRecordNewMetadataAndDatafromServer({
      orgname: orgname,
      userprofileid: userprofileid,
      userid: userid,
      tablename: tablename,
      datasortparambeginswith: "",
      datasortparamequalsto: "",
      action: actionname,
      viewname: "",
      urlsearchparams: urlsearchparams,
    });
  }

  tabclkHanlder = (props) => {
    let { tabLabel, tabName, tabType } = props;
    console.log(props);
    let inputrecorddatatabcontentArray = document.getElementsByClassName(
      "inputrecorddatatabcontent"
    );

    for (let i = 0; i < inputrecorddatatabcontentArray.length; i++) {
      console.log(inputrecorddatatabcontentArray[i]);
      if (tabName == inputrecorddatatabcontentArray[i].dataset.tabname) {
        inputrecorddatatabcontentArray[i].style.display = "flex";
      } else {
        inputrecorddatatabcontentArray[i].style.display = "none";
      }
    }
  };
  subsectionclkHanlder = (tabName, sectionName, subsectionName) => {
    let isValid = true;

    let htmlformsubsectioncontentArray = document.getElementsByClassName(
      "htmlformsubsectioncontent"
    );

    for (let i = 0; i < htmlformsubsectioncontentArray.length; i++) {
      console.log(htmlformsubsectioncontentArray[i]);
      if (
        tabName == htmlformsubsectioncontentArray[i].dataset.tabname &&
        sectionName == htmlformsubsectioncontentArray[i].dataset.sectionname
      ) {
        if (htmlformsubsectioncontentArray[i].style.display == "flex") {
          //reset subsection errors
          let errorelements = htmlformsubsectioncontentArray[
            i
          ].getElementsByClassName("htmlforminputitemerror");
          for (let j = 0; j < errorelements.length; j++) {
            errorelements[j].style.display = "none";
          }

          //validate childs
          for (let childrenI in htmlformsubsectioncontentArray[
            i
          ].getElementsByTagName("*")) {
            let children = htmlformsubsectioncontentArray[
              i
            ].getElementsByTagName("*")[childrenI];
            console.log(children);
            if (this.inputElementValidate(children) == false) {
              isValid = false;
            }
          }
        }
      }
    }

    if (isValid == true) {
      for (let i = 0; i < htmlformsubsectioncontentArray.length; i++) {
        console.log(htmlformsubsectioncontentArray[i]);
        if (
          tabName == htmlformsubsectioncontentArray[i].dataset.tabname &&
          sectionName == htmlformsubsectioncontentArray[i].dataset.sectionname
        ) {
          if (
            subsectionName ==
            htmlformsubsectioncontentArray[i].dataset.subsectionname
          ) {
            htmlformsubsectioncontentArray[i].style.display = "flex";
          } else {
            htmlformsubsectioncontentArray[i].style.display = "none";
          }
        }
      }
    }
  };

  inputElementValidate = (htmllement) => {
    let isValid = true;
    if (htmllement && htmllement.required) {
      if (htmllement.value.trim() == "" || htmllement.value == undefined) {
        htmllement.style.borderBottomColor = "red";
        htmllement.style.borderBottomWidth = "2px";
        var newDiv = document.createElement("div");
        var newContent = document.createTextNode("This is required");
        newDiv.setAttribute("class", "htmlforminputitemerror");
        newDiv.appendChild(newContent);

        htmllement.insertAdjacentElement("afterend", newDiv);
        isValid = false;
      } else {
        htmllement.style.borderBottomColor = htmllement.style.borderRightColor;
        htmllement.style.borderBottomWidth = htmllement.style.borderRightWidth;
      }
    }
    return isValid;
  };

  inputChangeHandler = (props) => {
    let { inputName, inputValue } = props;
    let recorddata = this.state.recorddata;
    recorddata[inputName] = inputValue;
    this.setState({ recorddata: recorddata });
    console.log(this.state);
  };

  clickHandler = (props) => {
    console.log(props);
    let localdata = getLocalData(this.props);

    serverButtonHandler({
      localdata: localdata,
      clickprops: props,
      recorddata: this.state.recorddata,
    });
  };

  inputKeyupHandler = () => {};

  async getRecordNewMetadataAndDatafromServer(props) {
    console.log(props);
    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      datasortparambeginswith,
      datasortparamequalsto,
      action,
      viewName,
      urlsearchparams,
    } = props;
    let { recorddata } = this.state;

    let fieldsupdatedfromurl = {};

    let objectmetadataParams = {};
    let layoutmetadataParams = {};

    // get object metadata for field types to show on ui
    objectmetadataParams = {
      objectName: "tableinfo",
      objectData: {},
      keyConditions: [
        { field: "orgname", value: orgname, expression: "=" },
        {
          field: "id",
          value: tablename,
          expression: "=",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };

    // get layout metadata for order of the fields
    layoutmetadataParams = {
      objectName: "layoutperuserprofile",
      objectData: {},
      keyConditions: [
        { field: "userprofileid", value: userprofileid, expression: "=" },
        {
          field: "tableid",
          value: tablename + "-" + action,
          expression: "=",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };

    // get object metadata
    console.log(objectmetadataParams);
    let objectmetadataresult = await getRecorddata(objectmetadataParams);
    if (objectmetadataresult.isSuccess === "false") {
      alert("layoutmetadata" + objectmetadataresult.message);
    } else {
      // console.log(objectmetadataresult.dataprops.Items);
      if (objectmetadataresult.dataprops.Items[0]) {
        let objectMetadata = objectmetadataresult.dataprops.Items[0].data;

        // get layout metadata
        let layoutmetadataresult = await getRecorddata(layoutmetadataParams);
        if (layoutmetadataresult.isSuccess === "false") {
          alert("layoutmetadata" + layoutmetadataresult.message);
        } else {
          let layoutMetadata =
            layoutmetadataresult.dataprops.Items[0].dataprops;
          console.log(layoutMetadata);

          let layoutMetadataHtml = [];

          let htmlFormDataprops = [];

          let tabArrayObject = layoutMetadata.tabs;

          console.log(tabArrayObject);
          let tabarray = [];
          for (let i in tabArrayObject) {
            tabarray.push(tabArrayObject[i]);
          }
          let sortedTabs = sortArray(tabarray, "order", "integer");
          console.log(sortedTabs);
          let tabHtml = [];
          let tabObjectArray = [];
          let tabdataprops = [];
          let activeTabName;
          for (let tabI in sortedTabs) {
            if (sortedTabs[tabI].defaultactive == "true") {
              activeTabName = sortedTabs[tabI].name;
            }
            tabObjectArray.push({
              label: sortedTabs[tabI].label,
              name: sortedTabs[tabI].name,
            });
          }

          tabHtml.push(
            <Tabpanel
              bgcolor=""
              onTabOpen={this.tabclkHanlder}
              compprops={{ activetab: activeTabName, tabs: tabObjectArray }}
              styleprops={{}}
            />
          );

          for (let tabI in sortedTabs) {
            let sectionarray = [];
            for (let i in sortedTabs[tabI].sections) {
              sectionarray.push(sortedTabs[tabI].sections[i]);
            }
            let sortedSections = sortArray(sectionarray, "order", "integer");
            console.log(sortedSections);
            let sectionHtml = [];
            for (let sectionI in sortedSections) {
              let subsectionarray = [];
              for (let i in sortedSections[sectionI].subsections) {
                subsectionarray.push(sortedSections[sectionI].subsections[i]);
              }

              let sortedsubSections = sortArray(
                subsectionarray,
                "order",
                "integer"
              );
              console.log(sortedsubSections);
              let subsectionHtml = [];
              for (let subsectionI in sortedsubSections) {
                let fieldsarray = [];
                for (let i in sortedsubSections[subsectionI].fields) {
                  fieldsarray.push(sortedsubSections[subsectionI].fields[i]);
                }

                let sortedFields = sortArray(fieldsarray, "order", "integer");
                console.log(sortedFields);

                let fieldsArrayHtml = [];
                htmlFormDataprops = [];
                for (let fieldI in sortedFields) {
                  let fieldobject = sortedFields[fieldI];

                  ////////////////
                  if (fieldobject.isglobalfield == "true") {
                    if (fieldobject.type == "select") {
                      let optionsObj = fieldobject.typeparams.options;
                      let optionsArray = [];
                      let optionsArraySorted = [];
                      for (let fieldoption in optionsObj) {
                        optionsArray.push(optionsObj[fieldoption]);
                      }
                      optionsArraySorted = sortArray(
                        optionsArray,
                        "order",
                        "integer"
                      );

                      htmlFormDataprops.push({
                        label: fieldobject.label,
                        name: fieldobject.name,

                        type: fieldTypeHtmltoDBmapping({
                          fieldType: fieldobject.type,
                          inputOrOutput: fieldobject.inputoroutput,
                        }),

                        options: optionsArraySorted,
                        width: fieldobject.width ? fieldobject.width : "50%",

                        height: fieldobject.height ? fieldobject.height : "50%",

                        placeholder: fieldobject.placeholder
                          ? fieldobject.placeholder
                          : "",
                        required: fieldobject.required,
                        readonly: fieldobject.readonly,
                        defaultvalue: urlsearchparams.get(fieldobject.name)
                          ? urlsearchparams.get(fieldobject.name)
                          : fieldobject.defaultvalue,
                        clientstatename: fieldobject.clientstatename,
                        clientstatetype: fieldobject.clientstatetype,
                      });
                      if (urlsearchparams.get(fieldobject.name)) {
                        recorddata[fieldobject.name] = urlsearchparams.get(
                          fieldobject.name
                        );
                      }
                    } else if (fieldobject.type == "buttonpanel") {
                      let buttonsObj =
                        fieldobject.globalfieldtypeparams.buttons;
                      let buttonsArray = [];
                      let buttonsArraySorted = [];
                      for (let button in buttonsObj) {
                        buttonsArray.push(buttonsObj[button]);
                      }
                      buttonsArraySorted = sortArray(
                        buttonsArray,
                        "order",
                        "integer"
                      );

                      let sectionfooterbuttonpanel = {
                        label: "footerbuttonpanel",
                        name: "footerbuttonpanel",
                        value: "footerbuttonpanel",
                        buttonarrayprops: buttonsArraySorted,
                        type: "buttonpanel",
                        width: "100%",
                        placeholder: "",
                        required: "true",
                      };
                      htmlFormDataprops.push(sectionfooterbuttonpanel);
                    } else {
                      htmlFormDataprops.push({
                        label: fieldobject.label,
                        name: fieldobject.name,

                        type: fieldTypeHtmltoDBmapping({
                          fieldType: fieldobject.type,
                          inputOrOutput: fieldobject.inputoroutput,
                        }),
                        width: fieldobject.width ? fieldobject.width : "50%",

                        height: fieldobject.height ? fieldobject.height : "50%",

                        placeholder: fieldobject.placeholder
                          ? fieldobject.placeholder
                          : "",
                        required: fieldobject.required,
                        readonly: fieldobject.readonly,
                        defaultvalue: urlsearchparams.get(fieldobject.name)
                          ? urlsearchparams.get(fieldobject.name)
                          : fieldobject.defaultvalue,
                        clientstatename: fieldobject.clientstatename,
                        clientstatetype: fieldobject.clientstatetype,
                      });
                      if (urlsearchparams.get(fieldobject.name)) {
                        recorddata[fieldobject.name] = urlsearchparams.get(
                          fieldobject.name
                        );
                      }
                    }
                  } else {
                    console.log(fieldobject.name);
                    if (
                      objectMetadata.fields[fieldobject.name].type == "select"
                    ) {
                      let optionsObj =
                        objectMetadata.fields[fieldobject.name].typeparams
                          .options;
                      let optionsArray = [];
                      let optionsArraySorted = [];
                      for (let fieldoption in optionsObj) {
                        optionsArray.push(optionsObj[fieldoption]);
                      }
                      optionsArraySorted = sortArray(
                        optionsArray,
                        "order",
                        "integer"
                      );

                      htmlFormDataprops.push({
                        label: objectMetadata.fields[fieldobject.name].label,
                        name: fieldobject.name,

                        type: fieldTypeHtmltoDBmapping({
                          fieldType:
                            objectMetadata.fields[fieldobject.name].type,
                          inputOrOutput: fieldobject.inputoroutput,
                        }),
                        options: optionsArraySorted,
                        width: fieldobject.width ? fieldobject.width : "50%",

                        height: fieldobject.height ? fieldobject.height : "50%",
                        placeholder: fieldobject.placeholder
                          ? fieldobject.placeholder
                          : "",
                        required: fieldobject.required,
                        readonly: fieldobject.readonly,
                        // defaultvalue: fieldobject.defaultvalue,
                        defaultvalue: urlsearchparams.get(fieldobject.name)
                          ? urlsearchparams.get(fieldobject.name)
                          : fieldobject.defaultvalue,
                        clientstatename: fieldobject.clientstatename,
                        clientstatetype: fieldobject.clientstatetype,
                      });
                      if (urlsearchparams.get(fieldobject.name)) {
                        recorddata[fieldobject.name] = urlsearchparams.get(
                          fieldobject.name
                        );
                      }
                    } else {
                      // if field is not globalfield and not select

                      htmlFormDataprops.push({
                        label: objectMetadata.fields[fieldobject.name].label,
                        name: fieldobject.name,

                        type: fieldTypeHtmltoDBmapping({
                          fieldType:
                            objectMetadata.fields[fieldobject.name].type,
                          inputOrOutput: fieldobject.inputoroutput,
                        }),

                        width: fieldobject.width ? fieldobject.width : "50%",

                        height: fieldobject.height ? fieldobject.height : "50%",

                        placeholder: fieldobject.placeholder
                          ? fieldobject.placeholder
                          : "",
                        required: fieldobject.required,
                        readonly: fieldobject.readonly,

                        defaultvalue: urlsearchparams.get(fieldobject.name)
                          ? urlsearchparams.get(fieldobject.name)
                          : fieldobject.defaultvalue,

                        clientstatename: fieldobject.clientstatename,
                        clientstatetype: fieldobject.clientstatetype,
                      });

                      if (urlsearchparams.get(fieldobject.name)) {
                        recorddata[fieldobject.name] = urlsearchparams.get(
                          fieldobject.name
                        );
                      }
                    }
                  }
                  ///////////////
                  console.log(htmlFormDataprops);
                }

                fieldsArrayHtml.push(
                  <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p org-bb">
                    <Htmlform
                      inputChanged={this.inputChangeHandler}
                      clkHandler={this.clickHandler}
                      inputKeyUp={this.inputKeyupHandler}
                      dataprops={htmlFormDataprops}
                      bgcolor=""
                    />
                  </div>
                );

                if (sortedsubSections[subsectionI].defaultactive == "true") {
                  subsectionHtml.push(
                    <div style={{ width: "100%" }}>
                      {sortedsubSections[subsectionI].hideheader == "true" ? (
                        ""
                      ) : (
                        <div
                          className="org-fr org-fai-c htmlformsubsectiondropdown"
                          style={{ backgroundColor: "#717171", opacity: "0.5" }}
                          onClick={() =>
                            this.subsectionclkHanlder(
                              sortedTabs[tabI].name,
                              sortedSections[sectionI].name,
                              sortedsubSections[subsectionI].name
                            )
                          }
                        >
                          <GetGoogleIcon name="expand_less" />
                          {sortedsubSections[subsectionI].label}
                        </div>
                      )}
                      <div
                        className="htmlformsubsectioncontent org-fr org-fjc-s"
                        data-tabname={sortedTabs[tabI].name}
                        data-sectionname={sortedSections[sectionI].name}
                        data-subsectionname={
                          sortedsubSections[subsectionI].name
                        }
                        style={{ display: "flex" }}
                      >
                        {fieldsArrayHtml}
                      </div>
                    </div>
                  );
                } else {
                  subsectionHtml.push(
                    <div style={{ width: "100%" }}>
                      {sortedsubSections[subsectionI].hideheader == "true" ? (
                        ""
                      ) : (
                        <div
                          className="org-fr org-fai-c htmlformsubsectiondropdown"
                          style={{ backgroundColor: "#717171", opacity: "0.5" }}
                          onClick={() =>
                            this.subsectionclkHanlder(
                              sortedTabs[tabI].name,
                              sortedSections[sectionI].name,
                              sortedsubSections[subsectionI].name
                            )
                          }
                        >
                          <GetGoogleIcon name="expand_more" />
                          {sortedsubSections[subsectionI].label}
                        </div>
                      )}
                      <div
                        className="htmlformsubsectioncontent org-fr org-fjc-s"
                        data-tabname={sortedTabs[tabI].name}
                        data-sectionname={sortedSections[sectionI].name}
                        data-subsectionname={
                          sortedsubSections[subsectionI].name
                        }
                        style={{ display: "none" }}
                      >
                        {fieldsArrayHtml}
                      </div>
                    </div>
                  );
                }
              }
              sectionHtml.push(subsectionHtml);
            }

            if (sortedTabs[tabI].defaultactive == "true") {
              tabHtml.push(
                <div
                  style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
                  data-tabname={sortedTabs[tabI].name}
                  className="inputrecorddatatabcontent"
                >
                  {sectionHtml}
                </div>
              );
            } else {
              tabHtml.push(
                <div
                  style={{ display: "none", flexWrap: "wrap", width: "100%" }}
                  data-tabname={sortedTabs[tabI].name}
                  className="inputrecorddatatabcontent"
                >
                  {sectionHtml}
                </div>
              );
            }

            //  tabHtml.push(sectionHtml);
          }

          layoutMetadataHtml.push(
            <div>
              <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p org-bb">
                {tabHtml}
              </div>
            </div>
          );

          console.log(htmlFormDataprops);

          let mainPanelHtml = [];
          mainPanelHtml.push(
            <div
              style={{
                backgroundColor: "#F2F2F2",
              }}
            >
              {layoutMetadataHtml}
            </div>
          );

          this.setState({ mainPanelHtml: [] }, () => {
            this.setState({
              mainPanelHtml: mainPanelHtml,
              recorddata: recorddata,
            });
          });
        }
      } else {
        alert("please enter validate url");
      }
    }
    console.log(this.state);
  }

  render() {
    return (
      <div id={this.props.htmlid} style={this.props.styleprops}>
        {this.state.mainPanelHtml}
      </div>
    );
  }
}

export default F;
