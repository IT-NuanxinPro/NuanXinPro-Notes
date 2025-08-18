# Vite 配置

下一代前端构建工具的完整配置指南，从安装到企业级配置的全面覆盖。

## 快速开始

### 安装 Vite

#### 创建新项目

```bash
# 使用 npm
npm create vite@latest

# 使用 yarn
yarn create vite

# 使用 pnpm
pnpm create vite

# 使用 bun
bun create vite
```

#### 指定项目名称和模板

```bash
# Vue 项目
npm create vite@latest my-vue-app -- --template vue
yarn create vite my-vue-app --template vue
pnpm create vite my-vue-app --template vue

# React 项目
npm create vite@latest my-react-app -- --template react
yarn create vite my-react-app --template react
pnpm create vite my-react-app --template react

# TypeScript 版本
npm create vite@latest my-vue-app -- --template vue-ts
npm create vite@latest my-react-app -- --template react-ts
```

**可用模板**：

- `vanilla`, `vanilla-ts` - 原生 JavaScript
- `vue`, `vue-ts` - Vue.js
- `react`, `react-ts` - React
- `preact`, `preact-ts` - Preact
- `lit`, `lit-ts` - Lit
- `svelte`, `svelte-ts` - Svelte
- `solid`, `solid-ts` - Solid
- `qwik`, `qwik-ts` - Qwik

#### 手动安装

```bash
# 安装 Vite
npm install -D vite
yarn add -D vite
pnpm add -D vite

# 创建 index.html
echo '<p>Hello Vite!</p>' > index.html

# 启动开发服务器
npx vite
# 访问 http://localhost:5173
```

### 兼容性要求

- **Node.js**: 版本 20.19+ 或 22.12+
- **浏览器**: 支持原生 ES 模块的现代浏览器

### 基础项目结构

```
my-vite-project/
├── index.html          # 入口 HTML 文件
├── package.json        # 项目配置
├── vite.config.js      # Vite 配置文件
├── src/
│   ├── main.js         # 应用入口
│   ├── App.vue         # 根组件
│   └── components/     # 组件目录
└── public/             # 静态资源目录
```

## 🎯 分包策略配置

### 基础分包配置

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 框架核心
          "vue-vendor": ["vue", "vue-router", "pinia"],

          // UI 组件库
          "ui-vendor": ["element-plus", "@element-plus/icons-vue"],

          // 工具库
          "utils-vendor": ["axios", "dayjs", "lodash-es"],

          // 第三方库
          "libs-vendor": ["echarts", "gsap"],
        },
      },
    },
  },
});
```

### 高级分包策略

```javascript
// 动态分包 - 根据模块大小和使用频率
manualChunks(id) {
  // 第三方库统一打包
  if (id.includes('node_modules')) {
    // 大型库单独分包
    if (id.includes('echarts')) return 'echarts'
    if (id.includes('element-plus')) return 'element-plus'

    // 小型工具库合并
    if (id.includes('dayjs') || id.includes('lodash')) return 'utils'

    // 其他第三方库
    return 'vendor'
  }

  // 业务模块分包
  if (id.includes('/src/views/')) {
    const module = id.split('/views/')[1].split('/')[0]
    return `page-${module}`
  }
}
```

**使用场景与注意事项：**

- **小项目**：使用基础分包，减少配置复杂度
- **大型项目**：使用动态分包，精确控制包大小
- **注意**：过度分包会增加 HTTP 请求数，需要平衡包大小和请求数量

## 🎨 CSS 预处理器配置

### Sass/SCSS 配置

```javascript
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // 全局变量和混合宏自动导入
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `,
        // 使用现代编译器（推荐）
        api: "modern-compiler",
      },
    },
  },
});
```

### PostCSS 配置

