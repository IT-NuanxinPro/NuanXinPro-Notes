# 前端调试工具完全指南

前端调试是开发过程中的重要环节。掌握各种调试工具和技巧，能够帮助开发者快速定位和解决问题，提升开发效率。

## 🎯 调试工具概览

### 调试工具分类

| 类型 | 工具 | 适用场景 | 优势 |
|------|------|----------|------|
| **浏览器调试** | Chrome DevTools | Web 应用调试 | 功能全面、实时调试 |
| **移动端调试** | vConsole、Eruda | 移动端 H5 调试 | 真机调试、日志查看 |
| **网络调试** | Charles、Fiddler | 网络请求分析 | 请求拦截、数据修改 |
| **性能调试** | Lighthouse、WebPageTest | 性能分析 | 性能指标、优化建议 |
| **代码调试** | VSCode Debugger | 源码调试 | 断点调试、变量查看 |

## 🌐 浏览器调试

### Chrome DevTools 核心功能

#### 1. Elements 面板
```javascript
// 常用操作
// 1. 检查元素
右键 -> 检查元素

// 2. 编辑 HTML
双击元素 -> 直接编辑

// 3. 修改样式
Styles 面板 -> 实时修改 CSS

// 4. 查看盒模型
Computed 面板 -> Box Model

// 5. 事件监听器
Event Listeners 面板 -> 查看绑定事件
```

#### 2. Console 面板
```javascript
// 基础调试
console.log('普通日志')
console.warn('警告信息')
console.error('错误信息')
console.info('信息提示')

// 高级调试
console.table(data)           // 表格形式显示数据
console.group('分组开始')      // 分组显示
console.groupEnd()           // 分组结束
console.time('计时器')        // 开始计时
console.timeEnd('计时器')     // 结束计时

// 条件断点
console.assert(condition, 'message')

// 追踪调用栈
console.trace()

// 清空控制台
console.clear()
```

#### 3. Sources 面板
```javascript
// 断点调试
// 1. 设置断点
点击行号 -> 设置断点

// 2. 条件断点
右键行号 -> Add conditional breakpoint

// 3. 监视变量
Watch 面板 -> 添加表达式

// 4. 调用栈
Call Stack 面板 -> 查看函数调用链

// 5. 作用域变量
Scope 面板 -> 查看当前作用域变量
```

#### 4. Network 面板
```javascript
// 网络请求分析
// 1. 筛选请求类型
XHR、JS、CSS、Img、Media、Font、Doc、WS、Other

// 2. 查看请求详情
Headers、Preview、Response、Timing、Cookies

// 3. 模拟网络条件
Network throttling -> Slow 3G、Fast 3G、Offline

// 4. 请求拦截
右键请求 -> Block request URL
```

### 调试技巧和最佳实践

#### 1. 断点调试技巧
```javascript
// 条件断点
if (user.id === 123) {
  debugger; // 只在特定条件下触发
}

// DOM 断点
// 右键元素 -> Break on -> subtree modifications

// 异常断点
// Sources -> Pause on exceptions

// 事件断点
// Sources -> Event Listener Breakpoints
```

#### 2. 性能调试
```javascript
// Performance 面板使用
// 1. 录制性能
Performance -> Record -> 执行操作 -> Stop

// 2. 分析火焰图
Main 线程 -> 查看函数调用时间

// 3. 内存泄漏检测
Memory 面板 -> Heap snapshot

// 4. 帧率分析
Rendering -> FPS meter
```

## 📱 移动端调试

### vConsole 集成

#### 1. 安装和配置
```bash
# 安装 vConsole
npm install vconsole

# 或使用 CDN
<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
```

```javascript
// 基础使用
import VConsole from 'vconsole'

// 开发环境启用
if (process.env.NODE_ENV === 'development') {
  new VConsole()
}

// 条件启用
if (window.location.search.includes('debug=true')) {
  new VConsole()
}
```

#### 2. 高级配置
```javascript
// 自定义配置
const vConsole = new VConsole({
  defaultPlugins: ['system', 'network', 'element', 'storage'],
  maxLogNumber: 1000,
  onReady() {
    console.log('vConsole is ready.')
  },
  onClearLog() {
    console.log('on clearLog')
  }
})

// 自定义面板
vConsole.addPlugin(new VConsole.VConsolePlugin('my_plugin', 'My Plugin'))
```

### Eruda 调试工具

```javascript
// 动态加载 Eruda
;(function () {
  var src = 'https://cdn.jsdelivr.net/npm/eruda'
  if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return
  document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>')
  document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>')
})()
```

### 真机调试方案

#### 1. Chrome 远程调试
```bash
# Android 设备
1. 开启开发者选项
2. 启用 USB 调试
3. Chrome 访问 chrome://inspect
4. 选择设备进行调试
```

