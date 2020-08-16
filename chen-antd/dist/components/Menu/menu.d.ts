import React, { FC, CSSProperties } from 'react';
export interface MenuProps {
    /** 默认选中的index */
    defaultIndex?: string;
    /** 自定义类名 */
    className?: string;
    /** 模式:横向或纵向 */
    mode?: 'horizontal' | 'vertical';
    /** 自定义样式 */
    style?: CSSProperties;
    /** 选中后的回调 */
    onSelect?: (index: string) => void;
    /** 默认展开的子菜单 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: (index: string) => void;
    mode?: 'horizontal' | 'vertical';
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
export declare const Menu: FC<MenuProps>;
export default Menu;
