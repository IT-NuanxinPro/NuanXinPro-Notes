# 泛型详解

泛型是TypeScript中最强大的特性之一，它允许我们创建可重用的组件，这些组件可以处理多种类型而不失去类型安全性。本文将深入探讨泛型的概念、语法和实际应用。

## 🔧 泛型基础

### 什么是泛型

**概念解释**：
泛型（Generics）是TypeScript中最强大的特性之一，它允许我们在定义函数、类或接口时使用类型参数，而不是具体的类型。这样可以创建可重用的组件，这些组件可以处理多种类型而不失去类型安全性。

**为什么需要泛型**：
在没有泛型的情况下，我们要么使用any类型（失去类型安全），要么为每种类型创建重复的函数（代码冗余）。泛型完美地解决了这个问题，让我们能够编写既灵活又类型安全的代码。

**泛型的核心价值**：
- **代码复用**：一套代码可以处理多种类型
- **类型安全**：保持强类型检查，避免运行时错误
- **性能优化**：相比any类型，泛型不会丢失类型信息
- **开发体验**：提供完整的IDE支持和智能提示

```typescript
// 没有泛型的问题
function identityNumber(arg: number): number {
    return arg;
}

function identityString(arg: string): string {
    return arg;
}

function identityAny(arg: any): any {
    return arg; // 失去了类型信息
}

// 使用泛型解决问题
function identity<T>(arg: T): T {
    return arg;
}

// 使用时指定类型
let output1 = identity<string>("myString");
let output2 = identity<number>(100);

// 类型推断
let output3 = identity("myString"); // TypeScript自动推断为string
let output4 = identity(100);        // TypeScript自动推断为number
```

**关键理解**：
- **类型参数T**：T是一个类型变量，代表任意类型，在使用时会被具体类型替换
- **类型推断**：TypeScript能够根据传入的参数自动推断类型，无需显式指定
- **类型安全**：与any不同，泛型保持了输入和输出类型的一致性
- **灵活性与安全性的平衡**：既能处理多种类型，又不失去类型检查的优势

### 泛型函数

**深入理解泛型函数**：
泛型函数是泛型最常见的应用形式。通过在函数名后添加类型参数，我们可以创建适用于多种类型的函数，同时保持类型安全。

**设计原则**：
- **类型参数命名**：通常使用T、U、V等单字母，或者更具描述性的名称
- **类型推断优先**：让TypeScript自动推断类型，减少冗余的类型注解
- **约束适当**：在需要时添加类型约束，确保类型参数满足特定条件

```typescript
// 基础泛型函数
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

let swapped = swap(["hello", 42]); // 类型为[number, string]

// 泛型函数类型
interface GenericIdentityFn {
    <T>(arg: T): T;
}

// 或者将泛型参数提升到接口级别
interface GenericIdentityFn2<T> {
    (arg: T): T;
}

let myIdentity: GenericIdentityFn = identity;
let myIdentity2: GenericIdentityFn2<number> = identity;

// 泛型箭头函数
const genericArrowFunction = <T>(arg: T): T => {
    return arg;
};

// 在JSX中需要添加逗号避免歧义
const genericArrowFunctionJSX = <T,>(arg: T): T => {
    return arg;
};
```

**泛型函数的实际应用**：
- **工具函数**：如数组操作、对象转换等通用工具函数
- **API封装**：处理不同类型的API响应数据
- **事件处理**：类型安全的事件处理器定义
- **数据转换**：在保持类型安全的前提下进行数据格式转换

### 泛型类

**概念解释**：
泛型类允许我们创建可以处理多种类型的类，同时保持类型安全。这在创建数据结构、容器类、工具类等场景中特别有用。

**泛型类的优势**：
- **类型一致性**：确保类的所有方法都使用相同的类型参数
- **实例化灵活性**：可以为不同的类型创建不同的实例
- **方法链式调用**：支持类型安全的方法链式调用
- **继承友好**：泛型类可以被继承，类型参数可以传递给子类

