
//'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    //页面入口文件配置
    entry: {
        app: [
            //刷新start
           // 'webpack/hot/dev-server',
           // 'webpack-dev-server/client?http://localhost:8080',
            //刷新end
            helpers.root('src', 'app/app.ts')
        ],
        vendor: helpers.root('src', 'js/vendor.ts'),
        polyfills: helpers.root('src', 'js/polyfills.ts')
    },
    module: {
        //加载器配置
        rules: [{
            //.css 文件使用 style-loader 和 css-loader 来处理
            test: /\.css$/,
            exclude: helpers.root('src', 'app'),
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
        }, {
            test: /\.css$/,
            include: helpers.root('src', 'app'),
            use: ['to-string-loader', 'css-loader?sourceMap']
        }, {
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader?sourceMap'
        }, {
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }, {
            //.js jsx 文件使用 babel-loader 来编译处理
            test: /\.js|jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            //tsx typescript 用来编译ng的
            test: /\.tsx?$/,
            use: [
                {
                  loader: 'awesome-typescript-loader',
                  options: { configFileName: helpers.root('tsconfig.json') }
                } , 'angular2-template-loader'
            ]
        }, {
            // support for .html as raw text
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    },
    //插件
    plugins: [

        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
          /angular(\\|\/)core(\\|\/)@angular/,
          helpers.root('./src'), // location of your src
          {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
          template: 'src/index.html'
        })
    ],
    //其它解决方案配置
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.ts', '.js', 'jsx', '.json', '.scss']
    }
};
