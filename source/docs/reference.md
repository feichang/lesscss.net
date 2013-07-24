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
- contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%]); 
											// 如果 @color1 的 luma 值 > 43% 输出 @darkcolor
											// 否则输出 @lightcolor

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
- isunit(@numberOrAnything, "rem");			// * 判断一个值是否是指定单位的数值

> 含*号的函数只在1.4.0 beta以上版本中可用

String functions

escape

Applies URL-encoding to special characters found in the input string.

Following characters are exceptions and not encoded: ,, /, ?, @, &, +, ', ~, ! and $.
Most common encoded characters are: <space>, #, ^, (, ), {, }, |, :, >, <, ;, ], [ and =.
Parameters:

string: A string to escape
Returns: escaped string content without quotes.

Example:

escape('a=1')
Output:

a%3D1
Note: Function behavior if a parameter is non-string parameters is not defined. Current implementation returns undefined on color and unchanged input on any other kind of argument. This behaviour should not be relied on and can change in the future.

e

CSS escaping similar to ~"value" syntax. It expects string as a parameter and return its content as is, but without quotes. It can be used to output CSS value which is either not valid CSS syntax, or uses proprietary syntax which LESS doesn�t recognize.

Parameters:

string: A string to escape
Returns: string content without quotes.

Example:

filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
Output:

filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
Note: The function accepts also ~"" escaped values and numbers as parameters. Anything else returns an error.

% format

The function %("format", arguments ...) formats a string. The first argument is string with placeholders. All placeholders start with percentage symbol % followed by letter s,S,d,D,a, or A. Remaining arguments contain expressions to replace placeholders. If you need to print the percentage symbol, escape it by another percentage %%.

Use uppercase placeholders if you need to escape special characters into their utf-8 escape codes. The function escapes all special characters except ()'~!. Space is encoded as %20. Lowercase placeholders leave special characters as they are.

Placeholders: * d, D, a, A - can be replaced by any kind of argument (color, number, escaped value, expression, …). If you use them in combination with string, the whole string will be used - including its quotes. However, the quotes are placed into the string as they are, they are not escaped by “/” nor anything similar. * s, S - can be replaced by any kind of argument except color. If you use them in combination with string, only the string value will be used - string quotes are omitted.

Parameters:

string: format string with placeholders,
anything* : values to replace placeholders.
Returns: formatted string.

Example:

format-a-d: %("repetitions: %a file: %d", 1 + 2, "directory/file.less");
format-a-d-upper: %('repetitions: %A file: %D', 1 + 2, "directory/file.less");
format-s: %("repetitions: %s file: %s", 1 + 2, "directory/file.less");
format-s-upper: %('repetitions: %S file: %S', 1 + 2, "directory/file.less");
Output:

format-a-d: "repetitions: 3 file: "directory/file.less"";
format-a-d-upper: "repetitions: 3 file: %22directory%2Ffile.less%22";
format-s: "repetitions: 3 file: directory/file.less";
format-s-upper: "repetitions: 3 file: directory%2Ffile.less";
Misc functions

color

Parses a color, so a string representing a color becomes a color.

Parameters:

string: A string of the color
Example:

color("#aaa");
Output:

#aaa
unit

Remove or change the unit of a dimension

Parameters:

dimension: A number, with or without a dimension
unit: Optional: the unit to change to, or if omitted it will remove the unit
Example:

unit(5, px)
Output:

5px
Example:

unit(5em)
Output:

5
data-uri

Inlines a resource and falls back to url() if the ieCompat option is on and the resource is too large, or if you use the function in the browser. If the mime is not given then node uses the mime package to determine the correct mime type.

Parameters:

mimetype: A mime type string. Optional.
url: The URL of the file to inline.
Example:

data-uri('../data/image.jpg');
Output:

url('data:image/jpeg;base64,bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==');
Output in the browser:

url('../data/image.jpg');
Example:

data-uri('image/jpeg;base64', '../data/image.jpg');
Output:

url('data:image/jpeg;base64,bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==');
Math functions

ceil

Rounds up to the next highest integer.

Parameters:

number: A floating point number.
Returns: integer

Example:

