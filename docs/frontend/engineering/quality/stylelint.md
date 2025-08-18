# Stylelint 样式规范指南

Stylelint 是现代前端开发中最强大的 CSS 代码检查工具，支持 CSS、SCSS、Less 等样式语言。本指南涵盖完整的配置和最佳实践。

## 🚀 快速开始

### 安装 Stylelint

```bash
# 安装 Stylelint 核心
npm install stylelint -D

# 安装标准配置
npm install stylelint-config-standard -D

# 安装 SCSS 支持
npm install stylelint-config-standard-scss -D

# 安装 Vue 支持
npm install stylelint-config-standard-vue -D

# 安装 Prettier 集成
npm install stylelint-config-prettier -D
```

### 基础使用

```bash
# 检查单个文件
stylelint "src/styles/main.css"

# 检查整个目录
stylelint "src/**/*.{css,scss,vue}"

# 自动修复
stylelint "src/**/*.{css,scss}" --fix

# 输出格式化报告
stylelint "src/**/*.css" --formatter json > stylelint-report.json
```

## ⚙️ 基础配置

### .stylelintrc.json 配置

```json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-prettier"
  ],
  "rules": {
    "indentation": 2,
    "string-quotes": "single",
    "no-duplicate-selectors": true,
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "color-named": "never",
    "selector-max-id": 0,
    "selector-combinator-space-after": "always",
    "selector-attribute-quotes": "always",
    "selector-attribute-operator-space-before": "never",
    "selector-attribute-operator-space-after": "never",
    "selector-attribute-brackets-space-inside": "never",
    "declaration-block-trailing-semicolon": "always",
    "declaration-colon-space-before": "never",
    "declaration-colon-space-after": "always",
    "number-leading-zero": "always",
    "function-url-quotes": "always",
    "font-family-name-quotes": "always-where-recommended",
    "comment-whitespace-inside": "always",
    "comment-empty-line-before": "always",
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true
  }
}
```

### JavaScript 配置文件

```javascript
// stylelint.config.js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss'
  ],
  rules: {
    // 基础规则
    'indentation': 2,
    'string-quotes': 'single',
    'no-duplicate-selectors': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-named': 'never',
    'selector-max-id': 0,
    'selector-max-universal': 1,
    'selector-max-type': 3,
    'selector-max-class': 4,
    'selector-max-attribute': 2,
    'selector-max-pseudo-class': 3,
    'selector-max-compound-selectors': 4,
    
    // 声明顺序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'flex-direction',
      'flex-wrap',
      'justify-content',
      'align-items',
      'width',
      'height',
      'margin',
      'padding',
      'border',
      'background',
      'color',
      'font',
      'text-align',
      'transform',
      'transition'
    ],
    
    // 现代 CSS 特性
    'property-no-unknown': [true, {
      ignoreProperties: [
        'composes',
        'compose-with'
      ]
    }],
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'tailwind',
        'apply',
        'variants',
        'responsive',
        'screen'
      ]
    }]
  }
}
```

## 🎯 框架特定配置

### Vue 3 + SCSS 配置

```javascript
// stylelint.config.js - Vue 3 项目
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss'
  ],
  rules: {
    // SCSS 特定规则
    'scss/at-rule-no-unknown': true,
    'scss/at-function-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/at-mixin-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/dollar-variable-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/percent-placeholder-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension-blacklist': ['scss'],
    'scss/selector-no-redundant-nesting-selector': true,
    
    // Vue 特定规则
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
    }],
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['deep', 'global', 'slotted']
    }],
    
    // 属性顺序
    'order/properties-order': [
      // 定位
      {
        groupName: 'positioning',
        properties: [
          'position',
          'top',
          'right',
          'bottom',
          'left',
          'z-index'
        ]
      },
      // 盒模型
      {
        groupName: 'box-model',
        properties: [
          'display',
          'flex',
          'flex-direction',
          'flex-wrap',
          'justify-content',
          'align-items',
          'width',
          'height',
          'margin',
          'padding',
          'border',
          'border-radius',
          'box-sizing'
        ]
      },
      // 视觉
      {
        groupName: 'visual',
        properties: [
          'background',
          'color',
          'font',
          'line-height',
          'text-align',
          'opacity',
          'visibility'
        ]
      },
      // 动画
      {
        groupName: 'animation',
        properties: [
          'transform',
          'transition',
          'animation'
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ]
}
```

### React + CSS Modules 配置

```javascript
// stylelint.config.js - React 项目
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-order'
  ],
  rules: {
    // CSS Modules 支持
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      {
        message: 'Expected class selector to be camelCase'
      }
    ],
    'selector-id-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      {
        message: 'Expected id selector to be camelCase'
      }
    ],
    
    // React 特定规则
    'property-no-unknown': [true, {
      ignoreProperties: [
        'composes'
      ]
    }],
    
    // 现代 CSS 特性
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'value'
      ]
    }]
  },
  overrides: [
    {
      files: ['*.module.css', '**/*.module.css'],
      rules: {
        'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$'
      }
    }
  ]
}
```

### Tailwind CSS 配置

```javascript
// stylelint.config.js - Tailwind CSS 项目
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-order'
  ],
  rules: {
    // Tailwind CSS 支持
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'tailwind',
        'apply',
        'variants',
        'responsive',
        'screen',
        'layer'
      ]
    }],
    'function-no-unknown': [true, {
      ignoreFunctions: [
        'theme',
        'screen'
      ]
    }],
    'selector-class-pattern': null, // 禁用类名模式检查
    'value-keyword-case': ['lower', {
      ignoreKeywords: ['currentColor']
    }]
  }
}
```

