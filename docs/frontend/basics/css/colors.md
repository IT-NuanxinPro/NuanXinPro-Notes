# 颜色与背景

CSS颜色和背景是网页视觉设计的核心，掌握颜色系统和背景处理技术能够创建出美观、专业的网页界面。

## 🎨 颜色值表示

### 十六进制颜色

```css
/* 十六进制颜色 - 最常用的颜色表示方法 */
.hex-colors {
    color: #ff0000;        /* 红色 - 完整形式 */
    background: #f00;      /* 红色 - 简写形式 */
    border-color: #FF0000; /* 大小写不敏感 */
}

/* 带透明度的十六进制 */
.hex-alpha {
    background-color: #ff000080; /* 红色，50%透明度 */
    color: #00ff0040;            /* 绿色，25%透明度 */
}

/* 常用颜色值 */
.common-colors {
    color: #000000;    /* 黑色 #000 */
    background: #ffffff; /* 白色 #fff */
    border: 1px solid #cccccc; /* 浅灰 #ccc */
    box-shadow: 0 2px 4px #00000020; /* 黑色20%透明度 */
}
```

### RGB和RGBA颜色

```css
/* RGB颜色 */
.rgb-colors {
    color: rgb(255, 0, 0);        /* 红色 */
    background: rgb(0, 128, 255);  /* 蓝色 */
    border-color: rgb(34, 34, 34); /* 深灰色 */
}

/* RGBA颜色（带透明度） */
.rgba-colors {
    background: rgba(255, 0, 0, 0.5);    /* 红色，50%透明度 */
    color: rgba(0, 0, 0, 0.8);           /* 黑色，80%不透明度 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* 阴影 */
}

/* 动态透明度 */
.hover-effect {
    background: rgba(0, 123, 255, 0.1);
    transition: background-color 0.3s ease;
}

.hover-effect:hover {
    background: rgba(0, 123, 255, 0.2);
}
```

### HSL和HSLA颜色

```css
/* HSL颜色 - 色相、饱和度、亮度 */
.hsl-colors {
    color: hsl(0, 100%, 50%);      /* 红色 */
    background: hsl(240, 100%, 50%); /* 蓝色 */
    border-color: hsl(120, 100%, 25%); /* 深绿色 */
}

/* HSLA颜色（带透明度） */
.hsla-colors {
    background: hsla(200, 100%, 50%, 0.3); /* 天蓝色，30%透明度 */
    color: hsla(0, 0%, 0%, 0.9);            /* 黑色，90%不透明度 */
}

/* HSL的优势 - 易于调整 */
.color-variations {
    --base-hue: 200;
    --base-saturation: 80%;
    
    background: hsl(var(--base-hue), var(--base-saturation), 50%);
    border-top: 3px solid hsl(var(--base-hue), var(--base-saturation), 40%);
    color: hsl(var(--base-hue), var(--base-saturation), 20%);
}

/* 色相环应用 */
.complementary-colors {
    --primary-hue: 200;
    
    background: hsl(var(--primary-hue), 70%, 50%);
    color: hsl(calc(var(--primary-hue) + 180), 70%, 50%); /* 互补色 */
}
```

### 颜色关键字

```css
/* 基础颜色关键字 */
.keyword-colors {
    color: red;
    background: white;
    border: 1px solid black;
}

/* 扩展颜色关键字 */
.extended-keywords {
    color: crimson;
    background: lightblue;
    border-color: darkslategray;
}

/* 系统颜色 */
.system-colors {
    color: ButtonText;
    background: ButtonFace;
    border: 1px solid ButtonBorder;
}

/* 特殊关键字 */
.special-keywords {
    color: transparent;     /* 透明 */
    background: currentColor; /* 继承当前文字颜色 */
    border-color: inherit;   /* 继承父元素颜色 */
}
```

## 🖼️ 背景处理

### 背景颜色

```css
/* 基础背景颜色 */
.background-color {
    background-color: #f8f9fa;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4); /* 渐变背景 */
}

/* 多层背景 */
.layered-background {
    background: 
        rgba(255, 255, 255, 0.9),  /* 半透明白色覆盖层 */
        url('pattern.png'),         /* 图案 */
        linear-gradient(45deg, #667eea, #764ba2); /* 渐变底色 */
}
```

### 背景图片

