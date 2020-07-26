import React from 'react'
import { storiesOf } from '@storybook/react'
import Alert from '../components/Alert/alert'
import { withInfo } from '@storybook/addon-info'

const AlertDefault = () => (
  <div>
    <Alert
      type='success'
      title='提示'
      description='描述文字'
      closeable
      onClose={() => {
        console.log('close-Alert')
      }}
    ></Alert>
    <Alert title='哈哈哈'></Alert>
  </div>
)

storiesOf('Alert', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: `
      ### 使用
      ~~~js
      import { Alert } from 'chen-antd'
      ~~~
      `,
      // 展示信息
      inline: true,
    },
  })
  .add('弹框', AlertDefault)
