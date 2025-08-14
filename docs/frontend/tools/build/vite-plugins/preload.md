# Vite 插件：资源预加载优化

一个简洁高效的 Vite 插件，用于在构建时自动为指定的静态资源生成 preload 标签，提升页面加载性能。

## 🎯 插件功能

- **静态资源预加载**：为指定的图片、字体、样式等资源生成 preload 标签
- **智能类型识别**：根据文件扩展名自动识别资源类型（image、font、style、script等）
- **构建时优化**：在构建过程中自动映射资源文件名，处理文件名哈希
- **HTML注入**：自动将 preload 标签注入到 HTML 的 `<title>` 标签后
- **跨域支持**：为字体资源自动添加 crossorigin 属性

## 📦 安装

```bash
# 下载插件文件到项目中
# 将 preload.js 文件放置到项目的 plugins 目录下
```

## 🔧 API 文档

### createPreloadPlugin(options)

创建预加载插件实例。

#### 参数

- **options** `{Object}` - 配置选项
  - **enabled** `{boolean}` - 是否启用插件，默认 `true`
  - **assets** `{string[]}` - 需要预加载的资源路径数组

#### 返回值

返回 Vite 插件对象。

### 支持的资源类型

插件会根据文件扩展名自动识别资源类型：

| 文件类型 | 扩展名 | preload as 属性 | 特殊处理 |
|---------|--------|----------------|----------|
| 图片 | jpg, jpeg, png, gif, svg, webp, avif | image | - |
| 字体 | woff, woff2, ttf, otf, eot | font | 自动添加 crossorigin |
| 样式 | css | style | - |
| 脚本 | js, mjs | script | - |
| 数据 | json, xml | fetch | - |
| 其他 | - | fetch | 默认类型 |

## 📦 插件实现

```javascript
/**
 * @param {Object} options 配置选项
 * @returns {Object} Vite 插件对象
 */
export function createPreloadPlugin(options = {}) {
  const { enabled = true, assets = [] } = options

  if (!enabled) {
    return {
      name: 'vite-plugin-preload',
      apply: () => false
    }
  }

  if (!assets || assets.length === 0) {
    return {
      name: 'vite-plugin-preload',
      apply: () => false
    }
  }
  let assetMap = new Map()

  return {
    name: 'vite-plugin-preload',
    apply: 'build',

    generateBundle(_, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        const chunk = bundle[fileName]
        if (chunk.type === 'asset') {
          assets.forEach((asset) => {
            const originalName = asset.split('/').pop()
            const baseName = originalName.split('.')[0]
            if (fileName.includes(baseName)) {
              assetMap.set(asset, fileName)
            }
          })
        }
      })
    },

    transformIndexHtml(html) {
      const preloadTags = assets
        .map((asset) => {
          const actualFileName = assetMap.get(asset)
          if (!actualFileName) {
            return null
          }

          const assetType = getAssetType(asset)
          const href = `./${actualFileName}`
          const crossorigin = assetType === 'font' ? ' crossorigin' : ''
          const tag = `  <link rel="preload" href="${href}" as="${assetType}"${crossorigin}>`
          return tag
        })
        .filter(Boolean)
        .join('\n')

      const titleEndIndex = html.indexOf('</title>')

      if (titleEndIndex !== -1) {
        const titleCloseEnd = titleEndIndex + '</title>'.length
        const beforeTitle = html.slice(0, titleCloseEnd)
        const afterTitle = html.slice(titleCloseEnd)
        const result = `${beforeTitle}${preloadTags}${afterTitle}`
        return result
      }
      return html
    }
  }
}

function getAssetType(asset) {
  const ext = asset.split('.').pop()?.toLowerCase()
  const typeMap = {
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    svg: 'image',
    webp: 'image',
    avif: 'image',
    woff: 'font',
    woff2: 'font',
    ttf: 'font',
    otf: 'font',
    eot: 'font',
    css: 'style',
    js: 'script',
    mjs: 'script',
    json: 'fetch',
    xml: 'fetch'
  }

  return typeMap[ext] || 'fetch'
}

```

## 🔧 使用方法

