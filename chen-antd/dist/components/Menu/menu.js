import React, { createContext, useState, Children, cloneElement, } from 'react';
import classnames from 'classnames';
// 创建上下文, 并且导出给menuItem使用
export var MenuContext = createContext({ index: '0' });
export var Menu = function (props) {
    var _a;
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _b = useState(defaultIndex), currentIndex = _b[0], setCurrentIndex = _b[1];
    var classes = classnames('viking-menu', className, (_a = {}, _a["menu-" + mode] = mode, _a));
    // 实现只渲染MenuItem元素,其他元素忽视,传入的话提示错误
    // 实现自动生成index,重新创建React元素,并且将index混入进去,渲染出来
    var renderChildren = function () {
        // React.Children 遍历不透明数据结构 this.props.children
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // return child
                return cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error('Menu 组件只能接收 MenuItem 或 SubMenu 组件');
            }
        });
    };
    return (React.createElement(MenuContext.Provider, { value: {
            index: currentIndex ? currentIndex : '0',
            onSelect: function (index) {
                // menuItem调用onSelect, 传递过来index
                if (index === currentIndex)
                    return; //防止重复点击
                // 1. setCurrentIndex
                setCurrentIndex(index);
                // 2. 调用使用者传递进来的onSelect
                onSelect && onSelect(index);
            },
            mode: mode,
            defaultOpenSubMenus: defaultOpenSubMenus,
        } },
        React.createElement("ul", { className: classes, style: style }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};
export default Menu;
