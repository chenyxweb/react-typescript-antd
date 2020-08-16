import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu'; // 导入context
export var MenuItem = function (_a) {
    var index = _a.index, disabled = _a.disabled, className = _a.className, style = _a.style, children = _a.children;
    var context = useContext(MenuContext); // 使用context
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index,
    });
    return (React.createElement("li", { key: index, style: style, className: classes, onClick: function () {
            // 有onSelect 且 disabled===false 且 index为number , 就调用onSelect方法
            context.onSelect && !disabled && typeof index === 'string' && context.onSelect(index);
        } }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
