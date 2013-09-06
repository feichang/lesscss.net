# 使用说明

## 使用koala编译

Koala 是一款由国人开发的开源预处理语言图形编译工具，目前已支持 **Less**、**Sass**、**Compass** 与 **CoffeeScript**。

目前支持以下系统：Windows，Mac, 10.7+，Linux: 32bit / 64bit，Ubuntu: 32bit / 64bit；

我们可以从他们官方网站下载 koala：[点击进入](http://koala-app.com/index-zh.html),使用文档[点击进入](https://github.com/oklai/koala/wiki/%E4%B8%AD%E6%96%87wiki%E9%A6%96%E9%A1%B5)

### 使用方法：

1.  安装完成后打开 Koala，把**文件夹**拖入界面或者是在左侧加号处选择文件夹，此时在界面左边有文件夹路径产生。

	![选择文件夹](/images/usage_1.jpg)

2.  同时有 less 文件将显示在界面中间，右键文件选择输出 CSS 文件的路径。

	![设置输出路径](/images/usage_2.jpg)

3.  左键点击 less 文件在右边则有功能选项栏弹出，下面将介绍功能。

	![设置输出选项](/images/usage_2.jpg)

### 功能介绍：

#### 自动编译（实时编译）：

当开启自动编译时，使用编辑器按下 Ctrl+S 保存时，CSS 文档会自动更新。如果没有打开这个功能，那么需要使用者在自行点击"执行编译"才更新 CSS 文档。

![自动更新选择](/images/usage_4.jpg)

#### 编译选项：

1.  行注释（line comments）：这个功能会在 css 文件里对应的 less 编译出来的 css 代码上方提供一个注释。注释的内容分别说明来自 less 的第几行开始，同时标明是来自那个 less 文件。
2.  调试信息（debug info）：这个调试功能是在保存时自动检测有无错误，注意实时编译关闭时不会开启，需要在你执行时才弹出错误。所以，建议开启实时编译。目前调试功能仅能检测出一些影响编译的错误：例如没有带{}、没带分号。这些错误，而有没有使用选择器或者样式输入错误则不会提示。

	![输出调试信息](/images/usage_5.jpg)

3. 输出方式（代码压缩）：

- 正常（normal）：顾名思义，就是不压缩。
- 压缩（compress）：顾名思义，就是压缩。
- YUI压缩（YUIcompress）：使用 YUI 的压缩打包工具进行压缩。

	![设置输出方式](/images/usage_6.jpg)

## Node.js命令行中使用

### 安装

在Node.js中安装LESS最简单的方式就是使用Node包管理工具npm来安装：

	npm install -g less

如果你使用Mac或者Linux，可能需要使用管理员身份安装：

	sudo npm install -g less

### 在命令行中使用

一旦安装完成，就可以在命令行中调用，例如：

	lessc styles.less

这样的话编译后的CSS将会输出到stdout中，你可以选择将这个输出重定向到文件中：

	lessc styles.less > styles.css

如果你想输出一个压缩后的CSS，只要加到`-x`选项即可。如果你想要更NB的压缩，你也可以选择使用YUI CSS压缩器，只要加上`--yui-compress`选项即可。

直接运行lessc，不带任何参数将可以看到所有的命令行参数。

## 在Node.js代码中使用

你可以在Node中调用编译器，例如：

	var less = require('less');

	less.render('.class { width: (1 + 1) }', function (e, css) {
		console.log(css);
	});

将会输出

	.class {
		width: 2;
	}

你也可以手工调用解析器和编译器：

	var parser = new(less.Parser);

	parser.parse('.class { width: (1 + 1) }', function (err, tree) {
		if (err) { return console.error(err) }
		console.log(tree.toCSS());
	});

### 设置

你可以给编译器传入一些参数：

	var parser = new(less.Parser)({
		paths: ['.', './lib'], // 指定@import搜索的目录
		filename: 'style.less' // 为了更好地输出错误信息，可以指定一个文件名
	});

	parser.parse('.class { width: (1 + 1) }', function (e, tree) {
		tree.toCSS({ compress: true }); // 压缩输出的CSS
	});

## 浏览器端使用

你也可以直接在浏览器中使用LESS，详情请[查看这里](./usage_browser.html)。