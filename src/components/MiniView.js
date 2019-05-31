import React from 'react';

class MiniView extends React.Component {
  // PROPS
  // containerRef
  // selectedFile
  // size
  // pos
  // origDims

  constructor(props) {
    super(props);
    this.state = {
      miniSize: null,
      miniPos: null,
      bgSize: null,
      bgPos: null
    };
    this.miniRef = React.createRef();
  }

  componentDidMount() {
    let bgSize = this.getBgSize();
    let initPos = this.getInitPos(bgSize);
    this.setState({
      bgSize: bgSize,
      bgPos: initPos,

    })


  }

  getBgSize = () => {
    var ratioY = this.props.origDims.height / this.miniRef.current.offsetHeight;
    console.log('ratioY', ratioY);
    var initSizeY = this.props.origDims.height / ratioY;
    console.log('initSizeY', initSizeY);
    var initSizeX = this.props.origDims.width / ratioY;
    console.log('initSizeX', initSizeX);

    var newRatioX = initSizeX / this.miniRef.current.offsetWidth;
    if (newRatioX >= 1) {
      initSizeX = this.miniRef.current.offsetWidth;
      initSizeY = initSizeY / newRatioX;
    }
    return { width: initSizeX, height: initSizeY }
  }

  getInitPos = (size) => {

    var posX = (this.miniRef.current.offsetWidth - size.width) / 2;
    var posY = (this.miniRef.current.offsetHeight - size.height) / 2;
    return { x: posX, y: posY };
  }

  componentDidUpdate() {

  }

  render() {
    let miniviewStyle = {};
    let miniBoxStyle = {};

    if (this.state.bgSize !== null) {
      miniviewStyle = {
        backgroundImage: 'url(' + this.props.selectedFile + ')',
        backgroundSize: Math.floor(this.state.bgSize.width) + 'px ' + Math.floor(this.state.bgSize.height) + 'px',
        backgroundPosition: Math.floor(this.state.bgPos.x) + 'px ' + Math.floor(this.state.bgPos.y) + 'px',
      }

      let boxLeftPos = ((-1 * this.props.pos.x / this.props.size.width) * this.state.bgSize.width) + this.state.bgPos.x
      let boxTopPos = ((-1 * this.props.pos.y / this.props.size.height) * this.state.bgSize.height) + this.state.bgPos.y
      let boxWidth = ((this.props.containerRef.current.offsetWidth / this.props.size.width) * this.state.bgSize.width);
      let boxHeight = ((this.props.containerRef.current.offsetHeight / this.props.size.height) * this.state.bgSize.height);
      console.log('boxLeftPos', boxLeftPos);

      if (boxLeftPos < this.state.bgPos.x) {
        boxLeftPos = this.state.bgPos.x;
      }
      if (boxTopPos < this.state.bgPos.y) {
        boxTopPos = this.state.bgPos.y
      }

      if (boxLeftPos + boxWidth > this.state.bgPos.x + this.state.bgSize.width) {
        boxWidth = this.miniRef.current.offsetWidth - boxLeftPos - (this.state.bgPos.x)
      }

      if (boxTopPos + boxHeight > this.state.bgPos.y + this.state.bgSize.height) {
        boxHeight = this.miniRef.current.offsetHeight - boxTopPos - (this.state.bgPos.y)
      }





      miniBoxStyle = {
        top: boxTopPos,
        left: boxLeftPos,
        width: boxWidth,
        height: boxHeight,
      }

    }
    return (
      <div ref={this.miniRef} id="mini-view-container" style={miniviewStyle}>
        <div id="mini-box" style={miniBoxStyle}></div>
      </div >
    )
  }

}

export default MiniView;
