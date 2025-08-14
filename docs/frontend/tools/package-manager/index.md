# 前端包管理器完全指南

包管理器是现代前端开发的基础工具，掌握不同包管理器的特点和使用方法对提升开发效率至关重要。

## 📦 包管理器对比

### 主流包管理器特点

| 特性 | npm | yarn | pnpm |
|------|-----|------|------|
| **安装速度** | 中等 | 快 | 最快 |
| **磁盘占用** | 大 | 大 | 最小 |
| **离线支持** | 有 | 优秀 | 有 |
| **安全性** | 好 | 优秀 | 好 |
| **Monorepo** | 基础 | 优秀 | 优秀 |
| **学习成本** | 低 | 低 | 中等 |

## 🚀 npm 使用指南

### 基础操作

```bash
# 初始化项目
npm init
npm init -y                  # 使用默认配置

# 安装依赖
npm install                  # 安装所有依赖
npm install lodash           # 安装生产依赖
npm install -D webpack       # 安装开发依赖
npm install -g @vue/cli      # 全局安装

# 卸载依赖
npm uninstall lodash
npm uninstall -D webpack
npm uninstall -g @vue/cli

# 更新依赖
npm update                   # 更新所有依赖
npm update lodash            # 更新指定依赖
npm outdated                 # 查看过期依赖
```

### 版本管理

```bash
# 查看版本
npm --version
npm list                     # 查看依赖树
npm list --depth=0           # 只显示顶层依赖
npm list lodash              # 查看指定包版本

# 安装指定版本
npm install lodash@4.17.21
npm install lodash@^4.17.0   # 兼容版本
npm install lodash@~4.17.0   # 补丁版本
npm install lodash@latest    # 最新版本
npm install lodash@beta      # 预发布版本
```

