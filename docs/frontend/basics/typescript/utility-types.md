# 内置工具类型

TypeScript提供了丰富的内置工具类型，这些类型可以帮助我们进行常见的类型转换操作。掌握这些工具类型的使用场景和实现原理，能够大大提高开发效率。

## 🛠️ 基础工具类型

### Partial\<T\>

**概念解释**：
Partial\<T\>是TypeScript中最常用的工具类型之一，它将类型T的所有属性变为可选属性。这在处理部分更新、配置对象、表单数据等场景中非常有用。

**设计思想**：
在实际开发中，我们经常需要只更新对象的部分属性，而不是整个对象。Partial\<T\>完美地解决了这个问题，让我们能够以类型安全的方式处理部分数据。

**核心价值**：

- **部分更新**：支持只传递需要更新的字段
- **配置灵活性**：允许配置对象的部分属性为可选
- **表单处理**：处理表单的部分填写状态
- **API设计**：设计更灵活的API接口

```typescript
// Partial<T> - 将T的所有属性变为可选
type Partial<T> = {
    [P in keyof T]?: T[P];
};

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type PartialUser = Partial<User>;
// {
//     id?: number;
//     name?: string;
//     email?: string;
//     age?: number;
// }

// 实际应用场景
function updateUser(id: number, updates: Partial<User>): Promise<User> {
    // 只需要传入需要更新的字段
    return fetch(`/api/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
    }).then(res => res.json());
}

// 使用示例
updateUser(1, { name: "New Name" }); // 只更新name字段
updateUser(2, { age: 25, email: "new@email.com" }); // 更新多个字段
```

**Partial的实际应用场景**：
- **数据库更新操作**：只更新变化的字段，提高性能
- **表单状态管理**：处理表单的部分填写和验证
- **配置对象合并**：合并默认配置和用户配置
- **API接口设计**：PATCH请求的参数类型定义
- **状态管理**：Redux/Vuex中的状态部分更新

### Required\<T\>

**概念解释**：
Required\<T\>是Partial\<T\>的反向操作，它将类型T的所有可选属性变为必需属性。这在需要确保对象完整性的场景中非常有用。

**使用场景**：
- **数据验证**：确保所有必要字段都已提供
- **配置完整性检查**：验证配置对象的完整性
- **类型转换**：将可选类型转换为必需类型
- **API响应处理**：确保API返回的数据包含所有必要字段

```typescript
// Required<T> - 将T的所有属性变为必需
type Required<T> = {
    [P in keyof T]-?: T[P]; // -? 移除可选修饰符
};

interface Config {
    apiUrl?: string;
    timeout?: number;
    retries?: number;
    debug?: boolean;
}

type RequiredConfig = Required<Config>;
// {
//     apiUrl: string;
//     timeout: number;
//     retries: number;
//     debug: boolean;
// }

// 实际应用场景
function createApiClient(config: Config): ApiClient {
    // 提供默认值，确保所有配置都存在
    const fullConfig: RequiredConfig = {
        apiUrl: config.apiUrl || 'https://api.example.com',
        timeout: config.timeout || 5000,
        retries: config.retries || 3,
        debug: config.debug || false
    };
    
    return new ApiClient(fullConfig);
}
```

### Readonly\<T\>

```typescript
// Readonly<T> - 将T的所有属性变为只读
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

interface MutableUser {
    id: number;
    name: string;
    email: string;
}

type ReadonlyUser = Readonly<MutableUser>;
// {
//     readonly id: number;
//     readonly name: string;
//     readonly email: string;
// }

// 实际应用场景
function processUser(user: ReadonlyUser): void {
    console.log(user.name);
    // user.name = "New Name"; // 错误：只读属性不能修改
}

// 深度只读
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface NestedData {
    user: {
        profile: {
            name: string;
            age: number;
        };
    };
}

