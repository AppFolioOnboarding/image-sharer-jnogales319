/* eslint-env mocha */
import 'jsdom-global/register';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import assert from 'assert';
import App from '../../components/App';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('should render correctly', () => {
    const stores = {
      feedbackStore: {}
    };

    const wrapper = shallow(<App.wrappedComponent stores={stores} />);
    const header = wrapper.find(Header);
    const footer = wrapper.find(Footer);

    assert.strictEqual(header.length, 1);
    assert.strictEqual(header.props().title, 'Tell us what you think');
    assert.strictEqual(footer.length, 1)
  });
});
