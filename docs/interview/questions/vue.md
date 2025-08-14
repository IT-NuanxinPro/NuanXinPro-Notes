# Vue 面试题精选

Vue.js 作为主流前端框架，是面试中的重点考察内容。这里整理了最常见的 Vue 面试题和详细解答。

## 🔥 Vue2 vs Vue3 对比

**问题**：Vue2 和 Vue3 有什么主要区别？

**答案**：

### 1. 响应式系统

```javascript
// Vue2 - Object.defineProperty
Object.defineProperty(obj, 'name', {
  get() {
    console.log('获取 name')
    return value
  },
  set(newValue) {
    console.log('设置 name')
    value = newValue
  }
})

// Vue3 - Proxy
const reactive = new Proxy(target, {
  get(target, key) {
    console.log('获取', key)
    return target[key]
  },
  set(target, key, value) {
    console.log('设置', key, value)
    target[key] = value
    return true
  }
})
```

**Vue3 优势**：

- 可以监听数组索引和 length 变化
- 可以监听对象属性的添加和删除
- 支持 Map、Set、WeakMap、WeakSet
- 更好的性能表现

### 2. 组合式 API vs 选项式 API

```javascript
// Vue2 选项式 API
export default {
  data() {
    return {
      count: 0,
      user: null
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    this.fetchUser()
  }
}

// Vue3 组合式 API
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const user = ref(null)
    
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    const fetchUser = async () => {
      // 获取用户数据
    }
    
    onMounted(() => {
      fetchUser()
    })
    
    return {
      count,
      user,
      doubleCount,
      increment
    }
  }
}
```

### 3. 性能提升

- **编译时优化**：静态提升、补丁标记、树摇优化
- **运行时优化**：更快的组件初始化、更小的内存占用
- **包体积**：Vue3 核心库更小，支持 tree-shaking

## 🔄 Vue 响应式原理

**问题**：详细解释 Vue 的响应式原理

**答案**：

### Vue2 响应式原理

```javascript
// 简化版 Vue2 响应式实现
class Observer {
  constructor(data) {
    this.walk(data)
  }
  
  walk(data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  
  defineReactive(obj, key, val) {
    const dep = new Dep()
    
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 依赖收集
        if (Dep.target) {
          dep.depend()
        }
        return val
      },
      set(newVal) {
        if (newVal === val) return
        val = newVal
        // 派发更新
        dep.notify()
      }
    })
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  
  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target)
    }
  }
  
  notify() {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.cb = cb
    this.getter = expOrFn
    this.value = this.get()
  }
  
  get() {
    Dep.target = this
    const value = this.getter.call(this.vm)
    Dep.target = null
    return value
  }
  
  update() {
    const newValue = this.get()
    const oldValue = this.value
    this.value = newValue
    this.cb.call(this.vm, newValue, oldValue)
  }
}
```

### Vue3 响应式原理

```javascript
// 简化版 Vue3 响应式实现
const targetMap = new WeakMap()
let activeEffect = null

function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      // 依赖收集
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      // 触发更新
      trigger(target, key)
      return true
    }
  })
}

function track(target, key) {
  if (!activeEffect) return
  
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  
  dep.add(activeEffect)
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}
```

## 🎨 组件通信方式

**问题**：Vue 组件间通信有哪些方式？

**答案**：

### 1. Props / $emit

```vue
<!-- 父组件 -->
<template>
  <ChildComponent 
    :message="parentMessage" 
    @child-event="handleChildEvent"
  />
</template>

<script>
export default {
  data() {
    return {
      parentMessage: 'Hello from parent'
    }
  },
  methods: {
    handleChildEvent(data) {
      console.log('收到子组件数据:', data)
    }
  }
}
</script>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="sendToParent">发送给父组件</button>
  </div>
</template>

<script>
export default {
  props: ['message'],
  methods: {
    sendToParent() {
      this.$emit('child-event', 'Hello from child')
    }
  }
}
</script>
```

### 2. $parent / $children / $refs

```vue
<template>
  <div>
    <ChildComponent ref="child" />
    <button @click="callChild">调用子组件方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    callChild() {
      // 通过 ref 调用子组件方法
      this.$refs.child.childMethod()
      
      // 通过 $children 访问（Vue2）
      this.$children[0].childMethod()
    }
  }
}
</script>
```

### 3. provide / inject

```vue
<!-- 祖先组件 -->
<script>
export default {
  provide() {
    return {
      theme: 'dark',
      user: this.user
    }
  },
  data() {
    return {
      user: { name: 'Alice' }
    }
  }
}
</script>
```

```vue
<!-- 后代组件 -->
<script>
export default {
  inject: ['theme', 'user'],
  created() {
    console.log(this.theme) // 'dark'
    console.log(this.user)  // { name: 'Alice' }
  }
}
</script>
```

### 4. EventBus（Vue2）

```javascript
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()

// 组件A - 发送事件
import { EventBus } from './event-bus'

export default {
  methods: {
    sendMessage() {
      EventBus.$emit('message-sent', 'Hello from A')
    }
  }
}

// 组件B - 接收事件
import { EventBus } from './event-bus'

export default {
  created() {
    EventBus.$on('message-sent', (message) => {
      console.log('收到消息:', message)
    })
  },
  beforeDestroy() {
    EventBus.$off('message-sent')
  }
}
```

