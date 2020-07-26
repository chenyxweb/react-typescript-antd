import React from 'react'
import { storiesOf } from '@storybook/react'
import { Menu, MenuItem, SubMenu } from '../components/Menu'

// 水平menu
const HorizontalMenu = () => (
  <Menu
    defaultIndex='0'
    onSelect={index => {
      console.log(index)
    }}
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
)

// 垂直menu
const VerticalMenu = () => (
  <Menu
    defaultIndex='0'
    mode='vertical'
    onSelect={index => {
      console.log(index)
    }}
    // defaultOpenSubMenus={['2']} // 默认展开SubMenu vertical布局才生效
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
)

storiesOf('Menu', module).add('水平菜单栏', HorizontalMenu).add('垂直菜单栏', VerticalMenu)
