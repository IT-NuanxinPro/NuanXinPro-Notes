# Vue3 Composition API 实战指南

Composition API 是 Vue3 的核心特性，提供了更灵活的逻辑组织方式，让代码更易维护和复用。

## 🎯 Composition API 基础

### setup 函数

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Counter',
  setup() {
    // 响应式数据
    const count = ref(0)
    const title = ref('计数器应用')

    // 计算属性
    const doubleCount = computed(() => count.value * 2)

    // 方法
    const increment = () => {
      count.value++
    }

    const decrement = () => {
      count.value--
    }

    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })

    // 返回模板需要的数据和方法
    return {
      title,
      count,
      doubleCount,
      increment,
      decrement
    }
  }
}
</script>
```

### script setup 语法糖

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 直接声明响应式数据
const count = ref(0)
const title = ref('计数器应用')

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

// 生命周期
onMounted(() => {
  console.log('组件已挂载')
})

// 无需 return，所有顶层变量自动暴露给模板
</script>
```

## 📊 响应式 API

### ref 和 reactive

```vue
<script setup>
import { ref, reactive, toRefs } from 'vue'

// ref - 基本类型响应式
const count = ref(0)
const message = ref('Hello Vue3')

// reactive - 对象响应式
const state = reactive({
  user: {
    name: 'Alice',
    age: 25
  },
  settings: {
    theme: 'dark',
    language: 'zh-CN'
  }
})

// 解构响应式对象
const { user, settings } = toRefs(state)

// 修改数据
const updateUser = () => {
  count.value++ // ref 需要 .value
  state.user.name = 'Bob' // reactive 直接修改
  user.value.age = 26 // 解构后需要 .value
}
</script>
```

### computed 计算属性

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// 只读计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// 可写计算属性
const fullNameWritable = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    const names = value.split(' ')
    firstName.value = names[0]
    lastName.value = names[names.length - 1]
  }
})

// 使用
const updateName = () => {
  fullNameWritable.value = 'Jane Smith'
}
</script>
```

### watch 和 watchEffect

```vue
<script setup>
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const message = ref('')
const user = reactive({
  name: 'Alice',
  age: 25
})

// 监听单个 ref
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})

// 监听多个源
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('Multiple values changed')
})

// 监听响应式对象
watch(
  () => user.name,
  (newName, oldName) => {
    console.log(`User name changed from ${oldName} to ${newName}`)
  }
)

// 深度监听
watch(
  user,
  (newUser, oldUser) => {
    console.log('User object changed')
  },
  { deep: true }
)

// 立即执行监听
watch(
  count,
  (newValue) => {
    console.log('Count is:', newValue)
  },
  { immediate: true }
)

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(`Count is ${count.value}, message is ${message.value}`)
})

// 停止监听
const stopWatcher = watch(count, () => {
  console.log('Watching count')
})

// 在某个条件下停止监听
if (someCondition) {
  stopWatcher()
}
</script>
```

## 🔄 生命周期钩子

### 生命周期对比

```vue
<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from 'vue'

// beforeCreate 和 created 在 setup 中不需要
// setup 本身就在这两个钩子之间执行

onBeforeMount(() => {
  console.log('组件挂载前')
})

onMounted(() => {
  console.log('组件已挂载')
  // DOM 操作
  document.title = 'Vue3 应用'
})

onBeforeUpdate(() => {
  console.log('组件更新前')
})

onUpdated(() => {
  console.log('组件已更新')
})

onBeforeUnmount(() => {
  console.log('组件卸载前')
  // 清理工作
})

onUnmounted(() => {
  console.log('组件已卸载')
})

onErrorCaptured((error, instance, info) => {
  console.error('捕获到错误:', error)
  return false // 阻止错误继续传播
})
</script>
```

## 🎨 组件通信

### Props 和 Emits

```vue
<!-- 子组件 UserCard.vue -->
<template>
  <div class="user-card">
    <h3>{{ user.name }}</h3>
    <p>Age: {{ user.age }}</p>
    <button @click="handleEdit">编辑</button>
    <button @click="handleDelete">删除</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 定义 Props
const props = defineProps({
  user: {
    type: Object,
    required: true,
    validator: (user) => {
      return user && typeof user.name === 'string' && typeof user.age === 'number'
    }
  },
  editable: {
    type: Boolean,
    default: true
  }
})

