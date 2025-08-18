# Monorepo 管理完全指南

Monorepo（单一代码仓库）是一种将多个相关项目存储在同一个代码仓库中的软件开发策略。本指南将深入探讨 Monorepo 的概念、实施方法和最佳实践。

## 🏗️ 什么是 Monorepo

### 核心概念

Monorepo 是指在单个版本控制仓库中管理多个项目、包或服务的开发模式。与传统的多仓库（Polyrepo）模式相比，Monorepo 将相关的代码集中管理。

```
monorepo/
├── packages/
│   ├── ui-components/     # 共享 UI 组件库
│   ├── utils/            # 工具函数库
│   └── icons/            # 图标库
├── apps/
│   ├── web-app/          # Web 应用
│   ├── mobile-app/       # 移动应用
│   └── admin-dashboard/  # 管理后台
├── tools/
│   ├── build-scripts/    # 构建脚本
│   └── eslint-config/    # ESLint 配置
└── docs/                 # 文档
```

### Monorepo vs Polyrepo

| 特性 | Monorepo | Polyrepo |
|------|----------|----------|
| **代码共享** | 容易 | 困难 |
| **依赖管理** | 统一 | 分散 |
| **版本控制** | 统一 | 独立 |
| **构建配置** | 共享 | 重复 |
| **团队协作** | 透明 | 隔离 |
| **CI/CD** | 复杂 | 简单 |

## 🎯 用例和场景

### 适合 Monorepo 的场景

#### 1. 微前端架构
```javascript
// 共享组件库
packages/
├── shared-components/
│   ├── Button/
│   ├── Modal/
│   └── Form/
└── shared-utils/
    ├── api/
    ├── auth/
    └── validation/

// 多个前端应用
apps/
├── user-portal/          # 用户门户
├── admin-panel/          # 管理面板
└── mobile-app/           # 移动应用
```

#### 2. 组件库生态
```javascript
packages/
├── core/                 # 核心组件
├── icons/               # 图标库
├── themes/              # 主题包
├── utils/               # 工具函数
└── playground/          # 组件演示
```

#### 3. 全栈应用
```javascript
apps/
├── frontend/            # 前端应用
├── backend/             # 后端 API
├── mobile/              # 移动应用
└── desktop/             # 桌面应用

packages/
├── shared-types/        # 共享类型定义
├── shared-utils/        # 共享工具
└── shared-config/       # 共享配置
```

### 不适合 Monorepo 的场景

- 完全独立的项目
- 不同技术栈的项目
- 安全要求极高的项目
- 团队规模过大且分布式

## 🏢 企业开发环境集成

### 团队协作模式

#### 1. 代码所有权模型
```yaml
# CODEOWNERS 文件
# 全局所有者
* @team-leads

# 包级别所有者
/packages/ui-components/ @frontend-team
/packages/api-client/ @backend-team
/apps/admin-dashboard/ @admin-team

# 工具和配置
/tools/ @devops-team
/.github/ @devops-team
```

#### 2. 分支策略
```bash
# 功能分支模式
main                     # 主分支
├── develop             # 开发分支
├── feature/user-auth   # 功能分支
├── feature/ui-redesign # 功能分支
└── hotfix/security-fix # 热修复分支
```

### CI/CD 集成

