const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let minifyHTML = {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyJS:true
}

let pathToClean = [
    'source'
]

let cleanOptions = {
    watch: true,
    exclude: ['source/assets']
}



module.exports = {
    entry: { //入口文件
        main: path.resolve(__dirname,'src/js/main.js')
    },
    plugins: [  //插件配置节点
        new CleanWebpackPlugin(pathToClean, cleanOptions),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            //chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            cache: false,
            minify: minifyHTML,
            template: path.resolve(__dirname,'src/script.ejs'),
            filename: path.resolve(__dirname,'layout/_partial/script.ejs')
        }),
        new HtmlWebpackPlugin({
            inject: false,
            cache: false,
            minify: minifyHTML,
            template: path.resolve(__dirname,'src/css.ejs'),
            filename: path.resolve(__dirname,'layout/_partial/css.ejs')
        })
    ],
    output: { //指定输出选项
        path: path.resolve(__dirname,'source'),   //输出路径
        publicPath: "./",
        filename: "[name].[chunkhash:6].js"       //指定输出文件的名称
    },
    module: {  //第三方loader模块
        rules: [  //第三方模块匹配规则
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader?cacheDirectory',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/transform-runtime']
                    }
               }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        fallback: 'file-loader',
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|otf|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:6].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            }


        ]
    }
}