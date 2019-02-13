import React, { Component } from 'react';
import { inject } from 'mobx-react';
import Header from './Header';
import FeedbackForm from './FeedbackForm';
import { FeedbackStore } from '../stores/FeedbackStore';
import Footer from "./Footer";
import PropTypes from 'prop-types';
import postFeedbackService from '../services/PostFeedbackService';

export default class App extends Component {
  static propTypes = {
    store: PropTypes.instanceOf(FeedbackStore).isRequired
  };

  onFeedbackSubmit = async (event) => {
    const userName = this.props.store.userName;
    const comments = this.props.store.comments;

    event.preventDefault();
    await postFeedbackService.postFeedback(userName, comments);
  };

  render() {
    return (
      <div>
        <Header title={'Tell us what you think'} />
        <FeedbackForm store={this.props.store} onSubmit={this.onFeedbackSubmit} />
        <Footer />
      </div>
    )
  }
}

