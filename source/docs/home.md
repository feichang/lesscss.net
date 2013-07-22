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

## 快速上手

LESSCSS的使用是很容易的，首先，使用你最常使用的代码编辑器，按LESSCSS的语法规则写好.less文件，接下来，使用编译工具它编译成.css，最后再引入页面即可。

### GUI编译工具

为方便起见，建议初学者使用GUI编译工具来编译.less文件，以下是一些可选GUI编译工具：

1. koala(Win/Mac/Linux)

	国人开发的LESSCSS/SASS编译工具。下载地址：<http://koala-app.com/index-zh.html>
2. Codekit(Mac)

	一款自动编译Less/Sass/Stylus/CoffeeScript/Jade/Haml的工具，含语法检查、图片优化、自动刷新等附加功能。下载地址<http://incident57.com/codekit/>
3. WinLess(Win)

	一款LESS编译软件。下载地址<http://winless.org/>
4. SimpleLess(Win/Mac/Linux)

	一款LESS编译软件。下载地址<http://wearekiss.com/simpless>

### Node.js库

LESSCSS官方有一款基于Node.js的库，用于编译.less文件。

使用时，首先全局安装less（部分系统下可能需要在前面加上sudo切换为超级管理员权限）：

	npm install -g less

接下来就可以使用lessc来编译.less文件了：

	lessc example/example.less example/example.css

更多选项可以直接运行lessc查看说明。

### 浏览器端使用

LESSCSS也可以不经编译，直接在浏览器端使用。

使用方法：

1. 下载LESSCSS的.js文件，例如lesscss-1.4.0.min.js。
2. 在页面中引入.less文件

		<link rel="stylesheet/less" href="example.less" />

	需要注意`rel`属性的值是`stylesheet/less`，而不是`stylesheet`。
3. 引入第1步下载的.js文件

		<script src="lesscss-1.4.0.min.js"></script>

需要特别注意的是，由于浏览器端使用时是使用ajax来拉取.less文件，因此直接在本机文件系统打开（即地址是`file://`开头）或者是有跨域的情况下会拉取不到.less文件，导致样式无法生效。

还有一种情况容易导致样式无法生效，就是部分服务器（以IIS居多）会对未知后缀的文件返回404，导致无法正常读取.less文件。解决方案是在服务器中为.less文件配置MIME值为`text/css`（具体方法请搜索）。或者还有一种更简单的方法，即是直接将.less文件改名为.css文件即可。

### 更多说明

更多使用上的说明请参见[使用说明](./usage.html)。


## 更新说明

### 1.4.0

1.4.0已经正式发布，这个版本引入了一些新特性，如派生（extends）、`data-uri`函数以及更多的数学函数。详细的变更情况请查看[更新日志](../changelog.html)。

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
