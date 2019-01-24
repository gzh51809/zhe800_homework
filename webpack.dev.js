"use strict";
const path = require('path');
const Htmlplugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

//修改配置后需要重启
module.exports = {

    //入口文件
    entry: {
        main: './src/index.js'
    },

    //出口文件
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: "[name].js?hash=[hash]"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, './src'),
                exclude: [
                    path.resolve(__dirname, './node_modules'),
                    path.resolve(__dirname, './src/server'),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react'],
                        plugins: [
                            ["import", {libraryName: "antd-mobile", style: "css"}]
                        ]
                    }
                }
            },

            //SCSS支持模块化加载，本地开发时使用，加载antd-mobile不可以使用模块化css
            {
                test: /\.(scss|css)$/,
                exclude: /node_modules|antd-mobile\.css/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: "sass-loader"
                    },
                    {
                        loader: 'pxrem-loader',
                        options: {
                            root: 72,
                            fixed: 8
                        }
                    }
                ]
            },

            //针对加载antd-mobile不启用模块化css
            {
                test: /\.css$/,
                include: /node_modules|antd-mobile\.css/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'pxrem-loader',
                        options: {
                            root: 36,
                            fixed: 8
                        }
                    }
                ]
            },

            //图片资源，图片的处理依赖fileLoader
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            //图片不转换成base64
                            limit: 10000
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            //压缩jpeg
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            //压缩png图片
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            //压缩gif图片
                            gifsicle: {
                                interlaced: false,
                            },
                            // //将JPG和PNG转换为webp
                            // webp: {
                            //     quality: 75
                            // }
                        }
                    }
                ]
            },

            //字体文件加载
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },

    //打包模式
    mode: "development",

    //开发服务器
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 4000,
        open: true,
        hot: true
    },

    //插件
    plugins: [
        new Htmlplugin({
            template: './src/index.html',
            inject: true,
            favicon: "./src/favicon.ico",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                useShortDoctype: true
            }
        }),
        new cleanPlugin('./dist'),
        new webpack.HotModuleReplacementPlugin()
    ],

    //别名
    resolve: {
        //以下后缀名文件import时不需要添加后缀名, js必写
        extensions: ['.jsx', '.json', '.js'],
    },

    //分包处理
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
};
