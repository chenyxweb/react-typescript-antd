// 接口

/**
 * ------------------ 接口 (interface) ---------------------
 * 作用: 用来定义object的数据类型
 *
 * 功能:
 * 1.对对象的形状(shape)进行描述;
 * 2.对类(class)进行抽象;
 * 3.Duck Typing(鸭子类型) -> 关注对象如何被使用,而不是对象类型本身
 *
 */

/**
 * 注意:
 * 定义首字母大写 Person
 * 属性之间是 分号 ; 隔开的  不是逗号 ,
 * 可选属性加 问号 ?
 * 只读属性前置修饰
 * readonly 和 const 的区别 : readonly用在属性上,const用在变量声明上
 */
interface Person {
  readonly id: number
  name: string
  age?: number // 可选属性
}

let chen: Person = {
  id: 12313,
  name: 'chen',
  // age: 24,
}
// chen.id = 123  // error
