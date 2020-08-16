import { FC } from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
interface TransitionProps {
    /** 动画名称 */
    animation?: AnimationName;
    /** 是否需要添加div节点包裹(比如 Button 组件需要Wrapper  否则transition属性重复,不生效) */
    needWrapper?: boolean;
}
export declare const Transition: FC<TransitionProps & CSSTransitionProps>;
export default Transition;
