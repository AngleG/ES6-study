# ES6-study
前言：由于该文档是在上一个webpack-study项目的基础上写的，所以有很多相似之处，通过对比你就可以发现，之前的写法使用的是commonJs规范，而现在使用的是ES6规范的写法。
>commonJS规范：该规范的主要内容是，模块必须通过module.exports导出对外的接口或变量，通过require()来导入其他模块的输出到当前模块的作用域当中。

接下来说一些比较重要的知识点吧：
#### Babel转码器
`Babel`可以将ES6代码转为ES5代码，这意味着你可以用ES6的方式编写程序，又不用带薪现有环境是否支持。

举个例子：
```
//转码前
array.map(x => x * 2);

//转码后
array.map( function (x) {
        return x * 2;
});
```

##### 配置文件.babelrc
Babel的配置文件是`.babelrc`,好像window系统下直接右键创建文本文档的时候，后缀名之前不能为空，但是我百度后学会了个快速创建该类文件的小技巧，你可以直接输入`.babelec.`然后回车就可以成功的创建改文件了。改文件是存放在项目的根目录下的，使用`Babel`之前必须要先配置改文件的哦~

###### 首先，我们先来安装下常用的转码规则和插件
```
$ npm install --save-dev babel-loader babel-core babel-preset-react babel-es2015
```

然后将这些规则加入`.babelrc`
```
{
    "presets": [
        "es2015",
        "react"
    ],
    "plugins": []
}
```

注：`presets`设定转码规则

最后再配置webpack.config.js文件：
```
module: {
    loaders: [
        {test: /\.js$/, loader: "babel-loader", query: {presets: ['es2015']} }
    ]
}
```

好了，以后我们就可以在入口文件里编写ES6代码喽~

#### 1.let和const命令
##### let命令
let命令用来声明变量，类似于var，但是用let声明的变量只在let所在的代码块内有效。例如：
```
{
    let a = 1;
    var b = 5;
}
console.log(a);      // a is not defined
console.log(b);      // 5
```
###### let的特点：
- 不存在变量提升(var则存在);
    ```
    //let的情况
    console.log(a);     // ReferenceError
    let a = 10;

    //var的情况
    console.log(b);     // undefined
    var b = 5;
    ```

- 暂时性死区;
    >在代码块儿内使用let命令声明变量之前，该变量都是不可用的，这在语法上称为“暂时性死区”(简称TDZ)
    ```
    if(true) {
        //死区开始
        x = 'abc';    // ReferenceError
        console.log(x);

        let x;     //死区结束
        console.log(x);    // undefined
        
        x = 2;
        console.log(x);    // 2
    }
    ```
- 不允许重复声明(不允许在相同的作用域内重复声明)。

    ```
    //报错
    function () {
        let a = 1;
        var a = 2;
    }

    //报错
    function () {
        let a = 1;
        let a = 10;
    }
    ```

##### const命令
const命令声明一个只读的常量，一旦声明，该常量的值就不可改变。
```
const a = 5;
a = 10;    //TypeError...
```

const声明的变量不能改变它的值，所以const一旦声明变量，就必须立即初始化。
```
const m;       //  报错
```
注意：const声明的变量并不是不得改动变量的值，而是变量指定的那个内存地址不得改动。如：
```
const obj = {};

obj.prop = 123;
console.log(obj.prop);    // 123

obj = {name: 'wxx'};         // TypeError: "foo" is read-only
```

###### const的特点：
- 不存在变量提升;
- 存在暂时性死区;
- 不允许重复声明。
