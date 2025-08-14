# HTML 核心

HTML（HyperText Markup Language）超文本标记语言是构建网页的基础。它使用标签来描述网页的结构和内容，是前端开发的起点。

## 🎯 HTML核心概念

HTML通过标签（Tags）来标记内容，每个标签都有特定的语义和用途：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个网页</title>
</head>
<body>
    <header>
        <h1>欢迎来到我的网站</h1>
        <nav>
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home">
            <h2>主要内容</h2>
            <p>这是网页的主要内容区域。</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 我的网站</p>
    </footer>
</body>
</html>
```

## 📚 学习模块

### 🏗️ [文档结构与语义化](./structure.md)
学习HTML文档的基本结构和语义化标签的使用，包括DOCTYPE声明、页面结构标签、标题层级和可访问性优化。

### 📝 [表单与交互](./forms.md)
掌握HTML表单元素的使用，包括各种输入类型、表单验证、表单属性和交互功能的实现。

### 🎬 [多媒体与嵌入](./media.md)
学习在网页中嵌入图片、音频、视频等多媒体内容，以及响应式图片和懒加载技术。

### 🔍 [元信息与SEO](./meta-seo.md)
了解HTML元信息的设置，包括meta标签、SEO优化、社交媒体分享和网站图标配置。

### 🏷️ [全局属性](./attributes.md)
掌握HTML全局属性的使用，包括id、class、data-*属性以及可访问性相关属性。

### 🚀 [HTML5 API](./html5-api.md)
探索HTML5提供的现代Web API，包括Canvas绘图、本地存储、地理定位等功能。

## 🎯 学习目标

通过学习HTML核心知识，你将能够：

- ✅ 创建结构清晰、语义化的网页
- ✅ 构建功能完整的表单和交互元素
- ✅ 优化网页的SEO和可访问性
- ✅ 使用现代HTML5特性增强用户体验

## 💡 学习建议

1. **从基础开始**：先掌握基本的HTML结构和常用标签
2. **注重语义化**：选择合适的标签来表达内容的含义
3. **关注可访问性**：确保网页对所有用户都友好
4. **实践为主**：通过编写实际的网页来巩固知识

HTML是前端开发的基石，扎实的HTML基础将为后续学习CSS和JavaScript奠定良好的基础。
