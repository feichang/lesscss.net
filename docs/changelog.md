# 更新日志


## 1.4.2（2013-07-20）

- 如果不传入“严格运算模式”参数，`font-size`/`line-height`又可以正确计算了
- npmignore中包含了`.gitattributes`
- 属性名可以包含大写字母
- 一些windows路径处理的bug修复（大写字母，路径中有多个`//`等）

## 1.4.1（2013-07-05）

- 修复`syncImports`和`yui-compress`选项，之前它们是被忽略的
- 修复一些全局变量污染的问题
- 处理参数对象为`null`或者`undefined`的情况

## 1.4.0（2013-06-05）

- 修复传入“严格运算模式”参数的bug

## 1.4.0 Beta 4（2013-05-04）

- 将`strictMaths`修改为`strictMath`。可通过在lessc中使用`--strict-math=on`或者在JavaScript中使用`strictMath:true`来开启。
- 将lessc使用的“严格单位模式”选项改为`--strict-units=off`

## 1.4.0 Beta 3（2013-04-30）

- “严格单位模式”默认关闭，在开启的情况下会给出更有用但正确性稍低的结果，如`2px/1px = 2px`
- 处理相对路径中的`./`
- 为混合的guards表达式和非基本单位的情况添加`isunit`函数
- 扩充了可识别的属性集合
- 错误继承自JavaScript中的Error
- 在浏览器中移除es-5-shim
- 修复在windows/linux中处理本地路径的bug

## 1.4.0 Beta 1 & 2（2013-03-07）

- 在选择器中支持`:extend()`（如`input:extend(.button) {}`），在规则中支持`&:extend();`（如`input { &:extend(.button all); }`）。
- 只有在括号中的表达式才算是运算，这意味着`font: statements`、media query以及`calc`函数可以不用使用“避免编译”格式。可以在lessc中通过`--strict-maths-off`或者在JavaScript中通过`strictMaths:false`来关闭这个特性。
- 单位会参与运算，如`200cm+1m = 3m`、`3px/1px = 3`。如果单位无法正确运算的话，将会得到错误。可以通过在lessc中使用`--strict-units-off`或者在JavaScript中通过`strictUnits:false`来关闭这个错误。
- 选择器中使用`(~"@var")`插值的方式被移除了，请使用`@{var}`。
- 导入的默认行为即是对每个文件只导入一次，`@import-once`被移除。
- 可以通过给导入语句指定参数来指定导入的文件是CSS还是LESS，`@import (less) "file.css"`会将`file.css`当作LESS处理
- 混合中的变量不再“泄露”到调用它的作用域中
- 添加了`data-uri`函数，它会将图片通过BASE64编码直接输出到CSS中，如果`ieCompat`选项为`true`，并且文件过大的话，将会回退为`url()`
- 修复debug选项的明显bug
- 在混合中可以使用其它参数作为参数的默认值，例如`.a(@a, @b:@a)`
- 如果在规则范围（即大括号）之外使用CSS属性，会产生一个错误
- 添加`extract`函数用于从一组值中取中一个值，如`extract(12 13 14, 3)` => `3`
- 添加`luma`、`hsvhue`、`hsvsaturation`、`hsvvalue`函数
- 添加`pow`、`pi`、`mod`、`tan`、`sin`、`cos`、`atan`、`asin`、`acos`和`sqrt`数学函数
- 添加转换函数，如`convert(1rad, deg)` => 角度值
- lessc 在输出时如果目标目录不存在会自动创建
- lessc `@import`支持https和301跳转跟踪
- lessc `-depends`选项会以makefile格式输出导入的文件列表
- lessc `-lint`选项只报告错误
- 在属性中以及选择器插值中支持命名空间
- 其它bug修复

## 1.3.3（2012-12-30）

- 修复使用多个括号调用混合时的bug
- 使用`contrast`函数时， 如果第一个参数不是颜色，将会跳过

## 1.3.2（2012-12-28）

