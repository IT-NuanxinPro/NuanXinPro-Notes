# 响应式与适配

响应式设计是现代Web开发的核心技能，它确保网页在各种设备和屏幕尺寸上都能提供良好的用户体验。

## 📱 视口设置

### 基础视口配置

响应式的第一步是设置正确的视口（viewport）。`width=device-width` 让 CSS 像素与设备宽度对应；`initial-scale` 控制默认缩放；`viewport-fit=cover` 适配刘海屏安全区域。

```html
<!-- 必需的视口meta标签 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 详细视口配置 -->
<meta name="viewport" content="
    width=device-width,
    initial-scale=1.0,
    maximum-scale=5.0,
    minimum-scale=1.0,
    user-scalable=yes,
    viewport-fit=cover
">
```

### 视口单位应用

视口单位 `vw/vh/vmin/vmax` 让尺寸随屏幕变化，适合做全屏容器、响应式字体与间距。现代浏览器还支持 `dvh/lvh/svh` 以解决移动端地址栏出现/隐藏导致的高度跳变问题。

```css
/* 视口单位 */
.viewport-units {
    width: 100vw;        /* 视口宽度 */
    height: 100vh;       /* 视口高度 */
    font-size: 4vw;      /* 响应式字体 */
    padding: 2vh 2vw;    /* 响应式内边距 */
}

/* 安全区域适配（iPhone X等） */
.safe-area {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
}

/* 动态视口单位（现代浏览器） */
.dynamic-viewport {
    height: 100dvh;      /* 动态视口高度 */
    width: 100dvw;       /* 动态视口宽度 */
}

.large-viewport {
    height: 100lvh;      /* 大视口高度 */
    width: 100lvw;       /* 大视口宽度 */
}

.small-viewport {
    height: 100svh;      /* 小视口高度 */
    width: 100svw;       /* 小视口宽度 */
}
```

## 📐 媒体查询

### 基础媒体查询

媒体查询根据设备特征（宽度、方向、分辨率、交互能力等）切换样式。移动端优先写法通常从最小宽度逐步增强；也可针对具体区间做覆盖。

```css
/* 屏幕宽度查询 */
@media (max-width: 768px) {
    /* 移动端样式 */
    .mobile-only {
        display: block;
    }
}

@media (min-width: 769px) {
    /* 桌面端样式 */
    .desktop-only {
        display: block;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {
    /* 平板端样式 */
    .tablet-only {
        display: block;
    }
}
```

### 常用断点系统

这里给出一套参考断点，覆盖手机/平板/桌面及更大屏幕。结合容器最大宽度与自适应网格，保证在不同尺寸下的合理密度与可读性。

```css
/* 移动端优先的断点系统 */
/* 超小屏幕（手机，小于576px） */
@media (max-width: 575.98px) {
    .container {
        max-width: 100%;
        padding: 0 15px;
    }
}

/* 小屏幕（手机，576px及以上） */
@media (min-width: 576px) {
    .container {
        max-width: 540px;
    }
}

/* 中等屏幕（平板，768px及以上） */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
    
    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}

/* 大屏幕（桌面，992px及以上） */
@media (min-width: 992px) {
    .container {
        max-width: 960px;
    }
    
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* 超大屏幕（大桌面，1200px及以上） */
@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
    
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* 超超大屏幕（1400px及以上） */
@media (min-width: 1400px) {
    .container {
        max-width: 1320px;
    }
}
```

### 高级媒体查询

除宽度外，还可按方向（横/竖屏）、像素密度（Retina）、悬停与指针精度、用户偏好（深色模式、减少动效、高对比度）进行更细粒度的适配。

```css
/* 设备方向 */
@media (orientation: portrait) {
    /* 竖屏样式 */
    .portrait-layout {
        flex-direction: column;
    }
}

@media (orientation: landscape) {
    /* 横屏样式 */
    .landscape-layout {
        flex-direction: row;
    }
}

/* 像素密度 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    /* 高分辨率屏幕 */
    .high-dpi-image {
        background-image: url('image@2x.jpg');
        background-size: 100% 100%;
    }
}

/* 悬停能力 */
@media (hover: hover) {
    /* 支持悬停的设备 */
    .hover-effect:hover {
        background-color: #f0f0f0;
    }
}

@media (hover: none) {
    /* 不支持悬停的设备（触摸屏） */
    .touch-friendly {
        padding: 15px; /* 更大的触摸区域 */
    }
}

/* 指针精度 */
@media (pointer: coarse) {
    /* 粗糙指针（手指） */
    .touch-target {
        min-height: 44px;
        min-width: 44px;
    }
}

@media (pointer: fine) {
    /* 精确指针（鼠标） */
    .precise-control {
        font-size: 14px;
    }
}

/* 用户偏好 */
@media (prefers-color-scheme: dark) {
    /* 深色模式 */
    :root {
        --bg-color: #1a1a1a;
        --text-color: #ffffff;
    }
}

@media (prefers-reduced-motion: reduce) {
    /* 减少动画 */
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

@media (prefers-contrast: high) {
    /* 高对比度 */
    .high-contrast {
        border: 2px solid;
        font-weight: bold;
    }
}
```

