# 全局属性

HTML全局属性是所有HTML元素都可以使用的属性，掌握这些属性能够提升网页的可访问性、交互性和可维护性。

## 🎯 核心全局属性

### id属性

```html
<!-- 唯一标识符 -->
<div id="header">页面头部</div>
<p id="intro">介绍段落</p>

<!-- 用于CSS选择器 -->
<style>
#header {
    background-color: #f0f0f0;
}
</style>

<!-- 用于JavaScript -->
<script>
document.getElementById('header').style.display = 'none';
</script>

<!-- 用于锚点链接 -->
<a href="#intro">跳转到介绍</a>

<!-- ❌ 错误：id必须唯一 -->
<div id="content">内容1</div>
<div id="content">内容2</div> <!-- 重复的id -->

<!-- ✅ 正确：每个id都是唯一的 -->
<div id="content1">内容1</div>
<div id="content2">内容2</div>
```

### class属性

```html
<!-- 单个类名 -->
<div class="container">容器</div>

<!-- 多个类名 -->
<div class="container main-content highlighted">主要内容</div>

<!-- CSS样式 -->
<style>
.container {
    max-width: 1200px;
    margin: 0 auto;
}

.main-content {
    padding: 20px;
}

.highlighted {
    background-color: yellow;
}
</style>

<!-- JavaScript操作 -->
<script>
// 添加类名
document.querySelector('.container').classList.add('active');

// 移除类名
document.querySelector('.container').classList.remove('highlighted');

// 切换类名
document.querySelector('.container').classList.toggle('visible');

// 检查是否包含类名
if (document.querySelector('.container').classList.contains('active')) {
    console.log('包含active类');
}
</script>
```

### style属性

```html
<!-- 内联样式 -->
<div style="color: red; font-size: 18px; margin: 10px;">
    带样式的文本
</div>

<!-- 动态样式 -->
<div id="dynamic" style="background-color: blue;">
    动态改变的元素
</div>

<script>
// JavaScript修改样式
const element = document.getElementById('dynamic');
element.style.backgroundColor = 'green';
element.style.fontSize = '20px';
element.style.padding = '15px';

// 设置多个样式
Object.assign(element.style, {
    color: 'white',
    borderRadius: '5px',
    textAlign: 'center'
});
</script>

<!-- ❌ 避免过度使用内联样式 -->
<div style="color: red; background: blue; padding: 10px; margin: 5px; border: 1px solid black; font-size: 16px;">
    样式过多的元素
</div>

<!-- ✅ 推荐使用CSS类 -->
<div class="styled-element">
    使用CSS类的元素
</div>
```

### title属性

```html
<!-- 提供额外信息 -->
<p title="这是一个提示信息">鼠标悬停查看提示</p>

<!-- 图片说明 -->
<img src="chart.jpg" alt="销售图表" title="2024年第一季度销售数据图表">

<!-- 链接说明 -->
<a href="https://example.com" title="访问示例网站">点击这里</a>

<!-- 缩写解释 -->
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- 表单元素提示 -->
<input type="password" title="密码至少8个字符，包含字母和数字">

<!-- 按钮说明 -->
<button type="submit" title="提交表单数据">提交</button>
```

## 🌐 国际化属性

### lang属性

```html
<!-- 页面语言 -->
<html lang="zh-CN">

<!-- 段落语言 -->
<p>这是中文内容</p>
<p lang="en">This is English content</p>
<p lang="ja">これは日本語のコンテンツです</p>

<!-- 引用其他语言 -->
<blockquote lang="en">
    "The only way to do great work is to love what you do."
    <cite>Steve Jobs</cite>
</blockquote>

<!-- 代码示例 -->
<code lang="javascript">
console.log('Hello, World!');
</code>

<!-- 常用语言代码 -->
<!-- zh-CN: 简体中文 -->
<!-- zh-TW: 繁体中文 -->
<!-- en: 英语 -->
<!-- en-US: 美式英语 -->
<!-- en-GB: 英式英语 -->
<!-- ja: 日语 -->
<!-- ko: 韩语 -->
<!-- fr: 法语 -->
<!-- de: 德语 -->
<!-- es: 西班牙语 -->
```

### dir属性

```html
<!-- 文本方向 -->
<div dir="ltr">从左到右的文本（默认）</div>
<div dir="rtl">من اليمين إلى اليسار النص</div>
<div dir="auto">自动检测文本方向</div>

<!-- 混合方向文本 -->
<p dir="ltr">
    英文文本 <span dir="rtl">العربية</span> 继续英文
</p>

<!-- 表单中的方向 -->
<form>
    <label for="name">姓名：</label>
    <input type="text" id="name" dir="auto">
    
    <label for="arabic">阿拉伯文：</label>
    <input type="text" id="arabic" dir="rtl">
</form>
```

