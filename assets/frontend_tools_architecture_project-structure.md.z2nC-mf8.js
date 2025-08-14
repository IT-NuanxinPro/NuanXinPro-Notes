import{_ as n}from"./app.EKD1qkM3.js";import{c as a,o as p,a7 as l}from"./chunks/vue.Bn_qOzU9.js";import"./chunks/vendor.j62-d68X.js";const g=JSON.parse('{"title":"企业级前端项目架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/tools/architecture/project-structure.md","filePath":"frontend/tools/architecture/project-structure.md","lastUpdated":1755180371000}'),i={name:"frontend/tools/architecture/project-structure.md"};function e(t,s,c,r,o,h){return p(),a("div",null,s[0]||(s[0]=[l(`<h1 id="企业级前端项目架构设计" tabindex="-1">企业级前端项目架构设计 <a class="header-anchor" href="#企业级前端项目架构设计" aria-label="Permalink to &quot;企业级前端项目架构设计&quot;">​</a></h1><p>基于现代前端技术栈的企业级项目架构设计方案，涵盖目录结构、技术选型、构建配置等核心要素。</p><h2 id="🏗️-项目架构概览" tabindex="-1">🏗️ 项目架构概览 <a class="header-anchor" href="#🏗️-项目架构概览" aria-label="Permalink to &quot;🏗️ 项目架构概览&quot;">​</a></h2><h3 id="核心设计原则" tabindex="-1">核心设计原则 <a class="header-anchor" href="#核心设计原则" aria-label="Permalink to &quot;核心设计原则&quot;">​</a></h3><ul><li><strong>模块化设计</strong>：API管理层、组件分层、状态管理分离</li><li><strong>渐进式升级</strong>：支持新旧代码并存，平滑技术迁移</li><li><strong>开发体验</strong>：热重载、自动导入、代码提示、构建分析</li><li><strong>生产就绪</strong>：完善的构建优化、错误监控、性能分析</li></ul><h2 id="📁-标准目录结构" tabindex="-1">📁 标准目录结构 <a class="header-anchor" href="#📁-标准目录结构" aria-label="Permalink to &quot;📁 标准目录结构&quot;">​</a></h2><h3 id="完整项目结构" tabindex="-1">完整项目结构 <a class="header-anchor" href="#完整项目结构" aria-label="Permalink to &quot;完整项目结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>project-root/</span></span>
<span class="line"><span>├── build/                      # 构建配置目录</span></span>
<span class="line"><span>│   ├── config/                 # 构建配置模块</span></span>
<span class="line"><span>│   │   ├── index.js           # 配置入口和整合</span></span>
<span class="line"><span>│   │   ├── alias.js           # 路径别名配置</span></span>
<span class="line"><span>│   │   ├── build.js           # 构建选项配置</span></span>
<span class="line"><span>│   │   ├── css.js             # CSS 和 PostCSS 配置</span></span>
<span class="line"><span>│   │   ├── optimization.js    # 依赖优化配置</span></span>
<span class="line"><span>│   │   └── server.js          # 开发服务器配置</span></span>
<span class="line"><span>│   ├── plugins/               # 插件配置模块</span></span>
<span class="line"><span>│   │   ├── index.js           # 插件入口和整合</span></span>
<span class="line"><span>│   │   ├── vue.js             # Vue 相关插件</span></span>
<span class="line"><span>│   │   ├── ui.js              # UI 和自动导入插件</span></span>
<span class="line"><span>│   │   ├── optimization.js    # 优化相关插件</span></span>
<span class="line"><span>│   │   └── custom/            # 自定义插件</span></span>
<span class="line"><span>│   │       ├── style-px-to-vw.js      # px转vw插件</span></span>
<span class="line"><span>│   │       ├── bundle-analyzer.js     # 构建分析插件</span></span>
<span class="line"><span>│   │       └── preload.js             # 资源预加载插件</span></span>
<span class="line"><span>│   └── utils/                 # 构建工具</span></span>
<span class="line"><span>│       └── env.js             # 环境变量处理</span></span>
<span class="line"><span>├── src/</span></span>
<span class="line"><span>│   ├── api/                   # API管理层</span></span>
<span class="line"><span>│   │   ├── index.js          # 统一导出文件</span></span>
<span class="line"><span>│   │   ├── modules/          # API模块</span></span>
<span class="line"><span>│   │   │   ├── user.js       # 用户相关API</span></span>
<span class="line"><span>│   │   │   ├── task.js       # 任务相关API</span></span>
<span class="line"><span>│   │   │   └── common.js     # 通用API</span></span>
<span class="line"><span>│   │   └── README.md         # API使用说明文档</span></span>
<span class="line"><span>│   ├── assets/               # 静态资源</span></span>
<span class="line"><span>│   │   ├── images/           # 图片资源</span></span>
<span class="line"><span>│   │   ├── icons/            # 图标资源</span></span>
<span class="line"><span>│   │   ├── fonts/            # 字体资源</span></span>
<span class="line"><span>│   │   └── styles/           # 全局样式</span></span>
<span class="line"><span>│   │       ├── index.scss    # 样式入口</span></span>
<span class="line"><span>│   │       ├── variables.scss # 变量定义</span></span>
<span class="line"><span>│   │       ├── mixins.scss   # 混合宏</span></span>
<span class="line"><span>│   │       ├── reset.scss    # 重置样式</span></span>
<span class="line"><span>│   │       └── themes/       # 主题样式</span></span>
<span class="line"><span>│   ├── components/           # 组件目录</span></span>
<span class="line"><span>│   │   ├── common/           # 通用组件</span></span>
<span class="line"><span>│   │   │   ├── Button/       # 按钮组件</span></span>
<span class="line"><span>│   │   │   ├── Modal/        # 模态框组件</span></span>
<span class="line"><span>│   │   │   ├── Table/        # 表格组件</span></span>
<span class="line"><span>│   │   │   └── Form/         # 表单组件</span></span>
<span class="line"><span>│   │   ├── business/         # 业务组件</span></span>
<span class="line"><span>│   │   │   ├── UserProfile/  # 用户资料组件</span></span>
<span class="line"><span>│   │   │   ├── TaskManager/  # 任务管理组件</span></span>
<span class="line"><span>│   │   │   └── Dashboard/    # 仪表板组件</span></span>
<span class="line"><span>│   │   └── layout/           # 布局组件</span></span>
<span class="line"><span>│   │       ├── Header/       # 头部组件</span></span>
<span class="line"><span>│   │       ├── Sidebar/      # 侧边栏组件</span></span>
<span class="line"><span>│   │       ├── Footer/       # 底部组件</span></span>
<span class="line"><span>│   │       └── Container/    # 容器组件</span></span>
<span class="line"><span>│   ├── composables/          # 组合式函数</span></span>
<span class="line"><span>│   │   ├── index.js          # 统一导出</span></span>
<span class="line"><span>│   │   ├── useAuth.js        # 认证相关</span></span>
<span class="line"><span>│   │   ├── useApi.js         # API请求</span></span>
<span class="line"><span>│   │   ├── useTable.js       # 表格操作</span></span>
<span class="line"><span>│   │   ├── useForm.js        # 表单处理</span></span>
<span class="line"><span>│   │   └── useUtils.js       # 工具函数</span></span>
<span class="line"><span>│   ├── stores/               # 状态管理</span></span>
<span class="line"><span>│   │   ├── index.js          # Store入口</span></span>
<span class="line"><span>│   │   ├── modules/          # Store模块</span></span>
<span class="line"><span>│   │   │   ├── auth.js       # 认证状态</span></span>
<span class="line"><span>│   │   │   ├── user.js       # 用户状态</span></span>
<span class="line"><span>│   │   │   ├── app.js        # 应用状态</span></span>
<span class="line"><span>│   │   │   └── task.js       # 任务状态</span></span>
<span class="line"><span>│   │   └── plugins/          # Store插件</span></span>
<span class="line"><span>│   ├── router/               # 路由配置</span></span>
<span class="line"><span>│   │   ├── index.js          # 路由入口</span></span>
<span class="line"><span>│   │   ├── routes/           # 路由模块</span></span>
<span class="line"><span>│   │   │   ├── auth.js       # 认证路由</span></span>
<span class="line"><span>│   │   │   ├── dashboard.js  # 仪表板路由</span></span>
<span class="line"><span>│   │   │   └── task.js       # 任务路由</span></span>
<span class="line"><span>│   │   └── guards/           # 路由守卫</span></span>
<span class="line"><span>│   │       ├── auth.js       # 认证守卫</span></span>
<span class="line"><span>│   │       └── permission.js # 权限守卫</span></span>
<span class="line"><span>│   ├── utils/                # 工具函数</span></span>
<span class="line"><span>│   │   ├── index.js          # 工具入口</span></span>
<span class="line"><span>│   │   ├── request.js        # 请求封装</span></span>
<span class="line"><span>│   │   ├── storage.js        # 存储工具</span></span>
<span class="line"><span>│   │   ├── validate.js       # 验证工具</span></span>
<span class="line"><span>│   │   ├── format.js         # 格式化工具</span></span>
<span class="line"><span>│   │   └── constants.js      # 常量定义</span></span>
<span class="line"><span>│   ├── views/                # 页面组件</span></span>
<span class="line"><span>│   │   ├── auth/             # 认证页面</span></span>
<span class="line"><span>│   │   │   ├── Login.vue     # 登录页</span></span>
<span class="line"><span>│   │   │   └── Register.vue  # 注册页</span></span>
<span class="line"><span>│   │   ├── dashboard/        # 仪表板页面</span></span>
<span class="line"><span>│   │   │   └── Index.vue     # 仪表板首页</span></span>
<span class="line"><span>│   │   ├── task/             # 任务页面</span></span>
<span class="line"><span>│   │   │   ├── List.vue      # 任务列表</span></span>
<span class="line"><span>│   │   │   ├── Detail.vue    # 任务详情</span></span>
<span class="line"><span>│   │   │   └── Create.vue    # 创建任务</span></span>
<span class="line"><span>│   │   └── error/            # 错误页面</span></span>
<span class="line"><span>│   │       ├── 404.vue       # 404页面</span></span>
<span class="line"><span>│   │       └── 500.vue       # 500页面</span></span>
<span class="line"><span>│   ├── plugins/              # 插件配置</span></span>
<span class="line"><span>│   │   ├── index.js          # 插件入口</span></span>
<span class="line"><span>│   │   ├── element-plus.js   # Element Plus配置</span></span>
<span class="line"><span>│   │   ├── axios.js          # Axios配置</span></span>
<span class="line"><span>│   │   └── pinia.js          # Pinia配置</span></span>
<span class="line"><span>│   ├── directives/           # 自定义指令</span></span>
<span class="line"><span>│   │   ├── index.js          # 指令入口</span></span>
<span class="line"><span>│   │   ├── loading.js        # 加载指令</span></span>
<span class="line"><span>│   │   ├── permission.js     # 权限指令</span></span>
<span class="line"><span>│   │   └── debounce.js       # 防抖指令</span></span>
<span class="line"><span>│   ├── config/               # 配置文件</span></span>
<span class="line"><span>│   │   ├── index.js          # 配置入口</span></span>
<span class="line"><span>│   │   ├── api.js            # API配置</span></span>
<span class="line"><span>│   │   ├── app.js            # 应用配置</span></span>
<span class="line"><span>│   │   └── env.js            # 环境配置</span></span>
<span class="line"><span>│   ├── types/                # TypeScript类型定义</span></span>
<span class="line"><span>│   │   ├── index.ts          # 类型入口</span></span>
<span class="line"><span>│   │   ├── api.ts            # API类型</span></span>
<span class="line"><span>│   │   ├── store.ts          # Store类型</span></span>
<span class="line"><span>│   │   └── common.ts         # 通用类型</span></span>
<span class="line"><span>│   ├── App.vue               # 根组件</span></span>
<span class="line"><span>│   └── main.js               # 应用入口</span></span>
<span class="line"><span>├── public/                   # 公共资源</span></span>
<span class="line"><span>│   ├── favicon.ico           # 网站图标</span></span>
<span class="line"><span>│   ├── index.html            # HTML模板</span></span>
<span class="line"><span>│   └── manifest.json         # PWA配置</span></span>
<span class="line"><span>├── tests/                    # 测试文件</span></span>
<span class="line"><span>│   ├── unit/                 # 单元测试</span></span>
<span class="line"><span>│   ├── e2e/                  # 端到端测试</span></span>
<span class="line"><span>│   └── utils/                # 测试工具</span></span>
<span class="line"><span>├── docs/                     # 项目文档</span></span>
<span class="line"><span>│   ├── README.md             # 项目说明</span></span>
<span class="line"><span>│   ├── CHANGELOG.md          # 更新日志</span></span>
<span class="line"><span>│   ├── CONTRIBUTING.md       # 贡献指南</span></span>
<span class="line"><span>│   └── api/                  # API文档</span></span>
<span class="line"><span>├── .vscode/                  # VSCode配置</span></span>
<span class="line"><span>│   ├── settings.json         # 编辑器设置</span></span>
<span class="line"><span>│   ├── extensions.json       # 推荐扩展</span></span>
<span class="line"><span>│   └── launch.json           # 调试配置</span></span>
<span class="line"><span>├── .husky/                   # Git Hooks</span></span>
<span class="line"><span>│   ├── pre-commit            # 提交前钩子</span></span>
<span class="line"><span>│   ├── commit-msg            # 提交信息钩子</span></span>
<span class="line"><span>│   └── pre-push              # 推送前钩子</span></span>
<span class="line"><span>├── .github/                  # GitHub配置</span></span>
<span class="line"><span>│   ├── workflows/            # GitHub Actions</span></span>
<span class="line"><span>│   │   ├── ci.yml            # 持续集成</span></span>
<span class="line"><span>│   │   └── deploy.yml        # 部署流程</span></span>
<span class="line"><span>│   └── ISSUE_TEMPLATE/       # Issue模板</span></span>
<span class="line"><span>├── vite.config.js            # Vite配置</span></span>
<span class="line"><span>├── package.json              # 项目配置</span></span>
<span class="line"><span>├── pnpm-lock.yaml            # 依赖锁定</span></span>
<span class="line"><span>├── .gitignore                # Git忽略</span></span>
<span class="line"><span>├── .eslintrc.js              # ESLint配置</span></span>
<span class="line"><span>├── .prettierrc               # Prettier配置</span></span>
<span class="line"><span>├── .stylelintrc.js           # Stylelint配置</span></span>
<span class="line"><span>├── commitlint.config.js      # Commitlint配置</span></span>
<span class="line"><span>├── tsconfig.json             # TypeScript配置</span></span>
<span class="line"><span>└── README.md                 # 项目说明</span></span></code></pre></div><h2 id="🎯-架构设计亮点" tabindex="-1">🎯 架构设计亮点 <a class="header-anchor" href="#🎯-架构设计亮点" aria-label="Permalink to &quot;🎯 架构设计亮点&quot;">​</a></h2><h3 id="_1-模块化构建配置" tabindex="-1">1. 模块化构建配置 <a class="header-anchor" href="#_1-模块化构建配置" aria-label="Permalink to &quot;1. 模块化构建配置&quot;">​</a></h3><ul><li><strong>配置分离</strong>：将构建配置按功能模块化</li><li><strong>插件管理</strong>：统一的插件配置和管理</li><li><strong>环境适配</strong>：不同环境的差异化配置</li></ul><h3 id="_2-组件分层架构" tabindex="-1">2. 组件分层架构 <a class="header-anchor" href="#_2-组件分层架构" aria-label="Permalink to &quot;2. 组件分层架构&quot;">​</a></h3><ul><li><strong>原子设计</strong>：按照原子设计系统组织组件</li><li><strong>业务分离</strong>：通用组件与业务组件分离</li><li><strong>布局独立</strong>：布局组件单独管理</li></ul><h3 id="_3-状态管理策略" tabindex="-1">3. 状态管理策略 <a class="header-anchor" href="#_3-状态管理策略" aria-label="Permalink to &quot;3. 状态管理策略&quot;">​</a></h3><ul><li><strong>模块化Store</strong>：按业务模块划分状态</li><li><strong>插件扩展</strong>：支持状态持久化等插件</li><li><strong>类型安全</strong>：完整的TypeScript类型支持</li></ul><h3 id="_4-路由设计模式" tabindex="-1">4. 路由设计模式 <a class="header-anchor" href="#_4-路由设计模式" aria-label="Permalink to &quot;4. 路由设计模式&quot;">​</a></h3><ul><li><strong>模块化路由</strong>：按功能模块组织路由</li><li><strong>守卫机制</strong>：完善的路由守卫系统</li><li><strong>权限控制</strong>：基于角色的访问控制</li></ul><h2 id="💡-最佳实践建议" tabindex="-1">💡 最佳实践建议 <a class="header-anchor" href="#💡-最佳实践建议" aria-label="Permalink to &quot;💡 最佳实践建议&quot;">​</a></h2><h3 id="_1-命名规范" tabindex="-1">1. 命名规范 <a class="header-anchor" href="#_1-命名规范" aria-label="Permalink to &quot;1. 命名规范&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文件命名：kebab-case</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">profile.vue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">task</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">manager.js</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 组件命名：PascalCase</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">UserProfile.vue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">TaskManager.vue</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 函数命名：camelCase</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getUserInfo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createTask</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 常量命名：UPPER_SNAKE_CASE</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">API_BASE_URL</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">MAX_RETRY_COUNT</span></span></code></pre></div><h3 id="_2-导入导出规范" tabindex="-1">2. 导入导出规范 <a class="header-anchor" href="#_2-导入导出规范" aria-label="Permalink to &quot;2. 导入导出规范&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 统一导出</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> UserProfile } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./UserProfile.vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TaskManager } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./TaskManager.vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 统一导入</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { UserProfile, TaskManager } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/components/business&#39;</span></span></code></pre></div><h3 id="_3-代码组织原则" tabindex="-1">3. 代码组织原则 <a class="header-anchor" href="#_3-代码组织原则" aria-label="Permalink to &quot;3. 代码组织原则&quot;">​</a></h3><ul><li><strong>单一职责</strong>：每个模块只负责一个功能</li><li><strong>高内聚低耦合</strong>：模块内部紧密相关，模块间松散耦合</li><li><strong>可测试性</strong>：代码结构便于单元测试</li><li><strong>可维护性</strong>：清晰的代码结构和注释</li></ul><p>这个架构设计为企业级前端项目提供了完整的解决方案，确保项目的可扩展性、可维护性和团队协作效率。</p>`,25)]))}const m=n(i,[["render",e]]);export{g as __pageData,m as default};
