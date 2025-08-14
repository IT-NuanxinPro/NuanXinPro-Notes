# Node.js 版本管理完全指南

在前端开发中，不同项目可能需要不同版本的 Node.js，掌握版本管理工具能让开发更加高效。

## 🎯 为什么需要版本管理

### 常见场景

- **多项目开发**：不同项目依赖不同 Node.js 版本
- **团队协作**：确保团队使用相同的 Node.js 版本
- **版本升级**：安全地测试新版本特性
- **兼容性测试**：在多个版本上测试应用

### 版本选择策略

```bash
# LTS 版本（推荐生产环境）
Node.js 20.19.4 LTS
Node.js 22.18.0 LTS

# Current 版本（最新特性）
Node.js 24.5.0 Current

# 版本生命周期
Active LTS → Maintenance LTS → End of Life
```

## 🔧 nvm (Node Version Manager)

### macOS/Linux 安装

```bash
# 使用 curl 安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 使用 wget 安装
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载终端配置
source ~/.bashrc
# 或
source ~/.zshrc

# 验证安装
nvm --version
```

### Windows 安装 (nvm-windows)

```bash
# 下载安装包
https://github.com/coreybutler/nvm-windows/releases

# 或使用 Chocolatey
choco install nvm

# 或使用 Scoop
scoop install nvm
```

### nvm基础使用

```bash
# 查看可用版本
nvm list-remote              # 查看所有可用版本
nvm list-remote --lts        # 只查看 LTS 版本

# 安装 Node.js
nvm install node             # 安装最新版本
nvm install --lts            # 安装最新 LTS 版本
nvm install 18.17.0          # 安装指定版本
nvm install 18               # 安装 18.x 最新版本

# 查看已安装版本
nvm list                     # 查看本地安装的版本
nvm list --no-colors         # 无颜色输出

# 切换版本
nvm use node                 # 使用最新版本
nvm use --lts                # 使用最新 LTS 版本
nvm use 18.17.0              # 使用指定版本
nvm use 18                   # 使用 18.x 最新版本

# 设置默认版本
nvm alias default 18.17.0    # 设置默认版本
nvm alias default node       # 设置最新版本为默认
nvm alias default --lts      # 设置最新 LTS 为默认

# 卸载版本
nvm uninstall 16.20.0        # 卸载指定版本
```

### 高级功能

```bash
# 别名管理
nvm alias stable 18.17.0     # 创建别名
nvm alias unstable 19.0.0
nvm use stable               # 使用别名

# 查看当前版本
nvm current                  # 显示当前使用版本
node --version               # 显示 Node.js 版本
npm --version                # 显示 npm 版本

# 在子 shell 中运行
nvm exec 18.17.0 node app.js # 在指定版本下运行命令
nvm run 18.17.0 app.js       # 运行脚本

# 查看版本路径
nvm which 18.17.0            # 显示版本安装路径
```

## 🚀 fnm (Fast Node Manager)

### 安装 fnm

```bash
# macOS/Linux 使用 curl
curl -fsSL https://fnm.vercel.app/install | bash

# 使用 Homebrew (macOS)
brew install fnm

# 使用 Cargo (Rust)
cargo install fnm

# Windows 使用 Chocolatey
choco install fnm

# Windows 使用 Scoop
scoop install fnm
```

### 配置 Shell

```bash
# Bash
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.bashrc

# Zsh
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.zshrc

# Fish
echo 'fnm env --use-on-cd | source' >> ~/.config/fish/config.fish

# PowerShell
Add-Content $PROFILE 'fnm env --use-on-cd | Out-String | Invoke-Expression'
```

### fnm基础使用

```bash
# 列出可用版本
fnm list-remote              # 所有版本
fnm list-remote --lts        # LTS 版本

# 安装版本
fnm install 18.17.0          # 安装指定版本
fnm install --lts            # 安装最新 LTS
fnm install latest           # 安装最新版本

# 查看已安装版本
fnm list

# 使用版本
fnm use 18.17.0              # 切换到指定版本
fnm use --lts                # 切换到最新 LTS

# 设置默认版本
fnm default 18.17.0          # 设置默认版本

# 卸载版本
fnm uninstall 16.20.0        # 卸载指定版本
```

## 📁 项目级版本管理

### .nvmrc 文件

```bash
# 在项目根目录创建 .nvmrc
echo "18.17.0" > .nvmrc

# 或指定 LTS
echo "lts/hydrogen" > .nvmrc

# 使用项目指定版本
nvm use                      # 自动读取 .nvmrc
fnm use                      # fnm 也支持 .nvmrc
```

### package.json 引擎限制

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "engines": {
    "node": ">=18.17.0",
    "npm": ">=9.0.0"
  },
  "scripts": {
    "preinstall": "npx check-node-version --node $(cat .nvmrc)"
  }
}
```

### 自动切换脚本

```bash
# ~/.zshrc 或 ~/.bashrc
# 自动切换 Node.js 版本
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## 🐳 Docker 环境管理

### Dockerfile 版本管理

```dockerfile
# 使用特定版本
FROM node:18.17.0-alpine

# 使用 LTS 版本
FROM node:lts-alpine

# 多阶段构建
FROM node:18.17.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18.17.0-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    image: node:18.17.0-alpine
    working_dir: /app
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    command: npm run dev
```

## 🔄 版本升级策略

### 渐进式升级

```bash
# 1. 检查当前版本兼容性
npm audit
npm outdated

# 2. 安装新版本
nvm install 20.0.0
nvm use 20.0.0

# 3. 测试应用
npm test
npm run build

# 4. 更新 .nvmrc
echo "20.0.0" > .nvmrc

# 5. 更新 package.json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### 兼容性检查

```bash
# 使用 npx 检查版本兼容性
npx check-node-version --node 18.17.0 --npm 9.0.0

# 检查包兼容性
npx npm-check-updates
npx npm-check-updates -u    # 更新 package.json
```

## 🛠️ 团队协作最佳实践

### 1. 统一版本管理

```bash
# 团队配置文件
# .nvmrc
18.17.0

# package.json
{
  "engines": {
    "node": "18.17.0",
    "npm": "9.6.7"
  }
}

# README.md 说明
## 环境要求
- Node.js 18.17.0 (使用 `nvm use` 自动切换)
- npm 9.6.7
```

### 2. CI/CD 配置

```yaml
# GitHub Actions
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm test
```

### 3. 开发环境检查

```bash
# 项目启动脚本
#!/bin/bash
# scripts/dev.sh

# 检查 Node.js 版本
required_version=$(cat .nvmrc)
current_version=$(node --version | sed 's/v//')

if [ "$current_version" != "$required_version" ]; then
  echo "❌ Node.js 版本不匹配"
  echo "需要: $required_version"
  echo "当前: $current_version"
  echo "请运行: nvm use"
  exit 1
fi

echo "✅ Node.js 版本正确: $current_version"
npm run dev
```

## 💡 常见问题解决

### 权限问题

```bash
# 避免使用 sudo 安装全局包
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### 版本切换失败

```bash
# 清理 npm 缓存
npm cache clean --force

# 重新安装版本
nvm uninstall 18.17.0
nvm install 18.17.0

# 检查环境变量
echo $PATH
which node
which npm
```

### 性能优化

```bash
# 使用镜像加速下载
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/
nvm install 18.17.0

# 或设置永久镜像
echo 'export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/' >> ~/.bashrc
```

Node.js 版本管理是前端开发的基础技能，合理使用版本管理工具能显著提升开发效率和团队协作体验。