```javascript
// 完整的 PostCSS 配置
css: {
  postcss: {
    plugins: [
      // 自动添加浏览器前缀
      require("autoprefixer")({
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8",
        ],
      }),

      // px 转 rem/vw（移动端适配）
      require("postcss-px-to-viewport-8-plugin")({
        viewportWidth: 375, // 设计稿宽度
        unitPrecision: 5, // 转换精度
        minPixelValue: 1, // 最小转换值
        propBlackList: ["border-width"], // 不转换的属性
      }),
    ];
  }
}
```

### CSS Modules 配置

```javascript
css: {
  modules: {
    // 开发环境：可读性强的类名
    // 生产环境：压缩的哈希类名
    generateScopedName: process.env.NODE_ENV === "production"
      ? "[hash:base64:5]"
      : "[name]__[local]__[hash:base64:5]";
  }
}
```

**使用场景与注意事项：**

- **全局样式导入**：适用于需要在所有组件中使用的变量和混合宏
- **PostCSS 插件**：根据项目需求选择，避免过度配置影响构建性能
- **CSS Modules**：适用于需要样式隔离的组件库或大型项目

## 🔗 路径别名配置

### 基础别名配置

```javascript
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@/components": resolve(__dirname, "src/components"),
      "@/views": resolve(__dirname, "src/views"),
      "@/utils": resolve(__dirname, "src/utils"),
      "@/api": resolve(__dirname, "src/api"),
      "@/assets": resolve(__dirname, "src/assets"),
    },
  },
});
```

### 高级别名配置

```javascript
// 动态路径解析函数
const pathResolve = (dir) => resolve(process.cwd(), '.', dir)

// 完整的别名配置
alias: {
  // 基础路径
  '@': pathResolve('src'),
  '~': pathResolve('src'),

  // 业务模块
  '@/components': pathResolve('src/components'),
  '@/views': pathResolve('src/views'),
  '@/stores': pathResolve('src/stores'),
  '@/composables': pathResolve('src/composables'),
  '@/router': pathResolve('src/router'),

  // 资源文件
  '@/assets': pathResolve('src/assets'),
  '@/images': pathResolve('src/assets/images'),
  '@/styles': pathResolve('src/assets/styles'),

  // 工具和配置
  '@/utils': pathResolve('src/utils'),
  '@/api': pathResolve('src/api'),
  '@/config': pathResolve('src/config'),
  '@/types': pathResolve('src/types')
}
```

### TypeScript 支持

```json
// tsconfig.json - 需要同步配置
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/views/*": ["src/views/*"]
    }
  }
}
```

**使用场景与注意事项：**

- **简化导入路径**：避免 `../../../` 这样的相对路径
- **提高可维护性**：重构时只需修改别名配置
- **IDE 支持**：配置 TypeScript 路径映射以获得智能提示

## 🌐 代理配置

### 基础代理配置

```javascript
export default defineConfig({
  server: {
    proxy: {
      // 代理所有 /api 请求
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

### 多环境代理配置

```javascript
// 根据环境变量配置不同的代理目标
const proxyTarget = {
  development: 'http://localhost:8080',
  test: 'https://test-api.example.com',
  production: 'https://api.example.com'
}