```css
/* 基础背景图片 */
.background-image {
    background-image: url('background.jpg');
    background-size: cover;        /* 覆盖整个容器 */
    background-position: center;   /* 居中显示 */
    background-repeat: no-repeat;  /* 不重复 */
    background-attachment: fixed;  /* 固定背景 */
}

/* 背景图片简写 */
.background-shorthand {
    background: url('hero-bg.jpg') center/cover no-repeat fixed;
}

/* 响应式背景图片 */
.responsive-background {
    background-image: url('mobile-bg.jpg');
}

@media (min-width: 768px) {
    .responsive-background {
        background-image: url('desktop-bg.jpg');
    }
}

/* 高分辨率背景图片 */
.high-dpi-background {
    background-image: url('background.jpg');
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .high-dpi-background {
        background-image: url('background@2x.jpg');
        background-size: 100% 100%;
    }
}
```

### 背景尺寸和位置

```css
/* 背景尺寸 */
.background-size {
    background-image: url('image.jpg');
    
    /* 关键字值 */
    background-size: auto;     /* 原始尺寸 */
    background-size: cover;    /* 覆盖容器，可能裁剪 */
    background-size: contain;  /* 完整显示，可能留白 */
    
    /* 具体尺寸 */
    background-size: 100% 100%; /* 拉伸填满 */
    background-size: 300px 200px; /* 固定尺寸 */
    background-size: 50% auto;  /* 宽度50%，高度自动 */
}

/* 背景位置 */
.background-position {
    background-image: url('image.jpg');
    
    /* 关键字位置 */
    background-position: center;        /* 居中 */
    background-position: top left;      /* 左上角 */
    background-position: bottom right;  /* 右下角 */
    
    /* 精确位置 */
    background-position: 50% 50%;       /* 居中（百分比） */
    background-position: 20px 30px;     /* 距离左上角20px 30px */
    background-position: center 20%;    /* 水平居中，垂直20% */
}

/* 多背景图片 */
.multiple-backgrounds {
    background-image: 
        url('overlay.png'),
        url('texture.jpg'),
        url('background.jpg');
    background-position: 
        center,
        top left,
        center;
    background-size: 
        cover,
        100px 100px,
        cover;
    background-repeat: 
        no-repeat,
        repeat,
        no-repeat;
}
```

## 🌈 渐变背景

### 线性渐变

```css
/* 基础线性渐变 */
.linear-gradient {
    background: linear-gradient(to right, #ff6b6b, #4ecdc4);
    background: linear-gradient(45deg, #667eea, #764ba2);
    background: linear-gradient(180deg, #ff9a9e, #fecfef);
}

/* 多色渐变 */
.multi-color-gradient {
    background: linear-gradient(
        90deg,
        #ff6b6b 0%,
        #ffa726 25%,
        #4ecdc4 50%,
        #45b7d1 75%,
        #96ceb4 100%
    );
}

/* 渐变条纹 */
.gradient-stripes {
    background: linear-gradient(
        45deg,
        #ff6b6b 25%,
        transparent 25%,
        transparent 75%,
        #ff6b6b 75%
    );
    background-size: 20px 20px;
}

/* 文字渐变效果 */
.gradient-text {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    font-size: 2rem;
    font-weight: bold;
}
```

### 径向渐变

```css
/* 基础径向渐变 */
.radial-gradient {
    background: radial-gradient(circle, #ff6b6b, #4ecdc4);
    background: radial-gradient(ellipse, #667eea, #764ba2);
}

/* 指定位置的径向渐变 */
.positioned-radial {
    background: radial-gradient(
        circle at top left,
        #ff9a9e,
        #fecfef
    );
    
    background: radial-gradient(
        ellipse at center bottom,
        #a8edea,
        #fed6e3
    );
}

/* 指定大小的径向渐变 */
.sized-radial {
    background: radial-gradient(
        circle 100px at center,
        #ff6b6b,
        #4ecdc4
    );
    
    background: radial-gradient(
        ellipse 200px 100px at center,
        #667eea,
        #764ba2
    );
}

/* 聚光灯效果 */
.spotlight {
    background: radial-gradient(
        circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
    );
}
```

### 锥形渐变

