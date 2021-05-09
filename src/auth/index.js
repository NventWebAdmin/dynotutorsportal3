import {
  signinAWS,
  refreshTokenAWS,
  signupAWS,
  resetPasswordAWS,
  forgetPasswordAWS,
  isUserAlreadyExistsAWS,
  getUserProfileAWS,
  isAuthenticatedUserAWS,
  signInwithGoogleAWS,
  signInwithFacebookAWS,
} from "./aws";
import {
  signinFirebase,
  refreshTokenFirebase,
  signupFirebase,
  resetPasswordFirebase,
  forgetPasswordFirebase,
  isUserAlreadyExistsFirebase,
  getUserProfileFirebase,
  isAuthenticatedUserFirebase,
  signInwithGoogleFirebase,
  signInwithFacebookFirebase,
} from "./firebase";
import { configdata } from "../config";

export function signin(userDetails) {
  console.log(userDetails);
  console.log(configdata().authvendor);
  let result = {};
  if (configdata().authvendor == "aws") {
    result = signinAWS(userDetails);
  }
  if (configdata().authvendor == "firebase") {
    result = signinFirebase(userDetails);
  }

  return result;
}

export function refreshtoken(userDetails) {
  console.log(userDetails);
  console.log(configdata().authvendor);
  let result = {};
  if (configdata().authvendor == "aws") {
    result = refreshTokenAWS(userDetails);
  }
  if (configdata().authvendor == "firebase") {
    result = refreshTokenFirebase(userDetails);
  }

  return result;
}

export function signup(userDetails) {
  console.log(userDetails);
  let result = {};
  if (configdata().authvendor == "aws") {
    result = signupAWS();
  }
  if (configdata().authvendor == "firebase") {
    result = signupFirebase(userDetails);
  }

  return result;
}

export function resetPassword(userDetails) {
  let result = {};
  if (configdata().authvendor == "aws") {
    result = resetPasswordAWS(userDetails);
  }
  if (configdata().authvendor == "firebase") {
    result = resetPasswordFirebase(userDetails);
  }

  return result;
}

export function forgetPassword(userDetails) {
  let result = {};
  if (configdata().authvendor == "aws") {
    result = forgetPasswordAWS(userDetails);
  }
  if (configdata().authvendor == "firebase") {
    result = forgetPasswordFirebase(userDetails);
  }

  return result;
}

export function isUserAlreadyExists(userDetails) {
  let result = {};
  if (configdata().authvendor == "aws") {
    result = isUserAlreadyExistsAWS(userDetails);
  }
  if (configdata().authvendor == "firebase") {
    result = isUserAlreadyExistsFirebase(userDetails);
  }

  return result;
}

export function getUserProfile(userDetails) {
  let result = {};
  if (configdata().authvendor == "aws") {
    result = getUserProfileAWS(userDetails);
  }
  if (configdata().authvendor == "firebase") {
    result = getUserProfileFirebase(userDetails);
  }
  return result;
}

export function isAuthenticatedUser(userDetails) {
  let result = {};
  if (configdata().authvendor == "aws") {
    result = isAuthenticatedUserAWS(userDetails);
  }
  if (configdata().authvendor == "firebase") {
    result = isAuthenticatedUserFirebase(userDetails);
  }
  return result;
}

export function signInwithGoogle(userDetails) {
  let result = {};
  if (configdata().authvendor == "aws") {
    result = signInwithGoogleAWS(userDetails);
  }
  if (configdata().authvendor == "firebase") {
    result = signInwithGoogleFirebase(userDetails);
  }
  return result;
}

export function signInwithFacebook(userDetails) {
  let result = {};
  if (configdata().authvendor == "aws") {
    result = signInwithFacebookAWS(userDetails);
  }
  if (configdata().authvendor == "firebase") {
    result = signInwithFacebookFirebase(userDetails);
  }
  return result;
}

export function checkAsync() {
  let result = setTimeout(function () {
    return "helow";
  }, 3000);
  console.log(result);
  return "test";
}
