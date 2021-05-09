import React from "react";
import ImgSearch from "../images/bgsearch.png";

// registrations iwth fontawesome free version required
export let GetFontAwesomeIcon = (props) => {
  return (
    <>
      {props.name === "accessible" ? (
        <i class="fab fa-accessible-icon esp" {...props}></i>
      ) : (
        ""
      )}
      {props.name === "addressbook" ? (
        <i class="fas fa-address-book esp" {...props}></i>
      ) : (
        ""
      )}
      {props.name === "facebook" ? (
        <i class="fa fa-facebook-f" {...props}></i>
      ) : (
        ""
      )}

      {props.name === "spinner" ? <i class="fa fa-spinner"></i> : ""}
      {props.name === "close" ? <i class="fa fa-close"></i> : ""}

      {props.name === "google" ? <i class="fa fa-google" {...props}></i> : ""}
      {props.name === "amazon" ? <i class="fa fa-amazon" {...props}></i> : ""}
    </>
  );
};

export let GetGoogleIcon = (props) => {
  return (
    <>
      {props.style ? (
        <i
          class="material-icons esp md-inactive md-dark"
          style={props.style}
          {...props}
        >
          {props.name}
        </i>
      ) : (
        <i class="material-icons esp md-inactive md-dark" {...props}>
          {props.name}
        </i>
      )}
    </>
  );
};

export let GetBoostrapIcon = (props) => {
  return (
    <>
      {props.name === "cloud" ? (
        <i class="glyphicon glyphicon-cloud esp" {...props}></i>
      ) : (
        ""
      )}
    </>
  );
};

export let GetLocalIcon = (props) => {
  return (
    <>
      {props.name === "left" ? (
        <div
          className="org-localicon org-localmenuiconwhite org-cursor esp org-inlineblock"
          {...props}
        >
          &#60;
        </div>
      ) : (
        ""
      )}
      {props.name === "doubleleft" ? (
        <div
          className="org-localicon org-localmenuiconwhite org-cursor esp org-inlineblock"
          {...props}
        >
          &laquo;
        </div>
      ) : (
        ""
      )}
      {props.name === "right" ? (
        <div
          className="org-localicon org-localmenuiconwhite org-cursor esp org-inlineblock"
          {...props}
        >
          &#62;
        </div>
      ) : (
        ""
      )}
      {props.name === "doubleright" ? (
        <div
          className="org-localicon org-localmenuiconwhite org-cursor esp org-inlineblock"
          {...props}
        >
          &raquo;
        </div>
      ) : (
        ""
      )}
      {props.name === "search" ? (
        <div
          className="org-localicon org-localmenuiconwhite org-cursor esp"
          {...props}
        >
          <img alt="" src={ImgSearch} height="20px" width="20px" />
        </div>
      ) : (
        ""
      )}

      {props.name === "menu" ? (
        <div
          className="org-localicon org-localmenuiconwhite org-cursor esp"
          {...props}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ""
      )}

      {props.name === "plus" ? (
        <div
          className="org-localicon  org-cursor esp"
          style={{ display: "inline-block" }}
          {...props}
        >
          +
        </div>
      ) : (
        ""
      )}

      {props.name === "minus" ? (
        <div
          className="org-localicon  org-cursor esp"
          style={{ display: "inline-block" }}
          {...props}
        >
          -
        </div>
      ) : (
        ""
      )}

      {props.name === "close" ? (
        <div
          className="org-localicon  org-cursor esp"
          style={{ display: "inline-block" }}
          {...props}
        >
          &times;
        </div>
      ) : (
        ""
      )}

      {props.name === "down_blackbg" ? (
        <div
          className="org-localicon  org-cursor esp"
          style={{ display: "inline-block" }}
          {...props}
        >
          &#9660;
        </div>
      ) : (
        ""
      )}
      {props.name === "down_whitebg" ? (
        <div
          className="org-localicon  org-cursor esp"
          style={{ display: "inline-block" }}
          {...props}
        >
          &#9661;
        </div>
      ) : (
        ""
      )}
    </>
  );
};
