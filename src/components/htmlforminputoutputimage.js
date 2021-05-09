import React, { Component } from "react";
import {
  getImageRecordsStorage,
  createImageRecordStorage,
  getImageRecordStorage,
} from "../imagestorage/index";
import Svgcomp from "./modal";

export default class F extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFromLocal: false,
      showFromLibrary: false,
      libraryOptions: [],
      showFromCamera: false,
      showpreviewImagePanel: false,
      showEditImagePanel: "false",
      showEditImagePanelModal: false,
    };
  }

  componentDidMount() {
    this.getImageDataViewPanel();
  }

  uploadPriviewImage = async () => {
    let result = await createImageRecordStorage({
      folderUrl: this.props.folderUrl,
      fileName: this.props.fileName,
      filehtmlId: this.props.previewImageHtmlId,
      fileEvent: "",
      callback: (result) => {
        console.log(result);
        if (result.isSuccess == "true") {
          // this.getHtmlInputImage({ imghtmlid: "photo1" });
        } else {
        }
      },
    });
  };

  inputimageradiochange = async (e) => {
    if (e.target.value == "fromlocal") {
      this.stopStreamedVideo();
      this.setState({
        showFromLocal: true,
        showFromLibrary: false,
        showFromCamera: false,
        showpreviewImagePanel: true,
      });
    }
    if (e.target.value == "fromlibrary") {
      this.stopStreamedVideo();
      this.setState({
        showFromLocal: false,
        showFromLibrary: true,
        showFromCamera: false,
        showpreviewImagePanel: true,
      });
      this.getLibrayData();
    }
    if (e.target.value == "fromcamera") {
      //  this.stopStreamedVideo();
      this.setState(
        {
          showFromLocal: false,
          showFromLibrary: false,
          showFromCamera: true,
          showpreviewImagePanel: true,
        },
        () => {
          navigator.mediaDevices
            .getUserMedia({
              video: { width: { exact: 640 }, height: { exact: 480 } },
            })
            .then((stream) => {
              let videoHtml = document.getElementById(
                this.props.previewVideoHtmlId
              );
              console.log(stream);
              videoHtml.srcObject = stream;
            })
            .catch((err) => {
              console.error("Error: ", err);
            });
        }
      );
    }
  };

  getLibrayData = async () => {
    await getImageRecordsStorage({
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
              fileName.toLowerCase().includes("jpg") ||
              fileName.toLowerCase().includes("png") ||
              fileName.toLowerCase().includes("jpeg")
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
    let videoElem = document.getElementById(this.props.previewVideoHtmlId);
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

  inputimageselect = async (e) => {
    console.log(e.target.dataset);

    console.log(e.target.files);

    let ds = e.target.dataset;
    //   await this.setState({ showpreviewImagePanel: true });
    let previewImageHtml = document.getElementById(
      this.props.previewImageHtmlId
    );
    let videoHtml = document.getElementById(this.props.previewVideoHtmlId);

    console.log(this.props.previewImageHtmlId);
    console.log(previewImageHtml);

    if (ds.type == "fromlocal") {
      console.log(e.target.files);
      let file = e.target.files[0];
      previewImageHtml.file = file;
      const reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
        };
      })(previewImageHtml);
      reader.readAsDataURL(file);
    }
    if (ds.type == "fromlibrary") {
      console.log(e.target.value);
      if (e.target.value != "") {
        this.getImageData(e.target.value);
      }
    }
    if (ds.type == "fromcamera") {
      let width = 640;
      let height = 480;
      console.log(width);
      console.log(height);
      var htmlinputimagecanvas = document.createElement("canvas");
      htmlinputimagecanvas.width = width;
      htmlinputimagecanvas.height = height;

      var context = htmlinputimagecanvas.getContext("2d");
      context.drawImage(videoHtml, 0, 0, width, height);
      var data = htmlinputimagecanvas.toDataURL("image/png");
      previewImageHtml.setAttribute("src", data);
    }
  };
  getImageData = async (fileName) => {
    let previewImageHtml = document.getElementById(
      this.props.previewImageHtmlId
    );
    getImageRecordStorage({
      folderUrl: this.props.folderUrl,
      fileName: fileName,
      pdfpageNumber: 1,
      htmlId: "theCanvas",
      fileEvent: "",
      callback: (result) => {
        console.log(result);
        if (result.isSuccess == "true") {
          console.log(result.dataprops.imgsrc);
          previewImageHtml.src = result.dataprops.imgsrc;
        } else {
        }
      },
    });
  };
  getImageDataViewPanel = async () => {
    let imageHtml = document.getElementById(this.props.imageHtmlId);
    if (this.props.isInputnotOuptut == "false") {
      getImageRecordStorage({
        folderUrl: this.props.folderUrl,
        fileName: this.props.fileName,
        pdfpageNumber: 1,
        htmlId: "theCanvas",
        fileEvent: "",
        callback: (result) => {
          console.log(result);
          if (result.isSuccess == "true") {
            console.log(result.dataprops.imgsrc);
            imageHtml.src = result.dataprops.imgsrc;
          } else {
          }
        },
      });
    }
  };

  editPriviewImage = (e) => {
    let previewImageHtml = document.getElementById(
      this.props.previewImageHtmlId
    );

    console.log(previewImageHtml.style.transform);
    console.log(previewImageHtml.src);

    // if (previewImageHtml.style.transform == "rotate(90deg)") {
    //   previewImageHtml.style.transform = "rotate(180deg)";
    // } else if (previewImageHtml.style.transform == "rotate(180deg)") {
    //   previewImageHtml.style.transform = "rotate(270deg)";
    // } else if (previewImageHtml.style.transform == "rotate(270deg)") {
    //   previewImageHtml.style.transform = "rotate(360deg)";
    // } else {
    //   previewImageHtml.style.transform = "rotate(90deg)";
    // }

    previewImageHtml.src = this.rotateBase64Image90deg(
      previewImageHtml.src,
      true
    );
    console.log(previewImageHtml.src);
  };
  rotateBase64Image90deg = (base64Image, isClockwise) => {
    // create an off-screen canvas
    var offScreenCanvas = document.createElement("canvas");
    let offScreenCanvasCtx = offScreenCanvas.getContext("2d");

    // cteate Image
    var img = new Image();
    img.src = base64Image;
    img.setAttribute("crossorigin", "anonymous");

    // set its dimension to rotated size
    offScreenCanvas.height = img.width;
    offScreenCanvas.width = img.height;

    // rotate and draw source image into the off-screen canvas:
    if (isClockwise) {
      offScreenCanvasCtx.rotate((90 * Math.PI) / 180);
      offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
    } else {
      offScreenCanvasCtx.rotate((-90 * Math.PI) / 180);
      offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
    }
    offScreenCanvasCtx.drawImage(img, 0, 0);

    // encode image to data-uri with base64
    return offScreenCanvas.toDataURL("image/jpeg", 100);
  };

  showEditImagePanelModal = () => {
    this.setState({ showEditImagePanelModal: true });
  };
  hideEditImagePanelModal = () => {
    this.stopStreamedVideo();
    this.setState({ showEditImagePanelModal: false });
  };

  render() {
    let {
      showFromLocal,
      showFromLibrary,
      showFromCamera,
      libraryOptions,
      showpreviewImagePanel,
      showEditImagePanel,
      showEditImagePanelModal,
    } = this.state;
    let {
      radiogroupname,
      isInputnotOuptut,
      previewImageHtmlId,
      imageHtmlId,
      previewVideoHtmlId,
    } = this.props;
    console.log(this.props);
    if (showEditImagePanel == "true") {
      isInputnotOuptut = "true";
    }

    let modalheadertext = "Select a value";
    let modalbodytext = [];

    modalbodytext.push(
      <>
        <div className="org-fr org-fai-s  ">
          <div className=" org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p  ">
            <div className="org-fr org-fai-c ">
              <input
                type="radio"
                name={radiogroupname}
                value="fromlocal"
                onChange={this.inputimageradiochange}
              />
              Upload file
            </div>
            <div className="org-fr org-fai-c">
              <input
                type="radio"
                name={radiogroupname}
                value="fromlibrary"
                onChange={this.inputimageradiochange}
              />
              Add from Library
            </div>

            <div className="org-fr org-fai-c">
              <input
                type="radio"
                name={radiogroupname}
                value="fromcamera"
                onChange={this.inputimageradiochange}
              />
              Camera
            </div>
          </div>
          <div className=" org-flexbasis-100p org-mflexbasis-40p org-lflexbasis-40p  ">
            {/* file upload */}
            {showFromLocal == true ? (
              <div>
                <input
                  data-type="fromlocal"
                  type="file"
                  onChange={this.inputimageselect}
                  accept="image/*"
                />
              </div>
            ) : (
              ""
            )}

            {showFromLibrary == true ? (
              <div>
                <select
                  data-type="fromlibrary"
                  onChange={this.inputimageselect}
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
                <div data-type="fromcamera" onClick={this.inputimageselect}>
                  take pic
                </div>
                <video autoPlay id={previewVideoHtmlId} width="100%"></video>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" org-flexbasis-100p org-mflexbasis-40p org-lflexbasis-40p  ">
            {showpreviewImagePanel == true ? (
              <div className="org-fr org-fai-s" style={{ width: "100%" }}>
                <div className="org-fr ">
                  <div onClick={this.editPriviewImage}>Rotate</div>
                  <div onClick={this.editPriviewImage}>Filter</div>
                  <div onClick={this.uploadPriviewImage}>Upload</div>
                </div>
                <img id={previewImageHtmlId} width="100%"></img>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );

    let modalfooter = {};
    let buttons = [
      {
        label: "Close",
        name: "cancel",
        onClick: this.hideEditImagePanelModal,
      },
    ];
    modalfooter.buttons = buttons;

    return (
      <>
        {showEditImagePanelModal == true ? (
          <>
            <Svgcomp
              modalbody={{ text: modalbodytext }}
              modalheader={{ text: modalheadertext }}
              modalfooter={modalfooter}
              isModalOpen="true"
            />
          </>
        ) : (
          ""
        )}
        {isInputnotOuptut == "true" ? (
          <div className="org-fr org-fai-s  ">
            <div className=" org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p  ">
              <div className="org-fr org-fai-c ">
                <input
                  type="radio"
                  name={radiogroupname}
                  value="fromlocal"
                  onChange={this.inputimageradiochange}
                />
                Upload file
              </div>
              <div className="org-fr org-fai-c">
                <input
                  type="radio"
                  name={radiogroupname}
                  value="fromlibrary"
                  onChange={this.inputimageradiochange}
                />
                Add from Library
              </div>

              <div className="org-fr org-fai-c">
                <input
                  type="radio"
                  name={radiogroupname}
                  value="fromcamera"
                  onChange={this.inputimageradiochange}
                />
                Camera
              </div>
            </div>
            <div className=" org-flexbasis-100p org-mflexbasis-40p org-lflexbasis-40p  ">
              {/* file upload */}
              {showFromLocal == true ? (
                <div>
                  <input
                    data-type="fromlocal"
                    type="file"
                    onChange={this.inputimageselect}
                    accept="image/*"
                  />
                </div>
              ) : (
                ""
              )}

              {showFromLibrary == true ? (
                <div>
                  <select
                    data-type="fromlibrary"
                    onChange={this.inputimageselect}
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
                  <div data-type="fromcamera" onClick={this.inputimageselect}>
                    take pic
                  </div>
                  <video autoPlay id={previewVideoHtmlId} width="100%"></video>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className=" org-flexbasis-100p org-mflexbasis-40p org-lflexbasis-40p  ">
              {showpreviewImagePanel == true ? (
                <div className="org-fr org-fai-s" style={{ width: "100%" }}>
                  <div className="org-fr ">
                    <div onClick={this.editPriviewImage}>Rotate</div>
                    <div onClick={this.editPriviewImage}>Filter</div>
                    <div onClick={this.uploadPriviewImage}>Upload</div>
                  </div>
                  <img id={previewImageHtmlId} width="100%"></img>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="org-fr org-fai-s  ">
            <div className=" org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p  ">
              <div className="org-fr org-fai-s" style={{ width: "100%" }}>
                <div className="org-fr ">
                  <div onClick={this.showEditImagePanelModal}>Edit</div>
                </div>
                <img id={imageHtmlId} width="100%"></img>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
