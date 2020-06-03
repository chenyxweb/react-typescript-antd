// 函数
// 对入参, 出参进行类型定义

/**
 * 可选参数位于必填参数之后
 * 可选参数表示方式  问号 或者 给默认值
 * 注意:ts中在冒号后面的全是类型声明
 */
function add1(x: number, y: number, z?: number): number {
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y + z
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
const add4: (x: number, y: number, z?: number) => number = add1
