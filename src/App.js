import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//import { Provider } from "react-redux";
//import { createStore, applyMiddleware } from 'redux';
//import promiseMiddleware from 'redux-promise';
import Routes from "./routes";
//import rootReducer from '../../reducers';
//import { consoleLog } from "../../../utils/js/index"

//const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

class F extends React.Component {
  render() {
    return (
      <>
        <Routes />
      </>
    );
  }
}

export default F;
