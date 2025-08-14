# 基础类型与接口

TypeScript的类型系统是其核心特性，理解基础类型和接口的使用是掌握TypeScript的第一步。本文将详细介绍TypeScript的基础类型、接口定义以及interface与type的区别。

## 🏗️ 基础类型

### 原始类型

**概念解释**：
TypeScript的原始类型是JavaScript原始类型的类型化版本。在JavaScript中，我们无法在编译时确定变量的类型，这经常导致运行时错误。TypeScript通过类型注解解决了这个问题，让我们能够在开发阶段就发现类型相关的错误。

**为什么需要类型注解**：
- **编译时检查**：在代码运行前就能发现类型错误
- **IDE支持**：提供智能提示、自动补全和重构功能
- **代码文档化**：类型本身就是最好的文档
- **团队协作**：统一的类型约定减少沟通成本

```typescript
// 基础原始类型
let isDone: boolean = false;
let count: number = 42;
let name: string = "TypeScript";
let u: undefined = undefined;
let n: null = null;

// ES2020新增
let bigNumber: bigint = 100n;
let uniqueId: symbol = Symbol("id");

// 数组类型
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// 元组类型
let tuple: [string, number] = ["hello", 10];
let namedTuple: [name: string, age: number] = ["John", 30];

// 枚举类型
enum Color {
    Red,
    Green,
    Blue
}

enum Status {
    Pending = "pending",
    Success = "success",
    Error = "error"
}

let currentColor: Color = Color.Red;
let currentStatus: Status = Status.Pending;
```

**实际应用场景**：
- **数组类型**：用于存储同类型的数据集合，如用户列表、商品列表
- **元组类型**：用于表示固定长度和类型的数组，如坐标点、键值对
- **枚举类型**：用于定义一组命名常量，如状态码、主题配置、用户角色等
- **字符串枚举**：特别适合API响应状态、配置选项等需要可读性的场景

### 特殊类型

**概念解释**：
TypeScript提供了几种特殊类型来处理JavaScript中的边界情况。这些类型帮助我们更精确地描述变量可能的值，并在类型系统中表达"未知"、"无返回值"、"永不返回"等概念。

**设计理念**：
- **any**：完全关闭类型检查，应该尽量避免使用
- **unknown**：类型安全的any，使用前必须进行类型检查
- **void**：表示函数没有返回值
- **never**：表示永远不会发生的类型，用于穷尽性检查

```typescript
// any类型 - 关闭类型检查
let anything: any = 42;
anything = "hello";
anything = true;

// unknown类型 - 类型安全的any
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

// 使用unknown需要类型检查
if (typeof userInput === "string") {
    userName = userInput; // 现在TypeScript知道userInput是string
}

// void类型 - 函数无返回值
function logMessage(message: string): void {
    console.log(message);
}

// never类型 - 永远不会返回
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // 无限循环
    }
}

// object类型
let obj: object = { name: "TypeScript" };
let betterObj: { name: string; version: number } = {
    name: "TypeScript",
    version: 4.9
};
```

**关键理解**：
- **any vs unknown**：any会关闭所有类型检查，而unknown要求使用前进行类型检查，更加安全
- **void的使用场景**：主要用于函数返回类型，表示函数执行某些操作但不返回值
- **never的实际价值**：用于穷尽性检查，确保所有可能的情况都被处理
- **类型安全原则**：优先使用unknown而不是any，优先使用具体的对象类型而不是object

### 联合类型和交叉类型

**概念解释**：
联合类型和交叉类型是TypeScript类型系统的核心特性，它们允许我们组合现有类型来创建新的类型。这种组合能力让我们能够精确地描述复杂的数据结构和业务逻辑。

**设计思想**：
- **联合类型（|）**：表示"或"的关系，值可以是多种类型中的任意一种
- **交叉类型（&）**：表示"且"的关系，值必须同时满足多种类型的要求
- **字面量类型**：将具体的值作为类型，提供更精确的类型约束

```typescript
// 联合类型 - 可以是多种类型之一
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42; // 也可以是数字

// 字面量类型
type Theme = "light" | "dark";
type Size = "small" | "medium" | "large";

let currentTheme: Theme = "light";
let buttonSize: Size = "medium";

// 交叉类型 - 同时具有多种类型的特性
interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeId: string;
    department: string;
}

type PersonEmployee = Person & Employee;

let worker: PersonEmployee = {
    name: "John",
    age: 30,
    employeeId: "E001",
    department: "Engineering"
};
```