server: {
  proxy: {
    '/api': {
      target: proxyTarget[process.env.NODE_ENV] || proxyTarget.development,
      changeOrigin: true,
      secure: false, // 忽略 HTTPS 证书验证
      rewrite: (path) => path.replace(/^\/api/, '')
    },

    // WebSocket 代理
    '/ws': {
      target: 'ws://localhost:8080',
      ws: true,
      changeOrigin: true
    },

    // 文件上传代理
    '/upload': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      // 不重写路径，保持原始路径
    }
  }
}
```

### 高级代理配置

```javascript
proxy: {
  // 条件代理 - 根据请求头或参数决定代理目标
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    configure: (proxy, options) => {
      proxy.on('proxyReq', (proxyReq, req, res) => {
        // 添加自定义请求头
        proxyReq.setHeader('X-Forwarded-Host', req.headers.host)
      })

      proxy.on('proxyRes', (proxyRes, req, res) => {
        // 处理响应
        console.log('代理响应:', req.url, proxyRes.statusCode)
      })
    }
  }
}
```

**使用场景与注意事项：**

- **开发环境跨域**：解决前后端分离开发中的跨域问题
- **多服务代理**：不同 API 路径代理到不同的后端服务
- **HTTPS 问题**：设置 `secure: false` 忽略自签名证书
- **WebSocket**：需要设置 `ws: true` 支持 WebSocket 连接

## 📁 静态资源配置

### 基础资源配置

```javascript
export default defineConfig({
  build: {
    // 静态资源目录
    assetsDir: "assets",

    // 小于 4KB 的资源内联为 base64
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        // 资源文件命名规则
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split(".").pop();

          // 根据文件类型分类存放
          if (/png|jpe?g|gif|svg|webp/i.test(extType)) {
            return "assets/images/[name]-[hash].[ext]";
          }
          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return "assets/fonts/[name]-[hash].[ext]";
          }
          if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(extType)) {
            return "assets/media/[name]-[hash].[ext]";
          }

          return "assets/[name]-[hash].[ext]";
        },
      },
    },
  },
});
```

### 公共资源配置

```javascript
// public 目录下的文件会被直接复制到输出目录
// 访问方式：/favicon.ico（不需要 /public 前缀）

// 在代码中引用 public 资源
const logoUrl = "/logo.png"; // public/logo.png

// 动态导入资源
const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};
```

### CDN 配置

```javascript
// 生产环境使用 CDN
const isCDN = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isCDN ? "https://cdn.example.com/my-app/" : "/",

  build: {
    rollupOptions: {
      external: isCDN ? ["vue", "vue-router"] : [],
      output: {
        globals: isCDN
          ? {
              vue: "Vue",
              "vue-router": "VueRouter",
            }
          : {},
      },
    },
  },
});
```

**使用场景与注意事项：**

- **资源分类**：按类型组织静态资源，便于管理和缓存策略
- **内联限制**：小文件内联减少 HTTP 请求，大文件独立加载
- **CDN 部署**：生产环境使用 CDN 加速资源加载
- **缓存策略**：文件名包含哈希值，支持长期缓存

## 🔌 插件加载与使用

### Vue 生态插件

```javascript
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
    // Vue 单文件组件支持
    vue({
      // 自定义块支持
      customElement: true,
      // 模板编译选项
      template: {
        compilerOptions: {
          // 将自定义元素视为原生标签
          isCustomElement: (tag) => tag.startsWith("my-"),
        },
      },
    }),

    // JSX 支持
    vueJsx({
      // 启用优化
      optimize: true,
    }),
  ],
});
```

### UI 组件库插件

```javascript
// Element Plus 按需导入
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

plugins: [
  // 组件自动导入
  Components({
    resolvers: [ElementPlusResolver()],
    // 自定义组件目录
    dirs: ["src/components"],
    // 生成类型声明文件
    dts: true,
  }),

  // API 自动导入
  AutoImport({
    resolvers: [ElementPlusResolver()],
    imports: ["vue", "vue-router", "pinia"],
    dts: true,
  }),
];
```

### 开发工具插件

```javascript
// 开发环境增强插件
const devPlugins = [
  // Mock 数据
  viteMockServe({
    mockPath: "mock",
    localEnabled: true,
  }),

  // ESLint 检查
  eslint({
    include: ["src/**/*.{js,vue,ts}"],
    exclude: ["node_modules"],
  }),
];

// 生产环境优化插件
const prodPlugins = [
  // 包分析
  visualizer({
    filename: "dist/stats.html",
    open: true,
  }),

  // Gzip 压缩
  viteCompression({
    algorithm: "gzip",
  }),
];

plugins: [...basePlugins, ...(isDev ? devPlugins : prodPlugins)];
```

**使用场景与注意事项：**

- **按需加载**：使用 unplugin 系列插件实现组件和 API 的按需导入
- **开发体验**：开发环境启用 Mock、ESLint 等工具提升开发效率
- **生产优化**：生产环境启用压缩、分析等插件优化构建结果
- **插件顺序**：某些插件对顺序敏感，需要注意配置顺序

## 📦 自动导入功能

### API 自动导入

```javascript
/**
 * UI 组件相关插件配置
 */
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

