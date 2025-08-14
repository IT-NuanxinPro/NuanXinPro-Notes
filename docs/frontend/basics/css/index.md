# CSS 核心

CSS（Cascading Style Sheets）层叠样式表是控制网页外观和布局的核心技术。它通过选择器选中HTML元素，然后应用样式规则来改变元素的显示效果。

## 🎯 CSS核心概念

CSS通过选择器和属性来控制网页的视觉呈现：

```css
/* 基本语法：选择器 { 属性: 值; } */
h1 {
    color: #333;
    font-size: 2em;
    text-align: center;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

#header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}
```

## 📚 学习模块

### 🎯 [选择器与优先级](./selectors.md)
掌握CSS选择器的使用和优先级规则，包括基础选择器、组合选择器、伪类伪元素和优先级计算。

### 📦 [盒模型](./box-model.md)
理解CSS盒模型的组成和计算方式，包括content-box和border-box的区别，以及margin重叠现象。

### 🏗️ [布局](./layout.md)
学习CSS布局技术，包括标准流、浮动、定位、Flex布局和Grid布局的使用方法。

### 📏 [单位与尺寸](./units.md)
了解CSS单位系统，包括绝对单位、相对单位、视口单位和CSS函数的使用。

### 🎨 [颜色与背景](./colors.md)
掌握CSS颜色系统和背景处理，包括各种颜色值表示方法、背景图片和渐变效果。

### ✍️ [文字与字体](./typography.md)
学习CSS文字和字体相关属性，包括字体族、字体大小、行高、文本对齐等。

### ✨ [动画与过渡](./animations.md)
掌握CSS动画和过渡效果，包括transition、transform和@keyframes动画的使用。

### 📱 [响应式与适配](./responsive.md)
学习响应式设计和设备适配，包括媒体查询、断点设计和移动端适配技术。

## 🎯 学习目标

通过学习CSS核心知识，你将能够：

- ✅ 精确控制网页元素的样式和布局
- ✅ 创建响应式和适配不同设备的网页
- ✅ 实现流畅的动画和交互效果
- ✅ 编写高效、可维护的CSS代码

## 💡 学习建议

1. **理解盒模型**：这是CSS布局的基础概念
2. **掌握选择器**：学会精确选中需要样式化的元素
3. **练习布局**：通过实际项目练习Flex和Grid布局
4. **关注性能**：了解哪些CSS属性会影响性能

CSS是创建美观网页界面的关键技术，与HTML和JavaScript一起构成了前端开发的核心技能。
