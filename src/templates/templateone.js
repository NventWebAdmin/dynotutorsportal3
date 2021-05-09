import React, { Component } from "react";
import Logo from "../images/snowmount.jpg";
import "../App.css";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let logoHtml = [];
    logoHtml.push(
      <h1 key="logo" className="sp">
        Dynotutors
      </h1>
    );

    let navmenuUtemHtml = [];
    let navmenuHtml = [];
    navmenuUtemHtml.push(<div key="online">Online Tutoring</div>);
    navmenuUtemHtml.push(<div key="about">About Us</div>);
    navmenuUtemHtml.push(<div key="ourdiff">Our Difference</div>);
    navmenuUtemHtml.push(<div key="revi">Reviews</div>);
    navmenuUtemHtml.push(<div key="free">Free Consultation</div>);
    navmenuHtml.push(
      <div
        key="navmenuitem"
        className="org-fr org-fjc-e org-fai-c org-cdivleft-lp org-cdivv-mp lf"
      >
        {navmenuUtemHtml}
      </div>
    );

    let siteintroBodyLeftHtml = [];
    siteintroBodyLeftHtml.push(
      <div key="bodyleft1" style={{ width: "70%" }}>
        <div style={{ fontSize: "3vw" }}>
          Tutoring Services for all All Ages & Levels
        </div>
        <br />
        <br />

        <div style={{ fontSize: "2vw" }}>Customized Tutoring programs</div>
        <div style={{ fontSize: "2vw" }}>
          In-home and online tutoring for comfort & convenience
        </div>
        <br />
        <br />

        <div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              width: "30%",
              textAlign: "center",
            }}
          >
            Get Started
          </div>
        </div>
      </div>
    );

    let siteintroHtml = [];
    siteintroHtml.push(
      <div key="siteintro1" style={{ position: "relative", width: "100%" }}>
        <img
          alt="test"
          src={Logo}
          width="100%"
          height="600px"
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", left: "5%", top: "15%" }}>
          {siteintroBodyLeftHtml}
        </div>
      </div>
    );

    let sitebodyHtml = [];
    sitebodyHtml.push(
      <div key="sitebody" className="org-fr lm">
        <div className="org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p mp">
          <div className="elf">Tutoring Services in Park Cities</div>
          <br />
          <div className="mf">
            Are you struggling to keep up with your coursework? Do you want to
            get a head start on the next school year? At Tutor Doctor Park
            Cities, we know how important your education is and our tutors can
            provide you with the skills you need to reach your academic goals.
            With our In-home and online tutoring, you can benefit from learning
            in an environment you are comfortable in, at times that fit best
            with your schedule. Making a difference in the life of students is
            at the heart of what we do. Contact us today and discover why so
            many people trust us with all of their tutoring needs.
          </div>
        </div>
        <div className="org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p mp">
          <img
            alt="test"
            src={Logo}
            width="100%"
            height="300px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    );
    sitebodyHtml.push(
      <div key="body1" className="org-fr lm">
        <div className="org-flexbasis-100p org-mflexbasis-33p org-lflexbasis-33p mp mf">
          <div className="elf">test</div>
          Are you struggling to keep up with your coursework? Do you want to get
          a head start on the next school year? At Tutor Doctor Park Cit
        </div>
        <div className="org-flexbasis-100p org-mflexbasis-33p org-lflexbasis-33p mp mf">
          <div className="elf">test</div>
          Are you struggling to keep up with your coursework? Do you want to get
          a head start on the next school year? At Tutor Doctor Park Cit
        </div>
        <div className="org-flexbasis-100p org-mflexbasis-33p org-lflexbasis-33p mp mf">
          <div className="elf">test</div>
          Are you struggling to keep up with your coursework? Do you want to get
          a head start on the next school year? At Tutor Doctor Park Cit
        </div>
      </div>
    );

    sitebodyHtml.push(
      <div key="sitebody3" className="org-fr lm">
        <div className="org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p mp">
          <img
            alt="test"
            src={Logo}
            width="100%"
            height="300px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p mp">
          <div className="elf">Tutoring Services in Park Cities</div>
          <br />
          <div className="mf">
            Are you struggling to keep up with your coursework? Do you want to
            get a head start on the next school year? At Tutor Doctor Park
            Cities, we know how important your education is and our tutors can
            provide you with the skills you need to reach your academic goals.
            With our In-home and online tutoring, you can benefit from learning
            in an environment you are comfortable in, at times that fit best
            with your schedule. Making a difference in the life of students is
            at the heart of what we do. Contact us today and discover why so
            many people trust us with all of their tutoring needs.
          </div>
        </div>
      </div>
    );

    sitebodyHtml.push(
      <div
        key="sitebody4"
        className="org-fr org-fjc-c org-fai-c  org-flexbasis-100p"
      >
        <div className="eeelf org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p">
          Still have questions ? chat us or
          <br />
          <br />
          <div
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            Get Started
          </div>
          <br />
          <br />
        </div>
      </div>
    );

    return (
      <div key="templateone" style={{ color: "black" }}>
        <div className="org-fr org-fai-c hmm ">
          <div className="org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p ">
            {logoHtml}
          </div>
          <div className="org-flexbasis-100p org-mflexbasis-80p org-lflexbasis-80p ">
            {navmenuHtml}
          </div>
        </div>

        <div className="org-fr org-fai-c hmm">{siteintroHtml}</div>
        <div className="org-fr org-fai-c">{sitebodyHtml}</div>
      </div>
    );
  }
}

export default F;
