# ES6-study
前言：由于该文档是在上一个webpack-study项目的基础上写的，所以有很多相似之处，通过对比你就可以发现，之前的写法使用的是commonJs规范，而现在使用的是ES6规范的写法。
>commonJS规范：该规范的主要内容是，模块必须通过module.exports导出对外的接口或变量，通过require()来导入其他模块的输出到当前模块的作用域当中。

接下来说一些比较重要的知识点吧：
## Babel转码器
`Babel`可以将ES6代码转为ES5代码，这意味着你可以用ES6的方式编写程序，又不用担心现有环境是否支持。

举个例子：
```
//转码前
array.map(x => x * 2);

//转码后
array.map( function (x) {
        return x * 2;
});
```

### 配置文件.babelrc
Babel的配置文件是`.babelrc`,好像window系统下直接右键创建文本文档的时候，后缀名之前不能为空，但是我百度后学会了个快速创建该类文件的小技巧，你可以直接输入`.babelec.`然后回车就可以成功的创建该文件了。该文件是存放在项目的根目录下的，使用`Babel`之前必须要先配置该文件的哦~

#### 首先，我们先来安装下常用的转码规则和插件
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

## 1.let和const命令
### let命令
let命令用来声明变量，类似于var，但是用let声明的变量只在let所在的代码块内有效。例如：
```
{
    let a = 1;
    var b = 5;
}
console.log(a);      // a is not defined
console.log(b);      // 5
```
#### let的特点：
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

### const命令
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

#### const的特点：
- 不存在变量提升;
- 存在暂时性死区;
- 不允许重复声明。

## 块级作用域
ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。比如：内层变量可能会覆盖外层变量。
```
var tmp = new Date();
function f(){
    console.log(tmp);
    if(false){
        var tmp = 'hello world'
    }
}
f();     // undefined
```

分析：首先会变量提升，全局的tmp和f(),然后tmp初始化，接着就是执行f()函数，在函数f()内部也是先进行变量提升tmp，然后执行打印语句，因此此时的tmp是undefined，不管if的条件语句是ture或false，它都会打印Undefined。
#### 块级作用域的特点：
- ES6允许块级作用域的任意嵌套；
- 外层作用域无法读取内层作用域的变量；
- 内层作用域可以定义外层作用域的同名变量。

## class
类的数据类型就是函数，类本身就指向构造函数。使用的时候也是对类使用new命令，跟构造函数用法一致。
```
class Person {
    printName () {
        console.log('journey');
    }
}
var p = new Person();
p.printName();     // journey
```

事实上，类的所有方法都定义在类的prototype属性上面。
```
class Point {
  constructor(){
    // ...
  }

  toString(){
    // ...
  }

  toValue(){
    // ...
  }
}

// 等同于

Point.prototype = {
  toString(){},
  toValue(){}
};
```
在类的实例上面调用方法，其实就是调用原型上的方法。
```
class B {}
let b = new B();

b.constructor === B.prototype.constructor // true
```
b是B类的实例，它的constructor方法就是B类原型的constructor方法。
## 变量的解构赋值
### 1.数组的解构赋值
例如：
```
let [a, b, c] = [1, 2, 3];
```
本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

嵌套数组进行解构：
```
let [a, [[b], c]] = [1, [[2], 3]];
a // 1
b // 2
c // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

//如果解构不成功，变量的值就等于undefined
let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```
解构赋值允许指定默认值:
```
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```
如果一个数组成员不严格等于undefined，默认值是不会生效的。
### 2.对象的解构赋值
```
let { x, y } = { x: "aaa", y: "bbb" };
x // "aaa"
y // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```
对象的解构赋值的内部机制，是先找到 **同名属性** ，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```
注：foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

### 3.字符串的解构赋值
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
改笔记在日后的学习中还会逐渐完善，因为ES6里边还有很多要学东西。