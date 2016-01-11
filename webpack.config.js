module.exports = {
    entry: './lib/index.js',
    output: {
        path: __dirname,
        filename: './dist/material-ui-back2top.js',
        library: 'material-ui-back2top',
        libraryTarget: 'var'
    },
    externals: {
        react: 'React'
    }
};
