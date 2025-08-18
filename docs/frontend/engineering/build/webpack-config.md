# Webpack 配置

功能强大的模块打包器配置指南，从安装到企业级配置的完整覆盖。

## 快速开始

### 安装 Webpack

#### 基础安装

```bash
# 安装 Webpack 和 CLI
npm install -D webpack webpack-cli
yarn add -D webpack webpack-cli
pnpm add -D webpack webpack-cli

# 安装常用 loader 和 plugin
npm install -D babel-loader @babel/core @babel/preset-env
npm install -D css-loader style-loader
npm install -D html-webpack-plugin
```

#### 创建基础配置

```javascript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
```

#### 基础项目结构

```
my-webpack-project/
├── webpack.config.js   # Webpack 配置文件
├── package.json        # 项目配置
├── src/
│   ├── index.js        # 应用入口
│   ├── index.html      # HTML 模板
│   └── components/     # 组件目录
└── dist/               # 构建输出目录
```

#### 基础命令

```bash
# 开发模式构建
npx webpack --mode development

# 生产模式构建
npx webpack --mode production

# 开发服务器（需要安装 webpack-dev-server）
npm install -D webpack-dev-server
npx webpack serve --mode development
```

### 兼容性要求

- **Node.js**: 版本 10.13.0+
- **浏览器**: 支持 ES5 的浏览器（可通过 Babel 转译支持更老版本）

### Package.json 脚本配置

```json
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development"
  }
}
```

## 🚀 Entry & Output 配置

### 单入口配置

```javascript
module.exports = {
  // 单入口文件
  entry: "./src/index.js",

  output: {
    // 输出目录（绝对路径）
    path: path.resolve(__dirname, "dist"),
    // 输出文件名
    filename: "bundle.js",
    // 清理输出目录
    clean: true,
  },
};
```

### 多入口配置

```javascript
module.exports = {
  entry: {
    // 主应用入口
    app: "./src/app.js",
    // 管理后台入口
    admin: "./src/admin.js",
    // 第三方库入口
    vendor: ["react", "react-dom", "lodash"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    // 使用占位符生成不同文件名
    filename: "[name].[contenthash:8].js",
    // chunk 文件命名
    chunkFilename: "[name].[contenthash:8].chunk.js",
    // 静态资源路径前缀
    publicPath:
      process.env.NODE_ENV === "production" ? "https://cdn.example.com/" : "/",
  },
};
```

### 动态入口配置

```javascript
const glob = require("glob");
const path = require("path");

// 自动扫描页面入口
function getEntries() {
  const entries = {};
  const files = glob.sync("./src/pages/*/index.js");

  files.forEach((file) => {
    const name = path.basename(path.dirname(file));
    entries[name] = file;
  });

  return entries;
}

module.exports = {
  entry: getEntries(),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/bundle.[contenthash:8].js",
  },
};
```

**使用场景与注意事项：**

- **单入口**：适用于 SPA 应用，配置简单
- **多入口**：适用于多页面应用或微前端架构
- **动态入口**：适用于页面较多的大型项目，自动化管理入口
- **contenthash**：基于内容生成哈希，支持长期缓存
- **publicPath**：生产环境建议使用 CDN 路径

## 🔄 Loader 配置

### JavaScript/TypeScript 处理

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 1%, last 2 versions",
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-syntax-dynamic-import",
            ],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // 提升编译速度
            },
          },
        ],
      },
    ],
  },
};
```

### CSS 样式处理

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 生产环境提取 CSS
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-loader",
            options: {
              // CSS 模块化
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
              // 启用 source map
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer", "postcss-preset-env"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### Sass/Less 预处理器

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              // 全局变量和混合宏
              additionalData: `
                @import "@/styles/variables.scss";
                @import "@/styles/mixins.scss";
              `,
              sassOptions: {
                includePaths: [path.resolve(__dirname, "src/styles")],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  "@primary-color": "#1890ff",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 静态资源处理

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8KB 以下内联
          },
        },
        generator: {
          filename: "images/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          // React 组件方式使用
          {
            resourceQuery: /component/,
            use: ["@svgr/webpack"],
          },
          // 普通资源方式使用
          {
            type: "asset/resource",
            generator: {
              filename: "icons/[name].[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
};
```

