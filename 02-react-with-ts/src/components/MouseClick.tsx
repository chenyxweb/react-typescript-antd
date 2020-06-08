import React, { FC, useState, useEffect } from 'react'

const MouseClick: FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // 需要清除的effect
  // 当effect内有定时器时,需要清除定时器
  // 默认情况下, 每次渲染都会重新执行 useEffect , 重新执行return内的回调函数
  // useEffect 不会阻塞渲染, 会在渲染完成之后执行
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    // 添加事件
    console.log('addEvent')
    document.addEventListener('click', handleClick)

    // 移除事件
    // 添加依赖, 仅当依赖项发生改变是 effect 才会重新生效
    // 加一个空的依赖,此时相当于componentWillUnmount, 组件卸载的时候才会执行

    return () => {
      console.log('removeEvent')
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // console.log('render-MouseClick')

  return <div>{`x: ${position.x} , y: ${position.y}`}</div>
}

export default MouseClick
