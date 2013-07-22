# 语言特性 - LESSCSS中国官网


作为CSS的一种扩展，LESSCSS不仅向下兼容CSS的语法，而且连新增的特性也是使用CSS的语法。这样的设计使得学习LESS很轻松，而且你可以在任何时候回退到CSS。

## 变量

很容易理解：

  @nice-blue: #5B83AD;
  @light-blue: @nice-blue + #111;

  #header { color: @light-blue; }

输出：

  #header { color: #6c94be; }

甚至可以在定义变量值时使用其它的变量：

  @fnord: "I am fnord.";
  @var: 'fnord';
  content: @@var;

解析后：

  content: "I am fnord.";

如果对同一个变量定义两次的话，在当前作用域中最后一次定义的将被使用。这与CSS的机制类似，最后一次定义的值会成为这个属性的值。

比如：

  @var: 0;
  .class1 {
    @var: 1;
    .class {
      @var: 2;
      three: @var;
      @var: 3;
    }
    one: @var;
  }

会编译成：

  .class1 .class {
    three: 3;
  }
  .class {
    one: 1;
  }

变量是“按需加载”（lazy loaded）的，因此不必强制在使用之前声明。

下面是一个有效的LESS代码片段：

  lazy-eval {
    width: @var;
  }

  @var: @a;
  @a: 9%;

下面这个片段也是有效的：

  .lazy-eval-scope {
    width: @var;
    @a: 9%;
  }

  @var: @a;
  @a: 100%;

这两个片段都会编译成：

  .lazy-eval-scope {
    width: 9%;
  }

## 混合（Mixins）

在 LESS 中我们可以定义一些通用的属性集为一个 class，然后在另一个 class 中去调用这些属性，下面有这样一个 class：

  .bordered {
    border-top: dotted 1px black;
    border-bottom: solid 2px black;
  }

那如果我们现在需要在其他 class 中引入那些通用的属性集，那么我们只需要在任何 class 中像下面这样调用就可以了：

  #menu a {
    color: #111;
    .bordered;
  }
  .post a {
    color: red;
    .bordered;
  }

`.bordered` class 里面的属性样式都会在 `#menu a` 和 `.post a` 中体现出来：

  #menu a {
    color: #111;
    border-top: dotted 1px black;
    border-bottom: solid 2px black;
  }
  .post a {
    color: red;
    border-top: dotted 1px black;
    border-bottom: solid 2px black;
  }

任何 CSS class, id 或者 元素 属性集都可以以同样的方式引入。

> 注意：变量也会被混合，也就是说变量会被带到当前的作用域。这个特性还有争议，也许在未来会有变化。

### 带参数混合

在 LESS 中，你还可以像函数一样定义一个带参数的属性集合：

  .border-radius (@radius) {
    border-radius: @radius;
    -moz-border-radius: @radius;
    -webkit-border-radius: @radius;
  }

然后在其他 class 中像这样调用它：

  #header {
    .border-radius(4px);
  }
  .button {
    .border-radius(6px);
  }

我们还可以像这样给参数设置默认值：

  .border-radius (@radius: 5px) {
    border-radius: @radius;
    -moz-border-radius: @radius;
    -webkit-border-radius: @radius;
  }

所以现在如果我们像这样调用它的话：

  #header {
    .border-radius;
  }

`radius` 的值就会是 5px。

你也可以定义不带参数属性集合，如果你想隐藏这个属性集合，不让它暴露到 CSS 中去，但是你还想在其他的属性集合中引用，你会发现这个方法非常的好用：

  .wrap () {
    text-wrap: wrap;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    word-wrap: break-word;
  }

  pre { .wrap }

输出：

  pre {
    text-wrap: wrap;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    word-wrap: break-word;
  }

### 多参数混合

多个参数可以使用分号或者逗号分隔，推荐使用分号分隔，因为逗号有两重含义：它既可以表示混合的参数，也可以表示一个参数中一组值的分隔符。

使用逗号作为参数分隔符意味着可以将逗号分隔的一组值作为一个变量处理。换句话说，如果编译器在混合的定义或者是调用中找到至少一个分号，就会假设参数是使用分号分隔的，所有的逗号都属于参数中的一组值的分隔符。

2个参数，每个参数都含有通过逗号分隔的一组值的情况：`.name(1, 2, 3; something, else)`。

3个参数，每个参数只含一个数字的情况：`.name(1, 2, 3)`。

