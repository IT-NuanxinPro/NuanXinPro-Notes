# 单位与尺寸

CSS单位系统是控制元素尺寸和间距的基础，理解不同单位的特点和使用场景是创建响应式设计的关键。

## 📏 绝对单位

### 像素单位（px）

```css
/* 像素 - 最常用的绝对单位 */
.pixel-example {
    width: 300px;
    height: 200px;
    font-size: 16px;
    margin: 10px;
    border: 1px solid #ccc;
}

/* 高分辨率屏幕适配 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .high-dpi-element {
        border-width: 0.5px; /* 在高分辨率屏幕上显示更细的边框 */
    }
}

/* 像素的优缺点 */
.pros-cons {
    /* 优点：精确控制，跨浏览器一致 */
    width: 320px; /* 在所有设备上都是320px */
    
    /* 缺点：不够灵活，不适合响应式设计 */
    font-size: 14px; /* 用户无法通过浏览器设置调整 */
}
```

### 其他绝对单位

```css
/* 点 - 主要用于打印 */
.print-text {
    font-size: 12pt; /* 1pt = 1/72英寸 */
}

/* 英寸 - 打印媒体 */
@media print {
    .print-margin {
        margin: 1in; /* 1英寸边距 */
    }
}

/* 厘米和毫米 - 打印媒体 */
.print-size {
    width: 21cm;   /* A4纸宽度 */
    height: 29.7cm; /* A4纸高度 */
}

/* 派卡 - 印刷单位 */
.typography {
    font-size: 1pc; /* 1pc = 12pt */
}
```

## 📐 相对单位

### em单位

```css
/* em - 相对于父元素的字体大小 */
.parent {
    font-size: 16px;
}

.child {
    font-size: 1.2em;    /* 16px * 1.2 = 19.2px */
    margin: 0.5em;       /* 19.2px * 0.5 = 9.6px */
    padding: 1em 1.5em;  /* 19.2px 28.8px */
}

/* em的复合效应 */
.level1 {
    font-size: 16px;
}

.level2 {
    font-size: 1.2em; /* 16px * 1.2 = 19.2px */
}

.level3 {
    font-size: 1.2em; /* 19.2px * 1.2 = 23.04px */
}

/* em的实际应用 */
.button {
    font-size: 1rem;
    padding: 0.5em 1em; /* 相对于按钮自身的字体大小 */
    border-radius: 0.25em;
}

.button-large {
    font-size: 1.25rem;
    /* padding会自动按比例放大 */
}
```

### rem单位

```css
/* rem - 相对于根元素的字体大小 */
html {
    font-size: 16px; /* 根字体大小 */
}

.rem-example {
    font-size: 1.5rem;   /* 16px * 1.5 = 24px */
    margin: 2rem;        /* 16px * 2 = 32px */
    padding: 1rem 1.5rem; /* 16px 24px */
}

/* rem的优势 - 可预测的尺寸 */
.card {
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
}

.card-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
}

.card-text {
    font-size: 1rem;
    line-height: 1.5;
}

/* 响应式字体大小 */
html {
    font-size: 14px;
}

@media (min-width: 768px) {
    html {
        font-size: 16px; /* 所有rem单位会自动缩放 */
    }
}

@media (min-width: 1024px) {
    html {
        font-size: 18px;
    }
}
```

### 百分比单位

```css
/* 百分比 - 相对于父元素 */
.container {
    width: 1000px;
    height: 600px;
}

.percentage-child {
    width: 50%;      /* 500px (父元素宽度的50%) */
    height: 75%;     /* 450px (父元素高度的75%) */
    margin: 5%;      /* 50px (父元素宽度的5%) */
    padding: 2% 3%;  /* 12px 30px (高度的2%, 宽度的3%) */
}

/* 百分比的特殊情况 */
.special-cases {
    /* margin和padding的百分比都相对于父元素的宽度 */
    margin-top: 10%;    /* 相对于父元素宽度，不是高度 */
    padding-bottom: 5%; /* 相对于父元素宽度，不是高度 */
}

/* 响应式布局中的百分比 */
.responsive-grid {
    display: flex;
    flex-wrap: wrap;
}

.grid-item {
    width: 100%;     /* 移动端全宽 */
    padding: 15px;
}

@media (min-width: 768px) {
    .grid-item {
        width: 50%;  /* 平板端两列 */
    }
}

@media (min-width: 1024px) {
    .grid-item {
        width: 33.333%; /* 桌面端三列 */
    }
}
```

