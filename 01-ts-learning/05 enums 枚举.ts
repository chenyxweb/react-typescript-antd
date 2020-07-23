// 枚举
// 枚举是只读的
// 作用: 用来定义一些有名字的数字常量
// 枚举类型可以使用联合类型代替

// 数字枚举
enum Direction {
  // 未赋值从零开始递增, 赋值了后续递增
  Up = 10,
  Down,
  Left,
  Right,
}

console.log(Direction.Up) // 10
console.log(Direction[11]) // Down
// 字符串枚举
enum DirectionString {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

// 用法
const value = 'Up' // 计算所得
if (value === DirectionString.Up) {
  console.log('go up!!!')
}

// 常量枚举 可以提高性能,不会编译出一堆转化代码
const enum Colors {
  Red = '#ff0000',
  Blue = '#00ff00',
  Green = '#0000ff',
}
console.log(Colors.Blue) // console.log("#00ff00" /* Blue */)
