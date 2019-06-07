import React from 'react';
import { Button, Icon } from 'antd';
import ImageScaleSetForm from './ImageScaleSetForm';
import SectionHeader from './SectionHeader';



const SetImageScale = (props) => {

  return (<>

    {/* <SectionHeader title="SET IMAGE SCALE"></SectionHeader> */}
    <div className="image-buttons">
      <Button className="new-image-button">New Image</Button><Button type="primary" className="set-scale-button" onClick={props.onClickSetImageScale}><Icon type="column-width" />Set Image Scale</Button>
    </div>
    {props.isScaleSetInProg &&
      <ImageScaleSetForm
        scalePtsLength={props.scalePtsLength}
        inputLengthValue={props.inputLengthValue}
        inputUnitsValue={props.inputUnitsValue}
        onClickDoneSetting={props.onClickDoneSetting}
        onInputLengthChange={props.onInputLengthChange}
        onInputUnitsChange={props.onInputUnitsChange}
      />}
  </>)

}

export default SetImageScale;