type DeepReadonlyData = DeepReadonly<NestedData>;
// 所有嵌套属性都变为只读
```

## 🎯 选择和排除类型

**概念解释**：
选择和排除类型是TypeScript中非常实用的工具类型，它们允许我们从现有类型中选择特定属性或排除特定属性，创建新的类型。这在API设计、数据传输对象（DTO）定义等场景中特别有用。

**设计理念**：
- **Pick**：从大类型中选择需要的属性，实现类型的精简
- **Omit**：从大类型中排除不需要的属性，实现类型的过滤
- **组合使用**：两者可以组合使用，实现复杂的类型变换

### Pick\<T, K\>

**概念解释**：
Pick\<T, K\>从类型T中选择指定的属性K，创建一个新的类型。这在需要创建轻量级类型或API响应类型时非常有用。

**使用场景**：
- **API响应优化**：只返回前端需要的字段
- **表单数据处理**：从完整模型中选择表单相关字段
- **组件Props设计**：从大的配置对象中选择组件需要的属性

```typescript
// Pick<T, K> - 从T中选择指定的属性K
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
// {
//     id: number;
//     name: string;
//     email: string;
// }

type UserCredentials = Pick<User, 'email' | 'password'>;
// {
//     email: string;
//     password: string;
// }

// 实际应用场景
function getPublicUserInfo(user: User): PublicUser {
    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
}

// API响应类型
interface ApiUser extends Pick<User, 'id' | 'name' | 'email' | 'createdAt'> {
    isOnline: boolean;
}
```

### Omit\<T, K\>

```typescript
// Omit<T, K> - 从T中排除指定的属性K
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
// {
//     name: string;
//     email: string;
//     password: string;
// }

type UserWithoutPassword = Omit<User, 'password'>;
// {
//     id: number;
//     name: string;
//     email: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

// 实际应用场景
async function createUser(userData: CreateUserRequest): Promise<User> {
    const newUser: User = {
        id: Math.random(), // 生成ID
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    // 保存到数据库
    return saveUser(newUser);
}

// 组件Props类型
interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

// 排除onClick，创建展示用的按钮
type DisplayButtonProps = Omit<ButtonProps, 'onClick'>;
```

## 🔗 联合类型操作

### Exclude\<T, U\>

```typescript
// Exclude<T, U> - 从联合类型T中排除U
type Exclude<T, U> = T extends U ? never : T;

type AllColors = 'red' | 'green' | 'blue' | 'yellow' | 'purple';
type PrimaryColors = 'red' | 'green' | 'blue';

type SecondaryColors = Exclude<AllColors, PrimaryColors>; // 'yellow' | 'purple'

// 实际应用场景
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type SafeMethods = 'GET';
type UnsafeMethods = Exclude<HttpMethod, SafeMethods>; // 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// 事件类型过滤
type AllEvents = 'click' | 'scroll' | 'resize' | 'keydown' | 'keyup';
type KeyboardEvents = 'keydown' | 'keyup';
type NonKeyboardEvents = Exclude<AllEvents, KeyboardEvents>; // 'click' | 'scroll' | 'resize'
```

### Extract\<T, U\>

```typescript
// Extract<T, U> - 从联合类型T中提取U
type Extract<T, U> = T extends U ? T : never;

type AllProps = 'id' | 'name' | 'email' | 'onClick' | 'onSubmit' | 'className';
type EventProps = Extract<AllProps, `on${string}`>; // 'onClick' | 'onSubmit'

// 实际应用场景
type ApiResponse = 
    | { type: 'success'; data: any }
    | { type: 'error'; message: string }
    | { type: 'loading' }
    | { type: 'idle' };

type ErrorResponse = Extract<ApiResponse, { type: 'error' }>; // { type: 'error'; message: string }
type DataResponse = Extract<ApiResponse, { type: 'success' }>; // { type: 'success'; data: any }

// 函数类型提取
type MixedTypes = string | number | (() => void) | boolean;
type FunctionTypes = Extract<MixedTypes, Function>; // () => void
```

### NonNullable\<T\>

```typescript
// NonNullable<T> - 从T中排除null和undefined
type NonNullable<T> = T extends null | undefined ? never : T;

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

// 实际应用场景
function processValue<T>(value: T): NonNullable<T> {
    if (value == null) {
        throw new Error('Value cannot be null or undefined');
    }
    return value as NonNullable<T>;
}

// 数组过滤
function filterNullable<T>(array: (T | null | undefined)[]): NonNullable<T>[] {
    return array.filter((item): item is NonNullable<T> => item != null);
}

const mixedArray = ['hello', null, 'world', undefined, 'typescript'];
const cleanArray = filterNullable(mixedArray); // string[]
```

## 📝 Record类型

### Record\<K, T\>

```typescript
// Record<K, T> - 创建一个对象类型，键为K，值为T
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// 基础使用
type StringRecord = Record<string, string>;
// { [x: string]: string }

type NumberRecord = Record<'a' | 'b' | 'c', number>;
// { a: number; b: number; c: number }

// 实际应用场景
type Theme = 'light' | 'dark';
type Colors = Record<Theme, {
    primary: string;
    secondary: string;
    background: string;
}>;

const themeColors: Colors = {
    light: {
        primary: '#007bff',
        secondary: '#6c757d',
        background: '#ffffff'
    },
    dark: {
        primary: '#0d6efd',
        secondary: '#6c757d',
        background: '#212529'
    }
};

// API端点配置
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoints = Record<string, {
    method: HttpMethod;
    url: string;
    requiresAuth?: boolean;
}>;

const endpoints: ApiEndpoints = {
    getUsers: { method: 'GET', url: '/users' },
    createUser: { method: 'POST', url: '/users', requiresAuth: true },
    updateUser: { method: 'PUT', url: '/users/:id', requiresAuth: true },
    deleteUser: { method: 'DELETE', url: '/users/:id', requiresAuth: true }
};

// 状态管理
type LoadingState = 'idle' | 'loading' | 'success' | 'error';
type FeatureStates = Record<string, LoadingState>;

const appStates: FeatureStates = {
    userProfile: 'idle',
    notifications: 'loading',
    settings: 'success'
};
```

## 🔄 函数相关工具类型

### Parameters\<T\>

```typescript
// Parameters<T> - 获取函数T的参数类型元组
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number, email: string): User {
    return { id: 1, name, age, email } as User;
}

