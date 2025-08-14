# React18 + TypeScript

React18与TypeScript的结合为我们提供了强大的类型安全保障和出色的开发体验。本文将详细介绍React18与TypeScript的集成使用，包括组件类型、Hooks类型、事件处理等。

## ⚛️ 项目配置

**概念解释**：
React18与TypeScript的集成为现代React开发提供了强大的类型安全保障。正确的配置是构建高质量React应用的基础，它不仅能提供完整的类型检查，还能确保与React18新特性的完美兼容。

**配置的核心价值**：
- **类型安全**：为React组件、Hooks、事件处理等提供完整的类型支持
- **开发效率**：通过IDE智能提示和错误检查提升开发体验
- **代码质量**：在编译时发现潜在问题，减少运行时错误
- **团队协作**：统一的类型定义标准，提高代码可维护性

### 基础配置

**配置文件详解**：
React18 + TypeScript项目需要精心配置以确保最佳的开发体验和类型安全。以下是关键配置文件的最佳实践。

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ES6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}

// package.json dependencies
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

## 🏗️ 组件类型定义

### 函数组件类型

```typescript
import React, { FC, ReactNode } from 'react';

// 基础函数组件
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Button: FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  size = 'medium'
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// 泛型函数组件
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string | number;
  loading?: boolean;
  emptyMessage?: string;
}

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  loading = false,
  emptyMessage = 'No items found'
}: ListProps<T>) {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (items.length === 0) {
    return <div className="empty">{emptyMessage}</div>;
  }

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// 使用示例
interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: FC<{ users: User[] }> = ({ users }) => {
  return (
    <List
      items={users}
      keyExtractor={(user) => user.id}
      renderItem={(user) => (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
      emptyMessage="No users found"
    />
  );
};
```

### 高阶组件类型

```typescript
import React, { ComponentType, FC } from 'react';

// HOC类型定义
interface WithLoadingProps {
  loading: boolean;
}

function withLoading<P extends object>(
  Component: ComponentType<P>
): FC<P & WithLoadingProps> {
  return ({ loading, ...props }) => {
    if (loading) {
      return <div className="loading-spinner">Loading...</div>;
    }
    
    return <Component {...(props as P)} />;
  };
}

// 使用HOC
interface UserProfileProps {
  user: User;
  onEdit: () => void;
}

const UserProfile: FC<UserProfileProps> = ({ user, onEdit }) => {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

const UserProfileWithLoading = withLoading(UserProfile);

// 使用组件
const App: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  return (
    <UserProfileWithLoading
      user={user!}
      onEdit={() => console.log('Edit user')}
      loading={loading}
    />
  );
};
```

## 🎣 Hooks类型

### 基础Hooks类型

```typescript
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// useState类型推断
const [count, setCount] = useState(0); // 自动推断为number
const [name, setName] = useState(''); // 自动推断为string
const [user, setUser] = useState<User | null>(null); // 显式类型

// useEffect类型
useEffect(() => {
  // 副作用函数
  const fetchData = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  };

  fetchData();

  // 清理函数
  return () => {
    // 清理逻辑
  };
}, [dependency]); // 依赖数组

// useCallback类型
const handleClick = useCallback((id: number) => {
  console.log('Clicked item:', id);
}, []);

const handleSubmit = useCallback((data: FormData) => {
  // 处理表单提交
}, []);

// useMemo类型
const expensiveValue = useMemo(() => {
  return items.reduce((sum, item) => sum + item.value, 0);
}, [items]);

const filteredItems = useMemo(() => {
  return items.filter(item => item.active);
}, [items]);

// useRef类型
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<NodeJS.Timeout | null>(null);

const focusInput = () => {
  inputRef.current?.focus();
};
```

### 自定义Hooks类型

```typescript
// API请求Hook
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => Promise<void>;
  reset: () => void;
}

function useApi<T>(url: string): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  }, [url]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
    reset
  };
}

// 表单Hook
interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  handleChange: (field: keyof T) => (value: T[keyof T]) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field: keyof T) => (value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // 清除该字段的错误
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((field: keyof T) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // 验证该字段
    if (validate) {
      const fieldErrors = validate(values);
      if (fieldErrors[field]) {
        setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
      }
    }
  }, [values, validate]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 标记所有字段为已触摸
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Partial<Record<keyof T, boolean>>);
    setTouched(allTouched);

    // 验证表单
    if (validate) {
      const formErrors = validate(values);
      setErrors(formErrors);
      
      if (Object.keys(formErrors).length > 0) {
        return;
      }
    }

    // 提交表单
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
}
```

