import { FC, InputHTMLAttributes, ReactElement } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
/**
 * 问题:size和InputHTMLAttributes内置的size冲突
 * 解决: 1. 修改自定义的size; 2. 使用Omit<T,K>  : 从T选取所有属性,然后删除K来构造新的类型
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** 是否禁用 */
    disabled?: boolean;
    /** Input组件大小 */
    size?: InputSize;
    /** 图标 */
    icon?: IconProp;
    /** 前缀 */
    prepend?: string | ReactElement;
    /** 后缀 */
    append?: string | ReactElement;
}
/**
 * ### 引入
 * ~~~js
 * import { Input } from 'chen-antd'
 * ~~~
 */
export declare const Input: FC<InputProps>;
export default Input;
