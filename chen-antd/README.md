# 组件库样式变量分类

> [样式初始化](https://github.com/necolas/normalize.css)

## 基础色彩系统

```scss
// !default 使用者定义过这个变量的话,预置的变量就不会生效了,方便其他开发者重写变量
// 中性色
$white: #fff !default;
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;
$black: #000 !default;

// 基础色板, 定义不同的基础色
$blue: #0d6efd !default;
$indigo: #6610f2 !default;
$purple: #6f42c1 !default;
$pink: #d63384 !default;
$red: #dc3545 !default;
$orange: #fd7e14 !default;
$yellow: #fadb14 !default;
$green: #52c41a !default;
$teal: #20c997 !default;
$cyan: #17a2b8 !default;

// 系统色板, 系统提示色, 操作提示色
$primary: $blue !default;
$secondary: $gray-600 !default;
$success: $green !default;
$info: $cyan !default;
$warning: $yellow !default;
$danger: $red !default;
$light: $gray-100 !default;
$dark: $gray-800 !default;
```

## 字体系统

## 表单

## 按钮

## 边框和阴影

## 可配置开关



# 乱七八糟

- [classnames](https://github.com/JedWatson/classnames) 将classnames有条件的连接在一起

- mixin使用(实现复用css代码)

  ```scss
  // 定义mixin
  @mixin button-size($padding-y, $padding-x, $font-size, $border-radius) {
    padding: $padding-y $padding-x;
    font-size: $font-size;
    border-radius: $border-radius;
  }
  
  // 使用mixin
  @include button-size($btn-padding-y, $btn-padding-x, $btn-font-size, $btn-border-radius);
  ```

  