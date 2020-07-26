import React from 'react'
import { storiesOf } from '@storybook/react'
import Alert from '../components/Alert/alert'

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

storiesOf('Alert', module).add('水平菜单栏', AlertDefault)
