# 文档结构与语义化

HTML文档的结构化和语义化是现代Web开发的基础，它不仅影响SEO效果，还关系到可访问性和代码的可维护性。

## 🏗️ HTML文档基本结构

### DOCTYPE声明

```html
<!DOCTYPE html>
```

DOCTYPE声明告诉浏览器使用HTML5标准解析文档，必须放在文档的第一行。

### 完整的文档结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

**关键要素说明：**
- `<html lang="zh-CN">`：指定页面语言，有助于搜索引擎和屏幕阅读器
- `<meta charset="UTF-8">`：指定字符编码，支持中文等多字节字符
- `<meta name="viewport">`：控制移动端页面的显示效果

## 🎯 语义化标签详解

### 页面结构标签

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>新闻网站</title>
</head>
<body>
    <!-- 页面头部 -->
    <header>
        <h1>新闻网站</h1>
        <nav>
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#news">新闻</a></li>
                <li><a href="#sports">体育</a></li>
                <li><a href="#tech">科技</a></li>
            </ul>
        </nav>
    </header>

    <!-- 主要内容区域 -->
    <main>
        <!-- 新闻列表区域 -->
        <section id="news">
            <h2>今日新闻</h2>
            
            <!-- 单篇新闻文章 -->
            <article>
                <header>
                    <h3>新闻标题</h3>
                    <p>
                        <time datetime="2024-01-15">2024年1月15日</time>
                        <span>作者：张三</span>
                    </p>
                </header>
                
                <p>新闻摘要内容...</p>
                
                <footer>
                    <p>标签：<a href="#tag1">政治</a> <a href="#tag2">经济</a></p>
                </footer>
            </article>
            
            <article>
                <header>
                    <h3>另一篇新闻标题</h3>
                    <p>
                        <time datetime="2024-01-14">2024年1月14日</time>
                        <span>作者：李四</span>
                    </p>
                </header>
                
                <p>新闻内容...</p>
            </article>
        </section>

        <!-- 侧边栏 -->
        <aside>
            <section>
                <h3>热门话题</h3>
                <ul>
                    <li><a href="#topic1">话题一</a></li>
                    <li><a href="#topic2">话题二</a></li>
                    <li><a href="#topic3">话题三</a></li>
                </ul>
            </section>
            
            <section>
                <h3>广告位</h3>
                <div class="ad-banner">
                    <p>广告内容</p>
                </div>
            </section>
        </aside>
    </main>

    <!-- 页面底部 -->
    <footer>
        <div>
            <h4>关于我们</h4>
            <p>网站介绍信息</p>
        </div>
        
        <div>
            <h4>联系方式</h4>
            <address>
                <p>邮箱：contact@example.com</p>
                <p>电话：123-456-7890</p>
            </address>
        </div>
        
        <div>
            <p>&copy; 2024 新闻网站. 保留所有权利.</p>
        </div>
    </footer>
</body>
</html>
```

### 语义化标签说明

| 标签 | 用途 | 示例场景 |
|------|------|----------|
| `<header>` | 页面或区块的头部 | 网站标题、导航菜单、文章标题 |
| `<nav>` | 导航链接区域 | 主导航、面包屑导航、分页导航 |
| `<main>` | 页面主要内容 | 每个页面只能有一个main |
| `<section>` | 内容区块 | 章节、功能区域 |
| `<article>` | 独立的内容单元 | 博客文章、新闻、评论 |
| `<aside>` | 侧边栏内容 | 相关链接、广告、补充信息 |
| `<footer>` | 页面或区块的底部 | 版权信息、联系方式、相关链接 |

## 📝 标题层级与可访问性

### 正确的标题层级

```html
<article>
    <h1>文章主标题</h1>
    
    <section>
        <h2>第一章</h2>
        <p>章节内容...</p>
        
        <h3>第一节</h3>
        <p>节的内容...</p>
        
        <h4>小节标题</h4>
        <p>小节内容...</p>
    </section>
    
    <section>
        <h2>第二章</h2>
        <p>章节内容...</p>
        
        <h3>第一节</h3>
        <p>节的内容...</p>
    </section>
</article>
```

### 标题层级最佳实践

```html
<!-- ✅ 正确的层级结构 -->
<h1>页面主标题</h1>
<h2>主要章节</h2>
<h3>子章节</h3>
<h4>小节</h4>

<!-- ❌ 错误的层级跳跃 -->
<h1>页面主标题</h1>
<h4>直接跳到h4</h4> <!-- 跳过了h2和h3 -->

<!-- ✅ 使用CSS控制样式，而不是选择标题级别 -->
<h2 class="large-title">看起来像h1但语义是h2</h2>

