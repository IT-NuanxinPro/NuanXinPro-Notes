# 动画与过渡

CSS动画和过渡效果能够为网页添加生动的交互体验，掌握这些技术可以创建出流畅、吸引人的用户界面。

## 🔄 CSS过渡（Transition）

### 基础过渡

在为元素添加过渡效果时，需要明确“哪些属性发生变化”“变化持续多久”“以何种节奏变化”“是否有延迟”。本示例展示了单属性与多属性过渡、以及 `all` 的用法。常见使用场景包括按钮悬停、卡片放大、导航下划线缓动等。

```css
/* 基本过渡语法 */
.transition-basic {
    background-color: #3498db;
    transition: background-color 0.3s ease;
}

.transition-basic:hover {
    background-color: #e74c3c;
}

/* 过渡属性详解 */
.transition-detailed {
    /* transition: property duration timing-function delay; */
    transition-property: background-color;    /* 过渡属性 */
    transition-duration: 0.3s;               /* 持续时间 */
    transition-timing-function: ease;        /* 缓动函数 */
    transition-delay: 0.1s;                  /* 延迟时间 */
}

/* 多属性过渡 */
.multiple-transitions {
    background-color: #3498db;
    transform: scale(1);
    opacity: 1;
    
    transition: 
        background-color 0.3s ease,
        transform 0.2s ease-out,
        opacity 0.4s linear;
}

.multiple-transitions:hover {
    background-color: #e74c3c;
    transform: scale(1.1);
    opacity: 0.8;
}

/* 所有属性过渡 */
.all-transitions {
    transition: all 0.3s ease;
}
```

### 缓动函数（Timing Functions）

缓动函数用于控制过渡/动画的速度曲线。`linear` 匀速，`ease` 慢入慢出，`ease-in/out` 适合强调开始或结束的自然感；`cubic-bezier` 可自定义运动曲线；`steps`/`step-start`/`step-end` 适合打字机等离散跳变效果。

```css
/* 预定义缓动函数 */
.timing-functions {
    transition-timing-function: linear;      /* 匀速 */
    transition-timing-function: ease;        /* 默认，慢-快-慢 */
    transition-timing-function: ease-in;     /* 慢开始 */
    transition-timing-function: ease-out;    /* 慢结束 */
    transition-timing-function: ease-in-out; /* 慢开始和结束 */
}

/* 贝塞尔曲线 */
.cubic-bezier {
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 弹性效果 */
}

/* 阶跃函数 */
.steps-function {
    transition-timing-function: steps(4, end);      /* 4步，结束时跳跃 */
    transition-timing-function: steps(6, start);    /* 6步，开始时跳跃 */
    transition-timing-function: step-start;         /* 立即跳到结束状态 */
    transition-timing-function: step-end;           /* 保持开始状态直到结束 */
}
```

### 实用过渡效果

这些例子展示按钮、卡片、导航链接的常见交互：通过 `transform` 和 `box-shadow` 提升氛围且性能友好。建议优先对 `transform/opacity` 做动效，避免触发布局重排的属性（如 `width/height`）。

```css
/* 按钮悬停效果 */
.button-hover {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.button-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.button-hover:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 卡片悬停效果 */
.card-hover {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: scale(1);
    transition: all 0.3s ease;
}

.card-hover:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

/* 导航链接效果 */
.nav-link {
    position: relative;
    color: #333;
    text-decoration: none;
    padding: 8px 0;
    transition: color 0.3s ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #667eea;
    transition: width 0.3s ease;
}

.nav-link:hover {
    color: #667eea;
}

.nav-link:hover::after {
    width: 100%;
}
```

## 🎬 CSS变换（Transform）

### 2D变换

2D 变换包含平移、缩放、旋转、倾斜以及它们的组合。通过 `transform-origin` 可改变变换参考点。典型场景：卡片轻微缩放、列表项悬停位移、图标旋转等。

