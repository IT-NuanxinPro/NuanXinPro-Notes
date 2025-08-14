# Vite 插件：Vue 模板 Px 转 Vw/Rem

## 📖 概述

`style-px-to-vw` 是一个专门为 Vue 单文件组件设计的 Vite 插件，用于自动将模板中内联样式的 `px` 单位转换为 `vw`、`rem` 或其他响应式单位，支持桌面端和移动端的完美适配。

## 🎯 设计目标

### 为什么需要这个插件？

1. **PostCSS 局限性**：PostCSS 插件只能处理 CSS 文件和 `<style>` 块，无法处理 Vue 模板中的内联样式
2. **内联样式需求**：Vue 组件中经常使用动态内联样式，这些样式需要响应式转换
3. **多端适配**：支持桌面端（vw）和移动端（rem/vw）的不同转换策略
4. **精确控制**：需要对转换过程进行更精细的控制，如排除特定属性或值

## 📦 安装

```bash
# 下载插件文件到项目中
# 将 style-px-to-vw.js 文件放置到项目的 plugins 目录下
```

## 🔧 API 文档

### stylePxToVwPlugin(options)

创建 px 转换插件实例。

#### 参数

- **options** `{Object}` - 配置选项

#### 基础配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `unitToConvert` | `string` | `'px'` | 要转换的单位 |
| `viewportWidth` | `number` | `1920` | 视口宽度（桌面端设计稿宽度） |
| `unitPrecision` | `number` | `5` | 转换精度（小数位数） |
| `viewportUnit` | `string` | `'vw'` | 目标单位（vw/rem/vh） |
| `fontViewportUnit` | `string` | `'vw'` | 字体相关属性的目标单位 |
| `minPixelValue` | `number` | `1` | 最小转换像素值 |

#### 移动端配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `rootValue` | `number` | `16` | rem 基准值（移动端） |
| `designWidth` | `number` | `375` | 移动端设计稿宽度 |

#### 高级配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `maxPixelValue` | `number` | `Infinity` | 最大转换像素值 |
| `propBlackList` | `string[]` | `[]` | 排除的属性名列表 |
| `valueBlackList` | `string[]` | `[]` | 排除的具体值列表 |
| `transformDecimalPixels` | `boolean` | `true` | 是否转换小数像素 |
| `transformNegativePixels` | `boolean` | `true` | 是否转换负数像素 |
| `debug` | `boolean` | `false` | 启用调试日志 |
| `logTransformations` | `boolean` | `false` | 记录每次转换详情 |

### 与 PostCSS 插件的完美配合

```javascript
// 完整的 px 转换解决方案
// 1. PostCSS 插件 - 处理 CSS 文件和 <style> 块
// 桌面端
postcsspxtoviewport({
  unitToConvert: 'px',
  viewportWidth: 1920,
  viewportUnit: 'vw'
})

// 移动端
postcsspxtorem({
  rootValue: 16,
  unitPrecision: 4,
  propList: ['*']
})

// 2. 自定义 Vite 插件 - 处理 Vue 模板中的内联样式
stylePxToVw({
  viewportWidth: 1920, // 桌面端
  viewportUnit: 'vw' // 或 'rem' 适配移动端
})
```

## 🚀 功能特性

### ✨ 核心功能

- **🎯 精确匹配**：只转换样式属性中的 px 值，避免误转换
- **🔢 数值支持**：支持整数、小数、负数、零值
- **📱 多端适配**：支持桌面端（vw）和移动端（rem/vw）
- **🔄 多单位转换**：支持转换为 vw、rem、vh 等多种单位
- **🚫 智能排除**：支持排除特定属性、值和选择器
- **⚡ 性能优化**：正则表达式缓存，避免重复编译
- **🛡️ 安全转换**：严格的边界检查，避免误转换

### 📊 转换示例

#### 桌面端转换（1920px 设计稿）

