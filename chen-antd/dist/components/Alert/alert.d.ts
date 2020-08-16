import { FC } from 'react';
interface AlertProps {
    /** 弹框类型 */
    type?: 'default' | 'success' | 'warning' | 'danger';
    /** 弹框标题 */
    title: string;
    /** 弹框描述 */
    description?: string;
    /** 是否展示关闭按钮 */
    closeable?: boolean;
    /** 关闭回调 */
    onClose?: () => void;
}
export declare const Alert: FC<AlertProps>;
export default Alert;
