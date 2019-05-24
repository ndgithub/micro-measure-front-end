import React from 'react';
import Sidebar from './Sidebar';
import Micrograph from './Micrograph';


class Main extends React.Component {

  state = {
    something: 'poopoo',
  };

  handleFileUpload = (event) => {
    console.log('handle file upload called from main.js componenet');
    console.log(event.target.files[0]);
    var tmppath = URL.createObjectURL(event.target.files[0]);
    this.setState({
      selectedFile: tmppath,
    })
  };


  // Gets called from Micrograph after it mounts
  getRefDims = (dims) => {
    this.setState({ refDims: dims })
  }


  render() {
    return (<>
      <Sidebar handleFileUpload={this.handleFileUpload} />
      <Micrograph caca={this.state.something} selectedFile={this.state.selectedFile} getRefDims={this.getRefDims} />
    </>)
  }
}

export default Main;