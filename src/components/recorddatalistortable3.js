import React, { Component } from "react";
import Recorddataeditview from "./recorddataeditview3";
import {
  getRecorddata,
  createRecord,
  bulkcreateRecord,
  deleteRecord,
} from "../db/index";
import {
  sortArray,
  fieldTypeHtmltoDBmapping,
  getLocalData,
  serverButtonHandler,
} from "../js/index";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      activeNoteId: "",
      showNote: false,
      createNote: false,
      editNoteId: "",
      editNoteLabel: "",
    };
  }

  async componentDidMount() {
    await this.getServerData();
  }

  getServerData = async (props) => {
    let localdata = getLocalData(this.props);

    let result = await getRecorddata({
      objectName: "mycourse",
      objectData: {},
      keyConditions: [
        { field: "orgname", value: localdata.orgname, expression: "=" },
        {
          field: "id",
          value: "mc-" + localdata.userid,
          expression: "beginswith",
        },
      ],
      filterConditions: [],
    });

    console.log(result);
    if (result.isSuccess === "false") {
      alert("url not found");
    } else {
      console.log(result.dataprops.Items);

      if (
        result.dataprops &&
        result.dataprops.Items &&
        result.dataprops.Items.length > 0
      ) {
        this.setState({ notes: result.dataprops.Items }, () => {
          this.setState({
            showNote: true,
            activeNoteId: result.dataprops.Items[0].id,
            createNote: false,
          });
        });
      }
    }
  };

  noteHeadingClk = (noteid) => {
    this.setState({ showNote: false }, () => {
      this.setState({
        showNote: true,
        activeNoteId: noteid,
        createNote: false,
      });
    });
  };
  addNote = () => {
    let { notes } = this.state;
    notes.push({});
    this.setState({ showNote: false }, () => {
      this.setState({ showNote: true, activeNoteId: "", createNote: true });
    });
  };

  refreshNote = async (props) => {
    let { noteid } = props;
    await this.getServerData();
    this.setState({ showNote: false }, () => {
      this.setState({
        showNote: true,
        activeNoteId: noteid,
        createNote: false,
      });
    });
  };

  render() {
    let { notes, activeNoteId, editNoteId, showNote, createNote } = this.state;
    console.log(notes);
    let mainpanelHtml = [];
    let notepageHtml = [];
    let notesHtml = [];
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === activeNoteId) {
        notesHtml.push(
          <div
            onClick={() => {
              this.noteHeadingClk(notes[i].id);
            }}
            className="org-greybg"
          >
            {notes[i].label}
          </div>
        );
      } else {
        notesHtml.push(
          <div
            onClick={() => {
              this.noteHeadingClk(notes[i].id);
            }}
          >
            {notes[i].label}
          </div>
        );
      }
    }
    // if (notes.length > 0 && activeNoteId === "") {
    //   activeNoteId = notes[0].id;
    // }

    notepageHtml.push(
      <div className="org-fr">
        <div className="org-flexbasis-100p org-mflexbasis-10p org-lflexbasis-10p">
          {notesHtml}

          <div onClick={this.addNote}>+</div>
        </div>
        <div className="org-flexbasis-100p org-mflexbasis-90p org-lflexbasis-90p">
          {showNote === false ? (
            ""
          ) : (
            <Recorddataeditview
              {...this.props}
              noteid={activeNoteId}
              createNote={createNote}
              refreshNote={this.refreshNote}
            />
          )}
        </div>
      </div>
    );
    mainpanelHtml.push(notepageHtml);

    return <>{mainpanelHtml}</>;
  }
}

export default F;