**实际应用价值**：
- **联合类型的典型场景**：API响应状态、用户输入验证、配置选项等
- **字面量类型的优势**：提供比字符串更精确的类型约束，避免拼写错误
- **交叉类型的使用场景**：组合多个接口、扩展现有类型、实现多重继承效果
- **类型组合的威力**：通过简单的类型组合，可以表达复杂的业务逻辑和数据关系

## 🔧 接口定义

**概念解释**：
接口（Interface）是TypeScript中定义对象结构的主要方式。它描述了对象应该具有哪些属性和方法，以及这些属性和方法的类型。接口不会生成任何JavaScript代码，它纯粹是为了类型检查而存在的。

**接口的核心价值**：
- **契约定义**：明确规定对象必须遵循的结构
- **代码文档**：接口本身就是最好的API文档
- **类型安全**：确保对象使用时的类型正确性
- **开发体验**：提供智能提示和错误检查

### 基础接口

**深入理解接口特性**：
接口中的每个特性都有其特定的用途和最佳实践。理解这些特性的设计意图，能帮助我们写出更健壮的代码。

**关键特性说明**：
- **可选属性（?）**：表示属性可能存在也可能不存在，适用于配置对象、API参数等
- **只读属性（readonly）**：防止属性被意外修改，适用于ID、时间戳等不应变更的数据
- **索引签名**：允许对象具有任意数量的属性，适用于动态属性的场景

```typescript
// 基础接口定义
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // 可选属性
    readonly createdAt: Date; // 只读属性
}

// 使用接口
const user: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    createdAt: new Date()
};

// user.createdAt = new Date(); // 错误：只读属性不能修改

// 索引签名
interface StringDictionary {
    [key: string]: string;
}

interface NumberDictionary {
    [key: string]: number;
    length: number; // 可以有具体的属性
}

const dict: StringDictionary = {
    name: "TypeScript",
    version: "4.9" // 所有值都必须是string
};
```

**设计模式应用**：
- **可选属性的最佳实践**：用于表示可能缺失的数据，如用户的可选信息
- **只读属性的安全性**：防止关键数据被意外修改，提高代码的可靠性
- **索引签名的灵活性**：处理动态属性，如配置对象、国际化文本等
- **类型约束的平衡**：在类型安全和灵活性之间找到合适的平衡点

### 函数接口

**概念解释**：
函数接口用于描述函数的类型签名，包括参数类型和返回值类型。这在回调函数、事件处理器、高阶函数等场景中特别有用。

**函数类型的重要性**：
- **回调函数约束**：确保传入的回调函数具有正确的签名
- **事件处理器**：定义事件处理函数的标准格式
- **高阶函数**：为接受或返回函数的函数提供类型安全
- **API设计**：明确函数接口的输入输出规范

```typescript
// 函数类型接口
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(source: string, subString: string): boolean {
    return source.search(subString) > -1;
};

// 或者使用箭头函数
let mySearch2: SearchFunc = (src, sub) => src.indexOf(sub) > -1;

// 方法签名
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply?(a: number, b: number): number; // 可选方法
}

class BasicCalculator implements Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
    
    subtract(a: number, b: number): number {
        return a - b;
    }
}
```

### 接口继承

```typescript
// 接口继承
interface Animal {
    name: string;
    age: number;
}

interface Dog extends Animal {
    breed: string;
    bark(): void;
}

interface Cat extends Animal {
    color: string;
    meow(): void;
}

// 多重继承
interface Pet {
    owner: string;
}

interface DomesticDog extends Dog, Pet {
    isVaccinated: boolean;
}

const myDog: DomesticDog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever",
    owner: "John",
    isVaccinated: true,
    bark() {
        console.log("Woof!");
    }
};
```

**接口继承的实际价值**：
- **代码复用**：避免重复定义相同的属性和方法
- **层次结构**：清晰地表达类型之间的关系
- **多重继承**：组合多个接口的特性，实现复杂的类型定义
- **扩展性**：便于后续添加新的属性和方法

## 🆚 Interface vs Type

