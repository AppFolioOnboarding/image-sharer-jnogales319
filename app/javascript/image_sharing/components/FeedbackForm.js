import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

class FeedbackForm extends Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="feedbackName">Name</Label>
          <Input id="feedbackName" className="js-feedback-name" />
        </FormGroup>
        <FormGroup>
          <Label for="feedbackComments">Comments</Label>
          <Input id="feedbackComments" type="textarea" />
        </FormGroup>
        <Input className="btn btn-primary js-feedback-submit" type="submit" />
      </Form>
    )
  }
}

export default FeedbackForm;
