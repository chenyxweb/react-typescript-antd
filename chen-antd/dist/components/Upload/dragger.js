import React, { useState } from 'react';
import classNames from 'classnames';
export var Dragger = function (props) {
    var children = props.children, onDropFile = props.onDropFile;
    var _a = useState(false), isDragOver = _a[0], setIsDragOver = _a[1]; // 是否拖拽进入
    // 拖拽进入时添加 is-dragover 类名
    var classes = classNames('viking-uploader-dragger', { 'is-dragover': isDragOver });
    return (React.createElement("div", { className: classes, 
        // 拖拽进入
        onDragOver: function (e) {
            e.preventDefault();
            setIsDragOver(true);
        }, 
        // 拖拽离开
        onDragLeave: function (e) {
            e.preventDefault();
            setIsDragOver(false);
        }, 
        // 拖拽放下
        onDrop: function (e) {
            e.preventDefault();
            setIsDragOver(false);
            // onDrop事件的e中拿到 当前拖拽的文件File对象
            // console.log(e.dataTransfer.files)
            // 子传父
            onDropFile(e.dataTransfer.files);
        } }, children));
};
export default Dragger;
