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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classnames from 'classnames';
export var Button = function (props) {
    var _a;
    var className = props.className, btnType = props.btnType, size = props.size, disabled = props.disabled, children = props.children, style = props.style, restProps = __rest(props
    // btn btn-primary btn-large ...
    , ["className", "btnType", "size", "disabled", "children", "style"]);
    // btn btn-primary btn-large ...
    var classes = classnames('btn', (_a = {},
        _a["btn-" + btnType] = btnType,
        _a["btn-" + size] = size,
        _a.disabled = btnType === 'link' && disabled,
        _a), className);
    if (btnType === 'link') {
        // a标签
        return (React.createElement("a", __assign({ href: 'https://www.baidu.com', className: classes, style: style }, restProps), children));
    }
    else {
        // 按钮
        return (React.createElement("button", __assign({ className: classes, disabled: disabled, style: style }, restProps), children));
    }
};
Button.defaultProps = {
    btnType: 'default',
    disabled: false,
};
export default Button;
