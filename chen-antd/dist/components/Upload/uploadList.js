import React from 'react';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress';
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: 'viking-upload-list' }, fileList.map(function (item) {
        return (React.createElement("li", { className: 'viking-upload-list-item', key: item.uid },
            React.createElement("span", { className: "file-name file-name-" + item.status },
                React.createElement(Icon, { icon: 'file-alt', theme: 'secondary' }),
                item.name),
            React.createElement("span", { className: 'file-status' },
                item.status === 'uploading' && React.createElement(Icon, { icon: 'spinner', spin: true, theme: 'primary' }),
                item.status === 'success' && React.createElement(Icon, { icon: 'check-circle', theme: 'success' }),
                item.status === 'error' ? React.createElement(Icon, { icon: 'times-circle', theme: 'danger' }) : null),
            React.createElement("span", { className: 'file-actions' },
                React.createElement(Icon, { icon: 'times', onClick: function () { return onRemove && onRemove(item); } })),
            item.status === 'uploading' ? React.createElement(Progress, { percent: item.percent || 0 }) : null));
    })));
};
