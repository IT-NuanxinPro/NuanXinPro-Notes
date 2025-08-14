# 选择器与优先级

CSS选择器是样式应用的基础，理解选择器的类型和优先级规则是掌握CSS的关键。

## 🎯 基础选择器

### 元素选择器

元素选择器按标签名匹配（如 `p`、`h1`、`div`），适合设定全局通用的排版或基础样式，但要谨慎避免影响过宽。一般与类选择器搭配使用更可控。

```css
/* 选择所有p元素 */
p {
    color: blue;
    font-size: 16px;
}

/* 选择所有h1元素 */
h1 {
    color: red;
    font-weight: bold;
}

/* 选择所有div元素 */
div {
    margin: 10px;
    padding: 15px;
}
```

### 类选择器

类选择器用于表达语义化的可复用样式模块（如 `.btn`、`.container`）。通过组合类（如 `.btn.primary`）实现修饰与状态管理，可提升可维护性。

```css
/* 选择class为container的元素 */
.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* 选择class为btn的元素 */
.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

/* 多个类名 */
.btn.primary {
    background-color: #007bff;
    color: white;
}

.btn.secondary {
    background-color: #6c757d;
    color: white;
}
```

### ID选择器

ID 选择器用于页面中唯一的元素，特异性高（100），请谨慎使用以免难以覆盖。组件化开发中更推荐类选择器，避免与 JS ID 用途耦合。

```css
/* 选择id为header的元素 */
#header {
    background-color: #f8f9fa;
    padding: 20px;
}

/* 选择id为main-content的元素 */
#main-content {
    min-height: 500px;
    padding: 30px;
}

/* ID选择器具有最高的特异性 */
#unique-element {
    color: green !important;
}
```

### 通配符选择器

通配符 `*` 会匹配所有元素，常用于重置或统一盒模型等全局设置；选择器如 `div *` 会匹配某容器下所有后代，需当心性能与范围过大带来的副作用。

```css
/* 选择所有元素 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 选择div内的所有元素 */
div * {
    font-family: Arial, sans-serif;
}
```

## 🔗 组合选择器

### 后代选择器

后代选择器 `A B` 选择 A 内部任意层级的 B，语义清晰但选择范围广，建议结合更语义化的类名缩小匹配范围，避免影响未知子树。

```css
/* 选择div内的所有p元素（任意层级） */
div p {
    line-height: 1.6;
}

/* 选择nav内的所有a元素 */
nav a {
    text-decoration: none;
    color: #333;
}

/* 多层后代选择 */
.sidebar .menu li a {
    display: block;
    padding: 8px 16px;
}
```

### 子元素选择器

子元素选择器 `A > B` 仅匹配直接子元素，适合约束更严格的层级关系。与后代选择器相比，可避免意外匹配深层节点，提升可控性。

```css
/* 选择ul的直接子元素li */
ul > li {
    list-style-type: disc;
}

/* 选择.container的直接子元素div */
.container > div {
    flex: 1;
}

/* 与后代选择器的区别 */
.parent > .child {
    /* 只选择直接子元素 */
    background-color: yellow;
}

.parent .child {
    /* 选择所有后代元素 */
    color: blue;
}
```

### 相邻兄弟选择器

相邻兄弟 `A + B` 用于选择紧跟在 A 后面的第一个 B，常见于“标题后的首段高亮”“表单项间距处理”等需要相邻关系的场景。

```css
/* 选择紧跟在h1后面的p元素 */
h1 + p {
    font-size: 18px;
    font-weight: bold;
}

/* 选择紧跟在.highlight后面的div */
.highlight + div {
    margin-top: 20px;
}
```

### 通用兄弟选择器

通用兄弟 `A ~ B` 选择 A 之后的所有 B（同层级），适合“状态后置影响”的需求，如激活某项后，使其后续同级项样式变化。

```css
/* 选择h1后面的所有p兄弟元素 */
h1 ~ p {
    margin-left: 20px;
}

/* 选择.active后面的所有li兄弟元素 */
.active ~ li {
    opacity: 0.5;
}
```

## 🎨 伪类选择器

### 状态伪类

状态伪类描述交互或表单状态（链接 `:link/:visited/:hover/:active`，输入 `:focus/:disabled/:checked` 等）。为可访问性考虑，确保 `:focus` 明显可见。

```css
/* 链接状态 */
a:link {
    color: blue;
}

a:visited {
    color: purple;
}

a:hover {
    color: red;
    text-decoration: underline;
}

a:active {
    color: orange;
}

/* 表单状态 */
input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

input:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
}

input:checked {
    background-color: #007bff;
}

/* 元素状态 */
.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.menu-item:active {
    background-color: #f0f0f0;
}
```

