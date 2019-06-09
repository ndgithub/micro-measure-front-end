import React from 'react';
import { Button, Icon, Divider } from 'antd';
import ImageScaleSetForm from './ImageScaleSetForm';

class SetImageScale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.inputRef = React.createRef();
  }

  render() {
    return (<>

      {/* <SectionHeader title="SET IMAGE SCALE"></SectionHeader> */}
      <div className="image-buttons">
        <Button className="new-image-button" onClick={() => this.inputRef.current.click()}><Icon className="upload-icon" type="upload" />New Image</Button>
        <Button type="primary" className="set-scale-button" onClick={this.props.onClickSetImageScale}><Icon type="column-width" className="scale-icon" />Set Scale</Button>
        <input ref={this.inputRef} type="file" id="file-upload" onChange={(event) => this.props.handleFileUpload(event)} />

      </div>
      <Divider />
      {this.props.isScaleSetInProg &&
        <ImageScaleSetForm
          scalePtsLength={this.props.scalePtsLength}
          inputLengthValue={this.props.inputLengthValue}
          inputUnitsValue={this.props.inputUnitsValue}
          onClickDoneSetting={this.props.onClickDoneSetting}
          onClickCancelSetting={this.props.onClickCancelSetting}
          onInputLengthChange={this.props.onInputLengthChange}
          onInputUnitsChange={this.props.onInputUnitsChange}
        />}
    </>)
  }
}




export default SetImageScale;