type CreateUserParams = Parameters<typeof createUser>; // [string, number, string]

// 实际应用场景
type ApiFunction = (endpoint: string, options?: RequestInit) => Promise<Response>;
type ApiParams = Parameters<ApiFunction>; // [string, RequestInit?]

// 函数包装器
function withLogging<T extends (...args: any[]) => any>(
    fn: T,
    logger: (...args: Parameters<T>) => void
) {
    return (...args: Parameters<T>): ReturnType<T> => {
        logger(...args);
        return fn(...args);
    };
}

const loggedCreateUser = withLogging(createUser, (name, age, email) => {
    console.log(`Creating user: ${name}, ${age}, ${email}`);
});
```

### ReturnType\<T\>

```typescript
// ReturnType<T> - 获取函数T的返回类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

function getUser(): Promise<User> {
    return fetch('/api/user').then(res => res.json());
}

type UserPromise = ReturnType<typeof getUser>; // Promise<User>

// 实际应用场景
async function fetchData() {
    const response = await fetch('/api/data');
    return {
        data: await response.json(),
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
    };
}

type FetchResult = ReturnType<typeof fetchData>; // Promise<{ data: any; status: number; headers: Record<string, string> }>

// 解包Promise类型
type Awaited<T> = T extends Promise<infer U> ? U : T;
type UnwrappedFetchResult = Awaited<FetchResult>; // { data: any; status: number; headers: Record<string, string> }
```

### ConstructorParameters\<T\>

```typescript
// ConstructorParameters<T> - 获取构造函数T的参数类型元组
type ConstructorParameters<T extends abstract new (...args: any) => any> = 
    T extends abstract new (...args: infer P) => any ? P : never;

class ApiClient {
    constructor(baseUrl: string, timeout: number = 5000, apiKey?: string) {
        // 构造函数实现
    }
}

type ApiClientParams = ConstructorParameters<typeof ApiClient>; // [string, number?, string?]

// 实际应用场景
function createApiClient(...args: ConstructorParameters<typeof ApiClient>): ApiClient {
    return new ApiClient(...args);
}

// 工厂函数
type ClassConstructor<T = {}> = new (...args: any[]) => T;

function createInstance<T extends ClassConstructor>(
    ctor: T,
    ...args: ConstructorParameters<T>
): InstanceType<T> {
    return new ctor(...args);
}

const client = createInstance(ApiClient, 'https://api.example.com', 3000);
```

## 🎯 实际应用场景

### 表单处理

```typescript
// 表单数据类型
interface UserForm {
    name: string;
    email: string;
    age: number;
    newsletter: boolean;
}

