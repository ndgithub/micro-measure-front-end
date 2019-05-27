import React from 'react';
import Sidebar from './Sidebar';
import Micrograph from './Micrograph';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      size: null,
      pos: null,
      containerRef: null,
      useScalebar: false,
      selectedFile: null,
      origDims: null,
      imgSizeUnits: null,
    };

    this.origDims = null;
    this.isMouseDown = null;
    this.lastMousePos = null;
    this.isScaleSetInProg = false;
    this.scalePts = [];

  }


  // Called from Sidebar when user uploads file
  handleFileUpload = (event) => {
    var url = URL.createObjectURL(event.target.files[0]);
    var img = new Image();
    img.onload = () => {
      this.origDims = { width: img.width, height: img.height };
      var initialSize = this.getInitSize();
      var initialPos = this.getInitPos(initialSize);

      this.setState({
        selectedFile: url,
        size: initialSize,
        pos: initialPos,
        origDims: { width: img.width, height: img.height },
        imageLoaded: true,
      });
      console.log(this.state);
    }
    img.src = url;


  };


  getInitSize = () => {
    var ratioY = this.origDims.height / this.state.containerRef.current.offsetHeight;
    var initSizeY = this.origDims.height / ratioY;
    var initSizeX = this.origDims.width / ratioY;

    var newRatioX = initSizeX / this.state.containerRef.current.offsetWidth;
    if (newRatioX >= 1) {
      initSizeX = this.state.containerRef.current.offsetWidth;
      initSizeY = initSizeY / newRatioX;
    }
    return { width: initSizeX, height: initSizeY }
  }

  getInitPos = (size) => {

    var posX = (this.state.containerRef.current.offsetWidth - size.width) / 2;
    var posY = (this.state.containerRef.current.offsetHeight - size.height) / 2;
    return { x: posX, y: posY };
  }

  getNewPosition = (containerRef, oldSize, oldPos, newSize) => {
    let newPos = {};
    let old_containerCenterX_relToImgCorner_percent = ((containerRef.current.offsetWidth / 2) - oldPos.x) / oldSize.width;
    let old_containerCenterY_relToImgCorner_percent = ((containerRef.current.offsetHeight / 2) - oldPos.y) / oldSize.height;

    let new_pointToKeepCenteredX_ReltoContainer_pixels = (old_containerCenterX_relToImgCorner_percent * newSize.width) + oldPos.x;
    let offsetX = new_pointToKeepCenteredX_ReltoContainer_pixels - (containerRef.current.offsetWidth / 2);
    newPos.x = oldPos.x - offsetX;

    let new_pointToKeepCenteredY_ReltoContainer_pixels = (old_containerCenterY_relToImgCorner_percent * newSize.height) + oldPos.y;
    let offsetY = new_pointToKeepCenteredY_ReltoContainer_pixels - (containerRef.current.offsetHeight / 2);
    newPos.y = oldPos.y - offsetY;

    return newPos;

  }

  /////////////  Prop functions called from Micrograph component ///////////////
  getContainerRef = (ref) => {
    this.setState({ containerRef: ref })
  }

  onScroll = (e) => {
    console.log(e.deltaY);
    let newSize = {};

    newSize.width = this.state.size.width * (1 - (0.001 * e.deltaY));
    newSize.height = this.state.size.height * (1 - (0.001 * e.deltaY));

    let newPos = this.getNewPosition(this.state.containerRef, this.state.size, this.state.pos, newSize)

    this.setState({
      size: newSize,
      pos: newPos
    })

  }

  mouseDown = (e) => {
    this.isMouseDown = true;
    this.lastMouseDownPos = {
      x: e.pageX,
      y: e.pageY
    }
    console.log('lastMouseDownPos', this.lastMouseDownPos);
  }

  mouseUp = (e) => {

    this.isMouseDown = false;
    this.lastMouseUpPos = {
      x: e.pageX,
      y: e.pageY
    }

    if (this.isScaleSetInProg && !this.wasDragged()) {

      this.scalePts.push(this.convertToImgPos(this.lastMouseUpPos));
      if (this.scalePts.length === 2) {
        this.onScaleSet();
      }
    }
  }

  onScaleSet = () => {
    let inputNum = prompt('What is the length?');
    this.isScaleSetInProg = false;

    let imgScalePerc = Math.abs(this.scalePts[0].x - this.scalePts[1].x);

    let imgSizeUnits = inputNum / imgScalePerc;
    console.log('imgSizeUnits', imgSizeUnits);
    this.setState({
      imgSizeUnits: imgSizeUnits,
      useScalebar: true
    })
  }

  convertToImgPos = (pagePos) => {
    var imgPtX = ((pagePos.x) - this.state.pos.x) / this.state.size.width;
    var imgPtY = ((pagePos.y) - this.state.pos.y) / this.state.size.height;
    return { x: imgPtX, y: imgPtY };
  }

  mouseMove = (e) => {
    if (this.isMouseDown) {
      let diffX = this.lastMousePos.x - e.pageX;
      let diffY = this.lastMousePos.y - e.pageY;
      this.lastMousePos = { x: e.pageX, y: e.pageY }
      this.setState({
        pos: {
          x: this.state.pos.x - diffX,
          y: this.state.pos.y - diffY
        }
      })
    } else {
      this.lastMousePos = { x: e.pageX, y: e.pageY }
    }
  }

  mouseLeave = (e) => {
    this.isMouseDown = false;
  }

  wasDragged = () => {
    let dragged = (this.lastMouseDownPos.x !== this.lastMouseUpPos.x && this.lastMouseDownPos.y !== this.lastMouseUpPos.y);
    console.log('up and down on same posiot', dragged);
    return dragged;
  }

  /////////////  Prop functions called from Sidebar component ///////////////
  onClickScalebarbBtn = () => {
    this.isScaleSetInProg = true;
    console.log('this.isScaleSetInProg', this.isScaleSetInProg);
  }

  render() {
    return (<>
      <Sidebar
        handleFileUpload={this.handleFileUpload}
        onClickScalebarbBtn={this.onClickScalebarbBtn}
      />
      <Micrograph
        selectedFile={this.state.selectedFile}
        getContainerRef={this.getContainerRef}
        size={this.state.size}
        pos={this.state.pos}
        imgSizeUnits={this.state.imgSizeUnits}
        imageLoaded={this.state.imageLoaded}
        onScroll={this.onScroll}
        mouseDown={this.mouseDown}
        mouseUp={this.mouseUp}
        mouseMove={this.mouseMove}
        mouseLeave={this.mouseLeave}
        useScalebar={this.state.useScalebar}
      />
    </>)
  }
}

export default Main;