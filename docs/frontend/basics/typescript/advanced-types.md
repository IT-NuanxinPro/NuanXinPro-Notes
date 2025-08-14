# 高级类型与类型体操

TypeScript的高级类型系统提供了强大的类型操作能力，通过条件类型、映射类型、模板字面量类型等特性，我们可以构建复杂而精确的类型系统。本文将深入探讨这些高级特性。

## 🎭 条件类型

**概念解释**：
条件类型是TypeScript中最强大的高级特性之一，它允许我们根据类型关系来选择不同的类型。条件类型的语法类似于JavaScript中的三元运算符，但操作的是类型而不是值。

**设计理念**：
条件类型的核心思想是"类型级别的逻辑判断"。它让我们能够编写更智能的类型定义，根据输入类型的特征来决定输出类型，实现真正的类型编程。

**核心价值**：
- **类型智能化**：根据输入类型自动推导最合适的输出类型
- **代码复用**：一个类型定义可以处理多种情况
- **类型安全**：在类型层面进行逻辑判断，避免运行时错误
- **表达能力**：能够表达复杂的类型关系和约束

### 基础条件类型

**语法解析**：
条件类型的基本语法是 `T extends U ? X : Y`，其中：
- `T extends U` 是条件判断，检查类型T是否可以赋值给类型U
- `?` 和 `:` 分别对应条件为真和为假的情况
- `X` 和 `Y` 是对应的结果类型

```typescript
// 条件类型基础语法：T extends U ? X : Y
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;  // true
type Test2 = IsString<number>;  // false
type Test3 = IsString<"hello">; // true

// 实用的条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

type Example1 = NonNullable<string | null>;      // string
type Example2 = NonNullable<number | undefined>; // number
type Example3 = NonNullable<boolean | null | undefined>; // boolean

// 函数返回类型提取
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type FuncReturn1 = ReturnType<() => string>;           // string
type FuncReturn2 = ReturnType<(x: number) => boolean>; // boolean
type FuncReturn3 = ReturnType<string>;                 // never

// 数组元素类型提取
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Element1 = ArrayElement<string[]>;  // string
type Element2 = ArrayElement<number[]>;  // number
type Element3 = ArrayElement<string>;    // never
```

### 分布式条件类型

```typescript
// 分布式条件类型：当条件类型作用于联合类型时，会分布到每个成员
type ToArray<T> = T extends any ? T[] : never;

type ArrayUnion = ToArray<string | number>; // string[] | number[]

// 过滤联合类型
type Filter<T, U> = T extends U ? T : never;

type StringsOnly = Filter<string | number | boolean, string>; // string
type NumbersOnly = Filter<string | number | boolean, number>; // number

// 排除类型
type Exclude<T, U> = T extends U ? never : T;

type WithoutString = Exclude<string | number | boolean, string>; // number | boolean

// 提取类型
type Extract<T, U> = T extends U ? T : never;

type OnlyString = Extract<string | number | boolean, string>; // string
```

### 高级条件类型应用

```typescript
// 深度只读类型
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface User {
    name: string;
    profile: {
        age: number;
        address: {
            city: string;
            country: string;
        };
    };
}

type ReadonlyUser = DeepReadonly<User>;
// 所有属性都变成只读，包括嵌套对象

// 函数重载类型推断
type OverloadedFunction = {
    (x: string): string;
    (x: number): number;
    (x: boolean): boolean;
};

type InferOverload<T> = T extends {
    (x: infer U): infer R;
    (x: any): any;
} ? (x: U) => R : never;

type FirstOverload = InferOverload<OverloadedFunction>; // (x: string) => string

// Promise链类型推断
type PromiseChain<T> = T extends Promise<infer U> 
    ? U extends Promise<any> 
        ? PromiseChain<U> 
        : U 
    : T;

type ChainResult1 = PromiseChain<Promise<string>>;           // string
type ChainResult2 = PromiseChain<Promise<Promise<number>>>;  // number
type ChainResult3 = PromiseChain<string>;                    // string
```

## 🗺️ 映射类型

### 基础映射类型

```typescript
// 基础映射类型语法：{ [P in K]: T }
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Required<T> = {
    [P in keyof T]-?: T[P]; // -? 移除可选修饰符
};

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Mutable<T> = {
    -readonly [P in keyof T]: T[P]; // -readonly 移除只读修饰符
};

// 使用示例
interface User {
    id: number;
    name: string;
    email?: string;
}

type PartialUser = Partial<User>;   // 所有属性可选
type RequiredUser = Required<User>; // 所有属性必需
type ReadonlyUser = Readonly<User>; // 所有属性只读
```

### 键值映射

