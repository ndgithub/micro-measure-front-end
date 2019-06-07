import React from "react";
import SectionHeader from './SectionHeader';
import ScalebarSetting from './ScalebarSetting';
import { Switch } from 'antd';


class ScalebarOptions extends React.Component {

  //Props
  // numPtsClicked={this.props.numPtsClicked />
  //  onCheckUseScalebar={this.props.onCheckUseScalebar}
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  componentDidMount() {
  }

  componentDidUpdate() {

  }


  onClickDone = () => {

  }
  render() {
    return (<>
      <SectionHeader title="SCALEBAR">

        <div className="switch-container">
          {this.props.isScalebarChecked &&
            (<div id="reset-scalebar-container">
              <button id="reset-scalebar" onClick={this.props.onClickResetScalebar}>Reset</button>
            </div>)}<Switch checked={this.props.isScalebarChecked} onClick={(checked) => this.props.onCheckUseScalebar(checked)} size='small' />
        </div>
      </SectionHeader>

      {this.props.isScalebarChecked && !this.props.isScalebarSet &&
        <ScalebarSetting
          scalePtsLength={this.props.scalePtsLength}
          inputLengthValue={this.props.inputLengthValue}
          onClickDoneSetting={this.props.onClickDoneSetting}
          onInputLengthChange={this.props.onInputLengthChange}
          onInputUnitsChange={this.props.onInputUnitsChange}
        />
      }

    </>)
  }

}

export default ScalebarOptions;
