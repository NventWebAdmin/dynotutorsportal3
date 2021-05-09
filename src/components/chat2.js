import React, { Component } from "react";
import { getRecorddata, createRecord, bulkcreateRecord } from "../db/index";
import {
  sortArray,
  fieldTypeHtmltoDBmapping,
  getLocalData,
  serverButtonHandler,
} from "../js/index";
import { GetGoogleIcon } from "./icons";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatuserclickedstr: "",
      currentusermsg: "",
      selectedTouserId: "",
      currentuserstatus: "offline",
      userList: [],
      isConnectedtoWebsocketServer: false,
      currentuserid: "",
      serverMessage: {},
      chatMessageObj: {},
    };
  }

  componentDidMount() {
    // display all users, connect to websocket server
    this.resetCompData();
  }

  resetCompData = () => {
    let { isConnectedtoWebsocketServer } = this.state;
    if (isConnectedtoWebsocketServer == false) {
      // get currentuserid, orgname etc
      let localdata = getLocalData(this.props);
      let {
        orgname,
        userobjectname,
        userobjectsortparambeginswith,
        serverretriverowslimit,
      } = this.props.compprops;

      // get all user data
      this.getServerData({
        objectname: userobjectname,
        orgname: orgname,
        datasortparambeginswith: userobjectsortparambeginswith,
        touserdatasortparambeginswith: "",
        serverretriverowslimit: serverretriverowslimit,
        updattingstatename: "userList",
        touserid: "",
      });

      // open socket connection
      this.props.localParentMethod({
        methodname: "openwebsocketconnection",
        props: {},
      });
    }
  };

  // update on parent props such as socket open, close, on message etc
  componentDidUpdate = (prevProps) => {
    let {
      isConnectedtoWebsocketServer,
      currentuserid,
      serverMessage,
      userList,
      chatMessageObj,
      selectedTouserId,
    } = this.state;
    let newlocalParentProps = this.props.localParentProps;
    if (
      isConnectedtoWebsocketServer !=
      newlocalParentProps.isConnectedtoWebsocketServer
    ) {
      if (newlocalParentProps.isConnectedtoWebsocketServer == false) {
        for (let userI in userList) {
          userList[userI].chatstatus = "offline";
        }
      }

      this.setState({
        isConnectedtoWebsocketServer:
          newlocalParentProps.isConnectedtoWebsocketServer,
        userList: userList,
      });
    }

    if (currentuserid != newlocalParentProps.currentuserid) {
      this.setState({ currentuserid: newlocalParentProps.currentuserid });
    }

    if (
      serverMessage != newlocalParentProps.serverMessage &&
      newlocalParentProps.serverMessage
    ) {
      console.log(JSON.parse(newlocalParentProps.serverMessage));
      let newservermessage = JSON.parse(newlocalParentProps.serverMessage);
      if (newservermessage.messagetype == "updatestatus") {
        for (let userI in userList) {
          if (userList[userI].id == newservermessage.userid) {
            userList[userI].chatstatus = newservermessage.chatstatus;
          }
        }
      }

      if (newservermessage.messagetype == "sendmessage") {
        for (let userI in userList) {
          if (
            userList[userI].id == newservermessage.userid &&
            currentuserid == newservermessage.touserid
          ) {
            let userchatMessageObj = chatMessageObj[newservermessage.userid];
            if (newservermessage.userid != selectedTouserId) {
              userchatMessageObj.noofunreadmsgs =
                userchatMessageObj.noofunreadmsgs + 1;
            }
            let newmessages = userchatMessageObj.newmessages;
            newmessages.push(newservermessage.message);
            userchatMessageObj.newmessages = newmessages;
            chatMessageObj[newservermessage.userid] = userchatMessageObj;

            this.setState({
              chatMessageObj: chatMessageObj,
            });
          }
        }
      }

      this.setState({
        serverMessage: newlocalParentProps.serverMessage,
        userList: userList,
      });
    }
  };

  getServerData = async (props) => {
    let { chatMessageObj, chatuserclickedstr } = this.state;
    let {
      objectname,
      orgname,
      datasortparambeginswith,
      touserdatasortparambeginswith,
      serverretriverowslimit,
      updattingstatename,
      touserid,
    } = props;
    console.log(datasortparambeginswith);

    // get all users
    let userdataParams = {
      objectName: objectname,
      objectData: {},
      keyConditions: [
        {
          field: "orgname",
          value: orgname,
          expression: "=",
        },
        {
          field: "id",
          value: datasortparambeginswith,
          expression: "beginswith",
        },
      ],
      filterConditions: [],
      pageSize: 1,
      limit: serverretriverowslimit,
      exclusiveStartKey: "",
    };

    let dataresult = await getRecorddata(userdataParams);
    if (dataresult.isSuccess === "false") {
      alert("data" + dataresult.message);
    } else {
      let recordDataList = dataresult.dataprops.Items;
      console.log(recordDataList);
      if (updattingstatename == "userList") {
        for (let i in recordDataList) {
          chatMessageObj[recordDataList[i].id] = {
            noofunreadmsgs: 0,
            oldmessages: [],
            newmessages: [],
          };
        }
        this.setState({
          userList: recordDataList,
          chatMessageObj: chatMessageObj,
          chatuserclickedstr: "",
        });
      }
      if (updattingstatename == "chatList") {
        let chatList = recordDataList;
        console.log(chatList);
        let touserdataParams = {
          objectName: objectname,
          objectData: {},
          keyConditions: [
            {
              field: "orgname",
              value: orgname,
              expression: "=",
            },
            {
              field: "id",
              value: touserdatasortparambeginswith,
              expression: "beginswith",
            },
          ],
          filterConditions: [],
          pageSize: 1,
          limit: serverretriverowslimit,
          exclusiveStartKey: "",
        };

        let touserdataresult = await getRecorddata(touserdataParams);
        if (touserdataresult.isSuccess === "false") {
          alert("data" + dataresult.message);
        } else {
          let touserchatList = touserdataresult.dataprops.Items;
          console.log(chatList);
          console.log(touserchatList);

          //  console.log(recordDataList);
          let allchatlist = [];
          for (let i in chatList) {
            allchatlist.push(chatList[i]);
          }
          for (let i in touserchatList) {
            allchatlist.push(touserchatList[i]);
          }
          let allchatlistSorted = sortArray(allchatlist, "time", "integer");
          chatMessageObj[touserid] = {
            noofunreadmsgs: 0,
            oldmessages: allchatlist,
            newmessages: [],
          };
          this.setState({
            //chatList: allchatlistSorted,
            chatMessageObj: chatMessageObj,
          });
        }
      }
    }
  };

  getChatData = async (touserid) => {
    console.log(touserid);
    let { currentuserid, chatuserclickedstr } = this.state;
    if (chatuserclickedstr.includes(touserid)) {
      this.setState({ selectedTouserId: touserid });
    } else {
      chatuserclickedstr = chatuserclickedstr + touserid;
      this.setState({
        selectedTouserId: touserid,
        chatuserclickedstr: chatuserclickedstr,
      });
      this.getServerData({
        objectname: "chatmessage",
        orgname: "gouthama",
        datasortparambeginswith: "cht_" + currentuserid + "_" + touserid,
        touserdatasortparambeginswith: "cht_" + touserid + "_" + currentuserid,
        serverretriverowslimit: 100,
        updattingstatename: "chatList",
        touserid: touserid,
      });
    }
  };

  updateStatus = async (props) => {
    let { status } = props;
    let msgObj = {
      orgname: "gouthama",
      userid: "usr-pradeep",
      touserid: "",
      messagetype: "updatestatus",
      message: "",
      chatstatus: status,
    };
    this.props.localParentMethod({
      methodname: "sendmessage",
      methodprops: msgObj,
    });
    this.setState({ currentuserchatstatus: status });
  };

  sendmessage = () => {
    let {
      chatMessageObj,
      currentuserid,
      selectedTouserId,
      currentusermsg,
    } = this.state;
    var d = new Date();
    var n = d.getTime();
    let msgObj = {
      orgname: "gouthama",
      userid: currentuserid,
      touserid: selectedTouserId,
      messagetype: "sendmessage",
      message: { type: "text", data: currentusermsg },
      chatstatus: "",
      time: n,
    };
    this.props.localParentMethod({
      methodname: "sendmessage",
      methodprops: msgObj,
    });

    let userchatMessageObj = chatMessageObj[selectedTouserId];
    let newmessages = userchatMessageObj.newmessages;
    newmessages.push(msgObj);
    userchatMessageObj.newmessages = newmessages;
    chatMessageObj[selectedTouserId] = userchatMessageObj;

    this.setState({
      chatMessageObj: chatMessageObj,
      currentusermsg: "",
    });
  };

  render() {
    let {
      userList,
      chatMessageObj,
      currentuserid,
      currentuserchatstatus,
      selectedTouserId,
    } = this.state;
    let chatList;

    console.log(this.state);

    // other users status
    let chatUserArrayHtml = [];

    for (let i in userList) {
      if (currentuserid && userList[i].id != currentuserid) {
        let otheruserstatuscolor = "";

        if (userList[i].chatstatus == "available") {
          otheruserstatuscolor = "green";
        }
        if (userList[i].chatstatus == "busy") {
          otheruserstatuscolor = "red";
        }
        if (userList[i].chatstatus == "away") {
          otheruserstatuscolor = "yellow";
        }
        if (userList[i].chatstatus == "offline") {
          otheruserstatuscolor = "grey";
        }
        let noofunreadmsgs = "";
        if (chatMessageObj && chatMessageObj[userList[i].id]) {
          noofunreadmsgs = chatMessageObj[userList[i].id].noofunreadmsgs;
        }
        chatUserArrayHtml.push(
          <div
            className="org-fr org-fjc-s org-fai-c"
            onClick={() => {
              this.getChatData(userList[i].id);
            }}
          >
            {userList[i].name}-
            <span
              style={{
                width: "20px",
                backgroundColor: otheruserstatuscolor,
                padding: "10px",
                borderRadius: "50%",
              }}
            >
              .
            </span>
            <span>{noofunreadmsgs}</span>
          </div>
        );
      }
    }

    let chatMessageArrayHtml = [];
    for (let i in chatMessageObj) {
      if (i == selectedTouserId) {
        let oldmessages = chatMessageObj[i].oldmessages;
        let newmessages = chatMessageObj[i].newmessages;
        chatList = [];
        for (let j in oldmessages) {
          chatList.push(oldmessages[j]);
        }
        for (let j in newmessages) {
          chatList.push(newmessages[j]);
        }

        for (let i in chatList) {
          console.log(chatList[i]);
          var d = new Date(chatList[i].time);
          d = d.toISOString();
          var msgObj = chatList[i].message;
          console.log(chatList[i]);
          var msgStr = "";
          if (msgObj && msgObj.type == "text") {
            msgStr = msgObj.data;
          }

          console.log(msgStr);
          if (currentuserid == chatList[i].userid) {
            chatMessageArrayHtml.push(
              <div className="org-fr org-fjc-e">{msgStr}</div>
            );
            chatMessageArrayHtml.push(
              <div className="org-fr org-fjc-e">{d}</div>
            );
          } else {
            chatMessageArrayHtml.push(
              <div className="org-fr org-fjc-s">{msgStr}</div>
            );
            chatMessageArrayHtml.push(
              <div className="org-fr org-fjc-s">{d}</div>
            );
          }
        }
      }
    }

    let chatMessageActionsHtml = [];
    chatMessageActionsHtml.push(
      <div>
        {" "}
        <GetGoogleIcon name="call" />
        <GetGoogleIcon name="videocam" />
        <GetGoogleIcon name="screen_share" />
      </div>
    );

    let chatInputElmntHtml = [];
    chatInputElmntHtml.push(<div>chatinput</div>);

    let currentuserstatuscolor = "";
    if (currentuserchatstatus == "available") {
      currentuserstatuscolor = "green";
    }
    if (currentuserchatstatus == "busy") {
      currentuserstatuscolor = "red";
    }
    if (currentuserchatstatus == "away") {
      currentuserstatuscolor = "yellow";
    }
    if (currentuserchatstatus == "offline") {
      currentuserstatuscolor = "grey";
    }

    return (
      <div>
        <br />

        <span
          style={{
            width: "20px",
            backgroundColor: currentuserstatuscolor,
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          .
        </span>
        <input
          onChange={(e) => {
            this.setState({ currentuserid: e.target.value });
          }}
        />

        <button
          style={{ textAlign: "center" }}
          onClick={() => {
            this.updateStatus({ status: "busy" });
          }}
        >
          show status busy
        </button>
        <button
          style={{ textAlign: "center" }}
          onClick={() => {
            this.updateStatus({ status: "available" });
          }}
        >
          show status available
        </button>
        <button
          style={{ textAlign: "center" }}
          onClick={() => {
            this.updateStatus({ status: "away" });
          }}
        >
          show status away
        </button>
        <div className="org-fr" style={{ height: "100%" }}>
          <div className="org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p ">
            {chatUserArrayHtml}
          </div>
          <div className="org-flexbasis-100p org-mflexbasis-80p org-lflexbasis-80p org-fc ">
            <div
              style={{
                backgroundColor: "red",
                height: "85%",
                overflow: "auto",
              }}
            >
              {chatMessageArrayHtml}
            </div>
            <div
              className="org-fr"
              style={{ backgroundColor: "blue", height: "15%" }}
            >
              <div className="org-flexbasis-100p org-mflexbasis-80p org-lflexbasis-80p">
                <textarea
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "0",
                    margin: "0",
                  }}
                  value={this.state.currentusermsg}
                  onChange={(e) => {
                    this.setState({ currentusermsg: e.target.value });
                  }}
                />
              </div>
              <div className="org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p">
                {chatMessageActionsHtml}
                <button
                  style={{ width: "100%", height: "100%", textAlign: "center" }}
                  onClick={this.sendmessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default F;
