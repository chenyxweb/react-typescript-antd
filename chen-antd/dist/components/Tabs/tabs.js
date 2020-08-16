import React, { useState, Children, cloneElement } from 'react';
import classNames from 'classnames';
export var Tabs = function (_a) {
    var defaultIndex = _a.defaultIndex, onSelect = _a.onSelect, children = _a.children;
    var _b = useState(defaultIndex), currentIndex = _b[0], setCurrentIndex = _b[1];
    var tabsContent = null; // 内容
    var tabsTitle = function () {
        return Children.map(children, function (child, index) {
            // 添加类型
            var childElement = child;
            // 只接收TabItem组件
            if (childElement.type.displayName === 'TabItem') {
                // 混入index
                childElement = cloneElement(childElement, { index: index });
                // 添加类名
                var liClasses = classNames('menu-item', {
                    'is-active': currentIndex === index,
                    'is-disabled': childElement.props.disable,
                });
                // console.log(childElement)
                if (currentIndex === index) {
                    tabsContent = childElement;
                }
                return (React.createElement("li", { className: liClasses, onClick: function () {
                        setCurrentIndex(index);
                        onSelect && onSelect(index);
                    } }, childElement.props.label));
            }
            else {
                console.error('Tabs 组件只接收 TabItem 组件');
            }
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("ul", { className: 'viking-menu' }, tabsTitle()),
        React.createElement("div", { className: 'tabs-content' }, tabsContent)));
};
Tabs.defaultProps = {
    defaultIndex: 0,
};
export default Tabs;
