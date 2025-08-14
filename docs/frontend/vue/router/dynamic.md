# Vue Router 动态路由

动态路由是Vue Router的核心特性之一，允许我们创建灵活的路由模式，支持参数传递、嵌套路由和运行时路由管理。

## 🔧 路径参数详解

### 1. 基础参数匹配

```javascript
const routes = [
  // 基础参数
  { path: '/user/:id', component: User },
  
  // 多个参数
  { path: '/user/:id/post/:postId', component: Post },
  
  // 可选参数
  { path: '/user/:id?', component: User },
  
  // 参数约束（正则表达式）
  { path: '/user/:id(\\d+)', component: User },
  
  // 可重复参数
  { path: '/user/:ids+', component: Users },
  
  // 通配符
  { path: '/user/*', component: UserCatchAll },
  
  // 命名参数
  { 
    path: '/user/:id', 
    name: 'user',
    component: User 
  }
]

// 在组件中访问参数
export default {
  name: 'User',
  created() {
    console.log('用户ID:', this.$route.params.id)
    console.log('查询参数:', this.$route.query)
    console.log('完整路径:', this.$route.fullPath)
  },
  
  // 监听路由参数变化
  watch: {
    '$route'(to, from) {
      console.log('路由变化:', from.params.id, '->', to.params.id)
      this.fetchUser(to.params.id)
    }
  },
  
  methods: {
    async fetchUser(id) {
      try {
        this.user = await api.getUser(id)
      } catch (error) {
        console.error('获取用户失败:', error)
      }
    }
  }
}
```

### 2. 高级参数模式

```javascript
const routes = [
  // 自定义正则
  {
    path: '/order/:orderId([A-Z]{2}\\d{6})',
    component: Order,
    meta: { title: '订单详情' }
  },
  
  // 多个可选参数
  {
    path: '/search/:category?/:keyword?',
    component: Search,
    props: route => ({
      category: route.params.category || 'all',
      keyword: route.params.keyword || '',
      page: parseInt(route.query.page) || 1
    })
  },
  
  // 数组参数
  {
    path: '/tags/:tags*',
    component: TagList,
    props: route => ({
      tags: route.params.tags ? route.params.tags.split('/') : []
    })
  },
  
  // 敏感参数匹配
  {
    path: '/Case/:id',
    component: CaseSensitive,
    caseSensitive: true
  },
  
  // 严格模式
  {
    path: '/strict/',
    component: Strict,
    strict: true
  }
]
```

### 3. 参数验证与转换

```javascript
// 参数验证守卫
function validateParams(to, from, next) {
  const { id } = to.params
  
  // 验证ID格式
  if (!/^\d+$/.test(id)) {
    next({ name: 'NotFound' })
    return
  }
  
  // 验证ID范围
  const numId = parseInt(id)
  if (numId < 1 || numId > 999999) {
    next({ name: 'InvalidId' })
    return
  }
  
  next()
}

const routes = [
  {
    path: '/user/:id',
    component: User,
    beforeEnter: validateParams,
    props: route => ({
      userId: parseInt(route.params.id),
      tab: route.query.tab || 'profile'
    })
  }
]

// 组件内参数处理
export default {
  name: 'User',
  props: ['userId', 'tab'],
  
  async created() {
    await this.loadUser()
  },
  
  async beforeRouteUpdate(to, from) {
    // 参数变化时重新加载
    if (to.params.id !== from.params.id) {
      this.userId = parseInt(to.params.id)
      await this.loadUser()
    }
  },
  
  methods: {
    async loadUser() {
      this.loading = true
      try {
        this.user = await api.getUser(this.userId)
      } catch (error) {
        if (error.status === 404) {
          this.$router.replace({ name: 'UserNotFound' })
        } else {
          this.error = error.message
        }
      } finally {
        this.loading = false
      }
    }
  }
}
```

## 🏗️ 嵌套路由实现

### 1. 基础嵌套路由

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 空路径表示默认子路由
      { path: '', component: UserHome },
      
      // 相对路径
      { path: 'profile', component: UserProfile },
      { path: 'posts', component: UserPosts },
      { path: 'settings', component: UserSettings },
      
      // 绝对路径
      { path: '/user/:id/admin', component: UserAdmin },
      
      // 嵌套参数
      {
        path: 'post/:postId',
        component: UserPost,
        props: true
      }
    ]
  }
]

// User组件模板
<template>
  <div class="user">
    <h2>用户 {{ $route.params.id }}</h2>
    <nav>
      <router-link :to="`/user/${$route.params.id}`">首页</router-link>
      <router-link :to="`/user/${$route.params.id}/profile`">资料</router-link>
      <router-link :to="`/user/${$route.params.id}/posts`">文章</router-link>
    </nav>
    
    <!-- 子路由出口 -->
    <router-view></router-view>
  </div>