ceil(2.4)
Output:

3
floor

Rounds down to the next lowest integer.

Parameters:

number: A floating point number.
Returns: integer

Example:

floor(2.6)
Output:

2
percentage

Converts a floating point number into a percentage string.

Parameters:

number: A floating point number.
Returns: string

Example:

percentage(0.5)
Output:

50%
round

Applies rounding.

Parameters:

number: A floating point number.
decimalPlaces: Optional: The number of decimal places to round to. Defaults to 0.
Returns: number

Example:

round(1.67)
Output:

2
Example:

round(1.67, 1)
Output:

1.7
sqrt

Calculates square root of a number. Keeps units as they are.

Parameters:

number: A floating point number.
Returns: number

Example:

sqrt(25cm)
Output:

5cm
Example:

sqrt(18.6%)
Output:

4.312771730569565%;
abs

Calculates absolute value of a number. Keeps units as they are.

Parameters:

number: A floating point number.
Returns: number

Example:

abs(25cm)
Output:

25cm
Example:

abs(-18.6%)
Output:

18.6%;
sin

Calculates sine function. Assumes radians on numbers without units.

Parameters:

number: A floating point number.
Returns: number

Example:

sin(1); // sine of 1 radian
sin(1deg); // sine of 1 degree
sin(1grad); // sine of 1 gradian
Output:

0.8414709848078965; // sine of 1 radian
0.01745240643728351; // sine of 1 degree
0.015707317311820675; // sine of 1 gradian
asin

Calculates arcsine (inverse of sine) function. Returns number in radians e.g. a number between -π/2 and π/2.

Parameters:

number: A floating point number from [-1, 1] interval.
Returns: number

Example:

asin(-0.8414709848078965)
asin(0) 
asin(2)
Output:

-1rad
0rad
NaNrad
cos

Calculates cosine function. Assumes radians on numbers without units.

Parameters:

number: A floating point number.
Returns: number

Example:

cos(1) // cosine of 1 radian
cos(1deg) // cosine of 1 degree
cos(1grad) // cosine of 1 gradian
Output:

0.5403023058681398 // cosine of 1 radian
0.9998476951563913 // cosine of 1 degree
0.9998766324816606 // cosine of 1 gradian
acos

Calculates arccosine (inverse of cosine) function. Returns number in radians e.g. a number between 0 and π.

Parameters:

number: A floating point number from [-1, 1] interval.
Returns: number

Example:

acos(0.5403023058681398)
acos(1) 
acos(2)
Output:

1rad
0rad
NaNrad
tan

Calculates tangent function. Assumes radians on numbers without units.

Parameters:

number: A floating point number.
Returns: number

Example:

tan(1) // tangent of 1 radian
tan(1deg) // tangent of 1 degree
tan(1grad) // tangent of 1 gradian
Output:

1.5574077246549023 // tangent of 1 radian
0.017455064928217585 // tangent of 1 degree
0.015709255323664916 // tangent of 1 gradian
atan

Calculates arctangent (inverse of tangent) function. Returns number in radians e.g. a number between -π/2 and π/2.

Parameters:

number: A floating point number.
Returns: number

Example:

atan(-1.5574077246549023)
atan(0)
round(atan(22), 6) // arctangent of 22 rounded to 6 decimal places
Output:

-1rad
0rad
1.525373rad;
pi

Returns π (pi);

Parameters:

none
Returns: number

Example:

pi()
Output:

3.141592653589793
pow

Returns the value of the first argument raised to the power of the second argument. Returned value has the same dimension as the first parameter and the dimension of the second parameter is ignored.

Parameters:

number: base -a floating point number.
number: exponent - a floating point number.
Returns: number

Example:

pow(0cm, 0px)
pow(25, -2)
pow(25, 0.5)
pow(-25, 0.5)
pow(-25%, -0.5)
Output:

1cm
0.0016
5
NaN
NaN%
mod

Returns the value of the first argument modulus second argument. Returned value has the same dimension as the first parameter, the dimension of the second parameter is ignored. The function is able to handle also negative and floating point numbers.

Parameters:

number: a floating point number.
number: a floating point number.
Returns: number

