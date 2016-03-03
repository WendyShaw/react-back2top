/* global expect */
/* eslint no-console: 0 */
/* eslint-env node, mocha */
'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Back2Top from 'react-back2top';

describe('Back2Top', () => {

    it('loads normally', () => {
        expect(require('../src/main')).to.exist;
    });

    it('has default className', () => {
        const MyBack2Top = TestUtils.renderIntoDocument(<Back2Top/>);
        expect(TestUtils.findRenderedDOMComponentWithClass(MyBack2Top, 'back-to-top')).to.exist;
    });

    it('can change className', () => {
        const MyBack2Top = TestUtils.renderIntoDocument(<Back2Top className='my-class-name'/>);
        expect(TestUtils.findRenderedDOMComponentWithClass(MyBack2Top, 'my-class-name')).to.exist;
    });

    it('custom onClick is executed', () => {
        let clicked = false;
        const MyBack2Top = TestUtils.renderIntoDocument(<Back2Top onClick={(e) => clicked=true}/>);
        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(MyBack2Top, 'a'));
        expect(clicked).to.be.true;
    });

});