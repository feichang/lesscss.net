# 首页 - LESSCSS中国官网


## 什么是LESSCSS

LESSCSS是一种动态样式语言，属于CSS预处理语言的一种，它使用类似CSS的语法，为CSS的赋予了动态语言的特性，如变量、继承、运算、函数等，更方便CSS的编写和维护。

LESSCSS可以在多种语言、环境中使用，包括浏览器端、桌面客户端、服务端。

语言特性快速预览：

### 变量：

变量允许我们单独定义一系列通用的样式，然后在需要的时候去调用。所以在做全局样式调整的时候我们可能只需要修改几行代码就可以了。

LESS源码：

	@color: #4D926F;

	#header {
		color: @color;
	}
	h2 {
		color: @color;
	}


编译后的CSS：

	#header {
		color: #4D926F;
	}
	h2 {
		color: #4D926F;
	}

### 混合（Mixins）

混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。我们还可以带参数地调用，就像使用函数一样。

LESS源码：

	.rounded-corners (@radius: 5px) {
		-webkit-border-radius: @radius;
		-moz-border-radius: @radius;
		-ms-border-radius: @radius;
		-o-border-radius: @radius;
		border-radius: @radius;
	}

	#header {
		.rounded-corners;
	}
	#footer {
		.rounded-corners(10px);
	}

编译后的CSS：

	#header {
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		-ms-border-radius: 5px;
		-o-border-radius: 5px;
		border-radius: 5px;
	}
	#footer {
		-webkit-border-radius: 10px;
		-moz-border-radius: 10px;
		-ms-border-radius: 10px;
		-o-border-radius: 10px;
		border-radius: 10px;
	}


### 嵌套

我们可以在一个选择器中嵌套另一个选择器来实现继承，这样很大程度减少了代码量，并且代码看起来更加的清晰。

LESS源码：

	#header {
		h1 {
			font-size: 26px;
			font-weight: bold;
		}
		p {
			font-size: 12px;
			a {
				text-decoration: none;
				&:hover {
					border-width: 1px
				}
			}
		}
	}

编译后的CSS：

	#header h1 {
		font-size: 26px;
		font-weight: bold;
	}
	#header p {
		font-size: 12px;
	}
	#header p a {
		text-decoration: none;
	}
	#header p a:hover {
		border-width: 1px;
	}

### 函数和运算

运算提供了加，减，乘，除操作；我们可以做属性值和颜色的运算，这样就可以实现属性值之间的复杂关系。LESS中的函数一一映射了JavaScript代码，如果你愿意的话可以操作属性值。

LESS源码：

	@the-border: 1px;
	@base-color: #111;
	@red:        #842210;

	#header {
		color: (@base-color * 3);
		border-left: @the-border;
		border-right: (@the-border * 2);
	}
	#footer {
		color: (@base-color + #003300);
		border-color: desaturate(@red, 10%);
	}

编译后的CSS：

	#header {
		color: #333;
		border-left: 1px;
		border-right: 2px;
	}
	#footer {
		color: #114411;
		border-color: #7d2717;
	}

## 为什么用LESS

## 如何上手

Client-side usage

Client-side is the easiest way to get started and good for developing your LESS. For production and especially if performance is important, we recommend pre-compiling using node or one of the many third party tools.

Link your .less stylesheets with the rel set to “stylesheet/less”:

<link rel="stylesheet/less" type="text/css" href="styles.less" />
Then download less.js from the top of the page, and include it in the <head> element of your page, like so:

<script src="less.js" type="text/javascript"></script>
Make sure you include your stylesheets before the script.

You can set options by setting things on a global LESS object before the script. E.g.

<script type="text/javascript">
	less = {
		env: "development", // or "production"
		async: false,       // load imports async
		fileAsync: false,   // load imports async when in a page under
							// a file protocol
		poll: 1000,         // when in watch mode, time in ms between polls
		functions: {},      // user functions, keyed by name
		dumpLineNumbers: "comments", // or "mediaQuery" or "all"
		relativeUrls: false,// whether to adjust url's to be relative
							// if false, url's are already relative to the
							// entry less file
		rootpath: ":/a.com/"// a path to add on to the start of every url
							//resource
	};
</script>
<script src="less.js" type="text/javascript"></script>
Watch mode

