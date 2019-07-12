import React from 'react';
import startFirebaseUI from './Firebase/firebase';


class FirebaseUI extends React.Component {

  componentDidMount() {
    startFirebaseUI('#firebaseui');
  }


  render() {
    return (<>
      <div id="firebaseui"></div>
    </>
    );
  }
}

export default FirebaseUI;