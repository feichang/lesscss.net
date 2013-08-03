# 函数手册 - LESSCSS中国官网

## 索引

- escape(@string);					// 通过 URL-encoding 编码字符串
- e(@string);						// 对字符串转义
- %(@string, values...);			// 格式化字符串
- unit(@dimension, [@unit: ""]);	// 移除或替换属性值的单位
- color(@string);					// 将字符串解析为颜色值
- data-uri([mimetype,] url);		// * 将资源内嵌到css中，可能回退到url()
- ceil(@number);					// 向上取整
- floor(@number);					// 向下取整
- percentage(@number);				// 将数字转换为百分比，例如 0.5 -> 50%
- round(number, [places: 0]);		// 四舍五入取整
- sqrt(number);						// * 计算数字的平方根
- abs(number);						// * 数字的绝对值
- sin(number);						// * sin函数
- asin(number);						// * arcsin函数
- cos(number);						// * cos函数
- acos(number);						// * arccos函数
- tan(number);						// * tan函数
- atan(number);						// * arctan函数
- pi();								// * 返回PI
- pow(@base, @exponent);			// * 返回@base的@exponent次方
- mod(number, number);				// * 第一个参数对第二个参数取余
- convert(number, units);			// * 在数字之间转换
- unit(number, units);				// * 不转换的情况下替换数字的单位
- color(string);					// 将字符串或者转义后的值转换成颜色
- rgb(@r, @g, @b);								// 转换为颜色值
- rgba(@r, @g, @b, @a);							// 转换为颜色值
- argb(@color);									// 创建 #AARRGGBB 格式的颜色值
- hsl(@hue, @saturation, @lightness);			// 创建颜色值
- hsla(@hue, @saturation, @lightness, @alpha);	// 创建颜色值
- hsv(@hue, @saturation, @value);				// 创建颜色值
- hsva(@hue, @saturation, @value, @alpha);		// 创建颜色值
- hue(@color);						// 从颜色值中提取 `hue` 值（色相）
- saturation(@color);				// 从颜色值中提取 `saturation` 值（饱和度）
- lightness(@color);				// 从颜色值中提取 'lightness' 值（亮度）
- hsvhue(@color);					// * 从颜色中提取 `hue` 值，以HSV色彩空间表示（色相）
- hsvsaturation(@color);			// * 从颜色中提取 `saturation` 值，以HSV色彩空间表示（饱和度）
- hsvvalue(@color);					// * 从颜色中提取 `value` 值，以HSV色彩空间表示（色调）
- red(@color);						// 从颜色值中提取 'red' 值（红色）
- green(@color);					// 从颜色值中提取 'green' 值（绿色）
- blue(@color);						// 从颜色值中提取 'blue' 值（蓝色）
- alpha(@color);					// 从颜色值中提取 'alpha' 值（透明度）
- luma(@color);						// 从颜色值中提取 'luma' 值（亮度的百分比表示法）
- saturate(@color, 10%);					// 饱和度增加 10%
- desaturate(@color, 10%);					// 饱和度降低 10%
- lighten(@color, 10%);						// 亮度增加 10%
- darken(@color, 10%);						// 亮度降低 10%
- fadein(@color, 10%);						// 透明度增加 10%
- fadeout(@color, 10%);						// 透明度降低 10%
- fade(@color, 50%);						// 设定透明度为 50%
- spin(@color, 10);							// 色相值增加 10
- mix(@color1, @color2, [@weight: 50%]);	// 混合两种颜色
- greyscale(@color);						// 完全移除饱和度，输出灰色
- contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%]);										// 如果 @color1 的 luma 值 > 43% 输出 @darkcolor，否则输出 @lightcolor
- multiply(@color1, @color2);
- screen(@color1, @color2);
- overlay(@color1, @color2);
- softlight(@color1, @color2);
- hardlight(@color1, @color2);
- difference(@color1, @color2);
- exclusion(@color1, @color2);
- average(@color1, @color2);
- negation(@color1, @color2);
- iscolor(@colorOrAnything);				// 判断一个值是否是颜色
- isnumber(@numberOrAnything);				// 判断一个值是否是数字（可含单位）
- isstring(@stringOrAnything);				// 判断一个值是否是字符串
- iskeyword(@keywordOrAnything);			// 判断一个值是否是关键字
- isurl(@urlOrAnything);					// 判断一个值是否是url
- ispixel(@pixelOrAnything);				// 判断一个值是否是以px为单位的数值
- ispercentage(@percentageOrAnything);		// 判断一个值是否是百分数
- isem(@emOrAnything);						// 判断一个值是否是以em为单位的数值
- isunit(@numberOrAnything, "rem");		// * 判断一个值是否是指定单位的数值

