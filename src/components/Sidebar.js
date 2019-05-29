import React from "react";
import Snapshots from './Snapshots';

function Sidebar(props) {
  return (
    <div id="sidebar">

      <input type="file" id="file-upload" onChange={(event) => props.handleFileUpload(event)} />
      <button id="set-scalebar-button" className="btn btn-primary" onClick={props.onClickScalebarbBtn}>Set Scalebar</button>
      <button id="save-snapshot" onClick={props.onSaveSnapClicked}>Save Snapshot</button>
      <Snapshots snapUrls={props.snapUrls} />
    </div>
  );
}

export default Sidebar;
