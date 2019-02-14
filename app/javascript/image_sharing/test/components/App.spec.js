/* eslint-env mocha */
import 'jsdom-global/register';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import assert from 'assert';
import App from '../../components/App';
import Header from '../../components/Header';
import FeedbackForm from '../../components/FeedbackForm';
import Footer from '../../components/Footer';
import Adapter from 'enzyme-adapter-react-16';
import feedbackStore from '../../stores/FeedbackStore';
import postFeedbackService from '../../services/PostFeedbackService';
import sinon from 'sinon';
configure({ adapter: new Adapter() });

describe('<App />', () => {
  let sandbox;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App store={feedbackStore} />);
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render correctly', () => {
    const header = wrapper.find(Header);
    const feedbackForm = wrapper.find(FeedbackForm);
    const footer = wrapper.find(Footer);

    assert.strictEqual(header.length, 1);
    assert.strictEqual(header.props().title, 'Tell us what you think');
    assert.strictEqual(feedbackForm.length, 1);
    assert.strictEqual(footer.length, 1)
  });

  it('should handle feedback submission', async () => {
    const appInstance = wrapper.instance();
    const propStore = appInstance.props.store;
    propStore.userName = 'test name';
    propStore.comments = 'test comments';
    const expectedResponse = 'response';

    const eventStub = { preventDefault: sandbox.stub() };
    const postFeedbackStub =
      sandbox.stub(postFeedbackService, "postFeedback").returns({ message: expectedResponse});
    await appInstance.onFeedbackSubmit(eventStub);
    wrapper.update();

    assert(eventStub.preventDefault.calledOnce);
    assert(postFeedbackStub.calledOnceWith(propStore.userName, propStore.comments));
    assert.strictEqual(propStore.flashMessage, expectedResponse);
    const alert = wrapper.find('Alert');
    assert.strictEqual(alert.prop('children'), expectedResponse);
  });
});