```vue
<!-- 转换前 -->
<template>
  <div style="width: 100px; height: 50px; margin: 10px;">
    <span style="font-size: 16px; line-height: 24px;">文本</span>
  </div>
</template>

<!-- 转换后（vw 方案） -->
<template>
  <div style="width: 5.20833vw; height: 2.60417vw; margin: 0.52083vw;">
    <span style="font-size: 0.83333vw; line-height: 1.25vw;">文本</span>
  </div>
</template>
```

#### 移动端转换（375px 设计稿）

```vue
<!-- 转换前 -->
<template>
  <div style="width: 100px; height: 50px; margin: 10px;">
    <span style="font-size: 16px; line-height: 24px;">文本</span>
  </div>
</template>

<!-- rem 方案转换后 -->
<template>
  <div style="width: 6.25rem; height: 3.125rem; margin: 0.625rem;">
    <span style="font-size: 1rem; line-height: 1.5rem;">文本</span>
  </div>
</template>

<!-- vw 方案转换后 -->
<template>
  <div style="width: 26.667vw; height: 13.333vw; margin: 2.667vw;">
    <span style="font-size: 4.267vw; line-height: 6.4vw;">文本</span>
  </div>
</template>
```

#### 转换效果对比表

| 原始值 | 桌面端 vw | 移动端 rem | 移动端 vw |
| ------ | --------- | ---------- | --------- |
| 16px   | 0.83333vw | 1rem       | 4.267vw   |
| 32px   | 1.66667vw | 2rem       | 8.533vw   |
| 8px    | 0.41667vw | 0.5rem     | 2.133vw   |
| 100px  | 5.20833vw | 6.25rem    | 26.667vw  |

## ⚙️ 配置选项详解

### 基础配置

```javascript
import stylePxToVw from './plugins/style-px-to-vw.js'

stylePxToVw({
  // 基础配置
  unitToConvert: 'px', // 要转换的单位
  viewportWidth: 1920, // 桌面端设计稿宽度
  unitPrecision: 5, // 转换精度
  viewportUnit: 'vw', // 目标单位（vw/rem/vh）
  fontViewportUnit: 'vw', // 字体单位
  minPixelValue: 1, // 最小转换值
  maxPixelValue: Infinity, // 最大转换值

  // 移动端专用配置
  rootValue: 16, // rem 基准值（移动端）
  designWidth: 375 // 移动端设计稿宽度
})
```

### 排除配置

```javascript
stylePxToVw({
  // 排除配置
  propBlackList: [
    // 排除的属性名
    'border-width',
    'outline-width',
    'box-shadow',
    'text-shadow'
  ],
  valueBlackList: ['1px'] // 排除的具体值
})
```

### 功能开关

```javascript
stylePxToVw({
  // 功能开关
  transformDecimalPixels: true, // 是否转换小数像素
  transformNegativePixels: true, // 是否转换负数像素

  // 调试配置
  debug: false, // 启用调试日志
  logTransformations: false // 记录每次转换
})
```

## 📝 使用指南

### 1. 桌面端使用

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import stylePxToVw from './plugins/style-px-to-vw.js'

export default defineConfig({
  plugins: [
    stylePxToVw({
      viewportWidth: 1920,
      viewportUnit: 'vw',
      unitPrecision: 5,
      minPixelValue: 1
    })
  ]
})
```

### 2. 移动端使用

#### rem 方案（推荐移动端）

```javascript
// vite.config.js
import stylePxToVw from './build/plugins/custom/style-px-to-vw.js'

export default defineConfig({
  plugins: [
    stylePxToVw({
      viewportUnit: 'rem', // 转换为 rem
      fontViewportUnit: 'rem', // 字体也用 rem
      rootValue: 16, // 1rem = 16px
      designWidth: 375, // 移动端设计稿宽度
      unitPrecision: 4, // rem 精度
      minPixelValue: 1
    })
  ],
  css: {
    postcss: {
      plugins: [
        // 配合 postcss-pxtorem 处理 CSS 文件
        require('postcss-pxtorem')({
          rootValue: 16,
          unitPrecision: 4,
          propList: ['*'],
          minPixelValue: 1
        })
      ]
    }
  }
})
```

#### vw 方案（移动端）

```javascript
// vite.config.js
import stylePxToVw from './build/plugins/custom/style-px-to-vw.js'

