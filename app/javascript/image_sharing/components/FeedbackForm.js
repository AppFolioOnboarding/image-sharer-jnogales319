import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { FeedbackStore } from '../stores/FeedbackStore';
import PropTypes from 'prop-types';

@observer
class FeedbackForm extends Component {
  static propTypes = {
    store: PropTypes.instanceOf(FeedbackStore).isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  onNameChange = (event) => {
    this.props.store.setName(event.target.value);
  };

  onCommentsChange = (event) => {
    this.props.store.setComments(event.target.value);
  };

  render() {
    const store = this.props.store;

    return (
      <Form>
        <FormGroup>
          <Label for="feedbackName">Name</Label>
          <Input
            id="feedbackName"
            onChange={this.onNameChange}
            value={store.userName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="feedbackComments">Comments</Label>
          <Input
            id="feedbackComments"
            onChange={this.onCommentsChange}
            type="textarea"
            value={store.comments}
          />
        </FormGroup>
        <Input
          className="btn btn-primary js-feedback-submit"
          onClick={this.props.onSubmit}
          type="submit" />
      </Form>
    )
  }
}

export default FeedbackForm;
