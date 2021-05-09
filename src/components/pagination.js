import React, { Component } from "react";
import { GetLocalIcon, GetGoogleIcon } from "./icons";
class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  itemClick = (e) => {
    this.props.clkHandler(e.target.dataset.name);
  };

  render() {
    let { startOfRows, noofRowsPerPage, totalRows } = this.props.rowprops;
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        {startOfRows == 0 ? (
          <div className="  ">
            <GetGoogleIcon
              name="first_page"
              data-name="first"
              style={{ opacity: "0.5" }}
            />
          </div>
        ) : (
          <div className="hoverclass  ">
            <GetGoogleIcon
              name="first_page"
              onClick={this.itemClick}
              data-name="first"
            />
          </div>
        )}

        {startOfRows == 0 ? (
          <div className=" ">
            <GetGoogleIcon
              name="chevron_left"
              data-name="previous"
              style={{ opacity: "0.5" }}
            />
          </div>
        ) : (
          <div className="hoverclass ">
            <GetGoogleIcon
              name="chevron_left"
              onClick={this.itemClick}
              data-name="previous"
            />
          </div>
        )}

        {parseInt(startOfRows) + parseInt(noofRowsPerPage) >= totalRows ? (
          <div className="">
            <GetGoogleIcon
              name="chevron_right"
              data-name="next"
              style={{ opacity: "0.5" }}
            />
          </div>
        ) : (
          <div className="hoverclass">
            <GetGoogleIcon
              name="chevron_right"
              onClick={this.itemClick}
              data-name="next"
            />
          </div>
        )}

        {parseInt(startOfRows) + parseInt(noofRowsPerPage) >= totalRows ? (
          <div className=" ">
            <GetGoogleIcon
              name="last_page"
              data-name="last"
              style={{ opacity: "0.5" }}
            />
          </div>
        ) : (
          <div className="hoverclass ">
            <GetGoogleIcon
              name="last_page"
              onClick={this.itemClick}
              data-name="last"
            />
          </div>
        )}
      </div>
    );
  }
}

export default F;
