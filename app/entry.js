/* 
* @Author: wxx
* @Date:   2017-04-24 16:33:35
* @Last Modified time: 2017-05-12 16:41:46
*/

// var styleCss = require("./style.css");     //commonJS写法
// var BootstrapCss = require("bootstrap");
// var cont = require("./content.js");
import './style';
window.$ = require("jquery");
import { sayHello, sayBye } from './content';     //es6的写法


// cont.sayHello('xiao '); 
// cont.sayBye('未完待续~');
sayHello('xiao');
sayBye('未完待续...');

$('#app').children('p').html("我是用jQuery方法写的~");

class myClass {
    constructor( name, age ) {
        this.name = name;
        this.age = age;
    }
    printName () {
        return this.name;
    }
    printAge () {
        return this.age;
    }
}
let myclass = new myClass('wff','23');
console.log(`${myclass.printName()} ${myclass.printAge()}`);

$('table').find('th').eq(0).html('Name');
$('table').find('th').eq(1).html('Age');
$('table tr').children('td').eq(0).html(myclass.printName());
$('table tr').children('td').eq(1).html(myclass.printAge());

const tmp1 = addrs => `
    <table border="1" width="20%">
    ${addrs.map( addr => `
        <tr><td>${addr.name}</td><td>${addr.age}</td></tr>
    `).join('')}
    </table>
`;
const data = [
    { name: 'wxx', age: '23' },
    { name: 'zl', age: '23'},
    { name: 'gyt', age: '24'},
    { name: 'jj', age: '22'},
    { name: 'wml', age: '24'}
];
$('#app').append(tmp1(data));
