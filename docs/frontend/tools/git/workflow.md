# Git 工作流实战指南

Git 是现代软件开发中不可或缺的版本控制工具，掌握 Git 工作流对前端开发者至关重要。

## 🚀 Git 基础操作

### 仓库初始化

```bash
# 初始化新仓库
git init

# 克隆远程仓库
git clone https://github.com/username/repo.git

# 添加远程仓库
git remote add origin https://github.com/username/repo.git

# 查看远程仓库
git remote -v
```

### 基本工作流

```bash
# 查看状态
git status

# 添加文件到暂存区
git add .                    # 添加所有文件
git add src/                 # 添加指定目录
git add *.js                 # 添加指定类型文件

# 提交更改
git commit -m "feat: 添加用户登录功能"

# 推送到远程
git push origin main

# 拉取最新代码
git pull origin main
```

## 🌿 分支管理策略

### Git Flow 工作流

```bash
# 创建并切换到新分支
git checkout -b feature/user-auth

# 切换分支
git checkout main
git switch main              # Git 2.23+ 新语法

# 查看分支
git branch                   # 本地分支
git branch -r               # 远程分支
git branch -a               # 所有分支

# 合并分支
git checkout main
git merge feature/user-auth

# 删除分支
git branch -d feature/user-auth      # 删除本地分支
git push origin --delete feature/user-auth  # 删除远程分支
```

### 分支命名规范

```bash
# 功能分支
feature/user-login
feature/shopping-cart
feature/payment-integration

# 修复分支
fix/login-validation
fix/memory-leak
hotfix/critical-security-issue

# 发布分支
release/v1.2.0
release/2024-q1

# 开发分支
develop
dev/experimental-feature
```

## 📝 提交规范

### Conventional Commits

```bash
# 功能提交
git commit -m "feat: 添加用户注册功能"
git commit -m "feat(auth): 实现JWT令牌验证"

# 修复提交
git commit -m "fix: 修复登录页面样式问题"
git commit -m "fix(api): 解决用户数据获取失败"

# 文档提交
git commit -m "docs: 更新API文档"
git commit -m "docs(readme): 添加安装说明"

# 样式提交
git commit -m "style: 格式化代码"
git commit -m "style(components): 统一组件样式"

# 重构提交
git commit -m "refactor: 重构用户服务模块"
git commit -m "refactor(utils): 优化工具函数"

# 性能提交
git commit -m "perf: 优化图片加载性能"
git commit -m "perf(bundle): 减少打包体积"

# 测试提交
git commit -m "test: 添加用户登录测试用例"
git commit -m "test(e2e): 完善端到端测试"

# 构建提交
git commit -m "build: 升级webpack到5.0"
git commit -m "ci: 配置GitHub Actions"
```

### 提交信息模板

```bash
# 设置提交模板
git config --global commit.template ~/.gitmessage

# ~/.gitmessage 内容
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>
#
# type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
# scope: 影响范围，如 auth, api, ui, core
# subject: 简短描述，不超过50字符
# body: 详细描述（可选）
# footer: 关联issue或破坏性变更（可选）
```

## 🔄 高级操作

### 撤销和回滚

```bash
# 撤销工作区修改
git checkout -- filename.js
git restore filename.js      # Git 2.23+ 新语法

# 撤销暂存区修改
git reset HEAD filename.js
git restore --staged filename.js

# 撤销提交
git reset --soft HEAD~1      # 保留修改，撤销提交
git reset --mixed HEAD~1     # 撤销提交和暂存，保留修改
git reset --hard HEAD~1      # 完全撤销，丢失修改

# 回滚到指定提交
git reset --hard commit-hash

# 创建反向提交
git revert commit-hash
```

### 变基操作

```bash
# 交互式变基
git rebase -i HEAD~3

# 变基到主分支
git rebase main

# 解决冲突后继续
git rebase --continue

# 中止变基
git rebase --abort

# 压缩提交示例
# 在交互式编辑器中：
# pick abc1234 第一个提交
# squash def5678 第二个提交
# squash ghi9012 第三个提交
```

