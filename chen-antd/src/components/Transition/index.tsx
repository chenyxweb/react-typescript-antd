import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right' // 动画名字

interface TransitionProps {
  animation?: AnimationName
}

const Transition: FC<TransitionProps & CSSTransitionProps> = props => {
  const { children, animation, classNames, ...restProps } = props
  return (
    <CSSTransition {...restProps} classNames={classNames ? classNames : animation}>
      {children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true, // 退出动画时卸载
}

export default Transition
