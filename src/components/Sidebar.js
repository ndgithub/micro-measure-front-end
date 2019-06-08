import React from "react";
import Snapshots from './Snapshots';
import ScalebarOptions from './ScalebarOptions';
import MiniView from './MiniView';
import FileInput from './FileInput';
import SetImageScale from './SetImageScale';


class Sidebar extends React.Component {
  constructor(props) {
    //PROPS
    // handleFileUpload={this.handleFileUpload}
    //     onClickScalebarBtn={this.onClickScalebarBtn}
    //     onSaveSnapClicked={this.onSaveSnapClicked}
    //     snapUrls={this.state.snapUrls}
    //     imageLoaded={this.state.imageLoaded}
    //     numPtsClicked={this.scalePts.length}
    //     onCheckUseScalebar={this.onCheckUseScalebar}
    super(props);
    this.state = {

    };

  }

  componentDidMount() {
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div id="sidebar">
        {/* <div id="logo-container"></div> */}
        {this.props.imageLoaded ||
          <FileInput handleFileUpload={this.props.handleFileUpload} useDemoUpload={this.props.useDemoUpload} />
        }

        {this.props.imageLoaded &&
          (<>
            <MiniView
              selectedFile={this.props.selectedFile}
              containerRef={this.props.containerRef}
              size={this.props.size}
              pos={this.props.pos}
              origDims={this.props.origDims} />

            <SetImageScale
              scalePtsLength={this.props.scalePtsLength}
              onInputLengthChange={this.props.onInputLengthChange}
              onInputUnitsChange={this.props.onInputUnitsChange}
              onClickDoneSetting={this.props.onClickDoneSetting}
              inputLengthValue={this.props.inputLengthValue}
              inputUnitsValue={this.props.inputUnitsValue}
              isImageScaleSet={this.props.isImageScaleSet}
              onClickSetImageScale={this.props.onClickSetImageScale}
              isScaleSetInProg={this.props.isScaleSetInProg}
              onClickCancelSetting={this.props.onClickCancelSetting}

            />
            {this.props.isImageScaleSet && <ScalebarOptions
              onCheckUseScalebar={this.props.onCheckUseScalebar}
              isScalebarChecked={this.props.isScalebarChecked}
              isImageScaleSet={this.props.isImageScaleSet}
              inputUnitsValue={this.props.inputUnitsValue}
              onClickResetScalebar={this.props.onClickResetScalebar}
              showScalebarColorOptions={this.props.showScalebarColorOptions}
              onClickScaleTextColor={this.props.onClickScaleTextColor}
              onClickScaleBgColor={this.props.onClickScaleBgColor}

            />
            }
            {!this.props.isScaleSetInProg && <Snapshots onSaveSnapClicked={this.props.onSaveSnapClicked} snapUrls={this.props.snapUrls} />}

          </>
          )}
      </div>
    );
  }

}

export default Sidebar;
