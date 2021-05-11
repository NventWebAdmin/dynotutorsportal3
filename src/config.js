//import React from "react";

export let configdata = () => {
  let config = {};

  //config.dbvendor = "aws";
  // config.authvendor = "aws";

  config.dbvendor = "aws";
  config.authvendor = "firebase";
  config.imagestoragevendor = "aws";
  config.videostoragevendor = "vimeo";
  // config.websocketconnectionurl =
  //  "wss://labz77iqdl.execute-api.us-east-2.amazonaws.com/dev";
  config.websocketconnectionurl = "https://nodeapppr1.herokuapp.com";
  config.websocketconnectionurlvendor = "heroku";

  config.mailwebsocketconnectionurl =
    "wss://labz77iqdl.execute-api.us-east-2.amazonaws.com/dev";
  config.emailsetting = "";
  config.apptoappaudiocall = "vimeo";
  config.mobilemessageverfication = "twilio";
  config.mobilemessageverficationServerurl = "https://nodeapppr1.herokuapp.com";
  config.apptosimaudiocallvendor = "twilio";
  //config.twiliocallcenterserverurl = "https://nodeapppr1.herokuapp.com";
  config.twiliocallcenterserverurl = "";
  config.apptosimtextmessagevendor = "twilio";
  config.apptosimaudiomessage = "vimeo";
  config.simtosimaudiocall = "vimeo";
  config.apptoappvideocall = "vimeo";

  config.paymentvendor = "Paytm";
  return config;
};
