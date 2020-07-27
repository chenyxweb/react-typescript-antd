// CSSTransition 基础练习

import React, { useState, FC, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import Transition from '../Transition'
import Button from '../Button'

const Demo: FC = () => {
  const [inProp, setInProp] = useState(false)
  const [count, setCount] = useState(0)
  const [toggle, setToggle] = useState(false)
  const countRef = useRef(0)
  return (
    <div className={styles.CSSTransition}>
      {/* unmountOnExit 退出是删除dom元素 */}
      <CSSTransition in={inProp} timeout={1000} classNames='my-class' unmountOnExit>
        <div>{"I'll receive my-class-* classes"}</div>
      </CSSTransition>
      <Button type='button' onClick={() => setInProp(true)}>
        Click to Enter
      </Button>
      <Button type='button' onClick={() => setInProp(false)}>
        Click to Exit
      </Button>

      <Button
        onClick={() => {
          setTimeout(() => {
            setCount(count + 1)
            countRef.current += 1
            console.log(countRef.current)
          }, 5000)
        }}
      >
        {count}
      </Button>

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

      <Transition needWrapper animation='zoom-in-left' in={toggle} timeout={300} addEndListener={() => {}}>
        <Button btnType='primary' size='lg'>
          按钮
        </Button>
      </Transition>
    </div>
  )
}

export default Demo