// 表单验证错误
type FormErrors<T> = Partial<Record<keyof T, string>>;

// 表单状态
interface FormState<T> {
    values: Partial<T>;
    errors: FormErrors<T>;
    touched: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
}

// 表单Hook
function useForm<T>(initialValues: Partial<T>) {
    const [state, setState] = useState<FormState<T>>({
        values: initialValues,
        errors: {},
        touched: {},
        isSubmitting: false
    });
    
    const updateField = <K extends keyof T>(field: K, value: T[K]) => {
        setState(prev => ({
            ...prev,
            values: { ...prev.values, [field]: value },
            touched: { ...prev.touched, [field]: true }
        }));
    };
    
    return { state, updateField };
}

// 使用示例
const userForm = useForm<UserForm>({
    name: '',
    email: '',
    age: 0,
    newsletter: false
});
```

### API客户端类型

```typescript
// API响应包装
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

// API错误
interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
}

// API结果类型
type ApiResult<T> = ApiResponse<T> | ApiError;

// 类型守卫
function isApiResponse<T>(result: ApiResult<T>): result is ApiResponse<T> {
    return 'data' in result;
}

function isApiError(result: ApiResult<any>): result is ApiError {
    return 'code' in result;
}

// API客户端
class TypedApiClient {
    async get<T>(endpoint: string): Promise<ApiResult<T>> {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            
            if (response.ok) {
                return {
                    data,
                    status: response.status,
                    message: 'Success'
                };
            } else {
                return {
                    code: data.code || 'UNKNOWN_ERROR',
                    message: data.message || 'An error occurred'
                };
            }
        } catch (error) {
            return {
                code: 'NETWORK_ERROR',
                message: 'Network request failed'
            };
        }
    }
    
    async post<T, U>(endpoint: string, body: T): Promise<ApiResult<U>> {
        // 实现POST请求
        return {} as ApiResult<U>;
    }
}

// 使用示例
const api = new TypedApiClient();

async function fetchUser(id: string) {
    const result = await api.get<User>(`/users/${id}`);
    
    if (isApiResponse(result)) {
        console.log(result.data.name); // 类型安全
    } else {
        console.error(result.message); // 错误处理
    }
}
```

## 📚 总结

TypeScript的内置工具类型为我们提供了强大的类型操作能力，是现代TypeScript开发中不可或缺的工具：

### 🎯 核心工具类型分类

**属性操作类型**：
- **Partial/Required**：控制属性的可选性，处理部分更新和完整性验证
- **Readonly**：控制属性的可变性，确保数据不被意外修改
- **Pick/Omit**：选择或排除对象属性，实现类型的精确裁剪

**类型构造类型**：
- **Record**：创建键值对类型，构建字典和映射结构
- **Exclude/Extract**：操作联合类型，实现类型的过滤和提取

**函数相关类型**：
- **Parameters/ReturnType**：操作函数类型，提取参数和返回值类型
- **ConstructorParameters**：处理构造函数类型，支持工厂模式

### 💡 使用原则和最佳实践

1. **渐进式学习**：从基础工具类型开始，逐步掌握复杂的组合用法
2. **合适的工具**：根据具体需求选择合适的工具类型，避免过度设计
3. **组合使用**：多个工具类型可以组合使用，创建复杂而精确的类型
4. **类型安全优先**：利用工具类型提高代码的类型安全性，减少运行时错误
5. **代码复用**：通过工具类型减少重复的类型定义，提高维护性
6. **文档化类型**：为复杂的工具类型组合添加注释，提高可读性

### 🚀 实际价值和影响

**开发效率提升**：
- 减少手动类型定义的工作量，提高开发速度
- 提供标准化的类型操作方式，降低学习成本
- 支持IDE智能提示，提升开发体验

**代码质量保障**：
- 在编译时捕获类型错误，减少运行时bug
- 确保类型的一致性和正确性
- 支持大规模重构，提供类型安全保障

**团队协作优化**：
- 统一的类型操作方式提高代码一致性
- 清晰的类型定义减少沟通成本
- 便于代码审查和维护

掌握这些工具类型是成为TypeScript专家的重要一步，它们不仅能提高开发效率，还能让你的代码更加健壮和可维护。

掌握这些内置工具类型，能够让你更高效地处理复杂的类型操作，是TypeScript开发中不可或缺的技能。
