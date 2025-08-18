# Git Hooks 企业级配置

完整的 Git Hooks 配置方案，包含代码质量检查、提交规范、自动化测试等企业级实践。

## 🎯 Git Hooks 概述

Git Hooks 是在 Git 执行特定事件时触发的脚本，用于自动化代码质量检查和规范执行。

### 核心 Hooks 类型

- **pre-commit**: 提交前执行，用于代码质量检查
- **commit-msg**: 提交信息检查，确保符合规范
- **pre-push**: 推送前执行，运行测试和构建检查
- **post-merge**: 合并后执行，自动安装依赖等

## 🛠️ 工具链配置

### 1. Husky 配置

```bash
# 安装 Husky
npm install husky -D

# 初始化 Husky
npx husky install

# 设置 package.json 脚本
npm pkg set scripts.prepare="husky install"
```

### 2. 项目结构

```
.husky/
├── _/                    # Husky 内部文件
├── pre-commit           # 提交前钩子
├── commit-msg           # 提交信息钩子
├── pre-push             # 推送前钩子
└── post-merge           # 合并后钩子
```

## 📝 Hooks 实现

### 1. pre-commit 钩子

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# 1. 运行 lint-staged
npx lint-staged

# 2. 类型检查（如果使用 TypeScript）
if [ -f "tsconfig.json" ]; then
  echo "🔍 Running TypeScript type check..."
  npx tsc --noEmit
fi

# 3. 运行单元测试
echo "🧪 Running unit tests..."
npm run test:unit

# 4. 检查构建是否成功
echo "🏗️ Checking build..."
npm run build:check

echo "✅ Pre-commit checks passed!"
```

### 2. commit-msg 钩子

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Checking commit message format..."

# 使用 commitlint 检查提交信息
npx --no-install commitlint --edit "$1"

echo "✅ Commit message format is valid!"
```

### 3. pre-push 钩子

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-push checks..."

# 1. 运行完整测试套件
echo "🧪 Running full test suite..."
npm run test

# 2. 运行 E2E 测试
echo "🎭 Running E2E tests..."
npm run test:e2e

# 3. 检查构建
echo "🏗️ Running production build..."
npm run build

# 4. 安全检查
echo "🔒 Running security audit..."
npm audit --audit-level moderate

# 5. 依赖检查
echo "📦 Checking for outdated dependencies..."
npm outdated

echo "✅ Pre-push checks passed!"
```

### 4. post-merge 钩子

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔄 Running post-merge tasks..."

# 检查 package.json 是否有变化
changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

check_run() {
  echo "$changed_files" | grep --quiet "$1" && eval "$2"
}

# 如果 package.json 发生变化，重新安装依赖
check_run "package.json\|pnpm-lock.yaml" "echo '📦 Dependencies changed, running install...' && pnpm install"

# 如果数据库迁移文件发生变化，运行迁移
check_run "migrations/" "echo '🗄️ Running database migrations...' && npm run db:migrate"

# 如果环境配置发生变化，提醒开发者
check_run ".env.example" "echo '⚠️ Environment configuration changed, please update your .env file'"

echo "✅ Post-merge tasks completed!"
```

## 🔧 lint-staged 配置

### package.json 配置

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ],
    "*.{png,jpg,jpeg,gif,svg}": [
      "imagemin-lint-staged"
    ]
  }
}
```

### 独立配置文件

```javascript
// lint-staged.config.js
module.exports = {
  // JavaScript/TypeScript 文件
  '*.{js,jsx,ts,tsx,vue}': [
    'eslint --fix',
    'prettier --write',
    'git add'
  ],
  
  // 样式文件
  '*.{css,scss,less,styl}': [
    'stylelint --fix',
    'prettier --write',
    'git add'
  ],
  
  // 配置文件
  '*.{json,md,yml,yaml}': [
    'prettier --write',
    'git add'
  ],
  
  // 图片优化
  '*.{png,jpg,jpeg,gif,svg}': [
    'imagemin-lint-staged',
    'git add'
  ],
  
  // 包管理文件
  'package.json': [
    'sort-package-json',
    'prettier --write',
    'git add'
  ]
}
```

## 📋 Commitlint 配置

### 基础配置

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 类型枚举
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复
        'docs',     // 文档
        'style',    // 格式
        'refactor', // 重构
        'perf',     // 性能优化
        'test',     // 测试
        'chore',    // 构建过程或辅助工具的变动
        'revert',   // 回滚
        'build',    // 构建系统或外部依赖项的更改
        'ci'        // CI 配置文件和脚本的更改
      ]
    ],
    // 主题长度限制
    'subject-max-length': [2, 'always', 50],
    // 主题不能为空
    'subject-empty': [2, 'never'],
    // 主题格式
    'subject-case': [2, 'always', 'lower-case'],
    // 类型不能为空
    'type-empty': [2, 'never'],
    // 类型格式
    'type-case': [2, 'always', 'lower-case']
  }
}
```

