// CSSTransition 基础练习

import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'

export default function Demo() {
  const [inProp, setInProp] = useState(false)
  return (
    <div className={styles.CSSTransition}>
      <CSSTransition in={inProp} timeout={2000} classNames='my-class' unmountOnExit>
        <div className='default-class'>{"I'll receive my-class-* classes"}</div>
      </CSSTransition>
      <button type='button' onClick={() => setInProp(true)}>
        Click to Enter
      </button>
      <button type='button' onClick={() => setInProp(false)}>
        Click to Exit
      </button>
    </div>
  )
}
