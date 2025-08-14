# 文字与字体

CSS文字排版是网页设计的重要组成部分，良好的文字排版能够提升用户阅读体验和网页的专业性。

## 🔤 字体族（Font Family）

### 基础字体族

通用字体族为不同平台提供兜底渲染：衬线更传统正式，无衬线更现代清晰，等宽用于代码。系统字体 `system-ui` 可获得更快加载与更一致的系统感。

```css
/* 通用字体族 */
.serif-font {
    font-family: serif;        /* 衬线字体 */
}

.sans-serif-font {
    font-family: sans-serif;   /* 无衬线字体 */
}

.monospace-font {
    font-family: monospace;    /* 等宽字体 */
}

.cursive-font {
    font-family: cursive;      /* 草书字体 */
}

.fantasy-font {
    font-family: fantasy;      /* 装饰字体 */
}

/* 系统字体 */
.system-font {
    font-family: system-ui;    /* 系统默认字体 */
}
```

### 具体字体设置

合理的字体栈需要按“平台 → 中文 → 英文 → 回退”排序，确保在各系统都有良好替代。代码字体可选支持连字的方案（如 Fira Code）提升可读性。

```css
/* 英文字体栈 */
.english-fonts {
    font-family: 
        "Helvetica Neue", 
        Helvetica, 
        Arial, 
        sans-serif;
}

/* 中文字体栈 */
.chinese-fonts {
    font-family: 
        "PingFang SC",           /* macOS中文字体 */
        "Microsoft YaHei",       /* Windows中文字体 */
        "Source Han Sans SC",    /* 思源黑体 */
        "Noto Sans CJK SC",      /* Google Noto字体 */
        sans-serif;
}

/* 中英文混合字体栈 */
.mixed-fonts {
    font-family: 
        -apple-system,           /* macOS系统字体 */
        BlinkMacSystemFont,      /* macOS系统字体 */
        "Segoe UI",              /* Windows系统字体 */
        "PingFang SC",           /* macOS中文 */
        "Hiragino Sans GB",      /* macOS中文 */
        "Microsoft YaHei",       /* Windows中文 */
        "Helvetica Neue",        /* 英文后备 */
        Helvetica,
        Arial,
        sans-serif;
}

/* 代码字体 */
.code-fonts {
    font-family: 
        "Fira Code",             /* 支持连字的代码字体 */
        "JetBrains Mono",        /* JetBrains代码字体 */
        "Source Code Pro",       /* Adobe代码字体 */
        "SF Mono",               /* macOS代码字体 */
        Monaco,                  /* macOS等宽字体 */
        "Cascadia Code",         /* Windows Terminal字体 */
        "Roboto Mono",           /* Google代码字体 */
        Consolas,                /* Windows代码字体 */
        "Courier New",           /* 通用等宽字体 */
        monospace;
}
```

### Web字体加载

Web 字体需关注加载策略：`font-display: swap` 避免长时间空白；按 `woff2/woff/ttf` 降级；关键字体可 `preload`；Google Fonts 可快速接入但要评估网络与隐私策略。

```css
/* @font-face定义 */
@font-face {
    font-family: 'CustomFont';
    src: url('custom-font.woff2') format('woff2'),
         url('custom-font.woff') format('woff'),
         url('custom-font.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap; /* 字体加载策略 */
}

/* 使用自定义字体 */
.custom-font {
    font-family: 'CustomFont', sans-serif;
}

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.google-font {
    font-family: 'Inter', sans-serif;
}

/* 字体加载优化 */
.optimized-font {
    font-family: 'Inter', sans-serif;
    font-display: swap;
}

/* 预加载关键字体 */
/* 在HTML中：<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin> */
```

## 📏 字体大小（Font Size）

### 基础字体大小

字体大小有绝对与相对之分。布局与排版建议优先 `rem/em/%` 等相对单位，以获得更好的缩放与无障碍表现；`px` 更适合边框等像素级需求。

