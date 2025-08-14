# Vue3 + TypeScript

Vue3对TypeScript提供了出色的支持，通过Composition API和完善的类型定义，我们可以构建类型安全的Vue应用。本文将详细介绍Vue3与TypeScript的集成使用。

## ⚛️ 项目配置

**概念解释**：
Vue3与TypeScript的集成配置是构建类型安全Vue应用的基础。正确的配置不仅能提供完整的类型检查，还能确保开发工具的智能提示和错误检查正常工作。

**配置的重要性**：
- **类型检查**：确保Vue组件、Composition API等都有正确的类型支持
- **开发体验**：提供完整的IDE支持，包括自动补全、错误提示等
- **构建优化**：优化TypeScript编译过程，提高构建效率
- **工具链集成**：与Vite、ESLint、Prettier等工具的完美集成

### 基础配置

**配置文件说明**：
Vue3 + TypeScript项目需要配置多个文件来确保完整的类型支持。每个配置文件都有其特定的作用和最佳实践。

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
})

// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

// env.d.ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

## 🏗️ 组件类型定义

### 基础组件类型

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card">
    <img :src="user.avatar" :alt="user.name" />
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <p>Age: {{ user.age }}</p>
    <button @click="handleEdit" :disabled="loading">
      {{ loading ? 'Saving...' : 'Edit' }}
    </button>
  </div>
</template>

<script setup lang="ts">
// 定义Props类型
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  avatar: string;
}

interface Props {
  user: User;
  loading?: boolean;
}

// 定义Emits类型
interface Emits {
  edit: [user: User]; // 参数类型数组
  delete: [id: number];
  update: [id: number, data: Partial<User>];
}

// 使用defineProps和defineEmits
const props = withDefaults(defineProps<Props>(), {
  loading: false
});

const emit = defineEmits<Emits>();

// 事件处理函数
const handleEdit = () => {
  emit('edit', props.user);
};

const handleDelete = () => {
  emit('delete', props.user.id);
};

