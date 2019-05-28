import React from "react";

function Sidebar(props) {
  return (
    <div id="sidebar">
      <input type="file" id="file-upload" onChange={(event) => props.handleFileUpload(event)} />
      <button id="set-scalebar-button" className="btn btn-primary" onClick={props.onClickScalebarbBtn}>Set Scalebar</button>
      <div id="scalebar-info"></div>

    </div>
  );
}

export default Sidebar;