**使用场景与注意事项：**

- **Babel 配置**：根据目标浏览器配置 preset-env，启用按需 polyfill
- **TypeScript**：使用 transpileOnly 提升编译速度，类型检查交给 IDE
- **CSS 模块化**：大型项目建议启用，避免样式冲突
- **预处理器**：全局变量导入避免在每个文件中重复引入
- **静态资源**：合理设置内联阈值，平衡文件数量和体积

## 🔌 Plugin 配置

### HTML 模板插件

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    // 单页面应用
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["app"], // 指定引入的 chunk
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
      },
      // 自定义变量注入
      templateParameters: {
        title: "My App",
        description: "Enterprise Application",
      },
    }),

    // 多页面应用
    new HtmlWebpackPlugin({
      template: "./src/admin.html",
      filename: "admin.html",
      chunks: ["admin"],
      minify: process.env.NODE_ENV === "production",
    }),
  ],
};
```

### CSS 提取插件

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    // CSS 提取
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
      // 忽略 JS 中的 CSS 顺序警告
      ignoreOrder: true,
    }),
  ],

  optimization: {
    minimizer: [
      // CSS 压缩
      new CssMinimizerPlugin({
        parallel: true, // 并行处理
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
};
```

### 环境变量插件

```javascript
const webpack = require("webpack");

module.exports = {
  plugins: [
    // 定义全局常量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_BASE_URL": JSON.stringify(process.env.API_BASE_URL),
      __VERSION__: JSON.stringify(require("./package.json").version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    }),

    // 环境变量注入
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: false,
      API_TIMEOUT: 5000,
    }),
  ],
};
```

### 代码分析插件

```javascript
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  plugins: [
    // 包分析（开发环境）
    process.env.ANALYZE &&
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        openAnalyzer: true,
        analyzerPort: 8888,
      }),

    // Gzip 压缩（生产环境）
    process.env.NODE_ENV === "production" &&
      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8,
      }),

    // Brotli 压缩（生产环境）
    process.env.NODE_ENV === "production" &&
      new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [require("zlib").constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 8192,
        minRatio: 0.8,
      }),
  ].filter(Boolean),
};
```

### 进度和通知插件

```javascript
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = {
  plugins: [
    // 构建进度条
    new ProgressBarPlugin({
      format: "Building [:bar] :percent (:elapsed seconds)",
      clear: false,
      width: 60,
    }),

    // 友好的错误提示
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["Your application is running here: http://localhost:3000"],
      },
      onErrors: (severity, errors) => {
        if (severity !== "error") return;
        console.error("Build failed with errors.");
      },
      clearConsole: true,
    }),

    // 构建完成通知
    new WebpackBuildNotifierPlugin({
      title: "Webpack Build",
      suppressSuccess: false,
      suppressWarning: true,
      messageFormatter: () => "Build completed successfully!",
    }),
  ],
};
```

**使用场景与注意事项：**

- **HtmlWebpackPlugin**：自动生成 HTML 文件，支持模板变量注入
- **MiniCssExtractPlugin**：生产环境必备，提取 CSS 到独立文件
- **DefinePlugin**：编译时常量替换，支持环境变量和版本信息
- **压缩插件**：生产环境启用 Gzip/Brotli 压缩，减少传输体积
- **分析插件**：定期分析包体积，优化依赖结构

## 📦 代码分割与优化

### SplitChunks 基础配置

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all", // 对所有 chunk 进行分割
      cacheGroups: {
        // 第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 10,
        },

        // 公共代码
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

### 高级分包策略

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        // React 相关
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          chunks: "all",
          priority: 20,
        },

        // UI 组件库
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "antd",
          chunks: "all",
          priority: 15,
        },

        // 工具库
        utils: {
          test: /[\\/]node_modules[\\/](lodash|moment|dayjs)[\\/]/,
          name: "utils",
          chunks: "all",
          priority: 12,
        },

        // 其他第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
        },

        // 业务公共代码
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: 5,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },

    // 运行时代码单独提取
    runtimeChunk: {
      name: "runtime",
    },
  },
};
```

### 动态导入与懒加载

```javascript
// 路由级别的代码分割
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));

