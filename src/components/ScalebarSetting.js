import React from 'react';

const ScalebarSetting = (props) => {
  console.log('scaleptslength', props.scalePtsLength);
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
  return (<div id="scalebar-options-container">
    <div id="input-fields">
      <p style={(props.scalePtsLength === 0) ? boldStyle : lightStyle}>
        Click 1st End Point</p>
      <p style={(props.scalePtsLength === 1) ? boldStyle : lightStyle} >
        Click 2nd End Point</p>

      <div id="scalebar-options-text-inputs-container">
        <input type='text'
          placeholder="Length"
          id="input-enter-length"
          value={props.inputLengthValue}
          onChange={(e) => props.onInputLengthChange(e)}
          disabled={props.scalePtsLength < 2}
          style={(props.scalePtsLength >= 2) ? activeInputStyle : inactiveInputStyle}>

        </input>

        <input type='text'
          placeholder="Units"
          id="input-enter-units"
          value={props.inputUnitsValue}
          onChange={(e) => props.onInputUnitsChange(e)}
          disabled={props.scalePtsLength < 2}
          style={(props.scalePtsLength >= 2) ? activeInputStyle : inactiveInputStyle}>

        </input>
      </div>
      <button id="set-scalebar-button" className="btn btn-outline-primary" onClick={props.onClickDoneSetting}>Done</button>
    </div>
  </div>)
}

export default ScalebarSetting;