/**
 * 创建 UI 相关插件
 * @returns {Array} 插件数组
 */
export function createUIPlugins() {
  return [
    // API 自动导入
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      dts: false,
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),

    // 组件自动导入
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
        IconsResolver({
          enabledCollections: [
            "ep",
            "tabler",
            "svg-spinners",
            "material-icon-theme",
            "i-svg-spinners",
            "majesticons",
          ],
        }),
      ],
      dts: true,
      include: [/\.vue$/, /\.vue\?/],
    }),

    Icons({
      autoInstall: true,
    }),
  ];
}

// 需要下载图标集 @iconify/json
// 使用方式：<i-ep-arrow-left />
//         <el-icon><i-tabler-arrow-left /></el-icon>
```

**使用场景与注意事项：**

- **减少样板代码**：无需手动导入常用的 Vue API 和组件
- **类型支持**：生成 TypeScript 声明文件保证类型安全
- **ESLint 配置**：需要配置 ESLint 识别自动导入的变量
- **构建优化**：只导入实际使用的代码，支持 Tree Shaking

## ⚡ 性能优化配置

### 构建性能优化

```javascript
export default defineConfig({
  build: {
    // 使用 esbuild 压缩（比 terser 快 10-20x）
    minify: "esbuild",

    // 禁用 gzip 大小报告（提升构建速度）
    reportCompressedSize: false,

    // 调整 chunk 大小警告限制
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      // 并行处理
      maxParallelFileOps: 5,

      // 外部化依赖（CDN 场景）
      external: ["vue", "vue-router"],

      output: {
        // 手动分包优化
        manualChunks: {
          "vue-vendor": ["vue", "vue-router", "pinia"],
          "ui-vendor": ["element-plus"],
          "utils-vendor": ["axios", "dayjs"],
        },
      },
    },
  },
});
```

### 依赖预构建优化

```javascript
optimizeDeps: {
  // 强制预构建
  include: [
    'vue',
    'vue-router',
    'pinia',
    'element-plus/es',
    'axios'
  ],

  // 排除预构建
  exclude: [
    'your-local-package'
  ],

  // 强制重新预构建
  force: true,

  // ESM 互操作
  needsInterop: [
    'element-plus'
  ]
}
```

### 开发服务器优化

```javascript
server: {
  // 预热文件
  warmup: {
    clientFiles: [
      './src/components/**/*.vue',
      './src/utils/**/*.js'
    ]
  },

  // 文件系统缓存
  fs: {
    // 允许访问的文件
    allow: ['..'],
    // 严格模式
    strict: false
  }
}
```

### 生产环境优化

```javascript
// 条件配置
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  esbuild: {
    // 生产环境移除 console 和 debugger
    drop: isProduction ? ["console", "debugger"] : [],
  },

  build: {
    // 生产环境禁用 source map
    sourcemap: !isProduction,

    // CSS 代码分割
    cssCodeSplit: true,

    // 资源内联限制
    assetsInlineLimit: 4096,
  },
});
```

**性能优化建议：**

- **构建工具**：使用 esbuild 替代 terser 进行代码压缩
- **依赖管理**：合理配置预构建，避免重复构建
- **代码分割**：按需分包，避免单个包过大
- **缓存策略**：利用文件哈希实现长期缓存
- **开发体验**：使用预热和缓存提升开发服务器启动速度

## 🛠️ 完整配置示例

### 基础项目配置

```javascript
// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router"],
        },
      },
    },
  },
});
```

### 企业级项目配置

```javascript
// vite.config.js
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = mode === "production";

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [ElementPlusResolver()],
        dts: true,
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: true,
      }),
    ],

    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@/components": resolve(__dirname, "src/components"),
        "@/utils": resolve(__dirname, "src/utils"),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss";',
        },
      },
    },

    server: {
      host: "0.0.0.0",
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    build: {
      outDir: "dist",
      sourcemap: !isProduction,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            "vue-vendor": ["vue", "vue-router", "pinia"],
            "ui-vendor": ["element-plus"],
            "utils-vendor": ["axios", "dayjs", "lodash-es"],
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },

    optimizeDeps: {
      include: ["vue", "vue-router", "pinia", "element-plus/es"],
    },
  };
});
```

## 🚨 常见问题与解决方案

### 构建问题

**问题：构建时内存溢出**

```javascript
// 解决方案：调整 Node.js 内存限制
// package.json
{
  "scripts": {
    "build": "node --max-old-space-size=4096 ./node_modules/vite/bin/vite.js build"
  }
}

