import React from "react";
import Snapshots from './Snapshots';
import ScalebarOptions from './ScalebarOptions';
import MiniView from './MiniView';
import FileInput from './FileInput';


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
          <MiniView
            selectedFile={this.props.selectedFile}
            containerRef={this.props.containerRef}
            size={this.props.size}
            pos={this.props.pos}
            origDims={this.props.origDims}

          />}




        {this.props.imageLoaded &&
          <ScalebarOptions
            numPtsClicked={this.props.numPtsClicked}
            onCheckUseScalebar={this.props.onCheckUseScalebar}
            isScalebarChecked={this.props.isScalebarChecked}
            isScalebarSet={this.props.isScalebarSet}
            scalePtsLength={this.props.scalePtsLength}
            onInputLengthChange={this.props.onInputLengthChange}
            onInputUnitsChange={this.props.onInputUnitsChange}
            onClickDoneSetting={this.props.onClickDoneSetting}
            inputLengthValue={this.props.inputLengthValue}
            inputUnitsValue={this.props.inputUnitsValue}
            onClickResetScalebar={this.props.onClickResetScalebar}
          />
        }

        {this.props.imageLoaded &&
          (<>
            <Snapshots onSaveSnapClicked={this.props.onSaveSnapClicked} snapUrls={this.props.snapUrls} />
          </>)}
      </div>
    );
  }

}

export default Sidebar;