使用一个象征性的分号可以创建一个只含一个参数，但参数包含一组值的混合：`.name(1, 2, 3;)`。

逗号分隔的一组值参数的默认值：`.name(@param1: red, blue;)`。

使用同样的名字和同样数量的参数定义多个混合是合法的。在被调用时，LESS会应用到所有可以应用的混合上。比如你调用混合时只传了一个参数`.mixin(green)`，那么所有只强制要求一个参数的混合都会被调用：

  .mixin(@color) {
    color-1: @color;
  }
  .mixin(@color; @padding:2) {
    color-2: @color;
    padding-2: @padding;
  }
  .mixin(@color; @padding; @margin: 2) {
    color-3: @color;
    padding-3: @padding;
    margin: @margin @margin @margin @margin;
  }
  .some .selector div {
    .mixin(#008000);
  }

编译结果：

  .some .selector div {
    color-1: #008000;
    color-2: #008000;
    padding-2: 2;
  }

### @arguments 变量

@arguments包含了所有传递进来的参数。 如果你不想单独处理每一个参数的话就可以像这样写：

  .box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
    box-shadow: @arguments;
    -moz-box-shadow: @arguments;
    -webkit-box-shadow: @arguments;
  }
  .box-shadow(2px, 5px);

将会输出：

  box-shadow: 2px 5px 1px #000;
  -moz-box-shadow: 2px 5px 1px #000;
   -webkit-box-shadow: 2px 5px 1px #000;

### 高级参数用法与 `@rest` 变量

