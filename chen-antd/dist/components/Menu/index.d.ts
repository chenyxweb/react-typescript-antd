import { MenuProps } from './menu';
import { MenuItemProps } from './menuItem';
import { SubMenuProps } from './subMenu';
import { FC } from 'react';
export declare type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
