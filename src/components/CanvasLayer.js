import React from 'react';


class CanvasLayer extends React.Component {
  constructor(props) {
    super(props);

    this.setState = {

    }
    this.canvasRef = React.createRef();
    this.counter = 0;

  }




  componentDidMount() {

  }
  // it thinsk the canvas is 300 X 150 
  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log('*******', this.props.measureLines);
    for (let i = 0; i < this.props.measureLines.length; i++) {

      const lineObj = this.props.measureLines[i];
      ctx.strokeStyle = "#1890ff";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(this.convertToContainerPos(lineObj.pt1).x, this.convertToContainerPos(lineObj.pt1).y);
      ctx.lineTo(this.convertToContainerPos(lineObj.pt2).x, this.convertToContainerPos(lineObj.pt2).y);
      ctx.stroke();

      if (ctx.isPointInStroke(this.props.lastMousePos.x - this.props.containerRef.current.offsetLeft, this.props.lastMousePos.y - this.props.containerRef.current.offsetTop)) {
        console.log('true')
        console.count();
      }

    }

  }

  isCurrentlyDrawing = () => {
    return this.props.currMeasureLinePts && this.props.isMeasureLineInProg && this.props.currMeasureLinePts.length === 2
  }

  convertToContainerPos = (imagePos) => {
    let x = this.props.pos.x + (this.props.size.width * imagePos.x)
    let y = this.props.pos.y + (this.props.size.height * imagePos.y)
    return { x, y };
  }

  render() {
    return (
      <canvas onMouseMove={this.onMouseMove} ref={this.canvasRef} className='canvas-layer'></canvas>
    )

  }

}

export default CanvasLayer;