### 结构伪类

结构伪类基于元素在父节点中的位置匹配（如 `:first-child/:last-child/:nth-child()` 等）。`nth-child()` 支持线性表达式，可实现复杂序列选取。

```css
/* 第一个和最后一个子元素 */
li:first-child {
    border-top: 2px solid #007bff;
}

li:last-child {
    border-bottom: 2px solid #007bff;
}

/* 第一个和最后一个同类型元素 */
p:first-of-type {
    font-size: 20px;
    font-weight: bold;
}

p:last-of-type {
    margin-bottom: 0;
}

/* 第n个子元素 */
tr:nth-child(odd) {
    background-color: #f8f9fa;
}

tr:nth-child(even) {
    background-color: white;
}

/* 更复杂的nth-child */
li:nth-child(3n+1) {
    /* 选择第1、4、7、10...个元素 */
    color: red;
}

li:nth-child(-n+3) {
    /* 选择前3个元素 */
    font-weight: bold;
}

/* 唯一子元素 */
p:only-child {
    text-align: center;
}

/* 空元素 */
div:empty {
    display: none;
}
```

### 否定伪类

`:not()` 通过排除某些条件来精准匹配，便于避免重复覆盖和提升选择器表达力。注意组合多个 `:not()` 时的可读性与特异性。

```css
/* 选择不是.special类的p元素 */
p:not(.special) {
    color: gray;
}

/* 选择不是第一个子元素的li */
li:not(:first-child) {
    margin-top: 10px;
}

/* 复杂的否定选择 */
input:not([type="submit"]):not([type="button"]) {
    border: 1px solid #ccc;
}
```

## ✨ 伪元素选择器

### 内容伪元素

伪元素 `::before/::after` 可在不增加 DOM 的情况下生成装饰性内容，常用于引号、图标、分隔线、徽标角标等。务必设置 `content` 才会渲染。

```css
/* 在元素前后插入内容 */
.quote::before {
    content: """;
    font-size: 2em;
    color: #007bff;
}

.quote::after {
    content: """;
    font-size: 2em;
    color: #007bff;
}

/* 图标字体 */
.icon-home::before {
    content: "\f015"; /* FontAwesome home icon */
    font-family: "Font Awesome 5 Free";
    margin-right: 8px;
}

/* 计数器 */
.chapter {
    counter-increment: chapter;
}

.chapter::before {
    content: "第" counter(chapter) "章：";
    font-weight: bold;
    color: #007bff;
}
```

### 文本伪元素

文本相关伪元素（如 `::first-line`/`::first-letter`/`::selection`/`::placeholder`）可实现首行首字装饰、选中文本高亮、占位符样式等效果，增强视觉层次。

```css
/* 首行样式 */
p::first-line {
    font-weight: bold;
    font-size: 1.2em;
    color: #007bff;
}

/* 首字母样式 */
p::first-letter {
    font-size: 3em;
    float: left;
    line-height: 1;
    margin-right: 8px;
    margin-top: 2px;
}

/* 选中文本样式 */
::selection {
    background-color: #007bff;
    color: white;
}

/* 占位符样式 */
input::placeholder {
    color: #6c757d;
    font-style: italic;
}
```

## 🔍 属性选择器

### 基础属性选择器

属性选择器基于元素属性值匹配（如 `[type="text"]`、`[title]`），适合表单与通用组件的风格统一。注意与 JS 的属性变更保持一致，避免样式“失联”。

```css
/* 选择有title属性的元素 */
[title] {
    border-bottom: 1px dotted #999;
}

/* 选择type为text的input */
input[type="text"] {
    border: 1px solid #ccc;
    padding: 8px;
}

/* 选择class为btn的元素 */
[class="btn"] {
    cursor: pointer;
}
```

### 高级属性选择器

更复杂的属性选择器支持前缀（`^=`）、后缀（`$=`）、包含（`*=`）、语言（`|=`）、单词包含（`~=`）等匹配方式，可用于协议/文件类型/关键字标识等。

```css
/* 属性值以指定值开头 */
a[href^="https"] {
    color: green;
}

a[href^="mailto"] {
    color: blue;
}

/* 属性值以指定值结尾 */
img[src$=".jpg"] {
    border: 2px solid red;
}

a[href$=".pdf"] {
    background: url('pdf-icon.png') no-repeat left center;
    padding-left: 20px;
}

/* 属性值包含指定值 */
[class*="btn"] {
    display: inline-block;
    padding: 6px 12px;
}

img[alt*="logo"] {
    max-width: 200px;
}

/* 属性值为指定值或以指定值开头后跟连字符 */
[lang|="en"] {
    font-family: "Times New Roman", serif;
}

/* 属性值包含指定单词（空格分隔） */
[class~="active"] {
    background-color: #007bff;
    color: white;
}
```