- 浏览器和服务端都不再重写（re-write）url路径（之前是lessc的行为）
- 可以通过`relative-urls`（`less.relativeUrls`）选项来使得url路径相对入口文件
- 可以使用`rootpath`选项来给url路径添加一个base路径
- 支持使用分号分隔参数，这样可以传递使用逗号分隔的值，如`mixin(23px,12px;);`
- 修复了很多极端情况下参数名处理上的问题
- `hsv`、`hsva`、`unit`函数
- 修复了很多不正确的报错信息
- 修复`@import-once`的工作方式，现在使用全路径来判断是否重复引入，而不是通过相对路径
- 支持`:not(:nth-child(3))`
- 混合中的guards表达式会考虑单位
- 支持unicode描述(U+00A1-00A9)
- 支持通过`&`使用带栈（stack）的混合调用方式（1.3.1中失效了）
- 支持`@namespace`和命名空间联合
- 在颜色函数中使用`%`时，考虑颜色超过256的情况
- 与带`%`的值运算时不除以100，并保持原来的单位
- 允许URL包含`%`（如`%20`表示空格）
- 当含有guards表达式的混合不匹配时不再强制要求一个默认的混合
- 使用字符串输出单位（如果你需要获取不带单位的值，请使用`unit`函数）
- 当混合调用与自己同名的混合时不再死循环
- 修复带`!important`调用混合时的bug
- 修复处理多个注释的bug
- 在规则中允许存在多个分号
- 忽略跟在`@charset`后的东西
- `syncImport`选项会使node.js使用同步方式读取文件
- 如果输出目录不存在会自动建立
- 将依赖的cssmin换成了ycssmin
- lessc可以http加载文件
- 允许在非开发模式中调用`less.watch()`
- 在开发模式下不缓存
- 可以更好地处理后面带有查询参数（如时间戳）的less文件
- sass调试语句现在与chrome兼容
- 可使用`modifyVars`函数来改变全局变量并重新渲染

## 1.3.1（2012-10-18）

- 支持注释方式和`@media`方式的调试语句
- 修复在chrome插件中异步调用的bug
- 新函数`tint`、 `shade`、 `multiply`、 `screen`、 `overlay`、 `hardlight`、 `difference`、 `exclusion`、 `average`、 `negation`、 `softlight`、 `red`、 `green`、 `blue`、 `contrast`
- 允许在属性名中“避免编译”
- 允许在选择器中直接使用`@{a}`，如`.a.@{a} { color: black; }`
- `round`函数直接小数参数
- 对`& selector`提供更好支持
- 客户端使用时保持`link`语句的顺序
- lessc帮助更友好
- rhino版本修复
- 修复客户端错误处理的bug
- 支持`dpi`、`vmin`、`vm`、`dppx`、`dpcm`单位
- 修复media query中的`ratio`
- 允许在混合的guards表达式中比较颜色和字符串
- 支持`-*-keyframes`（为`-khtml`而生，但现在支持任何前缀）
- 在混合中，`weight`默认值设为`50%`
- 支持`@import-once`
- 输出时移除重复的规则
- 在调用混合时支持命名参数
- 很多bug修复

## 1.3.0（2012-03-10）

- 支持`@media`代码段
- 支持在选择器中使用任何实体（entities）
- 支持可变参数
- 无参数混合和行为有改变
- 允许在任何选择器中使用`@import`
- media query的查询条件可以是变量
- 自然合并media query的条件
- 修复全局变量泄露
- 修复参数不对的情况下调用时的错误提示
- 修复一个`@arguments`参数相关的bug
- 修复`:: selector`的输出
- 修复在混合中使用`@media`的一个bug

## 1.2.1（2012-01-15）

- 修复浏览器中的导入功能
- 改进浏览器中的错误报告
- 修复导入文件中运行时错误报告
- 修复导入时文件没找到的错误报告

## 1.2.0（2012-01-07）

- 支持混合的guards表达式
- `percentage`函数
- 新的解析十六进制颜色值字符串的函数
- 新的样式类型检查函数
- 修复对rhino的支持
- 修复调用混合时的字符串参数bug
- 修复当`index`为`0`时的错误报告
- 修复在Webkit和IE浏览器中支持
- 修复变量为空时的字符串插值bug
- 支持在混合调用时加上`!important`
- 支持`@keyframes`
- 支持在特写的选择器中使用变量，如`nth-child`
- 正确地支持`@media`和`@import`特性
- 改进使用media query指定的`@import`的支持
- 改进导入文件中产生的错误的报告
- 改进函数调用错误报告
- 改进错误报告