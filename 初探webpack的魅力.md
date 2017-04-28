# 初探webpack的魅力
### 1.什么是webpack？
#### webpack是目前最流行的模块打包工具，它的作用是把相互依赖的模块处理成静态资源。它可以将`js`、`jsx`、`coffee`、`less`、`sass`和图片等作为模块来处理和使用(被模块化的不仅仅是js了)；它还可以使用`Loader`（加载器）把`images`转换成url形式的数据。不同的文件对应着不同的加载器，使用加载器我们可以直接在js文件中`require`来加载各种文件，比如：
```
 require('reset.css');
 require('index.js');
 require('img.png');
```
### 2.webpack的特点
- 一切皆为模块；
- 兼容多模块风格；
- 静态解析、按需打包、动态加载。
### 3.安装webpack
#### 首先要先安装'node.js'同时包管理器npm也会随node.js一起安装
```$ npm install webpack -g
```
#### 将依赖写入package.json包
```
npm init
npm inatall webpack --save-dev
```
### 4.简单的使用实例
#### 新建一个文件夹，在文件夹下创建一个静态页面`index.html`和一个入口文件`entry.js`:
##### 在index.html里引入`bundle.js`文件
```
	<html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
        </body>
    </html>
```
##### 在`entry.js`中写入：
```
document.wirte("It works!");
```
##### 然后在命令行执行(编译entry.js并打包到bundle.js)：
```
$ webpack ./entry.js bundle.js
```
##### 然后在浏览器里打开`index.html`会看到 It works!
#### 接下来添加一个模块`module.js`,并修改入口`entry.js`:
##### 在`module.js`中写入：
```
module.exports = "It works from module.js!";
```
##### 在`entry.js`中修改：
```
document.write(require("./module.js"));       //添加模块
```
##### 重新打包到`bundle.js`:
```
$ webpack ./entry.js bundle.js
```
##### 再次刷新页面会显示：It works from module.js!
