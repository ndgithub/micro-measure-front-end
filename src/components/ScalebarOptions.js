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
    return (<>
      <input type="checkbox"
        name="Use-Scalebar"
        value="Use Scalebar"
        id="use-scalebar-input"
        onChange={(event) => this.props.onCheckUseScalebar(event)}
      /><label for="Use-Scalebar">Use Scalebar</label>

      {this.props.isScalebarChecked && !this.props.isScalebarSet &&
        <><p>Click First End Point of Scale Bar</p>
          <input type='text' value='asdf'></input>
          <input type='text' value='asdf'></input>
        </>}
    </>)
  }

}

export default ScalebarOptions;
