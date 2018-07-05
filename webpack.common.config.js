const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            "babel-polyfill",
            path.join(__dirname,'src/index.js'),
        ]
    },
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[name].[chunkhash].js',
        publicPath : ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                }],
                exclude: /node_modules/,
                include: path.join(__dirname,'src'),
                
            },
        ]
    },
    resolve: {
        extensions: ['.js','.json'],
        modules: [ // 优化模块查找路径
            path.join(__dirname, 'src'),
            path.join(__dirname, 'node_modules')// 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
        ],
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router')
        }
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: true
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        
    ]
};