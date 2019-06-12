import React from 'react';


class CanvasLayer extends React.Component {
  constructor(props) {
    super(props);

    this.setState = {

    }
    this.canvasRef = React.createRef();
    this.counter = 0;
    this.ctx = null;
  }


  isCurrentlyDrawing = () => {
    return this.props.currDrawLinePts && this.props.isDrawLineInProg && this.props.currDrawLinePts.length === 2
  }

  convertToContainerPos = (imagePos) => {
    let x = this.props.pos.x + (this.props.size.width * imagePos.x)
    let y = this.props.pos.y + (this.props.size.height * imagePos.y)
    return { x, y };
  }

  componentDidMount() {

  }
  // it thinsk the canvas is 300 X 150 
  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.ctx = canvas.getContext('2d');
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log('*******', this.props.drawLines);
    for (let i = 0; i < this.props.drawLines.length; i++) {

      const lineObj = this.props.drawLines[i];
      this.ctx.strokeStyle = "#1890ff";
      this.ctx.lineWidth = 30;
      this.ctx.beginPath();
      this.ctx.moveTo(this.convertToContainerPos(lineObj.pt1).x, this.convertToContainerPos(lineObj.pt1).y);
      this.ctx.lineTo(this.convertToContainerPos(lineObj.pt2).x, this.convertToContainerPos(lineObj.pt2).y);

      this.ctx.stroke();

      if (this.ctx.isPointInStroke(this.props.lastMousePos.x - this.props.containerRef.current.offsetLeft, this.props.lastMousePos.y - this.props.containerRef.current.offsetTop)) {
        console.log('true')
        console.count();
      }

    }


    if (this.isCurrentlyDrawing()) {

      this.ctx.strokeStyle = "#1890ff";
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.moveTo(this.props.currDrawLinePts[0].x - this.props.containerRef.current.offsetLeft, this.props.currDrawLinePts[0].y - this.props.containerRef.current.offsetTop);
      this.ctx.lineTo(this.props.currDrawLinePts[1].x - this.props.containerRef.current.offsetLeft, this.props.currDrawLinePts[1].y - this.props.containerRef.current.offsetTop);
      this.ctx.stroke();
    }
  }



  render() {
    return (
      <canvas onMouseMove={this.onMouseMove} ref={this.canvasRef} className='canvas-layer'></canvas>
    )

  }

}

export default CanvasLayer;