#### 2. Safari 远程调试
```bash
# iOS 设备
1. 设置 -> Safari -> 高级 -> Web 检查器
2. Mac Safari -> 开发 -> 设备名称
3. 选择页面进行调试
```

## 🔧 代码调试

### VSCode 调试配置

#### 1. launch.json 配置
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
    },
    {
      "name": "Attach to Chrome",
      "port": 9222,
      "request": "attach",
      "type": "chrome",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

#### 2. Node.js 调试
```json
{
  "name": "Debug Node.js",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/server.js",
  "env": {
    "NODE_ENV": "development"
  },
  "console": "integratedTerminal"
}
```

### 调试技巧

#### 1. 日志调试
```javascript
// 结构化日志
const logger = {
  debug: (message, data) => console.log(`[DEBUG] ${message}`, data),
  info: (message, data) => console.info(`[INFO] ${message}`, data),
  warn: (message, data) => console.warn(`[WARN] ${message}`, data),
  error: (message, data) => console.error(`[ERROR] ${message}`, data)
}

// 使用示例
logger.debug('用户登录', { userId: 123, timestamp: Date.now() })
```

#### 2. 断言调试
```javascript
// 断言函数
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`)
  }
}

// 使用示例
assert(user.id > 0, 'User ID must be positive')
assert(Array.isArray(items), 'Items must be an array')
```

## 🌐 网络调试

### Charles 代理工具

#### 1. 基础配置
```bash
# 安装证书
Help -> SSL Proxying -> Install Charles Root Certificate

# 配置代理
Proxy -> Proxy Settings -> Port: 8888

# 移动端配置
手机连接同一 WiFi -> 设置代理 -> IP:端口
```

#### 2. 常用功能
```javascript
// 请求拦截
Tools -> Map Remote -> 映射远程地址

// 响应修改
Tools -> Map Local -> 映射本地文件

// 断点调试
Proxy -> Breakpoint Settings -> 设置断点

// 限速测试
Proxy -> Throttle Settings -> 模拟慢网络
```

### Fiddler 使用

```bash
# 基础设置
Tools -> Options -> HTTPS -> Capture HTTPS CONNECTs
Tools -> Options -> Connections -> Allow remote computers

# 脚本自定义
Rules -> Customize Rules -> 编辑 JScript
```

## 📊 性能调试

### Lighthouse 性能分析

```javascript
// 命令行使用
npm install -g lighthouse

// 分析网站
lighthouse https://example.com --output html --output-path ./report.html

// 编程方式使用
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']})
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port}
  const runnerResult = await lighthouse('https://example.com', options)
  
  await chrome.kill()
  return runnerResult
}
```

### Web Vitals 监控

```javascript
// 安装 web-vitals
npm install web-vitals

// 监控核心指标
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals'

getCLS(console.log)  // Cumulative Layout Shift
getFID(console.log)  // First Input Delay
getFCP(console.log)  // First Contentful Paint
getLCP(console.log)  // Largest Contentful Paint
getTTFB(console.log) // Time to First Byte

// 自定义上报
function sendToAnalytics(metric) {
  // 发送到分析服务
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify(metric)
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getLCP(sendToAnalytics)
```

## 🔍 错误调试

### 错误捕获和处理

```javascript
// 全局错误捕获
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // 上报错误信息
  reportError({
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  })
})

// Promise 错误捕获
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  // 上报 Promise 错误
  reportError({
    type: 'unhandledrejection',
    reason: event.reason
  })
})

// 资源加载错误
window.addEventListener('error', (event) => {
  if (event.target !== window) {
    console.error('Resource loading error:', event.target.src || event.target.href)
  }
}, true)
```

### Source Map 调试

```javascript
// webpack 配置
module.exports = {
  devtool: 'source-map', // 生产环境
  // devtool: 'eval-source-map', // 开发环境
}

// Vite 配置
export default {
  build: {
    sourcemap: true
  }
}
```

## 💡 调试最佳实践

### 1. 调试策略
- **分而治之**：将复杂问题分解为小问题
- **假设验证**：提出假设并通过调试验证
- **日志先行**：在关键位置添加日志
- **工具结合**：结合多种调试工具

### 2. 性能调试
- **基准测试**：建立性能基准
- **瓶颈定位**：找出性能瓶颈
- **渐进优化**：逐步优化性能
- **效果验证**：验证优化效果

### 3. 团队协作
- **调试文档**：记录调试过程和结果
- **知识分享**：分享调试技巧和经验
- **工具统一**：团队使用统一的调试工具
- **流程规范**：建立调试流程规范

掌握这些调试工具和技巧，能够帮助开发者更高效地定位和解决问题，提升开发质量和效率。
