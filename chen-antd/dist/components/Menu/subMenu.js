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
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
import Transition from '../Transition';
export var SubMenu = function (_a) {
    var index = _a.index, className = _a.className, title = _a.title, children = _a.children;
    var _b;
    var context = useContext(MenuContext);
    // defaultOpenSubMenus 里面有当前SubMenu的index  且 mode为vertical 时 展开
    var defaultOpened = !!(((_b = context.defaultOpenSubMenus) === null || _b === void 0 ? void 0 : _b.includes(index)) && context.mode === 'vertical');
    var _c = useState(defaultOpened), opened = _c[0], setOpened = _c[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index.split('-')[0] === index,
        'is-vertical': context.mode === 'vertical',
        'is-horizontal': context.mode === 'horizontal',
        'is-opened': opened,
    });
    var submenuClasses = classNames('viking-submenu', { 'menu-opened': opened });
    var renderChildren = function () {
        // children 只能接受MenuItem
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: index + "-" + i });
            }
            else {
                // 传入的children有问题
                console.error('SubMenu 只能接受 MenuItem 组件');
            }
        });
        return childrenComponent;
    };
    // 点击menu标题
    var clickTitle = function (e) {
        e.preventDefault();
        setOpened(!opened);
    };
    // 根据mode判断 注册click还是hover事件 * 横向hover触发subMenu展示  * 纵向click触发subMenu展示
    var timeId; // 闭包,持久维持数据
    var verticalEvent = context.mode === 'vertical' ? { onClick: clickTitle } : {};
    var horizontalEvent = context.mode === 'vertical'
        ? {}
        : {
            onMouseEnter: function (e) {
                clearTimeout(timeId);
                e.preventDefault();
                timeId = setTimeout(function () {
                    setOpened(true);
                }, 300);
            },
            onMouseLeave: function (e) {
                clearTimeout(timeId);
                e.preventDefault();
                timeId = setTimeout(function () {
                    setOpened(false);
                }, 300);
            },
        };
    return (React.createElement("li", __assign({ key: index, className: classes }, horizontalEvent),
        React.createElement("div", __assign({ className: 'submenu-title' }, verticalEvent),
            title,
            React.createElement(Icon, { icon: 'angle-down', className: 'submenu-title-icon' })),
        React.createElement(Transition, { in: opened, animation: 'zoom-in-top', timeout: 300 },
            React.createElement("ul", { className: submenuClasses }, renderChildren()))));
};
// menu中渲染判断需要使用到displayName
SubMenu.displayName = 'SubMenu';
export default SubMenu;