<style>
.large-title {
    font-size: 2em;
    font-weight: bold;
}
</style>
```

## 🎨 内容分组与组织

### 使用div和span

```html
<!-- div用于块级内容分组 -->
<div class="card">
    <div class="card-header">
        <h3>卡片标题</h3>
    </div>
    <div class="card-body">
        <p>卡片内容</p>
    </div>
    <div class="card-footer">
        <button>操作按钮</button>
    </div>
</div>

<!-- span用于行内内容分组 -->
<p>
    这是一段文本，其中
    <span class="highlight">这部分需要高亮显示</span>，
    而<span class="emphasis">这部分需要强调</span>。
</p>
```

### 列表的语义化使用

```html
<!-- 无序列表：项目顺序不重要 -->
<ul>
    <li>苹果</li>
    <li>香蕉</li>
    <li>橙子</li>
</ul>

<!-- 有序列表：项目顺序重要 -->
<ol>
    <li>打开浏览器</li>
    <li>输入网址</li>
    <li>按回车键</li>
</ol>

<!-- 描述列表：术语和定义 -->
<dl>
    <dt>HTML</dt>
    <dd>超文本标记语言，用于创建网页结构</dd>
    
    <dt>CSS</dt>
    <dd>层叠样式表，用于控制网页样式</dd>
    
    <dt>JavaScript</dt>
    <dd>编程语言，用于实现网页交互功能</dd>
</dl>
```

## 🔍 可访问性优化

### ARIA属性的使用

```html
<!-- 为复杂组件添加ARIA标签 -->
<div class="dropdown" role="button" 
     aria-haspopup="true" 
     aria-expanded="false"
     tabindex="0">
    <span>选择选项</span>
    <ul class="dropdown-menu" role="menu">
        <li role="menuitem"><a href="#option1">选项1</a></li>
        <li role="menuitem"><a href="#option2">选项2</a></li>
        <li role="menuitem"><a href="#option3">选项3</a></li>
    </ul>
</div>

<!-- 为动态内容添加live区域 -->
<div id="status" aria-live="polite" aria-atomic="true">
    <!-- 状态更新会被屏幕阅读器读出 -->
</div>

<!-- 隐藏装饰性内容 -->
<span class="icon" aria-hidden="true">🎉</span>
<span class="sr-only">庆祝图标</span>
```

### 键盘导航支持

```html
<!-- 确保所有交互元素都可以通过键盘访问 -->
<div class="custom-button" 
     tabindex="0" 
     role="button"
     onkeydown="handleKeyDown(event)"
     onclick="handleClick()">
    自定义按钮
</div>

<script>
function handleKeyDown(event) {
    // 支持空格键和回车键激活
    if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        handleClick();
    }
}

function handleClick() {
    console.log('按钮被激活');
}
</script>
```

## 🎯 实际应用示例

### 博客文章页面结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>如何学习前端开发 - 我的博客</title>
</head>
<body>
    <header>
        <h1><a href="/">我的博客</a></h1>
        <nav>
            <ul>
                <li><a href="/posts">文章</a></li>
                <li><a href="/about">关于</a></li>
                <li><a href="/contact">联系</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h1>如何学习前端开发</h1>
                <p>
                    发布于 <time datetime="2024-01-15">2024年1月15日</time>
                    作者：<span>张三</span>
                </p>
            </header>

            <section>
                <h2>学习路径</h2>
                <p>前端开发的学习可以分为以下几个阶段...</p>
                
                <h3>基础阶段</h3>
                <p>首先需要掌握HTML、CSS和JavaScript...</p>
                
                <h3>进阶阶段</h3>
                <p>然后学习框架和工具...</p>
            </section>

            <section>
                <h2>学习资源</h2>
                <ul>
                    <li><a href="#">MDN Web文档</a></li>
                    <li><a href="#">freeCodeCamp</a></li>
                    <li><a href="#">JavaScript.info</a></li>
                </ul>
            </section>

            <footer>
                <p>
                    标签：
                    <a href="/tags/frontend">前端</a>
                    <a href="/tags/learning">学习</a>
                </p>
            </footer>
        </article>

        <section id="comments">
            <h2>评论</h2>
            <!-- 评论列表 -->
        </section>
    </main>

    <aside>
        <section>
            <h3>相关文章</h3>
            <ul>
                <li><a href="/post1">CSS布局技巧</a></li>
                <li><a href="/post2">JavaScript异步编程</a></li>
            </ul>
        </section>
    </aside>

    <footer>
        <p>&copy; 2024 我的博客. 保留所有权利.</p>
    </footer>
</body>
</html>
```

语义化的HTML不仅让代码更易读，还能提升SEO效果和可访问性，是现代Web开发的重要基础。
