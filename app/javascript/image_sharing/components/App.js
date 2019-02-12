import React, { Component } from 'react';
import { inject } from 'mobx-react';
import Header from './Header';
import FeedbackForm from './FeedbackForm';
import { FeedbackStore } from '../stores/FeedbackStore';
import Footer from "./Footer";
import PropTypes from 'prop-types';

export default class App extends Component {
  /* Add Prop Types check*/
  static propTypes = {
    store: PropTypes.instanceOf(FeedbackStore)
  };

  render() {
    return (
      <div>
        <Header title={'Tell us what you think'} />
        <FeedbackForm />
        <Footer />
      </div>
    )
  }
}

