// 自定义hook(实现状态逻辑的复用,类似于class组件中的HOC), 记录光标位置的hook
import { useState, useEffect } from 'react'

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    document.addEventListener('mousemove', handleClick)

    return () => {
      document.removeEventListener('mousemove', handleClick)
    }
  }, [])

  // 返回这个状态
  return position
}

export default useMousePosition
