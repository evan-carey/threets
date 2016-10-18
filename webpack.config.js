var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var getPath = function (pathToFile) { return path.resolve(__dirname, pathToFile); }

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = (function makeWepackConfig() {
    var config = {};
    config.entry = {
        'app': './app/src/main.ts',
        // 'vendor': './app/src/vendor.ts'
    };

    config.output = {
        path: getPath('./dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: isProd ? '/' : 'http://localhost:8080/'
    };

    config.devtool = 'source-map';

    config.resolve = {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    };

    config.module = {
        loaders: [
            {
                // TS LOADER
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                include: [
                    getPath('app/src')
                ]
            }, {
                // CSS LOADER
                test: /\.s?css$/,
                loader: 'style!css!sass'
            }, {
                // GLSL SHADER LOADER
                test: /\.(glsl|vs|fs|vert|frag)$/,
                loader: 'shader'
            }, {
                // HTML LOADER
                test: /\.html$/,
                loader: 'raw',
                exclude: /(index)/
            }
        ]
    };

    config.postcss = [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ];

    config.glsl = {
        chunkPath: __dirname + "/shaders"
    };
    config.plugins = [
        new HtmlWebpackPlugin({
            template: getPath('./app/index.html'),
            inject: 'body'
        })
    ];

    if (isProd) {
        config.plugins.push(
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Minify all JS, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin()
        )
    }

    config.devServer = {
        contentBase: './app'
    };

    return config;
})();