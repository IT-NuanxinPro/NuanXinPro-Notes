# 元信息与SEO

HTML元信息是网页的"身份证"，正确设置元信息不仅能提升SEO效果，还能改善用户体验和社交媒体分享效果。

## 🎯 基础元信息

### 必需的meta标签

```html
<head>
    <!-- 字符编码（必须在前1024字节内） -->
    <meta charset="UTF-8">
    
    <!-- 视口设置（移动端必需） -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- 页面标题（SEO最重要） -->
    <title>页面标题 - 网站名称</title>
    
    <!-- 页面描述 -->
    <meta name="description" content="页面内容的简洁描述，通常显示在搜索结果中">
    
    <!-- 关键词（现在SEO价值较低） -->
    <meta name="keywords" content="关键词1, 关键词2, 关键词3">
    
    <!-- 作者信息 -->
    <meta name="author" content="作者姓名">
    
    <!-- 页面语言 -->
    <meta name="language" content="zh-CN">
</head>
```

### 高级meta标签

```html
<head>
    <!-- 页面主题颜色（移动端浏览器） -->
    <meta name="theme-color" content="#007bff">
    
    <!-- 应用名称 -->
    <meta name="application-name" content="应用名称">
    
    <!-- 生成器信息 -->
    <meta name="generator" content="Hugo 0.100.0">
    
    <!-- 版权信息 -->
    <meta name="copyright" content="© 2024 公司名称">
    
    <!-- 机器人指令 -->
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow, max-snippet:-1">
    
    <!-- 重新访问间隔 -->
    <meta name="revisit-after" content="7 days">
    
    <!-- 页面评级 -->
    <meta name="rating" content="general">
    
    <!-- 地理位置 -->
    <meta name="geo.region" content="CN-BJ">
    <meta name="geo.placename" content="北京">
    <meta name="geo.position" content="39.9042;116.4074">
</head>
```

## 🔍 SEO优化

### 标题优化

```html
<!-- ✅ 好的标题 -->
<title>前端开发教程 - 学习HTML、CSS、JavaScript | 开发者指南</title>

<!-- ❌ 不好的标题 -->
<title>首页</title>
<title>欢迎来到我们的网站，这里有很多很多内容，包括前端开发、后端开发、移动开发等等</title>

<!-- 不同页面的标题示例 -->
<!-- 首页 -->
<title>开发者指南 - 前端后端全栈开发教程</title>

<!-- 分类页 -->
<title>前端开发教程 - 开发者指南</title>

<!-- 文章页 -->
<title>JavaScript异步编程详解 - 前端开发 - 开发者指南</title>

<!-- 产品页 -->
<title>MacBook Pro 14英寸 - Apple官网</title>
```

### 描述优化

```html
<!-- ✅ 好的描述 -->
<meta name="description" content="全面的前端开发教程，涵盖HTML、CSS、JavaScript基础知识和实战项目。适合初学者和进阶开发者，提供代码示例和最佳实践。">

<!-- ❌ 不好的描述 -->
<meta name="description" content="网站">
<meta name="description" content="这是一个非常好的网站，有很多内容，大家快来看看吧，内容很丰富，包括各种技术文章和教程">
```

### 结构化数据

```html
<!-- JSON-LD结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "JavaScript异步编程详解",
  "description": "深入讲解JavaScript中的异步编程概念，包括Promise、async/await等",
  "image": "https://example.com/article-image.jpg",
  "author": {
    "@type": "Person",
    "name": "张三",
    "url": "https://example.com/author/zhangsan"
  },
  "publisher": {
    "@type": "Organization",
    "name": "开发者指南",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20"
}
</script>

<!-- 面包屑导航结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "前端开发",
      "item": "https://example.com/frontend"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "JavaScript教程",
      "item": "https://example.com/frontend/javascript"
    }
  ]
}
</script>
```

### 链接优化

```html
<!-- 规范链接（避免重复内容） -->
<link rel="canonical" href="https://example.com/current-page">

<!-- 多语言版本 -->
<link rel="alternate" hreflang="en" href="https://example.com/en/current-page">
<link rel="alternate" hreflang="zh-CN" href="https://example.com/zh/current-page">
<link rel="alternate" hreflang="x-default" href="https://example.com/current-page">

<!-- 上一页/下一页（分页内容） -->
<link rel="prev" href="https://example.com/page/1">
<link rel="next" href="https://example.com/page/3">

<!-- RSS订阅 -->
<link rel="alternate" type="application/rss+xml" title="网站RSS" href="https://example.com/rss.xml">
```

## 📱 社交媒体优化

### Open Graph（Facebook）

```html
<!-- 基础Open Graph标签 -->
<meta property="og:title" content="JavaScript异步编程详解">
<meta property="og:description" content="深入讲解JavaScript中的异步编程概念，包括Promise、async/await等">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/javascript-async">
<meta property="og:type" content="article">
<meta property="og:site_name" content="开发者指南">
<meta property="og:locale" content="zh_CN">

<!-- 文章类型的额外标签 -->
<meta property="article:author" content="张三">
<meta property="article:published_time" content="2024-01-15T10:00:00Z">
<meta property="article:modified_time" content="2024-01-20T15:30:00Z">
<meta property="article:section" content="前端开发">
<meta property="article:tag" content="JavaScript">
<meta property="article:tag" content="异步编程">

<!-- 图片详细信息 -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="JavaScript异步编程示意图">
```

