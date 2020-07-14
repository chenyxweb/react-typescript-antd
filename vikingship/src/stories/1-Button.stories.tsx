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

storiesOf('Button', module).add('with text', () => (
  <Button btnType='danger' onClick={action('clicked')}>
    按钮
  </Button>
))
