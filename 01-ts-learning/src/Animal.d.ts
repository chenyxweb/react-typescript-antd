// 声明类
// declare class 语句也只能用来定义类型，不能用来定义具体的实现

declare class Animals {
  constructor(name: string)
  name: string
  sayHi(): string
}