// 组件级别的代码分割
const HeavyComponent = React.lazy(() =>
  import(/* webpackChunkName: "heavy-component" */ "./HeavyComponent")
);

// 条件加载
async function loadChart() {
  if (needChart) {
    const { Chart } = await import(
      /* webpackChunkName: "chart" */
      "./Chart"
    );
    return Chart;
  }
}

// 预加载
import(
  /* webpackChunkName: "utils" */
  /* webpackPreload: true */
  "./utils"
);

// 预获取
import(
  /* webpackChunkName: "feature" */
  /* webpackPrefetch: true */
  "./feature"
);
```

### 缓存优化配置

```javascript
module.exports = {
  optimization: {
    // 模块 ID 稳定化
    moduleIds: "deterministic",
    chunkIds: "deterministic",

    splitChunks: {
      cacheGroups: {
        // 稳定的第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          // 确保 vendor 包内容稳定
          enforce: true,
        },
      },
    },
  },

  // 持久化缓存（Webpack 5）
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
};
```

**使用场景与注意事项：**

- **基础分包**：适用于中小型项目，简单有效
- **高级分包**：大型项目必备，精确控制包大小和缓存策略
- **动态导入**：实现按需加载，提升首屏性能
- **缓存优化**：确保文件哈希稳定，最大化缓存效果
- **预加载策略**：合理使用 preload/prefetch 提升用户体验

## 🔗 路径别名配置

### 基础别名配置

```javascript
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },

    // 文件扩展名自动解析
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"],
  },
};
```

### 企业级别名管理

```javascript
const path = require("path");

// 别名配置函数
function createAlias(rootPath) {
  const srcPath = path.resolve(rootPath, "src");

  return {
    // 基础路径
    "@": srcPath,
    "~": srcPath,

    // 业务模块
    "@/components": path.resolve(srcPath, "components"),
    "@/pages": path.resolve(srcPath, "pages"),
    "@/layouts": path.resolve(srcPath, "layouts"),
    "@/hooks": path.resolve(srcPath, "hooks"),
    "@/store": path.resolve(srcPath, "store"),
    "@/router": path.resolve(srcPath, "router"),

    // 资源文件
    "@/assets": path.resolve(srcPath, "assets"),
    "@/images": path.resolve(srcPath, "assets/images"),
    "@/styles": path.resolve(srcPath, "assets/styles"),
    "@/fonts": path.resolve(srcPath, "assets/fonts"),

    // 工具和配置
    "@/utils": path.resolve(srcPath, "utils"),
    "@/api": path.resolve(srcPath, "api"),
    "@/config": path.resolve(srcPath, "config"),
    "@/constants": path.resolve(srcPath, "constants"),
    "@/types": path.resolve(srcPath, "types"),

    // 第三方库别名
    react: path.resolve(__dirname, "node_modules/react"),
    "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
  };
}

module.exports = {
  resolve: {
    alias: createAlias(__dirname),
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],

    // 模块解析优先级
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
};
```

### TypeScript 支持

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/utils/*": ["src/utils/*"],
      "@/assets/*": ["src/assets/*"],
      "@/styles/*": ["src/assets/styles/*"]
    }
  }
}
```

**使用场景与注意事项：**

- **简化导入**：避免复杂的相对路径 `../../../`
- **提升维护性**：重构时只需修改别名配置
- **团队协作**：统一的路径规范，提高代码可读性
- **TypeScript 同步**：确保 tsconfig.json 与 webpack 配置一致
- **构建优化**：合理配置 modules 提升模块解析速度

## 🌐 DevServer 与代理配置

### 基础开发服务器配置

```javascript
module.exports = {
  devServer: {
    // 服务器配置
    host: "0.0.0.0", // 允许外部访问
    port: 3000,
    open: true, // 自动打开浏览器

    // 热更新配置
    hot: true,
    liveReload: true,

    // 静态文件服务
    static: {
      directory: path.join(__dirname, "public"),
      publicPath: "/static",
    },

    // 历史路由支持
    historyApiFallback: {
      index: "/index.html",
      rewrites: [
        { from: /^\/admin/, to: "/admin.html" },
        { from: /./, to: "/index.html" },
      ],
    },

    // 压缩
    compress: true,

    // HTTPS 配置
    https: false, // 或者提供证书配置

    // 客户端日志级别
    client: {
      logging: "info",
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
```

