import React from "react";
import { Switch, Button, Divider } from 'antd';
import { Collapse } from 'react-collapse';
import ColorPicker from './ColorPicker';


class ScalebarOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showScalebarOptions: true,
    };

  }

  componentDidMount() {
  }

  componentDidUpdate() {

  }


  onClickScalebarOptions = () => {
    this.setState({
      showScalebarOptions: !this.state.showScalebarOptions,


    })

  }


  render() {


    return (<>

      {/* // {this.state.showScalebarOptions ? 'up' : 'down'} */}
      <div className="switch-container">
        <div onClick={this.onClickScalebarOptions} type="link" className="scalebar-options">Scalebar&nbsp;
        <i className={`fas fa-caret-down ${this.state.showScalebarOptions ? 'scalebar-options-arrow-up' : 'scalebar-options-arrow-down'}`}></i></div>
        <Switch checked={this.props.isScalebarChecked} onClick={(checked) => this.props.onCheckUseScalebar(checked)} size='small' />
      </div>
      <Collapse isOpened={this.state.showScalebarOptions}>
        <div className="scalebar-options">

          <div className="scalebar-color-options">
            <div>Foreground</div>
            <ColorPicker onClickColor={this.props.onClickScaleTextColor}></ColorPicker>
          </div>



          <div className="scalebar-color-options">
            <div>Background</div>
            <ColorPicker onClickColor={this.props.onClickScaleBgColor}></ColorPicker>
          </div>



        </div>
      </Collapse>


      <Divider />

    </>)
  }

}

export default ScalebarOptions;
