import React from "react";
import {
  sortArray,
  //fieldTypeHtmltoDBmapping,
  getLocalData,
  serverButtonHandler,
} from "../js/index";

export default class F extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTabNamefromState: "", mainpanelHtml: [] };
  }

  componentDidMount() {
    console.log(this.props);
    let { tabs, activetab, defaultactivetab } = this.props.compprops;
    if (activetab === "" || activetab === undefined) {
      activetab = defaultactivetab;
    }
    this.setComponentData(tabs, activetab);
  }

  setComponentData = (tabs, activetab) => {
    console.log(tabs);
    let tabsHtml = [];
    let dataprops = tabs;
    console.log(dataprops);
    let activeTabName = activetab;
    let activeTabNamefromState = this.state.activeTabNamefromState;
    if (activeTabNamefromState !== "") {
      activeTabName = activeTabNamefromState;
    }
    let datapropsarray = [];
    let datapropsarraysorted = [];
    for (let i in dataprops) {
      datapropsarray.push(dataprops[i]);
    }
    datapropsarraysorted = sortArray(datapropsarray, "order", "integer");

    if (activeTabName === "" || activeTabName === undefined) {
      activeTabName = datapropsarraysorted[0].name;
    }

    for (let i = 0; i < datapropsarraysorted.length; i++) {
      console.log(datapropsarraysorted[i]);
      if (datapropsarraysorted[i].name === activeTabName) {
        tabsHtml.push(
          <div
            className="sp activeblack"
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
        );
      } else {
        tabsHtml.push(
          <div
            className="sp "
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
        );
      }
    }
    this.setState({ mainpanelHtml: tabsHtml });
  };

  onTabOpen = (e) => {
    console.log(e.target.dataset);
    if (this.props.onTabOpen) {
      this.props.onTabOpen({
        tabLabel: e.target.dataset.label,
        tabName: e.target.dataset.name,
        tabType: e.target.dataset.type,
      });
      this.setState({ activeTabNamefromState: e.target.dataset.name });
    } else {
      let localdata = getLocalData(this.props);
      let clickprops = { actionid: e.target.dataset.actionid };

      serverButtonHandler({
        localdata: localdata,
        clickprops: clickprops,
        recorddata: "",
      });
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
