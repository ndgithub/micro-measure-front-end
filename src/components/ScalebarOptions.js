import React from "react";


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
    console.log('scaleptslength', this.props.scalePtsLength);
    let boldStyle = {
      fontWeight: 'bold'
    }

    let lightStyle = {
      color: '#999999',
    }

    let activeInputStyle = {

      border: '2px solid #000000',
      color: '#000000',

    }

    let inactiveInputStyle = {

      border: '1px solid #cccccc',
      color: '#cccccc'
    }

    console.log(this.props.isScalebarChecked + ' / ' + !this.props.isScalebarSet)
    return (<div id="scalebar-options-container">
      <div id="useScalebar-checkbox-container">
        <input type="checkbox"
          name="Use-Scalebar"
          value="Use-Scalebar"
          id="use-scalebar-input"
          onChange={(event) => this.props.onCheckUseScalebar(event)}
          checked={this.props.isScalebarChecked}
        />
        <label>Use Scalebar</label>
        {this.props.isScalebarChecked &&
          (<div id="reset-scalebar-container">
            <button id="reset-scalebar" onClick={this.props.onClickResetScalebar}>Reset</button>
          </div>)}
      </div>
      {this.props.isScalebarChecked && !this.props.isScalebarSet &&
        <div id="input-fields">
          <p style={(this.props.scalePtsLength === 0) ? boldStyle : lightStyle}>
            Click 1st End Point</p>
          <p style={(this.props.scalePtsLength === 1) ? boldStyle : lightStyle} >
            Click 2nd End Point</p>

          <div id="scalebar-options-text-inputs-container">
            <input type='text'
              placeholder="Length"
              id="input-enter-length"
              value={this.props.inputLengthValue}
              onChange={(e) => this.props.onInputLengthChange(e)}
              disabled={this.props.scalePtsLength < 2}
              style={(this.props.scalePtsLength >= 2) ? activeInputStyle : inactiveInputStyle}>

            </input>

            <input type='text'
              placeholder="Units"
              id="input-enter-units"
              value={this.props.inputUnitsValue}
              onChange={(e) => this.props.onInputUnitsChange(e)}
              disabled={this.props.scalePtsLength < 2}
              style={(this.props.scalePtsLength >= 2) ? activeInputStyle : inactiveInputStyle}>

            </input>
          </div>
          <button id="set-scalebar-button" className="btn btn-primary" onClick={this.props.onClickDoneSetting}>Done</button>

        </div>}
    </div>)
  }

}

export default ScalebarOptions;