### 5. Vuex 状态管理

```javascript
// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    theme: 'light'
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_THEME(state, theme) {
      state.theme = theme
    }
  },
  actions: {
    updateUser({ commit }, user) {
      commit('SET_USER', user)
    }
  }
})
```

## 🔄 生命周期详解

**问题**：详细说明 Vue 组件的生命周期

**答案**：

### Vue2 生命周期

```javascript
export default {
  // 1. 实例创建前
  beforeCreate() {
    console.log('beforeCreate: 实例初始化之后，数据观测和事件配置之前')
    // 此时 data、methods 都不可用
  },
  
  // 2. 实例创建后
  created() {
    console.log('created: 实例创建完成')
    // data、methods 可用，但 DOM 未挂载
    // 适合进行数据初始化、API 调用
  },
  
  // 3. 挂载前
  beforeMount() {
    console.log('beforeMount: 挂载开始之前')
    // 模板编译完成，但未挂载到 DOM
  },
  
  // 4. 挂载后
  mounted() {
    console.log('mounted: 挂载完成')
    // DOM 挂载完成，可以进行 DOM 操作
    // 适合初始化第三方库、获取 DOM 元素
  },
  
  // 5. 更新前
  beforeUpdate() {
    console.log('beforeUpdate: 数据更新时调用')
    // 数据更新，但 DOM 未重新渲染
  },
  
  // 6. 更新后
  updated() {
    console.log('updated: DOM 重新渲染完成')
    // 避免在此钩子中修改数据，可能导致无限循环
  },
  
  // 7. 销毁前
  beforeDestroy() {
    console.log('beforeDestroy: 实例销毁之前')
    // 适合清理定时器、取消订阅、解绑事件
  },
  
  // 8. 销毁后
  destroyed() {
    console.log('destroyed: 实例销毁后')
    // 所有指令解绑、事件监听器移除、子实例销毁
  }
}
```

### Vue3 生命周期

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default {
  setup() {
    // beforeCreate 和 created 在 setup 中不需要
    
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    
    onMounted(() => {
      console.log('onMounted')
    })
    
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    
    onUpdated(() => {
      console.log('onUpdated')
    })
    
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })
    
    onUnmounted(() => {
      console.log('onUnmounted')
    })
  }
}
```

## 🎯 虚拟 DOM 和 Diff 算法

**问题**：解释虚拟 DOM 的工作原理和 Diff 算法

**答案**：

### 虚拟 DOM 概念

```javascript
// 真实 DOM
<div id="app">
  <p class="text">Hello World</p>
  <button onclick="handleClick()">Click me</button>
</div>

// 虚拟 DOM 表示
const vnode = {
  tag: 'div',
  props: { id: 'app' },
  children: [
    {
      tag: 'p',
      props: { class: 'text' },
      children: ['Hello World']
    },
    {
      tag: 'button',
      props: { onclick: 'handleClick()' },
      children: ['Click me']
    }
  ]
}
```

### Diff 算法核心

```javascript
// 简化版 Diff 算法
function diff(oldVNode, newVNode) {
  // 1. 节点类型不同，直接替换
  if (oldVNode.tag !== newVNode.tag) {
    return { type: 'REPLACE', newVNode }
  }
  
  // 2. 文本节点
  if (typeof newVNode === 'string') {
    if (oldVNode !== newVNode) {
      return { type: 'TEXT', text: newVNode }
    }
    return null
  }
  
  // 3. 属性对比
  const propsPatches = diffProps(oldVNode.props, newVNode.props)
  
  // 4. 子节点对比
  const childrenPatches = diffChildren(oldVNode.children, newVNode.children)
  
  return {
    type: 'UPDATE',
    props: propsPatches,
    children: childrenPatches
  }
}

function diffChildren(oldChildren, newChildren) {
  const patches = []
  const maxLength = Math.max(oldChildren.length, newChildren.length)
  
  for (let i = 0; i < maxLength; i++) {
    const oldChild = oldChildren[i]
    const newChild = newChildren[i]
    
    if (!oldChild) {
      patches[i] = { type: 'ADD', newVNode: newChild }
    } else if (!newChild) {
      patches[i] = { type: 'REMOVE' }
    } else {
      patches[i] = diff(oldChild, newChild)
    }
  }
  
  return patches
}
```

## 💡 答题技巧

### 1. 结构化回答
- **概念解释**：先说明是什么
- **原理分析**：解释为什么这样设计
- **代码示例**：用代码演示
- **应用场景**：说明实际用途
- **注意事项**：提及常见陷阱

### 2. 常见追问
- **响应式原理**：Vue2 和 Vue3 的区别、性能对比
- **组件通信**：各种方式的适用场景、优缺点
- **生命周期**：具体的使用场景、注意事项
- **虚拟 DOM**：与真实 DOM 的性能对比、优化策略

### 3. 加分项
- 能够手写简单的响应式系统
- 了解 Vue3 源码实现
- 知道性能优化技巧
- 能够举出实际项目经验

---

下一步：查看 React 面试题 <!-- [React 面试题](./react.md) --> 或 手写代码题 <!-- [手写代码题](../coding/javascript.md) -->
