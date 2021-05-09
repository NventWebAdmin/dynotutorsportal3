import React, { Component } from "react";
import Calender from "../components/calender";
import Contactus from "../components/contactus";
import Mycourses from "../components/mycourses";
import Notepad from "../components/notepadlist";
import Recorddatalistortable from "../components/recorddatalistortable2";
import Faqs from "../components/faqs";
import "../App.css";
import Uigen from "../components/uigen2";
import localdbdata from "../db/localdb/pageperprofiledata.json";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = { synceventprops: {} };
  }

  tabClick = (props) => {
    let { maintab, dropdown, rightdropdown } = props;
    // console.log(x);
    if (rightdropdown !== "") {
      window.location.assign(
        "/" + maintab + "/" + dropdown + "/" + rightdropdown
      );
    } else if (dropdown !== "") {
      window.location.assign("/" + maintab + "/" + dropdown);
    } else {
      if (maintab === "") {
        window.location.assign("/");
      } else {
        window.location.assign("/" + maintab);
      }
    }
  };

  logout = (props) => {
    let { sitelogouturl } = props;
    sessionStorage.clear();
    window.location.assign(sitelogouturl);
  };

  createSyncEvent = (props) => {
    alert();
    this.setState({ synceventprops: props });
  };

  render() {
    let { synceventprops } = this.state;
    let { siteprops } = this.props;
    let {
      // sitelogourl,
      siteheaderorgname,
      siteheadernavmenuitems,
      siteintroposition,
      siteintroimgsrc,
      siteintroheading,
      siteintrosubheading,
      siteintroinputplaceholder,
      siteintrobuttonlabel,
      sitebodyarray,
      sitefooterlinks1,
      sitefooterlinks2,
      siteorgphone,
      siteorgemail,
      siteportalurl,
      sitelogouturl,
      //   siteorgaddress,
      sitesociallinks,
    } = siteprops;
    console.log(siteprops);
    let url = new URL(document.location);
    console.log(url);
    let pathname = url.pathname;
    let activemaintab = "";
    let activedropdown = "";
    let activerightdropdown = "";
    let pathnameArray = pathname.split("/");
    console.log(pathnameArray);

    activemaintab = pathnameArray[1] ? pathnameArray[1] : "";
    activedropdown = pathnameArray[2] ? pathnameArray[2] : "";
    activerightdropdown = pathnameArray[3] ? pathnameArray[3] : "";
    console.log(activemaintab);
    console.log(activedropdown);
    console.log(activerightdropdown);

    // site header begin

    let navmenuRowHtml = [];

    // first nav start
    navmenuRowHtml.push(
      <div key="navmenuloginrow" className="org-fr org-fai-c  org-fjc-sb ">
        <div></div>
        {siteportalurl != "" ? (
          <div
            className="sph org-cursor"
            onClick={() => {
              window.open(siteportalurl, "_self");
            }}
          >
            Sign In / Register
          </div>
        ) : (
          ""
        )}
        {sitelogouturl != "" ? (
          <div
            className="sph org-cursor"
            onClick={() => {
              this.logout({ sitelogouturl: sitelogouturl });
            }}
          >
            Logout
          </div>
        ) : (
          ""
        )}
      </div>
    );

    // first nav end
    // second nav start
    let navmenuItemHtml = [];
    let navmenuHtml = [];
    for (let i in siteheadernavmenuitems) {
      if (siteheadernavmenuitems[i].isactive === "true") {
        let dropdownitems = siteheadernavmenuitems[i].dropdownitems;

        if (Object.keys(dropdownitems).length > 0) {
          let dropdownitemshtml = [];
          for (let j in dropdownitems) {
            if (dropdownitems[j].isactive === "true") {
              let rightdropdownitems = dropdownitems[j].dropdownitems;
              let rightdropdownitemshtml = [];
              if (Object.keys(rightdropdownitems).length > 0) {
                for (let k in rightdropdownitems) {
                  if (rightdropdownitems[k].isactive === "true") {
                    rightdropdownitemshtml.push(
                      <div
                        key={k}
                        className="org-fr org-fjc-sb org-fai-c sp org-bb"
                        onClick={() =>
                          this.tabClick({
                            maintab: siteheadernavmenuitems[i].name,
                            dropdown: dropdownitems[j].name,
                            rightdropdown: rightdropdownitems[k].name,
                          })
                        }
                      >
                        {rightdropdownitems[k].label}
                      </div>
                    );
                  }
                }
                dropdownitemshtml.push(
                  <div className="dropdown2" key={dropdownitems[j].name}>
                    <span className="org-fr org-fjc-sb org-fai-c sp org-bb">
                      {dropdownitems[j].label}{" "}
                      <i className="fa fa-angle-right esp"></i>
                    </span>{" "}
                    <div className="dropdown2-contentright">
                      {rightdropdownitemshtml}
                    </div>
                  </div>
                );
              } else {
                dropdownitemshtml.push(
                  <div
                    key={dropdownitems[j].name}
                    className="dropdown2  org-fr org-fjc-sb org-fai-c esp org-bb"
                    onClick={() =>
                      this.tabClick({
                        maintab: siteheadernavmenuitems[i].name,
                        dropdown: dropdownitems[j].name,
                        rightdropdown: "",
                      })
                    }
                  >
                    {dropdownitems[j].label}
                  </div>
                );
              }
            }
          }

          navmenuItemHtml.push(
            <div key={i}>
              <div className="dropdown">
                <span>{siteheadernavmenuitems[i].label}</span>
                <i className="fa fa-angle-down esp"></i>
                <div className="dropdown-content">{dropdownitemshtml}</div>
              </div>
            </div>
          );
        } else {
          navmenuItemHtml.push(
            <div key={i}>
              <div
                className="dropdown"
                onClick={() =>
                  this.tabClick({
                    maintab: siteheadernavmenuitems[i].name,
                    dropdown: "",
                    rightdropdown: "",
                  })
                }
              >
                {siteheadernavmenuitems[i].label}
              </div>
            </div>
          );
        }
      }
    }

    navmenuHtml.push(
      <div
        key="navmenuitem"
        className="org-fr org-fjc-e org-fai-c org-cdivleft-lp mf"
      >
        {navmenuItemHtml}
      </div>
    );

    let logoHtml = [];
    logoHtml.push(
      <div
        key="logo"
        className="elf "
        onClick={() =>
          this.tabClick({ maintab: "", dropdown: "", rightdropdown: "" })
        }
      >
        <b> {siteheaderorgname}</b>
      </div>
    );

    navmenuRowHtml.push(
      <div key="navmenurow" className="org-fr org-fai-c ">
        <div className="org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p sp ">
          {logoHtml}
        </div>
        <div className="org-flexbasis-100p org-mflexbasis-80p org-lflexbasis-80p sp ">
          {navmenuHtml}
        </div>
      </div>
    );
    // second nav end

    // site header end

    let siteintroBodyLeftHtml = [];
    siteintroBodyLeftHtml.push(
      <div key="siteintrobodyleft" style={{ width: "100%", color: "white" }}>
        <div style={{ fontSize: "50px" }}>{siteintroheading}</div>
        <br />
        <br />
        <div style={{ fontSize: "30px" }}>{siteintrosubheading}</div>
        <br />
        <br />
        <div className="org-fr org-fai-c">
          {siteintroinputplaceholder !== "" ? (
            <div
              style={{
                backgroundColor: "white",
                width: "75%",
                height: "50px",
                textAlign: "center",
                padding: "10px",
              }}
            >
              <input
                placeholder={siteintroinputplaceholder}
                style={{
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  border: 0,
                }}
              />
            </div>
          ) : (
            ""
          )}
          {siteintrobuttonlabel !== "" ? (
            <div
              style={{
                backgroundColor: "#3bb3bd",
                width: "25%",
                height: "50px",
                textAlign: "center",
                padding: "10px",
              }}
              className="org-fr org-fjc-c org-fai-c"
            >
              {siteintrobuttonlabel}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );

    // siteintro start
    let siteintroHtml = [];

    siteintroHtml.push(<div key="navmenutrow">{navmenuRowHtml}</div>);

    if (activemaintab === "" && siteintroposition != "") {
      siteintroHtml.push(
        <div key="siteintro" style={{ position: "relative", width: "100%" }}>
          <img
            alt="test"
            src={siteintroimgsrc}
            width="100%"
            height="600px"
            style={{ objectFit: "cover", opacity: "0.8" }}
          />

          {siteintroposition === "center" ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "30%",
                transform: "translate(-50%, 0%)",
              }}
            >
              {siteintroBodyLeftHtml}
            </div>
          ) : (
            ""
          )}
          {siteintroposition === "left" ? (
            <div
              style={{
                position: "absolute",
                left: "5%",
                top: "30%",
              }}
            >
              {siteintroBodyLeftHtml}
            </div>
          ) : (
            ""
          )}
          {siteintroposition === "right" ? (
            <div
              style={{
                position: "absolute",
                right: "5%",
                top: "30%",
              }}
            >
              {siteintroBodyLeftHtml}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }

    //   siteintroHtml = [];

    // siteintro end
    // sitebody start
    let sitebodyHtml = [];
    let activesitebodyarray = {};
    for (let i in sitebodyarray) {
      if (
        sitebodyarray[i].maintab === activemaintab &&
        sitebodyarray[i].dropdown === activedropdown &&
        sitebodyarray[i].rightdropdown === activerightdropdown
      ) {
        activesitebodyarray = sitebodyarray[i].data;
      }
    }

    for (let i in activesitebodyarray) {
      console.log(activesitebodyarray[i].type);

      let sitebodyArrayItem = activesitebodyarray[i];
      if (
        sitebodyArrayItem.type === "text" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className="org-fr  org-greeybg mpv">
            <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p lp">
              <div className="elf ">{sitebodyArrayItem.heading}</div>
              <br />
              <div className="mf">{sitebodyArrayItem.body}</div>
            </div>
          </div>
        );
      }
      if (
        sitebodyArrayItem.type === "html" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className="org-fr  org-greeybg mpv">
            <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p lp">
              <div className="elf ">{sitebodyArrayItem.heading}</div>
              <br />
              <div className="mf">{sitebodyArrayItem.body}</div>
            </div>
          </div>
        );
      }
      if (
        sitebodyArrayItem.type === "imgright" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className="org-fr  org-greeybg mpv">
            <div className="org-flexbasis-100p org-mflexbasis-40p org-lflexbasis-40p lp">
              <div className="elf ">{sitebodyArrayItem.heading}</div>
              <br />
              <div className="mf">{sitebodyArrayItem.body}</div>
            </div>
            <div className="org-flexbasis-100p org-mflexbasis-60p org-lflexbasis-60p lp">
              <img
                alt="test"
                src={sitebodyArrayItem.imgurl}
                width="100%"
                height="300px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        );
      }
      if (
        sitebodyArrayItem.type === "imgleft" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className="org-fr  org-greeybg mpv">
            <div className="org-flexbasis-100p org-mflexbasis-60p org-lflexbasis-60p  lp">
              <img
                alt="test"
                src={sitebodyArrayItem.imgurl}
                width="100%"
                height="300px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="org-flexbasis-100p org-mflexbasis-40p org-lflexbasis-40p  lp">
              <div className="elf">{sitebodyArrayItem.heading}</div>
              <br />
              <div className="mf">{sitebodyArrayItem.body}</div>
            </div>
          </div>
        );
      }
      if (
        sitebodyArrayItem.type === "imgcenter" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className="org-fr mpv ">
            <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p esp">
              <img
                alt="test"
                src={sitebodyArrayItem.imgurl}
                width="100%"
                height="300px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p esp">
              <div className="elf">{sitebodyArrayItem.heading}</div>
              <br />
              <div className="mf">{sitebodyArrayItem.body}</div>
            </div>
          </div>
        );
      }
      if (
        sitebodyArrayItem.type === "threecolumn" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        let columnhtml = [];
        for (let j in sitebodyArrayItem.body) {
          columnhtml.push(
            <div
              key={j}
              className="org-flexbasis-100p org-mflexbasis-33p org-lflexbasis-33p esp mf"
            >
              <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p ">
                <img
                  alt="test"
                  src={siteintroimgsrc}
                  width="100%"
                  height="300px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="elf">test</div>
              Are you struggling to keep up with your coursework? Do you want to
              get a head start on the next school year? At Tutor Doctor Park Cit
            </div>
          );
        }
        sitebodyHtml.push(
          <div key={i} className="org-fr vsm">
            {columnhtml}
          </div>
        );
      }
      if (
        sitebodyArrayItem.type === "getstartedbuttonpanel" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div
            key={i}
            className="org-fr org-fjc-c org-fai-c  org-flexbasis-100p vsm"
          >
            <div className="eeelf org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p">
              {sitebodyArrayItem.heading}
              {sitebodyArrayItem.heading === "" ? (
                ""
              ) : (
                <>
                  <br />
                  <br />
                </>
              )}
              <div
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  backgroundColor: "white",
                  textAlign: "center",
                }}
                onClick={() => {
                  window.open(sitebodyArrayItem.buttonurl, "_self");
                }}
              >
                {sitebodyArrayItem.buttonlabel}
              </div>
              <br />
              <br />
            </div>
          </div>
        );
      }
      if (
        sitebodyArrayItem.type === "calender" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className="  mm ">
            <div className="elf ">{sitebodyArrayItem.heading}</div>
            <Calender
              {...this.props}
              compprops={sitebodyArrayItem.compprops}
              synceventprops={synceventprops}
              createSyncEvent={this.createSyncEvent}
            />
          </div>
        );
      }

      if (
        sitebodyArrayItem.type === "faqs" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className="  mm ">
            <div className="elf ">{sitebodyArrayItem.heading}</div>
            <Faqs
              {...this.props}
              compprops={sitebodyArrayItem.compprops}
              synceventprops={synceventprops}
              createSyncEvent={this.createSyncEvent}
            />
          </div>
        );
      }

      if (
        sitebodyArrayItem.type === "contactus" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className=" mm ">
            <div className="elf ">{sitebodyArrayItem.heading}</div>
            <Contactus
              {...this.props}
              compprops={sitebodyArrayItem.compprops}
              synceventprops={synceventprops}
              createSyncEvent={this.createSyncEvent}
            />
          </div>
        );
      }

      if (
        sitebodyArrayItem.type === "notepad" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className=" mm ">
            <div className="elf ">{sitebodyArrayItem.heading}</div>
            <Notepad
              {...this.props}
              compprops={sitebodyArrayItem.compprops}
              synceventprops={synceventprops}
              createSyncEvent={this.createSyncEvent}
            />
          </div>
        );
      }

      if (
        sitebodyArrayItem.type === "recordlist" &&
        sitebodyArrayItem.isactive === "true"
      ) {
        sitebodyHtml.push(
          <div key={i} className=" mm ">
            <div className="elf ">{sitebodyArrayItem.heading}</div>
            <Recorddatalistortable
              {...this.props}
              compprops={sitebodyArrayItem.compprops}
              synceventprops={synceventprops}
              createSyncEvent={this.createSyncEvent}
            />
          </div>
        );
      }

      console.log(this.props);
      //   if (
      //     sitebodyArrayItem.type === "mycourses" &&
      //     sitebodyArrayItem.isactive === "true"
      //   ) {
      //     sitebodyHtml.push(
      //       <div key={i} className=" mm ">
      //         <div className="elf ">{sitebodyArrayItem.heading}</div>
      //         <Uigen {...this.props} codesourceobject="pageperprofile" />
      //       </div>
      //     );
      //   }
    }

    // sitebody end
    // sitefooter start

    let sitesocialhtml = [];
    for (let i in sitesociallinks) {
      if (i === "facebook") {
        sitesocialhtml.push(
          <span key={i} className="org-cursor">
            <i className="fa fa-facebook-f sp"></i>
          </span>
        );
      }
      if (i === "twitter") {
        sitesocialhtml.push(
          <span key={i} className="org-cursor">
            <i className="fa fa-twitter sp"></i>
          </span>
        );
      }
      if (i === "whatsapp") {
        let whatsapphref = "https://wa.me/" + siteorgphone;
        sitesocialhtml.push(
          <span key={i} className="org-cursor">
            <i
              className="fa fa-whatsapp sp"
              onClick={() => {
                window.open(whatsapphref);
              }}
            ></i>
          </span>
        );
      }
    }
    let sitefooterhtml1 = [];
    let sitefooterhtml2 = [];

    for (let i in sitefooterlinks1) {
      sitefooterhtml1.push(
        <div
          key={i}
          onClick={() =>
            this.tabClick({
              maintab: sitefooterlinks1[i].name,
              dropdown: "",
              rightdropdown: "",
            })
          }
        >
          {sitefooterlinks1[i].label}
        </div>
      );
    }
    for (let i in sitefooterlinks2) {
      sitefooterhtml2.push(
        <div
          key={i}
          onClick={() =>
            this.tabClick({
              maintab: sitefooterlinks2[i].name,
              dropdown: "",
              rightdropdown: "",
            })
          }
        >
          {sitefooterlinks2[i].label}
        </div>
      );
    }
    let sitefooterhtml = [];
    //  let orgemailhref = "mailto:" + siteorgemail;
    //   let orgphonehref = "callto:" + siteorgphone;
    sitefooterhtml.push(
      <div key="sitefooter" className="org-fr  ">
        <div className=" mf org-flexbasis-100p org-mflexbasis-25p org-lflexbasis-25p org-c-div-tac">
          {sitefooterhtml1}
        </div>
        <div className="mf org-flexbasis-100p org-mflexbasis-25p org-lflexbasis-25p org-c-div-tac">
          {sitefooterhtml2}
        </div>

        <div className="mf org-flexbasis-100p org-mflexbasis-25p org-lflexbasis-25p org-c-div-tac">
          <div>Contact Us</div>
          {/* <div> {siteorgaddress}</div> */}
          <div
            //  href="#"
            className="org-cursor org-anchorcolor"
            style={{
              textDecoration: "none",
            }}
            onClick={() =>
              window.open(
                `https://mail.google.com/mail/u/0/?fs=1&to=${siteorgemail}&tf=cm`
              )
            }
          >
            {siteorgemail}
          </div>

          <div
            className="org-cursor"
            // href={orgphonehref}
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={() =>
              this.tabClick({
                maintab: "callback",
                dropdown: "",
                rightdropdown: "",
              })
            }
          >
            {siteorgphone}
          </div>
        </div>

        <div className="mf org-flexbasis-100p org-mflexbasis-25p org-lflexbasis-25p org-c-div-tac">
          <div> Social</div>
          <div>{sitesocialhtml}</div>
        </div>
      </div>
    );
    // sitefooter end

    return (
      <div style={{ color: "black" }} className="sp">
        <div>{siteintroHtml}</div>
        <div>{sitebodyHtml}</div>
        <div>{sitefooterhtml}</div>
      </div>
    );
  }
}

export default F;
