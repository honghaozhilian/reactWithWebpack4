const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

const devConfig = {
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
        port: 8080,
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
                }]
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
                ]
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
                    
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            MOCK: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        
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