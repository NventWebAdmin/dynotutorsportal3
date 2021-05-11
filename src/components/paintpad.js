import React, { Component } from "react";
var prevX,
  prevY,
  currX,
  currY = 0,
  lineprevX,
  lineprevY,
  linecurrX,
  linecurrY = 0,
  color = "black",
  thickness = 2,
  flag = false,
  paintArray = [];

class F extends Component {
  constructor(props) {
    super(props);
    let drawHistory = [];
    // drawHistory.push({
    //   prevX: 300,
    //   prevY: 300,
    //   currntX: 400,
    //   currntY: 400,
    //   strokeStyle: "blue",
    //   lineWidth: 2,
    // });

    this.state = {
      //  cWidth: "",
      //  cHeight: "",
      clkType: "",
      dragType: "",
      drawHistory: drawHistory,
      drawHistorytoAttach: [],
    };
  }
  componentDidUpdate(prevProps) {
    let {
      //canvashtmlid,
      hiddentexthtmlid,
      defaultdrawHistory,
    } = this.props.compprops;
    console.log("1" + hiddentexthtmlid);
    console.log(prevProps.compprops.defaultdrawHistory);
    console.log(defaultdrawHistory);
    this.reDraw();
    // if (prevProps && JSON.stringify(this.props) != JSON.stringify(prevProps)) {
    //   console.log("1" + hiddentexthtmlid);
    //   if (
    //     prevProps.compprops.defaultdrawHistory &&
    //     JSON.stringify(prevProps.compprops.defaultdrawHistory) !=
    //       JSON.stringify(defaultdrawHistory)
    //   ) {
    //     console.log("2");
    //     this.reDraw();
    //   }
    // }
  }

  componentDidMount() {
    console.log(this.props.compprops);
    let {
      canvashtmlid,
      // hiddentexthtmlid,
      defaultdrawHistory,
      // editable,
    } = this.props.compprops;
    let { drawHistory } = this.state;
    if (defaultdrawHistory) {
      for (let i = 0; i < defaultdrawHistory.length; i++) {
        drawHistory.push(defaultdrawHistory[i]);
      }
    }
    // let drawHistorytoupdate = [];
    // if (defaultdrawHistory && defaultdrawHistory.length > 0) {
    //   drawHistorytoupdate = defaultdrawHistory;
    // }
    var c = document.getElementById("myCanvas");
    console.log(c.width);
    console.log(c.parentElement.clientWidth);
    c.width = c.parentElement.clientWidth - 20;
    c.height = c.parentElement.clientHeight - 20;
    if (canvashtmlid !== "") {
      c.id = canvashtmlid;
    }
    // var BB = c.getBoundingClientRect();

    this.setState(
      {
        //  cWidth: c.width,
        //   cHeight: c.height,
        drawHistory: drawHistory,
      },
      () => {
        this.attachtoParent();
      }
    );
    //   var canvashtmlparentdivid = document.getElementById("canvaspar");
    //  canvashtmlparentdivid.addEventListener("resize", this.resize());
  }

  resize = () => {
    alert();
  };

  drawText = (props) => {
    let { canvashtmlid } = this.props.compprops;
    console.log(props);
    let { font, text, x, y } = props;
    var c = document.getElementById(canvashtmlid);
    var ctx = c.getContext("2d");
    ctx.font = font;
    ctx.fillText(text, x, y);
  };

  drawRect = () => {
    let { canvashtmlid } = this.props.compprops;

    var c = document.getElementById(canvashtmlid);
    var ctx = c.getContext("2d");
    ctx.font = "20px Georgia";
    ctx.fillText("Hello World!", 10, 50);
  };

  mouseDown = (e) => {};
  mouseDrop = (e) => {
    let { canvashtmlid, hiddendivhtmlid } = this.props.compprops;
    console.log("canvas mouseDrop");
    console.log(this.state);
    var c = document.getElementById(canvashtmlid);

    var BB = c.getBoundingClientRect();
    let cLeft = BB.left;
    let cTop = BB.top;
    let { dragType } = this.state;
    if (dragType === "text") {
      document.getElementById(hiddendivhtmlid).innerHTML = "";
      console.log(e.clientX);
      console.log(e.clientY);

      var node = document.createElement("input", {});
      node.onchange = (e) => {
        this.inputTextChanged(e);
      };
      //  node.innerHTML = "                                      ";
      // node.contenteditable = "true";
      let inputX = e.clientX - cLeft;
      let inputY = e.clientY - cTop;
      node.style =
        " position: absolute; left:" +
        inputX +
        "px;top:" +
        inputY +
        "px;z-index:11;";
      console.log(node.style);
      document.getElementById(hiddendivhtmlid).appendChild(node);
    }
  };
  mouseMove = (e) => {
    console.log("canvas mousemove");
  };

