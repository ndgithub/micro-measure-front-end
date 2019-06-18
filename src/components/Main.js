import React from 'react';
import Sidebar from './Sidebar';
import Micrograph from './Micrograph';
import html2canvas from 'html2canvas';
import MeasureLine from './models/MeasureLine';



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

      isMeasureLineInProg: false,
      measureLines: [],
      lastMousePos: null,



    };

    this.origDims = null;
    this.isMouseDown = null;
    this.moveLine = null;
    this.lastMousePos = null;
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
        isScaleSetInProg: false,
        imgSizeUnits: null,
        units: null,
        inputLengthValue: '',
        inputUnitsValue: '',
        scalePts: [],

        isMeasureLineInProg: false,
        measureLines: [],

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

  convertToContainerPos = (imagePos) => {
    let x = this.state.pos.x + (this.state.size.width * imagePos.x)
    let y = this.state.pos.y + (this.state.size.height * imagePos.y)
    return { x, y };
  }

  onSaveSnapClicked = () => {
    html2canvas(this.state.containerRef.current, { logging: false, useCORS: true }).then(canvas => {
      let canvDataUrl = canvas.toDataURL();
      this.setState(prevState => ({
        snapUrls: [...prevState.snapUrls, canvDataUrl]
      }));
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

  addScalePt = () => {
    this.setState(prevState => ({
      scalePts: [...prevState.scalePts, this.convertToImgPos(this.lastMouseUpPos)]
    }), () => {
      this.setState({
        cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2 ? 'crosshair' : 'auto')),
        isMeasureLineInProg: false,
      })
    });
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

  mouseEnter = (e) => {
    this.setState({
      cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2) || this.state.isMeasureLineInProg ? 'crosshair' : 'auto')
    })
  }

  mouseDown = (e) => {
    this.setAllLinesUnselected();
    this.isMouseDown = true;
    this.lastMouseDownPos = {
      x: e.pageX,
      y: e.pageY
    }
    this.lastMousePos = {
      x: e.pageX,
      y: e.pageY
    }
    // creating a new line
    if (this.state.isMeasureLineInProg) {
      this.setState(prevState => ({
        measureLines: [...prevState.measureLines, new MeasureLine(this.convertToImgPos(this.lastMouseDownPos), this.convertToImgPos(this.lastMouseDownPos))]
      }))
      // clicking down on an existing line
    } else if (this.getIndexHovering() > -1) {
      this.holdingLine = this.getIndexHovering;
      console.log('grabbing line');
      let newArr = this.state.measureLines.map(line => line);
      newArr.splice(this.getIndexHovering(), 1);// remove the line that s getIndex hovering
      this.setState(prevState => ({
        measureLines: [...newArr, new MeasureLine(prevState.measureLines[this.getIndexHovering()].pt1, prevState.measureLines[this.getIndexHovering()].pt2, true)]
      }));
    } else {
      this.setState({
        cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2) ? 'crosshair' : 'move')
      })
    }
  }
  getIndexHovering = () => {
    console.log('getIndexHovering()');
    console.log(this.state.measureLines.length)
    for (let i = 0; i < this.state.measureLines.length; i++) {
      if (this.state.measureLines[i].isHover === true) {
        console.log(i)
        return i;
      }
    }
    return -1;
  }
  mouseMove = (e) => {
    e.persist();

    // If trying to drag image
    if (this.isMouseDown && !this.state.isMeasureLineInProg && !this.holdingLine) {
      let diffX = this.lastMousePos.x - e.pageX;
      let diffY = this.lastMousePos.y - e.pageY;
      this.lastMousePos = { x: e.pageX, y: e.pageY };
      this.setState({
        pos: {
          x: this.state.pos.x - diffX,
          y: this.state.pos.y - diffY
        },
        cursorStyle: 'move'
      })
      // If trying to draw line
    } else if (this.isMouseDown && this.state.isMeasureLineInProg) {

      this.setState(prevState => ({
        measureLines: [...prevState.measureLines.slice(0, -1), new MeasureLine(this.convertToImgPos(this.lastMouseDownPos), this.convertToImgPos(this.lastMousePos))],

      }));
      this.lastMousePos = { x: e.pageX, y: e.pageY };








      // dragging line
    } else if (this.isMouseDown && this.holdingLine) {
      let diffX = e.pageX - this.lastMousePos.x;
      let diffY = e.pageY - this.lastMousePos.y;

      let newLine = Object.assign({}, this.state.measureLines[this.state.measureLines.length - 1]);
      let pagePosPt1 = this.convertToContainerPos(newLine.pt1);
      pagePosPt1 = {
        x: pagePosPt1.x + diffX + this.state.containerRef.current.offsetLeft,
        y: pagePosPt1.y + diffY + this.state.containerRef.current.offsetTop
      }

      let pagePosPt2 = this.convertToContainerPos(newLine.pt2);
      pagePosPt2 = {
        x: pagePosPt2.x + diffX + this.state.containerRef.current.offsetLeft,
        y: pagePosPt2.y + diffY + this.state.containerRef.current.offsetTop
      }
      let newImgPt1 = this.convertToImgPos(pagePosPt1)
      let newImgPt2 = this.convertToImgPos(pagePosPt2);



      this.setState(prevState => ({
        measureLines: [...prevState.measureLines.slice(0, -1), new MeasureLine(newImgPt1, newImgPt2, true)],
      }));
      this.lastMousePos = { x: e.pageX, y: e.pageY };







    } else if (!this.isMouseDown && !this.state.isMeasureLineInProg) {
    }
    this.lastMousePos = { x: e.pageX, y: e.pageY }
    this.logLines();
  }

  mouseUp = (e) => {
    this.isMouseDown = false;
    this.lastMouseUpPos = {
      x: e.pageX,
      y: e.pageY
    }
    if ((this.state.isScaleSetInProg) && !this.wasDragged()) {
      this.addScalePt();
    }
    if ((this.state.isMeasureLineInProg)) {
      this.setState({
        isMeasureLineInProg: false,
        cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2 ? 'crosshair' : 'auto'))
      })
    }
    if ((this.holdingLine)) {
      this.setLineSelected();
      this.holdingLine = -1;
      this.logLines();

    }
    this.setState({
      cursorStyle: ((this.state.isScaleSetInProg && this.state.scalePts.length < 2 ? 'crosshair' : 'auto')),
      isMeasureLineInProg: false,
    })
  }

  setLineHover = (id, isHover) => {
    console.log('setLineHover()')
    let newLines = this.state.measureLines.map((lineObj, i) => {
      let newLine = Object.assign({}, lineObj);
      newLine.isHover = newLine.id === id ? isHover : newLine.isHover;
      return newLine;
    })
    this.setState({
      measureLines: newLines,
    }, () => this.logLines())
  }

  // Set line selected, it will always be the last one
  setLineSelected = () => {
    let newLines = this.state.measureLines.map((lineObj, i) => {
      return Object.assign({}, lineObj);
    });
    newLines[this.state.measureLines.length - 1].isSelected = true;
    this.setState({
      measureLines: newLines,
    })
  }

  setAllLinesUnselected = () => {
    let newLines = this.state.measureLines.map((lineObj, i) => {
      let newLine = Object.assign({}, lineObj);
      newLine.isSelected = false;
      return newLine;
    })
    this.setState({
      measureLines: newLines,
    })
  }

  mouseLeave = (e) => {
    this.isMouseDown = false;
  }

  onClickDrawLine = () => {
    this.setState({
      isMeasureLineInProg: true,
      isScaleSetInProg: false,
    });
  }

  logLines = () => {
    this.state.measureLines.forEach(line => {
      console.log(`${line.id}:${line.isHover}`)
    })
    console.log(('***********'))
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
        isMeasureLineInProg={this.isMeasureLineInProg}
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

        isMeasureLineInProg={this.state.isMeasureLineInProg}
        measureLines={this.state.measureLines}
        setLineHover={this.setLineHover}
        setLineSelected={this.setLineSelected}
      />
    </div>)
  }
}

export default Main;