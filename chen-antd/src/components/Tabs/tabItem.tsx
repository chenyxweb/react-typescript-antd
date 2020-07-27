import React, { FC, ReactNode } from 'react'

export interface TabItemProps {
  /** 当前tab的index */
  index?: number
  /** tab栏展示内容 */
  label: ReactNode
  /** 是否禁用tab */
  disable?: boolean
}

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return <div>{children}</div>
}

TabItem.displayName = 'TabItem'

export default TabItem
