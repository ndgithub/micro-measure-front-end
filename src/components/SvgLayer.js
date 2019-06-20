import React from 'react';

class SvgLayer extends React.Component {
  constructor(props) {
    super(props);

    this.setState = {

    }

  }



  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {


  }

  convertToContainerPos = (imagePos) => {
    let x = this.props.pos.x + (this.props.size.width * imagePos.x)
    let y = this.props.pos.y + (this.props.size.height * imagePos.y)
    return { x, y };
  }

  getColor = (lineObj) => {
    if (lineObj.isHover === true) {
      return '#ff0000';
    } else if (lineObj.isSelected === true) {
      return '#0000ff';
    } else {
      return '#00ff00'
    }
  }


  getSlope = (lineObj) => {

    let rise = lineObj.pt2.y - lineObj.pt1.y;
    let run = lineObj.pt2.x - lineObj.pt1.x;
    return rise / run;
  }



  render() {
    console.log('lines rendered')

    return (
      <svg id='svg' width={this.props.containerRef.current.offsetWidth} height={this.props.containerRef.current.offsetWidth}>
        {
          this.props.measureLines.map(lineObj => {
            console.log('slope: ' + this.getSlope(lineObj))
            let pt1 = this.convertToContainerPos(lineObj.pt1);
            let pt2 = this.convertToContainerPos(lineObj.pt2);

            return (
              <>


                <line key={lineObj.id} x1={pt1.x} y1={pt1.y} x2={pt2.x} y2={pt2.y}
                  style={{ stroke: this.getColor(lineObj), strokeWidth: 4 }}
                  onMouseOver={() => this.props.setLineHover(lineObj.id, true)}
                  onMouseLeave={() => this.props.setLineHover(lineObj.id, false)} />


                <circle key={lineObj.id + 'pt1'} cx={pt1.x} cy={pt1.y} r={4} fill="#ffffff"
                  stroke="#0000ff" stroke-width="1"
                  onMouseOver={() => this.props.setLineHover(lineObj.id, true)}
                  onMouseLeave={() => this.props.setLineHover(lineObj.id, false)}
                  visibility={lineObj.isSelected === true ? 'visible' : 'hidden'} />


                <circle key={lineObj.id + 'pt2'} cx={pt2.x} cy={pt2.y} r={4} fill="#ffffff"
                  stroke="#0000ff" stroke-width="1"
                  onMouseOver={() => this.props.setLineHover(lineObj.id, true)}
                  onMouseLeave={() => this.props.setLineHover(lineObj.id, false)}
                  visibility={lineObj.isSelected === true ? 'visible' : 'hidden'} />
              </>
            )
          })
        } />
      </svg >
    )
  }

}

export default SvgLayer;


