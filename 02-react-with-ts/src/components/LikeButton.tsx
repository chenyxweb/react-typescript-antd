import React, { FC, useState, useEffect } from 'react'

const LikeButton: FC = () => {
  const [count, setCount] = useState(0)
  const [btnStatus, setBtnStatus] = useState(true)

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
