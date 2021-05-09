import React, { Component } from "react";

/*
  documentatnion:

 .js code:

  let modalheadertext = "header";
    let modalbodytext = [];

    modalbodytext.push(
      <>
        <p>
          In this example, we use CSS to create a modal (dialog box) that is
          hidden by default.
        </p>
        <p>
          We use JavaScript to trigger the modal and to display the current
          image inside the modal when it is clicked on. Also note that we use
          the value from the image's "alt" attribute as an image caption text
          inside the modal.
        </p>
        <p>
          Don't worry if you do not understand the code right away. When you are
          done with CSS, go to our JavaScript Tutorial to learn more.
        </p>
        <p>
          We use JavaScript to trigger the modal and to display the current
          image inside the modal when it is clicked on. Also note that we use
          the value from the image's "alt" attribute as an image caption text
          inside the modal.
        </p>
        <p>
          Don't worry if you do not understand the code right away. When you are
          done with CSS, go to our JavaScript Tutorial to learn more.
        </p>
        <p>
          We use JavaScript to trigger the modal and to display the current
          image inside the modal when it is clicked on. Also note that we use
          the value from the image's "alt" attribute as an image caption text
          inside the modal.
        </p>
        <p>
          Don't worry if you do not understand the code right away. When you are
          done with CSS, go to our JavaScript Tutorial to learn more.
        </p>
        <p>
          We use JavaScript to trigger the modal and to display the current
          image inside the modal when it is clicked on. Also note that we use
          the value from the image's "alt" attribute as an image caption text
          inside the modal.
        </p>
        <p>
          Don't worry if you do not understand the code right away. When you are
          done with CSS, go to our JavaScript Tutorial to learn more.
        </p>
        <p>
          We use JavaScript to trigger the modal and to display the current
          image inside the modal when it is clicked on. Also note that we use
          the value from the image's "alt" attribute as an image caption text
          inside the modal.
        </p>
        <p>
          Don't worry if you do not understand the code right away. When you are
          done with CSS, go to our JavaScript Tutorial to learn more.
        </p>
        <p>
          We use JavaScript to trigger the modal and to display the current
          image inside the modal when it is clicked on. Also note that we use
          the value from the image's "alt" attribute as an image caption text
          inside the modal.
        </p>
        <p>
          Don't worry if you do not understand the code right away. When you are
          done with CSS, go to our JavaScript Tutorial to learn more.
        </p>
      </>
    );

    let modalfooter = {};
    let buttons = [
      { label: "Cancel", name: "cancel", onClick: this.modalfooterbtnClk },
      { label: "Next", name: "next", onClick: this.modalfooterbtnClk },
      { label: "Save", name: "save", onClick: this.modalfooterbtnClk },
    ];
    modalfooter.buttons = buttons;


    .html code:
       <Svgcomp
          modalbody={{ text: modalbodytext }}
          modalheader={{ text: modalheadertext }}
          modalfooter={modalfooter}
          isModalOpen={this.state.isModalOpen}
        />
 
  */

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal = () => {
    document.getElementById("modalcomp").style.display = "none";
  };

  clkOnNext = () => {
    document.getElementById("modalcomp").style.display = "none";
  };

  clkOnSave = () => {
    document.getElementById("modalcomp").style.display = "none";
  };

  render() {
    let modalfooterbuttonshtml = [];
    for (let i = 0; i < this.props.modalfooter.buttons.length; i++) {
      modalfooterbuttonshtml.push(
        <button
          data-name={this.props.modalfooter.buttons[i].name}
          onClick={this.props.modalfooter.buttons[i].onClick}
        >
          {this.props.modalfooter.buttons[i].label}
        </button>
      );
    }

    let modalclass;
    if (this.props.isModalOpen == "true") {
      modalclass = "org-show";
    } else {
      modalclass = "org-hide";
    }

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
        className={modalclass}
        id="modalcomp"
      >
        <div
          style={{
            width: this.props.width === "" ? "80%" : this.props.width,
            height: "80%",

            border: "2px solid black",

            margin: "auto",
            marginTop: "3vh",
            backgroundColor: "white",
            color: "black",
            overflow: "auto",
          }}
        >
          {/* header */}
          <div
            style={{
              backgroundColor: "#EEEEEE",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10%",
            }}
          >
            <div style={{ verticalAlign: "center" }}>
              {this.props.modalheader.text}
            </div>
          </div>

          {/* body */}
          <div
            style={{
              backgroundColor: "",
              overflow: "auto",
              height: "80%",
              padding: "0.5vh 2vw",
            }}
          >
            <div>{this.props.modalbody.text}</div>
          </div>

          {/* footer */}
          <div
            style={{
              backgroundColor: "#EEEEEE",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "10%",
              padding: "0vh 1vw",
            }}
          >
            <div>{modalfooterbuttonshtml}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default F;
