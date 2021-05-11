import React, { Component } from "react";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false };
  }

  insertNumberList = () => {
    var divelement = document.getElementById(this.props.htmlid);
    var numberlistul = document.createElement("ol");
    var numberlistli = document.createElement("li");
    numberlistul.appendChild(numberlistli);
    divelement.appendChild(numberlistul);
  };
  insertBulletList = () => {
    var divelement = document.getElementById(this.props.htmlid);
    var numberlistul = document.createElement("ul");
    var numberlistli = document.createElement("li");
    numberlistul.appendChild(numberlistli);
    divelement.appendChild(numberlistul);
  };
  insertTable = () => {
    var divelement = document.getElementById(this.props.htmlid);

    var table = document.createElement("table");
    for (let i = 0; i < this.state.nooftablerows; i++) {
      //  var row = table.insertRow(i);
      for (let j = 0; j < this.state.nooftablecolumnns; j++) {
        // var cell1 = row.insertCell(j);
      }
    }
    var att = document.createAttribute("class"); // Create a "class" attribute
    att.value = "org-mailnewaction-table"; // Set the value of the class attribute
    table.setAttributeNode(att);

    divelement.appendChild(table);
  };

  editNote = () => {
    // this.setState({ isEdit: true });
    this.props.editNote();
  };

  cancelEditNote = () => {
    //  this.setState({ isEdit: false });
    this.props.cancelEditNote();
  };

  saveNote = () => {
    // this.setState({ isEdit: false });
    this.props.saveNotes();
  };

  deleteNote = () => {
    // this.setState({ isEdit: false });
    this.props.deleteNote();
  };

  render() {
    let {
      //   createNote,
      //  iscreateactive,
      iseditactive,
      isdeleteactive,
      // isEdit,
      action,
    } = this.props;
    //let { isEdit } = this.state;

    return (
      <>
        {action === "create" || action === "edit" ? (
          <div>
            <button
              class="tool-items fa fa-undo"
              onClick={() => {
                document.execCommand("undo", false, "");
              }}
            ></button>
            <button
              class="tool-items fa fa-repeat"
              onClick={() => {
                document.execCommand("redo", false, "");
              }}
            ></button>
            <button
              class="tool-items fa fa-underline"
              onClick={() => {
                document.execCommand("underline", false, "");
              }}
            ></button>
            <button
              class="tool-items fa fa-bold"
              onClick={() => {
                document.execCommand("bold", false, "");
              }}
            ></button>
            <button className="dropdown tool-items fa fa-font">
              <div
                className="dropdown-content"
                style={{ backgroundColor: "white" }}
              >
                <div
                  onClick={() => {
                    document.execCommand("fontSize", false, "7");
                  }}
                >
                  Large
                </div>

                <div
                  onClick={() => {
                    document.execCommand("fontSize", false, "6");
                  }}
                >
                  Medium
                </div>

                <div
                  onClick={() => {
                    document.execCommand("fontSize", false, "5");
                  }}
                >
                  Small
                </div>
              </div>
            </button>
            <button className="dropdown">
              fontcolor
              <div
                className="dropdown-content"
                style={{
                  backgroundColor: "white",
                  height: "80px",
                  overflow: "auto",
                }}
              >
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#C0C0C0");
                  }}
                  style={{
                    backgroundColor: "#C0C0C0",
                  }}
                ></button>

                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#808080");
                  }}
                  style={{ backgroundColor: "#808080" }}
                ></button>

                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#000000");
                  }}
                  style={{ backgroundColor: "#000000" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#FF0000");
                  }}
                  style={{ backgroundColor: "#FF0000" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#800000");
                  }}
                  style={{ backgroundColor: "#800000" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#FFFF00");
                  }}
                  style={{ backgroundColor: "#FFFF00" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#808000");
                  }}
                  style={{ backgroundColor: "#808000" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#00FF00");
                  }}
                  style={{ backgroundColor: "#00FF00" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#008000");
                  }}
                  style={{ backgroundColor: "#008000" }}
                ></button>

                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#00FFFF");
                  }}
                  style={{ backgroundColor: "#00FFFF" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#008080");
                  }}
                  style={{ backgroundColor: "#008080" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#0000FF");
                  }}
                  style={{ backgroundColor: "#0000FF" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#000080");
                  }}
                  style={{ backgroundColor: "#000080" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#FF00FF");
                  }}
                  style={{ backgroundColor: "#FF00FF" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("foreColor", false, "#800080");
                  }}
                  style={{ backgroundColor: "#800080" }}
                ></button>
              </div>
            </button>
            <button className="dropdown">
              backgroundcolor
              <div
                className="dropdown-content"
                style={{
                  backgroundColor: "white",
                  height: "80px",
                  overflow: "auto",
                }}
              >
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#C0C0C0");
                  }}
                  style={{
                    backgroundColor: "#C0C0C0",
                  }}
                ></button>

                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#808080");
                  }}
                  style={{ backgroundColor: "#808080" }}
                ></button>

                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#000000");
                  }}
                  style={{ backgroundColor: "#000000" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#FF0000");
                  }}
                  style={{ backgroundColor: "#FF0000" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#800000");
                  }}
                  style={{ backgroundColor: "#800000" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#FFFF00");
                  }}
                  style={{ backgroundColor: "#FFFF00" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#808000");
                  }}
                  style={{ backgroundColor: "#808000" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#00FF00");
                  }}
                  style={{ backgroundColor: "#00FF00" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#008000");
                  }}
                  style={{ backgroundColor: "#008000" }}
                ></button>

                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#00FFFF");
                  }}
                  style={{ backgroundColor: "#00FFFF" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#008080");
                  }}
                  style={{ backgroundColor: "#008080" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#0000FF");
                  }}
                  style={{ backgroundColor: "#0000FF" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#000080");
                  }}
                  style={{ backgroundColor: "#000080" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#FF00FF");
                  }}
                  style={{ backgroundColor: "#FF00FF" }}
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("backColor", false, "#800080");
                  }}
                  style={{ backgroundColor: "#800080" }}
                ></button>
              </div>
            </button>

            <button className="dropdown tool-items fa fa-align-left">
              <div
                className="dropdown-content"
                style={{
                  backgroundColor: "white",
                }}
              >
                <button
                  onClick={() => {
                    document.execCommand("justifyLeft", false, "");
                  }}
                  class="tool-items fa fa-align-left"
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("justifyCenter", false, "");
                  }}
                  class="tool-items fa fa-align-justify"
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("justifyRight", false, "");
                  }}
                  class="tool-items fa fa-align-right"
                ></button>
              </div>
            </button>

            <button class=" dropdown tool-items fa fa-table">
              <div
                className="dropdown-content"
                style={{
                  backgroundColor: "white",
                }}
              >
                <table>
                  <tr>
                    <th>Rows</th>
                    <th>Columns</th>
                  </tr>
                  <tr>
                    <td>
                      <input
                        name="nooftablerows"
                        onChange={(e) => {
                          this.setState({ nooftablerows: e.target.value });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        name="nooftablecolumnns"
                        onChange={(e) => {
                          this.setState({ nooftablecolumnns: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                </table>
                <button onClick={this.insertTable}>Insert</button>
                <button
                  onClick={() => {
                    document.execCommand("justifyCenter", false, "");
                  }}
                  class="tool-items fa fa-align-justify"
                ></button>
                <button
                  onClick={() => {
                    document.execCommand("justifyRight", false, "");
                  }}
                  class="tool-items fa fa-align-right"
                ></button>
              </div>
            </button>
            <button
              onClick={this.insertNumberList}
              class="tool-items fa fa-list-ol"
            ></button>
            <button
              onClick={this.insertBulletList}
              class="tool-items fa fa-list-ul"
            ></button>

            <button
              onClick={() => {
                document.execCommand("removeFormat", false, "");
              }}
            >
              reset
            </button>
            <button
              onClick={() => {
                this.props.insertPaint();
              }}
            >
              Paint
            </button>
            <button
              onClick={() => {
                this.cancelEditNote();
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                this.saveNote();
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            {iseditactive === "true" ? (
              <button
                onClick={() => {
                  this.editNote();
                }}
              >
                Edit
              </button>
            ) : (
              <></>
            )}
            {isdeleteactive === "true" ? (
              <button
                onClick={() => {
                  this.deleteNote();
                }}
              >
                Delete
              </button>
            ) : (
              <></>
            )}
          </div>
        )}
      </>
    );
  }
}

export default F;