如果需要在 mixin 中不限制参数的数量，可以在变量名后添加 ...，表示这里可以使用 N 个参数。

  .mixin (...) {        // 接受 0-N 个参数
  .mixin () {           // 不接受任何参数
  .mixin (@a: 1) {      // 接受 0-1 个参数
  .mixin (@a: 1, ...) { // 接受 0-N 个参数
  .mixin (@a, ...) {    // 接受 1-N 个参数

此外：

  .mixin (@a, @rest...) {
    // @rest 表示 @a 之后的参数
    // @arguments 表示所有参数
  }

###　`!important`关键字

调用时在混合后面加上`!important`关键字表示将混合带来的所有属性标记为`!important`：

  .mixin (@a: 0) {
    border: @a;
    boxer: @a;
  }
  .unimportant {
    .mixin(1); 
  }
  .important {
    .mixin(2) !important; 
  }

编译成：

  .unimportant {
    border: 1;
    boxer: 1;
  }
  .important {
    border: 2 !important;
    boxer: 2 !important;
  }

### 模式匹配与Guard表达式

LESS 提供了通过参数值控制 mixin 行为的功能，让我们先从最简单的例子开始：

  .mixin (@s, @color) { ... }

  .class {
    .mixin(@switch, #888);
  }

如果要根据 `@switch` 的值控制 `.mixin` 行为，只需按照下面的方法定义 `.mixin`：

  .mixin (dark, @color) {
    color: darken(@color, 10%);
  }
  .mixin (light, @color) {
    color: lighten(@color, 10%);
  }
  .mixin (@_, @color) {
    display: block;
  }

然后调用：

  @switch: light;

  .class {
    .mixin(@switch, #888);
  }

将会得到以下 CSS：

  .class {
    color: #a2a2a2;
    display: block;
  }

传给 `.mixin` 的颜色将执行 `lighten` 函数，如果 `@switch` 的值是 `dark`，那么则会执行 `darken` 函数输出颜色。

以下是整个过程如何发生的：

- 第一个 `.mixin` 没有匹配，因为不满足 `dark` 条件；
- 第二个 `.mixin` 可以被匹配，因为它满足了 `light` 条件；
- 第三个 `.mixin` 也可以被匹配，因为它接受任何参数。

只有满足匹配要求的混合才会被使用。混合中的变量可以匹配任何值，非变量形式的值只有与传入的值完全相等时才可以匹配成功。

我们也可以根据参数的数量进行匹配，比如：

  .mixin (@a) {
    color: @a;
  }
  .mixin (@a, @b) {
    color: fade(@a, @b);
  }

调用 `.mixin` 时，如果使用了一个参数，输出第一个 `.mixin`，使用了两个参数，则输出第二个。

#### Guards

与上面匹配值或者匹配参数数量的情况不同，Guards 被用来匹配表达式 (expressions)。如果你很熟悉编程函数的用法，那么很可能你已经掌握它的用法了。

为了尽可能地符合 CSS 的语言结构，LESS 选择使用 guard混合（guarded mixins）（类似于 `@media` 的工作方式）执行条件判断，而不是加入 `if/else` 声明。

首先通过下面的例子开始介绍：

  .mixin (@a) when (lightness(@a) >= 50%) {
    background-color: black;
  }
  .mixin (@a) when (lightness(@a) < 50%) {
    background-color: white;
  }
  .mixin (@a) {
    color: @a;
  }

要点在于关键词 `when`，它引入了一个 guard 条件 （这里只用到一个 guard）。现在如果运行下面的代码：

  .class1 { .mixin(#ddd) }
  .class2 { .mixin(#555) }

将会得到以下输出结果：

  .class1 {
    background-color: black;
    color: #ddd;
  }
  .class2 {
    background-color: white;
    color: #555;
  }

Guards 支持的运算符包括：`>` `>=` `=` `=<` `<`。说明一下，`true`关键字是唯一被判断为真的值，也就是这两个混合是相等的：

  .truth (@a) when (@a) { ... }
  .truth (@a) when (@a = true) { ... }

其他不为 `true` 的值都判为假：

  .class {
    .truth(40); // 不会匹配上面的 mixin
  }

多个Guards可以通过逗号表示分隔，如果其中任意一个结果为 `true`，则匹配成功：

  .mixin (@a) when (@a > 10), (@a < -10) { ... }

值得注意的是不同的参数之间也可以比较，而参与比较的也可以一个参数都没有：

  @media: mobile;

  .mixin (@a) when (@media = mobile) { ... }
  .mixin (@a) when (@media = desktop) { ... }

  .max (@a, @b) when (@a > @b) { width: @a }
  .max (@a, @b) when (@a < @b) { width: @b }

如果需要根据值的类型匹配混合，可以使用 `is*` 函数：

  .mixin (@a, @b: 0) when (isnumber(@b)) { ... }
  .mixin (@a, @b: black) when (iscolor(@b)) { ... }

几个检查基本类型的函数：

- `iscolor`
- `isnumber`
- `isstring`
- `iskeyword`
- `isurl`

如果需要检查一个值（数字）使用了哪个单位，可以使用下面三个函数：

- `ispixel`
- `ispercentage`
- `isem`

最后，你可以使用关键词 `and` 在 `guard` 中加入额外的条件:

.mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }

或者，使用关键词 `not` 否定条件：

.mixin (@b) when not (@b > 0) { ... }

## 嵌套规则

LESS 可以让我们以 嵌套 的方式编写层叠样式。 让我们先看下下面这段 CSS：

#header { color: black; }
    #header .navigation {
    font-size: 12px;
    }
    #header .logo {
    width: 300px;
    }
    #header .logo:hover {
    text-decoration: none;
    }
在 LESS 中, 我们就可以这样写：

#header {
    color: black;

    .navigation {
    font-size: 12px;
    }
    .logo {
    width: 300px;
    &:hover { text-decoration: none }
    }
    }
或者这样写：

#header        { color: black;
    .navigation  { font-size: 12px }
    .logo        { width: 300px;
    &:hover    { text-decoration: none }
    }
    }
代码更简洁了，而且感觉跟 DOM 结构格式有点像。

注意 & 符号的使用 — 如果你想写串联选择器，而不是写后代选择器，就可以用到 & 了。这点对伪类尤其有用如 :hover 和 :focus。

例如：

.bordered {
    &.float {
    float: left;
    }
    .top {
    margin: 5px;
    }
    }
会输出：

.bordered.float {
    float: left;
    }
    .bordered .top {
    margin: 5px;
    }
嵌套 Media Queries

Media queries 允许像选择器那样进行嵌套。

.one {
    @media (width: 400px) {
    font-size: 1.2em;
    @media print and color {
    color: blue;
    }
    }
    }
输出：

@media (width: 400px) {
    .one {
    font-size: 1.2em;
    }
    }
    @media (width: 400px) and print and color {
    .one {
    color: blue;
    }
    }
& 的高级用法

嵌套的外层含有多个选择器的情况下，& 符号可以交替输出他们的顺序。

例如：

.child, .sibling {
    .parent & {
    color: black;
    }
    & + & {
    color: red;
    }
    }
输出：

.parent .child,
    .parent .sibling {
    color: black;
    }
    .child + .child,
    .child + .sibling,
    .sibling + .child,
    .sibling + .sibling {
    color: red;
    }
& 也可以用在 mixin 中表示嵌套这个 mixin 的父选择器。

运算

任何数字、颜色或者变量都可以参与运算，来看一组例子：

@base: 5%;
    @filler: @base * 2;
    @other: @base + @filler;

    color: #888 / 4;
    background-color: @base-color + #111;
    height: 100% / 2 + @filler;
LESS 的运算已经超出了我们的期望，它能够分辨出颜色和单位。如果像下面这样单位运算的话：

@var: (1px + 5);
LESS 会输出 6px。

括号也同样允许使用：

width: ((@var + 5) * 2);
并且可以在复合属性中进行运算：

border: (@width * 2) solid black;
函数

LESS 提供了多种函数用于控制颜色变化、处理字符串、算术运算等等。这些函数会在下面的函数列表部分详细介绍。

函数的用法非常简单，下面这个例子将介绍如何将 0.5 转换为 50%；颜色饱和度增加 5%；以及颜色亮度降低 25% 色相值增加 8 等用法：

@base: #f04615;
    @width: 0.5;

    .class {
    width: percentage(0.5); // returns `50%`
    color: saturate(@base, 5%);
    background-color: spin(lighten(@base, 25%), 8);
    }
命名空间

有时候，你可能为了更好组织 CSS 或者单纯是为了更好的封装，将一些变量或者混合模块打包起来，你可以像下面这样在 #bundle 中定义一些属性集之后可以重复使用：

#bundle {
    .button () {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover { background-color: white }
    }
    .tab { ... }
    .citation { ... }
    }
你只需要在 #header a 中像这样引入 .button：

#header a {
    color: orange;
    #bundle > .button;
    }
作用域

LESS 中的作用域跟其他编程语言非常类似，首先会从本地查找变量或者混合模块，如果没找到的话会去父级作用域中查找，直到找到为止。

@var: red;

    #page {
    @var: white;
    #header {
    color: @var; // white
    }
    }

    #footer {
    color: @var; // red
    }