> 含*号的函数只在1.4.0 beta以上版本中可用

## 函数解析

### 字符串函数 (String functions)

#### escape(@string)

使用URL-encoding的方式编码字符串。

以下字符不会被编码：`,` / ` / ` / `?` / `@` / `&` / `+` / `'` / `~` / `!` / `$`。

最常见的被编码的字符串包括：` ` / `#` / `^` / `(` / `)` / `{` / `}` / `|` / `:` / `>` / `<` / `;` / `]` / `[` / `=`。

参数:

- 字符串：需要转义的字符串

返回值：字符串 (string)

例如：

	escape('a=1')

输出：

	a%3D1

> 注意：如果参数不是字符串的话，函数行为是不可预知的。目前传入颜色值的话会返回`undefined`，其它的值会原样返回。写代码时不应该依赖这个特性，而且这个特性在未来有可能改变。

#### e

用于对CSS的转义，与`~"value"`类似。它接受一个字符串作为参数，并原样返回内容（不含引号）。它可用于输出一些不合法的CSS语法，或者是使用LESS不能识别的属性。

参数：

- 字符串：需要转义的字符串

返回值：字符串的内容，不含引号

例如：

	filter:e("ms:alwaysHasItsOwnSyntax.For.Stuff()");

输出：

	filter: ms:alwaysHasItsOwnSyntax.For.Stuff();

> 注意：也接受经`~""`转义的值或者是数字作为参数。其它的值将产生错误。

#### %

`%("format", arguments ...)`将会格式化字符串。第一个参数是一个包含占位符的字符串。占位符以百分号`%`开头，后面接字母`s` / `S` / `d` / `D` / `a` / `A`。后续的参数用于替换这些占位符。如果你需要输出百分号，可以多用一个百分号来转义`%%`。

使用大写的占位符可以将特殊字符按照UTF-8进行转义，函数将会对所有的特殊字符进行转义，除了`(` / `)` / `'` / `~` /`!`。空格会被转义为`%20`。小写的占位符将原样保持特殊字符，不进行转义。

占位符说明：`d` / `D` / `a` / `A` 可以被任意类型的参数替换（颜色、数字、转义的字符串、表达式等）。如果将它们和字符串一起使用，则整个字符串都会被使用，包含引号。但是，引号将会原样放在字符串中，不会被转义。`s` / `S` 可以被除了颜色的之外的任何类型参数替换。如果你将它们和字符串一起使用，则只有字符串的值会被使用，引号会被忽略。

参数：

- 字符串：带有占位符的格式化字符串
- 任意值：用于替换占位符的值

返回值：格式化后的字符串

例如：

- 使用`a`/`d`格式化：`%("repetitions: %a file: %d", 1 + 2, "directory/file.less");`
- 使用大写的`a`/`d`格式化：`%('repetitions: %A file: %D', 1 + 2, "directory/file.less");`
- 使用`s`格式化：`%("repetitions: %s file: %s", 1 + 2, "directory/file.less");`
- 使用大写`s`格式化：`%('repetitions: %S file: %S', 1 + 2, "directory/file.less");`

分别输出如下：

- 使用`a`/`d`格式化：`"repetitions: 3 file: "directory/file.less"";`
- 使用大写的`a`/`d`格式化：`"repetitions: 3 file: %22directory%2Ffile.less%22";`
- 使用`s`格式化：`"repetitions: 3 file: directory/file.less";`
- 使用大写`s`格式化：`"repetitions: 3 file: directory%2Ffile.less";`

