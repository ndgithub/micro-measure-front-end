import React from "react";
import Snapshots from './Snapshots';
import ScalebarOptions from './ScalebarOptions';

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
        <div id="logo-container"></div>

        <input type="file" id="file-upload" onChange={(event) => this.props.handleFileUpload(event)} />
        <button id="set-scalebar-button" className="btn btn-primary" onClick={this.props.onClickScalebarBtn}>Set Scalebar</button>
        {this.props.imageLoaded &&
          <ScalebarOptions
            numPtsClicked={this.props.numPtsClicked}
            onCheckUseScalebar={this.props.onCheckUseScalebar}
            isScalebarChecked={this.props.isScalebarChecked}
            isScalebarSet={this.props.isScalebarSet}
            scalePtsLength={this.props.scalePtsLength} />}
        <button id="save-snapshot" onClick={this.props.onSaveSnapClicked}>Save Snapshot</button>
        <Snapshots snapUrls={this.props.snapUrls} />
      </div>
    );
  }

}

export default Sidebar;
