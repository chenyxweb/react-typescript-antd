/**
 * 泛型generics  ---难点
 * 作用:让类型声明变得更加灵活
 * 像一个占位符,定义的时候不指定类型,而是在使用的时候动态的指定类型
 * 使用场景: 1.函数的参数和返回值中使用泛型 2.类和接口中使用泛型
 */

//
// --------------- 1.函数的参数和返回值中使用泛型 ---------------
// function echo(arg) {
//   return arg
// }
// const res = echo('123') // 返回值的类型将会丢失

function echo<T>(arg: T): T {
  return arg
}
const res = echo('123') // res 的类型会根据我们传入的参数确定

// eg: 交换数组两项的位置
// 这种方式只能指定确定的两种数据类型,通过泛型就可以用解决这个问题
// function exchange(arg: [number, string]): [string, number] {
//   return [arg[1], arg[0]]
// }
// const res1 = exchange([123, '123'])

function exchange<T, U>(arg: [T, U]): [U, T] {
  return [arg[1], arg[0]]
}
const res1 = exchange([true, '123'])

//
// ---------- 约束泛型 -----------
// 作用: 让传入值满足特定的约束条件

interface WithLength {
  length: number
}

// 使用 extends 关键字约束
function echoWithLength<T extends WithLength>(arg: T): T {
  // 规定有length属性的值才能被传入函数
  let length = arg.length
  console.log(length)
  return arg
}

echoWithLength('123')
echoWithLength([1, 2, 3])

//
//
// ---------------------- 2.类和接口中使用泛型 ----------------------

// 2.1 类中使用泛型
// 场景 : 让入队列和出队列的数据类型保持一致
class Queue<T> {
  private arr: T[] = []
  // 入队列
  queueIn(item: T) {
    return this.arr.push(item)
  }

  // 出队列
  queueOut(): T {
    return <T>this.arr.shift()
  }
}

// 类实例化的时候需要指定泛型的具体类型
const queue = new Queue<number>()
console.log(queue.queueIn(123))
console.log(queue.queueOut().toFixed(2)) // 此时会进行准确的代码提示

const queue2 = new Queue<string>()
console.log(queue2.queueIn('123'))
console.log(queue2.queueOut().split(''))

// 2.2 接口中使用泛型---让接口约束的类型变得灵活,可以用来复用
// eg:写死的接口,无法重复利用,不灵活
// interface KV {
//   key: string
//   value: number
// }
// let kv1: KV = { key: 'age', value: 18 }

// eg:使用泛型改造过后的接口
interface KV<T, U> {
  key: T
  value: U
}

const kv1: KV<string, number> = { key: 'age', value: 18 }
const kv2: KV<number, string> = { key: 123, value: 'code' }
// 应用 -- 声明数组
const arrayOfNumber: Array<number> = [1, 2, 3]
const arrayOfString: Array<string> = ['a', 'b', 'c']

//
// 描述一个函数的类型
interface IPlus<T> {
  (a: T, b: T): T
}

const plus: IPlus<number> = (m, n) => {
  return m + n
}
console.log(plus(123, 123))

const concat: IPlus<string> = (a, b) => {
  return a + b
}
console.log(concat('123', '123'))

const plusCopy: IPlus<number> = plus
console.log(plusCopy(123, 456))
