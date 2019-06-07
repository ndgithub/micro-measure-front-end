import React from "react";
import Snapshot from './Snapshot';
import SectionHeader from './SectionHeader';
import { Button } from 'antd';

function Snapshots(props) {
  return (<>
    <SectionHeader >

    </SectionHeader>
    <Button id="save-snapshot" onClick={props.onSaveSnapClicked}><i className="fas fa-camera"></i> &nbsp;&nbsp; Take Snapshot</Button>

    <div className="snapshots-list" >
      {props.snapUrls.map((url, i) => <Snapshot key={i} imgSrc={url} index={i}></Snapshot>).reverse()}
    </div >
  </>)
}

export default Snapshots;