// 定义 Emits
const emit = defineEmits(['edit', 'delete'])

// 使用 Props
const displayName = computed(() => {
  return props.user.name.toUpperCase()
})

// 触发事件
const handleEdit = () => {
  if (props.editable) {
    emit('edit', props.user.id)
  }
}

const handleDelete = () => {
  emit('delete', props.user.id)
}
</script>
```

```vue
<!-- 父组件 -->
<template>
  <div>
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      :editable="true"
      @edit="handleEditUser"
      @delete="handleDeleteUser"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './UserCard.vue'

const users = ref([
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 }
])

const handleEditUser = (userId) => {
  console.log('编辑用户:', userId)
}

const handleDeleteUser = (userId) => {
  users.value = users.value.filter(user => user.id !== userId)
}
</script>
```

### provide/inject

```vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
const user = ref({ name: 'Alice', role: 'admin' })

// 提供数据
provide('theme', theme)
provide('user', user)
provide('updateTheme', (newTheme) => {
  theme.value = newTheme
})
</script>
```

```vue
<!-- 后代组件 -->
<script setup>
import { inject } from 'vue'

// 注入数据
const theme = inject('theme')
const user = inject('user')
const updateTheme = inject('updateTheme')

// 使用默认值
const language = inject('language', 'zh-CN')

// 使用
const toggleTheme = () => {
  const newTheme = theme.value === 'dark' ? 'light' : 'dark'
  updateTheme(newTheme)
}
</script>
```

## 🔧 实用技巧

### 模板引用

```vue
<template>
  <div>
    <input ref="inputRef" type="text" />
    <button @click="focusInput">聚焦输入框</button>
    
    <ChildComponent ref="childRef" />
    <button @click="callChildMethod">调用子组件方法</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChildComponent from './ChildComponent.vue'

// 模板引用
const inputRef = ref(null)
const childRef = ref(null)

const focusInput = () => {
  inputRef.value.focus()
}

const callChildMethod = () => {
  childRef.value.someMethod()
}

onMounted(() => {
  // 组件挂载后可以访问 DOM
  console.log(inputRef.value) // <input> 元素
})
</script>
```

### 动态组件

```vue
<template>
  <div>
    <button
      v-for="tab in tabs"
      :key="tab.name"
      @click="currentTab = tab.component"
      :class="{ active: currentTab === tab.component }"
    >
      {{ tab.name }}
    </button>
    
    <component :is="currentTab" />
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import TabA from './TabA.vue'
import TabB from './TabB.vue'
import TabC from './TabC.vue'

// 使用 shallowRef 优化性能
const currentTab = shallowRef(TabA)

const tabs = [
  { name: 'Tab A', component: TabA },
  { name: 'Tab B', component: TabB },
  { name: 'Tab C', component: TabC }
]
</script>
```

### 异步组件

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

// 简单异步组件
const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'))

// 高级异步组件
const AdvancedAsyncComponent = defineAsyncComponent({
  loader: () => import('./AdvancedComponent.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
</script>

<template>
  <div>
    <AsyncComponent />
    <AdvancedAsyncComponent />
  </div>
</template>
```

## 🎯 性能优化

### 响应式优化

```vue
<script setup>
import { ref, reactive, shallowRef, shallowReactive, readonly } from 'vue'

// 浅层响应式 - 只有根级别属性是响应式的
const shallowState = shallowRef({
  nested: {
    count: 0
  }
})

// 浅层响应式对象
const shallowObj = shallowReactive({
  nested: {
    count: 0
  }
})

// 只读数据
const readonlyState = readonly({
  config: {
    apiUrl: 'https://api.example.com'
  }
})

// 大型不可变数据使用 shallowRef
const largeData = shallowRef({
  // 大量数据...
})

// 更新整个对象而不是修改属性
const updateLargeData = (newData) => {
  largeData.value = newData
}
</script>
```

### 计算属性缓存

```vue
<script setup>
import { ref, computed } from 'vue'

const list = ref([1, 2, 3, 4, 5])

// 昂贵的计算会被缓存
const expensiveValue = computed(() => {
  console.log('执行昂贵计算')
  return list.value.reduce((sum, item) => {
    // 模拟昂贵计算
    for (let i = 0; i < 1000000; i++) {}
    return sum + item
  }, 0)
})

// 只有当 list 改变时才会重新计算
</script>
```

