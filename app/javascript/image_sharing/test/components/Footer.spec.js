/* eslint-env mocha */
import 'jsdom-global/register';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import assert from 'assert';
import Footer from '../../components/Footer';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  it('should display the small, centered copyright', () => {
    const wrapper = shallow(<Footer />);
    const containingDiv = wrapper.find('.js-footer');
    const textElement = wrapper.find('.js-footer-text');

    assert.strictEqual(containingDiv.prop('className').includes('text-center'), true);
    assert.strictEqual(textElement.prop('children'), 'Copyright: AppFolio Inc. Onboarding');
    assert.strictEqual(textElement.prop('className').includes('small'), true);
  });
});
