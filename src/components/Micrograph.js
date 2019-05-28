import React from "react";
import Scalebar from './Scalebar'
class Micrograph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null,
      pos: null,
    };
    this.myRef = React.createRef();

  }

  componentDidMount() {
    this.props.getContainerRef(this.myRef)
  }

  componentDidUpdate() {

  }

  render() {
    console.log('Micrograph.render() called');
    var myStyle = {};
    if (this.props.imageLoaded === true) {
      myStyle = {
        padding: '0px',
        backgroundImage: 'url(' + this.props.selectedFile + ')',
        backgroundSize: Math.floor(this.props.size.width) + 'px ' + Math.floor(this.props.size.height) + 'px',
        backgroundPosition: Math.floor(this.props.pos.x) + 'px ' + Math.floor(this.props.pos.y) + 'px',
      }
      return (
        <div ref={this.myRef} style={myStyle} id="micro-container"
          onWheel={(e) => this.props.onScroll(e)}
          onMouseDown={(e) => this.props.mouseDown(e)}
          onMouseUp={(e) => this.props.mouseUp(e)}
          onMouseMove={(e) => this.props.mouseMove(e)}
          onMouseLeave={(e) => this.props.mouseLeave(e)} >

          {this.props.useScalebar && <Scalebar size={this.props.size}
            imgSizeUnits={this.props.imgSizeUnits}
            containerSizePx={this.myRef.current.offsetWidth}
            units={this.props.units} />}
        </div >

      );
    } else {
      myStyle = {};
      return (
        <div ref={this.myRef} id="micro-container">
          Image not loaded yet
        </div >

      );
    }

  }

}

export default Micrograph;
