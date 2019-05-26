import React from "react";

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
    console.log('Micrograph.render()');
    var myStyle = {};
    if (this.props.imageLoaded === true) {

      myStyle = {
        padding: '0px',
        backgroundImage: 'url(' + this.props.selectedFile + ')',
        backgroundSize: Math.floor(this.props.size.width) + 'px ' + Math.floor(this.props.size.height) + 'px',
        backgroundPosition: Math.floor(this.props.pos.x) + 'px ' + Math.floor(this.props.pos.y) + 'px',
      }
    } else {
      myStyle = {};
    }



    return (
      <div ref={this.myRef} style={myStyle} id="micro-container" onWheel={(e) => this.props.onScroll(e)} >
        <div id="scale-bar">
          <div id="scale-bar-text"></div>
          <div id="scale-bar-inner-bar"></div>
        </div>
      </div>
    );
  }

}

export default Micrograph;
