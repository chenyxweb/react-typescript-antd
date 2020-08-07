import React from 'react'
import { storiesOf } from '@storybook/react'
import Upload from '../components/Upload/upload'
import { action } from '@storybook/addon-actions'
import Button from '../components/Button'
import Icon from '../components/Icon/icon'

const uploadDefault = () => {
  return (
    <Upload
      action={'https://jsonplaceholder.typicode.com/posts'}
      // action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      headers={{ 'aaa-bbb': 'chen' }} // 请求头
      name='chen-img' // 文件名
      data={{ time: '2020-8-8' }} // 添加的数据
      multiple // 多选
      accept='image/*' // 接收的文件类型
    >
      <Button btnType='primary'>
        <Icon icon='upload'></Icon>&nbsp; 上传
      </Button>
    </Upload>
  )
}

// 带拖拽功能的上传
const uploadWithDrag = () => {
  return (
    <Upload
      action={'https://jsonplaceholder.typicode.com/posts'}
      // action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      headers={{ 'aaa-bbb': 'chen' }} // 请求头
      name='chen-img' // 文件名
      data={{ time: '2020-8-8' }} // 添加的数据
      multiple // 多选
      accept='image/*' // 接收的文件类型
      draggable
    >
      <Button btnType='primary'>
        <Icon icon='upload'></Icon>&nbsp; 上传
      </Button>
    </Upload>
  )
}

storiesOf('Upload', module).add('默认上传功能', uploadDefault).add('带拖拽功能的上传',uploadWithDrag)