### 综合类函数 (Misc functions)

#### color(@string)

解析颜色，将代表颜色的字符串转换为颜色值，参数必须是16进制表示的颜色或者缩写写法。

参数:

- @字符串：代表颜色值的字符串

例如：

	color("#445566")
	color(~"#123")

输出：

	#445566
	#112233

#### unit

移除或替换属性值 (dimension) 的单位。

参数:

- @dimension: 数字，带或不带单位 
- @unit: 可选，将要替换成的单位，如果省略则移除原单位

例如：

	unit(5, px)

输出：

	5px

例如：

	unit(5em)

输出：

	5

#### data-uri

将一个资源使用BASE64编码嵌入到样式文件，如果开启了`ieCompat`选项，而且资源文件的体积过大或者是在浏览器中使用，则会使用`url()`进行回退。如果没有指定MIME，则Node.js会使用MIME包来决定正确的MIME。

参数：

- mimetype: MIME字符串，可选参数
- url: 需要内嵌的文件的url

例如：

	data-uri('../data/image.jpg');

输出：

	url('data:image/jpeg;base64,bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==');

在浏览器中会输出：

	url('../data/image.jpg');

例如：

	data-uri('image/jpeg;base64', '../data/image.jpg');

会输出：

	url('data:image/jpeg;base64,bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==');

### 算数函数 (Math functions)

#### ceil

向上取整。

参数：

- 数字：浮点数

返回值：向上取整后的整数

例如：

	ceil(2.4)

输出：

	3

#### floor

向下取整。

参数：

- 数字：浮点数
- 返回值：向下取整后的整数

例如：

	floor(2.6)

输出：

	2

#### percentage

将浮点数转换为百分比字符串。

参数:

- 数字：浮点数

返回值：字符串

例如：

	percentage(0.5)

输出：

	50%

#### round(number, [places: 0])

四舍五入取整。

参数:

- 数字：浮点数
- 小数位数：数字，可选，四舍五入取整的小数点位置，默认值为0。

返回值：数字 (number)

例如：

	round(1.67)

输出：

	2

例如：

	round(1.67, 1)

输出：

	1.7

#### sqrt

计算一个数的平方根，原样保持单位。

参数：

- 数字：浮点数

返回值：数字，平方根

例如：

	sqrt(25cm)

输出：

	5cm

例如：

	sqrt(18.6%)

输出：

	4.312771730569565%;

#### abs

计算数字的绝对值，原样保持单位。

参数：

- 数字：浮点数

返回值：数字，绝对值

例如：

	abs(25cm)

输出：

	25cm

例如：

	abs(-18.6%)

输出：

	18.6%

#### sin

正弦函数，处理时会将没有单位的数字认为是弧度值。

参数：

- 数字：浮点数，角度
- 返回值：数字，角度对应的正弦值

例如：

	sin(1); // 1弧度角的正弦值
	sin(1deg); // 1角度角的正弦值
	sin(1grad); // 1百分度角的正弦值

分别输出：

	0.8414709848078965;
	0.01745240643728351;
	0.015707317311820675;

> 百分度是将一个圆周分为400份，每份为一个百分度，英文gradian，简写grad。见<http://zh.wikipedia.org/zh/%E7%99%BE%E5%88%86%E5%BA%A6>。

#### asin

反正弦函数，返回以弧度为单位的角度，区间在 -PI/2 到 PI/2之间。

参数：

- 数字：浮点数，代表正弦值，范围为 [-1,1]
- 返回值：数字，角度

例如：

	asin(-0.8414709848078965)
	asin(0)
	asin(2)

分别输出：

	-1rad
	0rad
	NaNrad

> 有关反三角函数的知识可以参见<http://zh.wikipedia.org/zh/%E5%8F%8D%E4%B8%89%E8%A7%92%E5%87%BD%E6%95%B0>，下同。

#### cos

余弦函数，处理时会将没有单位的数字认为是弧度值。

参数：

- 数字：浮点数，角度
- 返回值：数字，角度对应的余弦值