```css
/* 平移 */
.translate {
    transform: translateX(50px);        /* X轴平移 */
    transform: translateY(-30px);       /* Y轴平移 */
    transform: translate(50px, -30px);  /* X、Y轴平移 */
}

/* 缩放 */
.scale {
    transform: scaleX(1.5);            /* X轴缩放 */
    transform: scaleY(0.8);            /* Y轴缩放 */
    transform: scale(1.2);             /* 等比缩放 */
    transform: scale(1.5, 0.8);        /* X、Y轴不同缩放 */
}

/* 旋转 */
.rotate {
    transform: rotate(45deg);          /* 顺时针旋转45度 */
    transform: rotate(-30deg);         /* 逆时针旋转30度 */
}

/* 倾斜 */
.skew {
    transform: skewX(15deg);           /* X轴倾斜 */
    transform: skewY(-10deg);          /* Y轴倾斜 */
    transform: skew(15deg, -10deg);    /* X、Y轴倾斜 */
}

/* 组合变换 */
.combined-transform {
    transform: translate(50px, 30px) rotate(45deg) scale(1.2);
}

/* 变换原点 */
.transform-origin {
    transform-origin: center center;    /* 默认：中心点 */
    transform-origin: top left;         /* 左上角 */
    transform-origin: 50% 50%;          /* 百分比 */
    transform-origin: 20px 30px;        /* 具体坐标 */
}
```

### 3D变换

3D 变换在视觉上更具层次，需要 `perspective`（透视）和 `transform-style: preserve-3d` 的配合。常见于卡片翻转、画廊旋转等复杂交互。合理设置 `backface-visibility` 避免背面闪烁。

```css
/* 3D平移 */
.translate-3d {
    transform: translateZ(50px);                    /* Z轴平移 */
    transform: translate3d(50px, 30px, 20px);      /* 3D平移 */
}

/* 3D旋转 */
.rotate-3d {
    transform: rotateX(45deg);                      /* 绕X轴旋转 */
    transform: rotateY(60deg);                      /* 绕Y轴旋转 */
    transform: rotateZ(30deg);                      /* 绕Z轴旋转 */
    transform: rotate3d(1, 1, 0, 45deg);           /* 绕指定轴旋转 */
}

/* 3D缩放 */
.scale-3d {
    transform: scaleZ(2);                           /* Z轴缩放 */
    transform: scale3d(1.5, 1.2, 2);              /* 3D缩放 */
}

/* 透视效果 */
.perspective-container {
    perspective: 1000px;                            /* 透视距离 */
    perspective-origin: center center;              /* 透视原点 */
}

.perspective-item {
    transform-style: preserve-3d;                   /* 保持3D效果 */
    transform: rotateY(45deg);
}

/* 3D卡片翻转效果 */
.flip-card {
    width: 300px;
    height: 200px;
    perspective: 1000px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flip-card-front {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
}

.flip-card-back {
    background: linear-gradient(45deg, #f093fb, #f5576c);
    color: white;
    transform: rotateY(180deg);
}
```

## 🎭 CSS关键帧动画（@keyframes）

### 基础关键帧动画

关键帧动画通过 `@keyframes` 定义状态随时间的变化，再用 `animation` 应用到元素。`from/to` 适合简单渐变，百分比更灵活。常见于淡入、弹跳、滑入等动效。

```css
/* 定义关键帧 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 百分比关键帧 */
@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-20px);
    }
    50% {
        transform: translateY(0);
    }
    75% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}

/* 应用动画 */
.fade-in {
    animation: fadeIn 0.6s ease-out;
}

.bounce-animation {
    animation: bounce 1s ease-in-out infinite;
}
```

### 动画属性详解

了解 `animation-*` 的每一项含义有助于构造复杂动画：持续时间、延迟、次数、方向、填充模式、播放状态等。生产中建议用简写统一管理，便于复用与维护。

```css
.animation-properties {
    /* animation: name duration timing-function delay iteration-count direction fill-mode play-state; */
    
    animation-name: fadeIn;                    /* 动画名称 */
    animation-duration: 2s;                    /* 持续时间 */
    animation-timing-function: ease-in-out;    /* 缓动函数 */
    animation-delay: 0.5s;                     /* 延迟时间 */
    animation-iteration-count: infinite;       /* 重复次数：数字或infinite */
    animation-direction: alternate;            /* 方向：normal | reverse | alternate | alternate-reverse */
    animation-fill-mode: forwards;             /* 填充模式：none | forwards | backwards | both */
    animation-play-state: running;             /* 播放状态：running | paused */
}

/* 简写形式 */
.animation-shorthand {
    animation: slideIn 1s ease-out 0.2s infinite alternate forwards;
}
```

### 实用动画效果

常见动画库思路的精简版：加载旋转、脉冲、打字机、摇摆、渐入方向变体。可将这些 `@keyframes` 封装为工具类，按需组合以提升一致性与开发效率。

