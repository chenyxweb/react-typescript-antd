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
import classNames from 'classnames';
import { Icon } from '../Icon/icon';
/**
 * ### 引入
 * ~~~js
 * import { Input } from 'chen-antd'
 * ~~~
 */
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, style = props.style, prepend = props.prepend, append = props.append, className = props.className, restProps = __rest(props, ["disabled", "size", "icon", "style", "prepend", "append", "className"]);
    var classes = classNames('viking-input-wrapper', (_a = {},
        _a["input-size-" + size] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    // 同时存在value和defaultValue时,删除defaultValue
    if ('value' in props) {
        delete restProps.defaultValue;
    }
    return (React.createElement("div", { className: classes, style: style },
        prepend && React.createElement("div", { className: 'viking-input-group-prepend' }, prepend),
        icon && (React.createElement("div", { className: 'icon-wrapper' },
            React.createElement(Icon, { icon: icon, title: "title-" + icon }))),
        React.createElement("input", __assign({ disabled: disabled, type: 'text', className: 'viking-input-inner' }, restProps)),
        append && React.createElement("div", { className: 'viking-input-group-append' }, append)));
};
export default Input;
