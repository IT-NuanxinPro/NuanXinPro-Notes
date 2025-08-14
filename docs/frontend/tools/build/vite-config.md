# Vite 企业级配置指南

基于实际项目经验的 Vite 配置最佳实践，涵盖开发、构建、优化等各个方面。

## 🚀 模块化配置架构

### 配置文件结构

```
build/
├── config/                 # 构建配置模块
│   ├── index.js           # 配置入口和整合
│   ├── alias.js           # 路径别名配置
│   ├── build.js           # 构建选项配置
│   ├── css.js             # CSS 和 PostCSS 配置
│   ├── optimization.js    # 依赖优化配置
│   └── server.js          # 开发服务器配置
├── plugins/               # 插件配置模块
│   ├── index.js           # 插件入口和整合
│   ├── vue.js             # Vue 相关插件
│   ├── ui.js              # UI 和自动导入插件
│   ├── optimization.js    # 优化相关插件
│   └── custom/            # 自定义插件
└── utils/                 # 构建工具
    └── env.js             # 环境变量处理
```

## ⚙️ 核心配置实现

### 1. 主配置文件

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { createViteConfig } from './build/config'

export default defineConfig(({ command, mode }) => {
  return createViteConfig({ command, mode })
})
```

### 2. 配置整合模块

```javascript
// build/config/index.js
import { createAlias } from './alias'
import { createBuildOptions } from './build'
import { createCSSOptions } from './css'
import { createOptimizationOptions } from './optimization'
import { createServerOptions } from './server'
import { createVitePlugins } from '../plugins'
import { getBuildEnv } from '../utils/env'

export function createViteConfig({ command, mode }) {
  const { isProduction, isDevelopment } = getBuildEnv(command, mode)
  
  return {
    // 路径别名
    resolve: {
      alias: createAlias()
    },
    
    // 插件配置
    plugins: createVitePlugins({ command, mode }),
    
    // CSS 配置
    css: createCSSOptions({ isProduction }),
    
    // 构建配置
    build: createBuildOptions({ isProduction }),
    
    // 开发服务器
    server: createServerOptions({ isDevelopment }),
    
    // 依赖优化
    optimizeDeps: createOptimizationOptions(),
    
    // 环境变量前缀
    envPrefix: ['VITE_', 'VUE_APP_'],
    
    // 定义全局常量
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    }
  }
}
```

### 3. 路径别名配置

```javascript
// build/config/alias.js
import { resolve } from 'path'