  drawPaintArray = (props) => {
    let { data } = props;
    let { canvashtmlid } = this.props.compprops;

    var canvas = document.getElementById(canvashtmlid);
    var ctx = canvas.getContext("2d");
    for (let i = 0; i < data.length; i++) {
      //  console.log(data[i]);
      ctx.beginPath();
      ctx.moveTo(data[i].prevX, data[i].prevY);
      ctx.lineTo(data[i].currX, data[i].currY);
      ctx.strokeStyle = data[i].color;
      ctx.lineWidth = data[i].thickness;
      ctx.stroke();
      ctx.closePath();
    }
  };
  mouseMoveCanvas2 = (e) => {
    let { clkType } = this.state;
    let { canvashtmlid } = this.props.compprops;
    // console.log("canvas2 mousemove" + e.clientX);
    // console.log("canvas2 mousemove" + cLeft);
    var canvas = document.getElementById(canvashtmlid);
    var ctx = canvas.getContext("2d");

    var BB = canvas.getBoundingClientRect();
    let cLeft = BB.left;
    let cTop = BB.top;

    if (e.type === "mouseout") {
      this.attachtoParent();
    }

    if (clkType === "paint") {
      // console.log("aaaaa" + prevX + "====" + prevY);
      // console.log("aaaaa" + currX + "====" + currY);
      prevX = currX;
      prevY = currY;
      currX = e.clientX - cLeft;
      currY = e.clientY - cTop;
      if (e.type === "mousedown") {
        flag = true;
      }
      if (e.type === "mouseup" || e.type === "mouseout") {
        flag = false;
        if (e.type === "mouseup") {
          this.autoSavePaintDatatoState();
        }
      }
      if (e.type === "mousemove") {
        if (flag) {
          paintArray.push({
            prevX: prevX,
            prevY: prevY,
            currX: currX,
            currY: currY,
            strokeStyle: color,
            lineWidth: thickness,
          });

          console.log(paintArray);
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(currX, currY);
          ctx.strokeStyle = color;
          ctx.lineWidth = thickness;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }

    if (clkType === "line") {
      if (e.type === "mousedown") {
        flag = true;
        currX = e.clientX - cLeft;
        currY = e.clientY - cTop;
        linecurrX = e.clientX - cLeft;
        linecurrY = e.clientY - cTop;
      }
      if (e.type === "mousemove" && flag === true) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - cLeft;
        currY = e.clientY - cTop;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.stroke();
        ctx.closePath();
      }
      if (e.type === "mouseup") {
        flag = false;
        lineprevX = linecurrX;
        lineprevY = linecurrY;
        linecurrX = e.clientX - cLeft;
        linecurrY = e.clientY - cTop;

        paintArray.push({
          prevX: lineprevX,
          prevY: lineprevY,
          currX: linecurrX,
          currY: linecurrY,
          strokeStyle: color,
          lineWidth: thickness,
        });

        this.autoSavePaintDatatoState();
      }
    }
  };

  reDraw = () => {
    let { drawHistory } = this.state;
    let {
      canvashtmlid,
      //   hiddentexthtmlid,
      //  defaultdrawHistory,
    } = this.props.compprops;
    console.log(this.state);
    var c = document.getElementById(canvashtmlid);

    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    // if (defaultdrawHistory) {
    //   for (let i = 0; i < defaultdrawHistory.length; i++) {
    //     let drawHElement = defaultdrawHistory[i];
    //     if (drawHElement.type === "drawText") {
    //       this.drawText({
    //         font: drawHElement.font,
    //         text: drawHElement.text,
    //         x: drawHElement.x,
    //         y: drawHElement.y,
    //       });
    //     }
    //     if (drawHElement.type === "paintarray") {
    //       this.drawPaintArray({
    //         data: drawHElement.data,
    //       });
    //     }
    //   }
    // }

    for (let i = 0; i < drawHistory.length; i++) {
      let drawHElement = drawHistory[i];
      if (drawHElement.type === "drawText") {
        this.drawText({
          font: drawHElement.font,
          text: drawHElement.text,
          x: drawHElement.x,
          y: drawHElement.y,
        });
      }
      if (drawHElement.type === "paintarray") {
        this.drawPaintArray({
          data: drawHElement.data,
        });
      }
    }
  };

  undoLast = () => {
    let { drawHistory } = this.state;
    drawHistory.pop();
    this.setState({ drawHistory: drawHistory }, () => {
      this.reDraw();
    });
  };
  textDrag = (props) => {
    let { dragType } = props;
    this.setState({ dragType: dragType });
  };

  allowDrop = (e) => {
    e.preventDefault();
  };

  inputTextChanged = (e) => {
    let { canvashtmlid, hiddendivhtmlid } = this.props.compprops;
    let { drawHistory } = this.state;
    var rect = e.target.getBoundingClientRect();
    let d = new Date();

    let time = d.getTime();
    var c = document.getElementById(canvashtmlid);
    var BB = c.getBoundingClientRect();
    let cLeft = BB.left;
    let cTop = BB.top;

    drawHistory.push({
      type: "drawText",
      font: "20px Georgia",
      text: e.target.value,
      x: rect.left - cLeft,
      y: rect.top - cTop,
      time: time,
    });
    this.setState({ drawHistory: drawHistory }, () => {
      this.reDraw();
    });
    var list = document.getElementById(hiddendivhtmlid);
    list.removeChild(list.childNodes[0]);
  };

  autoSavePaintDatatoState = () => {
    let { drawHistory } = this.state;
    console.log(paintArray);
    if (paintArray.length > 0) {
      drawHistory.push({ type: "paintarray", data: paintArray });
    }
    paintArray = [];
    console.log(drawHistory);
    this.setState({ drawHistory: drawHistory }, () => {
      this.reDraw();
    });
  };

  attachtoParent = () => {
    let { drawHistory } = this.state;
    let {
      // canvashtmlid,
      canvashtmlparentdivid,
      // hiddentexthtmlid,
      order,
    } = this.props.compprops;
    // drawHistorytoAttach = drawHistory;
    console.log(drawHistory);
    this.props.onattach({
      canvashtmlparentdivid: canvashtmlparentdivid,
      drawHistory: drawHistory,
      order: order,
    });
  };

  render() {
    let { action, hiddendivhtmlid } = this.props.compprops;

    console.log(this.state);

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "yellow",
          position: "relative",
        }}
        contentEditable="false"
        //id="canvaspar"
      >
        {action === "create" || action === "edit" ? (
          <div
            id={hiddendivhtmlid}
            style={{ left: 0, top: 0, zIndex: 10 }}
          ></div>
        ) : (
          ""
        )}

