const merge = require('webpack-merge');
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
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
                        publicPath: '/static/images/',
                        outputPath: 'static/images/'
                    },
                }],
                exclude: /node_modules/, 
                include: path.join(__dirname,'src'),
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },{
                        loader: 'postcss-loader'
                    },
                ],
                include: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
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
                ],
                exclude: /node_modules/,
                include: path.join(__dirname,'src'),
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
                    
                ],
                exclude: /node_modules/, 
                include: path.join(__dirname,'src'),
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash].css',
            chunkFilename: 'static/css/[name][id].[hash].css',
        }),
        new ParallelUglifyPlugin({
            workerCount: 4,
            uglifyJS: {
                output: {
                    beautify: false, // 不需要格式化
                    comments: false // 保留注释
                },
                compress: { // 压缩
                    warnings: false, // 删除无用代码时不输出警告
                    drop_console: true, // 删除console语句
                    collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    ]
};

const config = merge(commonConfig,prodConfig);

module.exports = config;