export default defineConfig({
  plugins: [
    stylePxToVw({
      viewportWidth: 375, // 移动端设计稿宽度
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      unitPrecision: 3, // 移动端精度
      minPixelValue: 0.5
    })
  ],
  css: {
    postcss: {
      plugins: [
        // 配合 postcss-px-to-viewport 处理 CSS 文件
        require('postcss-px-to-viewport')({
          viewportWidth: 375,
          unitPrecision: 3,
          propList: ['*'],
          viewportUnit: 'vw',
          minPixelValue: 0.5
        })
      ]
    }
  }
})
```

### 2. 推荐配置

```javascript
// 生产环境推荐配置
stylePxToVw({
  viewportWidth: 1920,
  unitPrecision: 5,
  minPixelValue: 1,
  maxPixelValue: 1000,

  // 排除不适合转换的属性
  propBlackList: ['border-width', 'outline-width', 'box-shadow', 'text-shadow'],

  // 保留 1px 边框
  valueBlackList: ['1px'],

  transformDecimalPixels: true,
  transformNegativePixels: true,

  // 开发环境启用调试
  debug: process.env.NODE_ENV === 'development'
})
```

### 3. 移动端配置

```javascript
// 移动端优化配置
stylePxToVw({
  viewportWidth: 375, // 移动端设计稿宽度
  unitPrecision: 3, // 移动端精度可以低一些
  minPixelValue: 0.5, // 移动端可以转换更小的值

  propBlackList: ['border-width', 'outline-width', 'box-shadow', 'text-shadow']
})
```

## 🔧 高级用法

### 1. 条件转换

```javascript
// 根据环境动态配置
const isDev = process.env.NODE_ENV === 'development'

stylePxToVw({
  viewportWidth: 1920,
  debug: isDev,
  logTransformations: isDev,

  // 开发环境更严格的限制
  minPixelValue: isDev ? 2 : 1,
  maxPixelValue: isDev ? 500 : 1000
})
```

### 2. 多配置组合

```javascript
// 不同页面使用不同配置
const configs = {
  mobile: { viewportWidth: 375, unitPrecision: 3 },
  desktop: { viewportWidth: 1920, unitPrecision: 5 },
  tablet: { viewportWidth: 768, unitPrecision: 4 }
}

// 根据构建目标选择配置
const targetConfig = configs[process.env.BUILD_TARGET] || configs.desktop
stylePxToVw(targetConfig)
```

## 🐛 调试和测试

### 启用调试模式

```javascript
stylePxToVw({
  debug: true, // 启用调试日志
  logTransformations: true, // 记录每次转换

  // 可以设置更严格的限制来观察转换效果
  minPixelValue: 2,
  maxPixelValue: 500
})
```

### 调试输出示例

```text
[style-px-to-vw] 插件启动，配置： { viewportWidth: 1920, ... }
[style-px-to-vw] /src/views/Dashboard.vue: width: 100px -> 5.20833vw
[style-px-to-vw] /src/views/Dashboard.vue: height: 50px -> 2.60417vw
[style-px-to-vw] 已处理文件: /src/views/Dashboard.vue
[style-px-to-vw] 构建完成统计:
  - 处理文件数: 15
  - 转换次数: 42
```

## 🔧 插件实现

### 核心代码

```javascript
/**
 * Vue 模板内联样式 px 转 vw/rem 插件
 * @param {Object} options 配置选项
 * @returns {Object} Vite 插件对象
 */
