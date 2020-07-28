import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Input } from '../components/Input/input'
import Icon from '../components/Icon/icon'

// 默认 Input
const InputDefault = () => {
  const [inputValue, setInputValue] = useState('')
  return (
    <Input
      placeholder='默认Input'
      defaultValue={inputValue}
      value={inputValue}
      style={{ width: 300 }}
      onChange={e => setInputValue(e.currentTarget.value)}
    />
  )
}

// 禁用的按钮
const disabledInput = () => {
  return <Input disabled style={{ width: 300 }} />
}

// 有图标的Input
const iconInput = () => {
  return <Input icon='search' style={{ width: 300 }} />
}

// 不同大小的 Input
const sizeInput = () => {
  return (
    <>
      <Input size='sm' style={{ width: 300 }} />
      <Input style={{ width: 300 }} />
      <Input size='lg' style={{ width: 300 }} />
    </>
  )
}

// 有前后缀的 Input
const pendInput = () => {
  return (
    <>
      <Input style={{ width: 300 }} prepend='用户名' />
      <Input style={{ width: 300 }} prepend={<Icon icon='user' />} />
      <Input style={{ width: 300 }} prepend={<Icon icon='user-lock' />} />
      <Input style={{ width: 300 }} append='.com' />
      <Input style={{ width: 300 }} append={<Icon icon='life-ring' />} />
    </>
  )
}

storiesOf('Input', module)
  // 可以放在组件(input.tsx)上方注释
  // .addParameters({
  //   info: {
  //     text: `
  //       ### 引入
  //       ~~~js
  //       import { Icon } from 'chen-antd'
  //       ~~~
  //       `,
  //   },
  // })
  .add('默认 Input', InputDefault)
  .add('禁用的 Input', disabledInput)
  .add('有图标的 Input', iconInput)
  .add('不同大小的 Input', sizeInput)
  .add('有前后缀的 Input', pendInput)
