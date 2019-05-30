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

  render() {
    console.log('scaleptslength', this.props.scalePtsLength);
    let boldStyle = {
      fontWeight: 'bold'
    }

    let regularStyle = {
      fontWeight: 'normal'
    }

    return (<>
      <input type="checkbox"
        name="Use-Scalebar"
        value="Use Scalebar"
        id="use-scalebar-input"
        onChange={(event) => this.props.onCheckUseScalebar(event)}
      /><label for="Use-Scalebar">Use Scalebar</label>

      {this.props.isScalebarChecked && !this.props.isScalebarSet &&
        <>
          <p style={(this.props.scalePtsLength === 0) ? boldStyle : {}}>Click 1st End Point of Scale Bar</p>
          <p style={(this.props.scalePtsLength === 1) ? boldStyle : {}}>Click 2nd End Point of Scale Bar</p>
          <p style={boldStyle}>asdfa</p>

          <input type='text' value='asdf'></input>
          <input type='text' value='asdf'></input>
        </>}
    </>)
  }

}

export default ScalebarOptions;
