import React from 'react'
import { storiesOf } from '@storybook/react'
import Upload from '../components/Upload/upload'
import { action } from '@storybook/addon-actions'

const uploadDefault = () => {
  return (
    <Upload
      action={'https://jsonplaceholder.typicode.com/posts'}
      // action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
    ></Upload>
  )
}

storiesOf('Upload', module).add('默认上传', uploadDefault)
