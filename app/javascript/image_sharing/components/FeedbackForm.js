import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

@observer
class FeedbackForm extends Component {
  @observable userName = '';
  @observable comments = '';

  @action
  onNameChange = (event) => {
    this.userName = event.target.value;
  };

  @action
  onCommentsChange = (event) => {
    this.comments = event.target.value;
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="feedbackName">Name</Label>
          <Input
            id="feedbackName"
            onChange={this.onNameChange}
            value={this.userName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="feedbackComments">Comments</Label>
          <Input
            id="feedbackComments"
            onChange={this.onCommentsChange}
            type="textarea"
            value={this.comments}
          />
        </FormGroup>
        <Input className="btn btn-primary js-feedback-submit" type="submit" />
      </Form>
    )
  }
}

export default FeedbackForm;
