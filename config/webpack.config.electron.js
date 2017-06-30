const { join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    entry: {
        app: './src/app.js'
    },
    node: {
        __dirname: false
    },
    output: {
        filename: '[name].js',
        path: join(__dirname, '../build')
    }
});
