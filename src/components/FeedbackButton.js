import React from 'react';
import CollectionCreateForm from './CollectionCreateForm';
import axios from 'axios';

class FeedbackButton extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSend = () => {
    const form = this.formRef.props.form;
    console.log('sup');
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);



      axios.post('http://localhost:3001/send-feedback', {
        email: values.email,
        feedback: values.feedback
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });



      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };



  render() {
    return (
      <div className="feedback-container" >
        <div className="feedback-button" style={this.state.style} type="primary" onClick={this.showModal}  >
          Give Feedback...
        </div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSend={this.handleSend}
        />
      </div>
    );
  }
}

export default FeedbackButton;