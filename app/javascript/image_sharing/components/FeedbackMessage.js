import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { FeedbackStore } from '../stores/FeedbackStore';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export default class FeedbackMessage extends Component {
  static propTypes = {
    store: PropTypes.instanceOf(FeedbackStore).isRequired
  };

  render() {
    const messageColor = this.props.store.flashSuccess ? 'success' : 'danger';

    return this.props.store.flashMessage
      ? <Alert color={messageColor}>{this.props.store.flashMessage}</Alert>
      : null
  }
}