### 代理配置

```javascript
module.exports = {
  devServer: {
    proxy: {
      // 基础代理
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 重写路径
        },
      },

      // 多环境代理
      "/api/v1": {
        target: process.env.API_BASE_URL || "http://localhost:8080",
        changeOrigin: true,
        secure: false, // 忽略 HTTPS 证书验证
        logLevel: "debug",
      },

      // WebSocket 代理
      "/ws": {
        target: "ws://localhost:8080",
        ws: true,
        changeOrigin: true,
      },

      // 条件代理
      "/upload": {
        target: "http://localhost:8080",
        changeOrigin: true,
        bypass: function (req, res, proxyOptions) {
          // 开发环境跳过某些请求
          if (req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          }
        },
      },
    },
  },
};
```

### 高级代理配置

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // 自定义中间件
      devServer.app.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:8080",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
          onProxyReq: (proxyReq, req, res) => {
            // 添加自定义请求头
            proxyReq.setHeader("X-Forwarded-Host", req.headers.host);
            console.log("Proxying request:", req.url);
          },
          onProxyRes: (proxyRes, req, res) => {
            // 处理响应
            console.log("Proxy response:", proxyRes.statusCode);
          },
          onError: (err, req, res) => {
            console.error("Proxy error:", err);
          },
        })
      );

      return middlewares;
    },
  },
};
```

### 多环境配置

```javascript
// webpack.dev.js
const getProxyConfig = () => {
  const env = process.env.NODE_ENV || "development";

  const proxyConfigs = {
    development: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
    test: {
      "/api": {
        target: "https://test-api.example.com",
        changeOrigin: true,
        secure: true,
      },
    },
    staging: {
      "/api": {
        target: "https://staging-api.example.com",
        changeOrigin: true,
        secure: true,
      },
    },
  };

  return proxyConfigs[env] || proxyConfigs.development;
};

module.exports = {
  devServer: {
    proxy: getProxyConfig(),

    // 环境特定配置
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
  },
};
```

**使用场景与注意事项：**

- **本地开发**：配置热更新和自动刷新提升开发体验
- **接口代理**：解决开发环境跨域问题，支持多后端服务
- **路由支持**：SPA 应用需要配置 historyApiFallback
- **HTTPS 调试**：本地开发时可能需要 HTTPS 环境
- **性能优化**：合理配置日志级别和覆盖层显示

## 🐛 Source Map 配置

### 开发环境 Source Map

```javascript
module.exports = {
  mode: "development",

  // 开发环境推荐配置
  devtool: "eval-cheap-module-source-map",

  // 或者根据需求选择
  // devtool: 'eval-source-map', // 最高质量，较慢
  // devtool: 'cheap-module-source-map', // 较快，行级别映射
};
```

### 生产环境 Source Map

```javascript
module.exports = {
  mode: "production",

  // 生产环境配置选项
  devtool: process.env.GENERATE_SOURCEMAP === "true" ? "source-map" : false,

  // 或者隐藏源码的配置
  // devtool: 'hidden-source-map', // 不在 bundle 中引用
  // devtool: 'nosources-source-map', // 不包含源码内容
};
```

### 条件化 Source Map 配置

```javascript
const getDevtool = () => {
  const env = process.env.NODE_ENV;
  const enableSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

  if (env === "development") {
    return "eval-cheap-module-source-map";
  }

  if (env === "production") {
    if (!enableSourceMap) return false;

    // 根据部署环境决定
    if (process.env.DEPLOY_ENV === "staging") {
      return "source-map"; // 测试环境保留完整映射
    }

    return "hidden-source-map"; // 生产环境隐藏映射
  }

  return false;
};

