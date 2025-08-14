# ESLint 配置和规则指南

ESLint 是现代前端开发中不可或缺的代码质量工具。本指南涵盖 Vue 3、React 18 的完整配置方案和最佳实践。

## 🚀 基础配置

### 安装 ESLint

```bash
# 初始化 ESLint
npm init @eslint/config
# 或
npx eslint --init

# 手动安装
npm install eslint -D

# 安装常用插件
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### 基础配置文件

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // 基础规则
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-var': 'error'
  }
}
```

## 🎯 Vue 3 专用配置

### 完整 Vue 3 配置

```javascript
// .eslintrc.js - Vue 3 项目
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // Vue 3 特定规则
    'vue/multi-word-component-names': 'error',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/define-macros-order': ['error', {
      order: ['defineProps', 'defineEmits']
    }],
    'vue/no-setup-props-destructure': 'error',
    'vue/no-v-html': 'warn',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/prefer-import-from-vue': 'error',
    
    // Composition API 规则
    'vue/no-ref-as-operand': 'error',
    'vue/no-watch-after-await': 'error',
    'vue/no-multiple-template-root': 'off', // Vue 3 允许多根节点
    
    // TypeScript 规则
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 'off' // Vue 文件中的全局变量
      }
    }
  ]
}
```

### Vue 3 + Vite 配置

```javascript
// .eslintrc.js - Vue 3 + Vite
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // Vite 特定配置
    'import/no-unresolved': 'off', // Vite 处理路径解析
    'import/extensions': 'off',
    
    // Vue 3 + TypeScript 优化
    'vue/script-setup-uses-vars': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style']
    }]
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
```

## ⚛️ React 18 专用配置

### 完整 React 18 配置

```javascript
// .eslintrc.js - React 18 项目
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    '@typescript-eslint'
  ],
  settings: {
    react: {
      version: '18.2'
    }
  },
  rules: {
    // React 18 特定规则
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要导入 React
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off', // 使用 TypeScript
    'react/display-name': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'warn',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-unused-state': 'error',
    'react/prefer-stateless-function': 'warn',
    
    // React Hooks 规则
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // JSX 规则
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-tag-spacing': 'error',
    'react/jsx-wrap-multilines': 'error',
    
    // 可访问性规则
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn'
  }
}
```

### Next.js 配置

```javascript
// .eslintrc.js - Next.js 项目
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended'
  ],
  rules: {
    // Next.js 特定规则
    '@next/next/no-img-element': 'error',
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-sync-scripts': 'error',
    '@next/next/no-title-in-document-head': 'error',
    
    // 性能优化规则
    '@next/next/no-css-tags': 'error',
    '@next/next/no-head-element': 'error',
    '@next/next/google-font-display': 'warn',
    '@next/next/google-font-preconnect': 'warn'
  }
}
```

## 🔧 高级配置

### 自定义规则

```javascript
// .eslintrc.js - 自定义规则
module.exports = {
  rules: {
    // 命名规范
    'camelcase': ['error', { properties: 'never' }],
    'id-length': ['error', { min: 2, exceptions: ['i', 'j', 'k'] }],
    
    // 代码风格
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    
    // 最佳实践
    'eqeqeq': ['error', 'always'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-return-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'prefer-promise-reject-errors': 'error',
    'require-await': 'error'
  }
}
```

### 多环境配置

```javascript
// .eslintrc.js - 多环境配置
module.exports = {
  overrides: [
    {
      // 测试文件配置
      files: ['**/__tests__/**/*', '**/*.{test,spec}.*'],
      env: {
        jest: true
      },
      extends: ['plugin:jest/recommended'],
      rules: {
        'jest/expect-expect': 'error',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/prefer-to-have-length': 'warn'
      }
    },
    {
      // 配置文件
      files: ['*.config.js', '*.config.ts'],
      env: {
        node: true
      },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      // 构建脚本
      files: ['scripts/**/*'],
      env: {
        node: true
      },
      rules: {
        'no-console': 'off'
      }
    }
  ]
}
```

## 🔗 工具集成

### VS Code 集成

```json
// .vscode/settings.json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "eslint.workingDirectories": ["./"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.format.enable": true,
  "eslint.lintTask.enable": true
}
```

### Prettier 集成

```javascript
// .eslintrc.js - 与 Prettier 集成
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier' // 必须放在最后
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
```

### Git Hooks 集成

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## 📊 性能优化

### 缓存配置

```bash
# 启用 ESLint 缓存
npx eslint --cache --cache-location .eslintcache src/

# package.json 脚本
{
  "scripts": {
    "lint": "eslint --cache --cache-location .eslintcache src/",
    "lint:fix": "eslint --cache --cache-location .eslintcache --fix src/"
  }
}
```

### 忽略文件配置

```bash
# .eslintignore
node_modules/
dist/
build/
coverage/
*.min.js
*.bundle.js
public/
.nuxt/
.next/
.vuepress/dist/
```

## 🎯 团队规范

### 规则严格程度

```javascript
// 严格模式 - 生产环境
const strictRules = {
  'no-console': 'error',
  'no-debugger': 'error',
  '@typescript-eslint/no-any': 'error'
}

// 宽松模式 - 开发环境
const relaxedRules = {
  'no-console': 'warn',
  'no-debugger': 'warn',
  '@typescript-eslint/no-any': 'warn'
}

module.exports = {
  rules: process.env.NODE_ENV === 'production' ? strictRules : relaxedRules
}
```

### 团队配置模板

```javascript
// .eslintrc.js - 团队标准配置
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // 团队统一规则
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
}
```

## 💡 最佳实践

### 1. 渐进式引入

- 从基础规则开始
- 逐步增加严格程度
- 团队讨论制定规范

### 2. 自动化集成

- 配置编辑器自动修复
- 集成到 Git Hooks
- CI/CD 流程检查

### 3. 规则定制

- 根据项目特点调整
- 考虑团队习惯
- 定期回顾和优化

### 4. 性能考虑

- 启用缓存机制
- 合理配置忽略文件
- 避免过度复杂的规则
