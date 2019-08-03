"use strict";

const path = require('path');
const Webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    return {
        entry: env.dev ? './src/_dev/index.tsx' : './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: ['style-loader', 'css-loader'],
                    exclude: /node_modules/
                },
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: 'awesome-typescript-loader',
                        options: {silent: true}
                    }],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['*', '.ts', '.js', '.tsx']
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'index.js',
            library: 'ReactLightChart',
            libraryTarget: "umd"
        },
        devServer: {
            contentBase: './src/_dev',
            hot: true
        },
        plugins: [env.dev ? new Webpack.HotModuleReplacementPlugin() : new UglifyJsPlugin()]
    };

};