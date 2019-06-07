import React from 'react';
import { Timeline, Icon, Button, Input } from 'antd';



class ImageScaleSetForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.inputLengthRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.scalePtsLength === 2 && this.props.inputLengthValue.length === 0) {
      this.inputLengthRef.current.focus();
    }
  }


  render() {
    let boldStyle = {
      fontWeight: 'bold'
    }

    let lightStyle = {
      color: '#999999',
    }

    let dotComplete = <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />

    let dotInProgress = <Icon type="loading" />;
    let dotPending = null;
    const getDot = (step) => {

      switch (step) {
        case 1:
          if (this.props.scalePtsLength === 0) {
            return dotInProgress;
          } else {
            return dotComplete;
          }
        case 2:
          if (this.props.scalePtsLength < 1) {
            return dotPending;
          } else if (this.props.scalePtsLength === 1) {
            return dotInProgress;
          } else if (this.props.scalePtsLength > 1) {
            return dotComplete;
          }
          break;

        case 3:
          if (this.props.scalePtsLength < 2) {
            return dotPending;
          } else if (this.props.scalePtsLength === 2) {
            if (this.props.inputLengthValue.length === 0) {
              return dotInProgress;
            } else {
              return dotComplete;
            }

          }
          break;
        default:
          break;
      }

    }
    return (


      <div className="scale-set-form">


        <Timeline>
          <Timeline.Item dot={getDot(1)}><span style={(this.props.scalePtsLength === 0) ? boldStyle : lightStyle} >
            Click 1st End Point</span></Timeline.Item>
          <Timeline.Item dot={getDot(2)}><span style={(this.props.scalePtsLength === 1) ? boldStyle : lightStyle} >
            Click 2nd End Point</span></Timeline.Item>

          <Timeline.Item dot={getDot(3)}>
            <Input.Group compact>
              <Input ref={this.inputLengthRef} style={{ width: '40%' }} disabled={this.props.scalePtsLength < 2} value={this.props.inputLengthValue} onChange={(e) => this.props.onInputLengthChange(e)} placeholder="Length" />
              <Input id="input-enter-units" style={{ width: '20%' }} disabled={this.props.scalePtsLength < 2 || this.props.inputLengthValue.length === 0} value={this.props.inputUnitsValue} placeholder="Units" onChange={(e) => this.props.onInputUnitsChange(e)} />
            </Input.Group></Timeline.Item>
          <Timeline.Item><Button onClick={this.props.onClickDoneSetting} disabled={this.props.scalePtsLength < 2 || this.props.inputLengthValue.length === 0} >Set</Button></Timeline.Item>
        </Timeline>



      </div>)
  }
}


export default ImageScaleSetForm;