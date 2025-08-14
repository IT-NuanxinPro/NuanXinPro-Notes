# 布局

CSS布局是网页设计的核心技能，掌握不同的布局技术能够创建出灵活、响应式的网页结构。

## 🌊 标准流（Normal Flow）

### 块级元素和行内元素

标准流中，元素按块级和行内两类参与布局：块级独占一行、可设置宽高；行内在一行内排布、尺寸由内容决定；`inline-block` 兼具两者优点。理解这三者的特性是掌握基础布局的第一步。

```css
/* 块级元素 - 独占一行，可设置宽高 */
div, p, h1, section, article {
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
}

/* 行内元素 - 在同一行显示，不可设置宽高 */
span, a, strong, em {
    display: inline;
    /* width和height无效 */
    /* margin-top和margin-bottom无效 */
}

/* 行内块元素 - 结合两者特点 */
img, input, button {
    display: inline-block;
    /* 可以设置宽高，也可以在同一行显示 */
}
```

### 文档流示例

这一段通过最常见的容器、块级与行内元素组合，展示标准流下的占据行为与渲染顺序。注意行内元素无法设置上下外边距，适合与块级元素配合实现自然排版。

```html
<div class="container">
    <h1>标题（块级元素）</h1>
    <p>这是一个段落（块级元素），包含<span>行内元素</span>和<strong>强调文本</strong>。</p>
    <div class="box">另一个块级元素</div>
</div>

<style>
.container {
    width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
}

.box {
    background-color: #f0f0f0;
    padding: 15px;
    margin: 10px 0;
}

span {
    background-color: yellow;
    padding: 2px 4px;
}

strong {
    color: red;
}
</style>
```

## 🎈 浮动布局（Float）

### 基础浮动

浮动最初用于图文环绕，现代布局中更多作为历史兼容。使用浮动时记得清除浮动（`clearfix` 或创建 BFC），否则父容器可能高度塌陷。建议优先使用 Flex/Grid。

```css
/* 浮动基础 */
.float-left {
    float: left;
    width: 200px;
    height: 150px;
    background-color: #ffebee;
    margin: 10px;
}

.float-right {
    float: right;
    width: 200px;
    height: 150px;
    background-color: #e8f5e8;
    margin: 10px;
}

/* 清除浮动 */
.clear-both {
    clear: both;
}

.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

/* 现代清除浮动 */
.clearfix {
    overflow: hidden; /* 创建BFC */
}
```

### 浮动布局实例

典型两栏布局示例：侧边栏固定宽度、主区域自适应。通过清除浮动保证整体高度正确；这种结构在遗留项目中较常见，现代项目可用 Flex/Grid 更优雅地实现。

```html
<div class="article-layout clearfix">
    <aside class="sidebar">
        <h3>侧边栏</h3>
        <ul>
            <li>导航项1</li>
            <li>导航项2</li>
            <li>导航项3</li>
        </ul>
    </aside>
    
    <main class="content">
        <h2>主要内容</h2>
        <p>这里是文章的主要内容区域...</p>
    </main>
</div>

<style>
.article-layout {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.sidebar {
    float: left;
    width: 250px;
    background-color: #f8f9fa;
    padding: 20px;
    margin-right: 20px;
}

.content {
    float: left;
    width: calc(100% - 290px); /* 总宽度 - 侧边栏宽度 - 间距 */
    background-color: white;
    padding: 20px;
}
</style>
```

## 📍 定位布局（Position）

### 定位类型

定位决定元素脱离或参与文档流的方式：`relative` 在原位偏移；`absolute` 相对最近的非 `static` 祖先定位；`fixed` 相对视口固定；`sticky` 在阈值前后切换 `relative/fixed`。常用于悬浮按钮、粘性导航、模态等。

```css
/* 静态定位（默认） */
.static {
    position: static;
    /* top, right, bottom, left 无效 */
}

/* 相对定位 */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
    /* 相对于元素原来的位置偏移 */
}

/* 绝对定位 */
.absolute {
    position: absolute;
    top: 50px;
    right: 30px;
    /* 相对于最近的非static定位祖先元素 */
}

/* 固定定位 */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
    /* 相对于视口定位 */
}

/* 粘性定位 */
.sticky {
    position: sticky;
    top: 0;
    /* 在滚动时"粘"在指定位置 */
}
```

### 定位实际应用

将不同定位方式组合可实现常见 UI：模态/遮罩（fixed 居中并遮罩背景）、粘性头部（sticky 提升可用性）、回到顶部按钮（fixed 提升可达性）。注意合理设置 `z-index` 层级。

