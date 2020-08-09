import Menu, { MenuProps } from './menu'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu, { SubMenuProps } from './subMenu'
import { FC } from 'react'

// 给Menu添加交叉类型  MenuItem 和 SubMenu
export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
// export { Menu, MenuItem, SubMenu }