</template>
```

### 2. 命名视图嵌套

```javascript
const routes = [
  {
    path: '/dashboard',
    components: {
      default: Dashboard,
      sidebar: Sidebar,
      header: Header
    },
    children: [
      {
        path: 'analytics',
        components: {
          default: Analytics,
          sidebar: AnalyticsSidebar
        }
      },
      {
        path: 'reports',
        components: {
          default: Reports,
          sidebar: ReportsSidebar,
          toolbar: ReportsToolbar
        }
      }
    ]
  }
]

// Dashboard组件模板
<template>
  <div class="dashboard">
    <header>
      <router-view name="header"></router-view>
    </header>
    
    <aside>
      <router-view name="sidebar"></router-view>
    </aside>
    
    <main>
      <router-view name="toolbar"></router-view>
      <router-view></router-view>
    </main>
  </div>
</template>
```

### 3. 动态嵌套路由

```javascript
// 动态添加子路由
class DynamicRouteManager {
  constructor(router) {
    this.router = router
    this.moduleRoutes = new Map()
  }
  
  // 添加模块路由
  addModuleRoutes(moduleId, routes) {
    const parentRoute = {
      path: `/module/${moduleId}`,
      component: ModuleLayout,
      children: routes
    }
    
    this.router.addRoute(parentRoute)
    this.moduleRoutes.set(moduleId, parentRoute)
  }
  
  // 移除模块路由
  removeModuleRoutes(moduleId) {
    const route = this.moduleRoutes.get(moduleId)
    if (route && route.name) {
      this.router.removeRoute(route.name)
      this.moduleRoutes.delete(moduleId)
    }
  }
  
  // 动态加载模块
  async loadModule(moduleId) {
    try {
      const module = await import(`@/modules/${moduleId}/routes.js`)
      this.addModuleRoutes(moduleId, module.default)
      return true
    } catch (error) {
      console.error(`加载模块 ${moduleId} 失败:`, error)
      return false
    }
  }
}

const routeManager = new DynamicRouteManager(router)

// 使用示例
router.beforeEach(async (to, from) => {
  const moduleMatch = to.path.match(/^\/module\/([^\/]+)/)
  if (moduleMatch) {
    const moduleId = moduleMatch[1]
    if (!routeManager.moduleRoutes.has(moduleId)) {
      const loaded = await routeManager.loadModule(moduleId)
      if (!loaded) {
        return { name: 'ModuleNotFound' }
      }
    }
  }
})
```

## 🚀 路由懒加载优化

### 1. 基础懒加载

```javascript
const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  },
  
  // 命名chunk
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  
  // 预加载
  {
    path: '/contact',
    component: () => import(/* webpackPreload: true */ '@/views/Contact.vue')
  },
  
  // 预获取
  {
    path: '/help',
    component: () => import(/* webpackPrefetch: true */ '@/views/Help.vue')
  }
]
```

### 2. 条件懒加载

```javascript
// 根据权限懒加载
function createLazyRoute(path, importFn, roles = []) {
  return {
    path,
    component: () => {
      // 检查权限
      if (roles.length > 0 && !hasAnyRole(roles)) {
        return import('@/views/Forbidden.vue')
      }
      return importFn()
    }
  }
}

const routes = [
  createLazyRoute('/admin', () => import('@/views/Admin.vue'), ['admin']),
  createLazyRoute('/user', () => import('@/views/User.vue'), ['user', 'admin'])
]

// 环境条件懒加载
const routes = [
  {
    path: '/debug',
    component: process.env.NODE_ENV === 'development'
      ? () => import('@/views/Debug.vue')
      : () => import('@/views/NotFound.vue')
  }
]
```

### 3. 智能预加载

```javascript
class SmartPreloader {
  constructor(router) {
    this.router = router
    this.preloadedRoutes = new Set()
    this.preloadQueue = []
    this.isPreloading = false
  }
  
  // 预加载路由
  async preloadRoute(routeName) {
    if (this.preloadedRoutes.has(routeName)) {
      return
    }
    
    const route = this.router.resolve({ name: routeName })
    if (route.matched.length > 0) {
      const component = route.matched[route.matched.length - 1].components?.default
      
      if (typeof component === 'function') {
        try {
          await component()
          this.preloadedRoutes.add(routeName)
        } catch (error) {
          console.error(`预加载路由 ${routeName} 失败:`, error)
        }
      }
    }
  }
  
  // 批量预加载
  async batchPreload(routeNames) {
    this.preloadQueue.push(...routeNames)
    
    if (!this.isPreloading) {
      this.isPreloading = true
      await this.processPreloadQueue()
      this.isPreloading = false
    }
  }
  