## ♿ 可访问性属性

### tabindex属性

```html
<!-- 自然tab顺序 -->
<input type="text" placeholder="第一个输入框">
<input type="text" placeholder="第二个输入框">
<button>提交按钮</button>

<!-- 自定义tab顺序 -->
<input type="text" tabindex="3" placeholder="第三个访问">
<input type="text" tabindex="1" placeholder="第一个访问">
<input type="text" tabindex="2" placeholder="第二个访问">

<!-- 可聚焦的非表单元素 -->
<div tabindex="0" onclick="handleClick()">可点击的div</div>
<span tabindex="0" onkeydown="handleKeydown(event)">可聚焦的span</span>

<!-- 移除tab焦点 -->
<button tabindex="-1">不能通过tab访问的按钮</button>

<!-- 跳过链接（可访问性最佳实践） -->
<a href="#main-content" class="skip-link" tabindex="1">跳转到主内容</a>

<script>
function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        // 执行点击操作
        handleClick();
    }
}

function handleClick() {
    console.log('元素被激活');
}
</script>
```

### ARIA属性

```html
<!-- aria-label：为元素提供可访问的名称 -->
<button aria-label="关闭对话框">×</button>
<input type="search" aria-label="搜索产品">

<!-- aria-labelledby：引用其他元素作为标签 -->
<h2 id="billing">账单地址</h2>
<fieldset aria-labelledby="billing">
    <input type="text" placeholder="街道地址">
    <input type="text" placeholder="城市">
</fieldset>

<!-- aria-describedby：引用描述元素 -->
<input type="password" aria-describedby="pwd-help">
<div id="pwd-help">密码必须至少8个字符</div>

<!-- aria-hidden：对屏幕阅读器隐藏 -->
<span aria-hidden="true">👍</span>
<span class="sr-only">点赞</span>

<!-- aria-expanded：展开/折叠状态 -->
<button aria-expanded="false" aria-controls="menu">菜单</button>
<ul id="menu" hidden>
    <li><a href="#home">首页</a></li>
    <li><a href="#about">关于</a></li>
</ul>

<!-- aria-live：动态内容更新 -->
<div aria-live="polite" id="status"></div>
<div aria-live="assertive" id="error"></div>

<!-- role属性：定义元素角色 -->
<div role="button" tabindex="0">自定义按钮</div>
<nav role="navigation">导航区域</nav>
<main role="main">主要内容</main>
```

## 📊 数据属性

### data-*属性

```html
<!-- 存储自定义数据 -->
<div data-user-id="123" data-user-role="admin" data-last-login="2024-01-15">
    用户信息
</div>

<!-- 产品信息 -->
<div class="product" 
     data-product-id="P001" 
     data-price="99.99" 
     data-category="electronics"
     data-in-stock="true">
    产品展示
</div>

<!-- 配置信息 -->
<div class="carousel" 
     data-autoplay="true" 
     data-interval="3000" 
     data-show-dots="true">
    轮播图
</div>

<!-- JavaScript访问data属性 -->
<script>
const userDiv = document.querySelector('[data-user-id="123"]');

// 读取data属性
console.log(userDiv.dataset.userId);     // "123"
console.log(userDiv.dataset.userRole);   // "admin"
console.log(userDiv.dataset.lastLogin);  // "2024-01-15"

// 设置data属性
userDiv.dataset.status = 'online';
userDiv.dataset.lastActivity = Date.now();

// 删除data属性
delete userDiv.dataset.lastLogin;

// 检查data属性是否存在
if ('userId' in userDiv.dataset) {
    console.log('用户ID存在');
}
</script>

<!-- CSS使用data属性 -->
<style>
/* 根据data属性设置样式 */
[data-status="online"] {
    color: green;
}

[data-status="offline"] {
    color: gray;
}

[data-priority="high"] {
    border-left: 3px solid red;
}

/* 显示data属性内容 */
.product::after {
    content: "价格: $" attr(data-price);
    display: block;
    font-size: 14px;
    color: #666;
}
</style>
```

## 🎛️ 交互属性

### contenteditable属性

