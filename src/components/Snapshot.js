import React from 'react';
class Snapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'Untitled',
      inputStyle: null,
    };
    this.inputRef = React.createRef();

  }

  onKeyDown = (e) => {
    if (e.keyCode === 13) this.inputRef.current.blur();
  }

  componentDidMount() {

    this.inputRef.current.focus();

  }

  componentDidUpdate() {
  }

  render() {
    let myStyle = {
      border: 'none'
    }

    return (
      <div className='snapshot-container'>
        <div className="snapshot-img-container">
          <img src={this.props.imgSrc} alt='' className='snapshot'></img>
        </div>
        <div className="snapshot-input-fields">
          <input ref={this.inputRef} className='title-input-field' type="text" id="blah" value={this.state.inputValue}
            style={myStyle} onKeyDown={this.onKeyDown} onChange={(e) => this.setState({ inputValue: e.target.value })} />
          <a href={this.props.imgSrc} download={this.state.inputValue}>Download</a>
        </div>
      </div>
    )
  }

}

export default Snapshot;