## 📱 视口单位

### 基础视口单位

```css
/* vw - 视口宽度的百分比 */
.vw-example {
    width: 50vw;        /* 视口宽度的50% */
    font-size: 4vw;     /* 响应式字体 */
    margin: 2vw;        /* 响应式间距 */
}

/* vh - 视口高度的百分比 */
.vh-example {
    height: 100vh;      /* 全屏高度 */
    min-height: 50vh;   /* 最小高度为视口的50% */
}

/* vmin - 视口较小边的百分比 */
.vmin-example {
    width: 80vmin;      /* 在竖屏时相对于宽度，横屏时相对于高度 */
    height: 80vmin;     /* 保持正方形 */
    font-size: 5vmin;   /* 在任何方向都保持合适大小 */
}

/* vmax - 视口较大边的百分比 */
.vmax-example {
    font-size: 3vmax;   /* 相对于视口的较大边 */
}
```

### 视口单位的实际应用

```css
/* 全屏英雄区域 */
.hero-section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
}

.hero-title {
    font-size: clamp(2rem, 8vw, 6rem); /* 响应式标题 */
    text-align: center;
    color: white;
}

/* 响应式间距 */
.section {
    padding: 5vh 5vw; /* 垂直和水平间距都响应式 */
}

/* 固定宽高比的容器 */
.aspect-ratio-container {
    width: 90vw;
    height: 50.625vw; /* 16:9宽高比 (9/16 * 90) */
    max-height: 90vh;
    max-width: 160vh; /* 保持宽高比 (16/9 * 90) */
}

/* 响应式字体 */
.responsive-text {
    font-size: clamp(1rem, 4vw, 2.5rem);
    line-height: 1.4;
}
```

## 🧮 CSS函数

### calc()函数

```css
/* calc() - 动态计算 */
.calc-example {
    /* 混合单位计算 */
    width: calc(100% - 40px);
    height: calc(100vh - 80px);
    
    /* 复杂计算 */
    margin: calc(2rem + 10px);
    padding: calc(1em * 1.5);
    
    /* 响应式设计中的应用 */
    font-size: calc(1rem + 0.5vw);
}

/* 实际应用场景 */
.sidebar-layout {
    display: flex;
}

.sidebar {
    width: 250px;
    background-color: #f8f9fa;
}

.main-content {
    width: calc(100% - 250px); /* 剩余宽度 */
    padding: 20px;
}

/* 网格间距计算 */
.grid-item {
    width: calc((100% - 60px) / 4); /* 4列网格，间距20px */
    margin-right: 20px;
}

.grid-item:nth-child(4n) {
    margin-right: 0; /* 每行最后一个不要右边距 */
}
```

### min()、max()、clamp()函数

```css
/* min() - 取最小值 */
.min-example {
    width: min(500px, 100%);     /* 不超过500px，也不超过100% */
    font-size: min(5vw, 2rem);   /* 响应式但有上限 */
}

/* max() - 取最大值 */
.max-example {
    width: max(300px, 50%);      /* 至少300px，或者50% */
    font-size: max(1rem, 3vw);   /* 响应式但有下限 */
}

/* clamp() - 限制在范围内 */
.clamp-example {
    /* clamp(最小值, 首选值, 最大值) */
    font-size: clamp(1rem, 4vw, 2rem);
    width: clamp(300px, 50%, 800px);
    padding: clamp(1rem, 5vw, 3rem);
}

/* 实际应用 */
.responsive-container {
    width: clamp(320px, 90%, 1200px);
    margin: 0 auto;
    padding: clamp(1rem, 4vw, 2rem);
}

.fluid-typography {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    line-height: clamp(1.4, 1.2 + 0.5vw, 1.6);
}

/* 响应式间距系统 */
.spacing-system {
    --space-xs: clamp(0.25rem, 1vw, 0.5rem);
    --space-sm: clamp(0.5rem, 2vw, 1rem);
    --space-md: clamp(1rem, 4vw, 2rem);
    --space-lg: clamp(1.5rem, 6vw, 3rem);
    --space-xl: clamp(2rem, 8vw, 4rem);
}

.component {
    padding: var(--space-md);
    margin-bottom: var(--space-lg);
}
```

