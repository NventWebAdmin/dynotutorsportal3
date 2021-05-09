import axios from "axios";
import React from "react";

//var firebase = require("firebase");
var firebaseui = require("firebaseui");

// Initialize Firebase
//window.firebase.initializeApp(firebaseConfig);

let errMessage = "";
let firebaseWebApiKey = "AIzaSyAwsbEv9dvu2aDeOf4bpMZ2byvwLUgqIDo";
let firebaseAuthSignupURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
  firebaseWebApiKey;
let firebaseAuthSigninURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  firebaseWebApiKey;
let firebaseAuthrefreshTokenURL =
  "https://securetoken.googleapis.com/v1/token?key=" + firebaseWebApiKey;
let firebaseAuthGetAllUsersURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
  firebaseWebApiKey;
let firebaseAuthChangePasswordURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
  firebaseWebApiKey;
let firebaseAuthResetPasswordURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
  firebaseWebApiKey;
let firebaseAuthVeifyEmailURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
  firebaseWebApiKey;
let firebaseAuthgetProviderslURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=" +
  firebaseWebApiKey;

export async function signinFirebase(userDetails) {
  console.log(userDetails);
  let result = { isSuccess: "false", message: "", dataprops: {} };

  let useremail = userDetails.username;
  let password = userDetails.password;
  console.log(useremail);
  console.log(password);

  let axiosresult = await axios
    .post(
      firebaseAuthSigninURL,
      {
        email: useremail,
        password: password,
        returnSecureToken: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      result = {
        isSuccess: "true",
        message: "user loggedin",
        dataprops: response.data,
      };
      return result;
    })
    .catch((error) => {
      result = {
        isSuccess: "false",
        message: error.response.data.error.message,
        dataprops: {},
      };
      return result;
    });
  result = axiosresult;
  console.log(result);

  return result;
}

export async function refreshTokenFirebase(userDetails) {
  console.log(userDetails);
  let result = { isSuccess: "false", message: "", dataprops: {} };

  // let useremail = userDetails.username;
  // let password = userDetails.password;
  let refreshtoken = userDetails.refreshtoken;
  // console.log(useremail);
  console.log(refreshtoken);

  let axiosresult = await axios
    .post(
      firebaseAuthrefreshTokenURL,
      {
        grant_type: "refresh_token",
        refresh_token: refreshtoken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      result = {
        isSuccess: "true",
        message: "user loggedin",
        dataprops: response.data,
      };
      return result;
    })
    .catch((error) => {
      result = {
        isSuccess: "false",
        message: error.response.data.error.message,
        dataprops: {},
      };
      return result;
    });
  result = axiosresult;
  console.log(result);

  return result;
}