例如：

	cos(1); // 1弧度角的余弦值
	cos(1deg); // 1角度角的余弦值
	cos(1grad); // 1百分度角的余弦值

分别输出：

	0.5403023058681398
	0.9998476951563913
	0.9998766324816606

#### acos

反余弦函数，返回以弧度为单位的角度，区间在 0 到 PI之间。

参数：

- 数字：浮点数，代表余弦值，范围为 [-1,1]
- 返回值：数字，角度

例如：

	acos(0.5403023058681398)
	acos(1) 
	acos(2)

分别输出：

	1rad
	0rad
	NaNrad

#### tan

正切函数，处理时会将没有单位的数字认为是弧度值。

参数：

- 数字：浮点数，角度
- 返回值：数字，角度对应的正切值

例如：

	sin(1); // 1弧度角的正切值
	sin(1deg); // 1角度角的正切值
	sin(1grad); // 1百分度角的正切值

分别输出：

	1.5574077246549023
	0.017455064928217585
	0.015709255323664916

#### atan

反正切函数，返回以弧度为单位的角度，区间在 -PI/2 到 PI/2之间。

参数：

- 数字：浮点数，代表正切值
- 返回值：数字，角度

例如：

	atan(-1.5574077246549023)
	atan(0)
	round(atan(22), 6) // 四舍五入输出6位小数

分别输出：

	-1rad
	0rad
	1.525373rad;

#### pi

返回圆周率PI。

参数：无

返回值：数字，圆周率

例如：

	pi()

输出：

	3.141592653589793

#### pow

假设第一个参数为A，第二个参数为B，返回A的B次方。返回值与A有相同的单位，B的单位被忽略。

参数：

- 数字：浮点数，基数
- 数字：浮点数，冪指数

返回值：数字，基数的冪指数次方

例如：

	pow(0cm, 0px)
	pow(25, -2)
	pow(25, 0.5)
	pow(-25, 0.5)
	pow(-25%, -0.5)

输出：

	1cm
	0.0016
	5
	NaN
	NaN%

#### mod

返回第一个参数对第二参数取余的结果。返回值与第一个参数单位相同，第二个参数单位被忽略。这个函数也可以处理负数和浮点数。

参数：

- 数字：浮点数
- 数字：浮点数

返回值：数字，取余的结果

例如：

	mod(0cm, 0px)
	mod(11cm, 6px);
	mod(-26%, -5);

输出：

	NaNcm;
	5cm
	-1%;

#### convert

将数字从一种类型转换到另一种类型。第一个参数为带单位的数值，第二个参数为单位。如果两个参数的单位是兼容的，则数字的单位被转换。如果两个参数的单位不兼容，则原样返回第一个参数。

兼容的单位组：

- 长度：`m` / `cm` / `mm` / `in` / `pt` / `pc`
- 时间：`s` / `ms`
- 角度：`rad` / `deg` / `grad` / `turn`

> grad为“百分度”，见正弦函数下的说明。turn为“圈/周”的意思，1turn为360度。

参数：

- 数字：带单位的数值，浮点数
- 单位

返回值：转换单位后的数值

例如：

	convert(9s, "ms")
	convert(14cm, mm)
	convert(8, mm) // 不兼容的单位

输出：

	9000ms
	140mm
	8

#### Unit

返回带不同单位的数值。只有单位被改变，数值本身不会被转换。函数会假设第二个参数带上了合法单位。

参数：

- 数字：带单位的浮点数
- 单位

返回值：带单位的数值

例如：

	unit(9s, ~"ms")
	unit(-9, m)

输出：

	9ms
	-9m

### 颜色函数 (Color functions)

#### color

见“综合函数”部分

#### rgb(@r, @g, @b)

通过十进制红色，绿色，蓝色三种值 (RGB) 创建不透明的颜色对象。在 HTML/CSS 中也会用文本颜色值 (literal color values) 定义颜色，例如 `red -> #ff0000`。

参数:

- @red: 整数 0-255 或百分比 0-100%
- @green: 整数 0-255 或百分比 0-100%
- @blue: 整数 0-255 或百分比 0-100%

