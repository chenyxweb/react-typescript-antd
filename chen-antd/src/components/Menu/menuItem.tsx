import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu' // 导入context

export interface MenuItemProps {
  index?: number
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: FC<MenuItemProps> = ({ index, disabled, className, style, children }) => {
  const context = useContext(MenuContext) // 使用context
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index, // 当前索引等于当前选中的索引,选中状态
  })

  return (
    <li
      style={style}
      className={classes}
      onClick={() => {
        // 有onSelect 且 disabled===false 且 index为number , 就调用onSelect方法
        context.onSelect && !disabled && typeof index === 'number' && context.onSelect(index)
      }}
    >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
