import React, { FC } from 'react'

export interface TabItemProps {
  index?: number
  label: React.ReactNode
  disable?: boolean
}

const TabItem: FC<TabItemProps> = ({ children }) => {
  return <div>{children}</div>
}

TabItem.displayName = 'TabItem'

export default TabItem
