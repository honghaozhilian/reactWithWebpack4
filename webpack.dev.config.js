const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./webpack.common.config');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        app: [
            "babel-polyfill",
            'react-hot-loader/patch',
            path.join(__dirname,'src/index.js'),
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: 'static/js/[name].[hash].js'
    },
    devServer: {
        contentBase: path.join(__dirname,'./dist'),
        // host: 'localhost',
        port: 8088,
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        stats: 'errors-only',
        proxy: {
            '/api/*': "http://localhost:8090/$1"
        }
    },
    module:{
        rules:[
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 18,
                        name: '[name].[hash:8].[ext]',
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
                    },{
                        loader: 'sass-loader'
                    },
                    
                ],
                exclude: /node_modules/, 
                include: path.join(__dirname,'src'),
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            MOCK: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ]
};

const config = merge({
    customizeArray(a,b,key) {
        if(key == 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig,devConfig);

module.exports = config;