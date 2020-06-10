import React, { FC, createContext, useState } from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './menuItem'

export interface MenuProps {
  defaultIndex?: number // 默认高亮项
  className?: string
  mode?: 'horizontal' | 'vertical' // 横向或纵向
  style?: React.CSSProperties
  onSelect?: (index: number) => void // 点击菜单项后触发的回调
}

interface IMenuContext {
  index: number
  onSelect?: (index: number) => void
}

// 创建上下文, 并且导出给menuItem使用
export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, children, onSelect } = props
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)

  const classes = classnames('menu', className, { [`menu-${mode}`]: mode })

  // 实现只渲染MenuItem元素,其他元素忽视,传入的话提示错误
  // 实现自动生成index,重新创建React元素,并且将index混入进去,渲染出来
  const renderChildren = () => {
    // React.Children 遍历不透明数据结构 this.props.children
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        // return child
        return React.cloneElement(childElement, { index: index })
      } else {
        console.error('Menu 组件只能接收 MenuItem 组件')
      }
    })
  }
  return (
    <MenuContext.Provider
      value={{
        index: currentIndex ? currentIndex : 0,
        onSelect: index => {
          // menuItem调用onSelect, 传递过来index
          if (index === currentIndex) return //防止重复点击
          // 1. setCurrentIndex
          setCurrentIndex(index)
          // 2. 调用使用者传递进来的onSelect
          onSelect && onSelect(index)
        },
      }}
    >
      <ul className={classes} style={style}>
        {/* {children} */}
        {renderChildren()}
      </ul>
    </MenuContext.Provider>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu
