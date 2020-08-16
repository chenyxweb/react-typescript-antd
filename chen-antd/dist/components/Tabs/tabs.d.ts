import { FC } from 'react';
export interface TabsProps {
    /** 默认选中的tab */
    defaultIndex?: number;
    /** tab选中时的回调 */
    onSelect?: (index: number) => void;
}
export declare const Tabs: FC<TabsProps>;
export default Tabs;
