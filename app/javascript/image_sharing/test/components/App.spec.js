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
configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App store={feedbackStore} />);
    const header = wrapper.find(Header);
    const feedbackForm = wrapper.find(FeedbackForm);
    const footer = wrapper.find(Footer);

    assert.strictEqual(header.length, 1);
    assert.strictEqual(header.props().title, 'Tell us what you think');
    assert.strictEqual(feedbackForm.length, 1);
    assert.strictEqual(footer.length, 1)
  });
});