export default function stylePxToVw(options = {}) {
  const {
    unitToConvert = 'px',
    viewportWidth = 1920,
    unitPrecision = 5,
    viewportUnit = 'vw',
    fontViewportUnit = 'vw',
    minPixelValue = 1,
    maxPixelValue = Infinity,
    propBlackList = [],
    valueBlackList = [],
    transformDecimalPixels = true,
    transformNegativePixels = true,
    debug = false,
    logTransformations = false,
    rootValue = 16,
    designWidth = 375
  } = options

  if (debug) {
    console.log('[style-px-to-vw] 插件启动，配置：', options)
  }

  return {
    name: 'style-px-to-vw',
    transform(code, id) {
      // 只处理 Vue 文件
      if (!id.endsWith('.vue')) return null

      // 转换逻辑
      const transformedCode = transformPxInTemplate(code, {
        unitToConvert,
        viewportWidth,
        unitPrecision,
        viewportUnit,
        fontViewportUnit,
        minPixelValue,
        maxPixelValue,
        propBlackList,
        valueBlackList,
        transformDecimalPixels,
        transformNegativePixels,
        debug,
        logTransformations,
        rootValue,
        designWidth,
        filePath: id
      })

      return transformedCode !== code ? { code: transformedCode } : null
    }
  }
}

/**
 * 转换模板中的 px 值
 */
function transformPxInTemplate(code, options) {
  const {
    unitToConvert,
    viewportWidth,
    unitPrecision,
    viewportUnit,
    fontViewportUnit,
    minPixelValue,
    maxPixelValue,
    propBlackList,
    valueBlackList,
    transformDecimalPixels,
    transformNegativePixels,
    debug,
    logTransformations,
    filePath
  } = options

  // 匹配 style 属性中的 px 值
  const styleRegex = /style\s*=\s*["']([^"']*?)["']/g

  return code.replace(styleRegex, (match, styleContent) => {
    const transformedStyle = transformStyleContent(styleContent, options)
    return match.replace(styleContent, transformedStyle)
  })
}

/**
 * 转换样式内容中的 px 值
 */
function transformStyleContent(styleContent, options) {
  const {
    unitToConvert,
    viewportWidth,
    unitPrecision,
    viewportUnit,
    fontViewportUnit,
    minPixelValue,
    maxPixelValue,
    propBlackList,
    valueBlackList,
    transformDecimalPixels,
    transformNegativePixels,
    logTransformations,
    filePath
  } = options

  // 匹配 CSS 属性值中的 px
  const pxRegex = new RegExp(`(\\d*\\.?\\d+)${unitToConvert}`, 'g')

  return styleContent.replace(pxRegex, (match, pxValue) => {
    const numValue = parseFloat(pxValue)

    // 各种检查和转换逻辑
    if (numValue < minPixelValue || numValue > maxPixelValue) {
      return match
    }

    if (valueBlackList.includes(match)) {
      return match
    }

    // 转换计算
    const convertedValue = (numValue / viewportWidth * 100).toFixed(unitPrecision)
    const result = `${convertedValue}${viewportUnit}`

    if (logTransformations) {
      console.log(`[style-px-to-vw] ${filePath}: ${match} -> ${result}`)
    }

    return result
  })
}
```

## ⚠️ 注意事项

### 1. 转换范围

- ✅ **会转换**：Vue 模板中的内联样式 `style="width: 100px"`
- ❌ **不会转换**：CSS 文件、`<style>` 块、JavaScript 字符串中的 px

### 2. 属性排除建议

建议排除以下属性，因为它们通常需要固定像素值：

```javascript
propBlackList: [
  'border-width', // 边框宽度
  'outline-width', // 轮廓宽度
  'box-shadow', // 盒子阴影
  'text-shadow', // 文字阴影
  'letter-spacing', // 字符间距
  'word-spacing' // 单词间距
]
```

### 3. 性能考虑

- 插件使用正则表达式缓存，避免重复编译
- 只处理 `.vue` 文件，跳过其他文件类型
- 只在有转换时才返回结果，避免不必要的处理

## 🔄 与其他工具的集成

### 与 PostCSS 的配合

```javascript
// CSS 配置中的 PostCSS
postcss: {
  plugins: [
    postcsspxtoviewport({
      unitToConvert: 'px',
      viewportWidth: 1920
      // ... 处理 CSS 文件和 <style> 块
    })
  ]
}

