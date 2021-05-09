import React, { Component } from "react";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { qas } = this.props.compprops;
    let { activeindex } = this.state;
    let qasHtml = [];
    for (let i in qas) {
      qasHtml.push(
        <div className="sm eesp org-bb">
          <div
            className="org-frnw org-fjc-sb org-fai-s mf   "
            onClick={() => {
              this.setState({ activeindex: i });
            }}
          >
            <div className="esp">{qas[i].question}</div>
            <div>
              {activeindex === i ? (
                <i className="fa fa-minus sp"></i>
              ) : (
                <i className="fa fa-plus sp"></i>
              )}
            </div>
          </div>
          {activeindex === i ? <div className="esp">{qas[i].answer}</div> : ""}
        </div>
      );
    }
    return <div className="lm ">{qasHtml}</div>;
  }
}

export default F;