```css
/* 模态框 */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    position: relative;
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}

/* 粘性导航 */
.sticky-nav {
    position: sticky;
    top: 0;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 100;
}

/* 返回顶部按钮 */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 999;
}
```

## 🔧 Flex布局

### Flex容器属性

Flex 适合一维（行或列）布局。容器属性决定主轴方向、换行、主轴/交叉轴对齐和多行分布等。优先用 `gap` 控制间距，减少“负 margin”等古老技巧。

```css
.flex-container {
    display: flex;
    
    /* 主轴方向 */
    flex-direction: row; /* row | row-reverse | column | column-reverse */
    
    /* 换行 */
    flex-wrap: nowrap; /* nowrap | wrap | wrap-reverse */
    
    /* 简写 */
    flex-flow: row wrap; /* flex-direction flex-wrap */
    
    /* 主轴对齐 */
    justify-content: flex-start; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
    
    /* 交叉轴对齐 */
    align-items: stretch; /* stretch | flex-start | flex-end | center | baseline */
    
    /* 多行对齐 */
    align-content: stretch; /* stretch | flex-start | flex-end | center | space-between | space-around */
    
    /* 项目间距 */
    gap: 20px; /* 或者 row-gap: 20px; column-gap: 10px; */
}
```

### Flex项目属性

项目（子项）属性控制放大/缩小/基础尺寸及单独对齐与排序。`flex: grow shrink basis` 是常用简写。良好的 `flex-basis` 设定能显著提升布局的可预期性。

```css
.flex-item {
    /* 放大比例 */
    flex-grow: 0; /* 默认0，不放大 */
    
    /* 缩小比例 */
    flex-shrink: 1; /* 默认1，等比缩小 */
    
    /* 基础大小 */
    flex-basis: auto; /* 默认auto，项目本来大小 */
    
    /* 简写 */
    flex: 1; /* flex-grow flex-shrink flex-basis */
    flex: 1 1 200px;
    
    /* 单独对齐 */
    align-self: auto; /* auto | flex-start | flex-end | center | baseline | stretch */
    
    /* 排序 */
    order: 0; /* 默认0，数值越小越靠前 */
}
```

### Flex布局实例

卡片自适应布局示例：父容器启用 `flex-wrap` 与 `gap`，子卡片通过 `flex: 1 1 300px` 实现最小宽度与弹性增长，内部列布局确保按钮贴底，呈现常见产品卡效果。

```html
<div class="card-layout">
    <div class="card">
        <img src="image1.jpg" alt="图片1">
        <div class="card-content">
            <h3>卡片标题1</h3>
            <p>卡片内容描述...</p>
            <button>了解更多</button>
        </div>
    </div>
    <div class="card">
        <img src="image2.jpg" alt="图片2">
        <div class="card-content">
            <h3>卡片标题2</h3>
            <p>这是一个更长的卡片内容描述，用来测试flex布局的自适应能力...</p>
            <button>了解更多</button>
        </div>
    </div>
    <div class="card">
        <img src="image3.jpg" alt="图片3">
        <div class="card-content">
            <h3>卡片标题3</h3>
            <p>卡片内容...</p>
            <button>了解更多</button>
        </div>
    </div>
</div>

<style>
.card-layout {
    display: flex;
    gap: 20px;
    padding: 20px;
    flex-wrap: wrap;
}

.card {
    flex: 1 1 300px; /* 最小宽度300px，可以放大和缩小 */
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1; /* 占据剩余空间 */
}

.card-content h3 {
    margin: 0 0 10px 0;
}

.card-content p {
    flex: 1; /* 占据剩余空间，推动按钮到底部 */
    margin: 0 0 15px 0;
}

.card-content button {
    align-self: flex-start;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
```

## 🎯 Grid布局

### Grid容器属性

Grid 擅长二维布局。容器属性定义行列轨道、区域与对齐方式。`repeat/auto-fit/auto-fill/minmax` 能构建强大的自适应网格，配合 `gap` 管理行列间距。

