# 资源汇总

## GUI编译工具

为方便起见，建议初学者使用GUI编译工具来编译.less文件，以下是一些可选GUI编译工具：

1. koala(Win/Mac/Linux)

	国人开发的LESSCSS/SASS编译工具。下载地址：<http://koala-app.com/index-zh.html>
2. Codekit(Mac)

	一款自动编译Less/Sass/Stylus/CoffeeScript/Jade/Haml的工具，含语法检查、图片优化、自动刷新等附加功能。下载地址<http://incident57.com/codekit/>
3. WinLess(Win)

	一款LESS编译软件。下载地址<http://winless.org/>
4. SimpleLess(Win/Mac/Linux)

	一款LESS编译软件。下载地址<http://wearekiss.com/simpless>

## Node.js库

LESSCSS官方有一款基于Node.js的库，用于编译.less文件。

使用时，首先全局安装less（部分系统下可能需要在前面加上sudo切换为超级管理员权限）：

	npm install -g less

接下来就可以使用lessc来编译.less文件了：

	lessc example/example.less example/example.css

更多选项可以直接运行lessc查看说明。

## Grunt.js插件

[grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)

## 其它语言

### Java

- [LESS Engine](https://github.com/Asual/lesscss-engine) (在Rhino引擎中运行less.js)
- [LESS CSS Compiler for Java](https://github.com/marceloverdijk/lesscss-java) (在Rhino引擎中运行less.js)
- [Less4j](https://github.com/SomMeri/less4j) (原生Java实现)

### .Net

- [LESS CSS for .Net](http://www.dotlesscss.org/)

### PHP

- [lessphp](http://leafo.net/lessphp/docs/)
- [BW LESS CSS](http://wordpress.org/extend/plugins/bw-less-css/) (WordPress插件)

### Ruby

- [Less.js In Ruby's V8 Engine](https://github.com/cowboyd/less.rb)

## 相关文章

- [webstorm 用firewatcher编译less](http://www.cnblogs.com/enix/archive/2013/06/07/3123899.html)
- [koala(英文)](http://www.webresourcesdepot.com/desktop-compiler-for-less-sass-compass-and-coffeescript-koala/)
- [不要盲目在项目中使用LESSCSS](http://www.cnblogs.com/hooray/archive/2011/12/02/2272212.html)（这篇评论很值得一看，^O^）
- [为什么应该在web开发中使用LESSCSS](http://blog.ryanye.me/2012/10/06/why-you-should-use-lesscss/)
- [让VS2012支持LESSCSS](http://oklai.name/2012/08/%E8%AE%A9vs2012%E6%94%AF%E6%8C%81less-css/)（sublime等编辑器也可以使用类似的方式）
- [Using Less.js to Simplify Your CSS3](http://designshack.net/articles/css/using-less-js-to-simplify-your-css3)
- [我的LESS编译方案](http://www.cnblogs.com/gewei/p/3242558.html)
- [Sublime Text 2的Less2Css插件介绍与安装](http://fdream.net/blog/article/783.aspx)
- [有关less 处理@arguments的一些高级技巧](http://www.cnblogs.com/rubylouvre/p/3207573.html)
- [Twitter Bootstrap：前端框架利器](http://www.programmer.com.cn/13861/)