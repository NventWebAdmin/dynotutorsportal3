import React, { Component } from "react";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";
import { GetLocalIcon, GetGoogleIcon } from "./icons";
import Mailnewaction from "./mailnewaction";
import Mailviewaction from "./mailviewaction";
class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compType: "list",
      viewMailData: {},
      serverMessage: {},
      serverMessageArray: [],
      mailArray: [],
    };
  }

  async componentDidMount() {
    console.log(this.props);
    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      datadisplaytype,
      viewname,
      datasortparambeginswith,
    } = this.props.compprops;
    this.getRecordListMetadataAndDatafromServer({
      orgname: orgname,
      userProfileId: userprofileid,
      userId: userid,
      tableName: tablename,
      datasortparambeginswith: datasortparambeginswith,
      datasortparamequalsto: "",
      action: "",
      viewName: viewname,
      datadisplaytype: datadisplaytype,
    });
  }

  async getRecordListMetadataAndDatafromServer(props) {
    let {
      orgname,
      userProfileId,
      userId,
      tableName,
      datasortparambeginswith,
      datasortparamequalsto,
      action,
      viewName,
      datadisplaytype,
    } = props;
    let { mainPanelHtmlObj } = this.state;

    let dataParams = {
      objectName: tableName,
      objectData: {},
      keyConditions: [
        {
          field: "orgname",
          value: orgname,
          expression: "=",
        },
        {
          field: "id",
          value: datasortparambeginswith + "-" + userId,
          expression: "beginswith",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };
    let dataresult = await getRecorddata(dataParams);
    if (dataresult.isSuccess === "false") {
      alert("data" + dataresult.message);
    } else {
      console.log(dataresult.dataprops.Items);
      this.setState({ mailArray: dataresult.dataprops.Items });
    }
  }

  componentDidUpdate = (prevProps) => {
    let {
      isConnectedtoWebsocketServer,
      currentuserid,
      serverMessage,
      serverMessageArray,
    } = this.state;
    let newlocalParentProps = this.props.localParentProps;
    console.log(newlocalParentProps);
    if (
      JSON.stringify(serverMessage) !=
      JSON.stringify(newlocalParentProps.serverMessage)
    ) {
      console.log(JSON.stringify(serverMessage));
      console.log(JSON.stringify(newlocalParentProps.serverMessage));
      serverMessageArray.push(newlocalParentProps.serverMessage);
      alert();
      this.setState({
        serverMessage: newlocalParentProps.serverMessage,
        serverMessageArray: serverMessageArray,
      });
    }
  };

  backHandler = () => {
    this.setState({ compType: "list" });
  };
  onmailsent = (props) => {
    let { msgObj } = props;
    console.log(msgObj);
    msgObj.utilityname = "mail";
    this.props.localParentMethod({
      methodname: "openwebsocketconnection",
      props: {},
    });
    this.props.localParentMethod({
      methodname: "sendmessage",
      methodprops: msgObj,
    });
    this.setState({ compType: "list" });

    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      datadisplaytype,
      viewname,
      datasortparambeginswith,
    } = this.props.compprops;
    this.getRecordListMetadataAndDatafromServer({
      orgname: orgname,
      userProfileId: userprofileid,
      userId: userid,
      tableName: tablename,
      datasortparambeginswith: datasortparambeginswith,
      datasortparamequalsto: "",
      action: "",
      viewName: viewname,
      datadisplaytype: datadisplaytype,
    });
  };

  resetMailBox = () => {};

  newMail = () => {
    this.setState({ compType: "new" });
  };

  viewMail = (props) => {
    let { viewMailData } = props;
    this.setState({ compType: "view", viewMailData: viewMailData });
  };

  render() {
    let { serverMessageArray, mailArray, viewMailData } = this.state;

    console.log(this.props);
    console.log(serverMessageArray);
    let { compType } = this.state;
    let sidebarHtml = [];
    sidebarHtml.push(
      <div
        className="
      org-cdivv-sp org-cdivleft-sp"
      >
        <div className="org-">Inbox</div>
        <div>Important</div>
        <div>Drafts</div>
        <div>Outbox</div>
        <div>Sent</div>
        <div>Custom</div>
        <div>Deleted</div>
      </div>
    );

    let emailActionsHtml = [];
    emailActionsHtml.push(
      <div>
        <button onClick={this.newMail}>New</button>
        <button>Delete</button>
      </div>
    );

    let emailrowhtml = [];
    let emailarrayHtml = [];
    for (let i = 0; i < mailArray.length; i++) {
      emailarrayHtml.push(
        <div className="org-cdivv-sp">
          <div
            className="org-fr org-fai-c org-bluebg"
            style={{ border: "1px solid grey", margin: "0px" }}
          >
            <span style={{ paddingRight: "50px" }}>
              <input type="checkbox" />
              <GetGoogleIcon name="label" />
            </span>
            <span
              style={{ paddingRight: "100px" }}
              onClick={() => {
                this.viewMail({ viewMailData: mailArray[i] });
              }}
            >
              {mailArray[i].from}
            </span>
            <span
              onClick={() => {
                this.viewMail({ viewMailData: mailArray[i] });
              }}
            >
              {mailArray[i].subject}
            </span>
          </div>
        </div>
      );
    }

    // //for (let i = 0; i < 10; i++) {
    // emailarrayHtml.push({emailrowhtml}</div>);
    // // }

    let mainpanelHtml = [];
    mainpanelHtml.push(<div>{emailActionsHtml}</div>);
    mainpanelHtml.push(<div>{emailarrayHtml}</div>);

    let newmailHtml = [];
    newmailHtml.push(
      <Mailnewaction
        {...this.props}
        onmailsent={this.onmailsent}
        backHandler={this.backHandler}
      />
    );

    let viewmailHtml = [];
    viewmailHtml.push(
      <Mailviewaction
        {...this.props}
        viewMailData={viewMailData}
        backHandler={this.backHandler}
      />
    );

    return (
      <>
        {compType == "list" ? (
          <div className="org-fr ">
            <div className="org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p ">
              {sidebarHtml}
            </div>
            <div className="org-flexbasis-100p org-mflexbasis-80p org-lflexbasis-80p ">
              {mainpanelHtml}
            </div>
          </div>
        ) : (
          []
        )}
        {compType == "new" ? newmailHtml : []}
        {compType == "view" ? viewmailHtml : []}
      </>
    );
  }
}

export default F;
