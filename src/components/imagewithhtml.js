import React, { Component } from "react";

{
  /*
  documentatnion:

  .js code:
  let lefthtml = [];
    lefthtml.push(
      <Htmlform
        dataprops={[
          {
            label: "Log In",
            name: "username",
            type: "headertext",
            placeholder: "",
          },
          {
            label: "User Name",
            name: "username",
            type: "inputtext",
            placeholder: "",
          },
          {
            label: "Password",
            name: "Password",
            type: "inputtext",
            placeholder: "",
          },
        ]}
        style={{ width: "80vw" }}
        inputChanged={(e) => {
          console.log(e.target.dataset.name + "==" + e.target.value);
        }}
      />
    );

    let imgobj = {
      imgsrc: Img2,
      left: { text: "", padding: "" },
      top: { text: "lefthtml", padding: "10px", width: "100%" },
      center: { text: lefthtml, padding: "10px", width: "100%" },
      right: { text: "", padding: "" },
      down: { text: "down", padding: "10px" },
    };

 .html code:

        <Svgcomp imgobj={imgobj} width="100vw" height="100vh" />
   
   */
}

class F extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let htmlarray = [];

    htmlarray.push(
      <div
        style={{
          ...this.props.style,
          backgroundColor: "",
          position: "relative",
        }}
      >
        {/* image */}
        <img
          class="imgcover"
          src={this.props.imgobj ? this.props.imgobj.imgsrc : ""}
          alt="Paris"
          style={{ width: "100%", height: "100%", filter: "blur(1px)" }}
        ></img>

        {/* top */}
        {this.props.imgobj.top.text == "" ? (
          ""
        ) : (
          <div
            style={{
              position: "absolute",

              top: 0,

              padding: this.props.imgobj.top.padding
                ? this.props.imgobj.top.padding
                : "10px",

              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: this.props.imgobj.top.width
                  ? this.props.imgobj.top.width
                  : "",
              }}
            >
              {this.props.imgobj.top.text}
            </div>
          </div>
        )}

        {/* center */}
        {this.props.imgobj.center.text == "" ? (
          ""
        ) : (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: this.props.imgobj.center.width
                ? this.props.imgobj.center.width
                : "",
              padding: this.props.imgobj.center.padding
                ? this.props.imgobj.center.padding
                : "10px",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            {this.props.imgobj.center.text}
          </div>
        )}

        {/* down */}
        {this.props.imgobj.down.text == "" ? (
          ""
        ) : (
          <div
            style={{
              position: "absolute",

              bottom: 0,
              width: this.props.imgobj.down.width
                ? this.props.imgobj.down.width
                : "",
              padding: this.props.imgobj.down.padding
                ? this.props.imgobj.down.padding
                : "10px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {this.props.imgobj.down.text}
          </div>
        )}

        {/* left  */}
        {this.props.imgobj.left.text == "" ? (
          ""
        ) : (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: this.props.imgobj.left.width
                ? this.props.imgobj.left.width
                : "",
              padding: this.props.imgobj.left.padding
                ? this.props.imgobj.left.padding
                : "10px",
              transform: "translate(0%, -50%)",
              textAlign: "center",
            }}
          >
            {this.props.imgobj.left.text}
          </div>
        )}

        {/* right  */}
        {this.props.imgobj.right.text == "" ? (
          ""
        ) : (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              width: this.props.imgobj.right.width
                ? this.props.imgobj.right.width
                : "",
              padding: this.props.imgobj.right.padding
                ? this.props.imgobj.right.padding
                : "10px",
              transform: "translate(0%, -50%)",
              textAlign: "center",
            }}
          >
            {this.props.imgobj.right.text}
          </div>
        )}
      </div>
    );
    console.log(this.props.style);
    return <div style={{ height: "100vh", overflow: "auto" }}>{htmlarray}</div>;
  }
}

export default F;
