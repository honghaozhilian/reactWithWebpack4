const merge = require('webpack-merge');
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require('./webpack.common.config');
const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module:{
        rules:[
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 18,
                        name: '[name].[hash:8].[ext]',
                        publicPath: '../images/',
                        outputPath: 'static/images/'
                    },
                }]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[path]__[name]__[local]__[hash:base64:5]'
                        }
                    },{
                        loader: 'postcss-loader'
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[path]__[name]__[local]__[hash:base64:5]'
                        }
                    },{
                        loader: 'postcss-loader'
                    },{
                        loader: 'sass-loader'
                    },
                    
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash].css',
            chunkFilename: 'static/css/[name][id].[hash].css',
        })
    ]
};

const config = merge(commonConfig,prodConfig);

module.exports = config;