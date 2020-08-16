import React, { useRef } from 'react';
import classNames from 'classnames';
export var Alert = function (_a) {
    var _b;
    var type = _a.type, title = _a.title, description = _a.description, closeable = _a.closeable, onClose = _a.onClose;
    var domRef = useRef(null);
    var classes = classNames('alert', (_b = {}, _b[type] = type, _b));
    return (React.createElement("div", { className: classes, ref: domRef },
        closeable ? (React.createElement("div", { className: 'close', onClick: function () {
                var _a, _b;
                var div = domRef.current;
                (_b = (_a = div) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(div);
                onClose && onClose();
            } }, "\u00D7")) : null,
        React.createElement("p", { className: 'title' }, title),
        description ? React.createElement("p", { className: 'description' }, description) : null));
};
Alert.defaultProps = {
    type: 'default',
    closeable: true,
};
export default Alert;
