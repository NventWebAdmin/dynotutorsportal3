import React, { Component } from "react";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let mainHtml = [];
    mainHtml.push(
      <>
        <div className="">Nav bar</div>
        <div className="org-fr">
          <div className="  org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p org-c-div-tac">
            blockboard(add blockboard here)
          </div>
          <div className=" org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p org-c-div-tac">
            codeEditPanel
          </div>
        </div>
      </>
    );
    return <>{mainHtml}</>;
  }
}

export default F;
