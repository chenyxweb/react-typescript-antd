import React from 'react'
import { linkTo } from '@storybook/addon-links'
import { Welcome } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'

// export default {
//   title: 'Welcome',
//   component: Welcome,
// };

// export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

// ToStorybook.story = {
//   name: 'to Storybook',
// };

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)
