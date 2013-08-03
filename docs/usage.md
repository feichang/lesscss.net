# 使用说明

## 基本使用方式

浏览器端使用是在使用LESS开发时最直观的一种方式。如果是在生产环境中，尤其是对性能要求比较高的场合，建议使用node或者其它第三方工具先编译成CSS再上线使用。

浏览器端使用方法：

1. 使用`link`引入.less文件，注意将`rel`设为`stylesheet/less`:

		<link rel="stylesheet/less" type="text/css" href="styles.less" />
2. 在本站下载less.js，将它引入页面的`<head>`元素中，像这样：

		<script src="less.js" type="text/javascript"></script>
		
需要注意.less文件要在脚本文件之前引入。

### 特别注意

1. 由于less.js会通过ajax拉取.less文件，故**必须在http(s)协议下使用**，即直接双击打开是无法生效的
2. 由于less.js会通过ajax拉取.less文件，故**.less文件不可以跨域使用**，否则会无法生效（当然，可以通过在服务端设置CORS来解决）
3. 由于.less对于IIS来说是一个陌生的后缀，高版本IIS会阻止访问，返回404，解决方案是**为.less文件添加MIME为`text/css`**，或者更简单，改后缀为.css即可

## 高级设置

你可以引入less.js之前通过创建一个全局`less`对象的方式来指定参数，例如：

	<script type="text/javascript">
		less = {
			env: "development", // 或者"production"
			async: false,       // 异步加载导入的文件
			fileAsync: false,   // 使用文件协议访问页面时异步加载导入的文件
			poll: 1000,         // 在监视模式下，每两次请求之间的时间间隔（ms）
			functions: {},      // user functions, keyed by name
			dumpLineNumbers: "comments", // 或者"mediaQuery"，或者"all"
			relativeUrls: false,// 是否调整相对路径
								// 如果为false，则url已经是相对入口less文件的
								// entry less file
			rootpath: ":/a.com/"// 添加到每个url开始处的路径
		};
	</script>
	<script src="less.js" type="text/javascript"></script>

## 监视模式

监视模式是一种在客户端（浏览器）使用时的特性，它会在样式文件有更新时自动刷新页面。

在URL中加入`#!watch`并刷新页面即可开启监视模式。你也可以通过在console中运行`less.watch()`来开启监视模式。

## 修改变量

使用`modifyVars`可以在运行时修改LESS变量。当用新的变量值调用了这个函数时，LESS文件将会被重新编译，但不会被重新加载。一个基本的用法示例：

	less.modifyVars({
		'@buttonFace': '#5B83AD',
		'@buttonText': '#D9EEF2'
	});

## 调试

我们在生成的CSS中带上一些额外的信息，以便一些调试工具可以定位到LESS文件中的行数。

可以通过`dumpLineNumbers`选项或者在url中添加`!dumpLineNumbers:mediaQuery`来开启这个功能。

你可以选择“注释”方式，使用FireLESS来调，或者选择“mediaQuery”方式，使用FireBug/Chrome开发者工具（被识别为SCSS media query调试格式）来调试。

## Node.js

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

## 在代码中使用

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