## 🎯 单位选择指南

### 何时使用不同单位

```css
/* 字体大小 */
.font-sizes {
    /* 基础字体 - rem */
    font-size: 1rem;
    
    /* 相对于当前字体的元素 - em */
    padding: 0.5em 1em;
    
    /* 响应式字体 - clamp + vw */
    font-size: clamp(1rem, 4vw, 2rem);
}

/* 布局尺寸 */
.layout-sizes {
    /* 固定尺寸 - px */
    border-width: 1px;
    
    /* 相对尺寸 - % */
    width: 100%;
    
    /* 视口相关 - vw/vh */
    height: 100vh;
    
    /* 混合计算 - calc */
    width: calc(100% - 40px);
}

/* 间距 */
.spacing {
    /* 小间距 - px */
    border-radius: 4px;
    
    /* 中等间距 - rem */
    margin: 1rem;
    
    /* 大间距 - vw/vh */
    padding: 5vh 5vw;
    
    /* 响应式间距 - clamp */
    gap: clamp(1rem, 4vw, 2rem);
}
```

## 🚀 现代单位最佳实践

### 响应式设计系统

```css
/* CSS自定义属性 + 现代单位 */
:root {
    /* 基础尺寸 */
    --base-font-size: clamp(1rem, 2.5vw, 1.125rem);
    --base-line-height: 1.5;
    
    /* 间距系统 */
    --space-3xs: clamp(0.25rem, 0.5vw, 0.375rem);
    --space-2xs: clamp(0.375rem, 0.75vw, 0.5rem);
    --space-xs: clamp(0.5rem, 1vw, 0.75rem);
    --space-sm: clamp(0.75rem, 1.5vw, 1rem);
    --space-md: clamp(1rem, 2vw, 1.5rem);
    --space-lg: clamp(1.5rem, 3vw, 2rem);
    --space-xl: clamp(2rem, 4vw, 3rem);
    --space-2xl: clamp(3rem, 6vw, 4rem);
    --space-3xl: clamp(4rem, 8vw, 6rem);
    
    /* 容器尺寸 */
    --container-sm: min(100% - 2rem, 640px);
    --container-md: min(100% - 2rem, 768px);
    --container-lg: min(100% - 2rem, 1024px);
    --container-xl: min(100% - 2rem, 1280px);
}

/* 使用系统 */
.container {
    width: var(--container-lg);
    margin: 0 auto;
    padding: var(--space-md);
}

.section {
    margin-bottom: var(--space-xl);
}

.card {
    padding: var(--space-lg);
    border-radius: var(--space-xs);
    margin-bottom: var(--space-md);
}
```

### 容器查询单位（现代浏览器）

```css
/* 容器查询单位 */
.card-container {
    container-type: inline-size;
}

.card {
    padding: 1rem;
    font-size: 1rem;
}

/* 基于容器尺寸的单位 */
@container (min-width: 400px) {
    .card {
        padding: 5cqw; /* 容器宽度的5% */
        font-size: 4cqw;
    }
}

/* cqw, cqh, cqi, cqb, cqmin, cqmax */
.responsive-element {
    width: 80cqw;    /* 容器宽度的80% */
    height: 50cqh;   /* 容器高度的50% */
    font-size: 3cqmin; /* 容器较小边的3% */
}
```

理解和正确使用CSS单位是创建响应式、可维护网页的基础。现代Web开发推荐使用相对单位和CSS函数来创建更灵活的设计系统。
