import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

// 类型字面量--取代使用enum
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right' // 动画名字

interface TransitionProps {
  animation?: AnimationName
  needWrapper?: boolean // Button 组件需要Wrapper  否则transition属性重复
}

const Transition: FC<TransitionProps & CSSTransitionProps> = props => {
  const { children, animation, classNames, needWrapper, ...restProps } = props
  return (
    <CSSTransition {...restProps} classNames={classNames ? classNames : animation}>
      {needWrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true, // 退出动画时卸载
  needWrapper: false,
}

export default Transition
