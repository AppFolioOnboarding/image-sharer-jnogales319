import React from 'react';
import assert from 'assert';
import FeedbackMessage from '../../components/FeedbackMessage';
import feedbackStore from '../../stores/FeedbackStore';
import { shallow } from 'enzyme';

describe('<FeedbackMessage />', () => {
  let appInstance;
  let propStore;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FeedbackMessage store={ feedbackStore } />);
    appInstance = wrapper.instance();
    propStore = appInstance.props.store;
  });

  it('should display nothing initially', () => {
    const flashMessage = wrapper.find('Alert');
    assert(flashMessage.prop('children'), null);
    assert(flashMessage.prop('color'), null);
  });

  it('should display a success message', () => {
    const successMessage = 'success message';
    propStore.setFlashMessage(successMessage, true);
    const flashMessage = wrapper.find('Alert');

    assert(flashMessage.prop('children'), successMessage);
    assert(flashMessage.prop('color'), 'success');
  });

  it('should display an error message', () => {
    const errorMessage = 'error message';
    propStore.setFlashMessage(errorMessage, false);
    const flashMessage = wrapper.find('Alert');

    assert(flashMessage.prop('children'), errorMessage);
    assert(flashMessage.prop('color'), 'danger');
  });
});