```css
/* 锥形渐变（现代浏览器） */
.conic-gradient {
    background: conic-gradient(#ff6b6b, #4ecdc4, #ff6b6b);
    border-radius: 50%;
}

/* 彩虹色环 */
.rainbow-circle {
    background: conic-gradient(
        hsl(0, 100%, 50%),
        hsl(60, 100%, 50%),
        hsl(120, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(240, 100%, 50%),
        hsl(300, 100%, 50%),
        hsl(360, 100%, 50%)
    );
    border-radius: 50%;
    width: 200px;
    height: 200px;
}

/* 进度环 */
.progress-ring {
    background: conic-gradient(
        #4ecdc4 0deg 120deg,
        #e0e0e0 120deg 360deg
    );
    border-radius: 50%;
    position: relative;
}

.progress-ring::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    background: white;
    border-radius: 50%;
}
```

## 🎯 颜色系统设计

### CSS自定义属性颜色系统

```css
:root {
    /* 主色调 */
    --primary-50: #eff6ff;
    --primary-100: #dbeafe;
    --primary-200: #bfdbfe;
    --primary-300: #93c5fd;
    --primary-400: #60a5fa;
    --primary-500: #3b82f6;
    --primary-600: #2563eb;
    --primary-700: #1d4ed8;
    --primary-800: #1e40af;
    --primary-900: #1e3a8a;
    
    /* 语义化颜色 */
    --color-success: #10b981;
    --color-warning: #f59e0b;
    --color-error: #ef4444;
    --color-info: #3b82f6;
    
    /* 中性色 */
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    
    /* 背景色 */
    --bg-primary: var(--gray-50);
    --bg-secondary: var(--gray-100);
    --bg-tertiary: white;
    
    /* 文字颜色 */
    --text-primary: var(--gray-900);
    --text-secondary: var(--gray-600);
    --text-tertiary: var(--gray-400);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-primary: var(--gray-900);
        --bg-secondary: var(--gray-800);
        --bg-tertiary: var(--gray-700);
        
        --text-primary: var(--gray-50);
        --text-secondary: var(--gray-300);
        --text-tertiary: var(--gray-400);
    }
}

/* 使用颜色系统 */
.card {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--gray-200);
}

.button-primary {
    background-color: var(--primary-500);
    color: white;
}

.button-primary:hover {
    background-color: var(--primary-600);
}
```

### 动态颜色主题

```css
/* 主题切换系统 */
[data-theme="light"] {
    --bg-color: #ffffff;
    --text-color: #333333;
    --accent-color: #007bff;
}

[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
    --accent-color: #4dabf7;
}

[data-theme="blue"] {
    --bg-color: #e3f2fd;
    --text-color: #0d47a1;
    --accent-color: #1976d2;
}

/* 应用主题 */
body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.accent-element {
    background-color: var(--accent-color);
    color: white;
}
```

## 🚀 现代颜色特性

### 颜色函数和操作

```css
/* 颜色混合（现代浏览器） */
.color-mix {
    background: color-mix(in srgb, #ff6b6b 50%, #4ecdc4 50%);
}

/* 相对颜色语法（实验性） */
.relative-colors {
    --base-color: #3b82f6;
    
    /* 基于基础颜色创建变体 */
    background: hsl(from var(--base-color) h s calc(l * 0.8)); /* 更暗的版本 */
    border-color: hsl(from var(--base-color) h calc(s * 0.5) l); /* 饱和度减半 */
}

/* 颜色对比度 */
.high-contrast {
    background: Canvas;
    color: CanvasText;
    border: 1px solid ButtonBorder;
}

@media (prefers-contrast: high) {
    .high-contrast {
        border-width: 2px;
        font-weight: bold;
    }
}
```

### 实用的颜色工具类

```css
/* 颜色工具类系统 */
.bg-primary { background-color: var(--primary-500); }
.bg-secondary { background-color: var(--gray-500); }
.bg-success { background-color: var(--color-success); }
.bg-warning { background-color: var(--color-warning); }
.bg-error { background-color: var(--color-error); }

.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-tertiary); }

.border-primary { border-color: var(--primary-500); }
.border-gray { border-color: var(--gray-300); }

/* 透明度工具类 */
.bg-opacity-10 { background-color: rgba(var(--primary-rgb), 0.1); }
.bg-opacity-25 { background-color: rgba(var(--primary-rgb), 0.25); }
.bg-opacity-50 { background-color: rgba(var(--primary-rgb), 0.5); }
.bg-opacity-75 { background-color: rgba(var(--primary-rgb), 0.75); }

/* 悬停效果 */
.hover-bg-primary:hover { background-color: var(--primary-600); }
.hover-text-primary:hover { color: var(--primary-500); }
```
