import React from 'react'
import { storiesOf } from '@storybook/react'
import { Tabs, TabItem } from '../components/Tabs'

const defaultTabs = () => {
  return (
    <Tabs defaultIndex={1}>
      <TabItem label='tab0'>000</TabItem>
      <TabItem label='tab1'>111</TabItem>
      <TabItem label='tab2' disable>
        222
      </TabItem>
      <TabItem label='tab3'>333</TabItem>
      <TabItem label='tab4'>444</TabItem>
    </Tabs>
  )
}

// TabItem 可以是ReactNode
const TabItemWithNode = () => {
  return (
    <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
      {/* label 可以传递 dom 节点 */}
      <TabItem label={<div style={{ fontWeight: 700, color: 'red' }}>000</div>}>000</TabItem>
      <TabItem label='tab1'>111</TabItem>
      <TabItem label='tab2'>222</TabItem>
      <TabItem label='tab3'>333</TabItem>
      <TabItem label='tab4'>444</TabItem>
    </Tabs>
  )
}

// TabItem 的children可以是ReactNode
const TabItemChildrenWithNode = () => {
  return (
    <Tabs defaultIndex={4} onSelect={index => console.log(index)}>
      <TabItem label='tab0'>
        <p style={{ color: 'red' }}>000</p>
      </TabItem>
      <TabItem label='tab1'>111</TabItem>
      <TabItem label='tab2'>222</TabItem>
      {/* TabItem 的子元素可以是 dom 节点 */}
      <TabItem label='tab3'>
        <p style={{ color: 'red' }}>333</p>
      </TabItem>
      <TabItem label='列表'>
        <ul>
          <li>111</li>
          <li>222</li>
          <li>333</li>
          <li>444</li>
        </ul>
      </TabItem>
    </Tabs>
  )
}

storiesOf('Tabs', module)
  .addParameters({
    info: {
      text: `
      ### 引入
      ~~~js
      import { Tabs, TabItem } from 'chen-antd'
      ~~~
    `,
    },
  })
  .add('默认Tabs栏', defaultTabs)
  .add('TabItem是ReactNode', TabItemWithNode)
  .add('TabItem的Children是ReactNode', TabItemChildrenWithNode)
