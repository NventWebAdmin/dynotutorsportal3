import React, { Component } from "react";
import imgLogin from "../../images/mountain.jpg";
import Htmlform from "../htmlformnew";
import Iconbar from "../iconbar";
import Spinner from "../spinner";
import Nofification from "../notification";
import {
  signin,
  refreshtoken,
  signup,
  resetPassword,
  signInwithGoogle,
  getUserProfile,
  signInwithFacebook,
} from "../../auth/index";
import { showError, getLocalData } from "../../js/index";
import {
  getRecorddata,
  createRecord,
  bulkcreateRecord,
  updateRecord,
} from "../../db/index";
import { sendMail } from "../../js/mail";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = { showSpinner: "false" };
  }

  async componentDidMount() {
    let { action, isrefreshtoken } = this.props;
    if (action === "activateuser") {
      this.activateUser();
    }
  }

  activateUser = async () => {
    let localdata = getLocalData(this.props);

    let result = await updateRecord({
      objectName: "user",
      objectPrimaryKeyValue: {
        orgname: localdata.defaultorgname,
        id: "usr-pradeepy",
      },
      objectData: {
        isactive: "true",
        lastupdateduserid: localdata.defaultadminuserid,
      },
    });
    if (result.isSuccess === "false") {
    }
  };

  signinOnClk = (event) => {
    // let isSuccessfulLogin = false;
    // if (isSuccessfulLogin) {
    //     this.props.history.push("/");
    // }
    // else {
    //     console.log(this.props);
    //     this.props.setUserNotification({ "test": "test" });
    // }
    if (this.validate()) {
      this.props.setUserNotification({
        id:
          this.props.reduxprops.reduxDetails.user.userDetails.id + "compname1",
        type: "error",
        message: "invalid data",
      });
      this.props.setUserNotification({
        id: this.props.userDetails.user.userDetails.id + "compname2",
        type: "warning",
        message: "not suitatble",
      });
      this.props.setUserNotification({
        id: this.props.userDetails.user.userDetails.id + "compname3",
        type: "information",
        message: "redirecting to home page",
      });
      this.props.setUserNotification({
        id: this.props.userDetails.user.userDetails.id + "compname4",
        type: "confirmation",
        message: "are you sure ?",
      });
    } else {
      // this.props.setUserNotification({ "id": this.props.userDetails.user.userDetails.id + "compname1", "type": "", "message": "" });
      // this.props.setUserNotification({ "id": this.props.userDetails.user.userDetails.id + "compname2", "type": "", "message": "" });
      // this.props.setUserNotification({ "id": this.props.userDetails.user.userDetails.id + "compname3", "type": "", "message": "" });
      // this.props.setUserNotification({ "id": this.props.userDetails.user.userDetails.id + "compname4", "type": "", "message": "" });
      // this.props.setIsUserAuthenticated({ "isUserAuthenticated": "true" });
      console.log(this.props);
      this.props.reduxprops.logInUser({
        username: this.state.username,
        password: this.state.password,
      });

      // sessionStorage.setItem("isUserAuthenticated", true);
      //this.props.history.push("/");
      console.log(window.location);
      if (window.location.href.includes("signin")) {
        window.location.assign("/");
        //this.props.history.push("/");
      } else {
        window.location.assign(window.location);
        // this.props.history.push(window.location.pathname);
      }
    }
  };

  inputChanged = (e, props) => {
    console.log(props);
    let {
      inputLabel,
      inputName,
      inputType,
      clientstatename,
      clientstatetype,
      inputValue,
    } = props;
    if (inputName === "username") {
      this.setState({ username: inputValue });
    }
    if (inputName === "password") {
      this.setState({ password: inputValue });
    }
    if (inputName === "registerfirstname") {
      this.setState({ registerfirstname: inputValue });
    }
    if (inputName === "registerusername") {
      this.setState({ registerusername: inputValue });
    }
    if (inputName === "registerlastname") {
      this.setState({ registerlastname: inputValue });
    }
    if (inputName === "registeremail") {
      this.setState({ registeremail: inputValue });
    }
    if (inputName === "registerpassword") {
      this.setState({ registerpassword: inputValue });
    }
    if (inputName === "registerconfirmpassword") {
      this.setState({ registerconfirmpassword: inputValue });
    }
    if (inputName === "registerphone") {
      this.setState({ registerphone: inputValue });
    }
    if (inputName === "forgotemail") {
      this.setState({ forgotemail: inputValue });
    }
    if (inputName === "registeras") {
      this.setState({ registeras: e.target.value });
    }
  };

  inputKeyUp = (e) => {
    console.log(e.keyCode);
    console.log(e.target.dataset.name);
    console.log(e.target.value);
    if (e.keyCode === 13) {
      signin({
        username: this.state.username,
        password: this.state.password,
        props: this.props,
      });
    }
  };

  clkHandler = (props) => {
    let { buttonName } = props;
    console.log(buttonName);
    if (buttonName === "signin") {
      console.log(buttonName);
      this.loginHandlerAsync("signin");
    }
    if (buttonName === "signup") {
      console.log(this.props);
      // this.props.routerprops.history.push("/signup");
      //  this.setState({ isModalOpen: "true" });
      window.open("/signup", "_self");
    }
    if (buttonName === "forgotpassword") {
      console.log(this.props);
      // this.props.routerprops.history.push("/forgotpassword");
      //  this.setState({ isModalOpen: "true" });
      window.open("/forgotpassword", "_self");
    }
    if (buttonName === "signupcancel") {
      console.log(this.props);
      //  this.props.routerprops.history.push("/");
      window.open("/", "_self");
    }
    if (buttonName === "signupregister") {
      console.log(this.props);
      this.loginHandlerAsync("signup");
      //  this.setState({ isModalOpen: "false" });
      // signup({
      //   username: this.state.registeremail,
      //   password: this.state.registerpassword,
      //   props: this.props,
      // });
    }

    if (buttonName === "forgotpasswordcancel") {
      console.log(this.props);
      //  this.props.routerprops.history.push("/");
      window.open("/", "_self");
    }
    if (buttonName === "forgotpasswordsubmit") {
      console.log(this.props);
      //  this.setState({ isModalOpen: "false" });
      this.loginHandlerAsync("forgotpassword");
    }
    if (buttonName === "facebooklogin") {
      this.loginHandlerAsync("facebooklogin");
    }
    if (buttonName === "googlelogin") {
      this.loginHandlerAsync("googlelogin");
    }
    if (buttonName === "amazonlogin") {
      this.loginHandlerAsync("amazonlogin");
    }
    if (buttonName === "facebooksignup") {
      this.loginHandlerAsync("facebooksignup");
    }
    if (buttonName === "googlesignup") {
      this.loginHandlerAsync("googlesignup");
    }
    if (buttonName === "amazonsignup") {
      this.loginHandlerAsync("amazonsignup");
    }
  };

  setNotification = (props) => {
    let { msg } = props;
    this.setState(
      {
        showNotification: "false",
        notificationMessages: [],
      },

      () =>
        this.setState({
          showNotification: "true",
          notificationMessages: [
            {
              name: "message1",
              message: msg,
              type: "info",
            },
          ],
        })
    );
  };

  async loginHandlerAsync(action) {
    console.log(action);
    console.log(this.state);
    let result = {};
    let { username, password, registeras } = this.state;
    if (action === "signin") {
      if (!username) {
        showError([
          { name: "username", message: "please enter valid username" },
        ]);
      } else if (!password) {
        showError([
          { name: "password", message: "please enter valid password" },
        ]);
      } else {
        this.setState({ showSpinner: "true" });
        result = await signin({
          username: username,
          password: password,
          props: this.props,
        });
        if (result.isSuccess === "true") {
          this.setState({ showSpinner: "false" });
          if (
            result.dataprops.registered !== "true" &&
            result.dataprops.registered !== true
          ) {
            this.setNotification({
              msg: "please click on link in verifacation mail to login ",
            });
          } else {
            let orgemail = result.dataprops.email;

            this.setState({ showSpinner: "true" });
            let props = {
              orgemail: orgemail,
              result: result,
            };

            this.getUserfromDatabase(props);
          }
        }
        if (result.isSuccess === "false") {
          this.setState({ showSpinner: "false" });
          let errorArray = [];
          let isFieldError = false;
          if (result.message.includes("EMAIL")) {
            isFieldError = true;
            errorArray.push({
              name: "username",
              message: result.message,
            });
          }
          if (result.message.includes("PASSWORD")) {
            isFieldError = true;
            errorArray.push({
              name: "password",
              message: result.message,
            });
          }
          showError(errorArray);
          if (isFieldError !== true) {
            this.setNotification({
              msg: result.message,
            });
          }
        }
      }
    }
    if (action === "signup") {
      if (!this.state.registeremail) {
        showError([
          { name: "registeremail", message: "please enter valid username" },
        ]);
      } else if (!this.state.registerpassword) {
        showError([
          { name: "registerpassword", message: "please enter valid password" },
        ]);
      } else if (!this.state.registerconfirmpassword) {
        showError([
          {
            name: "registerconfirmpassword",
            message: "please enter valid confirm password",
          },
        ]);
      } else if (
        this.state.registerconfirmpassword &&
        this.state.registerconfirmpassword !== this.state.registerpassword
      ) {
        showError([
          {
            name: "registerconfirmpassword",
            message: "password not matching",
          },
        ]);
      } else if (!this.state.registeremail) {
        showError([
          { name: "registeremail", message: "please enter valid email" },
        ]);
      } else if (!this.state.registerfirstname) {
        showError([
          { name: "registerfirstname", message: "please enter firstname" },
        ]);
      } else {
        result = await signup({
          userState: this.state,
          props: this.props,
        });
        console.log(result);
        if (result.isSuccess === "false") {
          let errorArray = [];
          let isFieldError = false;
          if (result.message.includes("EMAIL")) {
            isFieldError = true;
            errorArray.push({
              name: "registeremail",
              message: result.message,
            });
          }
          if (result.message.includes("PASSWORD")) {
            isFieldError = true;
            errorArray.push({
              name: "registerpassword",
              message: result.message,
            });
          }
          showError(errorArray);
          console.log(isFieldError);
          if (isFieldError !== true) {
            this.setNotification({
              msg: result.message,
            });
          }
        } else {
          this.createUser({
            email: this.state.registeremail,
            firstname: this.state.registerfirstname,
            lastname: this.state.registerlastname
              ? this.state.registerlastname
              : "",
            phone: this.state.registerphone,
            registeras: registeras,
          });

          // setTimeout(function () {
          //   window.location.assign("/");
          // }, 3000);
        }
      }
    }
    if (action === "forgotpassword") {
      if (!this.state.forgotemail) {
        showError([{ name: "forgotemail", message: "please enter email" }]);
      } else {
        result = await resetPassword({
          userState: this.state,
          props: this.props,
        });
        console.log(result);
        if (result.isSuccess === "false") {
          let errorArray = [];
          let isFieldError = false;
          if (result.message.includes("email")) {
            isFieldError = true;
            errorArray.push({
              name: "forgotemail",
              message: result.message,
            });
          }
          showError(errorArray);
          console.log(isFieldError);
          if (isFieldError !== true) {
            this.setNotification({
              msg: result.message,
            });
          }
        } else {
          let errorArray = [];
          showError(errorArray);
          this.setNotification({
            msg: "Reset Password Email sent",
          });

          setTimeout(function () {
            window.location.assign("/");
          }, 3000);
        }
      }
    }

    if (action === "facebooklogin") {
      this.setState({ showSpinner: "true" });
      let result = await signInwithFacebook();
      if (result.isSuccess === "true") {
        this.setState({ showSpinner: "false" });
        let orgemail = result.dataprops.email;
        let props = {
          orgemail: orgemail,
          result: result,
        };
        //  this.getUserfromDatabase(props);
      }
      if (result.isSuccess === "false") {
        this.setState({ showSpinner: "false" });
        let errorArray = [];
        let isFieldError = false;
        if (result.message.includes("EMAIL")) {
          isFieldError = true;
          errorArray.push({
            name: "username",
            message: result.message,
          });
        }
        if (result.message.includes("PASSWORD")) {
          isFieldError = true;
          errorArray.push({
            name: "password",
            message: result.message,
          });
        }
        showError(errorArray);
        if (isFieldError !== true) {
          this.setNotification({
            msg: result.message,
          });
        }
      }
    }
    if (action === "googlelogin") {
      this.setState({ showSpinner: "true" });
      let result = await signInwithGoogle();
      if (result.isSuccess === "true") {
        this.setState({ showSpinner: "false" });
        let orgemail = result.dataprops.email;
        let props = {
          orgemail: orgemail,
          result: result,
        };
        console.log(result.dataprops.emailVerified);
        this.getUserfromDatabase(props);
      }
      if (result.isSuccess === "false") {
        this.setState({ showSpinner: "false" });
        let errorArray = [];
        let isFieldError = false;
        if (result.message.includes("EMAIL")) {
          isFieldError = true;
          errorArray.push({
            name: "username",
            message: result.message,
          });
        }
        if (result.message.includes("PASSWORD")) {
          isFieldError = true;
          errorArray.push({
            name: "password",
            message: result.message,
          });
        }
        showError(errorArray);
        if (isFieldError !== true) {
          this.setNotification({
            msg: result.message,
          });
        }
      }
    }
    if (action === "googlesignup") {
      this.setState({ showSpinner: "true" });
      let result = await signInwithGoogle();
      if (result.isSuccess === "true") {
        this.setState({ showSpinner: "false" });
        let orgemail = result.dataprops.email;
        let props = {
          orgemail: orgemail,
          result: result,
        };

        let userprofileresult = await getUserProfile({
          idToken: result.dataprops.idToken,
        });
        if (userprofileresult.isSuccess === "true") {
          this.createUser({
            email: orgemail,
            firstname: userprofileresult.dataprops.name,

            lastname: "",
            phone: userprofileresult.dataprops.phone
              ? userprofileresult.dataprops.phone
              : "",
            registeras: registeras,
          });
        }
      }
      if (result.isSuccess === "false") {
        this.setState({ showSpinner: "false" });
        let errorArray = [];
        let isFieldError = false;
        if (result.message.includes("EMAIL")) {
          isFieldError = true;
          errorArray.push({
            name: "username",
            message: result.message,
          });
        }
        if (result.message.includes("PASSWORD")) {
          isFieldError = true;
          errorArray.push({
            name: "password",
            message: result.message,
          });
        }
        showError(errorArray);
        if (isFieldError !== true) {
          this.setNotification({
            msg: result.message,
          });
        }
      }
    }
    if (action === "amazonlogin") {
    }
    // sessionStorage.setItem("isUserAuthenticated", "true");
    // if (window.location.href.includes("signin")) {
    //   window.location.assign("/");
    // } else {
    //   window.location.assign(window.location);
    // }

    return result;
  }
  createUser = async (props) => {
    let localdata = getLocalData(this.props);

    let { email, firstname, lastname, phone, registeras } = props;
    let id = "usr-" + lastname + firstname;
    let userprofileid = registeras
      ? registeras
      : localdata.defaultuserprofileid;
    let recorddata = {
      label: lastname + " " + firstname,
      isactive: "true",
      createduserid: localdata.defaultadminuserid,
      lastupdateduserid: localdata.defaultadminuserid,
      orgname: localdata.defaultorgname,
      id: id.replace(" ", ""),
      email: email,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      userprofileid: userprofileid,
    };
    alert(userprofileid);

    let result = await createRecord({
      objectName: "user",
      objectData: recorddata,
    });
    if (result.isSuccess === "false") {
      alert(result.message);
    } else {
      let signinrecorddata = {
        label: lastname + firstname,
        isactive: "true",
        createduserid: localdata.defaultadminuserid,
        lastupdateduserid: localdata.defaultadminuserid,
        orgname: localdata.defaultorgname,
        id: email,
        userid: id.replace(" ", ""),
      };

      let signinresult = await createRecord({
        objectName: "usersignin",
        objectData: signinrecorddata,
      });
      if (signinresult.isSuccess === "false") {
        alert(result.message);
      } else {
        this.setNotification({
          msg: "User is created, please signin",
        });
        setTimeout(function () {
          window.location.assign("/");
        }, 3000);
      }
    }
  };

  getUserfromDatabase = async (props) => {
    let { orgemail, result } = props;
    var d = new Date();
    var tokenexpiryTime =
      parseInt(d.getTime()) + parseInt(result.dataprops.expiresIn) * 1000;
    let d2 = new Date(parseInt(tokenexpiryTime));

    let dataParams = {
      objectName: "usersignin",
      objectData: {},
      keyConditions: [
        {
          field: "orgname",
          value: "postpaidtutors",
          expression: "=",
        },
        {
          field: "id",
          value: orgemail,
          expression: "=",
        },
      ],
      filterConditions: [],
      pageSize: "",
      limit: "",
      exclusiveStartKey: "",
    };
    this.setState({ showSpinner: "true" });
    let dataresult = await getRecorddata(dataParams);
    if (dataresult.isSuccess === "false") {
      this.setState({ showSpinner: "false" });
      alert("data" + dataresult.message);
    } else {
      this.setState({ showSpinner: "false" });
      if (dataresult.dataprops.Items.length > 0) {
        let userdataParams = {
          objectName: "user",
          objectData: {},
          keyConditions: [
            {
              field: "orgname",
              value: "postpaidtutors",
              expression: "=",
            },
            {
              field: "id",
              value: dataresult.dataprops.Items[0].userid,
              expression: "=",
            },
          ],
          filterConditions: [],
          pageSize: "",
          limit: "",
          exclusiveStartKey: "",
        };
        this.setState({ showSpinner: "true" });
        let userdataresult = await getRecorddata(userdataParams);
        if (userdataresult.isSuccess === "false") {
          this.setState({ showSpinner: "false" });
          alert("data" + userdataresult.message);
        } else {
          this.setState({ showSpinner: "false" });
          console.log(userdataresult.dataprops.Items);
          if (userdataresult.dataprops.Items.length > 0) {
            let usersignin = userdataresult.dataprops.Items[0];
            await sessionStorage.setItem("orgemail", orgemail);
            await sessionStorage.setItem("orgexpiresAt", tokenexpiryTime);
            await sessionStorage.setItem(
              "orgidToken",
              result.dataprops.idToken
            );
            await sessionStorage.setItem(
              "orgrefreshToken",
              result.dataprops.refreshToken
            );

            await sessionStorage.setItem("orgname", usersignin.orgname);
            await sessionStorage.setItem("userid", usersignin.id);
            await sessionStorage.setItem(
              "userprofileid",
              usersignin.userprofileid
            );
            await sessionStorage.setItem("userroleid", usersignin.userroleid);
            await sessionStorage.setItem("appname", usersignin.defaultappname);
            window.location.assign(window.location);
          } else {
            this.setNotification({
              msg: "Please Signup and Login",
            });

            setTimeout(function () {
              window.location.assign("/signup");
            }, 5000);
          }
        }
      } else {
        this.setNotification({
          msg: "Please Signup and Login",
        });
        setTimeout(function () {
          window.location.assign("/signup");
        }, 5000);
      }
    }
  };

  validate = (e) => {
    let iserror = false;
    this.inputcompref1.current.validate();
    this.inputcompref2.current.validate();
    iserror =
      this.inputcompref1.current.validate() ||
      this.inputcompref2.current.validate();
    return iserror;
  };

  continueSession = async () => {
    let result = await refreshtoken({
      refreshtoken: sessionStorage.getItem("orgrefreshToken"),
    });
    if (result.isSuccess === "true") {
      var d = new Date();
      var tokenexpiryTime =
        parseInt(d.getTime()) + parseInt(result.dataprops.expires_in) * 1000;
      let d2 = new Date(parseInt(tokenexpiryTime));
      await sessionStorage.setItem("orgemail", result.dataprops.email);
      // await sessionStorage.setItem("orguserid", result.dataprops.user_id);
      await sessionStorage.setItem("orgexpiresAt", tokenexpiryTime);
      await sessionStorage.setItem("orgidToken", result.dataprops.access_token);
      await sessionStorage.setItem(
        "orgrefreshToken",
        result.dataprops.refresh_token
      );

      // window.location.assign(window.location);
    }
    if (result.isSuccess === "false") {
      let errorArray = [];
      let isFieldError = false;
      if (result.message.includes("EMAIL")) {
        isFieldError = true;
        errorArray.push({
          name: "username",
          message: result.message,
        });
      }
      if (result.message.includes("PASSWORD")) {
        isFieldError = true;
        errorArray.push({
          name: "password",
          message: result.message,
        });
      }
      showError(errorArray);
      console.log(isFieldError);
      if (isFieldError !== true) {
        this.setNotification({ msg: result.message });
      }
    }

    if (window.location.href.includes("signin")) {
      window.location.assign("/");
    } else {
      window.location.assign(window.location);
    }
  };

  cancelSession = () => {
    sessionStorage.clear();
    window.location.assign(window.location);
  };

  render() {
    console.log(this.state);
    let dataprops = {};
    let { showSpinner } = this.state;
    let { action, isrefreshtoken } = this.props;

    let refreshTokenHtml = [];
    if (isrefreshtoken == true || isrefreshtoken == "true") {
      refreshTokenHtml.push(
        <div>
          Session Loggin out Click on Ok to continue session, cancel to logout
        </div>
      );
      refreshTokenHtml.push(
        <div>
          <button onClick={this.continueSession}>Continue Session</button>
          <button onClick={this.cancelSession}>Logout</button>
        </div>
      );
    }

    if (action === "activateuser") {
    } else {
      let loginIconsHtml = [];

      let iconarray = [
        // {
        //   label: "Label1",
        //   name: "facebooklogin",
        //   iconName: "facebook",
        //   iconSource: "fontaway",
        // },
        {
          label: "Label2",
          name: "googlelogin",
          iconName: "google",
          iconSource: "fontaway",
        },
        // {
        //   label: "Label2",
        //   name: "amazonlogin",
        //   iconName: "amazon",
        //   iconSource: "fontaway",
        // },
      ];
      loginIconsHtml.push(
        <Iconbar
          iconarray={iconarray}
          isHorizontol="true"
          style={{ width: "" }}
          iconPadding="1vw"
          iconClk={this.clkHandler}
        />
      );

      dataprops = [
        {
          label: "User Name",
          name: "username",
          type: "inputtext",
          width: "100%",
          placeholder: "",
          required: "true",
          tabname: "1",
        },
        {
          label: "Password",
          name: "password",
          type: "inputpassword",
          width: "100%",
          placeholder: "",
          required: "true",
          tabname: "1",
        },
        {
          label: "Log In",
          name: "signin",
          type: "button",
          width: "100%",
          placeholder: "",
          required: "false",
          tabname: "1",
        },

        {
          label: "Forgot Password?",
          name: "forgotpassword",
          type: "link",
          width: "50%",
          placeholder: "",
          required: "false",
          tabname: "1",
        },
        {
          label: "Sign Up",
          name: "signup",
          type: "link",
          width: "50%",
          placeholder: "",
          required: "false",
          tabname: "1",
        },
        {
          label: loginIconsHtml,
          name: "signup",
          type: "outputhtml",
          width: "100%",
          placeholder: "",
          required: "false",
          tabname: "1",
        },
      ];
      if (action === "signup") {
        let loginIconsSignupHtml = [];

        let iconarraySignup = [
          // {
          //   label: "Label1",
          //   name: "facebooksignup",
          //   iconName: "facebook",
          //   iconSource: "fontaway",
          // },
          {
            label: "Label2",
            name: "googlesignup",
            iconName: "google",
            iconSource: "fontaway",
          },
          // {
          //   label: "Label2",
          //   name: "amazonlogin",
          //   iconName: "amazon",
          //   iconSource: "fontaway",
          // },
        ];
        loginIconsSignupHtml.push(
          <Iconbar
            iconarray={iconarraySignup}
            isHorizontol="true"
            style={{ width: "" }}
            iconPadding="1vw"
            iconClk={this.clkHandler}
          />
        );
        let signuppannelbuttonshtml = [];
        signuppannelbuttonshtml.push(
          <div className="org-fr org-fjc-sb org-fai-c">
            <div className="org-fr org-fai-c">
              <button
                onClick={() =>
                  this.clkHandler({
                    buttonLabel: "",
                    buttonName: "signupcancel",
                    buttonType: "",
                  })
                }
              >
                Cancel
              </button>
            </div>
            <div className="org-fr org-fjc-e org-fai-c">
              I want to Register as &nbsp;
              <select
                defaultValue="learner"
                style={{ padding: "5px" }}
                onChange={(e) => {
                  this.inputChanged(e, { inputName: "registeras" });
                }}
              >
                <option value="tutor">Tutor</option>
                <option value="learner">Learner</option>
                <option value="admin">Admin</option>
              </select>
              &nbsp;
              <button
                onClick={() =>
                  this.clkHandler({
                    buttonLabel: "",
                    buttonName: "signupregister",
                    buttonType: "",
                  })
                }
              >
                Register
              </button>
              {loginIconsSignupHtml}
            </div>
          </div>
        );
        dataprops = [
          {
            label: "Email",
            name: "registeremail",
            type: "inputtext",
            width: "100%",
            placeholder: "",
            required: "true",
            tabname: "1",
          },
          {
            label: "Password",
            name: "registerpassword",
            type: "inputpassword",
            width: "100%",
            placeholder: "",
            required: "true",
            tabname: "1",
          },
          {
            label: "Confirm Password",
            name: "registerconfirmpassword",
            type: "inputpassword",
            width: "100%",
            placeholder: "",
            required: "true",
            tabname: "1",
          },
          {
            label: "First Name",
            name: "registerfirstname",
            type: "inputtext",
            width: "100%",
            placeholder: "",
            required: "true",
            tabname: "1",
          },
          {
            label: "Last Name",
            name: "registerlastname",
            type: "inputtext",
            width: "100%",
            placeholder: "",
            required: "false",
            tabname: "1",
          },
          {
            label: "Phone",
            name: "registerphone",
            type: "inputtext",
            width: "100%",
            placeholder: "",
            required: "false",
            tabname: "1",
          },

          {
            label: signuppannelbuttonshtml,
            name: "signuppannelbuttons",
            type: "outputhtml",
            width: "100%",
            placeholder: "",
            required: "false",
            tabname: "1",
          },
        ];
      }
      if (action === "forgotpassword") {
        let forgotpasswordpannelbuttonshtml = [];
        forgotpasswordpannelbuttonshtml.push(
          <div className="org-fr org-fjc-e">
            <button
              onClick={() =>
                this.clkHandler({
                  buttonLabel: "",
                  buttonName: "forgotpasswordcancel",
                  buttonType: "",
                })
              }
              data-buttonname="forgotpasswordcancel"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                this.clkHandler({
                  buttonLabel: "",
                  buttonName: "forgotpasswordsubmit",
                  buttonType: "",
                })
              }
              data-name="forgotpasswordsubmit"
            >
              Submit
            </button>
          </div>
        );
        dataprops = [
          {
            label: "Email",
            name: "forgotemail",
            type: "inputtext",
            width: "100%",
            placeholder: "",
            required: "true",
            tabname: "1",
          },

          {
            label: forgotpasswordpannelbuttonshtml,
            name: "forgotpasswordpannelbuttons",
            type: "outputhtml",
            width: "100%",
            placeholder: "",
            required: "true",
            tabname: "1",
          },
        ];
      }
    }

    console.log(dataprops);
    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <Nofification
          showNotification={this.state.showNotification}
          notificationMessages={this.state.notificationMessages}
        />
        {showSpinner === "true" ? <Spinner /> : ""}
        <img
          src={imgLogin}
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            color: "",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="eelf mp"
            style={{ textAlign: "center", color: "black" }}
          >
            <b>Postpaid Tutors</b>
          </div>

          {isrefreshtoken == "true" ? (
            <div>{refreshTokenHtml}</div>
          ) : (
            <Htmlform
              inputChanged={this.inputChanged}
              clkHandler={this.clkHandler}
              inputKeyUp={this.inputKeyUp}
              dataprops={dataprops}
              bgcolor=""
              activeTabName="1"
            />
          )}
        </div>
      </div>
    );
  }
}

export default F;
