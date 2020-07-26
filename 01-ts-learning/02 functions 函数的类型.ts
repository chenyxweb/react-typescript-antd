// 函数是一等公民: 1.作为值赋值给一个变量;2.作为参数传递给另一个函数;3.作为函数的返回值 (灵活性)
// 函数类型  对入参, 出参进行类型定义

/**
 * 规则:
 * 可选参数位于必填参数之后
 * 可选参数表示方式  问号 或者 给默认值
 * 注意:ts中在冒号后面的全是类型声明
 */
function add1(x: number, y: number, z?: number): number {
  // ------------------------- 方式一
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y
  }
}
add1(1, 2, 3)

function add2(x: number, y: number, z: number = 0): number {
  return x + y + z
}
add2(1, 2)

// 对add3 进行类型推论
const add3 = add1
// 等价于 (ts中在冒号后面的全是类型声明)
// ------------------------- 方式二
const add4: (x: number, y: number, z?: number) => number = add1