const handleUpdate = (data: Partial<User>) => {
  emit('update', props.user.id, data);
};
</script>
```

### 复杂Props类型

```vue
<!-- DataTable.vue -->
<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="getRowKey(item)">
          <td v-for="column in columns" :key="column.key">
            <component 
              v-if="column.render"
              :is="column.render"
              :value="item[column.key]"
              :record="item"
            />
            <span v-else>{{ item[column.key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { Component } from 'vue';

// 泛型组件Props
interface Column<T> {
  key: keyof T;
  title: string;
  width?: number;
  render?: Component;
  sorter?: (a: T, b: T) => number;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  rowKey?: keyof T | ((record: T) => string | number);
  loading?: boolean;
}

const props = withDefaults(defineProps<Props<T>>(), {
  rowKey: 'id' as keyof T,
  loading: false
});

// 获取行键
const getRowKey = (record: T): string | number => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(record);
  }
  return record[props.rowKey] as string | number;
};
</script>
```

## 🔧 Composition API类型

### 基础Composition API

```typescript
// composables/useCounter.ts
import { ref, computed, type Ref } from 'vue';

export interface UseCounterReturn {
  count: Ref<number>;
  doubleCount: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(initialValue: number = 0): UseCounterReturn {
  const count = ref(initialValue);
  
  const doubleCount = computed(() => count.value * 2);
  
  const increment = () => {
    count.value++;
  };
  
  const decrement = () => {
    count.value--;
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  };
}

// 在组件中使用
// <script setup lang="ts">
// const { count, doubleCount, increment, decrement, reset } = useCounter(10);
// </script>
```

### 高级Composition API

```typescript
// composables/useApi.ts
import { ref, type Ref } from 'vue';

export interface ApiState<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
}

export interface UseApiReturn<T> extends ApiState<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export function useApi<T, Args extends any[]>(
  apiFunction: (...args: Args) => Promise<T>
): UseApiReturn<T> {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  const execute = async (...args: Args): Promise<T> => {
    try {
      loading.value = true;
      error.value = null;
      
      const result = await apiFunction(...args);
      data.value = result;
      
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  const reset = () => {
    data.value = null;
    loading.value = false;
    error.value = null;
  };
  
  return {
    data,
    loading,
    error,
    execute,
    reset
  };
}

// 使用示例
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// 在组件中使用
// const { data: user, loading, error, execute: fetchUserData } = useApi(fetchUser);
// await fetchUserData(1);
```

### 表单处理Composable

```typescript
// composables/useForm.ts
import { reactive, computed, type UnwrapNestedRefs } from 'vue';

export interface ValidationRule<T> {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (value: T) => boolean | string;
}

export interface FieldConfig<T> {
  rules?: ValidationRule<T>[];
  initialValue: T;
}

export interface FormConfig<T extends Record<string, any>> {
  [K in keyof T]: FieldConfig<T[K]>;
}

export interface FormState<T extends Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
}

export interface UseFormReturn<T extends Record<string, any>> {
  values: UnwrapNestedRefs<T>;
  errors: UnwrapNestedRefs<Partial<Record<keyof T, string>>>;
  touched: UnwrapNestedRefs<Partial<Record<keyof T, boolean>>>;
  isValid: Ref<boolean>;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldTouched: <K extends keyof T>(field: K, touched?: boolean) => void;
  validateField: <K extends keyof T>(field: K) => string | null;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => T | null;
}

export function useForm<T extends Record<string, any>>(
  config: FormConfig<T>
): UseFormReturn<T> {
  // 初始化表单状态
  const initialValues = Object.keys(config).reduce((acc, key) => {
    acc[key as keyof T] = config[key as keyof T].initialValue;
    return acc;
  }, {} as T);
  
  const state = reactive<FormState<T>>({
    values: { ...initialValues },
    errors: {},
    touched: {}
  });
  
  // 验证单个字段
  const validateField = <K extends keyof T>(field: K): string | null => {
    const value = state.values[field];
    const rules = config[field]?.rules || [];
    
    for (const rule of rules) {
      if (rule.required && (value === null || value === undefined || value === '')) {
        return `${String(field)} is required`;
      }
      
      if (rule.min && typeof value === 'string' && value.length < rule.min) {
        return `${String(field)} must be at least ${rule.min} characters`;
      }
      
      if (rule.max && typeof value === 'string' && value.length > rule.max) {
        return `${String(field)} must be at most ${rule.max} characters`;
      }
      
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        return `${String(field)} format is invalid`;
      }
      
      if (rule.validator) {
        const result = rule.validator(value);
        if (typeof result === 'string') {
          return result;
        }
        if (result === false) {
          return `${String(field)} is invalid`;
        }
      }
    }
    
    return null;
  };
  
  // 设置字段值
  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    state.values[field] = value;
    state.touched[field] = true;
    
    // 实时验证
    const error = validateField(field);
    if (error) {
      state.errors[field] = error;
    } else {
      delete state.errors[field];
    }
  };
  
  // 设置字段触摸状态
  const setFieldTouched = <K extends keyof T>(field: K, touched: boolean = true) => {
    state.touched[field] = touched;
  };
  
  // 验证整个表单
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Partial<Record<keyof T, string>> = {};
    
    for (const field of Object.keys(config) as (keyof T)[]) {
      const error = validateField(field);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }
    
    state.errors = newErrors;
    return isValid;
  };
  
  // 重置表单
  const resetForm = () => {
    state.values = { ...initialValues };
    state.errors = {};
    state.touched = {};
  };
  
  // 提交表单
  const submitForm = (): T | null => {
    // 标记所有字段为已触摸
    for (const field of Object.keys(config) as (keyof T)[]) {
      state.touched[field] = true;
    }
    
    if (validateForm()) {
      return { ...state.values };
    }
    
    return null;
  };
  
  // 计算表单是否有效
  const isValid = computed(() => {
    return Object.keys(state.errors).length === 0;
  });
  
  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isValid,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
    submitForm
  };
}
```

## 🎯 实际应用示例

### 用户管理组件

```vue
<!-- UserManagement.vue -->
<template>
  <div class="user-management">
    <div class="header">
      <h2>User Management</h2>
      <button @click="showCreateForm = true" class="btn-primary">
        Add User
      </button>
    </div>
    
    <DataTable
      :data="users"
      :columns="userColumns"
      :loading="loading"
      @edit="handleEditUser"
      @delete="handleDeleteUser"
    />
    
    <UserForm
      v-if="showCreateForm || editingUser"
      :user="editingUser"
      @submit="handleSubmitUser"
      @cancel="handleCancelForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from '@/components/DataTable.vue';
import UserForm from '@/components/UserForm.vue';
import { useApi } from '@/composables/useApi';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UpdateUserRequest extends Partial<CreateUserRequest> {}

// API函数
async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  return response.json();
}

async function createUser(userData: CreateUserRequest): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
}

async function updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
}

async function deleteUser(id: number): Promise<void> {
  await fetch(`/api/users/${id}`, { method: 'DELETE' });
}

