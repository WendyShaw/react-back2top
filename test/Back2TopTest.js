/* global expect */
/* eslint no-console: 0 */
/* eslint-env node, mocha */
'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Back2Top from 'react-back2top';

describe('Form', function () {

    it('Everything Loads Normally', function () {
        expect(Back2Top).to.exist;
    });

});