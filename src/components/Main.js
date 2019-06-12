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
      isImageScaleSet: false, // Used to be isImageScaleSet
      isScalebarChecked: false,
      isScaleSetInProg: false,
      selectedFile: null,
      origDims: null,
      imgSizeUnits: null,
      units: null,
      snapUrls: [],
      scalePts: [],
      inputLengthValue: '',
      inputUnitsValue: '',
      cursorStyle: 'auto',

      scalebarTextColor: '#000000',
      scalebarBgColor: '#ffffff',

      isDrawLineInProg: false,
      currDrawLinePts: null,
      drawLines: [],
      lastMousePos: null


    };

    this.origDims = null;
    this.isMouseDown = null;
  }

  useDemoUpload = () => {
    var url = 'https://i.imgur.com/ssPGfDJ.jpg';
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



        isImageScaleSet: false,
        isScalebarChecked: false,
        inputLengthValue: '',
        inputUnitsValue: '',
        scalePts: []
      });
    }
    img.src = url;
  }
  // Called from Sidebar when user uploads file
  handleFileUpload = (event) => {
    console.log('handlefileUpload called')
    if (event.target.files.length === 0) return;
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

        isImageScaleSet: false,
        isScalebarChecked: false,
        inputLengthValue: '',
        inputUnitsValue: '',
        scalePts: []
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

  onMouseScroll = (e) => {
    let newSize = {};
    newSize.width = this.state.size.width * (1 - (0.001 * e.deltaY));
    newSize.height = this.state.size.height * (1 - (0.001 * e.deltaY));

    let newPos = this.getNewPosition(this.state.containerRef, this.state.size, this.state.pos, newSize)

    this.setState({
      size: newSize,
      pos: newPos,
    })

  }

  onCheckUseScalebar = (checked) => {
    this.setState({
      isScalebarChecked: checked
    });
  }

  onClickCancelSetting = () => {
    this.setState({
      isScaleSetInProg: false,
    })
  }

  onClickDoneSetting = () => {

    let imgScalePerc = Math.abs(this.state.scalePts[0].x - this.state.scalePts[1].x);
    let imgSizeUnits = this.state.inputLengthValue / imgScalePerc;
    this.setState({
      imgSizeUnits: imgSizeUnits,
      isImageScaleSet: true,
      units: this.state.inputUnitsValue,
      isScaleSetInProg: false,
      isScalebarChecked: true,
    })

  }

  onInputLengthChange = (e) => {
    e.preventDefault();
    this.setState({
      inputLengthValue: e.target.value,

    })

  }

  onInputUnitsChange = (e) => {
    e.preventDefault();
    this.setState({
      inputUnitsValue: e.target.value,

    })
  }

  wasDragged = () => {
    let dragged = (this.lastMouseDownPos.x !== this.lastMouseUpPos.x && this.lastMouseDownPos.y !== this.lastMouseUpPos.y);

    return dragged;
  }
  convertToImgPos = (pagePos) => {
    // The posisitoin on the page minus the offset of the container and minuse the offset of the image all divided by image widht
    var imgPtX = (pagePos.x - this.state.containerRef.current.offsetLeft - this.state.pos.x) / this.state.size.width;
    var imgPtY = (pagePos.y - this.state.containerRef.current.offsetTop - this.state.pos.y) / this.state.size.height;
    return { x: imgPtX, y: imgPtY };
  }

  onSaveSnapClicked = () => {
    html2canvas(this.state.containerRef.current, { logging: false, useCORS: true }).then(canvas => {
      let canvDataUrl = canvas.toDataURL();
      this.setState(prevState => ({
        snapUrls: [...prevState.snapUrls, canvDataUrl]
      }), () => console.log(this.state.snapUrls.length));
    });
  }

  onClickSetImageScale = () => {
    this.setState({
      isScaleSetInProg: true,
      isImageScaleSet: false,
      inputLengthValue: '',
      inputUnitsValue: '',
      scalePts: []
    })
  }

  onClickScaleTextColor = (color) => {
    this.setState({
      scalebarTextColor: color,
    })
  }

  onClickScaleBgColor = (color) => {
    this.setState({
      scalebarBgColor: color,
    })
  }


  mouseDown = (e) => {
    this.isMouseDown = true;
    this.lastMouseDownPos = {
      x: e.pageX,
      y: e.pageY
    }

    console.log('lastMouseDownPos', this.lastMouseDownPos);


    if (this.state.isDrawLineInProg) {
      this.setState({
        currDrawLinePts: [this.lastMouseDownPos]
      }, () => console.log(this.state.currDrawLinePts))
    } else {
      this.setState({
        cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2) ? 'crosshair' : 'move')
      })
    }


  }


  addScalePt = () => {
    this.setState(prevState => ({
      scalePts: [...prevState.scalePts, this.convertToImgPos(this.lastMouseUpPos)]
    }), () => {
      this.setState({
        cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2 ? 'crosshair' : 'auto')),
        isDrawLineInProg: false,
      })
    });
  }


  mouseUp = (e) => {
    this.isMouseDown = false;
    this.lastMouseUpPos = {
      x: e.pageX,
      y: e.pageY
    }
    // if scalebar setting is in progress and wasn't dragged, its a click pt. 
    if ((this.state.isScaleSetInProg) && !this.wasDragged()) {
      this.addScalePt();
    }

    if ((this.state.isDrawLineInProg)) {
      this.addDrawLine();
    }

    this.setState({
      cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2 ? 'crosshair' : 'auto')),
      isDrawLineInProg: false,
    })
  }

  mouseEnter = (e) => {
    this.setState({
      cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2) || this.state.isDrawLineInProg ? 'crosshair' : 'auto')
    })
  }


  mouseMove = (e) => {
    // If trying to drag
    if (this.isMouseDown && !this.state.isDrawLineInProg) {
      let diffX = this.state.lastMousePos.x - e.pageX;
      let diffY = this.state.lastMousePos.y - e.pageY;
      // this.state.lastMousePos = { x: e.pageX, y: e.pageY }
      this.setState({
        lastMousePos: { x: e.pageX, y: e.pageY },
        pos: {

          x: this.state.pos.x - diffX,
          y: this.state.pos.y - diffY
        },
        cursorStyle: 'move'
      })
      // If trying to draw line
    } else if (this.isMouseDown && this.state.isDrawLineInProg) {
      this.setState({
        currDrawLinePts: [this.state.currDrawLinePts[0], { x: e.pageX, y: e.pageY }],
        lastMousePos: { x: e.pageX, y: e.pageY },
      })
      // this.state.lastMousePos = { x: e.pageX, y: e.pageY }
      //if just moving the mouse around
    } else if (!this.isMouseDown && !this.state.isDrawLineInProg) {











    }
    this.setState({
      lastMousePos: { x: e.pageX, y: e.pageY }
    })
    // this.state.lastMousePos = { x: e.pageX, y: e.pageY }

  }

  mouseLeave = (e) => {
    this.isMouseDown = false;
  }

  onClickDrawLine = () => {
    this.setState({
      isDrawLineInProg: true,
      isScaleSetInProg: false,
    }, () => {
      console.log('draw lin in progress')
    });
  }

  addDrawLine = () => {
    this.setState(prevState => ({
      drawLines: [...prevState.drawLines, { pt1: this.convertToImgPos(this.lastMouseDownPos), pt2: this.convertToImgPos(this.lastMouseUpPos) }]
    }), () => {
      this.setState({
        isDrawLineInProg: false,
        currDrawLinePts: [],
        cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2 ? 'crosshair' : 'auto'))
      })
    });
  }




  render() {
    return (<div id='main'>
      <Sidebar
        handleFileUpload={this.handleFileUpload}
        onClickScalebarBtn={this.onClickScalebarBtn}
        onSaveSnapClicked={this.onSaveSnapClicked}
        snapUrls={this.state.snapUrls}
        imageLoaded={this.state.imageLoaded}
        scalePtsLength={this.state.scalePts.length}
        onCheckUseScalebar={this.onCheckUseScalebar}
        isScalebarChecked={this.state.isScalebarChecked}
        isImageScaleSet={this.state.isImageScaleSet}
        onInputLengthChange={this.onInputLengthChange}
        onInputUnitsChange={this.onInputUnitsChange}
        inputLengthValue={this.state.inputLengthValue}
        inputUnitsValue={this.state.inputUnitsValue}
        onClickDoneSetting={this.onClickDoneSetting}
        onClickSetImageScale={this.onClickSetImageScale}
        selectedFile={this.state.selectedFile}
        containerRef={this.state.containerRef}
        size={this.state.size}
        pos={this.state.pos}
        origDims={this.state.origDims}
        useDemoUpload={this.useDemoUpload}
        isScaleSetInProg={this.state.isScaleSetInProg}
        onClickCancelSetting={this.onClickCancelSetting}
        onClickScaleTextColor={this.onClickScaleTextColor}
        onClickScaleBgColor={this.onClickScaleBgColor}
        isDrawLineInProg={this.isDrawLineInProg}
        onClickDrawLine={this.onClickDrawLine}

      />
      <Micrograph
        selectedFile={this.state.selectedFile}
        getContainerRef={this.getContainerRef}
        size={this.state.size}
        pos={this.state.pos}
        imgSizeUnits={this.state.imgSizeUnits}
        imageLoaded={this.state.imageLoaded}
        onMouseScroll={this.onMouseScroll}
        mouseDown={this.mouseDown}
        mouseUp={this.mouseUp}
        mouseMove={this.mouseMove}
        mouseLeave={this.mouseLeave}
        mouseEnter={this.mouseEnter}
        isImageScaleSet={this.state.isImageScaleSet}
        isScalebarChecked={this.state.isScalebarChecked}
        units={this.state.units}
        scalebarTextColor={this.state.scalebarTextColor}
        scalebarBgColor={this.state.scalebarBgColor}
        isScaleSetInProg={this.state.isScaleSetInProg}
        scalePtsLength={this.state.scalePts.length}
        cursorStyle={this.state.cursorStyle}

        isDrawLineInProg={this.state.isDrawLineInProg}
        currDrawLinePts={this.state.currDrawLinePts}
        drawLines={this.state.drawLines}
        lastMousePos={this.state.lastMousePos}
      />
    </div>)
  }
}

export default Main;