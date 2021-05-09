import React from "react";
import Signin from "./signin";
import Sfdclogo from "../../images/sfdc.svg";

function F(props) {
  console.log(props);
  let textPanel = [];

  return (
    <>
      <Signin
        {...props}
        textPanel={textPanel}
        logo={Sfdclogo}
        template="loginPanelLeft"
        action="activateuser"
      />
    </>
  );
}

export default F;