## 💡 最佳实践

### 1. 逻辑组织

```vue
<script setup>
// 1. 导入
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 2. 组合式函数
const { user, login, logout } = useAuth()
const { theme, toggleTheme } = useTheme()

// 3. 响应式数据
const loading = ref(false)
const error = ref(null)

// 4. 计算属性
const isLoggedIn = computed(() => !!user.value)

// 5. 方法
const handleLogin = async () => {
  loading.value = true
  try {
    await login()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// 6. 监听器
watch(user, (newUser) => {
  if (newUser) {
    // 用户登录后的逻辑
  }
})

// 7. 生命周期
onMounted(() => {
  // 初始化逻辑
})
</script>
```

### 2. 类型安全

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

// 类型化的 ref
const user = ref<User | null>(null)
const users = ref<User[]>([])

// 类型化的计算属性
const userCount = computed((): number => {
  return users.value.length
})

// 类型化的方法
const addUser = (newUser: User): void => {
  users.value.push(newUser)
}
</script>
```

## 🔧 Composition API 源码实现原理

### setup 函数执行机制

```javascript
// Vue3 组件初始化过程中的 setup 调用
function setupComponent(instance, isSSR = false) {
  const { props, children } = instance.vnode
  const isStateful = isStatefulComponent(instance)

  initProps(instance, props, isStateful, isSSR)
  initSlots(instance, children)

  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined

  return setupResult
}

function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type
  const { setup } = Component

  if (setup) {
    const setupContext = createSetupContext(instance)

    // 设置当前实例
    setCurrentInstance(instance)

    // 暂停依赖收集
    pauseTracking()

    // 调用 setup 函数
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      ErrorCodes.SETUP_FUNCTION,
      [instance.props, setupContext]
    )

    // 恢复依赖收集
    resetTracking()

    // 清除当前实例
    unsetCurrentInstance()

    if (isPromise(setupResult)) {
      // 异步组件处理
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance)
      return setupResult
        .then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR)
        })
    } else {
      handleSetupResult(instance, setupResult, isSSR)
    }
  }
}
```

### ref 实现原理

```javascript
class RefImpl {
  private _value: T
  private _rawValue: T
  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)

    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this, newVal)
    }
  }
}

function trackRefValue(ref) {
  if (shouldTrack && activeEffect) {
    ref = toRaw(ref)
    trackEffects(ref.dep || (ref.dep = createDep()))
  }
}

function triggerRefValue(ref, newVal) {
  ref = toRaw(ref)
  if (ref.dep) {
    triggerEffects(ref.dep)
  }
}
```

### computed 实现原理

```javascript
class ComputedRefImpl {
  public dep?: Dep = undefined
  private _value!: T
  public readonly effect: ReactiveEffect<T>
  public readonly __v_isRef = true
  public readonly [ReactiveFlags.IS_READONLY]: boolean = false

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
    isReadonly: boolean,
    isSSR: boolean
  ) {
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
    this.effect.computed = this
    this.effect.active = this._cacheable = !isSSR
    this[ReactiveFlags.IS_READONLY] = isReadonly
  }

  get value() {
    const self = toRaw(this)
    trackRefValue(self)
    if (self._dirty || !self._cacheable) {
      self._dirty = false
      self._value = self.effect.run()!
    }
    return self._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }
}
```

## 🎨 高级模式与技巧

### 1. 响应式解构

```javascript
import { toRefs, toRef } from 'vue'

// 解构响应式对象
const state = reactive({
  count: 0,
  name: 'Vue3'
})

// ❌ 直接解构会失去响应性
const { count, name } = state

// ✅ 使用 toRefs 保持响应性
const { count, name } = toRefs(state)

// ✅ 单个属性使用 toRef
const count = toRef(state, 'count')
```

### 2. 响应式转换

```javascript
import { unref, toRaw, markRaw, isRef, isReactive } from 'vue'

const state = reactive({ count: 0 })
const countRef = ref(10)

// 获取原始值
console.log(unref(countRef)) // 10，等同于 countRef.value
console.log(toRaw(state)) // 获取原始对象

// 标记为非响应式
const nonReactive = markRaw({
  foo: 'bar'
})

