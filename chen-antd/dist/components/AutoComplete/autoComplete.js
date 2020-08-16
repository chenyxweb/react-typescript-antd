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
import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input/input';
import Transition from '../Transition';
import Icon from '../Icon/icon';
import classNames from 'classnames';
import useDebounce from '../../hooks/useDebounce';
import useClickOutsideComponent from '../../hooks/useClickOutsideComponent';
/**
 * ### 引入
 * ~~~js
 * import { AutoComplete } form 'chen-antd'
 *
 * ~~~
 */
export var AutoComplete = function (props) {
    var onSelect = props.onSelect, fetchSuggestions = props.fetchSuggestions, renderOption = props.renderOption, restProps = __rest(props, ["onSelect", "fetchSuggestions", "renderOption"]);
    var _a = useState(''), inputValue = _a[0], setInputValue = _a[1]; // 输入框内容
    var _b = useState([]), filterOptions = _b[0], setFilterOptions = _b[1]; // 过滤后的列表数据
    var _c = useState(false), loading = _c[0], setLoading = _c[1]; // 列表是否loading
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1]; // 是否展示下拉列表
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1]; // 默认高亮的listItem
    var debounceInputValue = useDebounce(inputValue, 500)[0]; // 生成延时更新的数据 debounceInputValue
    // console.log(debounceInputValue)
    var useEffectFlag = useRef(true); // useRef 创建的 useEffectFlag 不会随着函数组件的重新调用而改变
    // enter 之后 --> inputValue 改变 --> useEffect 调用,  这个过程是不需要发生的,需要一个flag记录是否需要调用useEffect
    var autoCompleteRef = useRef(null);
    // 当debounceInputValue改变时, 设置下拉框展示,loading状态,列表数据
    // 防抖
    useEffect(function () {
        if (!useEffectFlag.current)
            return;
        if (!debounceInputValue.trim()) {
            // 为空
            setFilterOptions([]);
            setShowDropdown(false);
            setLoading(false);
        }
        else {
            // 不为空
            var result = fetchSuggestions(debounceInputValue);
            if (result instanceof Promise) {
                // 如果函数返回值为promise, 等promise的结果--请求获取数据
                setLoading(true);
                setFilterOptions([]);
                result
                    .then(function (res) {
                    setLoading(false);
                    setFilterOptions(res);
                    setShowDropdown(true);
                })
                    .catch(function (err) { return console.log(err); });
            }
            else {
                // 如果返回值为 DataSourceType[]
                setFilterOptions(result);
                if (result.length) {
                    setShowDropdown(true);
                }
                else {
                    setShowDropdown(false);
                }
            }
        }
    }, [fetchSuggestions, debounceInputValue]);
    // 点击组件外关闭下拉菜单功能
    // useEffect(() => {
    //   const handleClick = (e: MouseEvent) => {
    //     console.log(e.target)
    //     // 如果 dom 中没有这个节点 或者这个节点包括了点击的这个元素 return
    //     if (!autoCompleteRef.current || autoCompleteRef.current.contains(e.target as HTMLElement)) return
    //     // 关闭下拉菜单
    //     setFilterOptions([])
    //   }
    //   document.addEventListener('click', handleClick)
    //   return () => {
    //     document.removeEventListener('click', handleClick)
    //   }
    // }, [])
    // 封装成自定义hook
    useClickOutsideComponent(autoCompleteRef, function () {
        // 关闭下拉菜单
        setFilterOptions([]);
    });
    // 处理input change
    var handleInputChange = function (e) {
        var value = e.currentTarget.value.trim();
        setInputValue(value);
        // 去掉高亮项
        setHighlightIndex(-1);
        useEffectFlag.current = true; // 可以开始查询列表
    };
    // 点击列表项时
    var handleLiClick = function (item) {
        // 赋值inputValue
        setInputValue(item.value);
        // 清空列表
        setFilterOptions([]);
        // 返回给使用者
        onSelect && onSelect(item);
        useEffectFlag.current = false; // 阻止查询列表
    };
    // 键盘按下时
    var handleKeyDown = function (e) {
        var _a, _b;
        // console.log('keyCode', e.keyCode)
        var index = highlightIndex;
        switch (e.keyCode) {
            case 38:
                // 上箭头 --
                index = highlightIndex - 1;
                if (index <= 0) {
                    setHighlightIndex(0);
                }
                else {
                    setHighlightIndex(index);
                }
                break;
            case 40:
                // 下箭头 ++
                index = highlightIndex + 1;
                if (index >= filterOptions.length - 1) {
                    setHighlightIndex(filterOptions.length - 1);
                }
                else {
                    setHighlightIndex(index);
                }
                break;
            case 27:
                // esc
                // 隐藏
                setShowDropdown(false);
                break;
            case 13:
                // enter
                // 设置当前index项为选中
                var dataItem = filterOptions.find(function (item, i) { return i === index; });
                if ((_a = dataItem) === null || _a === void 0 ? void 0 : _a.value) {
                    var selectValue = ((_b = dataItem) === null || _b === void 0 ? void 0 : _b.value) || '';
                    setInputValue(selectValue);
                    // 清空列表
                    setFilterOptions([]);
                    // 返回给使用者
                    onSelect && onSelect(dataItem);
                    useEffectFlag.current = false; // 阻止查询列表
                }
                break;
            default:
                break;
        }
    };
    return (React.createElement("div", { className: 'viking-auto-complete', ref: autoCompleteRef },
        React.createElement(Input, __assign({ value: inputValue }, restProps, { onChange: handleInputChange, onKeyDown: handleKeyDown })),
        React.createElement(Transition, { in: showDropdown || loading, animation: 'zoom-in-top', timeout: 300, onExited: function () {
                setFilterOptions([]);
            } },
            React.createElement("ul", { className: 'viking-suggestion-list' },
                loading && (React.createElement("div", { className: 'suggstions-loading-icon' },
                    React.createElement(Icon, { icon: 'spinner', spin: true }))),
                filterOptions.map(function (item, index) {
                    var cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex,
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleLiClick(item); }, onMouseEnter: function () { return setHighlightIndex(index); } }, renderOption ? renderOption(item) : item.value));
                })))));
};
export default AutoComplete;