### 1. 基础使用

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { createPreloadPlugin } from './plugins/preload.js'

export default defineConfig({
  plugins: [
    createPreloadPlugin({
      enabled: true,
      assets: [
        'src/assets/images/hero-bg.jpg',
        'src/assets/fonts/main-font.woff2',
        'src/assets/styles/critical.css'
      ]
    })
  ]
})
```

### 2. 完整配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { createPreloadPlugin } from './plugins/preload.js'

export default defineConfig({
  plugins: [
    createPreloadPlugin({
      // 是否启用插件
      enabled: process.env.NODE_ENV === 'production',

      // 需要预加载的资源列表
      assets: [
        // 关键图片资源
        'src/assets/images/logo.png',
        'src/assets/images/hero-banner.jpg',

        // 字体资源
        'src/assets/fonts/primary-font.woff2',
        'src/assets/fonts/icon-font.woff',

        // 关键样式
        'src/assets/styles/critical.css',

        // 重要脚本
        'src/assets/scripts/analytics.js'
      ]
    })
  ]
})
```

### 3. 条件配置

```javascript
// 根据环境动态配置
const preloadAssets = process.env.NODE_ENV === 'production'
  ? [
      'src/assets/images/hero-bg.jpg',
      'src/assets/fonts/main-font.woff2'
    ]
  : [] // 开发环境不预加载

export default defineConfig({
  plugins: [
    createPreloadPlugin({
      enabled: process.env.NODE_ENV === 'production',
      assets: preloadAssets
    })
  ]
})

```

## 📋 生成的HTML示例

插件会在构建后的HTML中自动注入preload标签：

```html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <link rel="preload" href="./assets/hero-bg-a1b2c3d4.jpg" as="image">
  <link rel="preload" href="./assets/main-font-e5f6g7h8.woff2" as="font" crossorigin>
  <link rel="preload" href="./assets/critical-i9j0k1l2.css" as="style">
  <!-- 其他head内容 -->
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

## ⚠️ 注意事项

### 1. 资源路径

- 资源路径应该相对于项目根目录
- 插件会自动处理构建后的文件名哈希
- 确保指定的资源文件确实存在

### 2. 性能考虑

- 不要预加载过多资源，建议控制在关键资源范围内
- 大文件（>100KB）不建议使用preload，考虑使用prefetch
- 字体文件预加载效果最明显

### 3. 浏览器兼容性

- preload 支持现代浏览器（Chrome 50+, Firefox 85+, Safari 11.1+）
- 不支持的浏览器会忽略preload标签，不影响功能

## 💡 最佳实践

### 1. 选择合适的资源

```javascript
// 推荐预加载的资源类型
const recommendedAssets = [
  // 首屏关键图片
  'src/assets/images/hero-banner.jpg',
  'src/assets/images/logo.png',

  // 关键字体文件
  'src/assets/fonts/primary-font.woff2',

  // 关键样式文件
  'src/assets/styles/critical.css',

  // 小尺寸图标
  'src/assets/icons/sprite.svg'
]
```

### 2. 避免预加载的资源

```javascript
// 不建议预加载的资源
const avoidAssets = [
  // 大尺寸图片（>100KB）
  'src/assets/images/large-background.jpg',

  // 非关键脚本
  'src/assets/scripts/analytics.js',

  // 懒加载组件的资源
  'src/assets/images/gallery/*'
]
```

### 3. 性能优化建议

- **控制数量**：建议预加载资源不超过5个
- **文件大小**：单个文件建议不超过100KB
- **优先级**：优先预加载首屏可见的关键资源
- **测试验证**：使用浏览器开发者工具验证预加载效果

## 🔗 相关链接

- **GitHub仓库**：[待发布到GitHub](#) <!-- TODO: 添加实际的GitHub链接 -->
- **NPM包**：[待发布到NPM](#) <!-- TODO: 添加实际的NPM链接 -->
- **问题反馈**：[GitHub Issues](#) <!-- TODO: 添加实际的Issues链接 -->

## 📄 许可证

MIT License

---

**注意**：此插件专为Vite构建工具设计，仅在生产构建时生效。开发环境下插件不会执行以避免影响开发体验。
