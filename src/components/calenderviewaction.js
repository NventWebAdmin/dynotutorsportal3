import React, { Component } from "react";
//import { GetGoogleIcon } from "./icons";
//import Rteditor from "./richtexteditor";
//import { createRecord } from "../db/index";
import Spinner from "./spinner";

import { getLocalData } from "../js/index";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tomailsearchArray: [],
      attherateindex: "0",
      tomail: "",
      tomailselectedarray: [],
      label: "",
      startdate: "",
      enddate: "",
      starthour: "",
      startmin: "",
      endhour: "",
      endmin: "",
      showSpinner: "false",
    };
  }

  componentDidMount() {
    let { viewMeetingData } = this.props;

    document.getElementById("calenderviewactiondiv").innerHTML =
      viewMeetingData.body;
  }
  cancelMail = () => {
    this.props.onmailsent({ msgObj: {} });
  };
  sendMail = async () => {
    let localdata = getLocalData(this.props);
    console.log(localdata);
    let { orgname, userid } = localdata;
    let {
      tomailselectedarray,
      label,
      startdate,
      starthour,
      startmin,
      enddate,
      endhour,
      endmin,
    } = this.state;
    console.log(this.state);

    // if (startdate === "" && this.props.defaultNewMeetingDate) {
    //   startdate = this.props.defaultNewMeetingDate;
    // }

    // if (starthour === "" && this.props.defaultNewMeetingHour !== undefined) {
    //   starthour = this.props.defaultNewMeetingHour;
    // }

    // if (endhour === "" && this.props.defaultNewMeetingHour !== undefined) {
    //   endhour = this.props.defaultNewMeetingHour;
    // }

    if (starthour.length === 1 || starthour < 10) {
      starthour = "0" + starthour;
    }
    if (startmin.length === 1) {
      startmin = "0" + startmin;
    }
    if (endhour.length === 1 || endhour < 10) {
      endhour = "0" + endhour;
    }
    if (endmin.length === 1) {
      endmin = "0" + endmin;
    }

    startdate = startdate + "T" + starthour + ":" + startmin + ":00";

    if (enddate === "" && this.props.defaultNewMeetingDate) {
      enddate = this.props.defaultNewMeetingDate;
    }
    enddate = enddate + "T" + endhour + ":" + endmin + ":00";

    let body = document.getElementById("calendernewactiondiv").innerHTML;
    console.log(tomailselectedarray);
    if (tomailselectedarray.length === 0) {
      alert("To field cannot be empty");
    } else if (label === "" || label === undefined) {
      alert("label field cannot be empty");
    } else if (
      starthour === "" ||
      starthour === undefined ||
      starthour === "select"
    ) {
      alert("starthour field cannot be empty");
    } else if (
      startmin === "" ||
      startmin === undefined ||
      startmin === "select"
    ) {
      alert("startmin field cannot be empty");
    } else if (
      endhour === "" ||
      endhour === undefined ||
      endhour === "select"
    ) {
      alert("endhour field cannot be empty");
    } else if (endmin === "" || endmin === undefined || endmin === "select") {
      alert("endmin field cannot be empty");
    } else {
      var d = new Date();
      var n = d.getTime();
      console.log(tomailselectedarray);
      let recorddata = {
        orgname: orgname,
        id: "mail-" + userid + n,
        from: userid,
        to: tomailselectedarray.toString(),
        label: label,
        body: body,
      };
      let attendeeuserid = {};
      for (let i = 0; i < tomailselectedarray.length; i++) {
        attendeeuserid[i] = {
          email: "",
          label: tomailselectedarray[i],
          name: tomailselectedarray[i],
          phone: "",
        };
      }

      recorddata = {
        attendeeuserid: attendeeuserid,
        body: body,
        dialnumber: "",
        enddate: enddate,
        eventid: "",
        id: "evt-" + userid + "-" + startdate + "-" + n,
        link: "zoom.com/123",
        locationaddress: "",
        locationgocode: "",
        organizeruserid: userid,
        orgname: orgname,
        passcode: "",
        startdate: startdate,
        label: label,
        type: "zoommeet,orgmeet",
      };

      console.log(recorddata);
      // let result = await createRecord({
      //   objectName: "event",
      //   objectData: recorddata,
      // });
      // if (result.isSuccess === "false") {
      //   alert(result.message);
      // } else {
      //   console.log(recorddata);
      //   this.setState({ showSpinner: "true" });
      //   this.props.onmailsent({ msgObj: {} });
      // }
    }
  };

  selectUser = (x) => {
    let tomailselectedarray = this.state.tomailselectedarray;
    if (!tomailselectedarray.includes(x)) {
      tomailselectedarray.push(x);
    }

    //  let tomail = this.state.tomail;
    // tomail = tomail.replace("@", "");
    this.setState({ tomailselectedarray: tomailselectedarray, tomail: "" });
    console.log(tomailselectedarray);
    document.getElementById("mailnnewactiontolist").style.display = "none";
  };

  removeselecteduser = (x) => {
    let tomailselectedarray = this.state.tomailselectedarray;
    let temparray = [];
    for (let i = 0; i < tomailselectedarray.length; i++) {
      if (tomailselectedarray[i] !== x) temparray.push(tomailselectedarray[i]);
    }
    this.setState({ tomailselectedarray: temparray });
  };

  createElement = (str) => {
    var div = document.createElement("div");
    div.innerHTML = str;
    return div.childNodes;
  };

  render() {
    console.log(this.props);
    let {
      // defaultNewMeetingDate,
      // viewType,
      viewMeetingData,
    } = this.props;
    let {
      //  tomailsearchArray,
      //  tomail,
      // tomailselectedarray,
      startdate,
      enddate,
      starthour,
      endhour,
      showSpinner,
    } = this.state;

    let endmin,
      label,
      body,
      startdatestr,
      enddatesstr,
      startmin,
      meetingURl,
      toArray = [];
    console.log(viewMeetingData);
    if (viewMeetingData !== undefined && viewMeetingData !== "") {
      for (let i in viewMeetingData.attendeeuserid) {
        toArray.push(viewMeetingData.attendeeuserid[i].name);
      }
      console.log(toArray.toString());

      startdate = new Date(viewMeetingData.startdate);
      enddate = new Date(viewMeetingData.enddate);

      let startdateMonth = (startdate.getMonth() + 1).toString();
      if (startdateMonth.length === 1) {
        startdateMonth = "0" + startdateMonth;
      }
      let startdatedate = startdate.getDate().toString();
      if (startdatedate.length === 1) {
        startdatedate = "0" + startdatedate;
      }

      let enddateMonth = (enddate.getMonth() + 1).toString();
      if (enddateMonth.length === 1) {
        enddateMonth = "0" + enddateMonth;
      }
      let enddatedate = enddate.getDate().toString();
      if (enddatedate.length === 1) {
        enddatedate = "0" + enddatedate;
      }
      startdatestr =
        startdate.getFullYear() + "-" + startdateMonth + "-" + startdatedate;
      enddatesstr =
        enddate.getFullYear() + "-" + startdateMonth + "-" + startdatedate;

      starthour = startdate.getHours();
      startmin = startdate.getMinutes();
      endhour = enddate.getHours();
      endmin = enddate.getMinutes();
      label = viewMeetingData.label;
      // body = [];
      // body.push(React.createElement("div", "", viewMeetingData.body));
      console.log(startdate);
      console.log(enddate);
      console.log(starthour);
      console.log(endhour);

      meetingURl = viewMeetingData.internetaccessdata.url;
    }

    return (
      <>
        {showSpinner === "true" ? <Spinner /> : ""}
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          ></span>
          {/* <button contenteditable="true" onClick={this.sendMail}>
            Send
          </button> */}
          <button onClick={this.cancelMail}>Back</button>
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
          <div style={{ position: "relative", width: "90%" }}>
            <div>{toArray.toString()}</div>

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
              {/* {tomailsearchArrayHoverHtml} */}
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
            {/* {tomailselectedarrayHtml} */}
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
            Start Date
          </span>
          <input type="date" name="startdate" defaultValue={startdatestr} />
          {starthour}
          {startmin}
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            End Date
          </span>
          <input type="date" name="enddate" defaultValue={enddatesstr} />
          {endhour}
          {endmin}
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
          {label}
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            Meeting URL
          </span>
          <div
            className="org-cursor org-anchorcolor mf"
            onClick={() => {
              window.open(meetingURl);
            }}
          >
            Join Meeting
          </div>
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
            name="label"
          >
            Body
          </span>
          <div style={{ width: "90%" }}>
            <div
              style={{
                width: "100%",
                //   height: "50vh",
                backgroundColor: "white",
                color: "black",
                overflow: "scroll",
              }}
              // contenteditable="true"
              id="calenderviewactiondiv"
            >
              {body}
            </div>
          </div>
        </div>
        {/* <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          ></span>
          <input style={{ width: "90%" }} type="file" multiple="true" />
        </div> */}
      </>
    );
  }
}

export default F;
