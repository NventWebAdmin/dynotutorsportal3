import React, { Component } from "react";
import Signincomp from "../src/components/auth/signin";
import Signupcomp from "../src/components/auth/signup";
import Activateuser from "./components/auth/activateuser";
import Forgotpassword from "../src/components/auth/forgotpassword";
//import Urlerror from "../../../utils/ui/app/urlerror";
//import themeprops from "../../../utils/css/themes/index";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homecomp from "./home";

class F extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              path="/signin"
              exact
              render={(props) => <Signincomp routerprops={props} />}
            />
            <Route
              path="/activateuser"
              exact
              render={(props) => <Activateuser routerprops={props} />}
            />
            <Route
              path="/signup"
              exact
              render={(props) => <Signupcomp routerprops={props} />}
            />
            <Route
              path="/forgotpassword"
              exact
              render={(props) => <Forgotpassword routerprops={props} />}
            />
            <Route
              path="/:maintab"
              exact
              render={(props) => (
                <Homecomp
                  routerprops={props}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            />
            <Route
              path="/:maintab/:dropdown"
              exact
              render={(props) => (
                <Homecomp
                  routerprops={props}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            />
            <Route
              path="/:maintab/:dropdown/:rightdropdown"
              exact
              render={(props) => (
                <Homecomp
                  routerprops={props}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            />{" "}
            *
            <Route
              path="/"
              render={(props) => (
                <Homecomp
                  routerprops={props}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            />
            {/* <Route path="/" component={Urlerror} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default F;