```typescript
// 键名映射
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type Setters<T> = {
    [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
};

interface Person {
    name: string;
    age: number;
}

type PersonGetters = Getters<Person>;
// {
//     getName: () => string;
//     getAge: () => number;
// }

type PersonSetters = Setters<Person>;
// {
//     setName: (value: string) => void;
//     setAge: (value: number) => void;
// }

// 键过滤
type PickByType<T, U> = {
    [P in keyof T as T[P] extends U ? P : never]: T[P];
};

type OmitByType<T, U> = {
    [P in keyof T as T[P] extends U ? never : P]: T[P];
};

interface Mixed {
    id: number;
    name: string;
    age: number;
    isActive: boolean;
}

type StringProps = PickByType<Mixed, string>; // { name: string }
type NonStringProps = OmitByType<Mixed, string>; // { id: number; age: number; isActive: boolean }
```

### 高级映射类型

```typescript
// 递归映射类型
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// 路径类型生成
type Paths<T> = T extends object ? {
    [K in keyof T]: K extends string 
        ? T[K] extends object 
            ? K | `${K}.${Paths<T[K]>}`
            : K
        : never;
}[keyof T] : never;

interface NestedObject {
    user: {
        profile: {
            name: string;
            age: number;
        };
        settings: {
            theme: string;
        };
    };
    config: {
        debug: boolean;
    };
}

type ObjectPaths = Paths<NestedObject>;
// "user" | "config" | "user.profile" | "user.settings" | "user.profile.name" | 
// "user.profile.age" | "user.settings.theme" | "config.debug"

// 根据路径获取值类型
type PathValue<T, P extends string> = P extends keyof T
    ? T[P]
    : P extends `${infer K}.${infer Rest}`
        ? K extends keyof T
            ? PathValue<T[K], Rest>
            : never
        : never;

type UserName = PathValue<NestedObject, "user.profile.name">; // string
type Theme = PathValue<NestedObject, "user.settings.theme">;  // string
```

## 📝 模板字面量类型

### 基础模板字面量

```typescript
// 模板字面量类型
type World = "world";
type Greeting = `hello ${World}`; // "hello world"

// 联合类型的组合
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";
type Style = `${Color}-${Size}`; // "red-small" | "red-medium" | ... | "blue-large"

// 实际应用：CSS类名生成
type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";
type ButtonClass = `btn-${ButtonVariant}-${ButtonSize}`;

// 事件名称生成
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">;     // "onClick"
type ChangeEvent = EventName<"change">;   // "onChange"
type SubmitEvent = EventName<"submit">;   // "onSubmit"
```

### 字符串操作类型

```typescript
// 内置字符串操作类型
type UppercaseExample = Uppercase<"hello">; // "HELLO"
type LowercaseExample = Lowercase<"WORLD">; // "world"
type CapitalizeExample = Capitalize<"typescript">; // "Typescript"
type UncapitalizeExample = Uncapitalize<"TypeScript">; // "typeScript"

// 自定义字符串操作
type KebabCase<S extends string> = S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T> ? `-${Lowercase<T>}` : T}${KebabCase<U>}`
    : S;

type CamelToKebab = KebabCase<"userName">; // "user-name"
type CamelToKebab2 = KebabCase<"firstName">; // "first-name"

// URL路径类型
type Route<T extends string> = T extends `/${infer Path}`
    ? Path extends `${infer Segment}/${infer Rest}`
        ? Segment | Route<`/${Rest}`>
        : Path
    : never;

type ApiRoutes = Route<"/api/users/profile">; // "api" | "users" | "profile"

// 查询参数类型
type ParseQuery<T extends string> = T extends `${infer Key}=${infer Value}&${infer Rest}`
    ? { [K in Key]: Value } & ParseQuery<Rest>
    : T extends `${infer Key}=${infer Value}`
        ? { [K in Key]: Value }
        : {};

type QueryParams = ParseQuery<"name=john&age=30&active=true">;
// { name: "john"; age: "30"; active: "true" }
```

## 🔧 类型体操实战

### 数组操作类型

```typescript
// 数组长度计算
type Length<T extends readonly any[]> = T['length'];

type Len1 = Length<[1, 2, 3]>; // 3
type Len2 = Length<[]>; // 0

// 数组头部和尾部
type Head<T extends readonly any[]> = T extends readonly [infer H, ...any[]] ? H : never;
type Tail<T extends readonly any[]> = T extends readonly [any, ...infer T] ? T : [];

type FirstElement = Head<[1, 2, 3]>; // 1
type RestElements = Tail<[1, 2, 3]>; // [2, 3]

// 数组反转
type Reverse<T extends readonly any[]> = T extends readonly [...infer Rest, infer Last]
    ? [Last, ...Reverse<Rest>]
    : [];

type Reversed = Reverse<[1, 2, 3, 4]>; // [4, 3, 2, 1]

// 数组连接
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];

type Combined = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// 数组包含检查
type Includes<T extends readonly any[], U> = T extends readonly [infer First, ...infer Rest]
    ? Equal<First, U> extends true
        ? true
        : Includes<Rest, U>
    : false;

// 辅助类型：类型相等检查
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
    ? true
    : false;

type HasNumber = Includes<[1, 2, 3], 2>; // true
type HasString = Includes<[1, 2, 3], "2">; // false
```

### 对象操作类型

```typescript
// 对象键值对转换
type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T];

