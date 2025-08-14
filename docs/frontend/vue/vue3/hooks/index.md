# Vue3 自定义 Hooks

Vue3 的 Composition API 让我们能够创建可复用的逻辑组合函数（Hooks），提高代码的复用性和可维护性。

## 🎯 什么是 Vue Hooks

Vue Hooks 是基于 Composition API 的可复用逻辑函数，类似于 React Hooks，但更加灵活和强大。

### 核心特点

- **逻辑复用**：将组件逻辑提取为可复用的函数
- **响应式**：保持 Vue 的响应式特性
- **组合式**：可以组合多个 hooks
- **类型安全**：完整的 TypeScript 支持

## 📚 常用 Hooks 实现

### 1. useCounter - 计数器

```typescript
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = (step = 1) => {
    count.value += step
  }
  
  const decrement = (step = 1) => {
    count.value -= step
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  const isZero = computed(() => count.value === 0)
  const isPositive = computed(() => count.value > 0)
  const isNegative = computed(() => count.value < 0)
  
  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
    isZero,
    isPositive,
    isNegative
  }
}
```

**使用示例：**

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment()">+1</button>
    <button @click="decrement()">-1</button>
    <button @click="reset()">Reset</button>
    <p v-if="isZero">Count is zero!</p>
  </div>
</template>

<script setup>
import { useCounter } from '@/hooks/useCounter'

