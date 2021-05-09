import React from "react";
import Signin from "./signin";
import Sfdclogo from "../../images/sfdc.svg";

function F(props) {
  console.log(props);
  let textPanel = [];
  textPanel.push(
    <>
      <h1>Welcome to Salesforce</h1>
      <p className="lf">
        top rated CRM getting used by most of the fortune 100 companies for
        Marketing, Sales and Service cloud implementations
      </p>
    </>
  );

  return (
    <>
      <Signin
        {...props}
        textPanel={textPanel}
        logo={Sfdclogo}
        template="loginPanelLeft"
        action="signup"
      />
    </>
  );
}

export default F;