## 🔧 响应式布局技术

### Flexbox响应式

Flex 在响应式中主要承担“一维自适应分布”的角色。通过 `flex-wrap` 与合理的 `flex-basis`/`min-width` 约束，可实现按容器宽度自然换行与对齐的栅格效果。

```css
/* 响应式Flex布局 */
.flex-responsive {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.flex-item {
    flex: 1 1 300px; /* 最小宽度300px */
    min-width: 0; /* 防止内容溢出 */
}

/* 响应式导航 */
.nav-responsive {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.nav-menu {
    display: flex;
    gap: 2rem;
    list-style: none;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none; /* 移动端隐藏，可配合JavaScript实现汉堡菜单 */
    }
    
    .nav-toggle {
        display: block;
    }
}

@media (min-width: 769px) {
    .nav-toggle {
        display: none;
    }
}
```

### Grid响应式

Grid 可按轨道自动填充与命名区域组成复杂布局，并在小屏降级为单列。`auto-fit/auto-fill + minmax()` 能在不写断点的情况下获得良好的自适应行为。

```css
/* 响应式Grid布局 */
.grid-responsive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

/* 复杂Grid布局 */
.complex-grid {
    display: grid;
    grid-template-areas: 
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 20px;
}

@media (max-width: 768px) {
    .complex-grid {
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "footer";
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto auto;
    }
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

### 容器查询（现代浏览器）

容器查询可依据“组件容器”的尺寸而非“视口”调整样式，更适合组件化设计。启用 `container-type/name` 后，使用 `@container` 针对容器宽度定制布局。

```css
/* 容器查询 */
.card-container {
    container-type: inline-size;
    container-name: card;
}

.card {
    padding: 1rem;
    background: white;
    border-radius: 8px;
}

/* 基于容器尺寸的样式 */
@container card (min-width: 400px) {
    .card {
        display: flex;
        gap: 1rem;
    }
    
    .card-image {
        flex: 0 0 150px;
    }
    
    .card-content {
        flex: 1;
    }
}

@container card (max-width: 399px) {
    .card {
        text-align: center;
    }
    
    .card-image {
        width: 100%;
        margin-bottom: 1rem;
    }
}
```

## 🖼️ 响应式图片

### 基础响应式图片

使用 `srcset/sizes` 让浏览器根据屏幕宽度与像素密度选择最合适的图片资源；`picture` 可按断点与格式提供多源方案（如 WebP 优先，回退 JPEG）。

```html
<!-- 响应式图片 -->
<img src="small.jpg" 
     srcset="small.jpg 300w, 
             medium.jpg 600w, 
             large.jpg 1200w"
     sizes="(max-width: 600px) 300px,
            (max-width: 1200px) 600px,
            1200px"
     alt="响应式图片">

<!-- picture元素 -->
<picture>
    <source media="(min-width: 800px)" srcset="desktop.webp" type="image/webp">
    <source media="(min-width: 800px)" srcset="desktop.jpg">
    <source media="(min-width: 400px)" srcset="tablet.webp" type="image/webp">
    <source media="(min-width: 400px)" srcset="tablet.jpg">
    <img src="mobile.jpg" alt="响应式图片">
</picture>
```

### CSS响应式图片

通过 `max-width: 100%` 实现图片在容器内缩放；背景图用媒体查询切换资源；`aspect-ratio` 或占位 `padding` 技巧可以保持固定宽高比，避免布局跳动。

```css
/* 响应式图片基础 */
.responsive-image {
    max-width: 100%;
    height: auto;
    display: block;
}

/* 响应式背景图片 */
.responsive-bg {
    background-image: url('mobile-bg.jpg');
    background-size: cover;
    background-position: center;
    min-height: 300px;
}

@media (min-width: 768px) {
    .responsive-bg {
        background-image: url('tablet-bg.jpg');
        min-height: 400px;
    }
}

@media (min-width: 1200px) {
    .responsive-bg {
        background-image: url('desktop-bg.jpg');
        min-height: 500px;
    }
}

