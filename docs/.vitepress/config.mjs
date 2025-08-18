import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/NuanXinPro-Notes/',
  title: "暖心のBlog",
  description: "Record daily front-end knowledge",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: '暖心のBlog' }],
  ],

  vite: {
    build: {
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('vitepress')) {
                return 'vitepress'
              }
              if (id.includes('vue') || id.includes('@vue')) {
                return 'vue'
              }
              return 'vendor'
            }
          }
        }
      }
    }
  },

  themeConfig: {
    logo: '/avatar.svg',
    siteTitle: '暖心のBlog',

    // 导航栏配置
    nav: [
      { text: '🏠 首页', link: '/' },
      {
        text: '📚 前端基础',
        items: [
          { text: 'HTML5', link: '/frontend/basics/html' },
          { text: 'CSS3', link: '/frontend/basics/css' },
          { text: 'JavaScript', link: '/frontend/basics/javascript' },
          { text: 'TypeScript', link: '/frontend/basics/typescript' },
        ]
      },
      {
        text: '🎯 前端框架',
        items: [
          { text: 'Vue 生态', link: '/frontend/vue/' },
          { text: 'React 生态', link: '/frontend/react/' },
        ]
      },
      {
        text: '🛠️ 前端工具链',
        items: [
          { text: 'Git 版本控制', link: '/frontend/tools/git/workflow' },
          { text: '包管理器', link: '/frontend/tools/package-manager/' },
          { text: '开发环境', link: '/frontend/tools/environment/node-version' },
          { text: '编辑器配置', link: '/frontend/tools/editor/vscode' },
          { text: '调试工具', link: '/frontend/tools/debugging/' },
        ]
      },
      {
        text: '⚡ 前端工程化',
        items: [
          // { text: '项目架构', link: '/frontend/engineering/architecture/' },
          { text: '构建系统', link: '/frontend/engineering/build/' },
          { text: '代码质量', link: '/frontend/engineering/quality/' },
          // { text: '测试策略', link: '/frontend/engineering/testing/' },
          { text: 'Monorepo 管理', link: '/frontend/engineering/monorepo/overview' },
          { text: 'CI/CD 流程', link: '/frontend/engineering/cicd/' },
          { text: '性能优化', link: '/frontend/engineering/performance/' },
          // { text: '监控分析', link: '/frontend/engineering/monitoring/' },
        ]
      },
      {
        text: '🎨 UI 组件库',
        items: [
          { text: 'Vue UI 库', link: '/frontend/ui/vue/' },
          { text: 'React UI 库', link: '/frontend/ui/react/' },
        ]
      },
      {
        text: '💼 面试宝典',
        items: [
          { text: '基础面试题', link: '/interview/questions/' },
          { text: '手写代码题', link: '/interview/coding/' },
          // { text: '项目实战', link: '/interview/projects/' },
          { text: '简易算法', link: '/interview/algorithms/' }
        ]
      }
    ],

    // 侧边栏配置
    sidebar: {
      '/frontend/basics/': [
        {
          text: '前端基础知识',
          items: [
            { text: '概述', link: '/frontend/basics/' }
          ]
        },
        {
          text: 'HTML 核心',
          items: [
            { text: '概述', link: '/frontend/basics/html/' },
            { text: '文档结构与语义化', link: '/frontend/basics/html/structure' },
            { text: '表单与交互', link: '/frontend/basics/html/forms' },
            { text: '多媒体与嵌入', link: '/frontend/basics/html/media' },
            { text: '元信息与SEO', link: '/frontend/basics/html/meta-seo' },
            { text: '全局属性', link: '/frontend/basics/html/attributes' },
            { text: 'HTML5 API', link: '/frontend/basics/html/html5-api' }
          ]
        },
        {
          text: 'CSS 核心',
          items: [
            { text: '概述', link: '/frontend/basics/css/' },
            { text: '选择器与优先级', link: '/frontend/basics/css/selectors' },
            { text: '盒模型', link: '/frontend/basics/css/box-model' },
            { text: '布局', link: '/frontend/basics/css/layout' },
            { text: '单位与尺寸', link: '/frontend/basics/css/units' },
            { text: '颜色与背景', link: '/frontend/basics/css/colors' },
            { text: '文字与字体', link: '/frontend/basics/css/typography' },
            { text: '动画与过渡', link: '/frontend/basics/css/animations' },
            { text: '响应式与适配', link: '/frontend/basics/css/responsive' }
          ]
        },
        {
          text: 'JavaScript 核心',
          items: [
            { text: '概述', link: '/frontend/basics/javascript/' },
            { text: '数据类型与转换', link: '/frontend/basics/javascript/data-types' },
            { text: '作用域与闭包', link: '/frontend/basics/javascript/scope-closure' },
            { text: '事件循环与异步机制', link: '/frontend/basics/javascript/event-loop' },
            { text: '类与面向对象', link: '/frontend/basics/javascript/classes' },
            { text: '前端安全', link: '/frontend/basics/javascript/security' }
          ]
        },
        {
          text: 'TypeScript 核心',
          items: [
            { text: '概述', link: '/frontend/basics/typescript/' },
            { text: '基础类型与接口', link: '/frontend/basics/typescript/basics' },
            { text: '泛型详解', link: '/frontend/basics/typescript/generics' },
            { text: '高级类型与类型体操', link: '/frontend/basics/typescript/advanced-types' },
            { text: '内置工具类型', link: '/frontend/basics/typescript/utility-types' },
            { text: 'Vue3 + TypeScript', link: '/frontend/basics/typescript/vue-typescript' },
            { text: 'React18 + TypeScript', link: '/frontend/basics/typescript/react-typescript' }
          ]
        }
      ],

      '/frontend/vue/': [
        {
          text: 'Vue.js 深度学习指南',
          items: [
            { text: '概述', link: '/frontend/vue/' },
          ]
        },
        {
          text: 'Vue2 核心原理',
          items: [
            { text: '概述', link: '/frontend/vue/vue2/' },
            { text: '响应式系统', link: '/frontend/vue/vue2/reactivity' },
            { text: '虚拟DOM与Diff算法', link: '/frontend/vue/vue2/virtual-dom' },
            { text: '双向绑定机制', link: '/frontend/vue/vue2/two-way-binding' },
            { text: '生命周期深度解析', link: '/frontend/vue/vue2/lifecycle' }
          ]
        },
        {
          text: 'Vue3 现代化特性',
          items: [
            { text: '概述', link: '/frontend/vue/vue3/' },
            { text: 'Proxy响应式系统', link: '/frontend/vue/vue3/reactivity' },
            { text: 'Composition API深度解析', link: '/frontend/vue/vue3/composition-api' },
            { text: '性能优化机制', link: '/frontend/vue/vue3/performance' }
          ]
        },
        {
          text: '状态管理深度解析',
          items: [
            { text: '概述', link: '/frontend/vue/state/' },
            { text: 'Vuex深度解析', link: '/frontend/vue/state/vuex' },
            { text: 'Pinia现代化方案', link: '/frontend/vue/state/pinia' }
          ]
        },
        {
          text: 'Vue Router路由系统',
          items: [
            { text: '概述', link: '/frontend/vue/router/' },
            { text: '核心原理深度解析', link: '/frontend/vue/router/core' },
            { text: '导航守卫与权限控制', link: '/frontend/vue/router/guards' },
            { text: '动态路由实现', link: '/frontend/vue/router/dynamic' }
          ]
        },
        {
          text: '性能优化与工程化',
          items: [
            { text: '概述', link: '/frontend/vue/optimization/' },
            { text: '构建优化深度解析', link: '/frontend/vue/optimization/build' },
            { text: 'SSR服务端渲染', link: '/frontend/vue/optimization/ssr' }
          ]
        }
      ],

      '/frontend/react/': [
        {
          text: 'React 生态系统',
          items: [
            { text: '概述', link: '/frontend/react/' },
          ]
        },
        {
          text: 'React18 核心',
          items: [
            { text: 'JSX 语法', link: '/frontend/react/basics/jsx' },
            { text: '组件基础', link: '/frontend/react/basics/components' },
            { text: 'Props & State', link: '/frontend/react/basics/props-state' },
            { text: '事件处理', link: '/frontend/react/basics/events' }
          ]
        },
        {
          text: 'React Hooks',
          items: [
            { text: 'useState & useEffect', link: '/frontend/react/hooks/basic' },
            { text: 'useContext & useReducer', link: '/frontend/react/hooks/advanced' },
            { text: '自定义 Hooks', link: '/frontend/react/hooks/custom' },
            { text: 'Hooks 最佳实践', link: '/frontend/react/hooks/best-practices' }
          ]
        },
        {
          text: '状态管理',
          items: [
            { text: 'Redux Toolkit', link: '/frontend/react/state/redux' },
            { text: 'Zustand', link: '/frontend/react/state/zustand' },
            { text: 'Context API', link: '/frontend/react/state/context' }
          ]
        },
        {
          text: '路由系统',
          items: [
            { text: 'React Router 6', link: '/frontend/react/router/basics' },
            { text: '嵌套路由', link: '/frontend/react/router/nested' },
            { text: '路由守卫', link: '/frontend/react/router/guards' }
          ]
        },
        {
          text: 'Next.js 全栈',
          items: [
            { text: 'App Router', link: '/frontend/react/nextjs/app-router' },
            { text: 'Server Components', link: '/frontend/react/nextjs/server-components' },
            { text: 'API Routes', link: '/frontend/react/nextjs/api-routes' }
          ]
        }
      ],

      '/frontend/tools/': [
        {
          text: '前端工具链',
          items: [
            { text: '概述', link: '/frontend/tools/' },
          ]
        },
        {
          text: '版本控制',
          items: [
            { text: 'Git 工作流实战', link: '/frontend/tools/git/workflow' },
            { text: 'Git 分支策略', link: '/frontend/tools/git/branching' },
          ]
        },
        {
          text: '包管理器',
          items: [
            { text: 'npm/yarn/pnpm', link: '/frontend/tools/package-manager/' },
            { text: '依赖管理策略', link: '/frontend/tools/package-manager/dependencies' }
          ]
        },
        {
          text: '开发环境',
          items: [
            { text: 'Node.js 版本管理', link: '/frontend/tools/environment/node-version' },
            // { text: '开发环境配置', link: '/frontend/tools/environment/setup' },
            // { text: '跨平台开发', link: '/frontend/tools/environment/cross-platform' }
          ]
        },
        {
          text: '编辑器配置',
          items: [
            { text: 'VSCode 配置', link: '/frontend/tools/editor/vscode' },
            { text: '插件推荐', link: '/frontend/tools/editor/plugins' },
          ]
        },
        {
          text: '调试工具',
          items: [
            // { text: '浏览器调试', link: '/frontend/tools/debugging/browser' },
            // { text: '移动端调试', link: '/frontend/tools/debugging/mobile' },
            // { text: '性能调试', link: '/frontend/tools/debugging/performance' }
          ]
        }
      ],

      '/frontend/engineering/': [
        {
          text: '前端工程化',
          items: [
            { text: '概述', link: '/frontend/engineering/' },
          ]
        },
        // {
        //   text: '项目架构',
        //   items: [
        //     { text: '企业级项目结构', link: '/frontend/engineering/architecture/project-structure' },
        //     { text: '模块化设计', link: '/frontend/engineering/architecture/modular-design' },
        //     { text: '组件设计规范', link: '/frontend/engineering/architecture/component-design' },
        //     { text: '微前端架构', link: '/frontend/engineering/architecture/micro-frontend' }
        //   ]
        // },
        {
          text: '构建系统',
          items: [
            { text: '概述', link: '/frontend/engineering/build/' },
            { text: 'Vite 配置详解', link: '/frontend/engineering/build/vite-config' },
            { text: 'Webpack 配置详解', link: '/frontend/engineering/build/webpack-config' },
            // { text: 'Rollup 打包', link: '/frontend/engineering/build/rollup' },
            // { text: 'esbuild 快速构建', link: '/frontend/engineering/build/esbuild' },
            // { text: '构建优化策略', link: '/frontend/engineering/build/optimization' },
            { text: 'Vite 插件开发', link: '/frontend/engineering/build/vite-plugins/' }
          ]
        },
        {
          text: '代码质量',
          items: [
            { text: 'ESLint 规范配置', link: '/frontend/engineering/quality/eslint' },
            { text: 'Prettier 格式化', link: '/frontend/engineering/quality/prettier' },
            { text: 'Stylelint 样式规范', link: '/frontend/engineering/quality/stylelint' },
            { text: 'Git Hooks 配置', link: '/frontend/engineering/quality/git-hooks' },
            // { text: '代码审查流程', link: '/frontend/engineering/quality/code-review' },
            // { text: 'TypeScript 规范', link: '/frontend/engineering/quality/typescript' }
          ]
        },
        {
          text: 'Monorepo 管理',
          items: [
            { text: 'Monorepo 概述', link: '/frontend/engineering/monorepo/overview' },
            // { text: 'pnpm Workspaces', link: '/frontend/engineering/monorepo/pnpm' },
            // { text: 'Lerna 管理', link: '/frontend/engineering/monorepo/lerna' },
            // { text: 'Nx 企业方案', link: '/frontend/engineering/monorepo/nx' },
            // { text: 'Turborepo 优化', link: '/frontend/engineering/monorepo/turborepo' }
          ]
        },
        {
          text: 'CI/CD 流程',
          items: [
            // { text: 'GitHub Actions', link: '/frontend/engineering/cicd/github-actions' },
            // { text: '自动化部署', link: '/frontend/engineering/cicd/deployment' },
            // { text: '版本发布管理', link: '/frontend/engineering/cicd/release' },
            // { text: '多环境管理', link: '/frontend/engineering/cicd/environments' },
            // { text: '容器化部署', link: '/frontend/engineering/cicd/docker' }
          ]
        },
        {
          text: '性能优化',
          items: [
            // { text: '性能监控', link: '/frontend/engineering/performance/monitoring' },
            // { text: '代码分割', link: '/frontend/engineering/performance/code-splitting' },
            // { text: '懒加载策略', link: '/frontend/engineering/performance/lazy-loading' },
            // { text: '缓存策略', link: '/frontend/engineering/performance/caching' },
            // { text: '图片优化', link: '/frontend/engineering/performance/images' },
            // { text: 'Web Vitals', link: '/frontend/engineering/performance/web-vitals' },
            // { text: 'Bundle 分析', link: '/frontend/engineering/performance/bundle-analysis' }
          ]
        },
        {
          text: '监控分析',
          items: [
            // { text: '错误监控', link: '/frontend/engineering/monitoring/error-tracking' },
            // { text: '性能分析', link: '/frontend/engineering/monitoring/performance-analysis' },
            // { text: '用户行为分析', link: '/frontend/engineering/monitoring/user-analytics' },
            // { text: '日志管理', link: '/frontend/engineering/monitoring/logging' },
            // { text: '告警系统', link: '/frontend/engineering/monitoring/alerting' }
          ]
        }
      ],

      '/frontend/ui/': [
        {
          text: 'UI 组件库',
          items: [
            { text: '概述', link: '/frontend/ui/' },
          ]
        },
        {
          text: 'Vue UI 库',
          items: [
            { text: '概述', link: '/frontend/ui/vue/' },
            { text: 'Element Plus 详解', link: '/frontend/ui/vue/element-plus' },
            // { text: 'Vuetify 使用指南', link: '/frontend/ui/vue/vuetify' },
            { text: 'Ant Design Vue', link: '/frontend/ui/vue/ant-design-vue' }
          ]
        },
        {
          text: 'React UI 库',
          items: [
            { text: '概述', link: '/frontend/ui/react/' },
            { text: 'Ant Design 详解', link: '/frontend/ui/react/ant-design' },
            // { text: 'Material-UI 指南', link: '/frontend/ui/react/material-ui' },
            // { text: 'Chakra UI 使用', link: '/frontend/ui/react/chakra-ui' }
          ]
        },
        // vant
        {
          text: 'Vant UI 库',
          items: [
            { text: '概述', link: '/frontend/ui/vant/' },
          ]
        }
      ],

      '/frontend/engineering/build/vite-plugins/': [
        {
          text: 'Vite 插件开发',
          items: [
            { text: '插件开发指南', link: '/frontend/engineering/build/vite-plugins/' },
            { text: '行间样式 px 转 vw', link: '/frontend/engineering/build/vite-plugins/px-to-vw' },
            { text: '资源预加载插件', link: '/frontend/engineering/build/vite-plugins/preload' }
          ]
        }
      ],

      '/interview/': [
        {
          text: '面试宝典',
          items: [
            { text: '概述', link: '/interview/' },
          ]
        },
        {
          text: '基础面试题',
          items: [
            { text: 'HTML/CSS 面试题', link: '/interview/questions/html-css' },
            { text: 'JavaScript 面试题', link: '/interview/questions/javascript' },
            { text: 'Vue 面试题', link: '/interview/questions/vue' },
            { text: 'React 面试题', link: '/interview/questions/react' },
            { text: '浏览器原理', link: '/interview/questions/browser' },
            { text: '网络协议', link: '/interview/questions/network' }
          ]
        },
        {
          text: '手写代码题',
          items: [
            { text: 'JavaScript 实现', link: '/interview/coding/javascript' },
            { text: '数据结构实现', link: '/interview/coding/data-structures' },
            { text: '设计模式', link: '/interview/coding/design-patterns' },
            { text: '工具函数', link: '/interview/coding/utils' }
          ]
        },
        {
          text: '项目实战',
          items: [
            { text: '项目架构设计', link: '/interview/projects/architecture' },
            { text: '技术选型', link: '/interview/projects/tech-stack' },
            { text: '性能优化案例', link: '/interview/projects/performance' },
            { text: '问题解决方案', link: '/interview/projects/solutions' }
          ]
        },
        {
          text: '算法与数据结构',
          items: [
            { text: '数组与字符串', link: '/interview/algorithms/array-string' },
            { text: '链表与树', link: '/interview/algorithms/linkedlist-tree' },
            { text: '排序与搜索', link: '/interview/algorithms/sort-search' },
            { text: '动态规划', link: '/interview/algorithms/dp' }
          ]
        }
      ],

      '/guide/': [
        {
          text: '学习指南',
          items: [
            { text: '概述', link: '/guide/' },
            // { text: '前端学习路线', link: '/guide/roadmap' },
            // { text: '技术栈选择', link: '/guide/tech-stack' },
            // { text: '学习资源推荐', link: '/guide/resources' },
            // { text: '职业发展规划', link: '/guide/career' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IT-NuanxinPro/NuanXinPro-Notes' }
    ],

    // 搜索配置
    search: {
      provider: 'local'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/IT-NuanxinPro/NuanXinPro-Notes/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  }
})
