import { FC } from 'react';
export interface SubMenuProps {
    /** 当前子菜单项index */
    index?: string;
    /** 自定义类名 */
    className?: string;
    /** 子菜单标题 */
    title: string;
}
export declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
