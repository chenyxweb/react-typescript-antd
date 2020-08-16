var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { UploadList } from './uploadList';
import Dragger from './dragger';
/**
 * ### 引入
 * ~~~js
 * import { Upload } form 'chen-antd'
 *
 * ~~~
 *
 */
export var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, multiple = props.multiple, accept = props.accept, children = props.children, draggable = props.draggable;
    var inputRef = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1]; // 文件列表
    // 点击上传文件按钮时
    var handleButtonClick = function () {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    // input标签 change的时候
    var handleInputChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        // 上传文件(uploadFile变量可以先使用后声明)
        uploadFile(files);
        // 清空input
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };
    // 上传文件列表
    var uploadFile = function (files) {
        // 将FileList转化成真数组
        var reqFiles = Array.from(files);
        reqFiles.forEach(function (file) {
            // 上传之前处理
            if (beforeUpload) {
                // 如果有传入 beforeUpload
                var res = beforeUpload(file);
                if (res && res instanceof Promise) {
                    // beforeUpload 返回值为promise
                    res.then(function (resp) {
                        // 将promise完成时的结果上传
                        post(resp);
                    });
                }
                else {
                    // beforeUpload 返回 boolean
                    if (res) {
                        // 返回值为true时才进行上传
                        post(file);
                    }
                }
            }
            else {
                // 没有传入 beforeUpload
                post(file);
            }
        });
    };
    // 请求 将file文件上传
    var post = function (file) {
        // 1. 创建文件列表项
        var fileListItem = {
            uid: 'file' + Date.now(),
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file,
        };
        // 2. 保存到fileList内
        // setFileList([fileListItem, ...fileList])
        setFileList(function (prevFileList) {
            return __spreadArrays([fileListItem], prevFileList);
        });
        // 3. 创建FormData,上传文件
        var formData = new FormData();
        formData.append(name || file.name, file);
        // 用户添加额外的请求体参数
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign({ 'Content-Type': 'multipart/form-data' }, headers),
            // 4. axios 支持监控上传进度, 上传过程中
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded / e.total) * 100) || 0; // 计算百分比
                if (percentage < 100) {
                    onProgress && onProgress(percentage, file);
                    //  更新当前项信息
                    setFileList(function (preFileList) {
                        // console.log(preFileList)
                        // 拿到上一次setState后最新的列表, 返回需要新更新的值
                        // 取得当前上传项,实时更新当前项的相关数据
                        return preFileList.map(function (item) {
                            if (item.uid === fileListItem.uid) {
                                return __assign(__assign({}, item), { percent: percentage, status: 'uploading' });
                            }
                            else {
                                return item;
                            }
                        });
                    });
                }
            },
            withCredentials: withCredentials,
        })
            .then(function (res) {
            //  更新当前项信息
            setFileList(function (preFileList) {
                console.log(preFileList);
                // 拿到上一次setState后最新的列表, 返回需要新更新的值
                // 取得当前上传项,实时更新当前项的相关数据
                var newFileList = preFileList.map(function (item) {
                    if (item.uid === fileListItem.uid) {
                        fileListItem = __assign(__assign({}, item), { percent: 100, status: 'success', response: res.data });
                        return fileListItem;
                    }
                    else {
                        return item;
                    }
                });
                // 上传成功
                onSuccess && onSuccess(res.data, fileListItem);
                onChange && onChange(fileListItem, newFileList);
                return newFileList;
            });
        })
            .catch(function (error) {
            // 上传失败
            // onError && onError(error, file)
            // onChange && onChange(file)
            //  更新当前项信息
            setFileList(function (preFileList) {
                console.log(preFileList);
                // 拿到上一次setState后最新的列表, 返回需要新更新的值
                // 取得当前上传项,实时更新当前项的相关数据
                var newFileList = preFileList.map(function (item) {
                    if (item.uid === fileListItem.uid) {
                        fileListItem = __assign(__assign({}, item), { status: 'error', error: error });
                        return fileListItem;
                    }
                    else {
                        return item;
                    }
                });
                onError && onError(error, fileListItem);
                onChange && onChange(fileListItem, newFileList);
                return newFileList;
            });
        });
    };
    return (React.createElement("div", { className: 'viking-upload-component' },
        React.createElement("div", { className: 'viking-upload-input', style: { display: 'inline-block' }, onClick: handleButtonClick }, draggable ? (React.createElement(Dragger, { onDropFile: function (fileList) {
                // 拿到drop放下的文件列表,进行上传操作
                uploadFile(fileList);
            } }, children)) : (children)),
        React.createElement("input", { onChange: handleInputChange, type: 'file', ref: inputRef, className: 'viking-file-input', style: { display: 'none' }, multiple: !!multiple, accept: accept }),
        React.createElement(UploadList, { fileList: fileList, onRemove: function (fileItem) {
                console.log(fileItem);
                // 删除这一项
                setFileList(fileList.filter(function (item) { return item.uid !== fileItem.uid; }));
                onRemove && onRemove(fileItem);
            } })));
};
Upload.defaultProps = {
    name: 'file',
};
export default Upload;
