import React, { FC, useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../App'

const LikeButton: FC = () => {
  const [count, setCount] = useState(0)
  const [btnStatus, setBtnStatus] = useState(true)

  const theme = useContext(ThemeContext)
  console.log('theme: ', theme)

  const style = {
    color: theme.color,
    backgroundColor: theme.background,
  }

  // 不需要清除的effect
  // 默认情况下,每次渲染都会执行useEffect
  useEffect(() => {
    document.title = `点击了 ${count} 次`
  })

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
        style={style}
      >
        累加器+1: {count}
      </button>
      <br />
      <button
        style={{ backgroundColor: btnStatus ? '#fff' : '#ccc' }}
        onClick={() => {
          setBtnStatus(!btnStatus)
        }}
      >
        {btnStatus ? 'ON' : 'OFF'}
      </button>
    </div>
  )
}

export default LikeButton