## 🔧 高级配置

### 自定义规则配置

```javascript
// stylelint.config.js - 高级配置
module.exports = {
  extends: [
    'stylelint-config-standard-scss'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  rules: {
    // 命名规范
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$',
      {
        message: 'Expected class selector to follow BEM methodology'
      }
    ],
    'selector-id-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        message: 'Expected id selector to be kebab-case'
      }
    ],
    'keyframes-name-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        message: 'Expected keyframe name to be kebab-case'
      }
    ],
    'custom-property-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        message: 'Expected custom property name to be kebab-case'
      }
    ],
    
    // 性能优化
    'selector-max-universal': 1,
    'selector-max-type': 3,
    'selector-max-class': 4,
    'selector-max-id': 0,
    'selector-max-attribute': 2,
    'selector-max-pseudo-class': 3,
    'selector-max-compound-selectors': 4,
    'selector-max-specificity': '0,4,0',
    
    // 代码质量
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'color-no-invalid-hex': true,
    'font-family-no-duplicate-names': true,
    'function-calc-no-invalid': true,
    'string-no-newline': true,
    'unit-no-unknown': true,
    'property-no-unknown': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    
    // 现代 CSS 特性
    'declaration-block-no-ignored-properties': true,
    'font-family-name-quotes': 'always-where-recommended',
    'function-url-quotes': 'always',
    'import-notation': 'string',
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true
  }
}
```

### 多环境配置

```javascript
// stylelint.config.js - 多环境配置
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  extends: [
    'stylelint-config-standard-scss'
  ],
  rules: {
    // 开发环境宽松，生产环境严格
    'no-empty-source': isDevelopment ? 'warn' : 'error',
    'selector-max-id': isDevelopment ? 1 : 0,
    'declaration-no-important': isDevelopment ? 'warn' : 'error',
    'color-named': isDevelopment ? 'warn' : 'never',
    
    // 始终严格的规则
    'no-duplicate-selectors': 'error',
    'color-no-invalid-hex': 'error',
    'unit-no-unknown': 'error'
  }
}
```

## 🔗 工具集成

### VS Code 集成

```json
// .vscode/settings.json
{
  "stylelint.validate": [
    "css",
    "scss",
    "sass",
    "less",
    "vue"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  "css.validate": false,
  "scss.validate": false,
  "less.validate": false
}
```

### Webpack 集成

```javascript
// webpack.config.js
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  plugins: [
    new StylelintPlugin({
      files: 'src/**/*.{css,scss,sass,vue}',
      fix: true,
      cache: true,
      emitErrors: true,
      emitWarnings: true,
      failOnError: false
    })
  ]
}
```

### Vite 集成

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import stylelint from 'vite-plugin-stylelint'

export default defineConfig({
  plugins: [
    stylelint({
      include: ['src/**/*.{css,scss,sass,vue}'],
      exclude: ['node_modules'],
      cache: true,
      fix: true
    })
  ]
})
```

### Git Hooks 集成

```json
// package.json
{
  "lint-staged": {
    "*.{css,scss,sass,less}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.vue": [
      "stylelint --fix",
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## 📋 忽略文件配置

### .stylelintignore

```bash
# 依赖和构建输出
node_modules/
dist/
build/
coverage/
.next/
.nuxt/

# 第三方样式
vendor/
lib/
*.min.css

# 自动生成的文件
*.css.map
*.scss.map

# 特定文件
normalize.css
reset.css
```

## 📊 脚本配置

### package.json 脚本

```json
{
  "scripts": {
    "lint:style": "stylelint \"src/**/*.{css,scss,vue}\"",
    "lint:style:fix": "stylelint \"src/**/*.{css,scss,vue}\" --fix",
    "lint:style:report": "stylelint \"src/**/*.{css,scss}\" --formatter json > stylelint-report.json",
    "style:check": "stylelint \"src/**/*.{css,scss}\" --max-warnings 0"
  }
}
```

### 自动化检查脚本

```bash
#!/bin/bash
# style-check.sh

echo "🎨 开始样式检查..."

# 检查 CSS 文件
echo "📝 检查 CSS 文件..."
stylelint "src/**/*.css" --formatter compact

# 检查 SCSS 文件
echo "🔍 检查 SCSS 文件..."
stylelint "src/**/*.scss" --formatter compact

# 检查 Vue 文件中的样式
echo "🖼️ 检查 Vue 文件样式..."
stylelint "src/**/*.vue" --formatter compact

# 生成报告
echo "📊 生成样式检查报告..."
stylelint "src/**/*.{css,scss,vue}" --formatter json > reports/stylelint-report.json

echo "✅ 样式检查完成！"
```

## 💡 最佳实践

### 1. 规则配置
- 从标准配置开始，逐步定制
- 根据项目特点调整规则严格程度
- 定期回顾和更新配置

### 2. 团队协作
- 统一样式编码规范
- 在项目文档中说明样式规范
- 定期进行代码审查

### 3. 性能优化
- 使用缓存提高检查速度
- 合理配置忽略文件
- 在 CI/CD 中并行运行检查

### 4. 工具集成
- 配置编辑器自动修复
- 集成到构建流程中
- 与其他代码质量工具配合使用

### 5. 渐进式引入
- 先修复现有问题
- 逐步提高规则严格程度
- 避免一次性改动过大

Stylelint 是确保样式代码质量和一致性的重要工具，建议团队制定明确的样式规范并严格执行。
