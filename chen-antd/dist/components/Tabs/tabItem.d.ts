import { FC, ReactNode } from 'react';
export interface TabItemProps {
    /** 当前tab的index */
    index?: number;
    /** tab栏展示内容 */
    label: ReactNode;
    /** 是否禁用tab */
    disable?: boolean;
}
export declare const TabItem: FC<TabItemProps>;
export default TabItem;
