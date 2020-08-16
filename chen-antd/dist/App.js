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
import React from 'react';
import Button from './components/Button';
import Menu from './components/Menu';
import Alert from './components/Alert/alert';
import Tabs from './components/Tabs';
import Icon from './components/Icon/icon';
import Demo from './components/Demo';
import Input from './components/Input/input';
import AutoComplete from './components/AutoComplete/autoComplete';
import Upload from './components/Upload/upload';
var MenuItem = Menu.Item;
var SubMenu = Menu.SubMenu;
var TabItem = Tabs.Item;
function App() {
    return (React.createElement("div", { className: 'App' },
        React.createElement(Button, { disabled: true, className: 'hahaha' }, "default"),
        React.createElement(Button, { btnType: 'primary', onClick: function (e) {
                e.preventDefault();
                console.log('click', e);
            } }, "Primary"),
        React.createElement(Button, { btnType: 'primary', disabled: true }, "Primary-disabled"),
        React.createElement(Button, { btnType: 'danger' }, "Danger"),
        React.createElement(Button, { btnType: 'primary', size: 'lg' }, "Primary-large"),
        React.createElement(Button, { btnType: 'primary', size: 'sm' }, "Primary-small"),
        React.createElement(Button, { btnType: 'link', target: '_blank' }, "link"),
        React.createElement(Button, { btnType: 'link', disabled: true }, "link-disabled"),
        React.createElement(Alert, { type: 'success', title: '\u63D0\u793A', description: '\u63CF\u8FF0\u6587\u5B57', closeable: true, onClose: function () {
                console.log('close-Alert');
            } }),
        React.createElement(Alert, { title: '\u54C8\u54C8\u54C8' }),
        React.createElement(Menu, { defaultIndex: '0', 
            // mode='vertical'
            onSelect: function (index) {
                console.log(index);
            }, defaultOpenSubMenus: ['2'] },
            React.createElement(MenuItem, null, "111"),
            React.createElement(MenuItem, { disabled: true }, "222"),
            React.createElement(SubMenu, { title: '333' },
                React.createElement(MenuItem, null, "333-1"),
                React.createElement(MenuItem, null, "333-2"),
                React.createElement(MenuItem, null, "333-3")),
            React.createElement(MenuItem, null, "444")),
        React.createElement(Tabs, { defaultIndex: 1, onSelect: function (index) { return console.log(index); } },
            React.createElement(TabItem, { label: React.createElement("div", { style: { fontWeight: 700 } }, "000") }, "000"),
            React.createElement(TabItem, { label: 'tab1' }, "111"),
            React.createElement(TabItem, { label: 'tab2', disable: true }, "222"),
            React.createElement(TabItem, { label: 'tab3' },
                React.createElement("p", { style: { color: 'red' } }, "333")),
            React.createElement(TabItem, { label: 'tab4' },
                React.createElement("h3", null, "\u54C8\u54C8\u54C8"))),
        React.createElement(Icon, { icon: 'arrow-up', size: '2x', theme: 'success' }),
        React.createElement(Demo, null),
        React.createElement(Input, { style: { width: 200 } }),
        React.createElement(Input, { style: { width: 200 }, disabled: true }),
        React.createElement(AutoComplete, { placeholder: 'AutoComplete', style: { width: 200 }, fetchSuggestions: function (value) {
                // 拿到输入的数据, 过滤出需要的数据
                // return listData.filter(item => item.value.toUpperCase().includes(value.toUpperCase()))
                return fetch("https://api.github.com/search/users?q=" + value)
                    .then(function (res) { return res.json(); })
                    .then(function (res) {
                    console.log(res);
                    return res.items.slice(0, 10).map(function (item) { return (__assign({ value: item.login }, item)); });
                });
            }, onSelect: function (item) {
                console.log(item);
            } }),
        React.createElement(Upload
        // action={'https://jsonplaceholder.typicode.com/posts/'}
        , { 
            // action={'https://jsonplaceholder.typicode.com/posts/'}
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', onProgress: function (percentage, file) {
                console.log(percentage, file);
            }, onSuccess: function (res, fileListItem) {
                console.log('success: ', res, fileListItem);
            }, onError: function (res, fileListItem) {
                console.log('error: ', res, fileListItem);
            }, onChange: function (fileListItem, fileList) {
                console.log('change: ', fileListItem, fileList);
            }, defaultFileList: [
                { uid: '1', size: 111, name: '1.png', status: 'uploading', percent: 15 },
                { uid: '2', size: 222, name: '2.jpg', status: 'success', percent: 50 },
                { uid: '3', size: 333, name: '3.jpeg', status: 'error', percent: 70 },
            ], onRemove: function (fileItem) {
                // console.log(fileItem)
            }, headers: { 'aaa-bbb': 'chen' }, name: 'chen-img' // 文件名
            , data: { time: '2020-8-8' }, multiple // 多选
            : true, 
            // accept="image/*" // 接收的文件类型
            // accept=".png"
            draggable: true },
            React.createElement(Button, { btnType: 'primary' },
                React.createElement(Icon, { icon: 'upload' }),
                "\u00A0 \u4E0A\u4F20"))));
}
export default App;
