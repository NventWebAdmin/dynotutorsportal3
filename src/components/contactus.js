import React, { Component } from "react";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      body: "",
      fromname: "",
      course: "",
      fromemail: "",
      fromphoneno: "",
    };
  }

  sendmail = () => {
    let { toemail, templatesubject, templatebody } = this.props.compprops;
    let { fromname, fromemail, fromphoneno, course } = this.state;
    if (fromname === "" || fromemail === "" || course === "") {
      let emptyfield = "";
      if (fromname === "") {
        emptyfield = emptyfield + " Name, ";
      }
      if (fromemail === "") {
        emptyfield = emptyfield + " Email, ";
      }
      if (course === "") {
        emptyfield = emptyfield + " Course, ";
      }
      alert("plese enter required details :" + emptyfield);
    } else {
      let subject = templatesubject.replace(/templatefromnametext/g, fromname);
      subject = subject.replace(/templatefromemailtext/g, fromemail);
      subject = subject.replace(/templatefromphonenotext/g, fromphoneno);
      subject = subject.replace(/templatecoursetext/g, course);
      let body = templatebody.replace(/templatefromnametext/g, fromname);
      body = body.replace(/templatefromemailtext/g, fromemail);
      body = body.replace(/templatefromphonenotext/g, fromphoneno);
      body = body.replace(/templatecoursetext/g, course);

      window.open(
        `https://mail.google.com/mail/u/0/?fs=1&to=${toemail}&su=${subject}&body=${body}&tf=cm`
      );
    }
  };

  render() {
    return (
      <div className="org-cdivv-esp">
        <div>
          <div>
            <b>Name</b>
          </div>
          <div>
            <input
              style={{ width: "50%" }}
              onChange={(e) => {
                this.setState({ fromname: e.target.value.trim() });
              }}
            />
          </div>
        </div>

        <div>
          <div>
            <b>Email</b>
          </div>
          <div>
            <input
              style={{ width: "50%" }}
              onChange={(e) => {
                this.setState({ fromemail: e.target.value.trim() });
              }}
            />
          </div>
        </div>

        <div>
          <div>
            <b>Course</b>
          </div>
          <div>
            <input
              style={{ width: "50%" }}
              onChange={(e) => {
                this.setState({ course: e.target.value.trim() });
              }}
            />
          </div>
        </div>

        <div>
          <div>
            <b>Contact No</b>
          </div>
          <div>
            <input
              style={{ width: "50%" }}
              onChange={(e) => {
                this.setState({ fromphoneno: e.target.value.trim() });
              }}
            />
          </div>
        </div>

        <div>
          <button onClick={this.sendmail}>Submit</button>
        </div>
      </div>
    );
  }
}

export default F;