#### 1. 智能构建策略
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      packages: ${{ steps.changes.outputs.packages }}
      apps: ${{ steps.changes.outputs.apps }}
    steps:
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            packages:
              - 'packages/**'
            apps:
              - 'apps/**'

  test-packages:
    needs: changes
    if: ${{ needs.changes.outputs.packages == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - name: Test packages
        run: pnpm --filter "./packages/*" test

  test-apps:
    needs: changes
    if: ${{ needs.changes.outputs.apps == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - name: Test apps
        run: pnpm --filter "./apps/*" test
```

#### 2. 部署策略
```yaml
# 渐进式部署
deploy:
  strategy:
    matrix:
      app: [web-app, admin-dashboard, mobile-app]
  steps:
    - name: Deploy ${{ matrix.app }}
      run: |
        pnpm --filter ${{ matrix.app }} build
        pnpm --filter ${{ matrix.app }} deploy
```

## 🛠️ 实际实施指南

### 1. 项目初始化

#### 使用 pnpm 创建 Monorepo
```bash
# 1. 创建项目目录
mkdir my-monorepo && cd my-monorepo

# 2. 初始化根 package.json
pnpm init

# 3. 创建 workspace 配置
cat > pnpm-workspace.yaml << EOF
packages:
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'
EOF

# 4. 创建目录结构
mkdir -p packages apps tools docs
```

#### 根目录配置
```json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "dev": "pnpm -r --parallel dev",
    "clean": "pnpm -r clean && rm -rf node_modules"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

### 2. 创建共享包

#### 创建 UI 组件库
```bash
# 创建组件库包
mkdir packages/ui-components
cd packages/ui-components

# 初始化包
pnpm init
```

```json
{
  "name": "@my-org/ui-components",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "test": "vitest"
  },
  "peerDependencies": {
    "vue": ">=3.0.0"
  },
  "devDependencies": {
    "vue": "^3.4.0",
    "vite": "^5.0.0"
  }
}
```

#### 创建工具库
```bash
# 创建工具库
mkdir packages/utils
cd packages/utils
pnpm init
```

```typescript
// packages/utils/src/index.ts
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
```

### 3. 创建应用

#### Web 应用
```bash
# 创建 Web 应用
mkdir apps/web-app
cd apps/web-app
pnpm init
```

```json
{
  "name": "@my-org/web-app",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@my-org/ui-components": "workspace:*",
    "@my-org/utils": "workspace:*",
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

## 🔧 工具和技术栈

### 主流 Monorepo 工具对比

| 工具 | 特点 | 适用场景 | 学习成本 |
|------|------|----------|----------|
| **pnpm Workspaces** | 快速、节省空间 | 中小型项目 | 低 |
| **Yarn Workspaces** | 稳定、成熟 | 企业项目 | 低 |
| **Lerna** | 发布管理强 | 开源库 | 中 |
| **Nx** | 功能全面 | 大型企业 | 高 |
| **Rush** | 微软出品 | 大型项目 | 高 |
| **Turborepo** | 构建优化 | 性能要求高 | 中 |

### pnpm Workspaces 详细配置

#### 高级 workspace 配置
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'
  - '!**/test/**'
  - '!**/temp/**'
```

#### 依赖管理策略
```bash
# 安装根依赖
pnpm add -w typescript eslint prettier

# 为特定包安装依赖
pnpm --filter @my-org/ui-components add vue
pnpm --filter web-app add @my-org/ui-components

# 安装所有依赖
pnpm install

# 运行特定包的脚本
pnpm --filter @my-org/ui-components build
pnpm --filter web-app dev

# 并行运行所有包的脚本
pnpm -r --parallel dev
```

### Nx 企业级解决方案

#### 安装和初始化
```bash
# 创建 Nx workspace
npx create-nx-workspace@latest my-workspace

# 添加 React 应用
nx g @nrwl/react:app web-app

# 添加库
nx g @nrwl/react:lib ui-components

# 添加 Node.js 应用
nx g @nrwl/node:app api
```

#### Nx 配置文件
```json
{
  "version": 2,
  "projects": {
    "web-app": "apps/web-app",
    "ui-components": "libs/ui-components",
    "api": "apps/api"
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    },
    "test": {
      "inputs": ["default", "^default"]
    }
  }
}
```

### Turborepo 性能优化

#### 安装配置
```bash
# 安装 Turborepo
npm install -g turbo

# 初始化配置
turbo init
```

#### turbo.json 配置
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## 📋 最佳实践

### 1. 项目结构设计

#### 标准目录结构
```
monorepo/
├── apps/                 # 应用程序
│   ├── web/             # Web 应用
│   ├── mobile/          # 移动应用
│   └── desktop/         # 桌面应用
├── packages/            # 共享包
│   ├── ui/              # UI 组件
│   ├── utils/           # 工具函数
│   ├── types/           # 类型定义
│   └── config/          # 配置文件
├── tools/               # 开发工具
│   ├── build/           # 构建工具
│   ├── eslint-config/   # ESLint 配置
│   └── tsconfig/        # TypeScript 配置
├── docs/                # 文档
├── scripts/             # 脚本文件
└── .github/             # GitHub 配置
```

### 2. 依赖管理策略

#### 版本统一管理
```json
{
  "name": "monorepo-root",
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "vitest": "^1.0.0"
  },
  "pnpm": {
    "overrides": {
      "typescript": "^5.0.0",
      "react": "^18.0.0"
    }
  }
}
```

#### 共享配置
```typescript
// packages/tsconfig/base.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

// apps/web-app/tsconfig.json
{
  "extends": "@my-org/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. 构建和发布策略

#### 智能构建脚本
```bash
#!/bin/bash
# scripts/build.sh

# 检测变更的包
CHANGED_PACKAGES=$(pnpm list --filter="[HEAD~1]" --depth=0 --json | jq -r '.[].name')

if [ -z "$CHANGED_PACKAGES" ]; then
  echo "No packages changed, skipping build"
  exit 0
fi

echo "Building changed packages: $CHANGED_PACKAGES"

# 构建变更的包及其依赖
for package in $CHANGED_PACKAGES; do
  pnpm --filter="$package..." build
done
```

#### 版本发布管理
```json
{
  "scripts": {
    "version:patch": "pnpm -r exec -- npm version patch",
    "version:minor": "pnpm -r exec -- npm version minor",
    "version:major": "pnpm -r exec -- npm version major",
    "publish": "pnpm -r publish --access public",
    "changeset": "changeset",
    "changeset:version": "changeset version",
    "changeset:publish": "changeset publish"
  }
}
```

## ⚠️ 常见挑战和解决方案

### 1. 构建性能问题

#### 问题：构建时间过长
```bash
# 解决方案：增量构建
turbo run build --filter="[HEAD~1]"

# 并行构建
pnpm -r --parallel build

# 缓存优化
turbo run build --cache-dir=.turbo
```

#### 问题：依赖循环
```typescript
// 检测循环依赖
npm install -g madge
madge --circular --extensions ts,tsx src/
```

### 2. 依赖管理复杂性

#### 问题：版本冲突
```json
{
  "pnpm": {
    "overrides": {
      "react": "^18.0.0",
      "typescript": "^5.0.0"
    }
  }
}
```

#### 问题：幽灵依赖
```bash
# 使用 pnpm 的严格模式
echo "strict-peer-dependencies=true" >> .pnpmrc
echo "auto-install-peers=false" >> .pnpmrc
```

### 3. 团队协作问题

#### 问题：代码冲突频繁
```yaml
# 使用 CODEOWNERS 文件
/packages/ui-components/ @frontend-team
/packages/api-client/ @backend-team
/apps/admin/ @admin-team
```

#### 问题：CI/CD 时间过长
```yaml
# 智能 CI 配置
jobs:
  detect-changes:
    outputs:
      ui-changed: ${{ steps.changes.outputs.ui }}
      api-changed: ${{ steps.changes.outputs.api }}
    steps:
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            ui: 'packages/ui-components/**'
            api: 'packages/api-client/**'

  test-ui:
    needs: detect-changes
    if: needs.detect-changes.outputs.ui-changed == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: pnpm --filter ui-components test
```

## 🎯 企业级示例

### 电商平台 Monorepo 架构

```
ecommerce-monorepo/
├── apps/
│   ├── customer-web/        # 客户端 Web 应用
│   ├── admin-dashboard/     # 管理后台
│   ├── mobile-app/          # 移动应用
│   └── seller-portal/       # 商家门户
├── packages/
│   ├── ui-components/       # 共享 UI 组件
│   ├── business-logic/      # 业务逻辑
│   ├── api-client/          # API 客户端
│   ├── types/               # 类型定义
│   └── utils/               # 工具函数
├── services/
│   ├── user-service/        # 用户服务
│   ├── product-service/     # 商品服务
│   └── order-service/       # 订单服务
└── tools/
    ├── build-tools/         # 构建工具
    ├── testing-utils/       # 测试工具
    └── deployment/          # 部署脚本
```

### 配置示例

#### 根目录 package.json
```json
{
  "name": "ecommerce-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "deploy:staging": "pnpm run build && pnpm run deploy:apps:staging",
    "deploy:production": "pnpm run build && pnpm run deploy:apps:production"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "turbo": "^1.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### 共享组件包
```typescript
// packages/ui-components/src/Button/Button.vue
<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})

const buttonClasses = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  { 'btn--disabled': props.disabled }
])
</script>
```

#### 业务逻辑包
```typescript
// packages/business-logic/src/cart/cartService.ts
import { ApiClient } from '@ecommerce/api-client'
import { CartItem, Product } from '@ecommerce/types'

export class CartService {
  constructor(private apiClient: ApiClient) {}

  async addToCart(productId: string, quantity: number): Promise<CartItem> {
    return this.apiClient.post('/cart/items', {
      productId,
      quantity
    })
  }

  async removeFromCart(itemId: string): Promise<void> {
    return this.apiClient.delete(`/cart/items/${itemId}`)
  }

  async getCartItems(): Promise<CartItem[]> {
    return this.apiClient.get('/cart/items')
  }
}
```

## 💡 总结

Monorepo 是现代前端开发中的重要架构模式，特别适合：

### 优势
- **代码共享**：组件、工具、配置的高效复用
- **统一管理**：依赖、构建、测试的集中管理
- **原子提交**：跨包的功能可以在单个提交中完成
- **重构便利**：大规模重构更容易执行

### 注意事项
- **工具选择**：根据项目规模选择合适的工具
- **团队培训**：确保团队理解 Monorepo 的工作方式
- **CI/CD 优化**：投入时间优化构建和部署流程
- **权限管理**：合理设置代码所有权和访问权限

选择 Monorepo 需要综合考虑项目规模、团队结构、技术栈等因素。正确实施的 Monorepo 能显著提升开发效率和代码质量。