Example:

mod(0cm, 0px)
mod(11cm, 6px);
mod(-26%, -5);
Output:

NaNcm;
5cm
-1%;
convert

Converts numbers from one type into another. First argument contains number with units and second argument contains units. If both units are compatible, the number is converted. If they are not compatible, function returns first argument without modifying it.

Compatible unit groups: * lengths: m, cm, mm, in, pt and pc, * time: s and ms, * angle: rad, deg, grad and turn.

Parameters:

number: a floating point number with units.
identifier, string or escaped value: units
Returns: number

Example:

convert(9s, "ms")
convert(14cm, mm)
convert(8, mm) // incompatible unit types
Output:

9000ms
140mm
8
Unit

Returns number with different units. Only units are changed, number itself is not converted. The function assumes that second parameter contains valid unit type.

Parameters:

number: a floating point number with units.
identifier or escaped value: units.
Returns: number

Example:

unit(9s, ~"ms")
unit(-9, m)
Output:

9ms
-9m
Color

Converts a string or escaped value into a color. The input must contain color in hexadecimal or shorthand representation.

Parameters:

identifier or escaped value with valid color in hexadecimal or shorthand representation.
Returns: color

Example:

color("#445566")
color(~"#123")
Output:

#445566
#112233
Color functions

Color definition

rgb

Creates an opaque color object from decimal red, green and blue (RGB) values. Literal color values in standard HTML/CSS formats may also be used to define colors, for example #ff0000.

Parameters:

red: An integer 0-255 or percentage 0-100%.
green: An integer 0-255 or percentage 0-100%.
blue: An integer 0-255 or percentage 0-100%.
Returns: color

Example:

rgb(90, 129, 32)
Output:

#5a8120
rgba

Creates a transparent color object from decimal red, green, blue and alpha (RGBA) values.

Parameters:

red: An integer 0-255 or percentage 0-100%.
green: An integer 0-255 or percentage 0-100%.
blue: An integer 0-255 or percentage 0-100%.
alpha: An number 0-1 or percentage 0-100%.
Returns: color

Example:

rgba(90, 129, 32, 0.5)
Output:

rgba(90, 129, 32, 0.5)
argb

Creates a hex representation of a color in #AARRGGBB format (NOT #RRGGBBAA!). This format is used in Internet Explorer, and .NET and Android development.

Parameters:

color: A color object.
Returns: string

Example:

argb(rgba(90, 23, 148, 0.5));
Output:

#805a1794
hsl

Creates an opaque color object from hue, saturation and lightness (HSL) values.

Parameters:

hue: An integer 0-360 representing degrees.
saturation: A percentage 0-100% or number 0-1.
lightness: A percentage 0-100% or number 0-1.
Returns: color

Example:

hsl(90, 100%, 50%)
Output:

#80ff00
This is useful if you want to create a new color based on another color’s channel, for example:

@new: hsl(hue(@old), 45%, 90%);
@new will have @old’s hue, and its own saturation and lightness.

hsla

Creates a transparent color object from hue, saturation, lightness and alpha (HSLA) values.

Parameters:

hue: An integer 0-360 representing degrees.
saturation: A percentage 0-100% or number 0-1.
lightness: A percentage 0-100% or number 0-1.
alpha: A percentage 0-100% or number 0-1.
Returns: color

Example:

hsl(90, 100%, 50%, 0.5)
Output:

rgba(128, 255, 0, 0.5)
hsv

Creates an opaque color object from hue, saturation and value (HSV) values. Note that this is not the same as hsl, and is a color space available in Photoshop.

Parameters:

hue: An integer 0-360 representing degrees.
saturation: A percentage 0-100% or number 0-1.
value: A percentage 0-100% or number 0-1.
Returns: color

Example:

hsv(90, 100%, 50%)
Output:

#408000
hsva

Creates a transparent color object from hue, saturation, value and alpha (HSVA) values. Note that this is not the same as hsla, and is a color space available in Photoshop.

Parameters:

hue: An integer 0-360 representing degrees.
saturation: A percentage 0-100% or number 0-1.
value: A percentage 0-100% or number 0-1.
alpha: A percentage 0-100% or number 0-1.
Returns: color

