import React, {
  FC,
  createContext,
  useState,
  Children,
  FunctionComponentElement,
  cloneElement,
  CSSProperties,
} from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './menuItem'

export interface MenuProps {
  /** 默认选中的index */
  defaultIndex?: string // 默认高亮项
  /** 自定义类名 */
  className?: string
  /** 模式:横向或纵向 */
  mode?: 'horizontal' | 'vertical' // 横向或纵向
  /** 自定义样式 */
  style?: CSSProperties
  /** 选中后的回调 */
  onSelect?: (index: string) => void // 点击菜单项后触发的回调
  /** 默认展开的子菜单 */
  defaultOpenSubMenus?: string[] // 默认展开subMenu
}

interface IMenuContext {
  index: string
  onSelect?: (index: string) => void
  mode?: 'horizontal' | 'vertical' // 横向或纵向
  defaultOpenSubMenus?: string[]
}

// 创建上下文, 并且导出给menuItem使用
export const MenuContext = createContext<IMenuContext>({ index: '0' })

export const Menu: FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)

  const classes = classnames('viking-menu', className, { [`menu-${mode}`]: mode })

  // 实现只渲染MenuItem元素,其他元素忽视,传入的话提示错误
  // 实现自动生成index,重新创建React元素,并且将index混入进去,渲染出来
  const renderChildren = () => {
    // React.Children 遍历不透明数据结构 this.props.children
    return Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // return child
        return cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Menu 组件只能接收 MenuItem 或 SubMenu 组件')
      }
    })
  }
  return (
    <MenuContext.Provider
      value={{
        index: currentIndex ? currentIndex : '0',
        onSelect: index => {
          // menuItem调用onSelect, 传递过来index
          if (index === currentIndex) return //防止重复点击
          // 1. setCurrentIndex
          setCurrentIndex(index)
          // 2. 调用使用者传递进来的onSelect
          onSelect && onSelect(index)
        },
        mode,
        defaultOpenSubMenus,
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
  defaultIndex: '0',
  mode: 'horizontal', // 默认横向
  defaultOpenSubMenus: [],
}

export default Menu
