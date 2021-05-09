import React, { Component } from "react";
import Tabpanel from "./tabpanel";
import Tablecomp from "./tablecomp";
import Htmlforminputoutputimage from "./htmlforminputoutputimage";
import Htmlforminputoutputvideo from "./htmlforminputoutputvideo";
import { GetLocalIcon, GetGoogleIcon } from "./icons";

var htmlinputimagecanvas = document.createElement("CANVAS");

// let htmlfromprops = [
//   {
//     label: "First Name",
//     name: "firstname",
//     type: "inputtext",
//     placeholder: "First Name",
//   },
//   {
//     label: "Last Name",
//     name: "lastname",
//     type: "inputtext",
//     placeholder: "Last Name",
//   },
//   { label: "Address", name: "address", type: "inputtextarea", placeholder: "" },
//   {
//     label: "Country",
//     name: "country",
//     type: "inputselect",
//     placeholder: "",
//     options: [{ label: "India" }, { label: "USA" }],
//   },
//   {
//     label: "zipcode",
//     name: "zipcode",
//     type: "inputdatalist",
//     placeholder: "",
//     options: [
//       { label: "75206" },
//       { label: "94538" },
//       { label: "39523" },
//       { label: "75206" },
//       { label: "94538" },
//       { label: "39523" },
//     ],
//   },
// ];
// <Svgcomp
// dataprops={htmlfromprops}
// style={{ width: "50%" }}
// inputChanged={(e) => {
//   console.log(e.target.dataset.name + "==" + e.target.value);
// }}
// />

