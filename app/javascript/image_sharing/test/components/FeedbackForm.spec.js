/* eslint-env mocha */
import 'jsdom-global/register';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import assert from 'assert';
import FeedbackForm from '../../components/FeedbackForm';
import Adapter from 'enzyme-adapter-react-16';
import feedbackStore from '../../stores/FeedbackStore';
import App from '../../components/App';
configure({ adapter: new Adapter() });

describe('<FeedbackForm />', () => {
  let wrapper;
  let nameInput;
  let commentsInput;

  beforeEach(() => {
    wrapper = shallow(<FeedbackForm store={feedbackStore} onSubmit={new App().onFeedbackSubmit} />);
    nameInput = wrapper.find('#feedbackName');
    commentsInput = wrapper.find('#feedbackComments');
  })

  it('should display the form', () => {
    const nameLabel = wrapper.find('[for="feedbackName"]');
    const commentsLabel = wrapper.find('[for="feedbackComments"]');
    const submitButton = wrapper.find('.js-feedback-submit');

    assert.strictEqual(nameLabel.prop('children'), 'Name');
    assert.strictEqual(nameInput.length, 1);
    assert.strictEqual(commentsLabel.prop('children'), 'Comments');
    assert.strictEqual(commentsInput.length, 1);
    assert.strictEqual(submitButton.length, 1);
  });

  it('should handle value updates', () => {
    const testName = 'test name';
    const testComment = 'test comment';

    nameInput.simulate('change', { target: { value: testName } });
    commentsInput.simulate('change', { target: { value: testComment } });
    nameInput = wrapper.find('#feedbackName');
    commentsInput = wrapper.find('#feedbackComments');

    assert.strictEqual(nameInput.prop('value'), testName);
    assert.strictEqual(commentsInput.prop('value'), testComment);
  });
});