        {action === "create" || action === "edit" ? (
          <span style={{ left: 0, top: 0, zIndex: 11 }}>
            <div className="org-fr org-fjc-sb">
              <div>
                <span
                  className="org-bb esm mf"
                  onDrag={() =>
                    this.textDrag({ dragType: "text", clkType: "" })
                  }
                  draggable="true"
                >
                  T
                </span>
                <span
                  className="org-bb esm mf"
                  onClick={() => this.setState({ clkType: "paint" })}
                  draggable="true"
                >
                  P
                </span>
                <span
                  className="org-bb esm mf"
                  onClick={() => this.setState({ clkType: "line" })}
                  draggable="true"
                >
                  L
                </span>

                <span className="org-bb esm mf" onClick={this.undoLast}>
                  Undo
                </span>
              </div>
              <div>
                {/* <span className="org-bb esm mf" onClick={this.attachtoParent}>
                  Attach
                </span>
                <span className="org-bb esm mf" onClick={this.props.onclose}>
                  close
                </span> */}
              </div>
            </div>
          </span>
        ) : (
          ""
        )}
        <canvas
          id="myCanvas"
          width="1000px"
          height="500px"
          style={{
            backgroundColor: "lightblue",
            left: 0,
            top: 0,
            zIndex: 9,
            width: "100%",
            overflow: "auto",
            //  height: "500px",
          }}
          // onMouseDown={this.mouseDown}
          onDrop={this.mouseDrop}
          onMouseMove={this.mouseMoveCanvas2}
          onMouseDown={this.mouseMoveCanvas2}
          onMouseUp={this.mouseMoveCanvas2}
          onMouseOut={this.mouseMoveCanvas2}
          onDragOver={(e) => this.allowDrop(e)}
        ></canvas>
      </div>
    );
  }
}

export default F;
