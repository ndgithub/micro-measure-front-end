import React from "react";
import Scalebar from './Scalebar'
// import CanvasLayer from './CanvasLayer';
import SvgLayer from './SvgLayer'
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

  mouseDown = () => {



  }




  render() {
    var myStyle = {};
    if (this.props.imageLoaded === true) {
      myStyle = {
        padding: '0px',
        backgroundImage: 'url(' + this.props.selectedFile + ')',
        backgroundSize: Math.floor(this.props.size.width) + 'px ' + Math.floor(this.props.size.height) + 'px',
        backgroundPosition: Math.floor(this.props.pos.x) + 'px ' + Math.floor(this.props.pos.y) + 'px',
        cursor: this.props.cursorStyle,
      }
      return (<>
        <div ref={this.myRef} style={myStyle} id="micro-container"
          onWheel={(e) => this.props.onMouseScroll(e)}
          onMouseDown={(e) => { this.props.mouseDown(e) }}
          onMouseUp={(e) => { this.props.mouseUp(e) }}
          onMouseMove={(e) => this.props.mouseMove(e)}
          onMouseLeave={(e) => this.props.mouseLeave(e)}
          onMouseEnter={(e) => this.props.mouseEnter(e)} >
          {/* <CanvasLayer
            containerRef={this.myRef}
            measureLines={this.props.measureLines}
            size={this.props.size}
            pos={this.props.pos}
            lastMousePos={this.props.lastMousePos}
            setLineStatus={this.props.setLineStatus}

            isScaleSetInProg={this.props.isScaleSetInProg}
            isMeasureLineInProg={this.props.isMeasureLineInProg}
          /> */}
          <SvgLayer
            containerRef={this.myRef}
            measureLines={this.props.measureLines}
            size={this.props.size}
            pos={this.props.pos}
            setLineHover={this.props.setLineHover}
            setLineSelected={this.props.setLineSelected}

            isScaleSetInProg={this.props.isScaleSetInProg}
            isMeasureLineInProg={this.props.isMeasureLineInProg}
          />
          {this.props.isImageScaleSet && this.props.isScalebarChecked &&
            <Scalebar size={this.props.size}
              imgSizeUnits={this.props.imgSizeUnits}
              containerSizePx={this.myRef.current.offsetWidth}
              units={this.props.units}
              scalebarTextColor={this.props.scalebarTextColor}
              scalebarBgColor={this.props.scalebarBgColor}
            />}

        </div >

      </>
      );
    } else {
      myStyle = {};
      return (
        <div ref={this.myRef} id="micro-container">

        </div >

      );
    }

  }

}

export default Micrograph;
