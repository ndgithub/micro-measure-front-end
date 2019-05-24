import React from "react";

function Sidebar(props) {
  return (
    <div id="sidebar">
      <button id="set-scalebar-button" className="btn btn-primary">Set Scalebar</button>
      <div id="scalebar-info"></div>
      <input type="file" id="file-upload" onChange={(event) => props.handleFileUpload(event)} />
      {/* <button id="save-snapshot-button" className="btn btn-secondary">save snapshot</button> */}
    </div>
  );
}

export default Sidebar;