## ⚖️ 优先级规则

### 优先级计算

特异性（Specificity）用于比较选择器的“强度”：内联 > ID > 类/属性/伪类 > 元素/伪元素。理解叠加规则有助于减少 `!important`，保持样式可预测。

```css
/* 优先级从高到低：
   1. 内联样式 (1000)
   2. ID选择器 (100)
   3. 类选择器、属性选择器、伪类 (10)
   4. 元素选择器、伪元素 (1)
   5. 通配符选择器 (0)
*/

/* 优先级：1 */
p {
    color: black;
}

/* 优先级：10 */
.text {
    color: blue;
}

/* 优先级：100 */
#content {
    color: red;
}

/* 优先级：111 (100 + 10 + 1) */
#content .text p {
    color: green;
}

/* 优先级：21 (10 + 10 + 1) */
.container .text p {
    color: purple;
}
```

### !important规则

`!important` 能强制提升优先级，但会降低可维护性，应作为“最后手段”。更推荐通过提升特异性或结构调整来解决覆盖问题，仅在确有必要时使用。

```css
/* !important具有最高优先级 */
p {
    color: red !important;
}

/* 即使优先级更高，也会被!important覆盖 */
#content .text p {
    color: blue; /* 不会生效 */
}

/* 只有另一个!important才能覆盖 */
#content .text p {
    color: green !important; /* 会生效 */
}

/* ❌ 避免过度使用!important */
.bad-practice {
    color: red !important;
    font-size: 16px !important;
    margin: 10px !important;
}

/* ✅ 更好的做法：提高选择器特异性 */
.container .good-practice {
    color: red;
    font-size: 16px;
    margin: 10px;
}
```

### 优先级实战示例

通过逐步叠加选择器，观察颜色最终落点来直观理解优先级的比较与覆盖。实际工程中尽量保持扁平、语义明确的类结构，减少过度嵌套。

```html
<div id="container" class="wrapper">
    <p class="text highlight">这是一段文字</p>
</div>
```

```css
/* 优先级：1 */
p { color: black; }

/* 优先级：10 */
.text { color: blue; }

/* 优先级：20 */
.text.highlight { color: red; }

/* 优先级：100 */
#container { color: green; }

/* 优先级：101 */
#container p { color: purple; }

/* 优先级：110 */
#container .text { color: orange; }

/* 优先级：120 */
#container .text.highlight { color: pink; }

/* 最终颜色：pink（优先级最高：120） */
```

## 🎯 选择器最佳实践

### 性能优化

优先使用简短、定位准确的类/ID 选择器；避免层级过深和通配符；属性选择器应谨慎。性能问题更多源自“重排/重绘”和大 DOM，选择器优化是锦上添花。

```css
/* ✅ 高效选择器 */
.nav-item { }
#header { }
.btn-primary { }

/* ❌ 低效选择器 */
div div div p { } /* 过深的嵌套 */
* { } /* 通配符选择器 */
[class*="nav"] { } /* 复杂的属性选择器 */

/* ✅ 具体的选择器 */
.sidebar .menu-item { }

/* ❌ 过于宽泛的选择器 */
div p { }
```

### 可维护性

以“语义化 + 模块化 + 状态化”为组织原则：语义类表达结构角色，BEM 等命名帮助拆分层级，状态类表达瞬时状态。统一的规则能避免样式相互污染。

```css
/* ✅ 语义化的类名 */
.header-navigation { }
.product-card { }
.user-profile { }

/* ❌ 无意义的类名 */
.red-text { }
.big-box { }
.style1 { }

/* ✅ 模块化的选择器 */
.card { }
.card__header { }
.card__body { }
.card__footer { }

/* ✅ 状态类 */
.is-active { }
.is-hidden { }
.is-loading { }
```

### 组织结构

```css
/* 按特异性组织CSS */

/* 1. 重置和基础样式 */
* { box-sizing: border-box; }
body { font-family: Arial, sans-serif; }

/* 2. 元素选择器 */
h1, h2, h3 { margin-bottom: 1rem; }
p { line-height: 1.6; }

/* 3. 类选择器 */
.container { max-width: 1200px; }
.btn { padding: 10px 20px; }

/* 4. ID选择器 */
#header { background: #f8f9fa; }
#footer { background: #343a40; }

/* 5. 状态和修饰符 */
.btn:hover { opacity: 0.8; }
.is-active { background: #007bff; }
```

掌握CSS选择器和优先级规则是编写高效、可维护CSS代码的基础。合理使用选择器能够精确控制样式应用，避免样式冲突。