```css
/* 绝对单位 */
.absolute-sizes {
    font-size: 16px;    /* 像素 */
    font-size: 12pt;    /* 点（打印） */
}

/* 相对单位 */
.relative-sizes {
    font-size: 1em;     /* 相对于父元素 */
    font-size: 1.2rem;  /* 相对于根元素 */
    font-size: 120%;    /* 百分比 */
}

/* 关键字大小 */
.keyword-sizes {
    font-size: xx-small;
    font-size: x-small;
    font-size: small;
    font-size: medium;   /* 默认值 */
    font-size: large;
    font-size: x-large;
    font-size: xx-large;
}

/* 相对关键字 */
.relative-keywords {
    font-size: smaller; /* 比父元素小 */
    font-size: larger;  /* 比父元素大 */
}
```

### 响应式字体大小

响应式字体可用视口单位或 `clamp()` 实现无断点缩放；也可以分断点设置不同字号。推荐先用 `clamp()` 建立全局比例系统，再按需在关键断点微调。

```css
/* 视口单位 */
.viewport-font {
    font-size: 4vw;     /* 视口宽度的4% */
    font-size: 3vh;     /* 视口高度的3% */
    font-size: 2vmin;   /* 视口较小边的2% */
}

/* clamp()函数 - 推荐方法 */
.responsive-font {
    font-size: clamp(1rem, 4vw, 2rem);
    /* 最小1rem，首选4vw，最大2rem */
}

/* 媒体查询 */
.media-query-font {
    font-size: 14px;
}

@media (min-width: 768px) {
    .media-query-font {
        font-size: 16px;
    }
}

@media (min-width: 1024px) {
    .media-query-font {
        font-size: 18px;
    }
}

/* 字体大小系统 */
:root {
    --font-size-xs: clamp(0.75rem, 2vw, 0.875rem);
    --font-size-sm: clamp(0.875rem, 2.5vw, 1rem);
    --font-size-base: clamp(1rem, 3vw, 1.125rem);
    --font-size-lg: clamp(1.125rem, 3.5vw, 1.25rem);
    --font-size-xl: clamp(1.25rem, 4vw, 1.5rem);
    --font-size-2xl: clamp(1.5rem, 5vw, 2rem);
    --font-size-3xl: clamp(2rem, 6vw, 3rem);
}

.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
```

## 📐 行高（Line Height）

### 行高设置

行高推荐使用“无单位数值”，它相对于当前字体大小自动缩放，避免继承时的意外叠加。正文常用 1.5~1.8，标题更紧凑，说明文字略紧。

```css
/* 数值（推荐） */
.line-height-number {
    line-height: 1.5;    /* 字体大小的1.5倍 */
    line-height: 1.6;    /* 适合正文阅读 */
}

/* 长度单位 */
.line-height-length {
    line-height: 24px;   /* 固定行高 */
    line-height: 1.5em;  /* 相对单位 */
    line-height: 1.5rem; /* 相对根元素 */
}

/* 百分比 */
.line-height-percent {
    line-height: 150%;   /* 字体大小的150% */
}

/* 关键字 */
.line-height-keywords {
    line-height: normal; /* 浏览器默认 */
}
```

### 行高最佳实践

不同内容类型对应不同的行高策略：标题紧凑、正文舒适、说明适中、代码清晰；可用 `clamp()` 做响应式行高，并用单行居中技巧在固定高度容器中对齐。

```css
/* 不同内容的行高 */
.heading-line-height {
    line-height: 1.2;    /* 标题：紧凑 */
}

.body-line-height {
    line-height: 1.6;    /* 正文：舒适阅读 */
}

.caption-line-height {
    line-height: 1.4;    /* 说明文字：适中 */
}

.code-line-height {
    line-height: 1.5;    /* 代码：清晰 */
}

/* 响应式行高 */
.responsive-line-height {
    line-height: clamp(1.4, 1.2 + 0.5vw, 1.8);
}

/* 垂直居中技巧 */
.single-line-center {
    height: 50px;
    line-height: 50px;   /* 单行文字垂直居中 */
    text-align: center;
}
```

## 🎨 字体样式

### 字体粗细（Font Weight）

字体粗细既支持关键字也支持 100~900 的细分级别。若使用可变字体（Variable Font），可以获得更细腻的权重控制并减少字体文件数量。

