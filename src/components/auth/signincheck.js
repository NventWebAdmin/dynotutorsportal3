import React from "react";
import Signin from "./signin";
import Sfdclogo from "../../images/sfdc.svg";
// import { isAuthenticatedUser } from "../../auth/index";
// import {
//   signin,
//   refreshtoken,
//   signup,
//   resetPassword,
//   signInwithGoogle,
//   signInwithFacebook,
// } from "../../auth/index";

function F(Components) {
  let textPanel = [];
  textPanel.push(
    <>
      {" "}
      <h1>Welcome to Salesforcee</h1>
      <p className="lf">
        top rated CRM getting used by most of the fortune 100 companies for
        Marketing, Sales and Service cloud implementations
      </p>
    </>
  );

  let isUserAuthenticated = sessionStorage.getItem("orgidToken");
  //isUserAuthenticated = true;
  console.log(isUserAuthenticated);
  let tokenexpiryTime = sessionStorage.getItem("orgexpiresAt");
  console.log(tokenexpiryTime);

  let d = new Date();
  let n = d.getTime();
  let currentime = parseInt(n);
  console.log(currentime);

  let expirytime = parseInt(tokenexpiryTime);
  console.log(expirytime);
  let askforRefreshtokentimelimit = 60000;
  let resetsigninTimeLimt = 3480000;
  resetsigninTimeLimt = 0;
  askforRefreshtokentimelimit = 0;
  expirytime = expirytime - resetsigninTimeLimt;
  console.log(expirytime);
  let askforRefreshtokentime = expirytime - askforRefreshtokentimelimit;
  let d3 = new Date(expirytime);
  console.log(d3);
  console.log(askforRefreshtokentime);

  if (
    isUserAuthenticated !== "" &&
    isUserAuthenticated !== undefined &&
    isUserAuthenticated !== null
  ) {
    if (currentime > askforRefreshtokentime && currentime < expirytime) {
      return (props) => (
        <Signin
          {...props}
          textPanel={textPanel}
          logo={Sfdclogo}
          template="loginPanelLeft"
          isrefreshtoken="true"
        />
      );
    } else if (currentime > expirytime) {
      // sessionStorage.removeItem("orgemail");
      // sessionStorage.removeItem("orgexpiresAt");
      // sessionStorage.removeItem("orgidToken");
      // sessionStorage.removeItem("orgrefreshToken");
      sessionStorage.clear();
      return (props) => (
        <Signin
          {...props}
          textPanel={textPanel}
          logo={Sfdclogo}
          template="loginPanelLeft"
        />
      );
    } else {
      return (props) => <Components {...props} />;
    }
  } else {
    return (props) => (
      <Signin
        {...props}
        textPanel={textPanel}
        logo={Sfdclogo}
        template="loginPanelLeft"
      />
    );
  }
}

export default F;
