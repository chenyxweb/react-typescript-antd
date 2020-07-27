import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon } from '../components/Icon/icon'

// 不同类型的Icon图标
const defaultIcon = () => {
  return (
    <>
      <Icon icon='arrow-up' size='5x' theme='success'></Icon>&nbsp;
      <Icon icon='align-left' size='5x' theme='success'></Icon>&nbsp;
      <Icon icon='award' size='5x' theme='success'></Icon>&nbsp;
    </>
  )
}

// 不同大小的Icon
const sizedIcon = () => {
  return (
    <>
      <Icon icon='baby-carriage' size='2x' theme='success'></Icon>&nbsp;
      <Icon icon='align-left' size='5x' theme='success'></Icon>&nbsp;
      <Icon icon='award' size='10x' theme='success'></Icon>&nbsp;
    </>
  )
}

// 不同颜色的Icon图标
const coloredIcon = () => {
  return (
    <>
      <Icon icon='battery-full' size='5x' theme='danger'></Icon>&nbsp;
      <Icon icon='align-left' size='5x' theme='primary'></Icon>&nbsp;
      <Icon icon='award' size='5x' theme='secondary'></Icon>&nbsp;
    </>
  )
}

storiesOf('Icon', module)
  .addParameters({
    info: {
      text: `
        ### 引入
        ~~~js
        import { Icon } from 'chen-antd'
        ~~~
        `,
    },
  })
  .add('不同类型的Icon图标', defaultIcon)
  .add('不同大小的Icon图标', sizedIcon)
  .add('不同颜色的Icon图标', coloredIcon)