type ObjectEntries = Entries<{ a: string; b: number }>; // ["a", string] | ["b", number]

// 对象值类型联合
type ValueOf<T> = T[keyof T];

type Values = ValueOf<{ a: string; b: number; c: boolean }>; // string | number | boolean

// 对象键重命名
type RenameKeys<T, M extends Record<keyof T, string>> = {
    [K in keyof T as K extends keyof M ? M[K] : K]: T[K];
};

type Renamed = RenameKeys<
    { name: string; age: number },
    { name: "fullName" }
>; // { fullName: string; age: number }

// 对象扁平化
type Flatten<T> = T extends object ? {
    [K in keyof T]: T[K] extends object 
        ? Flatten<T[K]> extends infer F
            ? { [P in keyof F as `${string & K}.${string & P}`]: F[P] }
            : never
        : { [P in K]: T[K] }
}[keyof T] : T;

type FlatObject = Flatten<{
    user: {
        name: string;
        profile: {
            age: number;
        };
    };
}>;
// { "user.name": string; "user.profile.age": number }
```

### 函数类型操作

```typescript
// 函数参数类型提取
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

type FuncParams = Parameters<(a: string, b: number) => void>; // [string, number]

// 柯里化类型
type Curry<T> = T extends (...args: infer Args) => infer Return
    ? Args extends [infer First, ...infer Rest]
        ? (arg: First) => Rest extends []
            ? Return
            : Curry<(...args: Rest) => Return>
        : () => Return
    : never;

type CurriedAdd = Curry<(a: number, b: number, c: number) => number>;
// (arg: number) => (arg: number) => (arg: number) => number

// 函数重载合并
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends 
    ((k: infer I) => void) ? I : never;

type OverloadUnion = ((a: string) => void) | ((a: number) => void);
type MergedOverload = UnionToIntersection<OverloadUnion>;
// ((a: string) => void) & ((a: number) => void)
```

## 🎯 实际应用场景

### 表单验证类型

```typescript
// 表单字段验证规则
type ValidationRule<T> = {
    required?: boolean;
    min?: T extends string ? number : T extends number ? number : never;
    max?: T extends string ? number : T extends number ? number : never;
    pattern?: T extends string ? RegExp : never;
    custom?: (value: T) => boolean | string;
};

type FormSchema<T> = {
    [K in keyof T]: ValidationRule<T[K]>;
};

interface UserForm {
    name: string;
    age: number;
    email: string;
}

type UserFormSchema = FormSchema<UserForm>;
// {
//     name: ValidationRule<string>;
//     age: ValidationRule<number>;
//     email: ValidationRule<string>;
// }

// 表单错误类型
type FormErrors<T> = {
    [K in keyof T]?: string[];
};

type UserFormErrors = FormErrors<UserForm>;
// {
//     name?: string[];
//     age?: string[];
//     email?: string[];
// }
```

### API类型生成

```typescript
// REST API端点类型生成
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiEndpoint<Path extends string, Method extends HttpMethod, Body = never> = {
    path: Path;
    method: Method;
    body: Body extends never ? undefined : Body;
};

type UserEndpoints = 
    | ApiEndpoint<"/users", "GET">
    | ApiEndpoint<"/users", "POST", { name: string; email: string }>
    | ApiEndpoint<"/users/:id", "GET">
    | ApiEndpoint<"/users/:id", "PUT", Partial<{ name: string; email: string }>>
    | ApiEndpoint<"/users/:id", "DELETE">;

// 根据端点生成客户端方法
type ApiClient<T extends ApiEndpoint<any, any, any>> = {
    [K in T as `${Lowercase<K["method"]>}${Capitalize<string>}`]: 
        K["body"] extends never 
            ? (path: K["path"]) => Promise<any>
            : (path: K["path"], body: K["body"]) => Promise<any>;
};

type UserApiClient = ApiClient<UserEndpoints>;
// 生成对应的客户端方法类型
```

## 📚 总结

TypeScript的高级类型系统为我们提供了强大的类型操作能力：

### 🎯 核心特性

- **条件类型**：根据类型条件进行类型选择和推断
- **映射类型**：对对象类型进行批量操作和转换
- **模板字面量**：在类型层面进行字符串操作
- **类型推断**：通过infer关键字提取和推断类型信息

### 💡 最佳实践

1. **渐进式学习**：从简单的条件类型开始，逐步掌握复杂的类型操作
2. **实用性优先**：不要为了炫技而过度使用复杂类型，保持代码可读性
3. **性能考虑**：复杂的类型操作可能影响编译性能，适度使用
4. **文档化**：为复杂的类型操作添加注释，提高代码可维护性

### 🚀 实际价值

- **类型安全**：在编译时捕获更多潜在错误
- **代码提示**：提供更精确的IDE智能提示
- **重构支持**：类型系统帮助安全地重构代码
- **API设计**：设计更加类型安全和易用的API接口
