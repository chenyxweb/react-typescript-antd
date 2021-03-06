import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu' // 导入context

export interface MenuItemProps {
  /** 当前菜单项index */
  index?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

export const MenuItem: FC<MenuItemProps> = ({ index, disabled, className, style, children }) => {
  const context = useContext(MenuContext) // 使用context
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index, // 当前索引等于当前选中的索引,选中状态
  })

  return (
    <li
      key={index}
      style={style}
      className={classes}
      onClick={() => {
        // 有onSelect 且 disabled===false 且 index为number , 就调用onSelect方法
        context.onSelect && !disabled && typeof index === 'string' && context.onSelect(index)
      }}
    >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
