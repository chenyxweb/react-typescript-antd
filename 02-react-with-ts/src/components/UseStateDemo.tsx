import React, { FC, useState } from 'react'

const UseStateDemo: FC = () => {
  const [count, setCount] = useState(0)
  const [btnStatus, setBtnStatus] = useState(true)

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

export default UseStateDemo
