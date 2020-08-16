// CSSTransition 基础练习
import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './index.module.scss';
import Transition from '../Transition';
import Button from '../Button';
var Demo = function () {
    var _a = useState(false), inProp = _a[0], setInProp = _a[1];
    var _b = useState(0), count = _b[0], setCount = _b[1];
    var _c = useState(false), toggle = _c[0], setToggle = _c[1];
    var countRef = useRef(0);
    return (React.createElement("div", { className: styles.CSSTransition },
        React.createElement(CSSTransition, { in: inProp, timeout: 1000, classNames: 'my-class', unmountOnExit: true },
            React.createElement("div", null, "I'll receive my-class-* classes")),
        React.createElement(Button, { type: 'button', onClick: function () { return setInProp(true); } }, "Click to Enter"),
        React.createElement(Button, { type: 'button', onClick: function () { return setInProp(false); } }, "Click to Exit"),
        React.createElement(Button, { onClick: function () {
                setTimeout(function () {
                    setCount(count + 1);
                    countRef.current += 1;
                    console.log(countRef.current);
                }, 5000);
            } }, count),
        React.createElement("hr", null),
        React.createElement(Button, { onClick: function () { return setToggle(!toggle); } }, "Toggle"),
        React.createElement("br", null),
        React.createElement(Transition, { animation: 'zoom-in-left', in: toggle, timeout: 300 },
            React.createElement("div", null,
                React.createElement("p", null, "zoom-in-left zoom-in-left zoom-in-left"),
                React.createElement("p", null, "zoom-in-left zoom-in-left zoom-in-left"),
                React.createElement("p", null, "zoom-in-left zoom-in-left zoom-in-left"),
                React.createElement("p", null, "zoom-in-left zoom-in-left zoom-in-left"))),
        React.createElement(Transition, { needWrapper: true, animation: 'zoom-in-left', in: toggle, timeout: 300 },
            React.createElement(Button, { btnType: 'primary', size: 'lg' }, "\u6309\u94AE"))));
};
export default Demo;
