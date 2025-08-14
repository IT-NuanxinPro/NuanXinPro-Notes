# Git 分支策略指南

现代前端开发中，选择合适的分支策略对团队协作和项目管理至关重要。本指南介绍主流分支策略及其在前端项目中的最佳实践。

## 🌊 Git Flow 策略

### 概述

Git Flow 是最经典的分支管理策略，适合有明确发布周期的大型项目。

### 分支结构

```
main (生产分支)
├── develop (开发分支)
│   ├── feature/user-auth (功能分支)
│   ├── feature/shopping-cart (功能分支)
│   └── feature/payment-system (功能分支)
├── release/v1.2.0 (发布分支)
└── hotfix/critical-bug (热修复分支)
```

### 分支说明

- **main**: 生产环境分支，始终保持可发布状态
- **develop**: 开发分支，集成所有功能开发
- **feature/***: 功能分支，从 develop 分出，完成后合并回 develop
- **release/***: 发布分支，从 develop 分出，用于发布准备
- **hotfix/***: 热修复分支，从 main 分出，紧急修复生产问题

### 工作流程

```bash
# 1. 开始新功能开发
git checkout develop
git pull origin develop
git checkout -b feature/user-dashboard

# 2. 功能开发完成，合并到 develop
git checkout develop
git merge --no-ff feature/user-dashboard
git push origin develop
git branch -d feature/user-dashboard

# 3. 准备发布
git checkout develop
git checkout -b release/v1.2.0
# 进行发布准备工作（版本号更新、文档等）

# 4. 发布完成
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git checkout develop
git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0

# 5. 紧急修复
git checkout main
git checkout -b hotfix/security-patch
# 修复问题
git checkout main
git merge --no-ff hotfix/security-patch
git tag -a v1.2.1 -m "Hotfix version 1.2.1"
git checkout develop
git merge --no-ff hotfix/security-patch
git branch -d hotfix/security-patch
```

### 前端项目配置

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "deploy:staging": "npm run build:staging && deploy-to-staging",
    "deploy:production": "npm run build:production && deploy-to-production"
  }
}
```

## 🚀 GitHub Flow 策略

### 概述

GitHub Flow 是简化的分支策略，适合持续部署的现代前端项目。

### 分支结构

```
main (主分支)
├── feature/responsive-design
├── feature/dark-mode
└── hotfix/mobile-layout
```

### 工作流程

```bash
# 1. 创建功能分支
git checkout main
git pull origin main
git checkout -b feature/responsive-design

# 2. 开发和提交
git add .
git commit -m "feat: add responsive breakpoints"
git push origin feature/responsive-design

# 3. 创建 Pull Request
# 在 GitHub 上创建 PR，进行代码审查

# 4. 合并到主分支
# PR 审查通过后，合并到 main
git checkout main
git pull origin main
git branch -d feature/responsive-design
```

### CI/CD 配置

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: npm run deploy:production
```

## 🦊 GitLab Flow 策略

### 概述

GitLab Flow 结合了 Git Flow 和 GitHub Flow 的优点，支持多环境部署。

### 环境分支策略

```
main (开发环境)
├── pre-production (预生产环境)
└── production (生产环境)
```

### 功能开发流程

```bash
# 1. 功能开发
git checkout main
git checkout -b feature/user-profile

# 2. 开发完成，合并到 main
git checkout main
git merge feature/user-profile
git push origin main

# 3. 部署到预生产环境
git checkout pre-production
git merge main
git push origin pre-production

# 4. 测试通过，部署到生产环境
git checkout production
git merge pre-production
git push origin production
```

## 🔄 现代前端分支策略

### Trunk-based Development

适合高频部署的现代前端项目：

```bash
# 短生命周期分支
git checkout main
git checkout -b feature/quick-fix
# 快速开发（1-2天内完成）
git checkout main
git merge feature/quick-fix
git push origin main
```

### Feature Flags 策略

结合特性开关的分支策略：

```javascript
// 特性开关配置
const featureFlags = {
  newUserDashboard: process.env.FEATURE_NEW_DASHBOARD === 'true',
  darkMode: process.env.FEATURE_DARK_MODE === 'true',
  experimentalUI: process.env.FEATURE_EXPERIMENTAL_UI === 'true'
}

// 组件中使用
function UserDashboard() {
  if (featureFlags.newUserDashboard) {
    return <NewDashboard />
  }
  return <LegacyDashboard />
}
```

## 🛠️ 分支策略工具

### Git Flow 工具

```bash
# 安装 git-flow
brew install git-flow-avh  # macOS
apt-get install git-flow   # Ubuntu

# 初始化 git-flow
git flow init

# 开始新功能
git flow feature start user-auth

# 完成功能
git flow feature finish user-auth

# 开始发布
git flow release start v1.2.0

# 完成发布
git flow release finish v1.2.0
```

### 自动化脚本

```bash
#!/bin/bash
# create-feature.sh
feature_name=$1
if [ -z "$feature_name" ]; then
  echo "Usage: ./create-feature.sh <feature-name>"
  exit 1
fi

git checkout develop
git pull origin develop
git checkout -b "feature/$feature_name"
echo "Created feature branch: feature/$feature_name"
```

## 📋 分支策略选择指南

### 项目规模对比

| 策略 | 适用项目 | 团队规模 | 发布频率 | 复杂度 |
|------|----------|----------|----------|--------|
| Git Flow | 大型项目 | 10+ 人 | 定期发布 | 高 |
| GitHub Flow | 中小型项目 | 3-10 人 | 持续部署 | 低 |
| GitLab Flow | 企业项目 | 5-15 人 | 多环境部署 | 中 |
| Trunk-based | 敏捷项目 | 任意 | 高频部署 | 低 |

### Vue 3 项目推荐

```bash
# 小型 Vue 3 项目 - GitHub Flow
main
├── feature/composition-api-refactor
├── feature/vue-router-v4
└── feature/pinia-integration

# 大型 Vue 3 项目 - Git Flow
main
├── develop
│   ├── feature/admin-dashboard
│   ├── feature/user-management
│   └── feature/reporting-system
└── release/v2.0.0
```

### React 18 项目推荐

```bash
# React 18 + Next.js - GitLab Flow
main (开发)
├── staging (预生产)
├── production (生产)
└── feature/server-components

# React 18 + Vite - GitHub Flow
main
├── feature/concurrent-features
├── feature/suspense-integration
└── feature/react-18-migration
```

## 💡 最佳实践

### 1. 分支命名规范

```bash
# 功能分支
feature/JIRA-123-user-authentication
feature/add-dark-mode-support
feature/improve-mobile-responsiveness

# 修复分支
fix/JIRA-456-login-validation-error
fix/memory-leak-in-dashboard
hotfix/critical-security-vulnerability

# 发布分支
release/v1.2.0
release/2024-q1-features

# 实验分支
experiment/new-ui-framework
experiment/performance-optimization
```

### 2. 合并策略

```bash
# 保留提交历史
git merge --no-ff feature/user-auth

# 压缩合并（简化历史）
git merge --squash feature/user-auth
git commit -m "feat: add user authentication system"

# 变基合并（线性历史）
git rebase main
git checkout main
git merge feature/user-auth
```

### 3. 分支保护规则

```yaml
# GitHub 分支保护配置
branch_protection:
  main:
    required_status_checks:
      - ci/tests
      - ci/build
      - ci/lint
    required_pull_request_reviews:
      required_approving_review_count: 2
    enforce_admins: true
    restrictions:
      users: []
      teams: ["frontend-team"]
```

选择合适的分支策略需要考虑团队规模、项目复杂度、发布频率等因素。建议从简单策略开始，随着项目发展逐步优化。
