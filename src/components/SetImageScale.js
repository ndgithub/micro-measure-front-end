import React from 'react';
import { Button, Icon, Divider } from 'antd';
import ImageScaleSetForm from './ImageScaleSetForm';



const SetImageScale = (props) => {

  return (<>

    {/* <SectionHeader title="SET IMAGE SCALE"></SectionHeader> */}
    <div className="image-buttons">
      <Button className="new-image-button"><Icon className="upload-icon" type="upload" />New Image</Button>
      <Button className="set-scale-button" onClick={props.onClickSetImageScale}><Icon type="column-width" className="scale-icon" />Set Scale</Button>
    </div>
    <Divider />
    {props.isScaleSetInProg &&
      <ImageScaleSetForm
        scalePtsLength={props.scalePtsLength}
        inputLengthValue={props.inputLengthValue}
        inputUnitsValue={props.inputUnitsValue}
        onClickDoneSetting={props.onClickDoneSetting}
        onClickCancelSetting={props.onClickCancelSetting}
        onInputLengthChange={props.onInputLengthChange}
        onInputUnitsChange={props.onInputUnitsChange}
      />}
  </>)

}

export default SetImageScale;
