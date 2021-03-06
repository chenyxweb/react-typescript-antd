import React, { FC, useContext, FunctionComponentElement, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition'

export interface SubMenuProps {
  /** 当前子菜单项index */
  index?: string
  /** 自定义类名 */
  className?: string
  /** 子菜单标题 */
  title: string
}

export const SubMenu: FC<SubMenuProps> = ({ index, className, title, children }) => {
  const context = useContext(MenuContext)
  // defaultOpenSubMenus 里面有当前SubMenu的index  且 mode为vertical 时 展开
  const defaultOpened = !!(context.defaultOpenSubMenus?.includes(index as string) && context.mode === 'vertical')
  const [opened, setOpened] = useState(defaultOpened)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index.split('-')[0] === index,
    'is-vertical': context.mode === 'vertical',
    'is-horizontal': context.mode === 'horizontal',
    'is-opened': opened,
  })

  const submenuClasses = classNames('viking-submenu', { 'menu-opened': opened })

  const renderChildren = () => {
    // children 只能接受MenuItem
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        // 传入的children有问题
        console.error('SubMenu 只能接受 MenuItem 组件')
      }
    })

    return childrenComponent
  }

  // 点击menu标题
  const clickTitle = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpened(!opened)
  }

  // 根据mode判断 注册click还是hover事件 * 横向hover触发subMenu展示  * 纵向click触发subMenu展示
  let timeId: any // 闭包,持久维持数据
  const verticalEvent = context.mode === 'vertical' ? { onClick: clickTitle } : {}
  const horizontalEvent =
    context.mode === 'vertical'
      ? {}
      : {
          onMouseEnter: (e: React.MouseEvent) => {
            clearTimeout(timeId)
            e.preventDefault()
            timeId = setTimeout(() => {
              setOpened(true)
            }, 300)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            clearTimeout(timeId)
            e.preventDefault()
            timeId = setTimeout(() => {
              setOpened(false)
            }, 300)
          },
        }

  return (
    <li key={index} className={classes} {...horizontalEvent}>
      <div className='submenu-title' {...verticalEvent}>
        {title}
        <Icon icon='angle-down' className='submenu-title-icon'></Icon>
      </div>
      {/* 绝对定位 */}
      {/* 切换 menu-opened 类名控制显示隐藏 */}
      <Transition in={opened} animation='zoom-in-top' timeout={300}>
        <ul className={submenuClasses}>{renderChildren()}</ul>
      </Transition>
    </li>
  )
}

// menu中渲染判断需要使用到displayName
SubMenu.displayName = 'SubMenu'

export default SubMenu
