const path = require('path');

const srcPath = path.join(__dirname, 'src');
const testPath = path.join(__dirname, 'test');

module.exports = function (config) {
    config.set({
        basePath: './',
        browsers: ['PhantomJS'],
        files: [
            'test/**/*Test.js'
        ],
        preprocessors: {
            'test/**/*Test.js': ['webpack', 'sourcemap']
        },
        captureTimeout: 60000,
        frameworks: ['phantomjs-shim', 'mocha', 'chai'],
        client: {
            mocha: {},
            captureConsole: false
        },
        singleRun: true,
        reporters: ['mocha'], //, 'coverage'
        webpack: {
            node: {
                fs: 'empty'
            },
            modulesDirectories: [
                'node_modules'
            ],
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['', '.js', '.jsx'],
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
            debug: false,
            stats: {
                colors: true,
                reasons: true
            },
            progress: true
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