注释

CSS 的注释格式在 LESS 中是依然保留的：

/* Hello, I'm a CSS-style comment */
    .class { color: black }
LESS 同样也支持双斜线的注释，但是编译成 CSS 的时候自动过滤掉：

// Hi, I'm a silent comment, I won't show up in your CSS
    .class { color: white }
Importing

你可以在 main 文件中通过下面的格式导入 .less 文件， .less 后缀可带可不带：

@import "lib.less";
    @import "lib";
如果你想导入一个 CSS 文件而且不想 LESS 对它进行处理，只需要使用 .css 后缀就可以：

@import "lib.css";
这样 LESS 就会跳过它不去处理它。

为了避免重复导入文件，使用 @import-once 限制文件只允许被导入一次。

@import-once "lib.less";
    @import-once "lib.less"; // will be ignored
LESS 1.4.0 版将默认执行 @import-once

字符串插值

变量可以用类似 ruby 和 php 的方式嵌入到字符串中，像 @{name} 这样的结构：

@base-url: "http://assets.fnord.com";
    background-image: url("@{base-url}/images/bg.png");
避免编译

有时候我们需要输出一些不正确的 CSS 语法或者使用一些 LESS 不认识的专有语法。

要输出这样的值我们可以在字符串前加上一个 ~，例如：


    .class {
    filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
    }
我们可以将要避免编译的值用 “ ” 包裹起来，输出结果为：


    .class {
    filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
    }
Selector Interpolation

如果需要在选择器中使用 LESS 变量，只需通过 @{selector} 插值语句导入变量，例如：

@name: blocked;
    .@{name} {
    color: black;
    }
输出：

.blocked {
    color: black;
    }
注意：(~"@{name}") 语句可以在 LESS 1.3.1 等之前版本中使用，但 1.4.0 版将不再支持这种用法。

JavaScript evaluation

JavaScript 表达式也可以在 .less 文件中使用，可以通过反引号的方式使用（但是不建议使用）：

@var: `"hello".toUpperCase() + '!'`;
输出：

@var: "HELLO!";
注意你也可以同时使用字符串插值和避免编译：

@str: "hello";
    @var: ~`"@{str}".toUpperCase() + '!'`;
输出：

@var: HELLO!;
它也可以访问 JavaScript 环境：

@height: `document.body.clientHeight`;
如果你想将一个 JavaScript 字符串解析成16进制的颜色值，你可以使用 color 函数：

@color: color(`window.colors.baseColor`);
    @darkcolor: darken(@color, 10%);



