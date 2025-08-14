# 暖心のBlog

> 专注前端技术分享 | 记录成长足迹 | 构建知识体系

一个基于 VitePress 构建的现代化前端知识库博客，涵盖前端开发全栈技术，助力开发者成长和面试突破。

## ✨ 特色亮点

- 🎨 **现代化设计**：精美的渐变色彩和卡片式布局
- 📱 **完美适配**：响应式设计，支持移动端和桌面端
- 🌙 **主题切换**：支持明暗主题无缝切换
- 📊 **图表支持**：集成 Mermaid 图表，支持流程图、时序图等
- ⚡ **性能优化**：一屏式首页设计，极速加载体验
- 🔍 **智能搜索**：全站内容快速检索

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run docs:dev

# 构建生产版本
pnpm run docs:build

# 预览构建结果
pnpm run docs:preview
```

## 📚 知识体系

### 🔰 前端基础

- **HTML5 语义化**：现代HTML标准、无障碍性、SEO优化
- **CSS3 现代布局**：Flexbox、Grid、响应式设计、动画效果
- **JavaScript 核心**：ES6+特性、异步编程、模块化开发
- **TypeScript 类型系统**：静态类型、泛型、高级类型操作

### 🎯 前端框架

- **Vue 生态系统**
  - Vue3 Composition API 实战
  - 响应式原理深度解析
  - Pinia 状态管理最佳实践
  - Vue Router 路由系统设计
  - 自定义 Hooks 开发

- **React 生态系统**
  - React18 新特性详解
  - Hooks 原理与实践
  - Redux Toolkit 现代状态管理
  - Next.js 全栈开发
  - 性能优化策略

- **框架对比选择**
  - 技术选型决策树
  - 性能对比分析
  - 生态系统评估
  - 项目适用场景

### 🛠️ 前端工具链

- **构建工具**：Vite、Webpack、Rollup 深度对比
- **Git 版本控制**：工作流规范、分支策略、协作最佳实践
- **包管理器**：npm、yarn、pnpm 特性对比与选择
- **开发环境**：Node.js 版本管理、环境配置优化

### 🎨 UI 组件库

- **Vue UI 库**：Element Plus、Vuetify、Ant Design Vue 详解
- **React UI 库**：Ant Design、Material-UI、Chakra UI 对比
- **组件设计系统**：设计令牌、原子设计、主题定制

### ⚡ 工程化实践

- **性能优化**：首屏加载、代码分割、缓存策略、图片优化
- **代码质量**：ESLint、Prettier、Husky、代码审查流程
- **测试策略**：单元测试、集成测试、E2E测试框架选择

### 💼 面试突破

- **基础面试题**：HTML/CSS/JS 核心概念、浏览器原理
- **手写代码题**：Promise实现、防抖节流、深拷贝、设计模式
- **项目实战**：STAR法则、技术难点、架构设计、性能优化
- **算法与数据结构**：常用算法、数据结构、LeetCode 题解

## 📁 项目结构

```text
docs/
├── .vitepress/
│   ├── config.mjs          # VitePress 配置文件
│   └── theme/
│       ├── index.js        # 自定义主题入口 (含 Mermaid 集成)
│       └── style.css       # 主题样式定制
├── frontend/               # 前端技术栈
│   ├── basics/            # 前端基础 (HTML/CSS/JS/TS)
│   ├── vue/               # Vue 生态系统
│   ├── react/             # React 生态系统
│   ├── frameworks/        # 框架对比选择
│   ├── tools/             # 前端工具链
│   │   ├── git/          # Git 版本控制
│   │   ├── build/        # 构建工具
│   │   ├── package-manager/ # 包管理器
│   │   └── environment/  # 开发环境
│   ├── ui/               # UI 组件库
│   │   ├── vue/         # Vue UI 库
│   │   ├── react/       # React UI 库
│   │   └── design/      # 组件设计系统
│   └── performance/      # 性能优化
├── interview/            # 面试突破指南
│   ├── questions/       # 基础面试题
│   ├── coding/         # 手写代码题
│   ├── projects/       # 项目实战面试
│   └── algorithms/     # 算法与数据结构
└── index.md           # 首页 (一屏式设计)
```

## 🔧 技术栈

- **框架**：VitePress 1.6.4 (最新版)
- **构建工具**：Vite 5.x
- **包管理器**：pnpm 9.x
- **图表支持**：Mermaid 11.x
- **部署**：GitHub Pages
- **CI/CD**：GitHub Actions

## 📊 图表支持

集成 Mermaid 图表库，支持多种可视化图表：

- 🔄 **流程图**：业务流程、决策树、系统架构
- 📈 **时序图**：API交互、用户行为、系统通信
- 🏗️ **类图**：面向对象设计、系统建模
- 📅 **甘特图**：项目计划、时间管理
- 🥧 **饼图**：数据统计、比例展示
- 🌳 **思维导图**：知识结构、技术栈梳理

## 📝 内容规划

### 已完成 ✅

- [x] 项目基础架构搭建
- [x] VitePress 1.6.4 升级配置
- [x] 现代化首页设计（一屏式布局）
- [x] 完整导航和侧边栏体系
- [x] 响应式主题样式定制
- [x] Mermaid 图表集成
- [x] 前端知识体系框架搭建
- [x] 面试宝典基础内容

### 进行中 🚧

- [ ] Vue3 深度解析内容完善
- [ ] React18 新特性详解
- [ ] 前端工具链实战指南
- [ ] UI组件库对比分析
- [ ] 面试题库持续更新

### 计划中 📋

- [ ] 性能优化实战案例
- [ ] 微前端架构设计
- [ ] 全栈开发实践
- [ ] 开源项目源码分析
- [ ] 前端技术趋势分享

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来完善这个知识库！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- 🌐 [在线访问](https://it-nuanxinpro.github.io/vitePress/) - 博客在线地址
- 📦 [GitHub 仓库](https://github.com/IT-NuanxinPro/NuanXinPro-Notes) - 源码仓库
- 📚 [VitePress 官方文档](https://vitepress.dev/zh/) - 框架文档
- 📊 [Mermaid 官方文档](https://mermaid.js.org/) - 图表语法

## 📈 更新日志

### v2.0.0 (2025-08-14)

- ✨ 升级到 VitePress 1.6.4
- 🎨 重新设计一屏式首页布局
- 📊 集成 Mermaid 图表支持
- 🗂️ 完善前端知识体系架构
- 💼 新增面试突破指南
- 🛠️ 优化前端工具链内容
- 📱 改进响应式设计体验

### v1.0.0 (2024-12-01)

- 🎉 项目初始化
- 🏗️ 基础架构搭建
- 🎨 主题样式定制
- 📝 核心内容框架

---

**💡 记住：技术的学习没有捷径，但有方法。保持好奇心，持续实践，你一定能成为优秀的前端工程师！**

**🚀 让我们一起在前端的道路上不断前行！**