class F extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTabNamefromState: "", inputexcelbody: [] };
  }

  componentDidMount() {
    // getImageRecordStorage({
    //   folderUrl: "gouthama" + "/" + "student",
    //   fileName: "IMG_0037.JPG",
    //   pdfpageNumber: 1,
    //   htmlId: "theCanvas",
    //   fileEvent: "",
    //   callback: (result) => {
    //     console.log(result);
    //     if (result.isSuccess == "true") {
    //       console.log(result.dataprops.imgsrc);
    //       // document.getElementById(imghtmlid).src = result.dataprops.imgsrc;
    //     } else {
    //     }
    //   },
    // });
  }

  validate = () => {};

  btnclkHandler = (e) => {
    let errorelements = document.querySelectorAll(" .htmlforminputitemerror");
    for (let j = 0; j < errorelements.length; j++) {
      errorelements[j].style.display = "none";
    }

    console.log(e.target);
    console.log(e.target.dataset);
    let validationpanelsections = e.target.dataset.validationpanel;
    let isValid = true;
    if (validationpanelsections) {
      let validationpanelsectionsArray = validationpanelsections.split("-");
      console.log(validationpanelsectionsArray);
      for (let i in validationpanelsectionsArray) {
        let htmlsections = document.querySelectorAll(
          "." + validationpanelsectionsArray[i] + " .htmlforminputitem"
        );
        console.log(validationpanelsectionsArray[i]);
        console.log(htmlsections);

        for (let j = 0; j < htmlsections.length; j++) {
          console.log(htmlsections[j]);
          if (this.inputElementValidate(htmlsections[j]) == false) {
            isValid = false;
          }
        }
      }
    }
    console.log(isValid);
    if (isValid == true) {
      this.props.clkHandler({
        buttonLabel: e.target.dataset.label,
        buttonName: e.target.dataset.name,
        buttonType: e.target.dataset.type,
      });
    }
  };

  sectionclkHanlder = (e) => {
    let errorelements = document.querySelectorAll(" .htmlforminputitemerror");
    for (let j = 0; j < errorelements.length; j++) {
      errorelements[j].style.display = "none";
    }

    console.log(e.target);
    console.log(e.target.dataset);
    let validationpanelsections = e.target.dataset.validationpanel;
    let isValid = true;
    if (validationpanelsections) {
      let validationpanelsectionsArray = validationpanelsections.split("-");
      console.log(validationpanelsectionsArray);
      for (let i in validationpanelsectionsArray) {
        let htmlsections = document.querySelectorAll(
          "." + validationpanelsectionsArray[i] + " .htmlforminputitem"
        );
        console.log(validationpanelsectionsArray[i]);
        console.log(htmlsections);

        for (let j = 0; j < htmlsections.length; j++) {
          console.log(htmlsections[j]);
          if (this.inputElementValidate(htmlsections[j]) == false) {
            isValid = false;
          }
        }
      }
    }
    console.log(isValid);
    if (isValid == true) {
      // this.props.clkHandler({
      //   buttonLabel: e.target.dataset.label,
      //   buttonName: e.target.dataset.name,
      //   buttonType: e.target.dataset.type,
      // });
    }
  };

  inputElementValidate = (htmllement) => {
    let isValid = true;
    console.log(htmllement.value);
    if (htmllement.required) {
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

  tabclkHandler = (props) => {
    let { tabLabel, tabName, tabType } = props;
    console.log(props);
    if (tabType == "recorddata") {
      //  this.setState({ activeTabNamefromState: tabName });
      this.props.clkHandler({
        tabLabel: tabLabel,
        tabName: tabName,
        tabType: tabType,
      });
    } else if (tabType == "recordlistdata") {
    } else if (tabType == "recordrelatedlistdata") {
      this.props.clkHandler({
        tabLabel: tabLabel,
        tabName: tabName,
        tabType: tabType,
      });
    } else {
    }
  };

  inputchngHandler = (e) => {
    console.log(e.target.value);

    this.props.inputChanged({
      inputLabel: e.target.dataset.label,
      inputName: e.target.dataset.name,
      inputType: e.target.dataset.type,
      clientstatename: e.target.dataset.clientstatename,
      clientstatetype: e.target.dataset.clientstatetype,
      inputValue: e.target.value,
    });
  };

  handleExcelFiles = async (e) => {
    let clientstatename = e.target.dataset.clientstatename;
    let clientstatetype = e.target.dataset.clientstatetype;

    let f = e.target.files[0];
    if (f) {
      var r = new FileReader();
      r.onload = async (e) => {
        var bytes = new Uint8Array(e.target.result);
        console.log(bytes);
        var contents = JSON.parse(this.processExcel(e.target.result));
        console.log(contents);
        let tablecompcolumnmetadata = {};
        let tablecompcolumndata = [];
        let excelHeaderColumnArray = [];
        let sheettoprocess = 0;
        for (let i in contents) {
          console.log(i);
          if (sheettoprocess == 0) {
            let excelSheetItemData = contents[i];
            for (let j = 0; j < excelSheetItemData.length; j++) {
              if (j == 0) {
                // excel sheet header row
                let excelSheetItemRowData = excelSheetItemData[0];
                for (let k = 0; k < excelSheetItemRowData.length; k++) {
                  excelHeaderColumnArray.push(excelSheetItemRowData[k]);
                  tablecompcolumnmetadata[excelSheetItemRowData[k]] = {
                    label: excelSheetItemRowData[k],
                    name: excelSheetItemRowData[k],
                    order: k,
                  };
                }
              }
            }
            console.log(tablecompcolumnmetadata);
            console.log(excelHeaderColumnArray);
            for (let j = 0; j < excelSheetItemData.length; j++) {
              if (j != 0) {
                // excel sheet header row
                let excelSheetItemRowData = excelSheetItemData[j];
                let tablecompcolumndataItem = {};

                for (let k = 0; k < excelSheetItemRowData.length; k++) {
                  tablecompcolumndataItem[excelHeaderColumnArray[k]] =
                    excelSheetItemRowData[k];
                }
                console.log(tablecompcolumndataItem);
                tablecompcolumndata.push(tablecompcolumndataItem);
              }
            }
          }
          sheettoprocess = sheettoprocess + 1;
        }
        console.log(tablecompcolumnmetadata);
        console.log(tablecompcolumndata);

        let metadata = {
          student: {
            label: "Students",
            name: "student",
            buttons: {},
            columns: tablecompcolumnmetadata,
            idsortparam: "",
            order: "0",
          },
        };

        let datahtml = [];

        datahtml.push(
          <Tablecomp
            dataProps={{
              name: "meganavpanel-list-content-recordname",
              type: "meganavpanel-list-content-recordname",
            }}
            columnMetadata={metadata}
            tableOnclick=""
            tableOnChange={this.inputExcelChangeHandler}
            recordData={tablecompcolumndata}
            activeTableviewName="student"
            tableName="student"
            tablehtmlid={"student" + "upload"}
            rowhtmlid1="firstname"
            rowhtmlid2="lastname"
            clientstatename={clientstatename}
            clientstatetype={clientstatetype}
          />
        );

        this.setState({ inputexcelbody: datahtml });
      };
      r.readAsBinaryString(f);
    } else {
      console.log("Failed to load file");
    }
  };

  processExcel = (data) => {
    var workbook = window.XLSX.read(data, {
      type: "binary",
    });

    var firstSheet = workbook.SheetNames[0];
    var data = this.to_json(workbook);
    return data;
  };

  to_json = (workbook) => {
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
      var roa = window.XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });
      if (roa.length) result[sheetName] = roa;
    });
    return JSON.stringify(result, 2, 2);
  };

  // mainpanelInputexcelTableButtonClkHanlder = (props) => {
  //   let updatedProps = props;
  //   updatedProps.itemType = "mainpanelinputexceltablebutton";
  //   console.log(props);
  //   this.props.clkHandler(updatedProps);
  // };

  inputselectchngHandler = (e) => {
    console.log(e.target.value);
    this.props.inputChanged({
      inputLabel: e.target.dataset.label,
      inputName: e.target.value,
      inputType: e.target.dataset.type,
      inputValue: e.target.value,
    });
  };

  inputExcelChangeHandler = (props) => {
    console.log(props);
    this.props.inputChanged(props);
  };

  render() {
    console.log(this.props);
    let htmlFormArray = [];
    let activeTabName = this.props.activeTabName;
    let { activeTabNamefromState } = this.state;
    if (activeTabNamefromState != "") {
      activeTabName = activeTabNamefromState;
    }

    console.log(activeTabName);
    let htmlTabsectionNames = [];
    let htmlTabsectionNamesObject = {};
    for (let i = 0; i < this.props.dataprops.length; i++) {
      console.log(this.props.dataprops[i]);
      if (!htmlTabsectionNames.includes(this.props.dataprops[i].tabname)) {
        htmlTabsectionNames.push(this.props.dataprops[i].tabname);
        console.log(this.props.dataprops[i].tabname);
      }
    }
    console.log(htmlTabsectionNames);
    for (let i in htmlTabsectionNames) {
      console.log(htmlTabsectionNamesObject);
      console.log(htmlTabsectionNames[i]);
      htmlTabsectionNamesObject[htmlTabsectionNames[i]] = [];
      console.log(htmlTabsectionNamesObject);
    }
    console.log(htmlTabsectionNamesObject);

    let mainpanelheadersectionHtml = [];
    let mainpanelfootersectionHtml = [];
    let mainpaneltabsectionHtml = [];

    for (let i = 0; i < this.props.dataprops.length; i++) {
      let htmlFormItem = this.props.dataprops[i];
      console.log(htmlFormItem);

      htmlFormArray = [];
      if (htmlFormItem.type === "tabpanel") {
        console.log(htmlFormItem.tabarrayprops);

        htmlFormArray.push(
          <div style={{ width: htmlFormItem.width, display: "inline-block" }}>
            <div className=" org-fr org-fai-c org-fjc-c">
              <Tabpanel
                bgcolor=""
                onTabOpen={this.tabclkHandler}
                activeTabName={activeTabName}
                dataprops={htmlFormItem.tabarrayprops.tabObjectArray}
                type="mainpanelsectiontab"
              />
            </div>
          </div>
        );
      }
      if (htmlFormItem.type === "buttonpanel") {
        console.log(htmlFormItem.buttonarrayprops);
        let buttonPanelItemshtml = [];
        for (let buttonPanelItem in htmlFormItem.buttonarrayprops) {
          buttonPanelItemshtml.push(
            <button
              data-name={htmlFormItem.buttonarrayprops[buttonPanelItem].name}
              data-label={htmlFormItem.buttonarrayprops[buttonPanelItem].label}
              data-type={htmlFormItem.buttonarrayprops[buttonPanelItem].type}
              data-validationpanel={
                htmlFormItem.buttonarrayprops[buttonPanelItem].action
                  .validationpanel
              }
              onClick={this.btnclkHandler}
              className="org-databutton esm"
            >
              {htmlFormItem.buttonarrayprops[buttonPanelItem].label}
            </button>
          );
        }
        htmlFormArray.push(
          <div style={{ width: htmlFormItem.width, display: "inline-block" }}>
            <div className="org-fr org-fai-c org-fjc-c">
              {buttonPanelItemshtml}
            </div>
          </div>
        );
      }
      if (htmlFormItem.type === "headertext") {
        htmlFormArray.push(
          <div style={{ width: htmlFormItem.width }}>
            <div className="org-datainputlabel mf">{htmlFormItem.label}</div>
          </div>
        );
      }

      if (htmlFormItem.type === "subheadertext") {
        let subheaderclass = "org-datainputlabel mf esp";

        console.log(htmlFormItem.validationpanel);
        let subheadervalidationarray = htmlFormItem.validationpanel.split("-");
        for (let subheadervalidationarrayitem in subheadervalidationarray) {
          subheaderclass =
            subheaderclass +
            " " +
            subheadervalidationarray[subheadervalidationarrayitem];
        }
        htmlFormArray.push(
          <div style={{ width: htmlFormItem.width }}>
            <div
              className={subheaderclass}
              style={{ backgroundColor: "#717171", opacity: "0.5" }}
              data-name={htmlFormItem.name}
              data-label={htmlFormItem.label}
              data-type={htmlFormItem.type}
              data-validationpanel={htmlFormItem.validationpanel}
              onClick={this.sectionclkHanlder}
            >
              <GetGoogleIcon name="expand_less" data-name={i} />{" "}
              {htmlFormItem.label}
            </div>
          </div>
        );
      }

      if (htmlFormItem.type === "ouputlabel") {
        htmlFormArray.push(
          <div
            className="org-datainputsection"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div
              className="org-datainputlabel"
              data-name={htmlFormItem.name}
              data-label={htmlFormItem.label}
              data-type={htmlFormItem.type}
            >
              {htmlFormItem.label}
            </div>
          </div>
        );
      }

      if (htmlFormItem.type === "link") {
        htmlFormArray.push(
          <div style={{ width: htmlFormItem.width, display: "inline-block" }}>
            <div
              href="#"
              className="org-datainput org-cursor"
              data-name={htmlFormItem.name}
              data-label={htmlFormItem.label}
              data-type={htmlFormItem.type}
              onClick={this.btnclkHandler}
            >
              {htmlFormItem.label}
            </div>
          </div>
        );
      }

      if (htmlFormItem.type === "inputexcel") {
        htmlFormArray.push(
          <div
            className="org-datainputsection esp"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">
              {htmlFormItem.required === "true" ? (
                <span className="org-redc">*</span>
              ) : (
                ""
              )}
              {htmlFormItem.label}
            </div>
            {htmlFormItem.readonly == "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required == "true" ? (
              <>
                <input
                  type="file"
                  className="org-datainput htmlforminputitem"
                  placeholder={htmlFormItem.placeholder}
                  data-name={htmlFormItem.name}
                  data-label={htmlFormItem.label}
                  data-type={htmlFormItem.type}
                  data-clientstatename={htmlFormItem.clientstatename}
                  data-clientstatetype={htmlFormItem.clientstatetype}
                  defaultValue={htmlFormItem.defaultvalue}
                  onChange={this.handleExcelFiles}
                  required
                />
                {this.state.inputexcelbody}
              </>
            ) : (
              <input
                type="file"
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                defaultValue={htmlFormItem.defaultvalue}
                onChange={this.handleExcelFiles}
              />
            )}
          </div>
        );
      }

      if (htmlFormItem.type === "inputimage") {
        htmlFormArray.push(
          <div
            className="org-datainputsection esp"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">
              {htmlFormItem.required === "true" ? (
                <span className="org-redc">*</span>
              ) : (
                ""
              )}
              {htmlFormItem.label}
            </div>
            {htmlFormItem.readonly == "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required == "true" ? (
              <>
                <Htmlforminputoutputimage
                  radiogroupname="testrg"
                  previewImageHtmlId="testimg"
                  previewVideoHtmlId="testvideo"
                  imageHtmlId="testimg"
                  videoHtmlId=""
                  folderUrl="gouthama/student"
                  fileName="profilepic"
                  isInputnotOuptut="true"
                />
              </>
            ) : (
              <Htmlforminputoutputimage
                radiogroupname="testrg"
                previewImageHtmlId="testimg"
                previewVideoHtmlId="testvideo"
                imageHtmlId="testimg"
                videoHtmlId="testvideo"
                folderUrl="gouthama/student"
                fileName="profilepic"
                isInputnotOuptut="true"
              />
            )}
          </div>
        );
      }
      if (htmlFormItem.type === "outputimage") {
        console.log(htmlFormItem);
        htmlFormArray.push(
          <div
            className="org-datainputsection esp"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <Htmlforminputoutputimage
              radiogroupname="testrg"
              previewImageHtmlId="testimg"
              previewVideoHtmlId="testvideo"
              imageHtmlId="testimg"
              videoHtmlId=""
              folderUrl="gouthama/student"
              fileName="profilepic"
              isInputnotOuptut="false"
            />
          </div>
        );
      }

      if (htmlFormItem.type === "inputvideo") {
        htmlFormArray.push(
          <div
            className="org-datainputsection esp"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">
              {htmlFormItem.required === "true" ? (
                <span className="org-redc">*</span>
              ) : (
                ""
              )}
              {htmlFormItem.label}
            </div>
            {htmlFormItem.readonly == "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required == "true" ? (
              <>
                <Htmlforminputoutputvideo
                  radiogroupname="testrg"
                  previewImageHtmlId="testimg"
                  previewVideoHtmlId="testvideo"
                  imageHtmlId="testimg"
                  videoHtmlId=""
                  folderUrl="gouthama/student"
                  fileName="profilepic"
                  isInputnotOuptut="true"
                />
              </>
            ) : (
              <Htmlforminputoutputvideo
                radiogroupname="testrg"
                previewImageHtmlId="testimg"
                previewVideoHtmlId="testvideo"
                imageHtmlId="testimg"
                videoHtmlId="testvideo"
                folderUrl="gouthama/student"
                fileName="profilepic"
                isInputnotOuptut="true"
              />
            )}
          </div>
        );
      }
      if (htmlFormItem.type === "outputvideo") {
        console.log(htmlFormItem);
        htmlFormArray.push(
          <div
            className="org-datainputsection esp"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <Htmlforminputoutputvideo
              radiogroupname="testrg"
              previewImageHtmlId="testimg"
              previewVideoHtmlId="testvideo"
              imageHtmlId="testimg"
              videoHtmlId=""
              folderUrl="gouthama/student"
              fileName="profilepic"
              isInputnotOuptut="false"
            />
          </div>
        );
      }

      if (htmlFormItem.type === "inputtext") {
        htmlFormArray.push(
          <div
            className="org-datainputsection esp"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">
              {htmlFormItem.required === "true" ? (
                <span className="org-redc">*</span>
              ) : (
                ""
              )}
              {htmlFormItem.label}
            </div>
            {htmlFormItem.readonly == "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required == "true" ? (
              <input
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                defaultValue={htmlFormItem.defaultvalue}
                onChange={this.inputchngHandler}
                onKeyUp={this.props.inputKeyUp}
                required
              />
            ) : (
              <input
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                defaultValue={htmlFormItem.defaultvalue}
                onChange={this.inputchngHandler}
                onKeyUp={this.props.inputKeyUp}
              />
            )}
          </div>
        );
      }
      if (htmlFormItem.type === "inputnumber") {
        htmlFormArray.push(
          <div
            className="org-datainputsection esp "
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">
              {htmlFormItem.required === "true" ? (
                <span className="org-redc">*</span>
              ) : (
                ""
              )}
              {htmlFormItem.label}
            </div>

            {htmlFormItem.readonly == "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required == "true" ? (
              <input
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.props.inputChanged}
                onKeyUp={this.props.inputKeyUp}
                required
              />
            ) : (
              <input
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.props.inputChanged}
                onKeyUp={this.props.inputKeyUp}
              />
            )}
          </div>
        );
      }
      if (htmlFormItem.type === "inputemail") {
        htmlFormArray.push(
          <div
            className="org-datainputsection esp"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">
              {htmlFormItem.required === "true" ? (
                <span className="org-redc">*</span>
              ) : (
                ""
              )}
              {htmlFormItem.label}
            </div>
            {htmlFormItem.readonly == "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required == "true" ? (
              <input
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.props.inputChanged}
                onKeyUp={this.props.inputKeyUp}
                required
              />
            ) : (
              <input
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.props.inputChanged}
                onKeyUp={this.props.inputKeyUp}
              />
            )}
          </div>
        );
      }

      if (htmlFormItem.type === "outputtext") {
        console.log(htmlFormItem);
        htmlFormArray.push(
          <div
            className="org-datainputsection esp"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel sf">{htmlFormItem.label}</div>
            <div className="org-datainputlabel mf">
              {htmlFormItem.defaultvalue}
            </div>
            {/* <input
              className="org-datainput"
              placeholder={htmlFormItem.placeholder}
              data-name={htmlFormItem.name}
              onChange={this.props.inputChanged}
              onClick={this.btnclkHandler}
              onKeyUp={this.props.inputKeyUp}
              value={htmlFormItem.value}
              required
              disabled
            /> */}
          </div>
        );
      }

      if (htmlFormItem.type === "inputpassword") {
        alert();
        htmlFormArray.push(
          <div
            className="org-datainputsection"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">
              {htmlFormItem.required === "true" ? (
                <span className="org-redc">*</span>
              ) : (
                ""
              )}
              {htmlFormItem.label}
            </div>
            {htmlFormItem.readonly == "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required == "true" ? (
              <input
                type="password"
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.inputchngHandler}
                onKeyUp={this.props.inputKeyUp}
                required
              />
            ) : (
              <input
                type="password"
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.inputchngHandler}
                onKeyUp={this.props.inputKeyUp}
              />
            )}
          </div>
        );
      }

      if (htmlFormItem.type === "inputtextarea") {
        htmlFormArray.push(
          <div
            className="org-datainputsection"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">{htmlFormItem.label}</div>
            {htmlFormItem.readonly == "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required == "true" ? (
              <textarea
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                elementtype="textareainput"
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.props.inputChanged}
                onKeyUp={this.props.inputKeyUp}
                required
              />
            ) : (
              <textarea
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                elementtype="textareainput"
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.props.inputChanged}
                onKeyUp={this.props.inputKeyUp}
              />
            )}
          </div>
        );
      }

      if (htmlFormItem.type === "inputselect") {
        let optionshtml = [];
        optionshtml.push(<option value="">select value</option>);
        for (let i = 0; i < htmlFormItem.options.length; i++) {
          console.log(htmlFormItem.options[i].label);
          console.log(htmlFormItem.options[i]);
          optionshtml.push(
            <option value={htmlFormItem.options[i].name}>
              {htmlFormItem.options[i].label}
            </option>
          );
        }
        htmlFormArray.push(
          <div
            className="org-datainputsection esp"
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">
              {htmlFormItem.required === "true" ? (
                <span className="org-redc">*</span>
              ) : (
                ""
              )}
              {htmlFormItem.label}
            </div>

            {htmlFormItem.readonly == "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required == "true" ? (
              <select
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                defaultValue={htmlFormItem.defaultvalue}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.inputchngHandler}
                onKeyUp={this.props.inputKeyUp}
                required
              >
                {optionshtml}
              </select>
            ) : (
              <select
                className="org-datainput htmlforminputitem"
                placeholder={htmlFormItem.placeholder}
                defaultValue={htmlFormItem.defaultvalue}
                data-name={htmlFormItem.name}
                data-label={htmlFormItem.label}
                data-type={htmlFormItem.type}
                data-clientstatename={htmlFormItem.clientstatename}
                data-clientstatetype={htmlFormItem.clientstatetype}
                onChange={this.inputchngHandler}
                onKeyUp={this.props.inputKeyUp}
              >
                {optionshtml}
              </select>
            )}
          </div>
        );
      }

      if (htmlFormItem.type === "inputdatalist") {
        let optionshtml = [];
        for (let i = 0; i < htmlFormItem.options.length; i++) {
          optionshtml.push(<option>{htmlFormItem.options[i].label}</option>);
        }
        htmlFormArray.push(
          <div
            className="org-datainputsection "
            style={{ width: htmlFormItem.width, display: "inline-block" }}
          >
            <div className="org-datainputlabel">
              {htmlFormItem.required === "true" ? (
                <span className="org-redc">*</span>
              ) : (
                ""
              )}
              {htmlFormItem.label}
            </div>
            {htmlFormItem.readonly === "true" ? (
              htmlFormItem.defaultvalue
            ) : htmlFormItem.required === "true" ? (
              <>
                <input
                  className="org-datainput htmlforminputitem"
                  placeholder={htmlFormItem.placeholder}
                  list="datalistid"
                  data-name={htmlFormItem.name}
                  data-label={htmlFormItem.label}
                  data-type={htmlFormItem.type}
                  data-clientstatename={htmlFormItem.clientstatename}
                  data-clientstatetype={htmlFormItem.clientstatetype}
                  onChange={this.props.inputChanged}
                  onKeyUp={this.props.inputKeyUp}
                  required
                ></input>
                <datalist id="datalistid"> {optionshtml}</datalist>
              </>
            ) : (
              <>
                <input
                  className="org-datainput htmlforminputitem"
                  placeholder={htmlFormItem.placeholder}
                  list="datalistid"
                  data-name={htmlFormItem.name}
                  data-label={htmlFormItem.label}
                  data-type={htmlFormItem.type}
                  data-clientstatename={htmlFormItem.clientstatename}
                  data-clientstatetype={htmlFormItem.clientstatetype}
                  onChange={this.props.inputChanged}
                  onKeyUp={this.props.inputKeyUp}
                ></input>
                <datalist id="datalistid"> {optionshtml}</datalist>
              </>
            )}
          </div>
        );
      }

      if (htmlFormItem.type === "button") {
        htmlFormArray.push(
          <div style={{ width: htmlFormItem.width, display: "inline-block" }}>
            <button
              style={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "#0070D2",
                color: "white",
              }}
              data-name={htmlFormItem.name}
              data-label={htmlFormItem.label}
              data-type={htmlFormItem.type}
              onClick={this.btnclkHandler}
              className="org-datainput"
            >
              {htmlFormItem.label}
            </button>
          </div>
        );
      }

      if (htmlFormItem.type === "html") {
        htmlFormArray.push(
          <div style={{ width: htmlFormItem.width, display: "inline-block" }}>
            <div className="org-datainputlabel">{htmlFormItem.label}</div>
          </div>
        );
      }

      if (htmlFormItem.tabname == "mainpanelheadersection") {
        //  mainpanelheadersectionHtml.push(htmlFormArray);
        htmlTabsectionNamesObject[htmlFormItem.tabname].push(htmlFormArray);
      } else if (htmlFormItem.tabname == "mainpanelfootersection") {
        //    mainpanelfootersectionHtml.push(htmlFormArray);
        htmlTabsectionNamesObject[htmlFormItem.tabname].push(htmlFormArray);
      } else {
        //   mainpaneltabsectionHtml.push(htmlFormArray);
        htmlTabsectionNamesObject[htmlFormItem.tabname].push(htmlFormArray);
      }
    }
    console.log(htmlTabsectionNamesObject);

    let htmlTabsectionNamesObjectHtml = [];
    for (let i in htmlTabsectionNamesObject) {
      console.log(i);
      console.log(htmlTabsectionNamesObject[i]);
      if (i == "mainpanelheadersection") {
        mainpanelheadersectionHtml.push(
          <div style={{ width: "100%" }}>{htmlTabsectionNamesObject[i]}</div>
        );
      } else if (i == "mainpanelfootersection") {
        mainpanelfootersectionHtml.push(
          <div style={{ width: "100%" }}>{htmlTabsectionNamesObject[i]}</div>
        );
      } else {
        if (activeTabName == i) {
          htmlTabsectionNamesObjectHtml.push(
            <div
              style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
              className={i}
            >
              {htmlTabsectionNamesObject[i]}
            </div>
          );
        } else {
          // htmlTabsectionNamesObjectHtml.push(
          //   <div className={i} style={{ width: "100%", display: "none" }}>
          //     {htmlTabsectionNamesObject[i]}
          //   </div>
          // );
        }
      }
    }

    return (
      <div
        style={{
          ...this.props.style,
          color: "black",
          margin: "auto",
          padding: "10px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          backgroundColor:
            this.props.bgcolor === "" ? "#F2F2F2" : this.props.bgcolor,
        }}
      >
        {/* {mainpanelheadersectionHtml}
        {mainpaneltabsectionHtml}
        {mainpanelfootersectionHtml} */}
        {mainpanelheadersectionHtml}
        {htmlTabsectionNamesObjectHtml}
        {mainpanelfootersectionHtml}

        {/* <button
          style={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "#0070D2",
            color: "white",
          }}
        >
          Log In to Sandbox
        </button> */}
      </div>
    );
  }
}

export default F;
