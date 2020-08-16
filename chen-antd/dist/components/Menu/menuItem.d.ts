import React, { FC } from 'react';
export interface MenuItemProps {
    /** 当前菜单项index */
    index?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
