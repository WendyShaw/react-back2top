/*global __dirname,module*/

const path = require('path');
const srcPath = path.join(__dirname, 'src');
const testPath = path.join(__dirname, 'test');

module.exports = function (config) {
    config.set({
        basePath: './',
        browsers: ['jsdom'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
        concurrency: Infinity,
        frameworks: ['mocha', 'chai'],
        files: [
            'test/**/*Test.js'
        ],
        preprocessors: {
            'test/**/*Test.js': ['webpack', 'sourcemap']
        },
        captureTimeout: 60000,
        client: {
            mocha: {},
            captureConsole: false
        },
        reporters: ['mocha'], //, 'coverage'
        webpack: {
            node: {
                fs: 'empty'
            },
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['.js', '.jsx'],
                alias: {
                    'react-back2top': srcPath
                }
            },
            module: {
                loaders: [
                    {
                        test: /\.(js|jsx)$/,
                        include: [srcPath, testPath],
                        exclude: /(node_modules|bower_components|examples)/,
                        loaders: ['babel-loader']
                    }
                ]
            },
            stats: {
                colors: true,
                reasons: true
            }
        },
        webpackServer: {
            noInfo: true
        },
        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false
            }
        },
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'html'},
                {type: 'text'}
            ]
        }
    });
};
