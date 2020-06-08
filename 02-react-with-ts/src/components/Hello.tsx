import React, { FC } from 'react'

interface IHelloProps {
  message?: string
}

const Hello: FC<IHelloProps> = ({ message }) => {
  return <h1>{message}</h1>
}

// 设置默认值
Hello.defaultProps = {
  message: 'hello world',
}

export default Hello
