import { FC } from 'react';
interface DraggerProps {
    /** 文件放下时的回调 */
    onDropFile: (fileList: FileList) => void;
}
export declare const Dragger: FC<DraggerProps>;
export default Dragger;