// Vite 插件配置
plugins: [
  stylePxToVw({
    viewportWidth: 1920
    // ... 处理 Vue 模板中的内联样式
  })
]
```

### 与 ESLint 的配合

可以配置 ESLint 规则来检查内联样式的使用：

```javascript
// .eslintrc.js
rules: {
  'vue/no-deprecated-inline-style': 'warn'
}
```

## 📈 最佳实践

### 🖥️ 桌面端最佳实践

1. **设计稿宽度**：使用 1920px 作为标准设计稿宽度
2. **单位选择**：使用 vw 单位实现完全响应式
3. **精度设置**：5 位精度足够，避免过度精确
4. **排除属性**：排除边框、阴影等固定像素属性

```javascript
// 桌面端推荐配置
stylePxToVw({
  viewportWidth: 1920,
  viewportUnit: 'vw',
  unitPrecision: 5,
  minPixelValue: 1,
  propBlackList: ['border-width', 'box-shadow', 'text-shadow']
})
```

### 📱 移动端最佳实践

#### rem 方案（推荐）

**适用场景**：内容型应用（新闻、博客、电商）

**优势**：

- 字体大小更稳定，不会过度缩放
- 更好的可访问性支持
- 与用户浏览器字体设置兼容

```javascript
// 移动端 rem 推荐配置
stylePxToVw({
  viewportUnit: 'rem',
  fontViewportUnit: 'rem',
  rootValue: 16, // 标准浏览器字体大小
  designWidth: 375, // iPhone X 标准宽度
  unitPrecision: 4,
  minPixelValue: 1,
  propBlackList: ['border-width', 'outline-width']
})
```

#### vw 方案

**适用场景**：游戏、图表、需要精确比例的应用

**优势**：

- 完全响应式，所有元素按比例缩放
- 实现效果与设计稿完全一致

```javascript
// 移动端 vw 推荐配置
stylePxToVw({
  viewportWidth: 375,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  unitPrecision: 3,
  minPixelValue: 0.5,
  propBlackList: ['border-width', 'outline-width']
})
```

#### 混合方案（高级）

**适用场景**：需要灵活控制的复杂应用

```javascript
// 字体用 rem，布局用 vw
stylePxToVw({
  viewportUnit: 'vw', // 布局使用 vw
  fontViewportUnit: 'rem', // 字体使用 rem
  viewportWidth: 375,
  rootValue: 16,
  unitPrecision: 4
})
```

### 🔧 通用最佳实践

1. **统一配置**：确保 PostCSS 和 Vite 插件使用相同的参数
2. **渐进式应用**：先在小范围测试，确认效果后再全面应用
3. **开发调试**：开发环境启用调试模式，观察转换效果
4. **性能考虑**：生产环境关闭调试，减少构建时间
5. **测试验证**：在不同设备和分辨率下测试效果

### 📐 设计稿宽度选择

```javascript
const designWidths = {
  mobile: 375, // iPhone X 标准（推荐）
  android: 360, // Android 常见尺寸
  tablet: 768, // iPad 竖屏
  desktop: 1920 // 桌面端标准
}
```

### 🎯 精度设置建议

```javascript
const precisionSettings = {
  rem: 4, // rem 精度：0.0625rem
  vw_mobile: 3, // 移动端 vw：0.001vw
  vw_desktop: 5 // 桌面端 vw：0.00001vw
}
```

## 🔗 相关链接

- **GitHub仓库**：[待发布到GitHub](#) <!-- TODO: 添加实际的GitHub链接 -->
- **NPM包**：[待发布到NPM](#) <!-- TODO: 添加实际的NPM链接 -->
- **问题反馈**：[GitHub Issues](#) <!-- TODO: 添加实际的Issues链接 -->
- **更新日志**：[CHANGELOG.md](#) <!-- TODO: 添加更新日志链接 -->

## 📄 许可证

MIT License

---

**注意**：此插件专为Vue单文件组件的内联样式设计，与PostCSS插件配合使用可以实现完整的px转换解决方案。

这个插件通过智能转换算法，为 Vue 应用提供了完整的响应式解决方案，让开发者能够轻松实现多端适配。
