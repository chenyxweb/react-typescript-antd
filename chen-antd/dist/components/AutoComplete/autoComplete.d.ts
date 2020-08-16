import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
    number?: number;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** input时 实时获取输入框数据. 返回值为过滤后的列表数据或者promise,列表数据提供给组件渲染使用 */
    fetchSuggestions: (inputValue: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选择下拉列表时 */
    onSelect?: (item: DataSourceType) => void;
    /** 自定义渲染内容 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 * ### 引入
 * ~~~js
 * import { AutoComplete } form 'chen-antd'
 *
 * ~~~
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
