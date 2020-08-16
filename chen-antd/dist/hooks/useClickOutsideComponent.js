// 点击传入的组件外时触发回调的hook
import { useEffect } from 'react';
var useClickOutsideComponent = function (ref, callback) {
    useEffect(function () {
        var handleClick = function (e) {
            // console.log(e.target)
            // 如果 dom 中没有这个节点 或者这个节点包括了点击的这个元素 return
            if (!ref.current || ref.current.contains(e.target))
                return;
            callback();
        };
        document.addEventListener('click', handleClick);
        return function () {
            document.removeEventListener('click', handleClick);
        };
    }, [callback, ref]);
};
export default useClickOutsideComponent;
