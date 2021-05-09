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
  sendMail = async () => {
    let localdata = getLocalData(this.props);
    console.log(localdata);
    let { orgname, userid } = localdata;
    let { tomailselectedarray, subject } = this.state;
    var d = new Date();
    var n = d.getTime();

    let body = document.getElementById("mailnewactiondiv").innerHTML;
    console.log(tomailselectedarray);
    if (tomailselectedarray.length == 0) {
      alert("To field cannot be empty");
    } else if (subject == "" || subject == undefined) {
      alert("Subject field cannot be empty");
    } else {
      console.log(tomailselectedarray);
      let recorddata = {
        orgname: orgname,
        id: "mail-" + userid + n,
        from: userid,
        to: tomailselectedarray.toString(),
        subject: subject,
        body: body,
      };
      console.log(recorddata);
      let result = await createRecord({
        objectName: "orgmail",
        objectData: recorddata,
      });
      if (result.isSuccess === "false") {
        alert(result.message);
      } else {
        console.log(recorddata);
        let msgObj = {
          messagetype: "mailsent-notify-recipitent",
          message: "",
          orgname: orgname,
          id: "mail-" + userid + n,
          from: userid,
          userid: userid,
          to: tomailselectedarray.toString(),
          subject: subject,
          body: body,
        };
        console.log(JSON.stringify(msgObj));
        this.props.onmailsent({ msgObj: msgObj });
      }
    }
  };
  handleChange = (e) => {
    if (e.target.name == "subject") {
      this.setState({ subject: e.target.value });
    }
    if (e.target.name == "mailnnewactionto") {
      if (e.target.value.includes("@")) {
        this.setState({
          tomailsearchArray: [
            { label: "pradeep", name: "pradeep" },
            { label: "kishan", name: "kishan" },
            { label: "mom", name: "mom" },
          ],
          tomail: e.target.value,
        });
        document.getElementById("mailnnewactiontolist").style.display = "block";
      } else {
        document.getElementById("mailnnewactiontolist").style.display = "none";
      }
    }
  };

  selectUser = (x) => {
    let tomailselectedarray = this.state.tomailselectedarray;
    if (!tomailselectedarray.includes(x)) {
      tomailselectedarray.push(x);
    }

    let tomail = this.state.tomail;
    tomail = tomail.replace("@", "");
    this.setState({ tomailselectedarray: tomailselectedarray, tomail: "" });
    console.log(tomailselectedarray);
    document.getElementById("mailnnewactiontolist").style.display = "none";
  };

  cancelMail = () => {
    this.props.backHandler({ msgObj: {} });
  };

  removeselecteduser = (x) => {
    let tomailselectedarray = this.state.tomailselectedarray;
    let temparray = [];
    for (let i = 0; i < tomailselectedarray.length; i++) {
      if (tomailselectedarray[i] != x) temparray.push(tomailselectedarray[i]);
    }
    this.setState({ tomailselectedarray: temparray });
  };

  render() {
    console.log(this.props);

    let { tomailsearchArray, tomail, tomailselectedarray } = this.state;
    let tomailsearchArrayHoverHtml = [];
    let tomailselectedarrayHtml = [];
    for (let i = 0; i < tomailsearchArray.length; i++) {
      tomailsearchArrayHoverHtml.push(
        <div
          style={{ border: "1px solid black", padding: "5px" }}
          onClick={() => {
            this.selectUser(tomailsearchArray[i].name);
          }}
        >
          {tomailsearchArray[i].label}
        </div>
      );
    }
    for (let i = 0; i < tomailselectedarray.length; i++) {
      tomailselectedarrayHtml.push(<span>{tomailselectedarray[i]}</span>);
      tomailselectedarrayHtml.push(
        <GetGoogleIcon
          name="close"
          onClick={() => this.removeselecteduser(tomailselectedarray[i])}
        />
      );
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
            To
          </span>
          <div style={{ position: "relative", width: "90%" }}>
            <div>
              <input
                style={{ width: "100%" }}
                onChange={this.handleChange}
                name="mailnnewactionto"
                value={this.state.tomail}
              />
            </div>

            <div
              style={{
                position: "absolute",
                zIndex: 1,
                top: "100%",
                left: 0,
                backgroundColor: "red",
                display: "none",
              }}
              id="mailnnewactiontolist"
            >
              {tomailsearchArrayHoverHtml}
            </div>
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
          <div
            className="org-fr org-fai-c
        "
          >
            {tomailselectedarrayHtml}
          </div>
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
          <input
            name="subject"
            style={{ width: "90%" }}
            onChange={this.handleChange}
          />
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
              id="mailnewactiondiv"
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
          <button contenteditable="true" onClick={this.sendMail}>
            Send
          </button>
          <button onClick={this.cancelMail}>Back</button>

          <Rteditor htmlid="mailnewactiondiv" />
        </div>
      </>
    );
  }
}

export default F;
