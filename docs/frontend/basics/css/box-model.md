# 盒模型

CSS盒模型是理解布局的基础，每个HTML元素都可以看作一个矩形盒子，由内容、内边距、边框和外边距组成。

## 📦 盒模型组成

### 盒模型结构

```css
.box {
    /* 内容区域 */
    width: 200px;
    height: 100px;
    
    /* 内边距 */
    padding: 20px;
    
    /* 边框 */
    border: 2px solid #007bff;
    
    /* 外边距 */
    margin: 10px;
    
    background-color: #f8f9fa;
}
```

### 盒模型可视化

```html
<div class="box-demo">
    <div class="content">内容区域</div>
</div>

<style>
.box-demo {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 5px solid #007bff;
    margin: 15px;
    background-color: #e3f2fd;
    position: relative;
}

.content {
    background-color: #bbdefb;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 显示各部分尺寸 */
.box-demo::before {
    content: "margin: 15px";
    position: absolute;
    top: -30px;
    left: 0;
    font-size: 12px;
    color: #666;
}

.box-demo::after {
    content: "border: 5px, padding: 20px";
    position: absolute;
    bottom: -25px;
    left: 0;
    font-size: 12px;
    color: #666;
}
</style>
```

## 🔧 box-sizing属性

### content-box（标准盒模型）

```css
.content-box {
    box-sizing: content-box; /* 默认值 */
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 5px solid #007bff;
    
    /* 实际占用空间：
       宽度 = 200px + 20px*2 + 5px*2 = 250px
       高度 = 100px + 20px*2 + 5px*2 = 150px */
}
```

### border-box（IE盒模型）

```css
.border-box {
    box-sizing: border-box; /* 推荐使用 */
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 5px solid #007bff;
    
    /* 实际占用空间：
       宽度 = 200px（包含padding和border）
       高度 = 100px（包含padding和border）
       内容区域 = 200px - 20px*2 - 5px*2 = 150px */
}
```

### 全局设置border-box

```css
/* 推荐的全局设置 */
*, *::before, *::after {
    box-sizing: border-box;
}

/* 或者使用继承方式 */
html {
    box-sizing: border-box;
}

*, *::before, *::after {
    box-sizing: inherit;
}
```

## 📏 内边距（padding）

### 基础用法

```css
/* 四个方向相同 */
.padding-all {
    padding: 20px;
}

/* 垂直和水平 */
.padding-vh {
    padding: 10px 20px; /* 上下10px，左右20px */
}

/* 上、左右、下 */
.padding-three {
    padding: 10px 20px 15px; /* 上10px，左右20px，下15px */
}

/* 四个方向不同 */
.padding-four {
    padding: 10px 15px 20px 25px; /* 上右下左（顺时针） */
}

/* 单独设置 */
.padding-individual {
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 20px;
    padding-left: 25px;
}
```

### 实际应用

```css
/* 按钮内边距 */
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-sm {
    padding: 8px 16px;
    font-size: 14px;
}

.btn-lg {
    padding: 16px 32px;
    font-size: 18px;
}

/* 卡片内边距 */
.card {
    border: 1px solid #dee2e6;
    border-radius: 8px;
}

.card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #dee2e6;
    background-color: #f8f9fa;
}

.card-body {
    padding: 20px;
}

.card-footer {
    padding: 12px 20px;
    border-top: 1px solid #dee2e6;
    background-color: #f8f9fa;
}
```

## 🖼️ 边框（border）

### 边框属性

```css
/* 完整边框 */
.border-full {
    border: 2px solid #007bff;
}

/* 分别设置 */
.border-separate {
    border-width: 2px;
    border-style: solid;
    border-color: #007bff;
}

/* 单边边框 */
.border-single {
    border-top: 3px solid #dc3545;
    border-bottom: 1px solid #dee2e6;
}

/* 边框样式 */
.border-styles {
    border-top: 2px solid #007bff;    /* 实线 */
    border-right: 2px dashed #28a745;  /* 虚线 */
    border-bottom: 2px dotted #ffc107; /* 点线 */
    border-left: 2px double #6f42c1;   /* 双线 */
}
```

### 边框圆角

```css
/* 统一圆角 */
.rounded {
    border-radius: 8px;
}

/* 不同圆角 */
.rounded-custom {
    border-top-left-radius: 10px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 5px;
}

/* 简写形式 */
.rounded-shorthand {
    border-radius: 10px 5px 10px 5px; /* 左上 右上 右下 左下 */
}

/* 椭圆圆角 */
.rounded-ellipse {
    border-radius: 50px / 25px; /* 水平半径 / 垂直半径 */
}

/* 圆形 */
.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
```

### 边框实际应用

```css
/* 输入框边框 */
.form-control {
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 8px 12px;
    transition: border-color 0.15s ease-in-out;
}

.form-control:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* 卡片边框 */
.card {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 分割线 */
.divider {
    border: none;
    border-top: 1px solid #dee2e6;
    margin: 20px 0;
}
```

## 📐 外边距（margin）

### 基础用法

