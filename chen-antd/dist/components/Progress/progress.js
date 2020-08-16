import React from 'react';
/**
 * ### 引入
 * ~~~js
 * import { Progress } form 'chen-antd'
 *
 * ~~~
 *
 */
export var Progress = function (props) {
    var percent = props.percent, progressHeight = props.progressHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: 'viking-progress-bar', style: styles },
        React.createElement("div", { className: 'viking-progress-bar-outer', style: { height: progressHeight } },
            React.createElement("div", { className: "viking-progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText ? React.createElement("span", { className: 'inner-text' }, percent + '%') : null))));
};
// 默认值
Progress.defaultProps = {
    progressHeight: 15,
    showText: true,
    theme: 'primary',
};
export default Progress;
