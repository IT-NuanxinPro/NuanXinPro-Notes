# VSCode 前端开发配置详解

VSCode 是目前最受前端开发者欢迎的编辑器。本文将详细介绍如何配置一个高效的前端开发环境，包含完整的配置文件、开发技巧和效率提升方法。

## ⚙️ 完整配置文件

### settings.json 详细配置

```json
{
  // ===== 编辑器核心设置 =====
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.fontWeight": "400",
  "editor.lineHeight": 1.6,
  "editor.letterSpacing": 0.5,

  // 缩进和格式
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "editor.trimAutoWhitespace": true,
  "editor.wordWrap": "on",
  "editor.wordWrapColumn": 120,
  "editor.wrappingIndent": "indent",

  // 界面显示
  "editor.minimap.enabled": false,
  "editor.scrollBeyondLastLine": false,
  "editor.renderWhitespace": "boundary",
  "editor.renderControlCharacters": false,
  "editor.rulers": [80, 120],
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.smoothScrolling": true,

  // 代码提示和补全
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": true
  },
  "editor.quickSuggestionsDelay": 10,
  "editor.suggestOnTriggerCharacters": true,
  "editor.acceptSuggestionOnEnter": "on",
  "editor.acceptSuggestionOnCommitCharacter": true,
  "editor.snippetSuggestions": "top",
  "editor.wordBasedSuggestions": "matchingDocuments",
  "editor.parameterHints.enabled": true,

  // ===== 格式化设置 =====
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // 保存时的代码操作
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit",
    "source.removeUnusedImports": "explicit",
    "source.sortImports": "never"
  },

  // ===== 文件管理 =====
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "files.encoding": "utf8",
  "files.eol": "\n",

  // 文件关联
  "files.associations": {
    "*.vue": "vue",
    "*.jsx": "javascriptreact",
    "*.tsx": "typescriptreact",
    "*.json": "jsonc",
    "*.jsonc": "jsonc",
    "*.wxml": "html",
    "*.wxss": "css",
    "*.wxs": "javascript",
    "*.nvue": "vue",
    ".env*": "dotenv",
    ".eslintrc": "jsonc",
    ".prettierrc": "jsonc",
    "*.md": "markdown"
  },

  // 文件排除
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true,
    "**/.DS_Store": true,
    "**/Thumbs.db": true,
    "**/.vscode": false,
    "**/coverage": true,
    "**/.nyc_output": true,
    "**/tmp": true,
    "**/temp": true
  },

  // 文件监控排除
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true,
    "**/build/**": true,
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/coverage/**": true
  },

  // ===== 搜索设置 =====
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true,
    "**/coverage": true,
    "**/.nyc_output": true,
    "**/tmp": true,
    "**/temp": true,
    "**/*.min.js": true,
    "**/*.min.css": true
  },
  "search.useIgnoreFiles": true,
  "search.useGlobalIgnoreFiles": true,
  "search.followSymlinks": false,
  "search.smartCase": true,
  "search.showLineNumbers": true,

  // ===== TypeScript 设置 =====
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "typescript.inlayHints.parameterNames.enabled": "literals",
  "typescript.inlayHints.variableTypes.enabled": false,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,
  "typescript.inlayHints.propertyDeclarationTypes.enabled": true,
  "typescript.inlayHints.enumMemberValues.enabled": true,
  "typescript.preferences.quoteStyle": "single",
  "typescript.format.semicolons": "remove",

  // ===== JavaScript 设置 =====
  "javascript.suggest.autoImports": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "javascript.preferences.importModuleSpecifier": "relative",
  "javascript.preferences.quoteStyle": "single",
  "javascript.format.semicolons": "remove",
  "javascript.inlayHints.parameterNames.enabled": "literals",
  "javascript.inlayHints.functionLikeReturnTypes.enabled": true,

  // ===== Emmet 设置 =====
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html",
    "javascript": "javascriptreact",
    "typescript": "typescriptreact",
    "markdown": "html"
  },
  "emmet.triggerExpansionOnTab": true,
  "emmet.showSuggestionsAsSnippets": true,
  "emmet.showExpandedAbbreviation": "always",

  // ===== CSS/样式设置 =====
  "css.validate": false,
  "scss.validate": false,
  "less.validate": false,
  "css.lint.unknownAtRules": "ignore",

  // ===== 插件特定设置 =====
  // Stylelint
  "stylelint.validate": ["css", "scss", "vue", "html", "postcss"],
  "stylelint.snippet": ["css", "scss", "postcss"],

  // ESLint
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"],
  "eslint.format.enable": true,
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "eslint.run": "onType",

  // Prettier
  "prettier.requireConfig": true,
  "prettier.useEditorConfig": false,
  "prettier.documentSelectors": ["**/*.vue"],

  // ===== 界面设置 =====
  "workbench.startupEditor": "newUntitledFile",
  "workbench.editor.enablePreview": false,
  "workbench.editor.closeOnFileDelete": true,
  "workbench.editor.highlightModifiedTabs": true,
  "workbench.editor.tabCloseButton": "right",
  "workbench.editor.tabSizing": "shrink",
  "workbench.activityBar.location": "default",
  "workbench.sideBar.location": "left",
  "workbench.panel.defaultLocation": "bottom",
  "workbench.statusBar.visible": true,

  // ===== 终端设置 =====
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.fontFamily": "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.scrollback": 10000,
  "terminal.integrated.copyOnSelection": true,
  "terminal.integrated.rightClickBehavior": "paste",

  // ===== Git 设置 =====
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "git.autofetch": true,
  "git.openRepositoryInParentFolders": "always",
  "git.decorations.enabled": true,
  "git.showPushSuccessNotification": true,
  "git.suggestSmartCommit": false,

  // ===== 其他设置 =====
  "breadcrumbs.enabled": true,
  "breadcrumbs.showFiles": true,
  "breadcrumbs.showSymbols": true,
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.compactFolders": false,
  "explorer.sortOrder": "type",
  "extensions.autoUpdate": true,
  "extensions.ignoreRecommendations": false,
  "telemetry.telemetryLevel": "off",
  "update.mode": "start",
  "security.workspace.trust.untrustedFiles": "open"
}
```