### 脚本和配置

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext .js,.vue",
    "lint:fix": "eslint src --ext .js,.vue --fix",
    "type-check": "vue-tsc --noEmit"
  },
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0"
  },
  "devDependencies": {
    "vite": "^4.4.0",
    "@vitejs/plugin-vue": "^4.3.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}
```

## ⚡ yarn 使用指南

### 基础操作

```bash
# 安装 yarn
npm install -g yarn

# 初始化项目
yarn init
yarn init -y

# 安装依赖
yarn                         # 安装所有依赖
yarn add lodash              # 添加生产依赖
yarn add -D webpack          # 添加开发依赖
yarn global add @vue/cli     # 全局安装

# 移除依赖
yarn remove lodash
yarn global remove @vue/cli

# 更新依赖
yarn upgrade                 # 更新所有依赖
yarn upgrade lodash          # 更新指定依赖
yarn outdated                # 查看过期依赖
```

### Yarn 2+ (Berry) 特性

```bash
# 启用 Yarn 2+
yarn set version berry

# 零安装模式
yarn config set nodeLinker pnp

# 工作区管理
yarn workspaces foreach run build
yarn workspace @my/package add lodash

# 插件系统
yarn plugin import @yarnpkg/plugin-interactive-tools
yarn upgrade-interactive
```

## 🔥 pnpm 使用指南

### 安装和基础操作

```bash
# 安装 pnpm
npm install -g pnpm
# 或使用官方脚本
curl -fsSL https://get.pnpm.io/install.sh | sh -

# 基础操作
pnpm init
pnpm install                 # 安装依赖
pnpm add lodash              # 添加依赖
pnpm add -D webpack          # 添加开发依赖
pnpm add -g @vue/cli         # 全局安装

# 移除依赖
pnpm remove lodash
pnpm remove -g @vue/cli

# 更新依赖
pnpm update                  # 更新所有依赖
pnpm update lodash           # 更新指定依赖
pnpm outdated                # 查看过期依赖
```

### pnpm 独有特性

```bash
# 查看存储信息
pnpm store status
pnpm store prune             # 清理未使用的包

# 工作区管理
pnpm -r run build            # 在所有工作区运行命令
pnpm --filter @my/package add lodash

# 依赖分析
pnpm why lodash              # 查看依赖原因
pnpm list --depth=0          # 查看顶层依赖
```

### pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - '!**/test/**'
```

## 🔧 高级配置

### .npmrc 配置

```bash
# 项目根目录 .npmrc
registry=https://registry.npmmirror.com/
save-exact=true
engine-strict=true
auto-install-peers=true

# 全局配置
npm config set registry https://registry.npmmirror.com/
npm config set save-exact true
npm config list              # 查看配置
```

### 私有包管理

```bash
# 发布包
npm login
npm publish

# 私有仓库
npm config set @mycompany:registry https://npm.mycompany.com/
npm install @mycompany/private-package

# 作用域包
npm init --scope=@mycompany
npm publish --access public
```

## 🌐 镜像源管理

### 常用镜像源

```bash
# 淘宝镜像
npm config set registry https://registry.npmmirror.com/

# 官方源
npm config set registry https://registry.npmjs.org/

# 腾讯云镜像
npm config set registry https://mirrors.cloud.tencent.com/npm/

# 华为云镜像
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
```

### nrm 镜像管理工具

```bash
# 安装 nrm
npm install -g nrm

# 查看可用镜像
nrm ls

# 切换镜像
nrm use taobao
nrm use npm

# 测试镜像速度
nrm test

# 添加自定义镜像
nrm add company https://npm.company.com/
```

## 📊 性能优化

### 缓存管理

```bash
# npm 缓存
npm cache verify             # 验证缓存
npm cache clean --force      # 清理缓存

# yarn 缓存
yarn cache list              # 查看缓存
yarn cache clean             # 清理缓存

# pnpm 缓存
pnpm store status            # 查看存储状态
pnpm store prune             # 清理存储
```

### 安装优化

```bash
# 并行安装
npm install --prefer-offline # 优先使用缓存
yarn install --frozen-lockfile # 使用锁定文件
pnpm install --frozen-lockfile

# 跳过可选依赖
npm install --no-optional
yarn install --ignore-optional
pnpm install --no-optional

# 生产环境安装
npm ci                       # 基于 package-lock.json 安装
yarn install --production
pnpm install --prod
```

## 🔒 安全最佳实践

### 依赖安全

```bash
# 安全审计
npm audit                    # 检查漏洞
npm audit fix                # 自动修复
npm audit fix --force        # 强制修复

yarn audit                   # yarn 审计
pnpm audit                   # pnpm 审计

# 检查过期依赖
npm outdated
yarn outdated
pnpm outdated
```

### 锁定文件

```bash
# 锁定文件的重要性
package-lock.json            # npm
yarn.lock                    # yarn
pnpm-lock.yaml              # pnpm

# 提交锁定文件到版本控制
git add package-lock.json
git commit -m "chore: update dependencies"
```

## 🏗️ Monorepo 管理

### Lerna + npm/yarn

```bash
# 安装 Lerna
npm install -g lerna

# 初始化 Monorepo
lerna init

# 创建包
lerna create @my/package-a
lerna create @my/package-b

# 安装依赖
lerna bootstrap              # 安装所有依赖
lerna add lodash --scope=@my/package-a

# 发布
lerna publish
```

### pnpm Workspaces

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```bash
# 工作区命令
pnpm -r run build            # 所有包运行构建
pnpm --filter @my/app run dev # 指定包运行开发
pnpm add lodash -w           # 根目录添加依赖
```

## 💡 最佳实践

### 1. 选择合适的包管理器

```bash
# 小型项目
npm                          # 简单直接

# 中大型项目
yarn                         # 稳定可靠

# Monorepo 或性能要求高
pnpm                         # 高效节省空间
```

### 2. 版本管理策略

```json
{
  "dependencies": {
    "vue": "^3.3.0",         // 兼容版本更新
    "lodash": "4.17.21",     // 锁定版本
    "axios": "~1.5.0"        // 补丁版本更新
  }
}
```

### 3. 脚本组织

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint src",
    "lint:fix": "eslint src --fix",
    "type-check": "vue-tsc --noEmit",
    "clean": "rimraf dist node_modules",
    "reinstall": "npm run clean && npm install"
  }
}
```

### 4. 团队协作

- 统一包管理器版本
- 提交锁定文件
- 定期更新依赖
- 使用 engines 字段限制版本
- 配置 .nvmrc 文件

掌握包管理器的使用是前端开发的基本功，选择合适的工具能显著提升开发效率。
