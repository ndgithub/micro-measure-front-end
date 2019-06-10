import React from 'react';


class CanvasLayer extends React.Component {
  constructor(props) {
    super(props);

    this.setState = {

    }
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = "#1890ff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(100, 100);
    ctx.stroke();
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <canvas ref={this.canvasRef} className='canvas-layer'></canvas>
    )

  }

}

export default CanvasLayer;