import React, { Component } from 'react';
import { inject } from 'mobx-react';
import Header from './Header';
import FeedbackForm from './FeedbackForm';
import FeedbackMessage from './FeedbackMessage';
import { FeedbackStore } from '../stores/FeedbackStore';
import Footer from "./Footer";
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import postFeedbackService from '../services/PostFeedbackService';

@observer
export default class App extends Component {
  static propTypes = {
    store: PropTypes.instanceOf(FeedbackStore).isRequired
  };

  onFeedbackSubmit = async (event) => {
    const propStore = this.props.store;
    const userName = propStore.userName;
    const comments = propStore.comments;
    event.preventDefault();

    try {
      var response = await postFeedbackService.postFeedback(userName, comments);
      propStore.setFlashMessage(response.message, true);
    } catch(e) {
      propStore.setFlashMessage(e.name, false);
    } finally {
      propStore.setName('');
      propStore.setComments('');
    }
  };

  render() {
    return (
      <div>
        <FeedbackMessage store={this.props.store} />
        <Header title={'Tell us what you think'} />
        <FeedbackForm store={this.props.store} onSubmit={this.onFeedbackSubmit} />
        <Footer />
      </div>
    )
  }
}

