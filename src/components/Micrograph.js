import React from "react";

class Micrograph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      thisShouldSayPoopoo: this.props.caca,

    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.props.getRefDims({
      divWidth: this.myRef.current.offsetWidth,
      divHeight: this.myRef.current.offsetHeight
    })
    // this.setState({
    //   divWidth: this.myRef.current.offsetWidth,
    //   divHeight: this.myRef.current.offsetHeight,
    //   micro: this.props.selectedFile
    // })
    // console.log("this is a props in Micrograph Component" + this.props.selectedFile);
  }

  render() {
    var myStyle = {
      border: '8px solid #000000',
      backgroundImage: 'url(' + this.props.selectedFile + ')'
    }

    // if (this.props.selectedFile) {
    //   this.setState({ isImageInitialized: true });
    //   console.log('there is a selected file');
    // }
    return (
      <div ref={this.myRef} style={myStyle} id="micro-container" >
        <div onClick={this.handleClick}>{this.state.count}</div>
        <div id="scale-bar">
          <div id="scale-bar-text"></div>
          <div id="scale-bar-inner-bar"></div>
        </div>
      </div>
    );
  }

}

export default Micrograph;