```typescript
// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
    
    constructor(zeroValue: T, addFn: (x: T, y: T) => T) {
        this.zeroValue = zeroValue;
        this.add = addFn;
    }
}

// 数字版本
let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
console.log(myGenericNumber.add(5, 10)); // 15

// 字符串版本
let myGenericString = new GenericNumber<string>("", (x, y) => x + y);
console.log(myGenericString.add("Hello, ", "World!")); // "Hello, World!"

// 泛型类的实际应用 - 数据容器
class Container<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    get(index: number): T | undefined {
        return this.items[index];
    }
    
    getAll(): T[] {
        return [...this.items];
    }
    
    filter(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }
    
    map<U>(mapper: (item: T) => U): U[] {
        return this.items.map(mapper);
    }
}

// 使用示例
const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);
numberContainer.add(3);

const evenNumbers = numberContainer.filter(n => n % 2 === 0);
const doubled = numberContainer.map(n => n * 2);
```

**泛型类的实际价值**：
- **数据容器**：如上面的Container类，可以存储任意类型的数据
- **状态管理**：创建类型安全的状态管理类
- **工具类库**：构建可重用的工具类，如缓存、队列、栈等
- **设计模式实现**：实现观察者模式、工厂模式等设计模式时保持类型安全

## 🎯 泛型约束

**概念解释**：
泛型约束（Generic Constraints）允许我们限制泛型参数必须满足某些条件。这样可以在泛型函数或类中安全地访问类型参数的特定属性或方法。

**为什么需要约束**：
- **安全访问属性**：确保类型参数具有我们需要的属性或方法
- **更精确的类型检查**：提供更严格的类型验证
- **更好的IDE支持**：在约束范围内提供准确的智能提示
- **表达设计意图**：明确函数或类对类型参数的要求

### 基础约束

**约束语法说明**：
使用`extends`关键字来定义泛型约束，确保类型参数满足特定的接口或类型要求。

```typescript
// 约束泛型必须有length属性
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // 现在可以访问length属性
    return arg;
}

// 使用示例
loggingIdentity("hello");           // 字符串有length属性
loggingIdentity([1, 2, 3]);         // 数组有length属性
loggingIdentity({ length: 10, value: 3 }); // 对象有length属性
// loggingIdentity(3); // 错误：number没有length属性

// 多重约束
interface Serializable {
    serialize(): string;
}

interface Timestamped {
    timestamp: number;
}

function processData<T extends Serializable & Timestamped>(data: T): string {
    return `${data.timestamp}: ${data.serialize()}`;
}
```

### 在泛型约束中使用类型参数

```typescript
// 使用keyof约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let person = { name: "John", age: 30, email: "john@example.com" };

let name = getProperty(person, "name");   // 类型为string
let age = getProperty(person, "age");     // 类型为number
// let invalid = getProperty(person, "invalid"); // 错误：参数不存在

// 更复杂的约束示例
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
        result[key] = obj[key];
    });
    return result;
}

let picked = pick(person, ["name", "age"]); // 类型为{ name: string; age: number; }
```

### 条件约束

```typescript
// 条件类型约束
type NonNullable<T> = T extends null | undefined ? never : T;

type Example1 = NonNullable<string | null>; // string
type Example2 = NonNullable<number | undefined>; // number

// 更复杂的条件约束
type Flatten<T> = T extends (infer U)[] ? U : T;

type FlatString = Flatten<string[]>; // string
type FlatNumber = Flatten<number>;   // number

// 实际应用：Promise解包
type Awaited<T> = T extends Promise<infer U> ? U : T;

type AwaitedString = Awaited<Promise<string>>; // string
type AwaitedNumber = Awaited<number>;          // number
```

**条件约束的实际应用**：
- **类型过滤**：从联合类型中过滤掉不需要的类型
- **类型转换**：根据条件将一种类型转换为另一种类型
- **Promise处理**：自动解包Promise类型，简化异步代码的类型定义
- **数组扁平化**：处理嵌套数组类型，提取内部元素类型

## 🏗️ 泛型接口

**概念解释**：
泛型接口是定义可重用API契约的强大工具。它们允许我们创建灵活的接口定义，这些接口可以适用于多种类型，同时保持类型安全。

