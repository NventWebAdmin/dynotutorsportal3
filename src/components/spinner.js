import React, { Component } from "react";
import { GetFontAwesomeIcon } from "./icons";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          position: "fixed",
          left: "0",
          top: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "3",
        }}
      >
        <div className="spinner-rotateinfinite">
          <GetFontAwesomeIcon name="spinner"></GetFontAwesomeIcon>
        </div>
      </div>
    );
  }
}

export default F;
