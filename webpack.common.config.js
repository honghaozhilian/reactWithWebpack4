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

                include: path.join(__dirname,'src'),
                
            },
        ]
    },
    resolve: {
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