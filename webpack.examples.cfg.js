/*global __dirname,module*/
/*eslint no-console:0 */

const path = require('path');
const srcPath = path.join(__dirname, 'src');
const examplesPath = path.join(__dirname, 'examples');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin');

const config = {
    entry: {
        examples: path.join(examplesPath, 'run')
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    cache: true,
    devtool: 'sourcemap',
    module: {
        rules: [
            {test: /\.html$/, loader: 'html-loader', include: [examplesPath], exclude: /base\.html$/},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {
                test: /\.(js|jsx)$/,
                include: [srcPath, examplesPath],
                exclude: /(node_modules|bower_components|lib)/,
                loaders: ['babel-loader']
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new NoEmitOnErrorsPlugin(),
        new AggressiveMergingPlugin(),
        new UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'React-Back2Top Button',
            description: 'React based back to top button',
            keywords: ['React', 'back', 'top', 'scroll-up'],
            template: path.join(examplesPath, 'base.html'),
            inject: 'body',
            filename: 'index.html',
            chunks: ['examples']
        })
    ]
};

module.exports = config;