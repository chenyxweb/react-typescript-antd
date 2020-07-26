import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Button from '../components/Button'

// export default {
//   title: 'Button',
//   component: Button,
// };

// export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

// export const Emoji = () => (
//   <Button onClick={action('clicked')}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );

// 不同尺寸的按钮
const ButtonWithSize = () => (
  <>
    <Button size='lg'>大按钮</Button>
    <Button size='sm'>小按钮</Button>
  </>
)

// 不同类型的按钮
const ButtonWithType = () => (
  <>
    <Button btnType='default' onClick={action('click', {})}>
      default按钮
    </Button>
    <Button btnType='default' disabled>
      primary按钮
    </Button>
    <Button btnType='primary'>primary按钮</Button>
    <Button btnType='danger'>danger按钮</Button>
    <Button btnType='link' href='https://www.bilibili.com'>
      link按钮
    </Button>
  </>
)

storiesOf('Button', module)
  // 展示组件信息
  // .addDecorator(withInfo)
  .addParameters({
    info: {
      // 支持markdown
      text: `
      ### 使用
      ~~~js
      import { Button } from 'chen-antd'
      ~~~
      `,
      // 展示信息
      // inline: true, // 已挪到config.tsx中全局配置
    },
  })
  .add('不同尺寸的按钮', ButtonWithSize)
  .add('不同类型的按钮', ButtonWithType)
