import React, { Component } from "react";
import Recorddatalistortable from "./recorddatalistortable";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    /*
    "classrecorddatalist": {
      "componentname": "recorddatalist",
      "compprops": {
        "datadisplaytype": {
          "name": "",
          "type": "text",
          "value": "table"
        },
        "orgname": {
          "name": "orgname",
          "type": "localdata",
          "value": ""
        },
        "parentrecid": {
          "name": "parentrecid",
          "type": "text",
          "value": ""
        },
        "parenttablename": {
          "name": "parenttablename",
          "type": "text",
          "value": ""
        },
        "tablename": {
          "name": "",
          "type": "text",
          "value": "lesson"
        },
        "userid": {
          "name": "userid",
          "type": "localdata",
          "value": ""
        },
        "userprofileid": {
          "name": "userprofileid",
          "type": "localdata",
          "value": ""
        },
        "viewname": {
          "name": "viewname",
          "type": "localdata",
          "value": ""
        }
      },
      "htmlid": "listnvieweditmylessonrecorddatalistcomp",
      "order": "1",
      "styleprops": {
        "backgroundColor": {
          "name": "backgroundColor",
          "type": "text",
          "value": ""
        },
        "height": {
          "name": "height",
          "type": "text",
          "value": ""
        },
        "overflow": {
          "name": "overflow",
          "type": "text",
          "value": "auto"
        },
        "width": {
          "name": "width",
          "type": "text",
          "value": "100%"
        }
      }
    }
    */

    return (
      <>
        {" "}
        {/* <Recorddatalistortable
          {...this.props}
          compprops={{
            orgname: "gouthama",
            userprofileid: "gouthama-admin",
            userid: "",
            parenttablename: "",
            tablename: "student",
            parentrecid: "",
            datadisplaytype: "table",
          }}
          styleprops={{
            width: "100%",
            height: "30vh",
            backgroundColor: "",
            overflow: "auto",
          }}
        /> */}
      </>
    );
  }
}

export default F;