const { count, increment, decrement, reset, isZero } = useCounter(0)
</script>
```

### 2. useLocalStorage - 本地存储

```typescript
import { ref, watch, Ref } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: {
    serializer?: {
      read: (value: string) => T
      write: (value: T) => string
    }
  } = {}
): [Ref<T>, (value: T) => void, () => void] {
  
  const {
    serializer = {
      read: JSON.parse,
      write: JSON.stringify
    }
  } = options

  const storedValue = ref<T>(defaultValue)

  // 读取初始值
  const read = () => {
    try {
      const item = localStorage.getItem(key)
      if (item !== null) {
        storedValue.value = serializer.read(item)
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  }

  // 写入值
  const write = (value: T) => {
    try {
      storedValue.value = value
      localStorage.setItem(key, serializer.write(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // 删除值
  const remove = () => {
    try {
      localStorage.removeItem(key)
      storedValue.value = defaultValue
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  // 监听存储变化
  watch(
    storedValue,
    (newValue) => {
      write(newValue)
    },
    { deep: true }
  )

  // 初始化
  read()

  return [storedValue, write, remove]
}
```

**使用示例：**

```vue
<template>
  <div>
    <input v-model="name" placeholder="Enter your name" />
    <p>Hello, {{ name }}!</p>
    <button @click="clearName">Clear</button>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@/hooks/useLocalStorage'

const [name, setName, clearName] = useLocalStorage('username', '')
</script>
```

### 3. useAsync - 异步操作

```typescript
import { ref, computed } from 'vue'

export function useAsync<T, P extends any[]>(
  asyncFunction: (...args: P) => Promise<T>
) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  const execute = async (...args: P) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await asyncFunction(...args)
      data.value = result
      return result
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    error.value = null
    loading.value = false
  }

  const isReady = computed(() => !loading.value && !error.value)
  const isError = computed(() => !!error.value)

  return {
    data: readonly(data),
    error: readonly(error),
    loading: readonly(loading),
    execute,
    reset,
    isReady,
    isError
  }
}
```

**使用示例：**

```vue
<template>
  <div>
    <button @click="fetchUser(1)" :disabled="loading">
      Fetch User
    </button>
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="data">
      <h3>{{ data.name }}</h3>
      <p>{{ data.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAsync } from '@/hooks/useAsync'

const fetchUserById = async (id: number) => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

const { data, error, loading, execute: fetchUser } = useAsync(fetchUserById)
</script>
```

### 4. useDebounce - 防抖

```typescript
import { ref, watch, Ref } from 'vue'

export function useDebounce<T>(
  value: Ref<T>,
  delay: number
): Ref<T> {
  const debouncedValue = ref<T>(value.value)
  
  watch(
    value,
    (newValue) => {
      const timer = setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
      
      return () => clearTimeout(timer)
    },
    { immediate: true }
  )
  
  return debouncedValue as Ref<T>
}

export function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout | null = null
  
  return ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }) as T
}
```

**使用示例：**

```vue
<template>
  <div>
    <input v-model="searchTerm" placeholder="Search..." />
    <p>Debounced: {{ debouncedSearchTerm }}</p>
    <div v-if="results.length">
      <div v-for="result in results" :key="result.id">
        {{ result.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDebounce } from '@/hooks/useDebounce'

const searchTerm = ref('')
const debouncedSearchTerm = useDebounce(searchTerm, 500)
const results = ref([])

watch(debouncedSearchTerm, async (newTerm) => {
  if (newTerm) {
    // 执行搜索
    const response = await fetch(`/api/search?q=${newTerm}`)
    results.value = await response.json()
  } else {
    results.value = []
  }
})
</script>
```

### 5. useEventListener - 事件监听

```typescript
import { onMounted, onUnmounted, Ref } from 'vue'

export function useEventListener<T extends keyof WindowEventMap>(
  target: Window,
  event: T,
  handler: (event: WindowEventMap[T]) => void,
  options?: AddEventListenerOptions
): void

export function useEventListener<T extends keyof DocumentEventMap>(
  target: Document,
  event: T,
  handler: (event: DocumentEventMap[T]) => void,
  options?: AddEventListenerOptions
): void

export function useEventListener<T extends keyof HTMLElementEventMap>(
  target: Ref<HTMLElement | null> | HTMLElement,
  event: T,
  handler: (event: HTMLElementEventMap[T]) => void,
  options?: AddEventListenerOptions
): void

export function useEventListener(
  target: any,
  event: string,
  handler: (event: Event) => void,
  options?: AddEventListenerOptions
) {
  onMounted(() => {
    const element = target?.value || target
    if (element) {
      element.addEventListener(event, handler, options)
    }
  })

  onUnmounted(() => {
    const element = target?.value || target
    if (element) {
      element.removeEventListener(event, handler, options)
    }
  })
}
```

**使用示例：**

```vue
<template>
  <div>
    <p>Window size: {{ windowSize.width }} x {{ windowSize.height }}</p>
    <p>Mouse position: {{ mousePosition.x }}, {{ mousePosition.y }}</p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useEventListener } from '@/hooks/useEventListener'

const windowSize = reactive({ width: 0, height: 0 })
const mousePosition = reactive({ x: 0, y: 0 })

useEventListener(window, 'resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight
})

useEventListener(window, 'mousemove', (event) => {
  mousePosition.x = event.clientX
  mousePosition.y = event.clientY
})
</script>
```

## 🛠️ Hooks 最佳实践

### 1. 命名规范

```typescript
// ✅ 好的命名
export function useUserProfile() { }
export function useApiRequest() { }
export function useFormValidation() { }

// ❌ 避免的命名
export function getUserProfile() { }
export function apiRequest() { }
export function validation() { }
```

### 2. 返回值规范

```typescript
// ✅ 返回对象，便于解构和重命名
export function useCounter() {
  return {
    count,
    increment,
    decrement,
    reset
  }
}

// ✅ 返回数组，适合简单的状态
export function useToggle(initialValue = false) {
  const state = ref(initialValue)
  const toggle = () => state.value = !state.value
  return [state, toggle] as const
}
```

### 3. 类型安全

```typescript
// 使用泛型提供类型安全
export function useApi<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  // ...
  
  return {
    data: data as Ref<T | null>,
    loading: readonly(loading),
    error: readonly(error)
  }
}
```

### 4. 组合使用

```typescript
// 组合多个 hooks
export function useUserDashboard(userId: string) {
  const { data: user, loading: userLoading } = useApi(`/users/${userId}`)
  const { data: posts, loading: postsLoading } = useApi(`/users/${userId}/posts`)
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  
  const loading = computed(() => userLoading.value || postsLoading.value)
  
  return {
    user,
    posts,
    theme,
    setTheme,
    loading
  }
}
```

## 🎯 总结

Vue3 自定义 Hooks 是提高代码复用性和可维护性的强大工具。通过合理的设计和使用，可以让我们的组件更加简洁和专注于 UI 逻辑。

**关键要点：**
- 遵循命名规范（use 前缀）
- 保持单一职责原则
- 提供良好的类型支持
- 合理组合多个 hooks
- 注意内存泄漏和清理工作

---

下一步：查看 [Vue3 响应式原理](../reactivity.md) 或 [Vue3 性能优化](../performance.md)