```css
/* 数值粗细 */
.font-weights {
    font-weight: 100;    /* Thin */
    font-weight: 200;    /* Extra Light */
    font-weight: 300;    /* Light */
    font-weight: 400;    /* Normal/Regular */
    font-weight: 500;    /* Medium */
    font-weight: 600;    /* Semi Bold */
    font-weight: 700;    /* Bold */
    font-weight: 800;    /* Extra Bold */
    font-weight: 900;    /* Black */
}

/* 关键字粗细 */
.font-weight-keywords {
    font-weight: normal;  /* 400 */
    font-weight: bold;    /* 700 */
    font-weight: lighter; /* 比父元素轻 */
    font-weight: bolder;  /* 比父元素重 */
}

/* 可变字体粗细 */
.variable-font-weight {
    font-family: 'Inter', sans-serif;
    font-weight: 450;    /* 精确控制 */
}
```

### 字体样式（Font Style）

`italic` 与 `oblique` 在渲染方式上存在区别：`italic` 为真实斜体（需字体支持），`oblique` 为倾斜模拟。若字体不含真斜体，可用 `skew` 近似，但效果不如真斜体。

```css
.font-styles {
    font-style: normal;   /* 正常 */
    font-style: italic;   /* 斜体 */
    font-style: oblique;  /* 倾斜 */
    font-style: oblique 15deg; /* 指定倾斜角度 */
}

/* 伪斜体 vs 真斜体 */
.fake-italic {
    transform: skew(-15deg); /* 伪斜体 */
}

.true-italic {
    font-style: italic;      /* 真斜体（如果字体支持） */
}
```

### 字体变体

通过 `font-variant` 与 OpenType 特性可以控制小型大写、数字样式、连字等印刷细节，常用于文章编号、数据表格对齐（等宽数字）与品牌排版增强。

```css
/* 小型大写字母 */
.small-caps {
    font-variant: small-caps;
}

/* 数字样式 */
.number-styles {
    font-variant-numeric: oldstyle-nums;    /* 旧式数字 */
    font-variant-numeric: lining-nums;      /* 等高数字 */
    font-variant-numeric: tabular-nums;     /* 等宽数字 */
    font-variant-numeric: proportional-nums; /* 比例数字 */
}

/* OpenType特性 */
.opentype-features {
    font-feature-settings: "liga" 1;        /* 连字 */
    font-feature-settings: "kern" 1;        /* 字距调整 */
    font-feature-settings: "swsh" 1;        /* 花体 */
}
```

## 📝 文本属性

### 文本对齐

文本对齐除了常见的左/中/右外，还可以用逻辑属性 `start/end` 适配 RTL 语言；`text-align-last` 可微调最后一行的对齐方式，用于标题或说明文字的视觉优化。

```css
.text-alignment {
    text-align: left;     /* 左对齐 */
    text-align: right;    /* 右对齐 */
    text-align: center;   /* 居中 */
    text-align: justify;  /* 两端对齐 */
    text-align: start;    /* 逻辑开始（支持RTL） */
    text-align: end;      /* 逻辑结束（支持RTL） */
}

/* 最后一行对齐 */
.text-align-last {
    text-align: justify;
    text-align-last: center; /* 最后一行居中 */
}
```

### 文本装饰

`text-decoration` 既可拆分为线型/颜色/样式/粗细，也可用简写一把梭。链接常用“无下划线 + 悬停淡入”或“下划线 + 悬停去下划线”的动态视觉反馈。

```css
/* 文本装饰线 */
.text-decorations {
    text-decoration: none;           /* 无装饰 */
    text-decoration: underline;      /* 下划线 */
    text-decoration: overline;       /* 上划线 */
    text-decoration: line-through;   /* 删除线 */
}

/* 详细装饰控制 */
.detailed-decoration {
    text-decoration-line: underline;
    text-decoration-color: red;
    text-decoration-style: wavy;     /* solid | double | dotted | dashed | wavy */
    text-decoration-thickness: 2px;
}

/* 简写 */
.decoration-shorthand {
    text-decoration: underline wavy red 2px;
}

/* 链接装饰 */
a {
    text-decoration: none;
    border-bottom: 1px solid currentColor;
    transition: border-color 0.3s ease;
}

a:hover {
    border-bottom-color: transparent;
}
```

### 文本变换

大小写变换可用于标题统一风格或标签展示。注意中文通常不需要大小写转换；对于英文缩写，`capitalize` 可能并非期望的语义。

```css
.text-transforms {
    text-transform: none;        /* 无变换 */
    text-transform: uppercase;   /* 大写 */
    text-transform: lowercase;   /* 小写 */
    text-transform: capitalize;  /* 首字母大写 */
}

/* 全角/半角转换（实验性） */
.text-transform-fullwidth {
    text-transform: full-width;  /* 转为全角 */
}
```

