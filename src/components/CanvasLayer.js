import React from 'react';


class CanvasLayer extends React.Component {
  constructor(props) {
    super(props);

    this.setState = {

    }
    this.canvasRef = React.createRef();
    this.hovering = null;
  }

  convertToContainerPos = (imagePos) => {
    let x = this.props.pos.x + (this.props.size.width * imagePos.x)
    let y = this.props.pos.y + (this.props.size.height * imagePos.y)
    return { x, y };
  }


  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    const canvas = this.canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log('*******', this.props.measureLines);
    let newHoverStat = [];
    let oldHoverStat = [];
    this.hovering = null;
    for (let i = 0; i < this.props.measureLines.length; i++) {
      const lineObj = this.props.measureLines[i];
      oldHoverStat.push(lineObj.isHover)
      ctx.strokeStyle = lineObj.color;
      ctx.lineWidth = (lineObj.isHover === true ? 10 : 4);
      ctx.beginPath();
      ctx.moveTo(this.convertToContainerPos(lineObj.pt1).x, this.convertToContainerPos(lineObj.pt1).y);
      ctx.lineTo(this.convertToContainerPos(lineObj.pt2).x, this.convertToContainerPos(lineObj.pt2).y);
      ctx.stroke();

      if (ctx.isPointInStroke(this.props.lastMousePos.x - this.props.containerRef.current.offsetLeft, this.props.lastMousePos.y - this.props.containerRef.current.offsetTop)) {
        lineObj.isHover = true;
      } else {
        lineObj.isHover = false;
      }
      newHoverStat.push(lineObj.isHover)
    }

    if (oldHoverStat.join(',') !== newHoverStat.join(',')) {
      console.log('hoverStatuses :', newHoverStat);
      this.props.setLineStatus(newHoverStat);

    }



  }

  render() {
    return (
      <canvas onMouseMove={this.onMouseMove} ref={this.canvasRef} className='canvas-layer'></canvas>
    )
  }

}

export default CanvasLayer;