module.exports = {
  devtool: getDevtool(),

  // CSS Source Map
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: process.env.NODE_ENV === "development",
            },
          },
        ],
      },
    ],
  },
};
```

### Source Map 类型对比

```javascript
// Source Map 配置对比表
const sourceMapOptions = {
  // 开发环境推荐
  "eval-cheap-module-source-map": {
    quality: "较高",
    speed: "快",
    description: "每个模块使用 eval() 执行，行级别映射",
  },

  "eval-source-map": {
    quality: "最高",
    speed: "较慢",
    description: "每个模块使用 eval() 执行，完整映射",
  },

  // 生产环境选项
  "source-map": {
    quality: "最高",
    speed: "最慢",
    description: "生成独立的 .map 文件",
  },

  "hidden-source-map": {
    quality: "最高",
    speed: "最慢",
    description: "生成 .map 文件但不在 bundle 中引用",
  },

  "nosources-source-map": {
    quality: "高",
    speed: "较慢",
    description: "不包含源码内容，只有映射信息",
  },
};
```

**使用场景与注意事项：**

- **开发环境**：优先考虑构建速度，推荐 `eval-cheap-module-source-map`
- **生产环境**：根据安全需求选择，可使用 `hidden-source-map` 隐藏源码
- **调试需求**：完整的源码映射有助于生产环境问题排查
- **构建性能**：Source Map 会显著影响构建时间，需要权衡
- **文件大小**：Source Map 文件通常很大，考虑存储和传输成本

## ⚡ 构建优化策略

### 构建速度优化

```javascript
const path = require("path");

module.exports = {
  // 缓存配置（Webpack 5）
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, ".webpack_cache"),
    buildDependencies: {
      config: [__filename],
    },
  },

  // 并行处理
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: require("os").cpus().length - 1,
            },
          },
          "babel-loader",
        ],
      },
    ],
  },

  // 解析优化
  resolve: {
    // 减少解析步骤
    modules: [path.resolve(__dirname, "src"), "node_modules"],

    // 明确扩展名顺序
    extensions: [".js", ".jsx", ".ts", ".tsx"],

    // 别名配置
    alias: {
      "@": path.resolve(__dirname, "src"),
    },

    // 优化第三方库解析
    mainFields: ["browser", "module", "main"],
  },

  // 排除不必要的解析
  module: {
    noParse: /jquery|lodash/,
  },
};
```

### Tree Shaking 配置

```javascript
module.exports = {
  mode: "production",

  optimization: {
    // 启用 Tree Shaking
    usedExports: true,
    sideEffects: false, // 或者在 package.json 中配置

    // 压缩配置
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 移除 console
            drop_debugger: true, // 移除 debugger
            pure_funcs: ["console.log"], // 移除特定函数调用
          },
        },
      }),
    ],
  },

  // package.json 中的 sideEffects 配置示例
  /*
  {
    "sideEffects": [
      "*.css",
      "*.scss",
      "./src/polyfills.js"
    ]
  }
  */
};
```

### 持久化缓存策略

```javascript
module.exports = {
  output: {
    // 稳定的文件名哈希
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
  },

  optimization: {
    // 稳定的模块 ID
    moduleIds: "deterministic",
    chunkIds: "deterministic",

    // 运行时代码分离
    runtimeChunk: {
      name: "runtime",
    },

    splitChunks: {
      cacheGroups: {
        // 稳定的第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};
```

### 包体积优化

```javascript
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  plugins: [
    // 包分析
    process.env.ANALYZE && new BundleAnalyzerPlugin(),
  ],

  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 244000, // 限制包大小

      cacheGroups: {
        // 按需分包
        lodash: {
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          name: "lodash",
          chunks: "all",
        },
      },
    },
  },

  // 外部化大型库
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    lodash: "_",
  },
};
```

**使用场景与注意事项：**

- **缓存策略**：Webpack 5 的持久化缓存显著提升重复构建速度
- **并行处理**：thread-loader 适用于耗时的 loader，如 babel-loader
- **Tree Shaking**：确保第三方库支持 ES modules，正确配置 sideEffects
- **包体积控制**：定期分析包体积，识别和优化大型依赖
- **外部化依赖**：CDN 场景下外部化常用库，减少包体积

## 📁 静态资源处理

### 资源文件命名策略

```javascript
module.exports = {
  output: {
    // 基础文件命名
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",

    // 静态资源命名
    assetModuleFilename: (pathData) => {
      const filepath = path.dirname(pathData.filename).split("/").slice(1);

      // 根据文件类型分类
      if (/\.(png|jpe?g|gif|svg|webp)$/i.test(pathData.filename)) {
        return "images/[name].[hash:8][ext]";
      }

      if (/\.(woff|woff2|eot|ttf|otf)$/i.test(pathData.filename)) {
        return "fonts/[name].[hash:8][ext]";
      }

      if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(pathData.filename)) {
        return "media/[name].[hash:8][ext]";
      }

      return "assets/[name].[hash:8][ext]";
    },
  },
};
```

### CDN 配置

```javascript
const isProd = process.env.NODE_ENV === "production";
const CDN_URL = "https://cdn.example.com/";

