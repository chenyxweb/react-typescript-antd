import { TabsProps } from './tabs';
import { TabItemProps } from './tabItem';
import { FC } from 'react';
export declare type ITabsComponent = FC<TabsProps> & {
    Item: FC<TabItemProps>;
};
declare const TransTabs: ITabsComponent;
export default TransTabs;
