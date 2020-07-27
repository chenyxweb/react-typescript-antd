import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Transition } from '../components/Transition'
import styles from '../components/Demo/index.module.scss'
import Button from '../components/Button'

const TransitionDemo = () => {
  const [toggle, setToggle] = useState(true)
  return (
    <div className={styles.CSSTransition}>
      <hr />
      {/* Button 动画 */}
      <Button onClick={() => setToggle(!toggle)}>Toggle</Button>
      <br />

      <Transition animation='zoom-in-left' in={toggle} timeout={300} addEndListener={() => {}}>
        <div>
          <p>zoom-in-left zoom-in-left zoom-in-left</p>
          <p>zoom-in-left zoom-in-left zoom-in-left</p>
          <p>zoom-in-left zoom-in-left zoom-in-left</p>
          <p>zoom-in-left zoom-in-left zoom-in-left</p>
        </div>
      </Transition>

      <br />

      <Transition animation='zoom-in-top' in={toggle} timeout={300} addEndListener={() => {}}>
        <div>
          <p>zoom-in-top zoom-in-top zoom-in-top</p>
          <p>zoom-in-top zoom-in-top zoom-in-top</p>
          <p>zoom-in-top zoom-in-top zoom-in-top</p>
          <p>zoom-in-top zoom-in-top zoom-in-top</p>
        </div>
      </Transition>

      <Transition needWrapper animation='zoom-in-left' in={toggle} timeout={300} addEndListener={() => {}}>
        <Button btnType='primary' size='lg'>
          按钮
        </Button>
      </Transition>

      <br />

      <Transition needWrapper animation='zoom-in-top' in={toggle} timeout={300} addEndListener={() => {}}>
        <Button btnType='primary' size='lg'>
          按钮
        </Button>
      </Transition>
    </div>
  )
}

storiesOf('Transition', module)
  .addParameters({
    info: {
      text: `
        ### 引入
        ~~~js
        import { Transition, Button } from 'chen-antd'
        ~~~
        `,
    },
  })
  .add('不同方向出现的Transition', TransitionDemo)
