const merge = require('webpack-merge');
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

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
                        loader: path.resolve(__dirname, './node_modules', 'happypack/loader') + '?id=happySass'
                    }
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
        // new ParallelUglifyPlugin({
        //     workerCount: 4,
        //     cacheDir: '.cache/',
        //     sourceMap: true,
        //     uglifyJS: {
        //         output: {
        //             beautify: false, // 不需要格式化
        //             comments: false // 保留注释
        //         },
        //         compress: { // 压缩
        //             warnings: false, // 删除无用代码时不输出警告
        //             drop_console: true, // 删除console语句
        //             collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
        //             reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        //         }
        //     }
        // }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HappyPack({ // 基础参数设置
            id: 'happySass', // 上面loader?后面指定的id
            loaders: [
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
            ], // 实际匹配处理的loader
            threadPool: happyThreadPool,
            // cache: true, // 已被弃用
            verbose: true
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    ]
};

const config = merge(commonConfig,prodConfig);

module.exports = config;