## 🔌 插件推荐

> 详细的插件介绍和配置请查看 [插件推荐](./plugins.md) 页面

## ⌨️ 常用快捷键大全

### 基础编辑快捷键

| 功能 | Windows/Linux | macOS | 说明 |
|------|---------------|-------|------|
| **文件操作** |
| 新建文件 | `Ctrl+N` | `Cmd+N` | 创建新文件 |
| 打开文件 | `Ctrl+O` | `Cmd+O` | 打开文件对话框 |
| 保存文件 | `Ctrl+S` | `Cmd+S` | 保存当前文件 |
| 另存为 | `Ctrl+Shift+S` | `Cmd+Shift+S` | 另存为对话框 |
| 关闭文件 | `Ctrl+W` | `Cmd+W` | 关闭当前标签页 |
| 重新打开关闭的文件 | `Ctrl+Shift+T` | `Cmd+Shift+T` | 恢复最近关闭的文件 |

| 功能 | Windows/Linux | macOS | 说明 |
|------|---------------|-------|------|
| **导航和搜索** |
| 快速打开文件 | `Ctrl+P` | `Cmd+P` | 快速文件搜索 |
| 命令面板 | `Ctrl+Shift+P` | `Cmd+Shift+P` | 打开命令面板 |
| 转到行 | `Ctrl+G` | `Cmd+G` | 跳转到指定行号 |
| 转到符号 | `Ctrl+Shift+O` | `Cmd+Shift+O` | 文件内符号搜索 |
| 全局符号搜索 | `Ctrl+T` | `Cmd+T` | 工作区符号搜索 |
| 查找 | `Ctrl+F` | `Cmd+F` | 当前文件查找 |
| 替换 | `Ctrl+H` | `Cmd+Option+F` | 当前文件替换 |
| 全局查找 | `Ctrl+Shift+F` | `Cmd+Shift+F` | 工作区查找 |
| 全局替换 | `Ctrl+Shift+H` | `Cmd+Shift+H` | 工作区替换 |

### 高效编辑快捷键

