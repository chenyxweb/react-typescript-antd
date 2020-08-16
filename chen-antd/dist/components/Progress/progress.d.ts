import { FC, CSSProperties } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    /** 百分比 */
    percent: number;
    /** 进度条高度 */
    progressHeight?: number;
    /** 展示文字 */
    showText?: boolean;
    /** 颜色 */
    styles?: CSSProperties;
    /** 主题颜色 */
    theme?: ThemeProps;
}
/**
 * ### 引入
 * ~~~js
 * import { Progress } form 'chen-antd'
 *
 * ~~~
 *
 */
export declare const Progress: FC<ProgressProps>;
export default Progress;