Example:

hsva(90, 100%, 50%, 0.5)
Output:

rgba(64, 128, 0, 0.5)
Color channel information

hue

Extracts the hue channel of a color object.

Parameters:

color: A color object.
Returns: integer 0-360

Example:

hue(hsl(90, 100%, 50%))
Output:

90
saturation

Extracts the saturation channel of a color object.

Parameters:

color: A color object.
Returns: percentage 0-100

Example:

saturation(hsl(90, 100%, 50%))
Output:

100%
lightness

Extracts the lightness channel of a color object.

Parameters:

color: A color object.
Returns: percentage 0-100

Example:

lightness(hsl(90, 100%, 50%))
Output:

50%
hsvhue

Extracts the hue channel of a color object in the HSV color space.

Parameters:

color: A color object.
Returns: integer 0-360

Example:

hsvhue(hsv(90, 100%, 50%))
Output:

90
hsvsaturation

Extracts the saturation channel of a color object in the HSV color space.

Parameters:

color: A color object.
Returns: percentage 0-100

Example:

hsvsaturation(hsv(90, 100%, 50%))
Output:

100%
hsvvalue

Extracts the value channel of a color object in the HSV color space.

Parameters:

color: A color object.
Returns: percentage 0-100

Example:

hsvvalue(hsv(90, 100%, 50%))
Output:

50%
red

Extracts the red channel of a color object.

Parameters:

color: A color object.
Returns: integer 0-255

Example:

red(rgb(10, 20, 30))
Output:

10
green

Extracts the green channel of a color object.

Parameters:

color: A color object.
Returns: integer 0-255

Example:

green(rgb(10, 20, 30))
Output:

20
blue

Extracts the blue channel of a color object.

Parameters:

color: A color object.
Returns: integer 0-255

Example:

blue(rgb(10, 20, 30))
Output:

30
alpha

Extracts the alpha channel of a color object.

Parameters:

color: A color object.
Returns: float 0-1

Example:

alpha(rgba(10, 20, 30, 0.5))
Output:

0.5
luma

Calculates the luma) (perceptual brightness) of a color object. Uses SMPTE C / Rec. 709 coefficients, as recommended in WCAG 2.0. This calculation is also used in the contrast function.

Parameters:

color: A color object.
Returns: percentage 0-100%

Example:

luma(rgb(100, 200, 30))
Output:

65%
Color operations

Color operations generally take parameters in the same units as the values they are changing, and percentage are handled as absolutes, so increasing a 10% value by 10% results in 20%, not 11%, and values are clamped to their allowed ranges; they do not wrap around. Where return values are shown, we’ve also shown formats that make it clear what each function has done, in addition to the hex versions that you will usually be be working with.

saturate

Increase the saturation of a color by an absolute amount.

Parameters:

color: A color object.
amount: A percentage 0-100%.
Returns: color

Example:

saturate(hsl(90, 90%, 50%), 10%)
Output:

#80ff00 // hsl(90, 100%, 50%)
desaturate

Decrease the saturation of a color by an absolute amount.

Parameters:

color: A color object.
amount: A percentage 0-100%.
Returns: color

Example:

desaturate(hsl(90, 90%, 50%), 10%)
Output:

#80e51a // hsl(90, 80%, 50%)
lighten

Increase the lightness of a color by an absolute amount.

Parameters:

color: A color object.
amount: A percentage 0-100%.
Returns: color

Example:

lighten(hsl(90, 90%, 50%), 10%)
Output:

#99f53d // hsl(90, 90%, 60%)
darken

Decrease the lightness of a color by an absolute amount.

Parameters:

color: A color object.
amount: A percentage 0-100%.
Returns: color

Example:

darken(hsl(90, 90%, 50%), 10%)
Output:

#66c20a // hsl(90, 90%, 40%)
fadein

Decrease the transparency (or increase the opacity) of a color, making it more opaque. Has no effect on opaque colours. To fade in the other direction use fadeout.

Parameters:

color: A color object.
amount: A percentage 0-100%.
Returns: color

Example:

fadein(hsla(90, 90%, 50%, 0.5), 10%)
Output:

