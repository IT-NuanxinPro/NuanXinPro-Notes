# Prettier 格式化设置指南

Prettier 是现代前端开发中最受欢迎的代码格式化工具，能够确保团队代码风格的一致性。本指南涵盖完整的配置和集成方案。

## 🚀 快速开始

### 安装 Prettier

```bash
# 安装 Prettier
npm install prettier -D

# 全局安装（可选）
npm install -g prettier

# 检查版本
prettier --version
```

### 基础使用

```bash
# 格式化单个文件
prettier --write src/main.js

# 格式化整个目录
prettier --write src/

# 检查格式（不修改文件）
prettier --check src/

# 格式化特定类型文件
prettier --write "src/**/*.{js,jsx,ts,tsx,vue,css,scss,json,md}"
```

## ⚙️ 配置文件

### .prettierrc 配置

```json
{
  "semi": false,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "none",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto"
}
```

### JavaScript 配置文件

```javascript
// prettier.config.js
module.exports = {
  // 基础配置
  semi: false,                    // 不使用分号
  singleQuote: true,             // 使用单引号
  quoteProps: 'as-needed',       // 仅在需要时给对象属性加引号
  trailingComma: 'none',         // 不使用尾随逗号
  bracketSpacing: true,          // 对象字面量的括号间加空格
  bracketSameLine: false,        // 多行JSX元素的>放在下一行
  arrowParens: 'avoid',          // 箭头函数参数只有一个时不加括号
  
  // 格式化设置
  printWidth: 80,                // 每行最大字符数
  tabWidth: 2,                   // 缩进空格数
  useTabs: false,                // 使用空格而不是tab
  endOfLine: 'lf',               // 换行符使用 lf
  
  // 嵌入式语言格式化
  embeddedLanguageFormatting: 'auto',
  
  // HTML 设置
  htmlWhitespaceSensitivity: 'css',
  
  // Vue 特定设置
  vueIndentScriptAndStyle: false,
  
  // 覆盖特定文件类型
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
        trailingComma: 'none'
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always'
      }
    },
    {
      files: '*.vue',
      options: {
        singleQuote: true,
        semi: false
      }
    }
  ]
}
```

## 🎯 框架特定配置

### Vue 3 项目配置

```javascript
// prettier.config.js - Vue 3 项目
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  
  // Vue 特定配置
  vueIndentScriptAndStyle: false,
  
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue',
        singleQuote: true,
        semi: false,
        printWidth: 100
      }
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
        semi: false,
        singleQuote: true
      }
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss',
        singleQuote: true
      }
    }
  ]
}
```

### React 18 项目配置

```javascript
// prettier.config.js - React 18 项目
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  
  // JSX 特定配置
  jsxSingleQuote: true,
  jsxBracketSameLine: false,
  
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        parser: 'typescript',
        semi: true,
        singleQuote: true,
        trailingComma: 'es5'
      }
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
        trailingComma: 'none'
      }
    },
    {
      files: '*.css',
      options: {
        parser: 'css',
        singleQuote: false
      }
    }
  ]
}
```

### TypeScript 项目配置

```javascript
// prettier.config.js - TypeScript 项目
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  
  overrides: [
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript',
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100
      }
    },
    {
      files: '*.d.ts',
      options: {
        parser: 'typescript',
        printWidth: 120
      }
    }
  ]
}
```

## 🔧 编辑器集成

### VS Code 集成

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.formatDocument": true
  },
  
  // 特定文件类型配置
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.wordWrap": "on"
  },
  
  // Prettier 特定设置
  "prettier.requireConfig": true,
  "prettier.useEditorConfig": false,
  "prettier.resolveGlobalModules": true
}
```

### WebStorm/IntelliJ 集成

```javascript
// 在 WebStorm 中配置 Prettier
// File -> Settings -> Languages & Frameworks -> JavaScript -> Prettier
// 
// 配置项：
// - Prettier package: 选择项目中的 prettier 包
// - Run for files: {**/*,*}.{js,ts,jsx,tsx,vue,css,scss,json,md}
// - On code reformat: 勾选
// - On save: 勾选
```

## 🔗 工具集成

### ESLint 集成

```bash
# 安装 ESLint 和 Prettier 集成插件
npm install -D eslint-config-prettier eslint-plugin-prettier
```

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier' // 必须放在最后，关闭与 Prettier 冲突的规则
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error' // 将 Prettier 规则作为 ESLint 规则
  }
}
```

