import React, { FC } from 'react'

interface IHelloProps {
  message?: string
}

const Hello: FC<IHelloProps> = ({ message }) => {
  return <h3>{message}</h3>
}

// 设置默认值
Hello.defaultProps = {
  message: 'hello world',
}

export default Hello
