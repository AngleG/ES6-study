/* 
* @Author: wxx
* @Date:   2017-04-25 14:57:32
* @Last Modified time: 2017-04-28 09:03:52
*/
var webpack = require("webpack");
var path = require("path");
module.exports = {
    //页面入口文件配置
    entry: "./entry.js", 
    //入口文件输出配置 
    output: {
        path: path.resolve("./dist/js"),     //打包后文件存放的位置  *path.resolve()的作用是把相对路径改为绝对路径
        filename: "bundle.js"
    },
    module: {
    //加载器配置  告知webpack每一种文件都需要什么加载器来处理
        loaders: [
            {test: /\.jade$/, loader: "jade-loader"},
            //css文件使用 style-loader和css-loader来处理
            {test: /\.css$/,loader: "style-loader!css-loader"},
        ]
    },
    plugins:[
            
            new webpack.BannerPlugin('This file is create by wxx.')
        ]
}