Watch mode is a client-side feature which enables your styles to refresh automatically as they are changed.

To enable it, append ‘#!watch’ to the browser URL, then refresh the page. Alternatively, you can run less.watch() from the console.

Modify variables

modifyVars enables modification of LESS variables in run-time. When called with new values, the LESS file is recompiled without reloading. Simple basic usage:

less.modifyVars({
	'@buttonFace': '#5B83AD',
	'@buttonText': '#D9EEF2'
});
Debugging

It is possible to output rules in your CSS which allow tools to locate the source of the rule.

Either specify the option dumpLineNumbers as above or add !dumpLineNumbers:mediaQuery to the url.

You can use the “comments” option with FireLESS and the “mediaQuery” option with FireBug/Chrome dev tools (it is identical to the SCSS media query debugging format).

Server-side usage

Installation

The easiest way to install LESS on the server, is via npm, the node package manager, as so:

$ npm install -g less
Command-line usage

Once installed, you can invoke the compiler from the command-line, as such:

$ lessc styles.less
This will output the compiled CSS to stdout, you may then redirect it to a file of your choice:

$ lessc styles.less > styles.css
To output minified CSS, simply pass the -x option. If you would like more involved minification, the YUI CSS Compressor is also available with the --yui-compress option.

To see all the command line options run lessc without parameters.

Usage in Code

You can invoke the compiler from node, as such:

var less = require('less');

less.render('.class { width: (1 + 1) }', function (e, css) {
	console.log(css);
});
which will output

.class {
	width: 2;
}
you may also manually invoke the parser and compiler:

var parser = new(less.Parser);

parser.parse('.class { width: (1 + 1) }', function (err, tree) {
	if (err) { return console.error(err) }
	console.log(tree.toCSS());
});
Configuration

You may pass some options to the compiler:

var parser = new(less.Parser)({
	paths: ['.', './lib'], // Specify search paths for @import directives
	filename: 'style.less' // Specify a filename, for better error messages
});

parser.parse('.class { width: (1 + 1) }', function (e, tree) {
	tree.toCSS({ compress: true }); // Minify CSS output
});
Third Party Tools

There are a selection of tools available to run in your particular environment and these are documented in the Github wiki.

Command Line Tools

GUI Tools

## 更新说明

### 1.4.0

1.4.0已经正式发布，这个版本引入了一些新特性，如派伸（extends）、`data-uri`函数以及更多的数学函数。详细的变更情况请查看[更新日志](../changelog.html)。

在这个版本中，有一些不兼容的变化。

- `@import-once`被移除，现在`@import`的默认行为就是只引入一次（和旧版本`@import-once`功能一样）。
- 像`(~".myclass_@{index}") {...}`这样在选择器中插入变量的语法不再被支持，请使用`.myclass_@{index} {...}`来代替，这种新语法在1.3.1以上版本中都支持。
- 用于浏览器的less.js不再包含es5-shim.js。因为我们之前用的es5-shim.js版本中有一些错误，而新版本的体积又明显变大了。使用时请根据需要选用es5-shim或者是只在现代浏览器中使用。
- 引入了一种“严格运算模式”（可选），在严格运算模式中，数学运算必须被括号包裹，如：

		(1 + 1)  // 2
		1 + 1    // 1+1

	在1.4.0中，这个选项默认被关闭，但我们希望在未来的某个时间将它默认设置为开启。我们建议你升级代码的写法，并打开严格运算模式。（在命令行中加上`-strict-math=on`或者是在JavaScript代码中加入`strictMath:true`。）带括号的写法与旧版的less编译器兼容。
- 引入了一种“严格单位模式”（`strictUnits:true`或者`strict-units=on`），这将强制让lessc验证单位的合法性。例如`4px/2px`结果为`2`，而不是`2px`，而`4em/2px`将报错。目前没有将这个选项默认打开的计划，但它可能在排查bug的时候有用。
- 单位的运算功能已完成，所以`(4px * 3em) / 4px`以前结果是`3px`，但现在是`3em`。但是，我们没有取消有单位数字向无单位数字转换的功能，除非“严格单位模式”被开启。

你可以现在就将选择器中插入变量、运算、单位的涉及到的变化应用到代码中去，这些变化能很好地与less 1.3.3兼容。
