import React, { Component } from "react";
import Recorddatalist from "./recorddatalist";
class F extends Component {
  constructor(props) {
    super(props);
    this.state = { mainpanleHtml: [] };
  }

  componentDidMount() {
    let mainpanelHtml = React.createElement(
      Recorddatalist,
      {
        ...this.props,

        compprops: {
          orgname: "gouthama",
          userProfileId: "gouthama-admin",
          userId: "",
          parenttableName: "",
          tableName: "student",
          parentRecId: "",
        },
        styleprops: {
          width: "100%",
          height: "",
          backgroundColor: "",
          overflow: "auto",
        },
      },
      ""
    );

    this.setState({ mainpanleHtml: mainpanelHtml });
  }

  render() {
    return <>{/* {this.state.mainpanleHtml} */}te1t</>;
  }
}

export default F;
