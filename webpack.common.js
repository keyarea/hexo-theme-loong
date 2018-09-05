const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname,'src/js/main.js')
    },
    plugins: [
        new CleanWebpackPlugin(['source']),
        new HtmlWebpackPlugin()
    ],
    output: {
        path: path.resolve(__dirname,'source'),
        publicPath: "./",
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader?cacheDirectory',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: [require('@babel/plugin-proposal-object-rest-spread')]
                }
            }
        }

        ]
    }
}