module.exports = {
  output: {
    // 生产环境使用 CDN
    publicPath: isProd ? CDN_URL : "/",

    // 跨域资源加载
    crossOriginLoading: "anonymous",
  },

  // 外部化 CDN 资源
  externals: isProd
    ? {
        react: "React",
        "react-dom": "ReactDOM",
        antd: "antd",
        moment: "moment",
      }
    : {},

  plugins: [
    // HTML 模板中注入 CDN 链接
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      cdnUrls: isProd
        ? [
            "https://unpkg.com/react@17/umd/react.production.min.js",
            "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
          ]
        : [],
    }),
  ],
};
```

### 资源优化配置

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8KB 以下内联
          },
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 80,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 80,
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 多环境资源配置

```javascript
const getAssetConfig = (env) => {
  const configs = {
    development: {
      publicPath: "/",
      optimization: false,
    },
    test: {
      publicPath: "https://test-cdn.example.com/",
      optimization: true,
    },
    production: {
      publicPath: "https://cdn.example.com/",
      optimization: true,
    },
  };

  return configs[env] || configs.development;
};

const assetConfig = getAssetConfig(process.env.NODE_ENV);

module.exports = {
  output: {
    publicPath: assetConfig.publicPath,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: assetConfig.optimization
          ? ["file-loader", "image-webpack-loader"]
          : ["file-loader"],
      },
    ],
  },
};
```

**使用场景与注意事项：**

- **文件命名**：使用 contenthash 确保缓存失效，按类型分目录管理
- **CDN 部署**：生产环境使用 CDN 加速，注意跨域配置
- **资源优化**：图片压缩和格式转换，平衡质量和体积
- **多环境管理**：不同环境使用不同的资源策略
- **缓存策略**：合理设置缓存头，最大化缓存效果

## 🏢 企业级配置模板

### 基础项目模板

```javascript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDev ? "development" : "production",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev ? "[name].js" : "[name].[contenthash:8].js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    !isDev &&
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
      }),
  ].filter(Boolean),

  devServer: isDev
    ? {
        port: 3000,
        hot: true,
        historyApiFallback: true,
      }
    : undefined,

  devtool: isDev ? "eval-cheap-module-source-map" : false,
};
```

### React 企业级模板

```javascript
// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  const isProd = argv.mode === "production";

  return {
    entry: {
      app: "./src/index.js",
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isDev ? "[name].js" : "[name].[contenthash:8].js",
      chunkFilename: isDev
        ? "[name].chunk.js"
        : "[name].[contenthash:8].chunk.js",
      publicPath: "/",
      clean: true,
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@/components": path.resolve(__dirname, "src/components"),
        "@/utils": path.resolve(__dirname, "src/utils"),
        "@/assets": path.resolve(__dirname, "src/assets"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
                  "@babel/preset-react",
                  "@babel/preset-typescript",
                ],
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  isDev && "react-refresh/babel",
                ].filter(Boolean),
              },
            },
          ],
        },

        {
          test: /\.(css|scss)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: isDev
                    ? "[name]__[local]__[hash:base64:5]"
                    : "[hash:base64:5]",
                },
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },

        {
          test: /\.(png|jpe?g|gif|svg|webp)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: "images/[name].[hash:8][ext]",
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: isProd,
      }),

      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env.REACT_APP_API_URL": JSON.stringify(
          process.env.REACT_APP_API_URL
        ),
      }),

      isProd &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:8].css",
          chunkFilename: "css/[name].[contenthash:8].chunk.css",
        }),

      process.env.ANALYZE && new BundleAnalyzerPlugin(),
    ].filter(Boolean),

    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react",
            chunks: "all",
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
            priority: 10,
          },
        },
      },
      runtimeChunk: {
        name: "runtime",
      },
    },

    devServer: isDev
      ? {
          port: 3000,
          hot: true,
          historyApiFallback: true,
          proxy: {
            "/api": {
              target: "http://localhost:8080",
              changeOrigin: true,
            },
          },
        }
      : undefined,

    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
  };
};
```

### 多页面应用模板

```javascript
// webpack.config.js
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 自动生成入口和 HTML 插件
function generateEntries() {
  const entries = {};
  const htmlPlugins = [];

  const pages = glob.sync("./src/pages/*/index.js");

  pages.forEach((page) => {
    const pageName = path.basename(path.dirname(page));
    entries[pageName] = page;

    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: `./src/pages/${pageName}/index.html`,
        filename: `${pageName}.html`,
        chunks: ["common", "vendor", pageName],
        minify: process.env.NODE_ENV === "production",
      })
    );
  });

  return { entries, htmlPlugins };
}

