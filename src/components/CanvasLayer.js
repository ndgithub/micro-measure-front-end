import React from 'react';


class CanvasLayer extends React.Component {
  constructor(props) {
    super(props);

    this.setState = {

    }
    this.canvasRef = React.createRef();
    this.counter = 0;
  }

  convertToContainerPos = (imagePos) => {
    console.log('imagePos', imagePos.x);


    let x = this.props.pos.x + (this.props.size.width * imagePos.x)
    console.log('this.props.size.width', this.props.size.width);
    console.log('this.props.pos.x', this.props.pos.x);
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
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log('*******', this.props.drawLines);
    for (let i = 0; i < this.props.drawLines.length; i++) {
      const lineObj = this.props.drawLines[i];
      // console.log(lineObj);
      ctx.strokeStyle = "#1890ff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      // console.log('asfd', this.convertToContainerPos(lineObj.pt1));
      ctx.moveTo(this.convertToContainerPos(lineObj.pt1).x, this.convertToContainerPos(lineObj.pt1).y);
      // console.log(this.convertToContainerPos(lineObj.pt1).x + ', ' + this.convertToContainerPos(lineObj.pt1).y);
      ctx.lineTo(this.convertToContainerPos(lineObj.pt2).x, this.convertToContainerPos(lineObj.pt2).y);
      // console.log(this.convertToContainerPos(lineObj.pt2).x + ', ' + this.convertToContainerPos(lineObj.pt2).y);




      // ctx.moveTo(0 + (i * 10), 10);
      // ctx.lineTo(20, 100);


      ctx.stroke();
    }
    // drawLines={this.props.drawLines}
    // size={this.props.size}
    // pos={this.props.pos}

    if (this.props.currDrawLinePts && this.props.isDrawLineInProg && this.props.currDrawLinePts.length === 2) {
      ctx.strokeStyle = "#1890ff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(this.props.currDrawLinePts[0].x - this.props.containerRef.current.offsetLeft, this.props.currDrawLinePts[0].y - this.props.containerRef.current.offsetTop);
      ctx.lineTo(this.props.currDrawLinePts[1].x - this.props.containerRef.current.offsetLeft, this.props.currDrawLinePts[1].y - this.props.containerRef.current.offsetTop);
      ctx.stroke();
    }
  }

  render() {
    return (
      <canvas ref={this.canvasRef} className='canvas-layer'></canvas>
    )

  }

}

export default CanvasLayer;