### Twitter Cards

```html
<!-- Twitter卡片基础标签 -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@website_twitter">
<meta name="twitter:creator" content="@author_twitter">
<meta name="twitter:title" content="JavaScript异步编程详解">
<meta name="twitter:description" content="深入讲解JavaScript中的异步编程概念，包括Promise、async/await等">
<meta name="twitter:image" content="https://example.com/twitter-image.jpg">
<meta name="twitter:image:alt" content="JavaScript异步编程示意图">

<!-- 不同类型的Twitter卡片 -->
<!-- 摘要卡片 -->
<meta name="twitter:card" content="summary">

<!-- 大图摘要卡片 -->
<meta name="twitter:card" content="summary_large_image">

<!-- 应用卡片 -->
<meta name="twitter:card" content="app">
<meta name="twitter:app:name:iphone" content="应用名称">
<meta name="twitter:app:id:iphone" content="123456789">
<meta name="twitter:app:url:iphone" content="app://deep-link">
```

### 其他社交平台

```html
<!-- LinkedIn -->
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="https://example.com/linkedin-image.jpg">

<!-- Pinterest -->
<meta name="pinterest-rich-pin" content="true">
<meta property="og:type" content="article">
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="https://example.com/pinterest-image.jpg">

<!-- 微信分享 -->
<meta itemprop="name" content="页面标题">
<meta itemprop="description" content="页面描述">
<meta itemprop="image" content="https://example.com/wechat-image.jpg">
```

## 🎨 网站图标

### Favicon设置

```html
<!-- 标准favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">

<!-- PNG格式图标（推荐） -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple设备图标 -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">

<!-- Android设备图标 -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">

<!-- Windows磁贴 -->
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<meta name="msapplication-config" content="/browserconfig.xml">

<!-- Web应用清单 -->
<link rel="manifest" href="/site.webmanifest">
```

### Web应用清单

```json
// site.webmanifest
{
    "name": "开发者指南",
    "short_name": "DevGuide",
    "description": "全面的开发者学习资源",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#007bff",
    "background_color": "#ffffff",
    "display": "standalone",
    "start_url": "/",
    "scope": "/"
}
```

## 🚀 性能优化

### 资源预加载

```html
<!-- DNS预解析 -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//api.example.com">
<link rel="dns-prefetch" href="//cdn.example.com">

<!-- 预连接 -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 资源预加载 -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">
<link rel="preload" href="/js/main.js" as="script">
<link rel="preload" href="/images/hero.jpg" as="image">

<!-- 资源预获取 -->
<link rel="prefetch" href="/css/non-critical.css">
<link rel="prefetch" href="/js/analytics.js">

<!-- 页面预渲染（谨慎使用） -->
<link rel="prerender" href="/next-page">
```

### HTTP头部设置

```html
<!-- 缓存控制 -->
<meta http-equiv="Cache-Control" content="max-age=3600">

<!-- 内容类型 -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 安全策略 -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'">

<!-- 强制HTTPS -->
<meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">

<!-- 防止MIME类型嗅探 -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">

<!-- XSS保护 -->
<meta http-equiv="X-XSS-Protection" content="1; mode=block">

<!-- 点击劫持保护 -->
<meta http-equiv="X-Frame-Options" content="DENY">
```

## 📊 SEO检查清单

### 技术SEO

```html
<!-- ✅ 检查项目 -->
<!-- 1. 页面标题唯一且描述性强 -->
<title>具体页面标题 - 网站名称</title>

<!-- 2. 元描述吸引人且长度适中（150-160字符） -->
<meta name="description" content="准确描述页面内容的元描述">

<!-- 3. 规范链接设置正确 -->
<link rel="canonical" href="https://example.com/current-page">

<!-- 4. 结构化数据标记 -->
<script type="application/ld+json">...</script>

<!-- 5. 移动端友好 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 6. 页面加载速度优化 -->
<link rel="preload" href="critical-resource" as="style">

<!-- 7. 图片alt属性 -->
<img src="image.jpg" alt="描述性文字">

<!-- 8. 内部链接结构合理 -->
<nav>
    <a href="/category1">分类1</a>
    <a href="/category2">分类2</a>
</nav>
```

### 内容SEO

```html
<!-- 标题层级结构 -->
<h1>页面主标题</h1>
<h2>主要章节</h2>
<h3>子章节</h3>

<!-- 语义化标签 -->
<article>
    <header>
        <h1>文章标题</h1>
        <time datetime="2024-01-15">2024年1月15日</time>
    </header>
    <main>
        <p>文章内容...</p>
    </main>
</article>

<!-- 面包屑导航 -->
<nav aria-label="面包屑">
    <ol>
        <li><a href="/">首页</a></li>
        <li><a href="/category">分类</a></li>
        <li aria-current="page">当前页面</li>
    </ol>
</nav>
```

正确设置HTML元信息是SEO成功的基础，它不仅能提升搜索引擎排名，还能改善用户体验和社交媒体分享效果。