### Git Hooks 集成

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ],
    "*.{css,scss,less}": [
      "prettier --write",
      "git add"
    ],
    "*.{json,md}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

### CI/CD 集成

```yaml
# .github/workflows/format-check.yml
name: Format Check
on: [push, pull_request]

jobs:
  format-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Check formatting
        run: npx prettier --check "src/**/*.{js,jsx,ts,tsx,vue,css,scss,json,md}"
      - name: Check if formatted
        run: |
          if ! git diff --quiet; then
            echo "Code is not formatted. Please run 'npm run format' and commit the changes."
            exit 1
          fi
```

## 📋 忽略文件配置

### .prettierignore

```bash
# 依赖和构建输出
node_modules/
dist/
build/
coverage/
.next/
.nuxt/
.vuepress/dist/

# 锁文件
package-lock.json
yarn.lock
pnpm-lock.yaml

# 日志文件
*.log

# 环境配置
.env
.env.*

# 编辑器配置
.vscode/
.idea/

# 操作系统文件
.DS_Store
Thumbs.db

# 特定文件
*.min.js
*.min.css
*.bundle.js

# 文档
CHANGELOG.md
LICENSE

# 配置文件（可选）
*.config.js
```

## 🎨 团队规范配置

### 严格模式配置

```javascript
// prettier.config.js - 严格模式
module.exports = {
  // 强制统一的代码风格
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  
  // 严格的换行和空格规则
  htmlWhitespaceSensitivity: 'strict',
  proseWrap: 'always',
  
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx,vue}',
      options: {
        semi: true,
        singleQuote: true,
        trailingComma: 'all'
      }
    }
  ]
}
```

### 宽松模式配置

```javascript
// prettier.config.js - 宽松模式
module.exports = {
  // 相对宽松的代码风格
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'auto',
  
  // 宽松的换行规则
  htmlWhitespaceSensitivity: 'css',
  proseWrap: 'preserve'
}
```

## 📊 脚本配置

### package.json 脚本

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "format:js": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
    "format:vue": "prettier --write \"src/**/*.vue\"",
    "format:css": "prettier --write \"src/**/*.{css,scss,less}\"",
    "format:json": "prettier --write \"**/*.json\"",
    "format:md": "prettier --write \"**/*.md\"",
    "lint:format": "eslint --fix . && prettier --write ."
  }
}
```

### 批量格式化脚本

```bash
#!/bin/bash
# format-all.sh

echo "🎨 开始格式化代码..."

# 格式化 JavaScript/TypeScript 文件
echo "📝 格式化 JS/TS 文件..."
prettier --write "src/**/*.{js,jsx,ts,tsx}"

# 格式化 Vue 文件
echo "🖼️ 格式化 Vue 文件..."
prettier --write "src/**/*.vue"

# 格式化样式文件
echo "🎨 格式化样式文件..."
prettier --write "src/**/*.{css,scss,less}"

# 格式化配置文件
echo "⚙️ 格式化配置文件..."
prettier --write "*.{json,js,ts}"

# 格式化文档文件
echo "📚 格式化文档文件..."
prettier --write "**/*.md"

echo "✅ 代码格式化完成！"
```

## 💡 最佳实践

### 1. 团队协作
- 统一配置文件并提交到版本控制
- 在项目文档中说明格式化规范
- 定期检查和更新配置

### 2. 性能优化
- 使用 .prettierignore 排除不需要格式化的文件
- 在 CI/CD 中只检查变更的文件
- 合理配置编辑器自动格式化

### 3. 配置管理
- 根据项目特点选择合适的配置
- 考虑团队成员的习惯和偏好
- 定期回顾和优化配置

### 4. 工具集成
- 与 ESLint 配合使用
- 集成到 Git Hooks 中
- 配置编辑器自动格式化

### 5. 渐进式引入
- 从基础配置开始
- 逐步完善规则
- 避免一次性改动过大

Prettier 的核心价值在于消除代码风格争议，让团队专注于业务逻辑。建议团队制定统一的格式化规范并严格执行。
