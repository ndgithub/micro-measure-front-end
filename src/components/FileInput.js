import React from "react";


class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.inputRef = React.createRef();

  }

  componentDidMount() {
  }

  componentDidUpdate() {

  }
  render() {
    return (<>
      <button id="choose-file" className="btn btn-primary" onClick={() => this.inputRef.current.click()}><i className="fas fa-upload"></i> &nbsp;&nbsp; Choose Image from Computer</button>
      or
      <button id="choose-file" className="btn btn-primary" onClick={this.props.useDemoUpload}><i className="fas fa-upload"></i> &nbsp;&nbsp;Use a Demo Image</button>


      <input ref={this.inputRef} type="file" id="file-upload" onChange={(event) => this.props.handleFileUpload(event)} />
    </>
    )
  }

}

export default FileInput;