/* 宽高比保持 */
.aspect-ratio {
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

/* 兼容性方案 */
.aspect-ratio-fallback {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 = 9/16 = 0.5625 */
}

.aspect-ratio-fallback img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

## 📝 响应式文字

### 流体排版

排版同样需要响应式：`clamp()` 可在不同屏幕范围内控制字体和行高；限制行宽（如 `65ch`）有助于保持良好可读性；间距也可用 `clamp()` 适配。

```css
/* 流体字体大小 */
.fluid-typography {
    font-size: clamp(1rem, 4vw, 2rem);
    line-height: clamp(1.4, 1.2 + 0.5vw, 1.8);
}

/* 响应式标题系统 */
h1 { font-size: clamp(1.75rem, 5vw, 3rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 3vw, 2rem); }
h4 { font-size: clamp(1.125rem, 2.5vw, 1.5rem); }
h5 { font-size: clamp(1rem, 2vw, 1.25rem); }
h6 { font-size: clamp(0.875rem, 1.5vw, 1rem); }

/* 响应式间距 */
.responsive-spacing {
    margin: clamp(1rem, 4vw, 3rem) 0;
    padding: clamp(1rem, 4vw, 2rem);
}

/* 响应式行宽 */
.readable-text {
    max-width: min(65ch, 90vw);
    margin: 0 auto;
}
```

## 🎯 移动端优化

### 触摸友好设计

移动端交互强调可点性：触摸目标至少 44×44px；表单字体设置为 16px 避免 iOS 自动缩放；抽屉导航通过切换状态类控制显隐与遮罩层。

```css
/* 触摸目标大小 */
.touch-target {
    min-height: 44px;
    min-width: 44px;
    padding: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* 移动端表单优化 */
.mobile-form input,
.mobile-form select,
.mobile-form textarea {
    font-size: 16px; /* 防止iOS缩放 */
    padding: 12px;
    border-radius: 8px;
}

/* 移动端导航 */
.mobile-nav {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    background: white;
    transition: left 0.3s ease;
    z-index: 1000;
}

.mobile-nav.is-open {
    left: 0;
}

.mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
}

.mobile-overlay.is-active {
    opacity: 1;
    visibility: visible;
}
```

### 性能优化

在移动端，减少重排重绘至关重要：优先 `transform/opacity`；对长列表与复杂内容使用懒加载与 `contain` 隔离影响范围；关键 CSS 内联优化首屏。

```css
/* 减少重绘和重排 */
.optimized-animation {
    transform: translateZ(0); /* 启用硬件加速 */
    will-change: transform, opacity;
}

/* 图片懒加载样式 */
.lazy-image {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy-image.loaded {
    opacity: 1;
}

/* 关键CSS内联，非关键CSS异步加载 */
.above-fold {
    /* 首屏关键样式 */
}

/* 使用CSS containment */
.contained-component {
    contain: layout style paint;
}
```

## 🚀 现代响应式技术

### CSS自定义属性响应式

使用 CSS 变量集中表达设计决策（间距、字体比例、容器内边距等），再通过媒体查询调整变量值，实现“样式不变、主题随尺寸自适应”的能力。

```css
/* 响应式设计系统 */
:root {
    --container-padding: 1rem;
    --grid-gap: 1rem;
    --font-scale: 1;
}

@media (min-width: 768px) {
    :root {
        --container-padding: 2rem;
        --grid-gap: 2rem;
        --font-scale: 1.125;
    }
}

@media (min-width: 1200px) {
    :root {
        --container-padding: 3rem;
        --grid-gap: 3rem;
        --font-scale: 1.25;
    }
}

.container {
    padding: var(--container-padding);
}

.grid {
    gap: var(--grid-gap);
}

.scaled-text {
    font-size: calc(1rem * var(--font-scale));
}
```

### 实用工具类

在设计系统中沉淀常用的显示/隐藏与文本对齐工具类，结合断点前缀可快速在模板内表达响应式显隐与排版规则，保持一致性与效率。

```css
/* 显示/隐藏工具类 */
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
.d-grid { display: grid; }

@media (max-width: 575.98px) {
    .d-xs-none { display: none; }
    .d-xs-block { display: block; }
}

@media (min-width: 576px) and (max-width: 767.98px) {
    .d-sm-none { display: none; }
    .d-sm-block { display: block; }
}

@media (min-width: 768px) and (max-width: 991.98px) {
    .d-md-none { display: none; }
    .d-md-block { display: block; }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
    .d-lg-none { display: none; }
    .d-lg-block { display: block; }
}

@media (min-width: 1200px) {
    .d-xl-none { display: none; }
    .d-xl-block { display: block; }
}

/* 文本对齐工具类 */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

@media (max-width: 767.98px) {
    .text-sm-center { text-align: center; }
    .text-sm-left { text-align: left; }
}
```

掌握响应式设计技术，能够创建出在各种设备上都表现优秀的网页应用。现代响应式设计不仅要考虑屏幕尺寸，还要考虑用户偏好、设备能力和性能优化。
