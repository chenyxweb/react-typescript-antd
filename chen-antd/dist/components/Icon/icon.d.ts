import { FC } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
interface IconProps extends FontAwesomeIconProps {
    /** 图标主题颜色 */
    theme?: ThemeProps;
}
export declare const Icon: FC<IconProps>;
export default Icon;