const { entries, htmlPlugins } = generateEntries();

module.exports = {
  entry: entries,

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/bundle.[contenthash:8].js",
    clean: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/shared": path.resolve(__dirname, "src/shared"),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    ...htmlPlugins,

    new MiniCssExtractPlugin({
      filename: "[name]/styles.[contenthash:8].css",
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          chunks: "all",
          minChunks: 2,
          priority: 5,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          priority: 10,
        },
      },
    },
  },
};
```

### 环境配置管理

```javascript
// build/webpack.base.js
const path = require("path");

module.exports = {
  entry: "./src/index.js",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};

// build/webpack.dev.js
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",

  devtool: "eval-cheap-module-source-map",

  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});

// build/webpack.prod.js
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "production",

  output: {
    filename: "[name].[contenthash:8].js",
    clean: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
});
```

**企业级最佳实践：**

- **模块化配置**：按环境拆分配置文件，便于维护和扩展
- **自动化入口**：大型项目使用脚本自动生成入口和插件配置
- **统一规范**：团队内统一 Webpack 配置模板和最佳实践
- **性能监控**：集成包分析工具，定期优化构建产物
- **环境隔离**：不同环境使用不同的构建策略和优化方案

## 🚨 常见问题与解决方案

### 构建性能问题

**问题：构建速度慢**

```javascript
// 解决方案：启用缓存和并行处理
module.exports = {
  cache: {
    type: "filesystem",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "thread-loader", // 并行处理
          "babel-loader",
        ],
      },
    ],
  },
};
```

**问题：内存溢出**

```bash
# 解决方案：增加 Node.js 内存限制
node --max-old-space-size=4096 ./node_modules/webpack/bin/webpack.js

# 或在 package.json 中配置
{
  "scripts": {
    "build": "node --max-old-space-size=4096 webpack"
  }
}
```

### 开发环境问题

**问题：热更新不生效**

```javascript
// 解决方案：检查 HMR 配置
module.exports = {
  devServer: {
    hot: true,
    watchFiles: ["src/**/*"], // 监听文件变化
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
};
```

**问题：代理不工作**

```javascript
// 解决方案：详细的代理配置
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        logLevel: "debug", // 开启调试日志
        onError: (err) => {
          console.log("Proxy Error:", err);
        },
      },
    },
  },
};
```

### 生产环境问题

**问题：打包后文件过大**

```javascript
// 解决方案：代码分割和外部化
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      maxSize: 244000, // 限制包大小
    },
  },

  externals: {
    lodash: "_",
    moment: "moment",
  },
};
```

**问题：CSS 样式丢失**

```javascript
// 解决方案：正确配置 CSS 提取
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
};
```

## 12. 配置验证与快速参考

### 12.1 配置验证清单

```javascript
// webpack.config.js - 配置验证示例
const path = require("path");
const { validate } = require("schema-utils");

// 配置验证 schema
const configSchema = {
  type: "object",
  properties: {
    entry: { type: ["string", "object", "array"] },
    output: {
      type: "object",
      properties: {
        path: { type: "string" },
        filename: { type: "string" },
        publicPath: { type: "string" },
      },
      required: ["path", "filename"],
    },
    mode: {
      type: "string",
      enum: ["development", "production", "none"],
    },
  },
  required: ["entry", "output", "mode"],
};

