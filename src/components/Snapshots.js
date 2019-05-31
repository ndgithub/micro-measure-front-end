import React from "react";
import Snapshot from './Snapshot';

function Snapshots(props) {
  return (
    <div className="snapshots-list" >
      {props.snapUrls.map((url, i) => <Snapshot key={i} imgSrc={url} index={i}></Snapshot>).reverse()}
    </div >
  )
}

export default Snapshots;