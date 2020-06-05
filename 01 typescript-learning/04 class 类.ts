// 类

/**
 * 修饰符
 * public  默认为public, 谁都能访问
 * protected  类的内部才能访问
 * private  类和子类的内部能访问
 * static  静态属性(方法) 与实例没有什么关系时使用, 直接通过类调用, 不会被实例继承
 *
 * 构造函数中的 super 和 this : super访问父类   this访问父类和自己
 * 重写构造函数 需要 super()
 */

//  ------------- ES5 ------------------
// function Animal(name) {
//   this.name = name
// }

// Animal.prototype.run = function () {
//   console.log(`${this.name} is running`)
// }

//  ------------- ES6 ------------------
class Animal {
  name: string

  // 静态属性
  static categories: string[] = ['mammal', 'bird', 'fish', 'Amphibians', 'insect']
  // 静态方法
  static isAnimal(a) {
    console.log(a instanceof Animal)
  }

  // constructor 构造器 : 对应es5的构造函数
  constructor(name: string) {
    this.name = name
  }

  // 对应es5中往构造函数的prototype中添加方法
  run() {
    return `${this.name} is running`
  }
}

const python = new Animal('lucy')
// python.name  //error 属性“name”为私有属性，只能在类“Animal”中访问
python.run()

// 静态属性和方法的使用, 直接通过类进行调用
console.log(Animal.categories)
Animal.isAnimal(python)

// ------------------继承------------------
class Dog extends Animal {
  bark() {
    // 直接通过this访问父类和自己的属性或方法
    console.log(`${this.name} is barking`)
  }
}

const KeJi = new Dog('小灰灰')
KeJi.bark()

// -----------------重写构造函数和方法-----------------
class Cat extends Animal {
  constructor(name: string) {
    // 重写构造函数 需要 super()
    // super(props)
    super(name)
    console.log(this.name)
  }

  // 重写父类的run方法
  run() {
    // 通过super.run 拿到父类的方法
    return 'cat, ' + super.run()
  }
}

const mimi = new Cat('mimi')
console.log(mimi.run())
