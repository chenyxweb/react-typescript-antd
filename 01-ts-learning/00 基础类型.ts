/**
 * 1. ts中的常用数据类型 number string boolean undefined null bigInt Symbol any array 元组(Tuple) ...
 * 2. 类型推论
 * 3. 联合类型
 * 4. 交叉类型
 */

// ------------------------ 1. 数据类型 ------------------------
let isDone: boolean = true

let age: number = 24
let hexLiteral: number = 0xf00d // 16进制
let binaryLiteral: number = 0b1010 // ES6 中的二进制表示法
let octalLiteral: number = 0o744 // ES6 中的八进制表示法

let notANum: number = NaN
let infinityNum: number = +Infinity

let username: string = 'chen'
let info: string = `my name is ${username}, ${age} years old` // 模板字符串

let u: undefined = undefined
let n: null = null
// undefined 和 null 是任何类型的子类型(子集)
// let num1: number = undefined
// let num2: number = null

let bigI: bigint = 1213123123132n
let sym: symbol = Symbol('123')
console.log(Symbol('123') == Symbol('123')) // false

let notSure: any = 18
notSure = 'string'
notSure = true
notSure.aaa
// notSure.getName()
// ...

// 数组类型表示方法:  类型[]  或者  接口<类型>
let arrOfNumber: number[] = [1, 2, 3]
let arrOfString: Array<string> = ['123', '456'] // 数组泛型

// 接口表示数组
interface myArray {
  [index: number]: number
}
let arrOfNum: myArray = [1, 2, 3]

// 类数组（Array-like Object） 如 arguments
function test() {
  console.log(arguments)
  arguments.length
}

// 元组 Tuple
let userInfo: [string?, number?] = ['chen', 24]

// ------------------------ 2. 类型推论 ------------------------
let str = '123' //  str 被推论为 string 类型
// str = 123  // error

// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
let noop // noop 被推论成 any 类型
noop = 123
noop = '123'

// ------------------------ 3. 联合类型 ------------------------
// 联合类型（Union Types）表示取值可以为多种类型中的一种
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
let numberOrString: number | string
numberOrString = '123' // string
numberOrString.length
numberOrString = 24 // number
// numberOrString.length // error

let unionDemo: number | Array<number> | string = 123 // 可以声明类型的同时进行赋值操作
unionDemo = [1, 2, 3, 4]

// ------------------------ 4. 交叉类型 ------------------------
