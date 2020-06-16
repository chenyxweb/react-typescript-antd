import React, { FC, useState } from 'react'
import { TabItemProps } from './tabItem'
import classNames from 'classnames'

interface TabsProps {
  defaultIndex?: number
  onSelect?: (index: number) => void
}

const Tabs: FC<TabsProps> = ({ defaultIndex, onSelect, children }) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  let tabsContent
  const tabsTitle = () => {
    return React.Children.map(children, (child, index) => {
      // 添加类型
      let childElement = child as React.FunctionComponentElement<TabItemProps>
      // 只接收TabItem组件
      if (childElement.type.displayName === 'TabItem') {
        // 混入index
        childElement = React.cloneElement(childElement, { index: index })
        // 添加类名
        const liClasses = classNames('menu-item', {
          'is-active': currentIndex === index,
          'is-disabled': childElement.props.disable,
        })
        // console.log(childElement)
        if (currentIndex === index) {
          tabsContent = childElement
        }

        return (
          <li
            className={liClasses}
            onClick={() => {
              setCurrentIndex(index)
              onSelect && onSelect(index)
            }}
          >
            {childElement.props.label}
          </li>
        )
      } else {
        console.error('Tabs 组件只接收 TabItem 组件')
      }
    })
  }

  // const tabsContent = () => {
  //   return React.Children.map(children,(child,index)=>{
  //     if(child)
  //   })
  // }

  return (
    <div>
      <ul className='viking-menu'>{tabsTitle()}</ul>
      <div className='tabs-content'>{tabsContent}</div>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
}

export default Tabs
