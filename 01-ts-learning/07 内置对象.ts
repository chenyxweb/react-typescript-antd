// javaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型, 直接使用

// ECMAScript 的内置对象
let bool: Boolean = new Boolean(true)
let num: Number = new Number(123)
let str1: String = new String('123')
let e: Error = new Error('发生错误了')
let d: Date = new Date()
let m: Math = Math
let r: RegExp = /^[a-z]$/

// DOM 和 BOM 的内置对象
let body: HTMLElement = document.body
let divS: NodeList = document.querySelectorAll('div')
window.addEventListener('click', (e: MouseEvent) => {
  console.log(e.clientX)
})

// 用 TypeScript 写 Node.js
// Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件
// npm install @types/node --save-dev