module.exports = (env, argv) => {
  const config = {
    // ... 你的配置
  };

  // 验证配置
  validate(configSchema, config, {
    name: "Webpack Config",
    baseDataPath: "configuration",
  });

  return config;
};
```

### 12.2 性能检查清单

```javascript
// 性能监控配置
module.exports = {
  // 性能预算
  performance: {
    maxAssetSize: 250000, // 单个资源最大 250KB
    maxEntrypointSize: 400000, // 入口点最大 400KB
    hints: "warning", // 超出时显示警告
    assetFilter: (assetFilename) => {
      // 只检查 JS 和 CSS 文件
      return /\.(js|css)$/.test(assetFilename);
    },
  },

  // 统计信息配置
  stats: {
    assets: true,
    chunks: false,
    modules: false,
    colors: true,
    timings: true,
    performance: true,
    warnings: true,
    errors: true,
  },
};
```

### 12.3 快速配置模板

#### 基础项目快速启动

```bash
# 1. 初始化项目
npm init -y
npm install webpack webpack-cli --save-dev

# 2. 创建基础配置
touch webpack.config.js

# 3. 安装常用 loader 和 plugin
npm install --save-dev \
  babel-loader @babel/core @babel/preset-env \
  css-loader style-loader \
  html-webpack-plugin \
  mini-css-extract-plugin
```

#### React 项目快速配置

```javascript
// webpack.react.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
};
```

### 12.4 常用命令速查

```bash
# 开发环境构建
npx webpack --mode development

# 生产环境构建
npx webpack --mode production

# 启动开发服务器
npx webpack serve --mode development

# 分析构建结果
npx webpack --profile --json > stats.json
npx webpack-bundle-analyzer stats.json

# 监听文件变化
npx webpack --watch

# 清理输出目录
npx webpack --clean

# 显示详细构建信息
npx webpack --stats verbose
```

### 12.5 配置文件组织最佳实践

```
project/
├── webpack/
│   ├── webpack.common.js      # 通用配置
│   ├── webpack.dev.js         # 开发环境
│   ├── webpack.prod.js        # 生产环境
│   ├── webpack.analyze.js     # 分析配置
│   └── utils/
│       ├── paths.js           # 路径配置
│       └── plugins.js         # 插件配置
├── src/
├── public/
└── package.json
```

```javascript
// webpack/utils/paths.js
const path = require("path");

const rootPath = path.resolve(__dirname, "../..");

module.exports = {
  root: rootPath,
  src: path.resolve(rootPath, "src"),
  build: path.resolve(rootPath, "dist"),
  public: path.resolve(rootPath, "public"),
  nodeModules: path.resolve(rootPath, "node_modules"),
};
```

### 12.6 团队协作配置规范

```javascript
// .webpack.config.js - 团队标准配置
module.exports = {
  // 强制配置项
  mode: process.env.NODE_ENV || "development",

  // 统一的文件命名规范
  output: {
    filename:
      process.env.NODE_ENV === "production"
        ? "[name].[contenthash:8].js"
        : "[name].js",
    chunkFilename:
      process.env.NODE_ENV === "production"
        ? "[name].[contenthash:8].chunk.js"
        : "[name].chunk.js",
  },

  // 统一的优化配置
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
        },
      },
    },
  },

  // 统一的开发工具配置
  devtool:
    process.env.NODE_ENV === "production"
      ? "source-map"
      : "eval-cheap-module-source-map",
};
```

---

## 总结

**Webpack 企业级配置指南** 提供了：

- **📋 完整的配置模块**：从入口输出到高级优化的全方位覆盖
- **🔧 实用的代码示例**：每个配置都包含可直接使用的代码片段
- **🚀 性能优化策略**：针对企业级项目的构建速度和包体积优化
- **🛠️ 故障排除指南**：常见问题的解决方案和最佳实践
- **📦 模板化配置**：适用于不同项目类型的标准化模板
- **✅ 验证和规范**：确保配置质量和团队协作的标准