## 🎯 事件处理类型

### 常见事件类型

```typescript
import React, { ChangeEvent, FormEvent, MouseEvent, KeyboardEvent } from 'react';

interface FormComponentProps {
  onSubmit: (data: FormData) => void;
}

const FormComponent: FC<FormComponentProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0
  });

  // 输入框变化事件
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  // 选择框变化事件
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 文本域变化事件
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 表单提交事件
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // 按钮点击事件
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Button clicked');
  };

  // 键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // 处理回车键
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleButtonClick}>
        Submit
      </button>
    </form>
  );
};
```

### 自定义事件处理

```typescript
// 自定义事件类型
interface CustomSelectProps<T> {
  options: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
}

function CustomSelect<T extends string | number>({
  options,
  value,
  onChange,
  placeholder = 'Select an option'
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="custom-select">
      <div
        className="select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {options.find(opt => opt.value === value)?.label || placeholder}
      </div>
      
      {isOpen && (
        <ul className="select-options" role="listbox">
          {options.map((option) => (
            <li
              key={String(option.value)}
              className="select-option"
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## 🎯 实际应用示例

### 用户管理应用

```typescript
// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

// components/UserList.tsx
interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const UserList: FC<UserListProps> = ({ users, onEdit, onDelete, loading = false }) => {
  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="user-list">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// components/UserForm.tsx
interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserRequest) => void;
  onCancel: () => void;
}

const UserForm: FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useForm<CreateUserRequest>({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'user'
    },
    validate: (values) => {
      const errors: Partial<Record<keyof CreateUserRequest, string>> = {};
      
      if (!values.name.trim()) {
        errors.name = 'Name is required';
      }
      
      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email format';
      }
      
      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
      resetForm();
    }
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{user ? 'Edit User' : 'Create User'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={(e) => handleChange('name')(e.target.value)}
              onBlur={handleBlur('name')}
              className={errors.name && touched.name ? 'error' : ''}
            />
            {errors.name && touched.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email')(e.target.value)}
              onBlur={handleBlur('email')}
              className={errors.email && touched.email ? 'error' : ''}
            />
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={values.role}
              onChange={(e) => handleChange('role')(e.target.value as 'admin' | 'user')}
              onBlur={handleBlur('role')}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : user ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// App.tsx
const App: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data, loading, refetch } = useApi<User[]>('/api/users');

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        await refetch();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await refetch();
        }
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="app">
      <header>
        <h1>User Management</h1>
        <button onClick={() => setShowForm(true)}>
          Add User
        </button>
      </header>

      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        loading={loading}
      />

      {showForm && (
        <UserForm
          user={editingUser || undefined}
          onSubmit={handleCreateUser}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default App;
```

## 📚 总结

React18与TypeScript的结合为现代前端开发提供了强大的类型安全保障：

### 🎯 核心特性

- **组件类型定义**：通过接口定义Props和State类型
- **Hooks类型支持**：完整的Hooks类型推断和自定义Hooks类型
- **事件处理类型**：精确的事件类型定义和处理
- **泛型组件**：创建可重用的类型安全组件

### 💡 最佳实践

1. **类型优先**：先定义接口类型，再实现组件逻辑
2. **自定义Hooks**：将业务逻辑封装成可复用的类型安全Hooks
3. **事件类型**：使用正确的事件类型，避免any类型
4. **泛型使用**：合理使用泛型创建灵活的组件

### 🚀 实际价值

- **开发体验**：完整的类型提示和错误检查
- **代码质量**：编译时发现潜在问题
- **重构安全**：类型系统保证重构的安全性
- **团队协作**：统一的类型定义提高协作效率

React18 + TypeScript的组合是现代React开发的标准配置，掌握这些技能能够让你构建更加健壮、可维护的React应用程序。