// 组件状态
const users = ref<User[]>([]);
const showCreateForm = ref(false);
const editingUser = ref<User | null>(null);

// API hooks
const { loading, execute: loadUsers } = useApi(fetchUsers);
const { execute: createUserApi } = useApi(createUser);
const { execute: updateUserApi } = useApi(updateUser);
const { execute: deleteUserApi } = useApi(deleteUser);

// 表格列配置
const userColumns = [
  { key: 'name', title: 'Name' },
  { key: 'email', title: 'Email' },
  { key: 'role', title: 'Role' },
  { key: 'createdAt', title: 'Created At' },
  {
    key: 'actions',
    title: 'Actions',
    render: (record: User) => h('div', [
      h('button', { onClick: () => handleEditUser(record) }, 'Edit'),
      h('button', { onClick: () => handleDeleteUser(record.id) }, 'Delete')
    ])
  }
];

// 事件处理
const handleEditUser = (user: User) => {
  editingUser.value = user;
};

const handleDeleteUser = async (id: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await deleteUserApi(id);
    await loadUsersData();
  }
};

const handleSubmitUser = async (userData: CreateUserRequest | UpdateUserRequest) => {
  if (editingUser.value) {
    await updateUserApi(editingUser.value.id, userData);
  } else {
    await createUserApi(userData as CreateUserRequest);
  }
  
  handleCancelForm();
  await loadUsersData();
};

const handleCancelForm = () => {
  showCreateForm.value = false;
  editingUser.value = null;
};

const loadUsersData = async () => {
  users.value = await loadUsers();
};

// 生命周期
onMounted(() => {
  loadUsersData();
});
</script>
```

### 表单组件

```vue
<!-- UserForm.vue -->
<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <h3>{{ user ? 'Edit User' : 'Create User' }}</h3>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="values.name"
            type="text"
            :class="{ error: errors.name && touched.name }"
            @blur="setFieldTouched('name')"
          />
          <span v-if="errors.name && touched.name" class="error-message">
            {{ errors.name }}
          </span>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="values.email"
            type="email"
            :class="{ error: errors.email && touched.email }"
            @blur="setFieldTouched('email')"
          />
          <span v-if="errors.email && touched.email" class="error-message">
            {{ errors.email }}
          </span>
        </div>
        
        <div class="form-group">
          <label for="role">Role</label>
          <select
            id="role"
            v-model="values.role"
            :class="{ error: errors.role && touched.role }"
            @blur="setFieldTouched('role')"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <span v-if="errors.role && touched.role" class="error-message">
            {{ errors.role }}
          </span>
        </div>
        
        <div class="form-actions">
          <button type="button" @click="$emit('cancel')">Cancel</button>
          <button type="submit" :disabled="!isValid">
            {{ user ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/useForm';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface Props {
  user?: User;
}

interface Emits {
  submit: [data: { name: string; email: string; role: 'admin' | 'user' }];
  cancel: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 表单配置
const {
  values,
  errors,
  touched,
  isValid,
  setFieldTouched,
  submitForm
} = useForm({
  name: {
    initialValue: props.user?.name || '',
    rules: [
      { required: true },
      { min: 2, max: 50 }
    ]
  },
  email: {
    initialValue: props.user?.email || '',
    rules: [
      { required: true },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    ]
  },
  role: {
    initialValue: props.user?.role || 'user' as const,
    rules: [{ required: true }]
  }
});

// 事件处理
const handleSubmit = () => {
  const formData = submitForm();
  if (formData) {
    emit('submit', formData);
  }
};

const handleOverlayClick = () => {
  emit('cancel');
};
</script>
```

## 📚 总结

Vue3与TypeScript的结合为我们提供了强大的类型安全保障：

### 🎯 核心特性

- **组件类型定义**：通过defineProps和defineEmits定义类型安全的组件接口
- **Composition API类型**：为可复用逻辑提供完整的类型支持
- **泛型组件**：创建可重用的类型安全组件
- **表单处理**：类型安全的表单验证和数据处理

### 💡 最佳实践

1. **类型优先**：先定义接口类型，再实现组件逻辑
2. **Composable复用**：将业务逻辑封装成可复用的Composable
3. **泛型组件**：使用泛型创建灵活的通用组件
4. **错误处理**：完善的错误类型定义和处理机制

### 🚀 实际价值

- **开发体验**：完整的类型提示和错误检查
- **代码质量**：编译时发现潜在问题
- **团队协作**：统一的类型定义提高协作效率
- **维护性**：类型系统帮助安全地重构代码