```css
/* 加载动画 */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* 脉冲动画 */
@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.7;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.pulse-button {
    animation: pulse 2s ease-in-out infinite;
}

/* 打字机效果 */
@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}

@keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: orange; }
}

.typewriter {
    overflow: hidden;
    border-right: 2px solid orange;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.15em;
    animation: 
        typing 3.5s steps(40, end),
        blink-caret 0.75s step-end infinite;
}

/* 摇摆动画 */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.shake-animation {
    animation: shake 0.5s ease-in-out;
}

/* 渐入动画库 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

/* 应用动画类 */
.fade-in-up { animation: fadeInUp 0.6s ease-out; }
.fade-in-down { animation: fadeInDown 0.6s ease-out; }
.fade-in-left { animation: fadeInLeft 0.6s ease-out; }
.fade-in-right { animation: fadeInRight 0.6s ease-out; }
```

## ⚡ 性能优化

### 硬件加速

性能优先：动画应尽量限制在 `transform` 与 `opacity`，它们通常只触发合成层变化，避免重排/重绘。通过 `translateZ(0)` 或 `will-change` 提示浏览器做 GPU 加速与提前优化。

```css
/* 启用硬件加速 */
.hardware-accelerated {
    transform: translateZ(0);           /* 强制启用GPU */
    will-change: transform, opacity;    /* 提示浏览器优化 */
}

/* 优化的动画属性 */
.optimized-animation {
    /* 只对这些属性做动画，性能最佳 */
    transition: transform 0.3s ease, opacity 0.3s ease;
}

/* 避免的属性（会触发重排） */
.avoid-these {
    /* 避免对这些属性做动画 */
    /* width, height, padding, margin, border, top, left */
}
```

### will-change属性

`will-change` 用于提前告诉浏览器哪些属性即将变化，便于做布局/渲染优化。但请“临用临开、事后关闭”，避免长期占用内存和导致渲染性能下降。

```css
/* 动画开始前 */
.will-animate {
    will-change: transform, opacity;
}

/* 动画结束后清除 */
.animation-complete {
    will-change: auto;
}

/* JavaScript控制 */
/*
element.style.willChange = 'transform, opacity';
// 执行动画
element.addEventListener('animationend', () => {
    element.style.willChange = 'auto';
});
*/
```

## 🎯 动画最佳实践

### 响应式动画

尊重用户偏好（如“减少动态效果”）与设备能力，为动画设置可降级策略；在桌面与移动端分别控制时长与幅度，保证体验与性能的平衡。

```css
/* 尊重用户偏好 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* 性能友好的动画 */
.performance-friendly {
    /* 使用transform和opacity */
    transform: translateX(0);
    opacity: 1;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.performance-friendly:hover {
    transform: translateX(10px);
    opacity: 0.8;
}
```

### 动画工具类系统

将常用动效沉淀为原子/工具类（如持续时间、延迟、缓动、具体动画），能够在页面间复用并保持风格一致；与设计系统配合能显著提升效率。

```css
/* 动画工具类 */
.animate-fade-in { animation: fadeIn 0.5s ease-out; }
.animate-slide-up { animation: fadeInUp 0.6s ease-out; }
.animate-bounce { animation: bounce 1s ease-in-out; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
.animate-spin { animation: spin 1s linear infinite; }

/* 延迟类 */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-500 { animation-delay: 0.5s; }

/* 持续时间类 */
.duration-150 { animation-duration: 0.15s; }
.duration-300 { animation-duration: 0.3s; }
.duration-500 { animation-duration: 0.5s; }
.duration-700 { animation-duration: 0.7s; }
.duration-1000 { animation-duration: 1s; }

/* 缓动函数类 */
.ease-linear { animation-timing-function: linear; }
.ease-in { animation-timing-function: ease-in; }
.ease-out { animation-timing-function: ease-out; }
.ease-in-out { animation-timing-function: ease-in-out; }
```

### JavaScript集成

通过在进入视口或状态变化时切换类名，可以在不依赖 JS 动画库的情况下实现高性能过渡/动画。推荐使用 `IntersectionObserver` 等方式按需触发，避免首屏抖动。

```css
/* 与JavaScript配合的动画类 */
.js-fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.js-fade-in.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.js-slide-in-left {
    opacity: 0;
    transform: translateX(-100px);
    transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.js-slide-in-left.is-visible {
    opacity: 1;
    transform: translateX(0);
}
```