export async function signupFirebase(userDetails) {
  console.log(userDetails);
  let result = { isSuccess: "false", message: "", dataprops: {} };

  let useremail = userDetails.userState.registeremail;
  let password = userDetails.userState.registerpassword;
  let registerfirstname = userDetails.userState.registerfirstname;
  let registerlastname = userDetails.userState.registerlastname;
  let registerphone = userDetails.userState.registerphone;

  let axiosresult = await axios
    .post(
      firebaseAuthSignupURL,
      {
        email: useremail,
        password: password,
        displayName: registerfirstname + " " + registerlastname,
        phoneNumber: registerphone,
        returnSecureToken: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(async (response) => {
      let axiosemailresult = await axios
        .post(
          firebaseAuthVeifyEmailURL,
          {
            requestType: "VERIFY_EMAIL",
            idToken: response.data.idToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          result = {
            isSuccess: "true",
            message: "Please Signin to Access",
            dataprops: response.data,
          };
          console.log(result);
          return result;
        })
        .catch((error) => {
          result = {
            isSuccess: "false",
            message: error.response.data.error.message,
            dataprops: {},
          };
          return result;
        });
      return axiosemailresult;
    })
    .catch((error) => {
      result = {
        isSuccess: "false",
        message: error.response.data.error.message,
        dataprops: {},
      };
      return result;
    });
  console.log(axiosresult);
  result = axiosresult;

  return result;
}

export async function resetPasswordFirebase(userDetails) {
  var auth = window.firebase.auth();

  let result = { isSuccess: "false", message: "", dataprops: {} };

  let useremail = userDetails.userState.forgotemail;
  console.log(userDetails);

  let axiosresult = auth
    .sendPasswordResetEmail(useremail)
    .then(function () {
      result = { isSuccess: "true", message: "", dataprops: {} };
      return result;
    })
    .catch(function (error) {
      alert(JSON.stringify(error));
      let message = "";
      if (error.message.includes("The email address is badly formatted")) {
        message = "Invalid Email";
      }
      if (error.message.includes("There is no user")) {
        message = "No Email found";
      }
      result = {
        isSuccess: "false",
        message: message,
        dataprops: {},
      };
      return result;
    });

  // let axiosresult = await axios
  //   .post(
  //     firebaseAuthResetPasswordURL,
  //     {
  //       requestType: "PASSWORD_RESET",
  //       email: useremail,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     console.log(response);
  //     result = {
  //       isSuccess: "true",
  //       message: "reset email sent",
  //       dataprops: response.data,
  //     };
  //     return result;
  //   })
  //   .catch((error) => {
  //     console.log(error.response);
  //     result = {
  //       isSuccess: "false",
  //       message: error.response.data.error.message,
  //       dataprops: {},
  //     };
  //     return result;
  //   });
  // result = axiosresult;
  // console.log(result);
  return axiosresult;
}

export function forgetPasswordFirebase() {
  let result = {};
  return result;
}

export function isUserAlreadyExistsFirebase() {
  let result = {};
  return result;
}

export function changePasswordFirebase(userDetails) {
  let result = { isSuccess: "false", message: "", dataprops: {} };

  let useremail = userDetails.username;
  let password = userDetails.password;
  let idToken = userDetails.idToken;

  axios
    .post(
      firebaseAuthChangePasswordURL,
      {
        idToken: idToken,
        password: password,
        returnSecureToken: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      result = {
        isSuccess: "true",
        message: "password changed",
        dataprops: response.data,
      };
      //  this.getUserData();
    })
    .catch((error) => {
      console.log(error.response);
      result = {
        isSuccess: "false",
        message: error.response.data.error.message,
        dataprops: {},
      };
    });
}

export async function signInwithGoogleFirebase(userDetails) {
  let result = { isSuccess: "false", message: "", dataprops: {} };

  // let useremail = userDetails.username;
  // let password = userDetails.password;
  // let idToken = userDetails.idToken;

  var provider = new window.firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  let axiosresult = await window.firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token.
      console.log(result);
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(JSON.stringify(user));
      console.log(user.email);
      console.log(token);
      console.log(user.refreshToken);
      result = {
        isSuccess: "true",
        message: "user loggedin",
        dataprops: {
          email: user.email,
          expiresIn: 3600,
          idToken: token,
          refreshToken: user.refreshToken,
          emailVerified: user.emailVerified,
        },
      };
      return result;
      // axios
      //   .post(
      //     firebaseAuthgetProviderslURL,
      //     {
      //       identifier: user.email,
      //       continueUri: "http://localhost:3000/",
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     console.log(response);

      //
      //   })
      //   .catch((error) => {
      //     console.log(error.response);
      //     result = {
      //       isSuccess: "false",
      //       message: error.response.data.error.message,
      //       dataprops: {},
      //     };
      //   });
    });

  console.log(axiosresult);
  return axiosresult;
}
export function signInwithFacebookFirebase(userDetails) {
  let result = { isSuccess: "false", message: "", dataprops: {} };

  // let useremail = userDetails.username;
  // let password = userDetails.password;
  // let idToken = userDetails.idToken;

  var provider = new window.firebase.auth.FacebookAuthProvider();
  //provider.addScope("profile");
  //provider.addScope("email");
  provider.addScope("user_birthday");
  // firebase.auth().languageCode = "fr_FR";
  provider.setCustomParameters({
    display: "popup",
  });
  window.firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

export async function isAuthenticatedUserFirebase(userDetails) {
  let result = {};
  let userIdtoken = await sessionStorage.getItem("orgidToken");
  try {
    let axiosresult = await axios
      .post(firebaseAuthGetAllUsersURL, {
        idToken: userIdtoken,
      })
      .then((response) => {
        console.log(response.data.users[0]);
        //this.setState({ userData: response.data.users[0] });
        if (!response.data.users[0].emailVerified) {
          result = {
            isSuccess: "false",
            message: "please click on verification link in email to proceed",
            dataprops: {},
          };
          return result;
        } else {
          result = {
            isSuccess: "true",
            message: "",
            dataprops: {},
          };
          return result;
        }
      })
      .catch((e) => {
        console.error(e);
        result = {
          isSuccess: "false",
          message: JSON.stringify(e),
          dataprops: {},
        };
        return result;
      });
    result = axiosresult;
  } catch (err) {
    result = {
      isSuccess: "false",
      message: JSON.stringify(err),
      dataprops: {},
    };
  }

  return result;
}
export async function getUserProfileFirebase(userDetails) {
  var user = new window.firebase.auth().currentUser;

  console.log(JSON.stringify(user));

  let result = {
    isSuccess: "true",
    message: "",
    dataprops: { name: user.displayName, phone: user.phoneNumber },
  };

  // let userIdtoken = await sessionStorage.getItem("orgidToken");
  // if (!userIdtoken) {
  //   userIdtoken = userDetails.idToken;
  // }
  // alert(userIdtoken);
  // try {
  //   axios
  //     .post(firebaseAuthGetAllUsersURL, {
  //       idToken: userIdtoken,
  //     })
  //     .then((response) => {
  //       console.log(response.data.users[0]);
  //       //this.setState({ userData: response.data.users[0] });
  //       if (!response.data.users[0].emailVerified) {
  //         result = {
  //           isSuccess: "false",
  //           message: "please click on verification link in email to proceed",
  //           dataprops: {},
  //         };
  //       } else {
  //         result = {
  //           isSuccess: "true",
  //           message: "",
  //           dataprops: {},
  //         };
  //       }
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //       result = {
  //         isSuccess: "false",
  //         message: JSON.stringify(e),
  //         dataprops: {},
  //       };
  //     });
  // } catch (err) {
  //   result = {
  //     isSuccess: "false",
  //     message: JSON.stringify(err),
  //     dataprops: {},
  //   };
  // }
  console.log(result);
  return result;
}
