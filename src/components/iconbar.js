import React, { Component } from "react";
import { GetFontAwesomeIcon, GetGoogleIcon, GetBoostrapIcon } from "./icons";

// documentation

/*
iconClk = (e) => {
  console.log(e.target.dataset.name);
};

.js
let iconarray = [
    {
      label: "Label1",
      name: "name1",
      iconName: "menu",
      iconSource: "google",
    },
    {
      label: "Label2",
      name: "name2",
      iconName: "done",
      iconSource: "google",
    },
    {
      label: "Label2",
      name: "name2",
      iconName: "done",
      iconSource: "google",
    },
    {
      label: "Label2",
      name: "name2",
      iconName: "done",
      iconSource: "google",
    },
  ];

  .html
 <Svgcomp
iconarray={iconarray}
iconClk={this.iconClk}
isHorizontol="false"
style={{ width: "5vw" }}
iconPadding="1vw"
iconClk={this.iconClk}
/>
<Svgcomp
iconarray={iconarray}
iconClk={this.iconClk}
isHorizontol="true"
style={{ width: "30vw" }}
iconPadding="2vw"
iconClk={this.iconClk}
/> */

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  iconClk = () => {};

  render() {
    let iconarrayhtml = [];

    for (let i = 0; i < this.props.iconarray.length; i++) {
      if (this.props.iconarray[i].iconSource === "google") {
        iconarrayhtml.push(
          <div
            key={this.props.iconarray[i].name}
            style={{
              padding: this.props.iconPadding ? this.props.iconPadding : "",
            }}
          >
            <div
              onClick={() =>
                this.props.iconClk({ buttonName: this.props.iconarray[i].name })
              }
              className="org-cursor"
              data-name={this.props.iconarray[i].name}
            >
              <GetGoogleIcon
                name={this.props.iconarray[i].iconName}
                data-name={this.props.iconarray[i].name}
              />
            </div>
          </div>
        );
      } else if (this.props.iconarray[i].iconSource === "fontaway") {
        console.log(this.props.iconarray[i]);
        iconarrayhtml.push(
          <div
            key={this.props.iconarray[i].name}
            style={{
              padding: this.props.iconPadding ? this.props.iconPadding : "",
            }}
          >
            <div
              key={this.props.iconarray[i].name}
              onClick={() =>
                this.props.iconClk({ buttonName: this.props.iconarray[i].name })
              }
              className="org-cursor"
              data-name={this.props.iconarray[i].name}
            >
              <GetFontAwesomeIcon
                key={this.props.iconarray[i].name}
                name={this.props.iconarray[i].iconName}
                data-name={this.props.iconarray[i].name}
              />
            </div>
          </div>
        );
      } else if (this.props.iconarray[i].iconSource === "bootstrap") {
        iconarrayhtml.push(
          <div
            key={this.props.iconarray[i].name}
            style={{
              padding: this.props.iconPadding ? this.props.iconPadding : "",
            }}
          >
            <div
              onClick={() =>
                this.props.iconClk({ buttonName: this.props.iconarray[i].name })
              }
              className="org-cursor"
              data-name={this.props.iconarray[i].name}
            >
              <GetBoostrapIcon
                name={this.props.iconarray[i].iconName}
                data-name={this.props.iconarray[i].name}
              />
            </div>
          </div>
        );
      } else {
      }
    }

    return (
      <div key={this.props.name} style={this.props.style}>
        {this.props.isHorizontol === "true" ? (
          <div
            key={this.props.name}
            style={{
              display: "flex",

              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {iconarrayhtml}
          </div>
        ) : (
          ""
        )}
        {this.props.isHorizontol !== "true" ? (
          <div
            key={this.props.name}
            style={{
              display: "flex",

              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {iconarrayhtml}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default F;