```css
/* 与padding用法相同 */
.margin-all {
    margin: 20px;
}

.margin-vh {
    margin: 10px 20px;
}

.margin-four {
    margin: 10px 15px 20px 25px;
}

/* 单独设置 */
.margin-individual {
    margin-top: 10px;
    margin-right: 15px;
    margin-bottom: 20px;
    margin-left: 25px;
}

/* 自动居中 */
.center {
    width: 800px;
    margin: 0 auto; /* 水平居中 */
}
```

### margin重叠现象

```css
/* 垂直margin会重叠 */
.box1 {
    margin-bottom: 20px;
    background-color: #ffebee;
    padding: 10px;
}

.box2 {
    margin-top: 30px;
    background-color: #e8f5e8;
    padding: 10px;
}

/* 实际间距是30px，不是50px（取较大值） */
```

### 解决margin重叠

```css
/* 方法1：使用padding代替margin */
.no-collapse-1 {
    padding-bottom: 20px;
}

/* 方法2：创建BFC */
.no-collapse-2 {
    overflow: hidden;
}

.no-collapse-2 .child {
    margin-top: 20px;
}

/* 方法3：使用border或padding分隔 */
.no-collapse-3 {
    border-top: 1px solid transparent;
}

/* 方法4：使用flexbox */
.flex-container {
    display: flex;
    flex-direction: column;
    gap: 20px; /* 使用gap代替margin */
}
```

## 🎯 实际应用示例

### 响应式盒模型

```css
.responsive-box {
    box-sizing: border-box;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
}

@media (max-width: 768px) {
    .responsive-box {
        margin: 10px;
        padding: 15px;
        width: calc(100% - 20px);
    }
}
```

### 卡片组件

```css
.card-component {
    box-sizing: border-box;
    width: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

.card-component:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 20px;
}

.card-title {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
}

.card-text {
    margin: 0 0 15px 0;
    color: #666;
    line-height: 1.5;
}

.card-actions {
    padding: 0 20px 20px 20px;
    display: flex;
    gap: 10px;
}
```

### 表单布局

```css
.form-group {
    margin-bottom: 20px;
}

.form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
}

.form-input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.15s ease-in-out;
}

.form-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-help {
    margin-top: 5px;
    font-size: 14px;
    color: #6c757d;
}
```

## 🔍 调试盒模型

### 开发者工具

```css
/* 临时调试样式 */
.debug {
    border: 1px solid red !important;
}

.debug * {
    border: 1px solid blue !important;
}

/* 显示所有元素的盒模型 */
.debug-all * {
    background-color: rgba(255, 0, 0, 0.1) !important;
    border: 1px solid red !important;
}
```

### 盒模型计算

```javascript
// JavaScript获取盒模型信息
function getBoxModel(element) {
    const styles = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    
    return {
        content: {
            width: parseFloat(styles.width),
            height: parseFloat(styles.height)
        },
        padding: {
            top: parseFloat(styles.paddingTop),
            right: parseFloat(styles.paddingRight),
            bottom: parseFloat(styles.paddingBottom),
            left: parseFloat(styles.paddingLeft)
        },
        border: {
            top: parseFloat(styles.borderTopWidth),
            right: parseFloat(styles.borderRightWidth),
            bottom: parseFloat(styles.borderBottomWidth),
            left: parseFloat(styles.borderLeftWidth)
        },
        margin: {
            top: parseFloat(styles.marginTop),
            right: parseFloat(styles.marginRight),
            bottom: parseFloat(styles.marginBottom),
            left: parseFloat(styles.marginLeft)
        },
        total: {
            width: rect.width,
            height: rect.height
        }
    };
}

// 使用示例
const element = document.querySelector('.my-element');
const boxModel = getBoxModel(element);
console.log('盒模型信息:', boxModel);
```

## 🎯 最佳实践

### 盒模型规范

```css
/* ✅ 推荐做法 */
/* 1. 全局设置border-box */
*, *::before, *::after {
    box-sizing: border-box;
}

/* 2. 使用逻辑属性（现代CSS） */
.modern-box {
    padding-inline: 20px; /* 左右内边距 */
    padding-block: 10px;  /* 上下内边距 */
    margin-inline: auto;  /* 水平居中 */
}

/* 3. 使用CSS自定义属性 */
:root {
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
}

.component {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

/* ❌ 避免的做法 */
/* 1. 过度依赖固定尺寸 */
.bad-fixed {
    width: 300px; /* 不够灵活 */
    height: 200px;
}

/* 2. 复杂的盒模型计算 */
.bad-calculation {
    width: calc(100% - 40px - 2px - 20px); /* 难以维护 */
}
```

### 响应式盒模型

```css
/* 响应式间距 */
.responsive-spacing {
    padding: clamp(1rem, 4vw, 2rem);
    margin: clamp(0.5rem, 2vw, 1rem);
}

/* 容器查询（现代浏览器） */
@container (min-width: 400px) {
    .card {
        padding: 24px;
    }
}

@container (max-width: 399px) {
    .card {
        padding: 16px;
    }
}
```