**泛型接口的设计价值**：
- **API标准化**：为不同类型的数据定义统一的操作接口
- **代码复用**：避免为每种类型重复定义相似的接口
- **类型安全**：确保实现类遵循正确的类型约定
- **扩展性**：便于后续添加新的类型支持

### 基础泛型接口

**Repository模式应用**：
Repository模式是一种常见的设计模式，用于封装数据访问逻辑。通过泛型接口，我们可以为不同的实体类型提供统一的数据访问接口。

```typescript
// 泛型接口
interface Repository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(entity: Omit<T, 'id'>): Promise<T>;
    update(id: string, entity: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}

// 实现泛型接口
interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

class UserRepository implements Repository<User> {
    private users: User[] = [];
    
    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }
    
    async findAll(): Promise<User[]> {
        return [...this.users];
    }
    
    async create(userData: Omit<User, 'id'>): Promise<User> {
        const user: User = {
            id: Math.random().toString(36),
            ...userData
        };
        this.users.push(user);
        return user;
    }
    
    async update(id: string, userData: Partial<User>): Promise<User> {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) throw new Error('User not found');
        
        this.users[index] = { ...this.users[index], ...userData };
        return this.users[index];
    }
    
    async delete(id: string): Promise<void> {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) throw new Error('User not found');
        
        this.users.splice(index, 1);
    }
}
```

### 高级泛型接口

```typescript
// 事件系统泛型接口
interface EventMap {
    click: { x: number; y: number };
    keydown: { key: string; ctrlKey: boolean };
    resize: { width: number; height: number };
}

interface EventEmitter<T extends Record<string, any>> {
    on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
    off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
    emit<K extends keyof T>(event: K, data: T[K]): void;
}

class MyEventEmitter implements EventEmitter<EventMap> {
    private listeners: {
        [K in keyof EventMap]?: Array<(data: EventMap[K]) => void>;
    } = {};
    
    on<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(listener);
    }
    
    off<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            const index = eventListeners.indexOf(listener);
            if (index > -1) {
                eventListeners.splice(index, 1);
            }
        }
    }
    
    emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.forEach(listener => listener(data));
        }
    }
}

// 使用示例
const emitter = new MyEventEmitter();

emitter.on('click', (data) => {
    console.log(`Clicked at ${data.x}, ${data.y}`); // data类型安全
});

emitter.on('keydown', (data) => {
    console.log(`Key pressed: ${data.key}`); // data类型安全
});

emitter.emit('click', { x: 100, y: 200 });
emitter.emit('keydown', { key: 'Enter', ctrlKey: false });
```

## 🎭 高级泛型应用

### 工厂模式与泛型

```typescript
// 泛型工厂
interface Constructable<T = {}> {
    new (...args: any[]): T;
}

function createInstance<T>(ctor: Constructable<T>, ...args: any[]): T {
    return new ctor(...args);
}

class Car {
    constructor(public brand: string, public model: string) {}
}

class Person {
    constructor(public name: string, public age: number) {}
}

// 使用工厂创建实例
const car = createInstance(Car, "Toyota", "Camry");     // 类型为Car
const person = createInstance(Person, "John", 30);      // 类型为Person

// 更高级的工厂模式
abstract class Animal {
    abstract makeSound(): string;
}

class Dog extends Animal {
    makeSound(): string {
        return "Woof!";
    }
}

class Cat extends Animal {
    makeSound(): string {
        return "Meow!";
    }
}

type AnimalConstructor<T extends Animal> = new () => T;

class AnimalFactory {
    static create<T extends Animal>(ctor: AnimalConstructor<T>): T {
        return new ctor();
    }
}

const dog = AnimalFactory.create(Dog); // 类型为Dog
const cat = AnimalFactory.create(Cat); // 类型为Cat
```

### 泛型装饰器

