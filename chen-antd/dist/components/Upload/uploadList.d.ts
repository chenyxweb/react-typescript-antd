import { FC } from 'react';
import { UploadFileItem } from './upload';
export interface UploadListProps {
    fileList: UploadFileItem[];
    onRemove?: (fileItem: UploadFileItem) => void;
}
export declare const UploadList: FC<UploadListProps>;