返回值：颜色 (color)

例如：

	rgb(90, 129, 32)

输出：

	#5a8120

#### rgba(@r, @g, @b, @a)

通过十进制红色，绿色，蓝色，以及 alpha 四种值 (RGBA) 创建带alpha透明的颜色对象。

参数:

- @red: 整数 0-255 或百分比 0-100%
- @green: 整数 0-255 或百分比 0-100%
- @blue: 整数 0-255 或百分比 0-100%
- @alpha: 数字 0-1 或百分比 0-100%

返回值：颜色 (color)

例如：

	rgba(90, 129, 32, 0.5)

输出：

	rgba(90, 129, 32, 0.5)

#### argb(@color)

创建格式为 #AARRGGBB 的十六进制 (hex representation) 颜色 (注意不是 #RRGGBBAA ！)。这种格式被用在IE滤镜中，以及.NET和Android开发中。

参数:

- @color: 颜色对象 (A color object.)

返回值：字符串 (string)

例如：

	argb(rgba(90, 23, 148, 0.5));

输出：

	#805a1794

#### hsl(@hue, @saturation, @lightness)

通过色相 (hue)，饱和度 (saturation)，亮度 (lightness) 三种值 (HSL) 创建不透明的颜色对象。

参数:

- @hue: 整数 0-360 表示度数。
- @saturation: 百分比 0-100% 或数字 0-1
- @lightness: 百分比 0-100% 或数字 0-1

返回值：颜色 (color)

例如：

	hsl(90, 100%, 50%)

输出：

	#80ff00

当你想使用一种颜色来创建另一种颜色时很方便，如：

	@new: hsl(hue(@old), 45%, 90%);

@new 将使用 @old 的 色相值，以及它自己的饱和度与亮度。

#### hsla(@hue, @saturation, @lightness, @alpha)

通过色相 (hue)，饱和度 (saturation)，亮度 (lightness)，以及 alpha 四种值 (HSLA) 创建透明的颜色对象。

参数:

- @hue: 整数 0-360 表示度数
- @saturation: 百分比 0-100% 或数字 0-1
- @lightness: 百分比 0-100% 或数字 0-1
- @alpha: 百分比 0-100% 或数字 0-1

返回值：颜色 (color)

例如：

	hsl(90, 100%, 50%, 0.5)

输出：

	rgba(128, 255, 0, 0.5)

#### hsv(@hue, @saturation, @value)

通过色相 (hue)，饱和度 (saturation)，色调 (value) 三种值 (HSV) 创建不透明的颜色对象。注意与 HSL 不同，这是另一种在Photoshop中可用的色彩空间。

参数:

- @hue: 整数 0-360 表示度数
- @saturation: 百分比 0-100% 或数字 0-1
- @value: 百分比 0-100% 或数字 0-1

返回值：颜色 (color)

例如：

	hsv(90, 100%, 50%)

输出：

	#408000

#### hsva(@hue, @saturation, @value, @alpha)

通过色相 (hue)，饱和度 (saturation)，色调 (value)，以及 alpha 四种值 (HSVA) 创建透明的颜色对象。注意与 HSLA 不同，这是另一种在Photoshop中可用的色彩空间。

参数:

- @hue: 整数 0-360 表示度数
- @saturation: 百分比 0-100% 或数字 0-1
- @value: 百分比 0-100% 或数字 0-1
- @alpha: 百分比 0-100% 或数字 0-1

返回值：颜色 (color)

例如：

	hsva(90, 100%, 50%, 0.5)

输出：

	rgba(64, 128, 0, 0.5)
	
#### hue(@color)

从颜色对象中提取色相值。

参数：

- @color: 颜色对象 (A color object.)

返回值：整数，范围从0-360

例如：

	hue(hsl(90, 100%, 50%))

输出：

	90

#### saturation(@color)

从颜色对象中提取饱和度值。

参数:

- @color: 颜色对象 (A color object.)

返回值：百分比值 0-100

例如：

	saturation(hsl(90, 100%, 50%))

输出：

	100%

#### lightness(@color)

从颜色对象中提取亮度值。

