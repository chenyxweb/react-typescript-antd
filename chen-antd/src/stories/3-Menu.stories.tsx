import React from 'react'
import { storiesOf } from '@storybook/react'
// import { Menu, MenuItem, SubMenu } from '../components/Menu'
import Menu from '../components/Menu'
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

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
)

storiesOf('Menu', module)
  .addParameters({
    info: {
      text: `
        ### 引入
        ~~~js
        import { Menu } from 'chen-antd'
        
        const MenuItem = Menu.Item
        const SubMenu = Menu.SubMenu
        ~~~
        `,
    },
  })
  .add('水平菜单栏', HorizontalMenu)
  .add('垂直菜单栏', VerticalMenu)