| 功能 | Windows/Linux | macOS | 说明 |
|------|---------------|-------|------|
| **选择和光标** |
| 选择当前单词 | `Ctrl+D` | `Cmd+D` | 选择下一个相同单词 |
| 选择所有相同单词 | `Ctrl+Shift+L` | `Cmd+Shift+L` | 多光标编辑 |
| 添加光标到上方 | `Ctrl+Alt+Up` | `Cmd+Option+Up` | 多光标向上 |
| 添加光标到下方 | `Ctrl+Alt+Down` | `Cmd+Option+Down` | 多光标向下 |
| 选择整行 | `Ctrl+L` | `Cmd+L` | 选择当前行 |
| 扩展选择 | `Shift+Alt+Right` | `Shift+Option+Right` | 智能扩展选择 |
| 收缩选择 | `Shift+Alt+Left` | `Shift+Option+Left` | 智能收缩选择 |

| 功能 | Windows/Linux | macOS | 说明 |
|------|---------------|-------|------|
| **行操作** |
| 复制行 | `Shift+Alt+Down` | `Shift+Option+Down` | 向下复制当前行 |
| 移动行向上 | `Alt+Up` | `Option+Up` | 向上移动当前行 |
| 移动行向下 | `Alt+Down` | `Option+Down` | 向下移动当前行 |
| 删除行 | `Ctrl+Shift+K` | `Cmd+Shift+K` | 删除当前行 |
| 在上方插入行 | `Ctrl+Shift+Enter` | `Cmd+Shift+Enter` | 在当前行上方插入 |
| 在下方插入行 | `Ctrl+Enter` | `Cmd+Enter` | 在当前行下方插入 |

### 代码编辑快捷键

| 功能 | Windows/Linux | macOS | 说明 |
|------|---------------|-------|------|
| **代码操作** |
| 格式化文档 | `Shift+Alt+F` | `Shift+Option+F` | 格式化整个文档 |
| 格式化选择 | `Ctrl+K Ctrl+F` | `Cmd+K Cmd+F` | 格式化选中代码 |
| 快速修复 | `Ctrl+.` | `Cmd+.` | 显示快速修复菜单 |
| 重命名符号 | `F2` | `F2` | 重命名变量/函数 |
| 转到定义 | `F12` | `F12` | 跳转到定义 |
| 查看定义 | `Alt+F12` | `Option+F12` | 预览定义 |
| 查找引用 | `Shift+F12` | `Shift+F12` | 查找所有引用 |
| 触发建议 | `Ctrl+Space` | `Cmd+Space` | 手动触发代码补全 |

| 功能 | Windows/Linux | macOS | 说明 |
|------|---------------|-------|------|
| **代码折叠** |
| 折叠代码块 | `Ctrl+Shift+[` | `Cmd+Option+[` | 折叠当前代码块 |
| 展开代码块 | `Ctrl+Shift+]` | `Cmd+Option+]` | 展开当前代码块 |
| 折叠所有 | `Ctrl+K Ctrl+0` | `Cmd+K Cmd+0` | 折叠所有代码块 |
| 展开所有 | `Ctrl+K Ctrl+J` | `Cmd+K Cmd+J` | 展开所有代码块 |

### 界面操作快捷键

| 功能 | Windows/Linux | macOS | 说明 |
|------|---------------|-------|------|
| **面板切换** |
| 切换侧边栏 | `Ctrl+B` | `Cmd+B` | 显示/隐藏侧边栏 |
| 切换终端 | `Ctrl+`` | `Cmd+`` | 显示/隐藏终端 |
| 切换问题面板 | `Ctrl+Shift+M` | `Cmd+Shift+M` | 显示问题面板 |
| 切换输出面板 | `Ctrl+Shift+U` | `Cmd+Shift+U` | 显示输出面板 |
| 资源管理器 | `Ctrl+Shift+E` | `Cmd+Shift+E` | 切换到文件资源管理器 |
| 搜索面板 | `Ctrl+Shift+F` | `Cmd+Shift+F` | 切换到搜索面板 |
| Git 面板 | `Ctrl+Shift+G` | `Cmd+Shift+G` | 切换到源代码管理 |
| 调试面板 | `Ctrl+Shift+D` | `Cmd+Shift+D` | 切换到调试面板 |
| 扩展面板 | `Ctrl+Shift+X` | `Cmd+Shift+X` | 切换到扩展面板 |

