import React, { Component } from "react";
import { GetGoogleIcon } from "./icons";
import Rteditor from "./richtexteditor";
import { getRecorddata, createRecord } from "../db/index";
import Spinner from "./spinner";

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
      hostsmail: "",
      tomailselectedarray: [],
      hostsmailselectedarray: [],
      label: "",
      startdate: "",
      enddate: "",
      starthour: "",
      startmin: "",
      endhour: "",
      endmin: "",
      isrecurrent: "",
      recurrencystartdate: "",
      recurrencyenddate: "",
      phoneaccessdialno: "",
      phoneaccesspasscode: "",
      internetaccessmeeingid: "",
      internetaccessmeetingurl: "",
      internetaccesspasscode: "",
      locationaddress: "",
      locationgocode: "",
      showSpinner: "false",
    };
  }

  componentDidMount() {
    let { viewMeetingData, action } = this.props;

    if (action != "new") {
      document.getElementById("calendernewactiondiv").innerHTML =
        viewMeetingData.body;
    }
  }

  cancelMail = () => {
    this.props.onmailsent({ msgObj: {} });
  };
  sendMail = async () => {
    let { defaultdatafilter } = this.props;
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
      isrecurrent,
      recurrencystartdate,
      recurrencyenddate,
      phoneaccessdialno,
      phoneaccesspasscode,
      internetaccessmeeingid,
      internetaccessmeetingurl,
      internetaccesspasscode,
      locationaddress,
      locationgocode,
    } = this.state;
    console.log(this.state);

    if (startdate === "" && this.props.defaultNewMeetingDate) {
      startdate = this.props.defaultNewMeetingDate;
    }

    if (starthour === "" && this.props.defaultNewMeetingHour !== undefined) {
      starthour = this.props.defaultNewMeetingHour;
    }

    if (endhour === "" && this.props.defaultNewMeetingHour !== undefined) {
      endhour = this.props.defaultNewMeetingHour;
    }
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
    // if (tomailselectedarray.length === 0) {
    //   alert("To field cannot be empty");
    // } else
    if (label === "" || label === undefined) {
      alert("Label field cannot be empty");
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
      console.log(tomailselectedarray);

      // let attendeeuserid = {};
      // for (let i = 0; i < tomailselectedarray.length; i++) {
      //   attendeeuserid[i] = {
      //     email: "",
      //     label: tomailselectedarray[i],
      //     name: tomailselectedarray[i],
      //     phone: "",
      //   };
      // }
      var d = new Date();
      var n = d.getTime();

      let recorddata = {
        id: "evt-" + userid + "-" + startdate + "-" + n,

        attendeeuserid: {},
        body: body,

        class: "2nd Standard",
        subject: "Maths",

        enddate: enddate,
        hostuserid: {},
        internetaccessdata: {
          meetingid: internetaccessmeeingid,
          passcode: internetaccesspasscode,
          url: internetaccessmeetingurl,
        },
        label: label,
        locationdata: {
          fulladdress: locationaddress,
          gocode: locationgocode,
        },
        createduserid: userid,
        organizeruserid: userid,
        orgname: orgname,
        phoneaccessdata: {
          dialnumber: phoneaccessdialno,
          dialpasscode: phoneaccesspasscode,
        },
        recurrency: {
          enddate: recurrencyenddate,
          isrecurring: isrecurrent,
          startdate: recurrencystartdate,
          type: "daily",
        },
        startdate: startdate,

        type: "zoommeet,orgmeet",
      };

      for (let i in defaultdatafilter) {
        recorddata[i] = defaultdatafilter[i];
      }

      console.log(recorddata);
      let result = await createRecord({
        objectName: "event",
        objectData: recorddata,
      });
      if (result.isSuccess === "false") {
        alert(result.message);
      } else {
        console.log(recorddata);
        this.setState({ showSpinner: "true" });
        this.props.onmailsent({ msgObj: {} });
      }
    }
  };
  handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "label") {
      this.setState({ label: e.target.value });
    }
    if (e.target.name === "startdate") {
      this.setState({ startdate: e.target.value });
    }
    if (e.target.name === "enddate") {
      this.setState({ enddate: e.target.value });
    }
    if (e.target.name === "starthour") {
      this.setState({ starthour: e.target.value });
    }
    if (e.target.name === "startmin") {
      this.setState({ startmin: e.target.value });
    }
    if (e.target.name === "endhour") {
      this.setState({ endhour: e.target.value });
    }
    if (e.target.name === "endmin") {
      this.setState({ endmin: e.target.value });
    }

    if (e.target.name === "isrecurrent") {
      this.setState({ isrecurrent: e.target.value });
    }
    if (e.target.name === "recurrencystartdate") {
      this.setState({ recurrencystartdate: e.target.value });
    }
    if (e.target.name === "recurrencyenddate") {
      this.setState({ recurrencyenddate: e.target.value });
    }
    if (e.target.name === "phoneaccessdialno") {
      this.setState({ phoneaccessdialno: e.target.value });
    }
    if (e.target.name === "phoneaccesspasscode") {
      this.setState({ phoneaccesspasscode: e.target.value });
    }
    if (e.target.name === "internetaccessmeeingid") {
      this.setState({ internetaccessmeeingid: e.target.value });
    }
    if (e.target.name === "internetaccessmeetingurl") {
      this.setState({ internetaccessmeetingurl: e.target.value });
    }
    if (e.target.name === "internetaccesspasscode") {
      this.setState({ internetaccesspasscode: e.target.value });
    }
    if (e.target.name === "locationaddress") {
      this.setState({ locationaddress: e.target.value });
    }

    if (e.target.name === "locationgocode") {
      this.setState({ locationgocode: e.target.value });
    }

    // if (e.target.name === "mailnnewactionto") {
    //   if (e.target.value.includes("@")) {
    //     this.setState({
    //       tomailsearchArray: [
    //         { label: "pradeep", name: "pradeep" },
    //         { label: "harika", name: "harika" },
    //         { label: "mom", name: "mom" },
    //       ],
    //       tomail: e.target.value,
    //     });
    //     document.getElementById("mailnnewactiontolist").style.display = "block";
    //   } else {
    //     document.getElementById("mailnnewactiontolist").style.display = "none";
    //   }
    // }
    // if (e.target.name === "mailnnewactionhosts") {
    //   if (e.target.value.includes("@")) {
    //     this.setState({
    //       tomailsearchArray: [
    //         { label: "pradeep", name: "pradeep" },
    //         { label: "harika", name: "harika" },
    //         { label: "mom", name: "mom" },
    //       ],
    //       tomail: e.target.value,
    //     });
    //     document.getElementById("mailnnewactionhostslist").style.display =
    //       "block";
    //   } else {
    //     document.getElementById("mailnnewactionhostslist").style.display =
    //       "none";
    //   }
    // }
    console.log(this.state);
  };

  // tomailselectUser = (x) => {
  //   let tomailselectedarray = this.state.tomailselectedarray;
  //   if (!tomailselectedarray.includes(x)) {
  //     tomailselectedarray.push(x);
  //   }

  //   let tomail = this.state.tomail;
  //   tomail = tomail.replace("@", "");
  //   this.setState({ tomailselectedarray: tomailselectedarray, tomail: "" });
  //   console.log(tomailselectedarray);
  //   document.getElementById("mailnnewactiontolist").style.display = "none";
  // };

  // removeselecteduser = (x) => {
  //   let tomailselectedarray = this.state.tomailselectedarray;
  //   let temparray = [];
  //   for (let i = 0; i < tomailselectedarray.length; i++) {
  //     if (tomailselectedarray[i] !== x) temparray.push(tomailselectedarray[i]);
  //   }
  //   this.setState({ tomailselectedarray: temparray });
  // };

  render() {
    console.log(this.props);
    let { defaultNewMeetingDate, viewMeetingData, action } = this.props;
    let {
      tomailsearchArray,
      tomail,
      //  tomailselectedarray,

      startdate,
      enddate,
      starthour,
      endhour,
      startmin,
      endmin,
      showSpinner,
    } = this.state;

    let hourOptionhtml = [];
    let minuteOptionhtml = [];
    let startdatestr, enddatesstr;
    hourOptionhtml.push(<option>Select</option>);
    for (let i = 0; i < 23; i++) {
      hourOptionhtml.push(<option>{i}</option>);
    }

    minuteOptionhtml.push(<option>Select</option>);
    minuteOptionhtml.push(<option value="0">00</option>);
    minuteOptionhtml.push(<option value="15">15</option>);
    minuteOptionhtml.push(<option value="30">30</option>);
    minuteOptionhtml.push(<option value="45">45</option>);

    if (action === "new") {
      if (!startdate && defaultNewMeetingDate) {
        viewMeetingData.startdate = defaultNewMeetingDate;
      }
      if (!enddate && defaultNewMeetingDate) {
        viewMeetingData.enddate = defaultNewMeetingDate;
      }

      if (starthour === "" && this.props.defaultNewMeetingHour !== undefined) {
        starthour = this.props.defaultNewMeetingHour;
        startmin = 0;
      }

      if (endhour === "" && this.props.defaultNewMeetingHour !== undefined) {
        endhour = this.props.defaultNewMeetingHour;
        endmin = 0;
      }

      // let tomailsearchArrayHoverHtml = [];
      // let tomailselectedarrayHtml = [];
      // for (let i = 0; i < tomailsearchArray.length; i++) {
      //   tomailsearchArrayHoverHtml.push(
      //     <div
      //       style={{ border: "1px solid black", padding: "5px" }}
      //       onClick={() => {
      //         this.tomailselectUser(tomailsearchArray[i].name);
      //       }}
      //     >
      //       {tomailsearchArray[i].label}
      //     </div>
      //   );
      // }

      // for (let i = 0; i < tomailselectedarray.length; i++) {
      //   tomailselectedarrayHtml.push(<span>{tomailselectedarray[i]}</span>);
      //   tomailselectedarrayHtml.push(
      //     <GetGoogleIcon
      //       name="close"
      //       onClick={() => this.removeselecteduser(tomailselectedarray[i])}
      //     />
      //   );
      // }
    } else {
      startdate = new Date(viewMeetingData.startdate);
      enddate = new Date(viewMeetingData.enddate);

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
      viewMeetingData.startdate =
        startdate.getFullYear() + "-" + startdateMonth + "-" + startdatedate;
      viewMeetingData.enddate =
        enddate.getFullYear() + "-" + startdateMonth + "-" + startdatedate;

      starthour = startdate.getHours();
      startmin = startdate.getMinutes();
      endhour = enddate.getHours();
      endmin = enddate.getMinutes();
    }
    return (
      <>
        {showSpinner === "true" ? <Spinner /> : ""}
        {/* <div className="org-fr">
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
        */}

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
          <input
            type="date"
            name="startdate"
            onChange={this.handleChange}
            defaultValue={viewMeetingData.startdate}
          />
          <select
            name="starthour"
            onChange={this.handleChange}
            defaultValue={starthour}
          >
            {hourOptionhtml}
          </select>
          <select
            name="startmin"
            onChange={this.handleChange}
            defaultValue={startmin}
          >
            {minuteOptionhtml}
          </select>
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
          <input
            type="date"
            name="enddate"
            onChange={this.handleChange}
            defaultValue={viewMeetingData.enddate}
          />
          <select
            name="endhour"
            onChange={this.handleChange}
            defaultValue={endhour}
          >
            {hourOptionhtml}
          </select>
          <select
            name="endmin"
            onChange={this.handleChange}
            defaultValue={endmin}
          >
            {minuteOptionhtml}
          </select>
        </div>

        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            Recurrency
          </span>

          <span className="org-fc">
            Isrecurrent?
            <input
              type="checkbox"
              name="isrecurrent"
              onChange={this.handleChange}
              defaultValue={viewMeetingData.recurrency.isrecurring}
            />
          </span>

          <span className="org-fc">
            Start Date
            <input
              type="date"
              name="recurrencystartdate"
              onChange={this.handleChange}
              defaultValue={viewMeetingData.recurrency.startdate}
            />
          </span>

          <span className="org-fc">
            End Date
            <input
              type="date"
              name="recurrencyenddate"
              onChange={this.handleChange}
              defaultValue={viewMeetingData.recurrency.enddate}
            />
          </span>
        </div>

        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            Phone Access
          </span>

          <span className="org-fc">
            Dial Number
            <input
              name="phoneaccessdialno"
              onChange={this.handleChange}
              defaultValue={viewMeetingData.phoneaccessdata.dialnumber}
            />
          </span>

          <span className="org-fc">
            Passcode
            <input
              name="phoneaccesspasscode"
              onChange={this.handleChange}
              defaultValue={viewMeetingData.phoneaccessdata.dialpasscode}
            />
          </span>
        </div>

        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            Internet Access
          </span>

          <span className="org-fc">
            Meeting Id
            <input
              name="internetaccessmeeingid"
              onChange={this.handleChange}
              defaultValue={viewMeetingData.internetaccessdata.meetingid}
            />
          </span>

          <span className="org-fc">
            Url
            <input
              name="internetaccessmeetingurl"
              onChange={this.handleChange}
              defaultValue={viewMeetingData.internetaccessdata.url}
            />
          </span>

          <span className="org-fc">
            Passcode
            <input
              name="internetaccesspasscode"
              onChange={this.handleChange}
              defaultValue={viewMeetingData.internetaccessdata.passcode}
            />
          </span>
        </div>

        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            Location
          </span>

          <span className="org-fc">
            Addess
            <textarea
              name="locationaddress"
              onChange={this.handleChange}
              rows="5"
              defaultValue={viewMeetingData.locationdata.fulladdress}
            />
          </span>
          <span className="org-fc">
            Zipcode
            <input
              name="locationgocode"
              onChange={this.handleChange}
              defaultValue={viewMeetingData.locationdata.gocode}
            />
          </span>
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
            name="label"
            style={{ width: "90%" }}
            onChange={this.handleChange}
            defaultValue={viewMeetingData.subject}
          />
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
                height: "50vh",
                backgroundColor: "white",
                color: "black",
              }}
              contenteditable="true"
              id="calendernewactiondiv"
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
          <button contenteditable="true" onClick={this.cancelMail}>
            Cancel
          </button>

          <Rteditor htmlid="calendernewactiondiv" />

          <button
            onClick={() => {
              alert(document.getElementById("id1").innerHTML);
            }}
          >
            showvlue
          </button>
        </div>
      </>
    );
  }
}

export default F;