Last but not least, you may use the and keyword to provide additional conditions inside a guard:

.mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }
And the not keyword to negate conditions:

.mixin (@b) when not (@b > 0) { ... }
Nested rules

LESS gives you the ability to use nesting instead of, or in combination with cascading. Lets say we have the following CSS:

#header { color: black; }
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
#header .logo:hover {
  text-decoration: none;
}
In LESS, we can also write it this way:

#header {
  color: black;

  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
    &:hover { text-decoration: none }
  }
}
Or this way:

#header        { color: black;
  .navigation  { font-size: 12px }
  .logo        { width: 300px;
    &:hover    { text-decoration: none }
  }
}
The resulting code is more concise, and mimics the structure of your DOM tree.

Notice the & combinator - it’s used when you want a nested selector to be concatenated to its parent selector, instead of acting as a descendant. This is especially important for pseudo-classes like :hover and :focus.

For example:

.bordered {
  &.float {
    float: left;
  }
  .top {
    margin: 5px;
  }
}
Will output

.bordered.float {
  float: left;
}
.bordered .top {
  margin: 5px;
}
Nested Media Queries

Media queries can be nested in the same way as selectors e.g.

.one {
    @media (width: 400px) {
        font-size: 1.2em;
        @media print and color {
            color: blue;
        }
    }
}
Will output

@media (width: 400px) {
  .one {
    font-size: 1.2em;
  }
}
@media (width: 400px) and print and color {
  .one {
    color: blue;
  }
}
Advanced Usage of &

The & symbol can be used in selectors in order to reverse the ordering of the nesting and to multiply classes.

For example:

.child, .sibling {
    .parent & {
        color: black;
    }
    & + & {
        color: red;
    }
}
Will output

.parent .child,
.parent .sibling {
    color: black;
}
.child + .child,
.child + .sibling,
.sibling + .child,
.sibling + .sibling {
    color: red;
}
You can also use & in mixins in order to reference nesting that is outside of your mixin.

Operations

Any number, color or variable can be operated on. Operations should be performed within parentheses. Here are a couple of examples:

@base: 5%;
@filler: (@base * 2);
@other: (@base + @filler);

color: (#888 / 4);
background-color: (@base-color + #111);
height: (100% / 2 + @filler);
The output is pretty much what you expect—LESS understands the difference between colors and units. If a unit is used in an operation, like in:

@var: (1px + 5);
LESS will use that unit for the final output—6px in this case.

Extra parentheses are also authorized in operations:

width: ((@var + 5) * 2);
Functions

LESS provides a variety of functions which transform colors, manipulate strings and do maths. They are documented fully in the function reference.

Using them is pretty straightforward. The following example uses percentage to convert 0.5 to 50%, increases the saturation of a base color by 5% and then sets the background color to one that is lightened by 25% and spun by 8 degrees:

@base: #f04615;
@width: 0.5;

.class {
  width: percentage(0.5); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
Namespaces

Sometimes, you may want to group your variables or mixins, for organizational purposes, or just to offer some encapsulation. You can do this pretty intuitively in LESS—say you want to bundle some mixins and variables under #bundle, for later re-use, or for distributing:

#bundle {
  .button () {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover { background-color: white }
  }
  .tab { ... }
  .citation { ... }
}
Now if we want to mixin the .button class in our #header a, we can do:

#header a {
  color: orange;
  #bundle > .button;
}
Scope

Scope in LESS is very similar to that of programming languages. Variables and mixins are first looked up locally, and if they aren’t found, the compiler will look in the parent scope, and so on.

@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}

#footer {
  color: @var; // red
}
Comments

CSS-style comments are preserved by LESS:

/* Hello, I'm a CSS-style comment */
.class { color: black }
Single-line comments are also valid in LESS, but they are ‘silent’, they don’t show up in the compiled CSS output:

// Hi, I'm a silent comment, I won't show up in your CSS
.class { color: white }
Importing

You can import both CSS and LESS files. Only LESS files import statements are processed, CSS file import statements are kept as they are. If you want to import a CSS file, and don’t want LESS to process it, just use the .css extension:

@import "lib.css";
Compilation makes only one change to CSS file imports: top level CSS file imports are moved on top of the sheet, right after @charset declarations.

Input file with import statement:

h1 { color: green; }
@import "import/official-branding.css?urlParameter=23";
import statement has been moved on top:

