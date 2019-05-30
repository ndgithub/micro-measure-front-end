import React from 'react';
class Snapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'Untitled',
      inputStyle: null,
    };
    // this.inputRef = React.createRef();

  }

  onKeyDown = (e) => {
    // if (e.keyCode === 13) e.target.blur();
  }

  componentDidMount() {
    // this.inputRef.focus();
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className='snapshot-container'>
        <a href={this.props.imgSrc} download="asdf.jpg" className="snapshot-img-container">
          <img src={this.props.imgSrc} alt='' className='snapshot'></img>
        </a>
        {/* <div className="snapshot-input-fields">
          <input className='title-input-field' type="text" id="blah" value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
            onKeyDown={this.onKeyDown}
            onBlur={() => this.setState({ inputStyle: { border: 'none' } })}
            style={this.state.inputStyle}
             />
        </div> */}
      </div>
    )
  }

}

export default Snapshot;