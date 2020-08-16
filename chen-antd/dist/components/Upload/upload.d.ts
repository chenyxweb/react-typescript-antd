import { FC } from 'react';
export interface UploadProps {
    /** 上传地址 */
    action: string;
    /** 上传过程 */
    onProgress?: (percentage: number, file: File) => void;
    /** 上传成功 */
    onSuccess?: (res: any, fileListItem: UploadFileItem) => void;
    /** 上传错误 */
    onError?: (err: any, fileListItem: UploadFileItem) => void;
    /** 上传状态改变: 成功失败时都触发 */
    onChange?: (fileListItem: UploadFileItem, fileList: UploadFileItem[]) => void;
    /** 上传之前 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 默认列表 */
    defaultFileList?: UploadFileItem[];
    /** 移除文件 */
    onRemove?: (fileItem: UploadFileItem) => void;
    /** 自定义请求头 headers */
    headers?: {
        [key: string]: any;
    };
    /** 指定文件名 */
    name?: string;
    /** 额外的请求体数据 */
    data?: {
        [key: string]: any;
    };
    /** 是否携带cookie */
    withCredentials?: boolean;
    /** 文件多选 */
    multiple?: boolean;
    /** 接收的文件类型 */
    accept?: string;
    /** 是否可以拖拽上传 */
    draggable?: boolean;
}
/** 文件列表的每一项的类型 */
export interface UploadFileItem {
    /** 文件id */
    uid: string;
    /** 文件大小 */
    size: number;
    /** 文件名 */
    name: string;
    /** 文件状态 */
    status?: 'ready' | 'uploading' | 'success' | 'error';
    /** 上传百分比 */
    percent?: number;
    /** 原始文件 */
    raw?: File;
    /** 上传成功的信息 */
    response?: any;
    /** 上传失败的信息 */
    error?: any;
}
/**
 * ### 引入
 * ~~~js
 * import { Upload } form 'chen-antd'
 *
 * ~~~
 *
 */
export declare const Upload: FC<UploadProps>;
export default Upload;