```html
<!-- 可编辑内容 -->
<div contenteditable="true">
    这段文字可以编辑
</div>

<!-- 部分可编辑 -->
<p>
    这是普通文本，
    <span contenteditable="true">这部分可以编辑</span>，
    这又是普通文本。
</p>

<!-- 富文本编辑器 -->
<div contenteditable="true" 
     style="border: 1px solid #ccc; padding: 10px; min-height: 100px;">
    <h3>标题</h3>
    <p>可以编辑的<strong>富文本</strong>内容</p>
    <ul>
        <li>列表项1</li>
        <li>列表项2</li>
    </ul>
</div>

<script>
// 监听编辑事件
document.querySelector('[contenteditable]').addEventListener('input', function(e) {
    console.log('内容已修改:', this.innerHTML);
});

// 获取纯文本内容
function getPlainText(element) {
    return element.textContent || element.innerText;
}

// 设置内容
function setContent(element, html) {
    element.innerHTML = html;
}
</script>
```

### draggable属性

```html
<!-- 可拖拽元素 -->
<div draggable="true" ondragstart="handleDragStart(event)">
    拖拽我
</div>

<!-- 拖拽目标 -->
<div class="drop-zone" 
     ondragover="handleDragOver(event)" 
     ondrop="handleDrop(event)">
    拖拽到这里
</div>

<script>
function handleDragStart(event) {
    // 设置拖拽数据
    event.dataTransfer.setData('text/plain', event.target.textContent);
    event.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(event) {
    // 允许放置
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    event.target.textContent = '已放置: ' + data;
}
</script>

<!-- 图片拖拽 -->
<img src="image.jpg" 
     alt="可拖拽图片" 
     draggable="true"
     ondragstart="handleImageDrag(event)">

<script>
function handleImageDrag(event) {
    event.dataTransfer.setData('text/uri-list', event.target.src);
    event.dataTransfer.setData('text/html', event.target.outerHTML);
}
</script>
```

## 🔧 其他实用属性

### hidden属性

```html
<!-- 隐藏元素 -->
<div hidden>这个元素被隐藏了</div>

<!-- 条件显示 -->
<div id="loading" hidden>加载中...</div>
<div id="content">内容区域</div>

<script>
// 显示加载状态
function showLoading() {
    document.getElementById('loading').hidden = false;
    document.getElementById('content').hidden = true;
}

// 隐藏加载状态
function hideLoading() {
    document.getElementById('loading').hidden = true;
    document.getElementById('content').hidden = false;
}

// 切换显示状态
function toggleElement(id) {
    const element = document.getElementById(id);
    element.hidden = !element.hidden;
}
</script>
```

### spellcheck属性

```html
<!-- 拼写检查 -->
<textarea spellcheck="true" placeholder="启用拼写检查的文本区域"></textarea>
<textarea spellcheck="false" placeholder="禁用拼写检查的文本区域"></textarea>

<!-- 输入框拼写检查 -->
<input type="text" spellcheck="true" placeholder="检查拼写的输入框">

<!-- 可编辑内容拼写检查 -->
<div contenteditable="true" spellcheck="true">
    可编辑的内容，会检查拼写错误
</div>
```

### translate属性

```html
<!-- 翻译控制 -->
<p translate="yes">这段文字可以被翻译</p>
<p translate="no">This text should not be translated</p>

<!-- 品牌名称不翻译 -->
<p>欢迎使用 <span translate="no">MyApp</span> 应用程序</p>

<!-- 代码不翻译 -->
<code translate="no">console.log('Hello, World!');</code>
```

## 🎯 最佳实践

### 属性使用规范

```html
<!-- ✅ 好的做法 -->
<div id="unique-id" 
     class="container main-content" 
     data-component="header"
     aria-label="网站头部"
     role="banner">
    <h1>网站标题</h1>
</div>

<!-- ❌ 避免的做法 -->
<div id="content" class="content" style="color: red; font-size: 16px;">
    <!-- 过度使用内联样式 -->
</div>

<div id="content">内容1</div>
<div id="content">内容2</div> <!-- 重复ID -->
```

### 可访问性最佳实践

```html
<!-- 完整的可访问性示例 -->
<button id="menu-button"
        aria-expanded="false"
        aria-controls="menu-list"
        aria-haspopup="true"
        class="menu-toggle">
    菜单
</button>

<ul id="menu-list" 
    role="menu" 
    aria-labelledby="menu-button"
    hidden>
    <li role="menuitem"><a href="#home">首页</a></li>
    <li role="menuitem"><a href="#about">关于</a></li>
    <li role="menuitem"><a href="#contact">联系</a></li>
</ul>
```

掌握HTML全局属性的正确使用，能够创建出更加语义化、可访问和交互友好的网页应用。
