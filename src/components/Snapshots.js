import React from "react";
import Snapshot from './Snapshot';

function Snapshots(props) {
  return (
    <div className="snapshots-list" >
      {props.snapUrls.map(url => <Snapshot imgSrc={url}></Snapshot>)}
    </div >
  )
}

export default Snapshots;