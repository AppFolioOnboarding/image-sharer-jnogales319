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
    const testName = 'test name';
    const testComments = 'test comments';
    propStore.userName = testName;
    propStore.comments = testComments;
    const expectedResponse = 'response';

    const eventStub = { preventDefault: sandbox.stub() };
    const postFeedbackStub =
      sandbox.stub(postFeedbackService, "postFeedback").returns({ message: expectedResponse});
    await appInstance.onFeedbackSubmit(eventStub);
    wrapper.update();

    assert(eventStub.preventDefault.calledOnce);
    assert(postFeedbackStub.calledOnceWith(testName, testComments));
    assert.strictEqual(propStore.flashMessage, expectedResponse);
    assert.strictEqual(propStore.flashSuccess, true);
  });

  it('should handle feedback submission failure', async () => {
    const appInstance = wrapper.instance();
    const propStore = appInstance.props.store;
    const exceptionText = "This is an exception";

    const eventStub = { preventDefault: sandbox.stub() };
    sandbox.stub(postFeedbackService, "postFeedback").throws(exceptionText);
    await appInstance.onFeedbackSubmit(eventStub);
    wrapper.update();

    assert.strictEqual(propStore.flashMessage, exceptionText);
    assert.strictEqual(propStore.flashSuccess, false);
  });

  it('should clear fields after submitting', async() => {
    const appInstance = wrapper.instance();
    const propStore = appInstance.props.store;
    propStore.userName = 'test name';
    propStore.comments = 'test comments';

    const eventStub = { preventDefault: sandbox.stub() };
    sandbox.stub(postFeedbackService, "postFeedback");
    await appInstance.onFeedbackSubmit(eventStub);
    wrapper.update();

    assert.strictEqual(propStore.userName, '');
    assert.strictEqual(propStore.comments, '');
  });
});
