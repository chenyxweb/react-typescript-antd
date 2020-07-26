/**
 * 1. 交叉类型
 * 2. 联合类型
 * 3. 类型别名
 * 4. 类型断言
 * 5. Utility Types
 */

interface A {
  id: number
  name: string
  age?: number
}

interface B {
  sex: 'male' | 'female'
  height?: number
}

// 1. 交叉类型 (Intersection Types) : 将多个类型合并为一个类型, 与的关系
type IntersectionType = A & B
const xh: IntersectionType = {
  id: 9527,
  name: '小红',
  sex: 'female',
}

// 2. 联合类型 (Union Types) : 多个类型选其一, 或的关系
let numOrStr: number | string = '123'
numOrStr = 123123

// 可选类型
function f(x: number, y?: number) {
  return x + (y || 0)
}
f(123, NaN)
f(123)

// 3. 类型别名 ( type aliases )
// 类型别名为类型创建新名称,创建的是引用,不创建新的
type strType = string
type fnType = (name: string) => void
type strOrFnType = strType | fnType

type PlusType = (x: number, y: number) => number

const plus1: PlusType = (x, y) => {
  return x + y
}
const plus2: PlusType = (x, y) => {
  return x + y
}

// 联合类型中使用类型别名
type Fn = () => string
type FnOrString = string | Fn

function getName(n: FnOrString): string {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}

// 类型别名可以像接口一样,使用泛型
type valueType<T> = {
  value: T
}
const value1: valueType<string> = {
  value: '14',
}

// 4. 类型断言 ( type assertion )
// 4.1 as 语法
function getLength1(input: string | number): number {
  if ((input as string).length) {
    return (input as string).length
  } else {
    return (input as number).toString().length
  }
}

// 4.2 <类型>值 语法
function getLength2(input: string | number): number {
  if ((<string>input).length) {
    // 字符串时
    return (<string>input).length
  } else {
    // 数字时
    return (<number>input).toString().length
  }
}

// 5. Utility Types
// 5.1 Partial<T>  生成一个类型,让所有的属性变成可选
const partialType: Partial<A & B> = {
  // id: 123,
}

// 5.2 Required<T>  生成一个类型,让所有的属性变成必选
const requiredType: Required<A & B> = {
  id: 123132,
  name: 'zh',
  age: 18,
  sex: 'male',
  height: 180,
}