```typescript
// 泛型装饰器
function Memoize<T extends (...args: any[]) => any>(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
    const method = descriptor.value!;
    const cache = new Map<string, ReturnType<T>>();
    
    descriptor.value = ((...args: Parameters<T>) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        
        const result = method.apply(target, args);
        cache.set(key, result);
        return result;
    }) as T;
}

class Calculator {
    @Memoize
    fibonacci(n: number): number {
        if (n <= 1) return n;
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }
    
    @Memoize
    factorial(n: number): number {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }
}

const calc = new Calculator();
console.log(calc.fibonacci(40)); // 第一次计算
console.log(calc.fibonacci(40)); // 从缓存获取
```

### 泛型与Promise

```typescript
// 泛型Promise工具
class AsyncResult<T> {
    constructor(private promise: Promise<T>) {}
    
    async map<U>(mapper: (value: T) => U): Promise<AsyncResult<U>> {
        const value = await this.promise;
        return new AsyncResult(Promise.resolve(mapper(value)));
    }
    
    async flatMap<U>(mapper: (value: T) => Promise<U>): Promise<AsyncResult<U>> {
        const value = await this.promise;
        return new AsyncResult(mapper(value));
    }
    
    async filter(predicate: (value: T) => boolean): Promise<AsyncResult<T | null>> {
        const value = await this.promise;
        return new AsyncResult(Promise.resolve(predicate(value) ? value : null));
    }
    
    async unwrap(): Promise<T> {
        return this.promise;
    }
}

// 使用示例
async function example() {
    const result = new AsyncResult(Promise.resolve(10));
    
    const doubled = await result
        .map(x => x * 2)
        .then(r => r.map(x => x + 1))
        .then(r => r.unwrap());
    
    console.log(doubled); // 21
}

// 泛型Promise组合器
function all<T extends readonly unknown[] | []>(
    promises: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
    return Promise.all(promises) as any;
}

// 使用示例
async function combinePromises() {
    const [str, num, bool] = await all([
        Promise.resolve("hello"),
        Promise.resolve(42),
        Promise.resolve(true)
    ]);
    
    // str: string, num: number, bool: boolean
    console.log(str, num, bool);
}
```

**高级泛型应用的价值**：
- **函数式编程支持**：为函数式编程模式提供类型安全保障
- **异步编程优化**：简化Promise和异步操作的类型定义
- **设计模式实现**：在实现复杂设计模式时保持类型安全
- **库和框架开发**：为第三方库提供强大的类型支持

## 📚 总结

泛型是TypeScript中最强大的特性之一，它为类型系统带来了极大的灵活性和可重用性，是现代TypeScript开发的核心技能：

### 🎯 核心概念

- **类型参数化**：允许在定义时不指定具体类型，在使用时再确定，实现真正的代码复用
- **类型安全**：保持强类型检查的同时提供灵活性，避免any类型的滥用
- **代码重用**：一套代码可以处理多种类型，大幅减少重复代码
- **约束机制**：通过extends关键字限制泛型的范围，确保类型参数满足特定要求

### 💡 最佳实践

1. **渐进式学习**：从简单的泛型函数开始，逐步掌握复杂的泛型应用
2. **合理命名**：使用有意义的泛型参数名，如`T`表示Type，`K`表示Key，`V`表示Value
3. **适当约束**：使用extends添加必要的约束，提高类型安全性和代码可读性
4. **避免过度泛型化**：不要为了泛型而泛型，保持代码的简洁性和可维护性
5. **利用类型推断**：让TypeScript自动推断类型，减少冗余的类型注解
6. **文档化复杂泛型**：为复杂的泛型类型添加注释，提高代码可读性

### 🚀 实际价值

- **API设计**：创建灵活且类型安全的API接口，提升开发体验
- **工具函数**：编写可重用的工具函数和类，提高开发效率
- **框架开发**：构建类型安全的框架和库，为用户提供更好的类型支持
- **业务逻辑**：在保持类型安全的前提下提高代码复用性，降低维护成本
- **团队协作**：通过泛型约束明确API契约，减少团队沟通成本

掌握泛型是成为TypeScript高手的必经之路，它不仅能提高代码质量，还能让你设计出更优雅、更灵活的类型系统。在实际项目中，泛型的合理运用往往是区分初级和高级TypeScript开发者的重要标志。