### 储藏功能

```bash
# 储藏当前修改
git stash
git stash push -m "临时保存登录功能开发"

# 查看储藏列表
git stash list

# 应用储藏
git stash apply              # 应用最新储藏
git stash apply stash@{1}    # 应用指定储藏

# 弹出储藏
git stash pop

# 删除储藏
git stash drop stash@{1}
git stash clear              # 清空所有储藏
```

## 🔍 查看历史

### 日志查看

```bash
# 查看提交历史
git log
git log --oneline            # 简洁格式
git log --graph              # 图形化显示
git log --author="张三"       # 按作者筛选
git log --since="2024-01-01" # 按时间筛选
git log --grep="登录"        # 按提交信息筛选

# 查看文件历史
git log -- filename.js
git log -p filename.js       # 显示具体修改

# 查看分支历史
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

### 差异比较

```bash
# 查看工作区差异
git diff

# 查看暂存区差异
git diff --staged

# 比较分支
git diff main..feature/login

# 比较提交
git diff commit1 commit2

# 查看文件差异
git diff filename.js
git diff HEAD~1 filename.js
```

## 🏷️ 标签管理

### 创建标签

```bash
# 轻量标签
git tag v1.0.0

# 附注标签
git tag -a v1.0.0 -m "发布版本1.0.0"

# 为历史提交打标签
git tag -a v0.9.0 commit-hash -m "版本0.9.0"

# 推送标签
git push origin v1.0.0       # 推送单个标签
git push origin --tags       # 推送所有标签
```

### 管理标签

```bash
# 查看标签
git tag
git tag -l "v1.*"            # 筛选标签

# 查看标签信息
git show v1.0.0

# 删除标签
git tag -d v1.0.0            # 删除本地标签
git push origin --delete v1.0.0  # 删除远程标签
```

## 🔧 配置优化

### 全局配置

```bash
# 用户信息
git config --global user.name "你的姓名"
git config --global user.email "your.email@example.com"

# 编辑器
git config --global core.editor "code --wait"

# 默认分支名
git config --global init.defaultBranch main

# 自动换行
git config --global core.autocrlf input    # macOS/Linux
git config --global core.autocrlf true     # Windows

# 颜色输出
git config --global color.ui auto

# 别名设置
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### 忽略文件

```bash
# .gitignore 示例
# 依赖目录
node_modules/
bower_components/

# 构建输出
dist/
build/
*.min.js
*.min.css

# 日志文件
*.log
logs/

# 环境配置
.env
.env.local
.env.production

# IDE 文件
.vscode/
.idea/
*.swp
*.swo

# 操作系统文件
.DS_Store
Thumbs.db

# 临时文件
*.tmp
*.temp
```

## 🚨 常见问题解决

### 冲突解决

```bash
# 合并冲突
git merge feature-branch
# 手动解决冲突后
git add .
git commit -m "resolve merge conflicts"

# 变基冲突
git rebase main
# 解决冲突后
git add .
git rebase --continue
```

### 紧急修复

```bash
# 紧急修复流程
git stash                    # 储藏当前工作
git checkout main            # 切换到主分支
git pull origin main         # 拉取最新代码
git checkout -b hotfix/critical-bug  # 创建修复分支
# 进行修复
git add .
git commit -m "fix: 修复关键bug"
git checkout main
git merge hotfix/critical-bug
git push origin main
git branch -d hotfix/critical-bug
git stash pop               # 恢复之前的工作
```

## 💡 最佳实践

### 1. 提交频率
- 小步快跑，频繁提交
- 每个提交只做一件事
- 提交前确保代码可运行

### 2. 分支策略
- 主分支保持稳定
- 功能分支及时合并
- 定期清理无用分支

### 3. 代码审查
- 使用 Pull Request 流程
- 代码审查前自测
- 及时响应审查意见

### 4. 团队协作
- 统一提交规范
- 定期同步主分支
- 及时解决冲突

Git 工作流的掌握需要在实践中不断积累经验，建议从基础操作开始，逐步掌握高级功能。