export function createAlias() {
  const pathResolve = (dir) => resolve(process.cwd(), '.', dir)
  
  return {
    '@': pathResolve('src'),
    '@/components': pathResolve('src/components'),
    '@/views': pathResolve('src/views'),
    '@/stores': pathResolve('src/stores'),
    '@/utils': pathResolve('src/utils'),
    '@/api': pathResolve('src/api'),
    '@/assets': pathResolve('src/assets'),
    '@/composables': pathResolve('src/composables'),
    '@/router': pathResolve('src/router'),
    '@/plugins': pathResolve('src/plugins'),
    '@/config': pathResolve('src/config'),
    '@/types': pathResolve('src/types')
  }
}
```

### 4. 构建选项配置

```javascript
// build/config/build.js
export function createBuildOptions({ isProduction }) {
  return {
    // 输出目录
    outDir: 'dist',
    
    // 静态资源目录
    assetsDir: 'assets',
    
    // 小于此阈值的导入或引用资源将内联为 base64 编码
    assetsInlineLimit: 4096,
    
    // 启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    
    // 构建后是否生成 source map 文件
    sourcemap: !isProduction,
    
    // 设置为 false 可以禁用最小化混淆
    minify: isProduction ? 'esbuild' : false,
    
    // 传递给 esbuild 的选项
    esbuild: {
      // 生产环境移除 console 和 debugger
      drop: isProduction ? ['console', 'debugger'] : []
    },
    
    // rollup 配置
    rollupOptions: {
      output: {
        // 分包策略
        manualChunks: {
          // Vue 相关
          vue: ['vue', 'vue-router', 'pinia'],
          
          // UI 库
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
          
          // 工具库
          utils: ['axios', 'dayjs', 'lodash-es'],
          
          // 第三方库
          vendor: ['gsap', 'md5']
        },
        
        // 资源文件命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'images'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts'
          }
          
          return `assets/${extType}/[name]-[hash].[ext]`
        }
      }
    },
    
    // 构建时的并发数量
    chunkSizeWarningLimit: 1000,
    
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false
  }
}
```

### 5. CSS 配置

```javascript
// build/config/css.js
export function createCSSOptions({ isProduction }) {
  return {
    // CSS 预处理器选项
    preprocessorOptions: {
      scss: {
        // 全局变量和混合宏
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `,
        // 使用现代 API
        api: 'modern-compiler'
      }
    },
    
    // PostCSS 配置
    postcss: {
      plugins: [
        // 自动添加浏览器前缀
        require('autoprefixer')({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            'last 10 versions'
          ],
          grid: true
        }),
        
        // px 转 vw（可选）
        isProduction && require('postcss-px-to-viewport-8-plugin')({
          viewportWidth: 1920,
          unitPrecision: 5,
          minPixelValue: 1,
          maxPixelValue: 1000,
          propBlackList: ['border-width', 'outline-width'],
          valueBlackList: ['1px']
        })
      ].filter(Boolean)
    },
    
    // CSS 模块化
    modules: {
      // 生成的类名格式
      generateScopedName: isProduction 
        ? '[hash:base64:5]' 
        : '[name]__[local]__[hash:base64:5]'
    }
  }
}
```

### 6. 开发服务器配置

```javascript
// build/config/server.js
export function createServerOptions({ isDevelopment }) {
  if (!isDevelopment) return {}
  
  return {
    // 服务器主机名
    host: '0.0.0.0',
    
    // 端口号
    port: 3000,
    
    // 自动打开浏览器
    open: true,
    
    // 启用 HTTPS
    https: false,
    
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/upload': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    },
    
    // CORS 配置
    cors: true,
    
    // 预热文件以提前转换和缓存结果
    warmup: {
      clientFiles: [
        './src/components/**/*.vue',
        './src/utils/**/*.js'
      ]
    }
  }
}
```

### 7. 依赖优化配置

```javascript
// build/config/optimization.js
export function createOptimizationOptions() {
  return {
    // 强制预构建链接的包
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      'element-plus/es',
      '@element-plus/icons-vue',
      'dayjs',
      'lodash-es'
    ],
    
    // 排除预构建的包
    exclude: [
      'your-local-package'
    ],
    
    // 强制 ESM 互操作
    needsInterop: [
      'element-plus'
    ]
  }
}
```

## 🔧 插件配置

### 插件管理器

```javascript
// build/plugins/index.js
import { createVuePlugins } from './vue'
import { createUIPlugins } from './ui'
import { createOptimizationPlugins } from './optimization'
import { getBuildEnv } from '../utils/env'

export function createVitePlugins({ command, mode }) {
  const { isProduction, isDevelopment } = getBuildEnv(command, mode)
  
  const plugins = [
    // Vue 相关插件
    ...createVuePlugins({ isDevelopment }),
    
    // UI 相关插件
    ...createUIPlugins(),
    
    // 优化相关插件
    ...createOptimizationPlugins({ isProduction })
  ].filter(Boolean)
  
  // 开发环境日志
  if (isDevelopment) {
    console.log('🛠️ 开发环境插件已加载')
  }
  
  // 生产环境日志
  if (isProduction) {
    console.log('🚀 生产环境插件已加载')
  }
  
  return plugins
}
```

## 📊 性能优化配置

### 构建优化策略

```javascript
// 构建性能提升配置
export const performanceConfig = {
  // ESBuild 压缩（比 Terser 快 10-20x）
  minify: 'esbuild',
  
  // 并行构建
  build: {
    rollupOptions: {
      // 并行处理
      maxParallelFileOps: 5
    }
  },
  
  // 依赖预构建优化
  optimizeDeps: {
    // 强制优化
    force: true,
    
    // 预构建缓存目录
    cacheDir: 'node_modules/.vite'
  }
}
```

### 性能监控

```javascript
// 构建分析插件
import { visualizer } from 'rollup-plugin-visualizer'

export function createAnalyzerPlugin() {
  return visualizer({
    filename: 'dist/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true
  })
}
```

## 💡 最佳实践

### 1. 环境变量管理

```javascript
// .env.development
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=开发环境

// .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=生产环境
```

### 2. 构建优化建议

- 使用 ESBuild 替代 Terser 进行代码压缩
- 合理配置代码分割策略
- 启用 Gzip 压缩
- 优化静态资源处理
- 配置合适的缓存策略

### 3. 开发体验优化

- 配置热重载
- 设置代理解决跨域问题
- 使用自动导入减少重复代码
- 配置路径别名简化导入
