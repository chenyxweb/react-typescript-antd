import React from 'react'
import Button from './components/Button'
import { Menu, MenuItem, SubMenu } from './components/Menu'
import Alert from './components/Alert/alert'
import { Tabs, TabItem } from './components/Tabs'
import Icon from './components/Icon/icon'
import Demo from './components/Demo'
import Input from './components/Input/input'

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
      <Icon icon='arrow-up' size='10x' theme='success'></Icon>

      {/* ---------------- CSSTransition ----------------- */}
      <Demo></Demo>

      {/*--------------------- Input --------------------- */}
      <Input style={{ width: 200 }}></Input>
      <Input style={{ width: 200 }} disabled></Input>
    </div>
  )
}

export default App
