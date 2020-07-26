// 接口

/**
 * ------------------ 接口 (interface) ---------------------
 * 功能:
 * 1.描述对象: 对对象进行抽象; 对其形状(shape--数据类型)进行描述;
 * 2.描述类: 对类(class)进行抽象; 规定类中必须要有什么属性或者方法
 * 3.Duck Typing(鸭子类型) -> 关注对象如何被使用,而不是对象类型本身
 * 4.接口的继承
 */

//  ----------------------- 1.描述对象 -----------------------
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

//  ----------------------- 2.描述类 -----------------------
interface Radio {
  switchRadio(): string
}

interface Battery {
  checkBatteryStatus(): void
}

// eg: 类Car和Cellphone都有开关收音机的方法,我们可以通过interface来约束这两个类,使得他们必须实现这个方法(类似于某种约束或者契约)
// 类使用 implements 实现接口约束
// 多个接口用逗号隔开
class Car implements Radio, Battery {
  switchRadio() {
    // do something
    return 'car done'
  }
  checkBatteryStatus() {}
}

// 4.接口的继承
interface RadioAndBattery extends Radio, Battery {
  switchRadioAndCheckBattery(): void
}

class Cellphone implements RadioAndBattery {
  switchRadio() {
    // do something
    return 'cellphone done'
  }
  checkBatteryStatus() {}
  switchRadioAndCheckBattery() {}
}
