import React from "react";
import Snapshot from './Snapshot';
import SectionHeader from './SectionHeader';

function Snapshots(props) {
  return (<>
    <SectionHeader title="Captured" >
      <div>+</div>
    </SectionHeader>
    <button id="save-snapshot" className="btn btn-primary" onClick={props.onSaveSnapClicked}><i className="fas fa-camera"></i> &nbsp;&nbsp; Take Snapshot</button>

    <div className="snapshots-list" >
      {props.snapUrls.map((url, i) => <Snapshot key={i} imgSrc={url} index={i}></Snapshot>).reverse()}
    </div >
  </>)
}

export default Snapshots;