**核心理解**：
Interface和Type是TypeScript中定义类型的两种主要方式。虽然它们在很多场景下可以互换使用，但各自有其独特的特性和最佳使用场景。理解它们的区别对于写出高质量的TypeScript代码至关重要。

**选择原则概述**：
- **Interface**：优先用于定义对象结构、API契约、类的实现规范
- **Type**：优先用于联合类型、复杂类型操作、函数类型定义

### 相同点

**共同能力说明**：
在大多数基础场景下，Interface和Type可以互换使用。它们都能描述对象结构、被类实现、被其他类型扩展。

```typescript
// 都可以描述对象结构
interface UserInterface {
    name: string;
    age: number;
}

type UserType = {
    name: string;
    age: number;
};

// 都可以被实现
class UserClass implements UserInterface {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// 都可以被继承/扩展
interface ExtendedUserInterface extends UserInterface {
    email: string;
}

type ExtendedUserType = UserType & {
    email: string;
};
```

**相同点的实际意义**：
这些共同特性说明了Interface和Type在基础使用上的一致性，这也是为什么很多开发者在简单场景下可以随意选择的原因。但理解它们的不同点才是掌握TypeScript类型系统的关键。

### 不同点和选择原则

**核心差异理解**：
Interface和Type的差异主要体现在高级特性上。Interface更适合面向对象的设计模式，而Type更适合函数式编程和复杂类型操作。

**关键差异点**：
1. **声明合并**：Interface支持，Type不支持
2. **联合类型**：Type支持，Interface不支持
3. **映射类型**：Type支持，Interface不支持
4. **条件类型**：Type支持，Interface不支持

```typescript
// 1. Interface可以声明合并，Type不可以
interface Window {
    title: string;
}

interface Window {
    ts: string;
}

// 现在Window同时有title和ts属性

// 2. Type可以使用联合类型，Interface不可以
type StringOrNumber = string | number;
type Theme = "light" | "dark";

// 3. Type可以使用映射类型
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 4. Type可以使用条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

// 5. Interface更适合定义对象结构
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

// 6. Type更适合复杂类型操作
type EventHandler<T> = (event: T) => void;
type EventMap = {
    click: MouseEvent;
    keydown: KeyboardEvent;
    scroll: Event;
};

type EventHandlers = {
    [K in keyof EventMap]: EventHandler<EventMap[K]>;
};
```

**差异的实际影响**：
- **声明合并的价值**：允许在不同文件中扩展同一个接口，特别适合库的类型定义
- **联合类型的重要性**：Type能够表达"或"的关系，这在状态管理、API响应等场景中非常有用
- **映射类型的威力**：Type能够基于现有类型生成新类型，实现高级的类型转换
- **条件类型的灵活性**：Type能够根据条件选择不同的类型，实现类型级别的逻辑判断

### 选择原则

**实用决策指南**：
选择Interface还是Type不是随意的，而应该基于具体的使用场景和团队约定。以下是经过实践验证的选择原则。

```typescript
// ✅ 使用Interface的场景
// 1. 定义对象结构，特别是公共API
interface PublicAPI {
    version: string;
    methods: {
        get(id: string): Promise<any>;
        post(data: any): Promise<any>;
    };
}

// 2. 需要声明合并的场景
interface PluginConfig {
    name: string;
}

// 在其他地方扩展
interface PluginConfig {
    version: string;
}

// 3. 类的契约定义
interface Drawable {
    draw(): void;
}

class Circle implements Drawable {
    draw() {
        console.log("Drawing a circle");
    }
}

// ✅ 使用Type的场景
// 1. 联合类型
type Status = "loading" | "success" | "error";

// 2. 复杂类型操作
type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// 3. 函数类型
type EventListener = (event: Event) => void;

// 4. 条件类型
type ApiResult<T> = T extends string 
    ? { message: T } 
    : { data: T };
```

**选择原则总结**：
- **优先使用Interface**：当定义对象结构、需要继承扩展、或者可能需要声明合并时
- **优先使用Type**：当需要联合类型、条件类型、映射类型等高级特性时
- **团队一致性**：在同一个项目中保持一致的选择标准
- **渐进式采用**：可以先用Interface，需要高级特性时再改为Type

## 🎯 实际应用场景

### API响应类型定义

**应用场景说明**：
API响应类型定义是TypeScript在实际项目中最常见的应用场景之一。通过合理的类型设计，我们可以确保前后端数据交互的类型安全，减少运行时错误。

