import React from 'react';
import Sidebar from './Sidebar';
import Micrograph from './Micrograph';
import html2canvas from 'html2canvas';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      size: null,
      pos: null,
      containerRef: null,
      isScalebarSet: false, // Used to be useScalebar
      isScalebarChecked: false,
      selectedFile: null,
      origDims: null,
      imgSizeUnits: null,
      units: null,
      snapUrls: []
    };

    this.origDims = null;
    this.isMouseDown = null;
    this.lastMousePos = null;
    // this.isScaleSetInProg = false;
    this.scalePts = [];

  }


  // Called from Sidebar when user uploads file
  handleFileUpload = (event) => {
    if (event.target.files.length === 0) return;
    var url = URL.createObjectURL(event.target.files[0]);
    console.log(url);
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
        // isScaleSetInProg: false,
        isScalebarSet: false,
        isScalebarChecked: false
      });
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
    // is scalebar setting is in progress and wasn't dragged, its a click pt. 
    if ((this.state.isScalebarChecked && !this.state.isScalebarSet) && !this.wasDragged()) {

      this.scalePts.push(this.convertToImgPos(this.lastMouseUpPos));
      if (this.scalePts.length === 2) {
        this.onScaleSet();
      }
    }
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
  convertToImgPos = (pagePos) => {
    // The posisitoin on the page minus the offset of the container and minuse the offset of the image all divided by image widht
    var imgPtX = (pagePos.x - this.state.containerRef.current.offsetLeft - this.state.pos.x) / this.state.size.width;
    var imgPtY = (pagePos.y - this.state.containerRef.current.offsetTop - this.state.pos.y) / this.state.size.height;
    return { x: imgPtX, y: imgPtY };
  }



  /////////////  Prop functions called from Sidebar component ///////////////
  // onClickScalebarBtn = () => {
  //   this.isScaleSetInProg = true;

  // }

  onCheckUseScalebar = (e) => {

    console.log(e.target.checked);
    this.setState({
      isScalebarChecked: e.target.checked
    });

    // if checked and scalebar is already set, use scalebar - this is new.
    // if not it is in progress. 
    this.isScaleSetInProg = true; //don't need this

  }

  onScaleSet = () => {
    let inputNum = prompt('What is the length?');
    let inputUnit = prompt('What are the units?');
    this.isScaleSetInProg = false;

    let imgScalePerc = Math.abs(this.scalePts[0].x - this.scalePts[1].x);

    let imgSizeUnits = inputNum / imgScalePerc;
    console.log('imgSizeUnits', imgSizeUnits);
    this.setState({
      imgSizeUnits: imgSizeUnits,
      scalebarSet: true,
      units: inputUnit
    })
  }

  onSaveSnapClicked = () => {
    html2canvas(this.state.containerRef.current, { logging: false }).then(canvas => {
      let canvDataUrl = canvas.toDataURL();
      this.setState(prevState => ({
        snapUrls: [canvDataUrl, ...prevState.snapUrls]
      }), () => console.log(this.state.snapUrls.length));
    });
  }

  render() {
    return (<>
      <Sidebar
        handleFileUpload={this.handleFileUpload}
        onClickScalebarBtn={this.onClickScalebarBtn}
        onSaveSnapClicked={this.onSaveSnapClicked}
        snapUrls={this.state.snapUrls}
        imageLoaded={this.state.imageLoaded}
        scalePtsLength={this.scalePts.length}
        onCheckUseScalebar={this.onCheckUseScalebar}
        isScalebarChecked={this.state.isScalebarChecked}
        isScalebarSet={this.state.isScalebarSet}

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
        isScalebarSet={this.state.isScalebarSet}
        isScalebarChecked={this.state.isScalebarChecked}
        units={this.state.units}
      />
    </>)
  }
}

export default Main;