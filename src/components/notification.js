import React, { Component } from "react";
import { GetLocalIcon } from "./icons";
class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  closeNotification = (e) => {
    console.log(e.target);
    let notificationItems = document.getElementsByClassName(
      "org-notificationitem"
    );
    for (let i = 0; i < notificationItems.length; i++) {
      if (notificationItems[i].dataset.name === e.target.dataset.name) {
        notificationItems[i].style.display = "none";
      }
    }
  };
  componentDidMount() {
    setTimeout(function () {
      let notificationItems = document.getElementsByClassName(
        "org-notificationitem"
      );
      for (let i = 0; i < notificationItems.length; i++) {
        notificationItems[i].style.display = "none";
      }
    }, 7000);
  }

  render() {
    console.log(this.props);
    let notificationhtml = [];
    if (this.props.showNotification === "true") {
      for (let i = 0; i < this.props.notificationMessages.length; i++) {
        if (this.props.notificationMessages[i].type === "error") {
          notificationhtml.push(
            <div
              style={{
                backgroundColor: "red",
              }}
              className="org-notificationitem"
              data-name={this.props.notificationMessages[i].name}
            >
              {this.props.notificationMessages[i].message}
              <span
                onClick={this.closeNotification}
                data-name={this.props.notificationMessages[i].name}
              >
                <GetLocalIcon
                  name="close"
                  data-name={this.props.notificationMessages[i].name}
                />
              </span>
            </div>
          );
        }
        if (this.props.notificationMessages[i].type === "info") {
          notificationhtml.push(
            <div
              style={{
                backgroundColor: "#00A1E0",
              }}
              className="org-notificationitem"
              data-name={this.props.notificationMessages[i].name}
            >
              {this.props.notificationMessages[i].message}
              <span
                onClick={this.closeNotification}
                data-name={this.props.notificationMessages[i].name}
              >
                <GetLocalIcon
                  name="close"
                  data-name={this.props.notificationMessages[i].name}
                />
              </span>
            </div>
          );
        }
        if (this.props.notificationMessages[i].type === "warning") {
          notificationhtml.push(
            <div
              style={{
                backgroundColor: "grey",
              }}
              className="org-notificationitem"
              data-name={this.props.notificationMessages[i].name}
            >
              {this.props.notificationMessages[i].message}
              <span
                onClick={this.closeNotification}
                data-name={this.props.notificationMessages[i].name}
              >
                <GetLocalIcon
                  name="close"
                  data-name={this.props.notificationMessages[i].name}
                />
              </span>
            </div>
          );
        }
      }
    }
    return <div className="org-notification">{notificationhtml}</div>;
  }
}

export default F;
