import { FC, ReactNode, CSSProperties, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
interface BaseButtonProps {
    /** 子节点 */
    children: ReactNode;
    /** 按钮类型 */
    btnType: 'default' | 'primary' | 'danger' | 'link';
    /** 按钮大小 */
    size?: 'lg' | 'sm';
    /** 是否禁用 */
    disabled?: boolean;
    /** 类名 */
    className?: string;
    /** 自定义样式 */
    style?: CSSProperties;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: FC<ButtonProps>;
export default Button;