  async processPreloadQueue() {
    while (this.preloadQueue.length > 0) {
      const routeName = this.preloadQueue.shift()
      await this.preloadRoute(routeName)
      
      // 避免阻塞主线程
      await new Promise(resolve => setTimeout(resolve, 10))
    }
  }
  
  // 基于用户行为预加载
  onRouteEnter(to) {
    const preloadMap = {
      'home': ['about', 'contact'],
      'user-profile': ['user-settings', 'user-posts'],
      'product-list': ['product-detail']
    }
    
    const routesToPreload = preloadMap[to.name]
    if (routesToPreload) {
      // 延迟预加载，避免影响当前页面加载
      setTimeout(() => {
        this.batchPreload(routesToPreload)
      }, 1000)
    }
  }
}

const preloader = new SmartPreloader(router)

router.afterEach((to) => {
  preloader.onRouteEnter(to)
})
```

## 🎯 路由元信息与数据获取

### 1. 路由元信息

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: '管理后台',
      icon: 'admin',
      breadcrumb: ['首页', '管理后台'],
      keepAlive: true,
      transition: 'slide-left'
    }
  }
]

// 全局处理元信息
router.beforeEach((to, from) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // 设置面包屑
  if (to.meta.breadcrumb) {
    store.commit('setBreadcrumb', to.meta.breadcrumb)
  }
})
```

### 2. 路由数据获取

```javascript
// 导航前获取数据
export default {
  name: 'Post',
  data() {
    return {
      post: null,
      loading: false,
      error: null
    }
  },
  
  async beforeRouteEnter(to, from, next) {
    try {
      const post = await fetchPost(to.params.id)
      next(vm => {
        vm.post = post
      })
    } catch (error) {
      next({ name: 'PostNotFound' })
    }
  },
  
  async beforeRouteUpdate(to, from) {
    if (to.params.id !== from.params.id) {
      this.loading = true
      try {
        this.post = await fetchPost(to.params.id)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
}

// 导航后获取数据
export default {
  name: 'Post',
  data() {
    return {
      post: null,
      loading: false,
      error: null
    }
  },
  
  async created() {
    await this.fetchData()
  },
  
  async beforeRouteUpdate(to, from) {
    await this.fetchData()
  },
  
  methods: {
    async fetchData() {
      this.loading = true
      this.error = null
      
      try {
        this.post = await fetchPost(this.$route.params.id)
      } catch (error) {
        this.error = error.message
        if (error.status === 404) {
          this.$router.replace({ name: 'PostNotFound' })
        }
      } finally {
        this.loading = false
      }
    }
  }
}
```

## 🔍 路由调试与优化

### 1. 路由调试工具

```javascript
// 路由调试插件
const routeDebugger = {
  install(app) {
    if (process.env.NODE_ENV === 'development') {
      const router = app.config.globalProperties.$router
      
      router.beforeEach((to, from) => {
        console.group(`🚀 路由导航: ${from.path} -> ${to.path}`)
        console.log('目标路由:', to)
        console.log('来源路由:', from)
        console.log('匹配的路由记录:', to.matched)
        console.groupEnd()
      })
      
      router.afterEach((to, from, failure) => {
        if (failure) {
          console.error('❌ 路由导航失败:', failure)
        } else {
          console.log('✅ 路由导航成功')
        }
      })
    }
  }
}

app.use(routeDebugger)
```

### 2. 性能监控

```javascript
// 路由性能监控
class RoutePerformanceMonitor {
  constructor() {
    this.navigationTimes = new Map()
  }
  
  startNavigation(to) {
    this.navigationTimes.set(to.fullPath, {
      start: performance.now(),
      route: to
    })
  }
  
  endNavigation(to) {
    const timing = this.navigationTimes.get(to.fullPath)
    if (timing) {
      const duration = performance.now() - timing.start
      console.log(`路由 ${to.path} 导航耗时: ${duration.toFixed(2)}ms`)
      
      // 发送性能数据
      if (duration > 1000) {
        this.reportSlowNavigation(to, duration)
      }
    }
  }
  
  reportSlowNavigation(route, duration) {
    // 发送到监控系统
    analytics.track('slow_navigation', {
      path: route.path,
      duration,
      timestamp: Date.now()
    })
  }
}

const performanceMonitor = new RoutePerformanceMonitor()

router.beforeEach((to) => {
  performanceMonitor.startNavigation(to)
})

router.afterEach((to) => {
  performanceMonitor.endNavigation(to)
})
```

动态路由是构建现代单页应用的基础，通过合理使用路径参数、嵌套路由和懒加载等特性，可以创建灵活高效的路由系统。