// 类型检查
console.log(isRef(countRef)) // true
console.log(isReactive(state)) // true
```

### 3. 效果作用域

```javascript
import { effectScope, onScopeDispose } from 'vue'

function useFeature() {
  const scope = effectScope()

  scope.run(() => {
    const count = ref(0)

    watch(count, () => {
      console.log('count changed')
    })

    // 作用域销毁时清理
    onScopeDispose(() => {
      console.log('scope disposed')
    })
  })

  // 手动停止作用域
  const stop = () => {
    scope.stop()
  }

  return { stop }
}
```

### 4. 自定义响应式

```javascript
// 自定义 ref
function customRef(factory) {
  return new CustomRefImpl(factory)
}

class CustomRefImpl {
  public dep?: Dep = undefined
  private readonly _get: ReturnType<CustomRefFactory<T>>['get']
  private readonly _set: ReturnType<CustomRefFactory<T>>['set']
  public readonly __v_isRef = true

  constructor(factory: CustomRefFactory<T>) {
    const { get, set } = factory(
      () => trackRefValue(this),
      () => triggerRefValue(this)
    )
    this._get = get
    this._set = set
  }

  get value() {
    return this._get()
  }

  set value(newVal) {
    this._set(newVal)
  }
}

// 使用示例：防抖 ref
function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
```

## 🔄 与 Options API 对比

### 逻辑组织对比

```javascript
// Options API - 按选项类型组织
export default {
  data() {
    return {
      count: 0,
      loading: false,
      error: null
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
    },
    async fetchData() {
      this.loading = true
      try {
        // fetch logic
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}

// Composition API - 按逻辑功能组织
export default {
  setup() {
    // 计数器逻辑
    const { count, doubleCount, increment } = useCounter()

    // 数据获取逻辑
    const { loading, error, fetchData } = useAsyncData()

    onMounted(() => {
      fetchData()
    })

    return {
      count,
      doubleCount,
      increment,
      loading,
      error
    }
  }
}
```

### 代码复用对比

```javascript
// Options API - 使用 mixin（存在命名冲突风险）
const counterMixin = {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}

export default {
  mixins: [counterMixin],
  // 可能存在命名冲突
}

// Composition API - 使用组合式函数（更清晰的依赖关系）
function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const increment = () => count.value++
  return { count, increment }
}

export default {
  setup() {
    const { count, increment } = useCounter(10)
    return { count, increment }
  }
}
```

## 🎯 性能优化深度解析

### 1. 响应式性能优化

```javascript
// 避免不必要的响应式转换
const expensiveData = shallowRef({
  // 大量数据，只需要根级别响应式
  items: new Array(10000).fill(0).map((_, i) => ({ id: i, value: Math.random() }))
})

// 使用 markRaw 标记不需要响应式的对象
const chart = markRaw(new Chart(canvas, config))

// 合理使用 readonly
const config = readonly({
  apiUrl: 'https://api.example.com',
  timeout: 5000
})
```

### 2. 计算属性优化

```javascript
// 避免在计算属性中进行昂贵操作
const expensiveList = ref([...])

// ❌ 每次都重新计算
const processedList = computed(() => {
  return expensiveList.value.map(item => {
    // 昂贵的处理逻辑
    return processItem(item)
  })
})

// ✅ 使用缓存优化
const processedList = computed(() => {
  const cache = new Map()
  return expensiveList.value.map(item => {
    if (cache.has(item.id)) {
      return cache.get(item.id)
    }
    const processed = processItem(item)
    cache.set(item.id, processed)
    return processed
  })
})
```

### 3. 监听器优化

```javascript
// 使用 flush: 'post' 在 DOM 更新后执行
watch(
  source,
  callback,
  { flush: 'post' }
)

// 使用 watchEffect 的清理函数
watchEffect((onInvalidate) => {
  const token = performAsyncOperation()

  onInvalidate(() => {
    // 清理异步操作
    token.cancel()
  })
})
```

Composition API 不仅提供了更灵活的代码组织方式，其底层实现也体现了Vue3在性能和开发体验上的显著提升。通过深入理解其原理和最佳实践，能够更好地发挥Vue3的优势。

---

下一步：学习 [Vue3 自定义 Hooks](./hooks/)