| 功能 | Windows/Linux | macOS | 说明 |
|------|---------------|-------|------|
| **标签页操作** |
| 切换标签页 | `Ctrl+Tab` | `Cmd+Tab` | 在打开的文件间切换 |
| 下一个标签页 | `Ctrl+PageDown` | `Cmd+Option+Right` | 切换到下一个标签页 |
| 上一个标签页 | `Ctrl+PageUp` | `Cmd+Option+Left` | 切换到上一个标签页 |
| 关闭标签页 | `Ctrl+W` | `Cmd+W` | 关闭当前标签页 |
| 关闭所有标签页 | `Ctrl+K Ctrl+W` | `Cmd+K Cmd+W` | 关闭所有标签页 |
| 重新打开标签页 | `Ctrl+Shift+T` | `Cmd+Shift+T` | 重新打开最近关闭的标签页 |

## 🚀 高效开发技巧

### 多光标编辑技巧

#### 1. 批量编辑相同内容
```javascript
// 选中一个变量名，按 Ctrl+D (Cmd+D) 逐个选择相同内容
const userName = 'john'
const userAge = 25
const userEmail = 'john@example.com'

// 使用 Ctrl+Shift+L (Cmd+Shift+L) 选择所有相同内容
// 可以同时修改所有 user 变量名
```

#### 2. 列编辑模式
```javascript
// 按住 Alt (Option) 键拖拽鼠标，可以进行列选择
const data = [
  { name: 'Alice',   age: 25 },
  { name: 'Bob',     age: 30 },
  { name: 'Charlie', age: 35 }
]
// 可以同时编辑多行的相同位置
```

### 代码片段和模板

#### 1. 自定义代码片段
```json
// 在用户代码片段中添加 (Ctrl+Shift+P -> "Configure User Snippets")
{
  "Vue 3 Composition API": {
    "prefix": "v3setup",
    "body": [
      "<template>",
      "  <div class=\"$1\">",
      "    $2",
      "  </div>",
      "</template>",
      "",
      "<script setup lang=\"ts\">",
      "import { ref, reactive, computed, onMounted } from 'vue'",
      "",
      "$3",
      "</script>",
      "",
      "<style scoped>",
      ".$1 {",
      "  $4",
      "}",
      "</style>"
    ],
    "description": "Vue 3 Composition API 组件模板"
  }
}
```

#### 2. React 函数组件片段
```json
{
  "React Function Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react'",
      "",
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({ $3 }) => {",
      "  return (",
      "    <div className=\"${4:component-name}\">",
      "      $5",
      "    </div>",
      "  )",
      "}",
      "",
      "export default ${1:ComponentName}"
    ],
    "description": "React 函数组件模板"
  }
}
```

### 智能搜索技巧

#### 1. 文件搜索技巧
```bash
# 快速打开文件 (Ctrl+P / Cmd+P)
# 支持模糊搜索和路径搜索

# 搜索文件名
component.vue

# 搜索路径
src/components/

# 组合搜索
src comp vue

# 使用 @ 符号搜索文件内的符号
@function
@class
@interface
```

#### 2. 全局搜索技巧
```bash
# 正则表达式搜索 (启用正则表达式模式)
function\s+\w+\(.*\)\s*{

# 排除文件类型
*.min.js
node_modules/

# 包含特定文件类型
*.vue,*.js,*.ts

# 搜索特定目录
./src/components/
```

### 调试技巧

#### 1. 断点调试
```javascript
// 条件断点：右键行号设置条件
if (user.id === 123) {
  // 只在特定条件下触发断点
  debugger
}

// 日志断点：不中断执行，只输出日志
console.log('User ID:', user.id)
```

#### 2. 调试配置
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Vue App",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### 重构技巧

#### 1. 智能重命名
```javascript
// 选中变量/函数名，按 F2 进行智能重命名
// 会自动重命名所有引用位置
function calculateUserAge(birthDate) {
  // F2 重命名 calculateUserAge 会同时更新所有调用位置
  return new Date().getFullYear() - birthDate.getFullYear()
}
```

#### 2. 提取函数/变量
```javascript
// 选中代码块，按 Ctrl+. (Cmd+.) 选择重构选项
const result = data.filter(item => item.active)
                  .map(item => item.name)
                  .sort()

// 可以提取为独立函数
function getActiveUserNames(data) {
  return data.filter(item => item.active)
             .map(item => item.name)
             .sort()
}
```

