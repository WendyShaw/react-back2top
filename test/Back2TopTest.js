/*global descibe*/
/* eslint no-console: 0 */
/* eslint-env node, mocha */

'use strict';

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Back2Top from 'react-back2top';
import {isNumber} from '../src/main';
import {describe, it} from 'mocha';

describe('Back2Top Component', () => {

    it('loads normally', () => {
        expect(require('../src/main')).to.exist;
    });

    it('has default className', () => {
        const MyBack2Top = TestUtils.renderIntoDocument(<Back2Top alwaysVisible={true}/>);
        expect(TestUtils.findRenderedDOMComponentWithClass(MyBack2Top, 'back-to-top')).to.exist;
    });

    it('can change className', () => {
        const MyBack2Top = TestUtils.renderIntoDocument(<Back2Top className='my-class-name' alwaysVisible={true}/>);
        expect(TestUtils.findRenderedDOMComponentWithClass(MyBack2Top, 'my-class-name')).to.exist;
    });

    it('custom onClick is executed', () => {
        let clicked = false;
        const MyBack2Top = TestUtils.renderIntoDocument(<Back2Top alwaysVisible={true}
                                                                  onClick={(e) => clicked = true}/>);
        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(MyBack2Top, 'a'));
        expect(clicked).to.be.true;
    });

});

describe('isNumber', () => {

    it('finds number objects properly', () => {
        expect(isNumber(3)).to.be.true;
        expect(isNumber('not a number')).to.be.false;
    })

});