rgba(128, 242, 13, 0.6) // hsla(90, 90%, 50%, 0.6)
fadeout

Increase the transparency (or decrease the opacity) of a color, making it less opaque. To fade in the other direction use fadein.

Parameters:

color: A color object.
amount: A percentage 0-100%.
Returns: color

Example:

fadeout(hsla(90, 90%, 50%, 0.5), 10%)
Output:

rgba(128, 242, 13, 0.4) // hsla(90, 90%, 50%, 0.6)
fade

Set the absolute transparency of a color. Can be applied to colors whether they already have an opacity value or not.

Parameters:

color: A color object.
amount: A percentage 0-100%.
Returns: color

Example:

fade(hsl(90, 90%, 50%), 10%)
Output:

rgba(128, 242, 13, 0.1) //hsla(90, 90%, 50%, 0.1)
spin

Rotate the hue angle of a color in either direction. While the angle range is 0-360, it applies a mod 360 operation, so you can pass in much larger (or negative) values and they will wrap around e.g. angles of 360 and 720 will produce the same result. Note that colours are passed through an RGB conversion, which doesn’t retain hue value for greys (because hue has no meaning when there is no saturation), so make sure you apply functions in a way that preserves hue, for example don’t do this:

@c: saturate(spin(#aaaaaa, 10), 10%);
Do this instead:

@c: spin(saturate(#aaaaaa, 10%), 10);
Colors are always returned as RGB values, so applying spin to a grey value will do nothing.

Parameters:

color: A color object.
angle: A number of degrees to rotate (+ or -).
Returns: color

Example:

spin(hsl(10, 90%, 50%), 20)
spin(hsl(10, 90%, 50%), -20)
Output:

#f27f0d // hsl(30, 90%, 50%)
#f20d33 // hsl(350, 90%, 50%)
mix

Mix two colors together in variable proportion. Opacity is included in the calculations.

Parameters:

color1: A color object.
color1: A color object.
weight: Optional, a percentage balance point between the two colors, defaults to 50%.
Returns: color

Example:

mix(#ff0000, #0000ff, 50%)
mix(rgba(100,0,0,1.0), rgba(0,100,0,0.5), 50%)
Output:

#800080
rgba(75, 25, 0, 0.75)
greyscale

Remove all saturation from a color; the same as calling desaturate(@color, 100%). Because the saturation is not affected by hue, the resulting color mapping may be somewhat dull or muddy; luma may provide a better result as it extracts perceptual rather than linear brightness, for example greyscale('#0000ff') will return the same value as greyscale('#00ff00'), though they appear quite different in brightness to the human eye.

Parameters:

color: A color object.
Returns: color

Example:

greyscale(hsl(90, 90%, 50%))
Output:

#808080 // hsl(90, 0%, 50%)
contrast

Choose which of two colors provides the greatest contrast with another. This is useful for ensuring that a color is readable against a background, which is also useful for accessibility compliance. This function works the same way as the contrast function in Compass for SASS. In accordance with WCAG 2.0, colors are compared using their luma value, not their lightness.

The light and dark parameters can be supplied in either order - the function will calculate their luma values and assign light and dark appropriately.

Parameters:

color: A color object to compare against.
dark: optional - A designated dark color (defaults to black).
light: optional - A designated light color (defaults to white).
threshold: optional - A percentage 0-100% specifying where the transition from “dark” to “light” is (defaults to 43%). This is used to bias the contrast one way or another, for example to allow you to decide whether a 50% grey background should result in black or white text. You would generally set this lower for ‘lighter’ palettes, higher for ‘darker’ ones. Defaults to 43%.
Returns: color

Example:

contrast(#aaaaaa)
contrast(#222222, #101010)
contrast(#222222, #101010, #dddddd)
contrast(hsl(90, 100%, 50%),#000000,#ffffff,40%);
contrast(hsl(90, 100%, 50%),#000000,#ffffff,60%);
Output:

#000000 // black
#ffffff // white
#dddddd
#000000 // black
#ffffff // white
Color blending

These operations are similar as the blend modes found in image editors like Photoshop, Firework or GIMP, so you can use them to make your CSS colors match your images.

multiply

Multiply two colors. For each two colors their RGB channel are multiplied then divided by 255. The result is a darker color.

Parameters:

color1: A color object to multiply against.
color2: A color object to multiply against.
Returns: color

Examples:

multiply(#ff6600, #000000);
Color 1 Color 2 Color 3

multiply(#ff6600, #333333);
Color 1 Color 2 Color 3

multiply(#ff6600, #666666);
Color 1 Color 2 Color 3

multiply(#ff6600, #999999);
Color 1 Color 2 Color 3

multiply(#ff6600, #cccccc);
Color 1 Color 2 Color 3

multiply(#ff6600, #ffffff);
Color 1 Color 2 Color 3

multiply(#ff6600, #ff0000);
Color 1 Color 2 Color 3

multiply(#ff6600, #00ff00);
Color 1 Color 2 Color 3

multiply(#ff6600, #0000ff);
Color 1 Color 2 Color 3

screen

Do the opposite effect from multiply. The result is a brighter color.

Parameters:

color1: A color object to screen against.
color2: A color object to screen against.
Returns: color

Example:

screen(#ff6600, #000000);
Color 1 Color 2 Color 3

screen(#ff6600, #333333);
Color 1 Color 2 Color 3

screen(#ff6600, #666666);
Color 1 Color 2 Color 3

screen(#ff6600, #999999);
Color 1 Color 2 Color 3

screen(#ff6600, #cccccc);
Color 1 Color 2 Color 3

screen(#ff6600, #ffffff);
Color 1 Color 2 Color 3

screen(#ff6600, #ff0000);
Color 1 Color 2 Color 3

screen(#ff6600, #00ff00);
Color 1 Color 2 Color 3

screen(#ff6600, #0000ff);
Color 1 Color 2 Color 3

overlay

Combines the effect from both multiply and screen. Conditionally make light channels lighter and dark channels darker. Note: The results of the conditions are determined by the first color parameter.

Parameters:

color1: A color object to overlay another. Also it is the determinant color to make the result lighter or darker.
color2: A color object to be overlayed.
Returns: color

Example:

overlay(#ff6600, #000000);
Color 1 Color 2 Color 3

overlay(#ff6600, #333333);
Color 1 Color 2 Color 3

overlay(#ff6600, #666666);
Color 1 Color 2 Color 3

overlay(#ff6600, #999999);
Color 1 Color 2 Color 3

overlay(#ff6600, #cccccc);
Color 1 Color 2 Color 3

overlay(#ff6600, #ffffff);
Color 1 Color 2 Color 3

overlay(#ff6600, #ff0000);
Color 1 Color 2 Color 3

overlay(#ff6600, #00ff00);
Color 1 Color 2 Color 3

overlay(#ff6600, #0000ff);
Color 1 Color 2 Color 3

softlight

Similar to overlay but avoid pure black resulting in pure black, and pure white resulting in pure white.

Parameters:

color1: A color object to soft light another.
color2: A color object to be soft lighten.
Returns: color

Example:

softlight(#ff6600, #000000);
Color 1 Color 2 Color 3

softlight(#ff6600, #333333);
Color 1 Color 2 Color 3

softlight(#ff6600, #666666);
Color 1 Color 2 Color 3

softlight(#ff6600, #999999);
Color 1 Color 2 Color 3

softlight(#ff6600, #cccccc);
Color 1 Color 2 Color 3

softlight(#ff6600, #ffffff);
Color 1 Color 2 Color 3

softlight(#ff6600, #ff0000);
Color 1 Color 2 Color 3

softlight(#ff6600, #00ff00);
Color 1 Color 2 Color 3

softlight(#ff6600, #0000ff);
Color 1 Color 2 Color 3

hardlight

Similar to overlay but use the second color to detect light and dark channels instead of using the first color.

Parameters:

color1: A color object to overlay another.
color2: A color object to be overlayed. Also it is the determinant color to make the result lighter or darker.
Returns: color

Example:

hardlight(#ff6600, #000000);
Color 1 Color 2 Color 3

hardlight(#ff6600, #333333);
Color 1 Color 2 Color 3

hardlight(#ff6600, #666666);
Color 1 Color 2 Color 3

hardlight(#ff6600, #999999);
Color 1 Color 2 Color 3

hardlight(#ff6600, #cccccc);
Color 1 Color 2 Color 3

hardlight(#ff6600, #ffffff);
Color 1 Color 2 Color 3

hardlight(#ff6600, #ff0000);
Color 1 Color 2 Color 3

hardlight(#ff6600, #00ff00);
Color 1 Color 2 Color 3

hardlight(#ff6600, #0000ff);
Color 1 Color 2 Color 3

difference

Substracts the second color from the first color. The operation is made per RGB channels. The result is a darker color.

Parameters:

color1: A color object to act as the minuend.
color2: A color object to act as the subtrahend.
Returns: color

Example:

difference(#ff6600, #000000);
Color 1 Color 2 Color 3

difference(#ff6600, #333333);
Color 1 Color 2 Color 3

difference(#ff6600, #666666);
Color 1 Color 2 Color 3

difference(#ff6600, #999999);
Color 1 Color 2 Color 3

difference(#ff6600, #cccccc);
Color 1 Color 2 Color 3

difference(#ff6600, #ffffff);
Color 1 Color 2 Color 3

difference(#ff6600, #ff0000);
Color 1 Color 2 Color 3

difference(#ff6600, #00ff00);
Color 1 Color 2 Color 3

difference(#ff6600, #0000ff);
Color 1 Color 2 Color 3

exclusion

Similar effect to difference with lower contrast.

Parameters:

color1: A color object to act as the minuend.
color2: A color object to act as the subtrahend.
Returns: color

Example:

exclusion(#ff6600, #000000);
Color 1 Color 2 Color 3

exclusion(#ff6600, #333333);
Color 1 Color 2 Color 3

exclusion(#ff6600, #666666);
Color 1 Color 2 Color 3

exclusion(#ff6600, #999999);
Color 1 Color 2 Color 3

exclusion(#ff6600, #cccccc);
Color 1 Color 2 Color 3

exclusion(#ff6600, #ffffff);
Color 1 Color 2 Color 3

exclusion(#ff6600, #ff0000);
Color 1 Color 2 Color 3

exclusion(#ff6600, #00ff00);
Color 1 Color 2 Color 3

exclusion(#ff6600, #0000ff);
Color 1 Color 2 Color 3

average

Compute the average of two colors. The operation is made per RGB channels.

Parameters:

color1: A color object.
color2: A color object.
Returns: color

Example:

average(#ff6600, #000000);
Color 1 Color 2 Color 3

average(#ff6600, #333333);
Color 1 Color 2 Color 3

average(#ff6600, #666666);
Color 1 Color 2 Color 3

average(#ff6600, #999999);
Color 1 Color 2 Color 3

average(#ff6600, #cccccc);
Color 1 Color 2 Color 3

average(#ff6600, #ffffff);
Color 1 Color 2 Color 3

average(#ff6600, #ff0000);
Color 1 Color 2 Color 3

average(#ff6600, #00ff00);
Color 1 Color 2 Color 3

average(#ff6600, #0000ff);
Color 1 Color 2 Color 3

negation

Do the opposite effect from difference. The result is a brighter color. Note: The opposite effect doesn’t mean the inverted effect as resulting to an addition operation.

Parameters:

color1: A color object to act as the minuend.
color2: A color object to act as the subtrahend.
Returns: color

Example:

negation(#ff6600, #000000);
Color 1 Color 2 Color 3

negation(#ff6600, #333333);
Color 1 Color 2 Color 3

negation(#ff6600, #666666);
Color 1 Color 2 Color 3

negation(#ff6600, #999999);
Color 1 Color 2 Color 3

negation(#ff6600, #cccccc);
Color 1 Color 2 Color 3

negation(#ff6600, #ffffff);
Color 1 Color 2 Color 3

negation(#ff6600, #ff0000);
Color 1 Color 2 Color 3

negation(#ff6600, #00ff00);
Color 1 Color 2 Color 3

negation(#ff6600, #0000ff);
Color 1 Color 2 Color 3