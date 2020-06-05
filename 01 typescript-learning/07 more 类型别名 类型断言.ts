// ----------------- 类型别名 type aliases -------------------------

// function plus1(x: number, y: number): number {
//   return x + y
// }
// function plus2(x: number, y: number): number {
//   return x + y
// }

type PlusType = (x: number, y: number) => number

const plus1: PlusType = (x, y) => {
  return x + y
}
const plus2: PlusType = (x, y) => {
  return x + y
}

// -------------------- 联合类型中使用类型别名 ----------------------------
// type comStrAndNum = string | number  // 联合类型

type Fn = () => string
type FnOrString = string | Fn

// const getName = (n: FnOrString): string => {
//   if (typeof n === 'string') {
//     return n
//   } else {
//     return n()
//   }
// }

function getName(n: FnOrString): string {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}

// ----------------- 类型断言 type assertion ----------------------------

// as 语法
function getLength1(input: string | number): number {
  if ((input as string).length) {
    return (input as string).length
  } else {
    return (input as number).toString().length
  }
}

// <类型>值 语法
function getLength2(input: string | number): number {
  if ((<string>input).length) {
    // 字符串时
    return (<string>input).length
  } else {
    // 数字时
    return (<number>input).toString().length
  }
}