// 或者优化构建配置
build: {
  rollupOptions: {
    maxParallelFileOps: 2, // 减少并行处理数量
  },
  reportCompressedSize: false // 禁用压缩大小报告
}
```

**问题：依赖预构建失败**

```javascript
// 解决方案：手动配置依赖优化
optimizeDeps: {
  force: true, // 强制重新预构建
  include: [
    'problematic-package' // 手动包含问题包
  ],
  exclude: [
    'problematic-package' // 或者排除问题包
  ]
}
```

### 开发问题

**问题：热更新不生效**

```javascript
// 解决方案：检查文件监听配置
server: {
  watch: {
    usePolling: true, // 在某些系统上启用轮询
    interval: 1000
  }
}
```

**问题：代理不工作**

```javascript
// 解决方案：检查代理配置
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true, // 必须设置
    secure: false, // HTTPS 环境下设置
    configure: (proxy) => {
      proxy.on('error', (err) => {
        console.log('代理错误:', err)
      })
    }
  }
}
```

### 性能问题

**问题：首次启动慢**

```javascript
// 解决方案：优化依赖预构建
optimizeDeps: {
  include: [
    // 预先包含大型依赖
    'element-plus/es',
    'echarts',
    'lodash-es'
  ]
},

server: {
  warmup: {
    // 预热常用文件
    clientFiles: ['./src/main.js', './src/App.vue']
  }
}
```

## 💡 最佳实践总结

### 项目结构建议

```
src/
├── assets/          # 静态资源
│   ├── images/
│   ├── styles/
│   └── fonts/
├── components/      # 公共组件
│   ├── base/       # 基础组件
│   └── business/   # 业务组件
├── views/          # 页面组件
├── composables/    # 组合式函数
├── utils/          # 工具函数
├── api/            # API 接口
├── stores/         # 状态管理
├── router/         # 路由配置
└── types/          # 类型定义
```

### 配置文件组织

```javascript
// 推荐：模块化配置
// vite.config.js
import { defineConfig } from "vite";
import { createPlugins } from "./build/plugins";
import { createAlias } from "./build/alias";
import { createProxy } from "./build/proxy";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: createPlugins({ command, mode }),
    resolve: { alias: createAlias() },
    server: { proxy: createProxy() },
    // ... 其他配置
  };
});
```

### 环境变量管理

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=开发环境

# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=生产环境
```

### 性能优化清单

- ✅ 使用 esbuild 进行代码压缩
- ✅ 合理配置代码分割策略
- ✅ 启用 Gzip/Brotli 压缩
- ✅ 优化静态资源处理
- ✅ 配置合适的缓存策略
- ✅ 使用 CDN 加速资源加载
- ✅ 启用依赖预构建优化
- ✅ 配置文件预热提升启动速度

### 开发体验优化

- ✅ 配置热重载和文件监听
- ✅ 设置代理解决跨域问题
- ✅ 使用自动导入减少样板代码
- ✅ 配置路径别名简化导入
- ✅ 集成 ESLint 和 Prettier
- ✅ 配置 TypeScript 类型检查
- ✅ 使用 Mock 数据进行开发

---

**总结**：这份配置指南涵盖了 Vite 的核心配置项，按功能分类便于快速查找。每个配置都包含了使用场景说明和注意事项，帮助你根据项目需求选择合适的配置方案。