### 自定义规则

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 自定义类型
    'type-enum': [
      2,
      'always',
      [
        'feat',     // ✨ 新功能
        'fix',      // 🐛 修复
        'docs',     // 📝 文档
        'style',    // 💄 格式
        'refactor', // ♻️ 重构
        'perf',     // ⚡ 性能优化
        'test',     // ✅ 测试
        'chore',    // 🔧 构建/工具
        'revert',   // ⏪ 回滚
        'build',    // 📦 构建
        'ci',       // 👷 CI
        'release'   // 🔖 发布
      ]
    ],
    
    // 范围枚举（可选）
    'scope-enum': [
      2,
      'always',
      [
        'core',
        'ui',
        'api',
        'auth',
        'router',
        'store',
        'utils',
        'config',
        'deps'
      ]
    ],
    
    // 主题必须以小写开头
    'subject-case': [2, 'always', 'lower-case'],
    
    // 主题不能以句号结尾
    'subject-full-stop': [2, 'never', '.'],
    
    // 正文每行最大长度
    'body-max-line-length': [2, 'always', 100],
    
    // 页脚每行最大长度
    'footer-max-line-length': [2, 'always', 100]
  }
}
```

## 🎨 提交信息模板

### Commitizen 配置

```bash
# 安装 Commitizen
npm install commitizen cz-conventional-changelog -D

# 配置 package.json
npm pkg set scripts.commit="cz"
npm pkg set config.commitizen.path="cz-conventional-changelog"
```

### 自定义提交模板

```javascript
// .cz-config.js
module.exports = {
  types: [
    { value: 'feat', name: '✨ feat:     新功能' },
    { value: 'fix', name: '🐛 fix:      修复' },
    { value: 'docs', name: '📝 docs:     文档变更' },
    { value: 'style', name: '💄 style:    代码格式' },
    { value: 'refactor', name: '♻️ refactor: 重构' },
    { value: 'perf', name: '⚡ perf:     性能优化' },
    { value: 'test', name: '✅ test:     测试' },
    { value: 'chore', name: '🔧 chore:    构建/工具' },
    { value: 'revert', name: '⏪ revert:   回滚' },
    { value: 'build', name: '📦 build:    构建系统' },
    { value: 'ci', name: '👷 ci:       CI 配置' }
  ],
  
  scopes: [
    { name: 'core' },
    { name: 'ui' },
    { name: 'api' },
    { name: 'auth' },
    { name: 'router' },
    { name: 'store' },
    { name: 'utils' },
    { name: 'config' },
    { name: 'deps' }
  ],
  
  messages: {
    type: '选择提交类型:',
    scope: '选择修改范围 (可选):',
    customScope: '请输入修改范围:',
    subject: '请简要描述提交 (必填):',
    body: '请输入详细描述 (可选):',
    breaking: '列出任何破坏性变更 (可选):',
    footer: '请输入要关闭的 issue (可选):',
    confirmCommit: '确认使用以上信息提交？'
  },
  
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 50,
  breaklineChar: '|',
  footerPrefix: 'ISSUES CLOSED:'
}
```

## 🚀 高级配置

### 条件执行

```bash
#!/usr/bin/env sh
# pre-commit 条件执行示例

# 只在特定分支执行完整检查
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" = "main" ] || [ "$branch" = "develop" ]; then
  echo "🔍 Running full checks on $branch branch..."
  npm run test:full
else
  echo "🔍 Running basic checks on $branch branch..."
  npm run test:unit
fi
```

### 性能优化

```bash
#!/usr/bin/env sh
# 并行执行多个检查

# 后台运行测试
npm run test:unit &
TEST_PID=$!

# 后台运行 lint
npx lint-staged &
LINT_PID=$!

# 等待所有任务完成
wait $TEST_PID
wait $LINT_PID

echo "✅ All checks completed!"
```

## 💡 最佳实践

### 1. 渐进式引入

```bash
# 开始时只启用基础检查
echo "npx lint-staged" > .husky/pre-commit

# 逐步增加更多检查
echo "npm run test:unit" >> .husky/pre-commit
echo "npm run type-check" >> .husky/pre-commit
```

### 2. 团队协作

```json
{
  "scripts": {
    "prepare": "husky install",
    "hooks:install": "husky install && chmod +x .husky/*",
    "hooks:uninstall": "husky uninstall"
  }
}
```

### 3. CI/CD 集成

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

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
      - name: Run the same checks as pre-commit
        run: |
          npx lint-staged
          npm run test
          npm run build
```

这套 Git Hooks 配置确保了代码质量的一致性，提高了团队协作效率，是企业级项目的必备配置。