参数:

- @color: 颜色对象 (A color object.)

返回值：百分比值 0-100

例如：

	lightness(hsl(90, 100%, 50%))

输出：

	50%

#### hsvhue

以HSV色彩空间提取颜色中的色相值。

参数：

- 颜色

返回：整数，范围为0-360

例如：

	hsvhue(hsv(90, 100%, 50%))

输出：

	90

#### hsvsaturation

以HSV色彩空间提取颜色中的饱和度值。

参数：

- 颜色

返回值：百分比，范围0-100

例如：

	hsvsaturation(hsv(90, 100%, 50%))

输出：

	100%

#### hsvvalue

以HSV色彩空间提取颜色中的色调值。

参数：

- 颜色

返回：百分比，范围为0-100

例如：

	hsvvalue(hsv(90, 100%, 50%))

输出：

	50%

#### red(@color)

从颜色对象中提取红色值。

参数:

- @color: 颜色对象 (A color object.)

返回值：整数 0-255

例如：

	red(rgb(10, 20, 30))

输出：

	10

#### green(@color)

从颜色对象中提取绿色值。

参数:

- @color: 颜色对象 (A color object.)

返回值：整数 0-255

例如：

	green(rgb(10, 20, 30))

输出：

	20

#### blue(@color)

从颜色对象中提取蓝色值。

参数:

- @color: 颜色对象 (A color object.)

返回值：整数 0-255

例如：

	blue(rgb(10, 20, 30))

输出：

	30

#### alpha(@color)

从颜色对象中提取 alpha 值。

参数:

- @color: 颜色对象 (A color object.)

返回值：浮点数，介于 0-1 之间

例如：

	alpha(rgba(10, 20, 30, 0.5))

输出：

	0.5

#### luma(@color)

计算颜色对象的 luma 值（亮度的百分比表示法）。使用在WCAG2.0中定义的SMPTE C / Rec. 709 coefficients。 这个计算公式也用在 `contrast()` 函数中。

参数:

- @color: 颜色对象 (A color object.)

返回值：百分比 0-100%

例如：

	luma(rgb(100, 200, 30))

输出：

	65%

### 颜色运算 (Color operations)

颜色值运算有几点注意事项：参数必须单位/格式相同；百分比将作为绝对值处理，比如 10% 增加 10%，结果是 20% 而不是 11%；参数值只能在限定的范围内；they do not wrap around (这一句不清楚意思，可能是指参数值不会在超过范围后自动从另一侧“穿越”回去。)。返回值时，除了十六进制的颜色值 (hex versions) 外将对其他格式做简化处理。

#### saturate(@color, 10%)

增加一定数值的颜色饱和度。

参数:

- @color: 颜色对象 (A color object.)
- @amount: 百分比 0-100%

返回值：颜色 (color)

例如：

	saturate(hsl(90, 90%, 50%), 10%)

输出：

	#80ff00 // hsl(90, 100%, 50%)

#### desaturate(@color, 10%)

降低一定数值的颜色饱和度。

参数:

- @color: 颜色对象 (A color object.)
- @amount: 百分比 0-100%

返回值：颜色 (color)

例如：

	desaturate(hsl(90, 90%, 50%), 10%)

输出：

	#80e51a // hsl(90, 80%, 50%)

#### lighten(@color, 10%)

增加一定数值的颜色亮度。

参数:

- @color: 颜色对象 (A color object.)
- @amount: 百分比 0-100%

返回值：颜色 (color)

例如：

	lighten(hsl(90, 90%, 50%), 10%)

输出：

	#99f53d // hsl(90, 90%, 60%)

#### darken(@color, 10%)

降低一定数值的颜色亮度。

参数:

- @color: 颜色对象 (A color object.)
- @amount: 百分比 0-100%

返回值：颜色 (color)

例如：

	darken(hsl(90, 90%, 50%), 10%)

输出：

	#66c20a // hsl(90, 90%, 40%)

#### fadein(@color, 10%)

降低颜色的透明度（或增加不透明度），令其更不透明，对不透明的颜色无效。如果要增加颜色的透明度，使用 `fadeout()` 函数。