```css
.grid-container {
    display: grid;
    
    /* 定义列 */
    grid-template-columns: 200px 1fr 100px; /* 固定 自适应 固定 */
    grid-template-columns: repeat(3, 1fr); /* 重复3列，每列1fr */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* 自适应列数 */
    
    /* 定义行 */
    grid-template-rows: auto 1fr auto; /* 自动 自适应 自动 */
    
    /* 定义区域 */
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    
    /* 简写 */
    grid-template: 
        "header header header" auto
        "sidebar main aside" 1fr
        "footer footer footer" auto
        / 200px 1fr 100px;
    
    /* 网格间距 */
    gap: 20px; /* 或者 row-gap: 20px; column-gap: 10px; */
    
    /* 对齐方式 */
    justify-items: stretch; /* stretch | start | end | center */
    align-items: stretch; /* stretch | start | end | center */
    justify-content: start; /* start | end | center | stretch | space-around | space-between | space-evenly */
    align-content: start; /* start | end | center | stretch | space-around | space-between | space-evenly */
}
```

### Grid项目属性

项目属性用于指定跨行跨列、命名区域及单元格内部对齐。`grid-area` 可同时设定四个线条位置或引用命名区域，让布局更语义化。

```css
.grid-item {
    /* 指定位置 */
    grid-column: 1 / 3; /* 从第1列到第3列 */
    grid-row: 2 / 4; /* 从第2行到第4行 */
    
    /* 简写 */
    grid-area: 2 / 1 / 4 / 3; /* row-start / column-start / row-end / column-end */
    
    /* 使用命名区域 */
    grid-area: header;
    
    /* 跨越 */
    grid-column: span 2; /* 跨越2列 */
    grid-row: span 3; /* 跨越3行 */
    
    /* 对齐 */
    justify-self: center; /* start | end | center | stretch */
    align-self: center; /* start | end | center | stretch */
}
```

### Grid布局实例

典型三栏页面：使用 `grid-template-areas` 描述语义区域，配合媒体查询在小屏降级为单列。此法结构清晰、易维护、适合复杂页面框架。

```html
<div class="page-layout">
    <header class="header">网站头部</header>
    <nav class="sidebar">侧边导航</nav>
    <main class="main">主要内容</main>
    <aside class="aside">右侧栏</aside>
    <footer class="footer">网站底部</footer>
</div>

<style>
.page-layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 150px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 20px;
    padding: 20px;
}

.header {
    grid-area: header;
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
}

.sidebar {
    grid-area: sidebar;
    background-color: #f8f9fa;
    padding: 20px;
}

.main {
    grid-area: main;
    background-color: white;
    padding: 20px;
    border: 1px solid #ddd;
}

.aside {
    grid-area: aside;
    background-color: #f8f9fa;
    padding: 20px;
}

.footer {
    grid-area: footer;
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .page-layout {
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "aside"
            "footer";
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto auto auto;
    }
}
</style>
```

## 🎯 布局选择指南

### 何时使用不同布局

这段为布局选型提供速查：一维用 Flex，二维用 Grid；文本环绕仍可用 Float；需要脱离文档流或悬浮元素用 Position。实际项目常“Grid 划大区 + Flex 布局小组件”。

```css
/* 1. 简单的水平/垂直居中 - Flex */
.center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 2. 一维布局（行或列） - Flex */
.navigation {
    display: flex;
    gap: 20px;
    align-items: center;
}

/* 3. 二维布局（行和列） - Grid */
.photo-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

/* 4. 复杂页面布局 - Grid */
.complex-layout {
    display: grid;
    grid-template-areas: 
        "header header"
        "sidebar main"
        "footer footer";
}

/* 5. 文本环绕 - Float */
.article-image {
    float: left;
    margin: 0 20px 20px 0;
}

/* 6. 固定位置元素 - Position */
.floating-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
```

## 🚀 现代布局最佳实践

### 响应式布局组合

现代布局常以 Grid 构建整体区域，以 Flex 组织局部内容，并结合 `clamp()`、容器查询、`gap` 等现代能力实现自然扩展与收缩。示例体现了这些组合的实战写法。

```css
/* 现代响应式布局 */
.modern-layout {
    display: grid;
    grid-template-columns: 
        minmax(200px, 250px) 
        minmax(0, 1fr) 
        minmax(150px, 200px);
    gap: clamp(1rem, 4vw, 2rem);
    padding: clamp(1rem, 4vw, 2rem);
    min-height: 100vh;
}

/* 内容区域使用Flex */
.content-area {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

/* 容器查询（现代浏览器） */
@container (min-width: 400px) {
    .card {
        display: flex;
        flex-direction: row;
    }
}
```

掌握这些布局技术，能够创建出灵活、响应式且易于维护的网页布局。选择合适的布局方法是关键，通常现代项目会结合使用Grid和Flex来实现最佳效果。
