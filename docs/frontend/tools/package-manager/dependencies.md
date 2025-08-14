# 依赖策略管理指南

现代前端项目的依赖管理是确保项目稳定性、安全性和可维护性的关键。本指南涵盖 npm、yarn、pnpm 的最佳实践。

## 📦 包管理器选择

### 性能对比

| 特性 | npm | yarn | pnpm |
|------|-----|------|------|
| 安装速度 | 中等 | 快 | 最快 |
| 磁盘空间 | 大 | 大 | 最小 |
| 锁文件 | package-lock.json | yarn.lock | pnpm-lock.yaml |
| Monorepo 支持 | 基础 | 良好 | 优秀 |
| 安全性 | 良好 | 良好 | 优秀 |

### 推荐选择策略

```bash
# 新项目推荐 - pnpm
npm install -g pnpm
pnpm create vue@latest my-project

# 企业项目 - yarn
npm install -g yarn
yarn create react-app my-app

# 简单项目 - npm
npm init vue@latest my-project
```

## 🔒 版本控制策略

### 语义化版本控制

```json
{
  "dependencies": {
    "vue": "^3.4.0",           // 兼容版本更新
    "react": "~18.2.0",        // 补丁版本更新
    "lodash": "4.17.21",       // 精确版本
    "axios": ">=1.0.0 <2.0.0"  // 范围版本
  }
}
```

### 版本符号说明

```bash
# ^ 兼容版本更新 (推荐)
"vue": "^3.4.0"     # 允许 3.4.0 <= version < 4.0.0

# ~ 补丁版本更新
"react": "~18.2.0"  # 允许 18.2.0 <= version < 18.3.0

# 精确版本 (关键依赖)
"typescript": "5.3.3"

# 范围版本
"node": ">=18.0.0"
```

### 依赖分类管理

```json
{
  "dependencies": {
    // 生产环境依赖
    "vue": "^3.4.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    // 开发环境依赖
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.3.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  },
  "peerDependencies": {
    // 对等依赖 (库开发)
    "vue": ">=3.0.0"
  },
  "optionalDependencies": {
    // 可选依赖
    "fsevents": "^2.3.0"
  }
}
```

## 🛡️ 安全审计策略

### 自动化安全检查

```bash
# npm 安全审计
npm audit
npm audit fix                    # 自动修复
npm audit fix --force           # 强制修复

# yarn 安全审计
yarn audit
yarn audit --level moderate     # 指定严重级别

# pnpm 安全审计
pnpm audit
pnpm audit --fix                # 自动修复
```

### 安全配置

```json
{
  "scripts": {
    "security:audit": "npm audit --audit-level moderate",
    "security:fix": "npm audit fix",
    "security:check": "npm audit --json | npm-audit-html --output audit-report.html"
  },
  "auditConfig": {
    "report-type": "summary",
    "audit-level": "moderate"
  }
}
```

### 依赖安全工具

```bash
# 安装安全检查工具
npm install -g npm-check-updates
npm install -g depcheck
npm install -g bundlephobia-cli

# 检查过时依赖
ncu                             # 检查更新
ncu -u                          # 更新 package.json

# 检查未使用依赖
depcheck

# 检查包大小
bundlephobia lodash
```

## 📊 依赖分析与优化

### Bundle 分析

```bash
# Webpack Bundle Analyzer
npm install -D webpack-bundle-analyzer

# Vite Bundle Analyzer
npm install -D rollup-plugin-visualizer

# 分析脚本
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer dist/static/js/*.js",
    "analyze:vite": "vite build && npx vite-bundle-analyzer"
  }
}
```

### 依赖优化策略

```javascript
// vite.config.js - 依赖优化
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue', 'vue-router'], // 外部化大型依赖
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['lodash', 'dayjs'],
          ui: ['element-plus']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
    exclude: ['@vueuse/core']
  }
})
```

### 依赖替换策略

```json
{
  "dependencies": {
    // 轻量级替代方案
    "dayjs": "^1.11.0",          // 替代 moment.js
    "lodash-es": "^4.17.21",     // 替代 lodash (支持 tree-shaking)
    "axios": "^1.6.0"            // 替代 fetch polyfill
  }
}
```

## 🔄 依赖更新策略