## ⌨️ 快捷键配置

### 自定义快捷键

```json
[
  // 代码编辑
  {
    "key": "ctrl+shift+d",
    "command": "editor.action.duplicateSelection"
  },
  {
    "key": "ctrl+shift+k",
    "command": "editor.action.deleteLines"
  },
  {
    "key": "alt+up",
    "command": "editor.action.moveLinesUpAction"
  },
  {
    "key": "alt+down",
    "command": "editor.action.moveLinesDownAction"
  },
  
  // 文件操作
  {
    "key": "ctrl+shift+n",
    "command": "explorer.newFile"
  },
  {
    "key": "ctrl+shift+alt+n",
    "command": "explorer.newFolder"
  },
  
  // 面板切换
  {
    "key": "ctrl+`",
    "command": "workbench.action.terminal.toggleTerminal"
  },
  {
    "key": "ctrl+shift+e",
    "command": "workbench.view.explorer"
  },
  {
    "key": "ctrl+shift+g",
    "command": "workbench.view.scm"
  },
  
  // Git 操作
  {
    "key": "ctrl+shift+g ctrl+c",
    "command": "git.commit"
  },
  {
    "key": "ctrl+shift+g ctrl+p",
    "command": "git.push"
  },
  {
    "key": "ctrl+shift+g ctrl+l",
    "command": "git.pull"
  }
]
```

## 🏗️ 工作区配置

### 项目级配置文件

#### .vscode/settings.json (项目特定设置)
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  },
  "files.associations": {
    "*.vue": "vue"
  }
}
```

#### .vscode/extensions.json (推荐插件)
```json
{
  "recommendations": [
    "vue.volar",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint"
  ],
  "unwantedRecommendations": [
    "ms-vscode.vscode-typescript-next"
  ]
}
```

#### .vscode/tasks.json (任务配置)
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "dev",
      "type": "npm",
      "script": "dev",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      },
      "problemMatcher": []
    },
    {
      "label": "build",
      "type": "npm",
      "script": "build",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

#### .vscode/launch.json (调试配置)
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### tasks.json 任务配置

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm: dev",
      "type": "npm",
      "script": "dev",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      },
      "problemMatcher": []
    },
    {
      "label": "npm: build",
      "type": "npm",
      "script": "build",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "npm: test",
      "type": "npm",
      "script": "test",
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

## 💡 性能优化建议

### 1. 文件监控优化
```json
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true,
    "**/build/**": true,
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/coverage/**": true
  }
}
```

### 2. 搜索性能优化
```json
{
  "search.useIgnoreFiles": true,
  "search.useGlobalIgnoreFiles": true,
  "search.followSymlinks": false,
  "search.smartCase": true
}
```

### 3. 插件管理
- 定期清理不使用的插件
- 使用工作区推荐插件功能
- 避免安装功能重复的插件

## 🔧 故障排除

### 常见问题解决

#### 1. TypeScript 服务重启
```
Ctrl+Shift+P -> TypeScript: Restart TS Server
```

#### 2. 插件冲突排查
```
Ctrl+Shift+P -> Developer: Reload Window
```

#### 3. 设置同步问题
```bash
# 重置本地设置同步
Settings Sync: Reset Local
```

## 📋 最佳实践

### 1. 团队协作
- 使用工作区配置文件统一团队设置
- 在 `.vscode/extensions.json` 中推荐必要插件
- 建立代码格式化和检查规范
- 使用 `.editorconfig` 统一编辑器配置

### 2. 项目组织
- 合理使用工作区功能管理多项目
- 配置项目特定的调试和任务
- 使用代码片段提升开发效率
- 建立项目模板和脚手架

### 3. 开发效率
- 熟练掌握快捷键操作
- 善用多光标编辑功能
- 利用智能搜索和导航
- 配置合适的代码片段

### 4. 代码质量
- 配置自动格式化和代码检查
- 使用 Git 集成功能
- 善用重构工具
- 建立代码审查流程

通过合理配置 VSCode，可以显著提升前端开发效率和代码质量。建议根据个人习惯和项目需求进行个性化调整。

> 💡 **提示**：更多插件推荐和详细配置请查看 [插件推荐](./plugins.md) 页面。
