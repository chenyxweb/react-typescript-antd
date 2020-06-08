// useRef 的使用
import React, { useRef, useEffect } from 'react'

const UseRefDemo = () => {
  const didMountRef = useRef(false)
  // 泛型声明input元素
  const inputRef = useRef<HTMLInputElement>(null)

  const count = useRef(0)
  let count1 = 0

  // 2. 模拟componentDidUpdate
  useEffect(() => {
    if (didMountRef.current) {
      // 重新渲染
      // console.log('update')
    } else {
      // 第一次渲染
      console.log('didMount')
      didMountRef.current = true
    }
  })

  return (
    <div>
      {/* 1. input获取焦点 */}
      <input type='text' ref={inputRef} />
      <br />
      <button
        onClick={() => {
          inputRef.current?.focus()
        }}
      >
        input框获取焦点
      </button>
      <br />

      {/*  */}
      {/* 3. 初始化非响应式的数据 */}
      <button
        onClick={() => {
          count.current++
          count1++
          console.log(count.current) // 组件重新渲染,不会影响count的数据
          console.log(count1) // 组件重新render后,count1就会恢复到0
        }}
      >
        count++
      </button>
    </div>
  )
}

export default UseRefDemo