**设计思路**：
- **统一响应格式**：定义标准的API响应结构
- **泛型支持**：支持不同类型的数据载荷
- **错误处理**：明确区分成功和失败的响应
- **类型守卫**：运行时的类型检查和类型收窄

```typescript
// 定义API响应结构
interface BaseResponse {
    success: boolean;
    message: string;
    timestamp: number;
}

interface DataResponse<T> extends BaseResponse {
    data: T;
}

interface ErrorResponse extends BaseResponse {
    error: {
        code: string;
        details?: string;
    };
}

type ApiResponse<T> = DataResponse<T> | ErrorResponse;

// 使用示例
interface User {
    id: number;
    name: string;
    email: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}

// 类型守卫
function isDataResponse<T>(response: ApiResponse<T>): response is DataResponse<T> {
    return response.success && 'data' in response;
}

// 使用
fetchUser(1).then(response => {
    if (isDataResponse(response)) {
        console.log(response.data.name); // 类型安全
    } else {
        console.error(response.error.code);
    }
});
```

### 配置对象类型

**应用场景说明**：
配置对象是应用程序中非常常见的模式，用于管理应用的各种设置和参数。通过TypeScript的类型系统，我们可以确保配置的完整性和正确性。

**设计原则**：
- **层次化结构**：将相关配置分组，便于管理和维护
- **类型安全**：确保配置值的类型正确
- **可选配置**：区分必需和可选的配置项
- **环境区分**：支持不同环境的配置差异

```typescript
// 应用配置类型
interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
}

interface ServerConfig {
    port: number;
    host?: string;
    cors?: {
        origin: string | string[];
        credentials?: boolean;
    };
}

interface AppConfig {
    env: "development" | "production" | "test";
    database: DatabaseConfig;
    server: ServerConfig;
    logging: {
        level: "debug" | "info" | "warn" | "error";
        file?: string;
    };
}

// 配置验证函数
function validateConfig(config: Partial<AppConfig>): config is AppConfig {
    return !!(
        config.env &&
        config.database &&
        config.server &&
        config.logging
    );
}

// 使用示例
const config: AppConfig = {
    env: "development",
    database: {
        host: "localhost",
        port: 5432,
        username: "admin",
        password: "password",
        database: "myapp"
    },
    server: {
        port: 3000,
        cors: {
            origin: ["http://localhost:3000"],
            credentials: true
        }
    },
    logging: {
        level: "debug"
    }
};
```

**配置类型设计的价值**：
- **开发时验证**：在编写配置时就能发现错误，避免运行时问题
- **文档化配置**：类型定义清楚地说明了每个配置项的作用和类型
- **重构安全**：修改配置结构时，TypeScript会提示所有需要更新的地方
- **团队协作**：统一的配置类型定义减少了团队成员之间的沟通成本

## 📚 总结

TypeScript的基础类型系统为JavaScript提供了强大的类型安全保障，是现代前端开发的重要基础：

### 🎯 核心要点

- **类型注解**：为变量、函数参数和返回值添加类型信息，是TypeScript的基础
- **接口定义**：描述对象的结构和契约，实现代码的自文档化
- **类型组合**：通过联合类型和交叉类型创建复杂类型，表达丰富的业务逻辑
- **Interface vs Type**：根据使用场景选择合适的类型定义方式，发挥各自优势

### 💡 最佳实践

1. **渐进式采用**：从简单的类型注解开始，逐步引入复杂的类型特性
2. **优先使用Interface**：定义对象结构时优先考虑interface，保持代码的一致性
3. **Type用于复杂操作**：联合类型、条件类型等复杂场景使用type，发挥其灵活性
4. **合理使用可选属性**：避免过度使用可选属性，保持类型的严格性和可预测性
5. **善用类型守卫**：在运行时验证类型，确保类型安全和代码健壮性

### 🚀 实际价值

- **编译时错误检查**：在开发阶段发现类型错误，大幅减少运行时bug
- **更好的IDE支持**：智能提示、自动补全、重构、导航等功能显著提升开发效率
- **代码文档化**：类型定义本身就是最好的文档，减少额外的文档维护成本
- **团队协作**：统一的类型定义提高代码可维护性，降低团队沟通成本
- **重构信心**：类型系统提供的安全网让大规模重构变得可行和安全
