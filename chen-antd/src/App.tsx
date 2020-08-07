import React from 'react'
import Button from './components/Button'
import { Menu, MenuItem, SubMenu } from './components/Menu'
import Alert from './components/Alert/alert'
import { Tabs, TabItem } from './components/Tabs'
import Icon from './components/Icon/icon'
import Demo from './components/Demo'
import Input from './components/Input/input'
import AutoComplete from './components/AutoComplete/autoComplete'
import Upload from './components/Upload/upload'

function App() {
  return (
    <div className='App'>
      {/* -----------------Button----------------- */}
      <Button disabled className={'hahaha'}>
        default
      </Button>
      <Button
        btnType='primary'
        onClick={e => {
          e.preventDefault()
          console.log('click', e)
        }}
      >
        Primary
      </Button>
      <Button btnType='primary' disabled>
        Primary-disabled
      </Button>
      <Button btnType='danger'>Danger</Button>
      <Button btnType='primary' size='lg'>
        Primary-large
      </Button>
      <Button btnType='primary' size='sm'>
        Primary-small
      </Button>
      <Button btnType='link' target='_blank'>
        link
      </Button>
      <Button btnType='link' disabled>
        link-disabled
      </Button>

      {/*--------------------- Alert--------------------- */}
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

      {/*--------------------- Menu--------------------- */}
      <Menu
        defaultIndex='0'
        // mode='vertical'
        onSelect={index => {
          console.log(index)
        }}
        defaultOpenSubMenus={['2']} // 默认展开SubMenu vertical布局才生效
      >
        <MenuItem>111</MenuItem>
        <MenuItem disabled>222</MenuItem>
        <SubMenu title='333'>
          <MenuItem>333-1</MenuItem>
          <MenuItem>333-2</MenuItem>
          <MenuItem>333-3</MenuItem>
        </SubMenu>
        <MenuItem>444</MenuItem>
      </Menu>

      {/*--------------------- Tabs--------------------- */}
      <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
        {/* label 可以传递 dom 节点 */}
        <TabItem label={<div style={{ fontWeight: 700 }}>000</div>}>000</TabItem>
        <TabItem label='tab1'>111</TabItem>
        <TabItem label='tab2' disable>
          222
        </TabItem>
        {/* TabItem 的子元素可以是 dom 节点 */}
        <TabItem label='tab3'>
          <p style={{ color: 'red' }}>333</p>
        </TabItem>
        <TabItem label='tab4'>
          <h3>哈哈哈</h3>
        </TabItem>
      </Tabs>

      {/*--------------------- Icon --------------------- */}
      <Icon icon='arrow-up' size='2x' theme='success'></Icon>

      {/* ---------------- CSSTransition ----------------- */}
      <Demo></Demo>

      {/*--------------------- Input --------------------- */}
      <Input style={{ width: 200 }}></Input>
      <Input style={{ width: 200 }} disabled></Input>

      {/*--------------------- AutoComplete --------------------- */}
      <AutoComplete
        placeholder='AutoComplete'
        style={{ width: 200 }}
        fetchSuggestions={value => {
          // 拿到输入的数据, 过滤出需要的数据
          // return listData.filter(item => item.value.toUpperCase().includes(value.toUpperCase()))

          return fetch(`https://api.github.com/search/users?q=${value}`)
            .then(res => res.json())
            .then(res => {
              console.log(res)
              return res.items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
            })
        }}
        onSelect={item => {
          console.log(item)
        }}
        // renderOption={item => <div>{item.value}</div>}
      ></AutoComplete>

      {/* --------------------- 上传文件 --------------------- */}

      <Upload
        // action={'https://jsonplaceholder.typicode.com/posts/'}
        action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
        onProgress={(percentage: number, file: File) => {
          console.log(percentage, file)
        }}
        onSuccess={(res: any, file: File) => {
          console.log(res, file)
        }}
        onError={(res: any, file: File) => {
          console.log(res, file)
        }}
        defaultFileList={[
          { uid: '1', size: 111, name: '1.png', status: 'uploading', percent: 15 },
          { uid: '2', size: 222, name: '2.jpg', status: 'success', percent: 50 },
          { uid: '3', size: 333, name: '3.jpeg', status: 'error', percent: 70 },
        ]}
        onRemove={fileItem => {
          // console.log(fileItem)
        }}
        headers={{ 'aaa-bbb': 'chen' }} // 请求头
        name='chen-img' // 文件名
        data={{ time: '2020-8-8' }} // 添加的数据
        multiple // 多选
        // accept="image/*" // 接收的文件类型
        // accept=".png"
        draggable
      >
        <Button btnType="primary">
          <Icon icon='upload'></Icon>&nbsp; 上传
        </Button>
      </Upload>
    </div>
  )
}

export default App
