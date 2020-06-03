// ts中数据类型

let isDone: boolean = true

let age: number = 24

let username: string = 'chen'
let info: string = `my name is ${username}, ${age} years old`

let u: undefined = undefined

let n: null = null

let num1: number = undefined
let num2: number = null

let notSure: any = 18
notSure = 'string'
notSure = true
notSure.aaa
notSure.getName()
// ...

// 联合类型
let numberOrString: number | string = '123'
numberOrString = 24

// 数组: 类型[]
let arrOfNumbers: number[] = [1, 2, 3]
let arrOfString: Array<string> = ['123', '456']

function test() {
  console.log(arguments)
}

// 元组
let userInfo: [string?, number?] = ['chen', 24]

// 类型推论
let str = '123'
// str = 123  // error
