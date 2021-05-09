import React, { Component } from "react";
import { GetGoogleIcon } from "./icons";
import Rteditor from "./richtexteditor";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";

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
      tomailsearchArray: [],
      attherateindex: "0",
      tomail: "",
      tomailselectedarray: [],
      subject: "",
    };
  }

  componentDidMount() {
    let { viewMailData } = this.props;
    document.getElementById("mailviewactiondiv").innerHTML = viewMailData.body;
  }

  cancelMail = () => {
    this.props.backHandler({ msgObj: {} });
  };

  render() {
    console.log(this.props);
    let { viewMailData } = this.props;
    let fromMail, toMail, subject, body;
    console.log(viewMailData);
    if (viewMailData != undefined && viewMailData != "") {
      // for (let i in viewMailData.attendeeuserid) {
      //   toArray.push(viewMailData.attendeeuserid[i].name);
      // }
      // console.log(toArray.toString());
      //     subject = viewMailData.subject;
      fromMail = viewMailData.from;
      toMail = viewMailData.to;
      subject = viewMailData.subject;
      body = viewMailData.body;
    }

    return (
      <>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            From
          </span>
          <div style={{ position: "relative", width: "90%" }}>{fromMail}</div>
        </div>

        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            To
          </span>
          <div style={{ position: "relative", width: "90%" }}>{toMail}</div>
        </div>

        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            Subject
          </span>
          {subject}
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
            name="subject"
          >
            Body
          </span>
          <div style={{ width: "90%" }}>
            <div
              style={{
                width: "100%",
                height: "50vh",
                backgroundColor: "white",
                color: "black",
              }}
              contenteditable="true"
              id="mailviewactiondiv"
            ></div>
          </div>
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          ></span>
          <input style={{ width: "90%" }} type="file" multiple="true" />
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          ></span>
          <button onClick={this.cancelMail}>Back</button>
        </div>
      </>
    );
  }
}

export default F;