### 渐进式更新

```bash
# 1. 检查可更新依赖
npm outdated
yarn outdated
pnpm outdated

# 2. 更新补丁版本
npm update
yarn upgrade --patch

# 3. 更新次要版本
npm update --save
yarn upgrade --minor

# 4. 更新主要版本 (谨慎)
npm install package@latest
yarn add package@latest
```

### 自动化更新工具

```json
{
  "scripts": {
    "deps:check": "ncu",
    "deps:update:patch": "ncu -u --target patch",
    "deps:update:minor": "ncu -u --target minor",
    "deps:update:major": "ncu -u --target latest",
    "deps:clean": "rm -rf node_modules package-lock.json && npm install"
  }
}
```

### 更新测试流程

```bash
#!/bin/bash
# update-deps.sh

echo "🔍 检查依赖更新..."

# 1. 备份当前状态
git add .
git commit -m "chore: backup before dependency update"

# 2. 更新依赖
ncu -u --target minor
npm install

# 3. 运行测试
npm run test
npm run build

# 4. 检查结果
if [ $? -eq 0 ]; then
  echo "✅ 依赖更新成功"
  git add .
  git commit -m "chore: update dependencies"
else
  echo "❌ 依赖更新失败，回滚..."
  git reset --hard HEAD~1
fi
```

## 🏗️ Monorepo 依赖管理

### pnpm Workspace 配置

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'
```

```json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Yarn Workspaces 配置

```json
{
  "name": "my-workspace",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "build": "yarn workspaces run build",
    "test": "yarn workspaces run test"
  }
}
```

### 依赖提升策略

```json
{
  "name": "@my-org/shared-ui",
  "dependencies": {
    "vue": "workspace:^3.4.0",      // 使用 workspace 版本
    "lodash": "^4.17.21"
  },
  "peerDependencies": {
    "vue": ">=3.0.0"
  }
}
```

## 🎯 特定框架依赖策略

### Vue 3 项目依赖

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "@vueuse/core": "^10.7.0",
    "element-plus": "^2.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "@vue/tsconfig": "^0.5.0",
    "unplugin-auto-import": "^0.17.0",
    "unplugin-vue-components": "^0.26.0"
  }
}
```

### React 18 项目依赖

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint-plugin-react-hooks": "^4.6.0"
  }
}
```

## 🔧 依赖管理工具

### 包管理器配置

```bash
# .npmrc
registry=https://registry.npmjs.org/
save-exact=false
package-lock=true
audit-level=moderate

# .yarnrc.yml
nodeLinker: node-modules
yarnPath: .yarn/releases/yarn-4.0.0.cjs

# .pnpmrc
registry=https://registry.npmjs.org/
auto-install-peers=true
strict-peer-dependencies=false
```

### 私有包管理

```json
{
  "publishConfig": {
    "registry": "https://npm.company.com/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/company/package.git"
  }
}
```

## 📋 依赖管理检查清单

### 新项目设置

- [ ] 选择合适的包管理器
- [ ] 配置 .npmrc/.yarnrc/.pnpmrc
- [ ] 设置依赖版本策略
- [ ] 配置安全审计
- [ ] 设置自动化更新流程

### 日常维护

- [ ] 定期检查依赖更新
- [ ] 运行安全审计
- [ ] 清理未使用依赖
- [ ] 监控包大小变化
- [ ] 更新锁文件

### 发布前检查

- [ ] 确认生产依赖正确
- [ ] 验证版本兼容性
- [ ] 运行完整测试套件
- [ ] 检查 bundle 大小
- [ ] 验证安全漏洞

## 💡 最佳实践总结

### 1. 版本管理
- 使用语义化版本控制
- 生产依赖使用 ^ 符号
- 关键依赖锁定精确版本

### 2. 安全管理
- 定期运行安全审计
- 及时更新安全补丁
- 使用可信的包源

### 3. 性能优化
- 定期分析 bundle 大小
- 使用轻量级替代方案
- 合理配置代码分割

### 4. 团队协作
- 统一包管理器选择
- 提交锁文件到版本控制
- 建立依赖更新流程

良好的依赖管理策略是项目长期稳定发展的基础，建议团队制定明确的依赖管理规范并严格执行。
