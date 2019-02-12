import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'mobx-react';
import feedbackStore from './stores/FeedbackStore';

ReactDOM.render(
  <App store={feedbackStore} />,
  document.getElementById('feedback-root')
);