@import "import/official-branding.css?urlParameter=23";
h1 { color: green; }
Content of imported LESS file is copied into importing style sheet and compiled together with it. Importing and imported files share all mixins, namespaces, variables and other structures.

In addition, if the import statement has media queries specified in it, imported content is enclosed in the @Media declaration.

Imported “library.less”:

@imported-color: red;
h1 { color: green; }
Main file imports the above library.less file:

@import "library.less" screen and (max-width: 400px); // import with media queries
@import "library.less"; // import without media queries

.class {
  color: @importedColor; // use imported variable
}
Compiled output:

// Corresponds to import with media queries
@media screen and (max-width: 400px) {
  h1 { color: green; }
}

// Corresponds to import without media queries
h1 { color: green; }
.class {
  // Use imported variable
  color: #ff0000;
}
LESS file import statement does not have to be located on top of the style sheet. It can be placed also inside rulesets, mixins or other LESS structures.

Import into ruleset:

pre {
  @import "library.less";
  color: @importedColor;
}
both variable and ruleset defined in “library.less” have been copied into the pre ruleset:

pre {
  color: #ff0000; // variable defined in library.less was available
}
pre h1 { // ruleset defined in library.less was nested into 'pre' ruleset
  color: green;
}
In v1.3.0 - v1.3.3 @import imports a file multiple times and you can override this behaviour with @import-once.

In v1.4.0 @import-once has been removed and @import imports once by default. This means that with the following

@import “file.less”; @import “file.less”;

The second file is ignored.

Any file that does not end with .css is considered less file and processed. In addition, if the file name has no extension or parameters, the “.less” suffix is added on the end. Both of these are equivalent:

@import "lib.less";
@import "lib";
In v1.4.0 you can force a file to be interpreted as a particular type by specifying an option, e.g.

@import (css) "lib";
Will output..

@import "lib";
and

@import (less) "lib.css";
Will import the lib.css file and treat it as less. If you specify a file is less and do not include an extension, none will be added.

String interpolation

Variables can be embedded inside strings in a similar way to Ruby or PHP, with the @{name} construct:

@base-url: "http://assets.fnord.com";
background-image: url("@{base-url}/images/bg.png");
Escaping

Sometimes you might need to output a CSS value which is either not valid CSS syntax, or uses proprietary syntax which LESS doesn’t recognize.

To output such value, we place it inside a string prefixed with ~, for example:

.class {
  filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
}
This is called an “escaped value”, which will result in:

.class {
  filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
}
Escaped values can use the interpolation exactly the same way as strings:

.class {
  @what: "Stuff";
  filter: ~"ms:alwaysHasItsOwnSyntax.For.@{what}()";
}
Selector Interpolation

If you want to use LESS variables inside selectors, you can do this by referencing the variable using @{selector} as in string interpolation. For example:

@name: blocked;
.@{name} {
    color: black;
}
will output

.blocked {
    color: black;
}
Note: prior to LESS 1.3.1 a (~"@{name}") type of selector was supported. Support for this will be removed in 1.4.0.

Media Queries as Variables

If you want to use less variables inside media, you can do this using the usual variable variable referencing syntax @variable. For example:

@singleQuery: ~"(max-width: 500px)";
@media screen, @singleQuery {
  set {
    padding: 3 3 3 3;
  }
}
compiles into:

@media screen, (max-width: 500px) {
  set {
    padding: 3 3 3 3;
  }
}
The variable must contain whole media query. This would cause an error: @media screen and @partial {.

In 1.4.0, without strict maths off, you can also include variables in media values, e.g. @media screen, (max-width: @width) {.

JavaScript evaluation

JavaScript expressions can be evaluated as values inside .less files. We recommend using caution with this feature as the LESS will not be compilable by ports and it makes the LESS harder to maintain. If possible, try to think of a function that can be added to achieve the same purpose and ask for it on github. We have plans to allow expanding the default functions available. However, if you still want to use JavaScript in .less, this is done by wrapping the expression with back-ticks:

@var: `"hello".toUpperCase() + '!'`;
Becomes:

@var: "HELLO!";
Note that you may also use interpolation and escaping as with strings:

@str: "hello";
@var: ~`"@{str}".toUpperCase() + '!'`;
Becomes:

@var: HELLO!;
It is also possible to access the JavaScript environment:

@height: `document.body.clientHeight`;
If you want to parse a JavaScript string as a hex color, you may use the color function:

@color: color(`window.colors.baseColor`);
@darkcolor: darken(@color, 10%);