### 文本缩进和间距

首行缩进常用于中文排版；字符与单词间距能微调视觉密度。过大的负字距会影响可读性；在品牌标题中可适当使用以获取紧凑视觉。

```css
/* 文本缩进 */
.text-indent {
    text-indent: 2em;        /* 首行缩进2个字符 */
    text-indent: 10%;        /* 容器宽度的10% */
    text-indent: hanging 2em; /* 悬挂缩进 */
}

/* 字符间距 */
.letter-spacing {
    letter-spacing: normal;   /* 默认 */
    letter-spacing: 0.1em;    /* 增加间距 */
    letter-spacing: -0.05em;  /* 减少间距 */
}

/* 单词间距 */
.word-spacing {
    word-spacing: normal;     /* 默认 */
    word-spacing: 0.2em;      /* 增加单词间距 */
}
```

## 🔧 文本处理

### 文本溢出

```css
/* 单行文本溢出 */
.text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 多行文本溢出 */
.multiline-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 现代多行省略（支持度有限） */
.modern-multiline-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
}
```

### 空白处理

```css
.white-space-handling {
    white-space: normal;     /* 默认：合并空白，自动换行 */
    white-space: nowrap;     /* 不换行 */
    white-space: pre;        /* 保留空白，不自动换行 */
    white-space: pre-wrap;   /* 保留空白，自动换行 */
    white-space: pre-line;   /* 合并空白，保留换行 */
    white-space: break-spaces; /* 保留空白，在空格处换行 */
}

/* 换行控制 */
.word-break {
    word-break: normal;      /* 默认换行规则 */
    word-break: break-all;   /* 任意字符间换行 */
    word-break: keep-all;    /* 只在空格或连字符处换行 */
}

.overflow-wrap {
    overflow-wrap: normal;   /* 默认 */
    overflow-wrap: break-word; /* 长单词换行 */
    overflow-wrap: anywhere; /* 任意位置换行 */
}
```

## 🎯 排版最佳实践

### 可读性优化

```css
/* 最佳阅读体验 */
.readable-text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: clamp(1rem, 2.5vw, 1.125rem);
    line-height: 1.6;
    color: #333;
    max-width: 65ch; /* 每行最多65个字符 */
    margin: 0 auto;
}

/* 标题层级 */
h1 { font-size: 2.5rem; line-height: 1.2; font-weight: 700; }
h2 { font-size: 2rem;   line-height: 1.3; font-weight: 600; }
h3 { font-size: 1.5rem; line-height: 1.4; font-weight: 600; }
h4 { font-size: 1.25rem; line-height: 1.4; font-weight: 500; }
h5 { font-size: 1.125rem; line-height: 1.5; font-weight: 500; }
h6 { font-size: 1rem;   line-height: 1.5; font-weight: 500; }

/* 段落间距 */
p {
    margin-bottom: 1.5em;
    line-height: 1.6;
}

p:last-child {
    margin-bottom: 0;
}
```

### 响应式排版系统

```css
/* 排版比例系统 */
:root {
    --ratio: 1.25; /* 大调四度 */
    
    --font-size-1: 1rem;
    --font-size-2: calc(var(--font-size-1) * var(--ratio));
    --font-size-3: calc(var(--font-size-2) * var(--ratio));
    --font-size-4: calc(var(--font-size-3) * var(--ratio));
    --font-size-5: calc(var(--font-size-4) * var(--ratio));
    
    --space-1: 0.5rem;
    --space-2: 1rem;
    --space-3: 1.5rem;
    --space-4: 2rem;
    --space-5: 3rem;
}

/* 使用系统 */
.heading-1 { font-size: var(--font-size-5); margin-bottom: var(--space-3); }
.heading-2 { font-size: var(--font-size-4); margin-bottom: var(--space-2); }
.heading-3 { font-size: var(--font-size-3); margin-bottom: var(--space-2); }

.body-text { font-size: var(--font-size-1); margin-bottom: var(--space-2); }
.small-text { font-size: calc(var(--font-size-1) / var(--ratio)); }
```

掌握CSS文字排版技术，能够创建出易读、美观、专业的网页内容。良好的排版不仅提升用户体验，也体现了设计的专业水准。