参数:

- @color: 颜色对象 (A color object.)
- @amount: 百分比 0-100%

返回值：颜色 (color)

例如：

	fadein(hsla(90, 90%, 50%, 0.5), 10%)

输出：

	rgba(128, 242, 13, 0.6) // hsla(90, 90%, 50%, 0.6)

#### fadeout(@color, 10%)

增加颜色的透明度（或降低不透明度），令其更透明，对不透明的颜色无效。如果要增加颜色的透明度，使用 fadein() 函数。

参数:

- @color: 颜色对象 (A color object.)
- @amount: 百分比 0-100%

返回值：颜色 (color)

例如：

	fadeout(hsla(90, 90%, 50%, 0.5), 10%)

输出：

	rgba(128, 242, 13, 0.4) // hsla(90, 90%, 50%, 0.6)

#### fade(@color, 50%)

给颜色（包括不透明的颜色）设定一定数值的透明度。

参数:

- @color: 颜色对象 (A color object.)
- @amount: 百分比 0-100%

返回值：颜色 (color)

例如：

	fade(hsl(90, 90%, 50%), 10%)

输出：

	rgba(128, 242, 13, 0.1) //hsla(90, 90%, 50%, 0.1)

#### spin(@color, 10)

向任意方向旋转颜色的色相角度 (hue angle)，旋转范围 0-360，超过一周后将从起点开始继续旋转（+ - 控制方向），比如旋转 360 度与 720 度是相同的结果。需要注意的是，颜色值会通过 RGB 格式转换，这个过程不能保留灰色的色相值（灰色没有饱和度，色相值也就没有意义了），因此要确定使用函数的方法能够保留颜色的色相值，例如不要这样使用函数：

	@c: saturate(spin(#aaaaaa, 10), 10%);

而应该用这种方法代替：

	@c: spin(saturate(#aaaaaa, 10%), 10);

因为颜色值永远输出为 RGB 格式，因此 `spin()` 函数对灰色无效。

参数:

- @color: 颜色对象 (A color object.)
- @angle: 任意数字表示角度 （+ 或 – 表示方向）

返回值：颜色 (color)

例如：

	spin(hsl(10, 90%, 50%), 20)
	spin(hsl(10, 90%, 50%), -20)

输出：

	#f27f0d // hsl(30, 90%, 50%)
	#f20d33 // hsl(350, 90%, 50%)

#### mix(@color1, @color2, [@weight: 50%])

根据比例混合两种颜色，包括计算不透明度。

参数:

- @color1: 颜色对象 (A color object.)
- @color2: 颜色对象 (A color object.)
- @weight: 可选项：平衡两种颜色的百分比, 默认 50%。

返回值：颜色 (color)

例如：

	mix(#ff0000, #0000ff, 50%)
	mix(rgba(100,0,0,1.0), rgba(0,100,0,0.5), 50%)

输出：

	#800080
	rgba(75, 25, 0, 0.75)

#### greyscale(@color)

完全移除颜色的饱和度，与 `desaturate(@color, 100%)` 函数效果相同。因为颜色的饱和度不受色相值影响，所以输出的颜色会稍显暗淡 (dull or muddy)；如果使用`luma`值可能会有更好的结果，因为它提取的是百分比亮度，而不是线性亮度。比如`greyscale('#0000ff')`与`greyscale('#00ff00')`会得出相同的结果，尽管对人眼来说，它们的亮度是不一样的。

参数:

- @color: 颜色对象 (A color object.)

返回值：颜色 (color)

例如：

	greyscale(hsl(90, 90%, 50%))

输出：

	#808080 // hsl(90, 0%, 50%)

#### contrast(@background, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%])

这个函数对比 @background 的 luma 值与 @threshold 参数的大小，如果大于输出 @darkcolor, 小于则输出 @lightcolor，便于选择相对于背景更容易阅读的颜色，同时提高了使用颜色的灵活性，与 Compass 的 `contrast()` 函数 工作方式相同。根据 WCAG 2.0 应该对比颜色的 luma 值，而不是亮度值 (lightness)。

参数:

- @background: 需要对比的颜色对象 (A color object to compare against.)
- @darkcolor: 可选项 – 指定的黑色（默认 black）
- @lightcolor: 可选项 – 指定的白色（默认 white）
- @threshold: 可选项 – 百分比 0-100% 界定深色过渡到浅色的转变位置（默认 43%），这个数值决定了输出结果偏向于哪一方，比如判断 50% 的灰色背景应该显示白色还是黑色的文字。一般来说，如果本色方案偏浅，则应该设低一点，否则设高一点。

返回值：颜色 (color)

例如：

	contrast(#aaaaaa)
	contrast(#222222, #101010)
	contrast(#222222, #101010, #dddddd)
	contrast(hsl(90, 100%, 50%),#000000,#ffffff,40%);
	contrast(hsl(90, 100%, 50%),#000000,#ffffff,60%);

输出：

	#000000 // black
	#ffffff // white
	#dddddd
	#000000 // black
	#ffffff // white

### 颜色混合 (Color blending)

颜色混合的方式与图像编辑器 Photoshop, Firework 或者 GIMP 的图层混合模式 (layer blending modes) 相似，因此制作 .psd 文件时处理颜色的方法可以同样用在 CSS 中。

#### multiply(@color1, @color2)

分别将两种颜色的红绿蓝 (RGB) 三种值做乘法运算，然后再除以 255，输出结果是更深的颜色。（译注：对应Photoshop中的“变暗/正片叠底”。）

参数:

- @color1: 颜色对象
- @color2: 颜色对象

返回值：颜色 (color)

#### screen(@color1, @color2)

与 multiply() 函数效果相反，输出结果是更亮的颜色。（译注：对应Photoshop中的“变亮/滤色”。）

参数:

- @color1: 颜色对象
- @color2: 颜色对象

返回值：颜色 (color)

#### overlay(@color1, @color2)

结合 multiply() 与 screen() 两个函数的效果，令浅的颜色变得更浅，深的颜色变得更深。（译注：对应Photoshop中的“叠加”。）注意：输出结果由第一个颜色参数决定。

参数:

- @color1: 颜色对象，是用于叠加的颜色，也是结果是更亮还是更暗的决定因素。
@color2: 颜色对象，被叠加的颜色

返回值：颜色 (color)

#### softlight(@color1, @color2)

与 overlay() 函数效果相似，只是当纯黑色或纯白色作为参数时输出结果不会是纯黑色或纯白色。（译注：对应Photoshop中的“柔光”。）

参数:

- @color1: 混合色（光源）
- @color2: 被混合的颜色

返回值：颜色 (color)

#### hardlight(@color1, @color2)

与 overlay() 函数效果相似，不过由第二个颜色参数决定输出颜色的亮度或黑度，而不是第一个颜色参数决定。（译注：对应Photoshop中的“强光/亮光/线性光/点光”。）

参数:

- @color1: 混合色（光源）
- @color2: 被混合的颜色

返回值：颜色 (color)

#### difference(@color1, @color2)

从第一个颜色值中减去第二个（分别计算 RGB 三种颜色值），输出结果是更深的颜色。（译注：对应Photoshop中的“差值/排除”。）

参数:

- @color1: 被减的颜色对象
- @color2: 减去的颜色对象

返回值：颜色 (color)

#### exclusion(@color1, @color2)

效果与 difference() 函数效果相似，只是输出结果差别更小 (lower contrast)。（译注：对应Photoshop中的“差值/排除”。）

参数:

- @color1: 被减的颜色对象
- @color2: 减去的颜色对象

#### average(@color1, @color2)

分别对 RGB 的三种颜色值取平均值，然后输出结果。

参数:

- @color1: 颜色对象 (A color object.)
- @color2: 颜色对象 (A color object.)

返回值：颜色 (color)

#### negation(@color1, @color2)

与 `difference()` 函数效果相反，输出结果是更亮的颜色。请注意：效果相反不代表做加法运算。

参数:

- @color1: 被减的颜色对象
- @color2: 减去的颜色对象

返回值：颜色 (color)