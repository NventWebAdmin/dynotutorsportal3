import React, { Component } from "react";
import {
  getVideoRecordsStorage,
  createVideoRecordStorage,
  getVideoRecordStorage,
} from "../videostorage/index";

export default class F extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFromLocal: false,
      showFromLibrary: false,
      libraryOptions: [],
      showFromCamera: false,
      showpreviewVideoPanel: false,
    };
  }

  componentDidMount() {
    getVideoRecordStorage({
      folderUrl: this.props.folderUrl,
      fileName: "test (2).webm",
      pdfpageNumber: 1,
      htmlId: "theCanvas",
      fileEvent: "",
      callback: (result) => {
        console.log(result);
      },
    });
  }

  uploadPriviewVideo = async (e) => {
    let result = await createVideoRecordStorage({
      folderUrl: this.props.folderUrl,
      fileName: this.props.fileName,
      filehtmlId: "",
      fileEvent: e,
      callback: (result) => {
        console.log(result);
        if (result.isSuccess == "true") {
          // this.getHtmlInputVideo({ Videohtmlid: "photo1" });
        } else {
        }
      },
    });
  };

  inputVideoradiochange = async (e) => {
    if (e.target.value == "fromlocal") {
      this.stopStreamedVideo();
      this.setState({
        showFromLocal: true,
        showFromLibrary: false,
        showFromCamera: false,
        showpreviewVideoPanel: true,
      });
    }
    if (e.target.value == "fromlibrary") {
      this.stopStreamedVideo();
      this.setState({
        showFromLocal: false,
        showFromLibrary: true,
        showFromCamera: false,
        showpreviewVideoPanel: true,
      });
      this.getLibrayData();
    }
    if (e.target.value == "fromcamera") {
      this.stopStreamedVideo();
      await this.setState({
        showFromLocal: false,
        showFromLibrary: false,
        showFromCamera: true,
        showpreviewVideoPanel: true,
      });
      navigator.mediaDevices
        .getUserMedia({
          video: { width: { exact: 640 }, height: { exact: 480 } },
        })
        .then((stream) => {
          let videoHtml = document.getElementById(this.props.videoHtmlId);
          console.log(stream);
          videoHtml.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    }
  };

  getLibrayData = async () => {
    await getVideoRecordsStorage({
      folderUrl: this.props.folderUrl,
      fileName: "",
      pdfpageNumber: "",
      htmlId: "",
      fileEvent: "",
      callback: (result) => {
        console.log(result);
        if (result.isSuccess == "true") {
          console.log(result.dataprops.fileNames);
          let libraryOptions = [];
          for (let i in result.dataprops.fileNames) {
            console.log(result.dataprops.fileNames[i]);
            let fileName = result.dataprops.fileNames[i].name;
            if (
              fileName.toLowerCase().includes("webm") ||
              fileName.toLowerCase().includes("flv") ||
              fileName.toLowerCase().includes("mpg") ||
              fileName.toLowerCase().includes("mpeg") ||
              fileName.toLowerCase().includes("3gp") ||
              fileName.toLowerCase().includes("flv") ||
              fileName.toLowerCase().includes("mp4")
            ) {
              libraryOptions.push(result.dataprops.fileNames[i]);
            }
          }
          console.log(libraryOptions);
          this.setState({ libraryOptions: libraryOptions });
        } else {
        }
      },
    });
  };
  stopStreamedVideo = () => {
    let videoElem = document.getElementById(this.props.videoHtmlId);
    console.log(videoElem);
    if (videoElem) {
      const stream = videoElem.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(function (track) {
          track.stop();
        });
        videoElem.srcObject = null;
      }
    }
  };

  inputVideoselect = async (e) => {
    console.log(e.target.dataset);
    this.uploadPriviewVideo(e);
    let ds = e.target.dataset;
    //   await this.setState({ showpreviewVideoPanel: true });
    let previewVideoHtml = document.getElementById(
      this.props.previewVideoHtmlId
    );
    let videoHtml = document.getElementById(this.props.videoHtmlId);

    console.log(this.props.previewVideoHtmlId);
    console.log(previewVideoHtml);

    if (ds.type == "fromlocal") {
      let file = e.target.files[0];
      previewVideoHtml.src = URL.createObjectURL(file);
      //   "http://techslides.com/demos/sample-videos/small.mp4";
      // const reader = new FileReader();
      // reader.onload = (function (aVideo) {
      //   return function (e) {
      //     aVideo.src = e.target.result;
      //   };
      // })(previewVideoHtml);
      // reader.readAsDataURL(file);
    }
    if (ds.type == "fromlibrary") {
      console.log(e.target.value);
      if (e.target.value != "") {
        this.getVideoData(e.target.value);
      }
    }
    if (ds.type == "fromcamera") {
      let width = 640;
      let height = 480;
      console.log(width);
      console.log(height);
      var htmlinputVideocanvas = document.createElement("canvas");
      htmlinputVideocanvas.width = width;
      htmlinputVideocanvas.height = height;

      var context = htmlinputVideocanvas.getContext("2d");
      context.drawImage(videoHtml, 0, 0, width, height);
      var data = htmlinputVideocanvas.toDataURL("image/png");
      previewVideoHtml.setAttribute("src", data);
    }
  };
  getVideoData = async (fileName) => {
    let previewVideoHtml = document.getElementById(
      this.props.previewVideoHtmlId
    );
    getVideoRecordStorage({
      folderUrl: this.props.folderUrl,
      fileName: fileName,
      pdfpageNumber: 1,
      htmlId: "theCanvas",
      fileEvent: "",
      callback: (result) => {
        console.log(result);
        if (result.isSuccess == "true") {
          console.log(result.dataprops.imgsrc);
          previewVideoHtml.src = result.dataprops.imgsrc;
        } else {
        }
      },
    });
  };

  editPriviewVideo = (e) => {
    let previewVideoHtml = document.getElementById(
      this.props.previewVideoHtmlId
    );

    console.log(previewVideoHtml.style.transform);
    console.log(previewVideoHtml.src);

    previewVideoHtml.src = this.rotateBase64Video90deg(
      previewVideoHtml.src,
      true
    );
    console.log(previewVideoHtml.src);
  };
  rotateBase64Video90deg = (base64Video, isClockwise) => {
    // create an off-screen canvas
    var offScreenCanvas = document.createElement("canvas");
    let offScreenCanvasCtx = offScreenCanvas.getContext("2d");

    // cteate Video
    var Video = new Video();
    Video.src = base64Video;
    Video.setAttribute("crossorigin", "anonymous");

    // set its dimension to rotated size
    offScreenCanvas.height = Video.width;
    offScreenCanvas.width = Video.height;

    // rotate and draw source Video into the off-screen canvas:
    if (isClockwise) {
      offScreenCanvasCtx.rotate((90 * Math.PI) / 180);
      offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
    } else {
      offScreenCanvasCtx.rotate((-90 * Math.PI) / 180);
      offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
    }
    offScreenCanvasCtx.drawImage(Video, 0, 0);

    // encode image to data-uri with base64
    return offScreenCanvas.toDataURL("image/jpeg", 100);
  };

  render() {
    let {
      showFromLocal,
      showFromLibrary,
      showFromCamera,
      libraryOptions,
      showpreviewVideoPanel,
    } = this.state;
    let {
      radiogroupname,

      previewVideoHtmlId,
      videoHtmlId,
    } = this.props;
    return (
      <>
        <div className="org-fr org-fai-s  ">
          <div className=" org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p  ">
            <div className="org-fr org-fai-c ">
              <input
                type="radio"
                name={radiogroupname}
                value="fromlocal"
                onChange={this.inputVideoradiochange}
              />
              Upload file
            </div>
            <div className="org-fr org-fai-c">
              <input
                type="radio"
                name={radiogroupname}
                value="fromlibrary"
                onChange={this.inputVideoradiochange}
              />
              Add from Library
            </div>

            <div className="org-fr org-fai-c">
              <input
                type="radio"
                name={radiogroupname}
                value="fromcamera"
                onChange={this.inputVideoradiochange}
              />
              Camera
            </div>
            <div className="org-fr org-fai-c">
              <input
                type="radio"
                name={radiogroupname}
                value="fromyoutube"
                onChange={this.inputVideoradiochange}
              />
              Youtube
            </div>
            <div className="org-fr org-fai-c">
              <input
                type="radio"
                name={radiogroupname}
                value="fromscreenshare"
                onChange={this.inputVideoradiochange}
              />
              Screenshare
            </div>
          </div>
          <div className=" org-flexbasis-100p org-mflexbasis-40p org-lflexbasis-40p  ">
            {/* file upload */}
            {showFromLocal == true ? (
              <div>
                <input
                  data-type="fromlocal"
                  type="file"
                  onChange={this.inputVideoselect}
                  accept="video/*"
                />
              </div>
            ) : (
              ""
            )}

            {showFromLibrary == true ? (
              <div>
                <select
                  data-type="fromlibrary"
                  onChange={this.inputVideoselect}
                >
                  <option value="">select a file</option>
                  {libraryOptions
                    ? libraryOptions.map((libraryOption) => (
                        <option value={libraryOption.name}>
                          {libraryOption.label}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
            ) : (
              ""
            )}

            {showFromCamera == true ? (
              <div>
                <div data-type="fromcamera" onClick={this.inputVideoselect}>
                  take pic
                </div>
                <video autoPlay id={videoHtmlId} width="100%"></video>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" org-flexbasis-100p org-mflexbasis-40p org-lflexbasis-40p  ">
            {showpreviewVideoPanel == true ? (
              <div className="org-fr org-fai-s" style={{ width: "100%" }}>
                <div className="org-fr ">
                  <div onClick={this.editPriviewVideo}>Rotate</div>
                  <div onClick={this.editPriviewVideo}>Filter</div>
                  <div onClick={this.uploadPriviewVideo}>Upload</div>
                </div>

                <video
                  width="100%"
                  id={previewVideoHtmlId}
                  controls
                  autoPlay
                  src="http://techslides.com/demos/sample-videos/small.ogv"
                ></video>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}
