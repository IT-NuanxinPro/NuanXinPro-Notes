# 数据类型与转换

JavaScript的数据类型是编程的基础，理解原始类型和引用类型的区别，掌握类型检测和转换规则，以及深浅拷贝的实现，是JavaScript开发的核心技能。

## 🔢 原始类型（Primitive Types）

### 七种原始类型

JavaScript有七种原始数据类型，它们是不可变的，存储在栈内存中。理解每种类型的特点和使用场景是JavaScript编程的基础。

**原始类型的特点：**

- **不可变性**：原始值本身不能被改变
- **按值传递**：赋值时复制值，而不是引用
- **栈存储**：存储在栈内存中，访问速度快

```javascript
// 1. Number - 数字类型
// JavaScript中所有数字都是64位浮点数
let integer = 42;
let float = 3.14;
let negative = -10;
let infinity = Infinity;
let notANumber = NaN;

console.log(typeof integer);  // "number"
console.log(typeof NaN);      // "number"

// 2. String - 字符串类型
// 用于表示文本数据，支持多种定义方式
let singleQuote = 'Hello';
let doubleQuote = "World";
let templateLiteral = `Hello ${singleQuote}`;
let emptyString = '';

console.log(typeof singleQuote); // "string"

// 3. Boolean - 布尔类型
// 只有两个值：true和false
let isTrue = true;
let isFalse = false;

console.log(typeof isTrue); // "boolean"

// 4. undefined - 未定义
// 表示变量已声明但未赋值
let undefinedVar;
let explicitUndefined = undefined;

console.log(typeof undefinedVar); // "undefined"

// 5. null - 空值
// 表示空对象指针，常用于初始化对象变量
let nullValue = null;

console.log(typeof nullValue); // "object" (历史遗留问题)

// 6. Symbol - 符号类型（ES6+）
// 创建唯一标识符，主要用于对象属性键
let symbol1 = Symbol();
let symbol2 = Symbol('description');
let symbol3 = Symbol('description');

console.log(typeof symbol1);     // "symbol"
console.log(symbol2 === symbol3); // false (每个Symbol都是唯一的)

// 7. BigInt - 大整数类型（ES2020+）
let bigInt1 = 123456789012345678901234567890n;
let bigInt2 = BigInt('123456789012345678901234567890');

console.log(typeof bigInt1); // "bigint"
```

### 原始类型特点

```javascript
// 原始类型是不可变的
let str = 'hello';
str[0] = 'H'; // 无效操作
console.log(str); // 'hello'

// 原始类型按值传递
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (a不受影响)

// 原始类型的包装对象
let primitive = 'hello';
let wrapper = new String('hello');

console.log(typeof primitive); // "string"
console.log(typeof wrapper);   // "object"
console.log(primitive === wrapper); // false
console.log(primitive == wrapper);  // true (类型转换)
```

## 📦 引用类型（Reference Types）

### 常见引用类型

```javascript
// Object - 对象
let obj = {
    name: 'John',
    age: 30
};

// Array - 数组
let arr = [1, 2, 3, 4, 5];

// Function - 函数
function greet(name) {
    return `Hello, ${name}!`;
}

// Date - 日期
let date = new Date();

// RegExp - 正则表达式
let regex = /pattern/g;

// Map - 映射
let map = new Map();
map.set('key', 'value');

// Set - 集合
let set = new Set([1, 2, 3]);

console.log(typeof obj);    // "object"
console.log(typeof arr);    // "object"
console.log(typeof greet);  // "function"
console.log(typeof date);   // "object"
console.log(typeof regex);  // "object"
console.log(typeof map);    // "object"
console.log(typeof set);    // "object"
```

### 引用类型特点

```javascript
// 引用类型按引用传递
let obj1 = { name: 'John' };
let obj2 = obj1;
obj2.name = 'Jane';
console.log(obj1.name); // 'Jane' (obj1也被修改了)

// 引用类型比较的是引用
let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
let arr3 = arr1;

console.log(arr1 === arr2); // false (不同的引用)
console.log(arr1 === arr3); // true (相同的引用)

// 引用类型是可变的
let person = { name: 'John' };
person.age = 30;        // 添加属性
person.name = 'Jane';   // 修改属性
delete person.age;      // 删除属性
console.log(person);    // { name: 'Jane' }
```

## 🔍 类型检测

### typeof操作符

```javascript
// typeof的使用
console.log(typeof 42);          // "number"
console.log(typeof 'hello');     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (历史bug)
console.log(typeof Symbol());    // "symbol"
console.log(typeof 123n);        // "bigint"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"

// typeof的局限性
console.log(typeof null);        // "object" (不准确)
console.log(typeof []);          // "object" (无法区分数组)
console.log(typeof new Date());  // "object" (无法区分日期)
```

### instanceof操作符

```javascript
// instanceof检测对象类型
let arr = [1, 2, 3];
let date = new Date();
let regex = /pattern/;

console.log(arr instanceof Array);   // true
console.log(date instanceof Date);   // true
console.log(regex instanceof RegExp); // true

// instanceof的原理
function myInstanceof(obj, constructor) {
    let proto = Object.getPrototypeOf(obj);
    while (proto !== null) {
        if (proto === constructor.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

console.log(myInstanceof(arr, Array)); // true
```

### 精确类型检测

```javascript
// Object.prototype.toString方法
function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

console.log(getType(42));           // "number"
console.log(getType('hello'));      // "string"
console.log(getType(true));         // "boolean"
console.log(getType(undefined));    // "undefined"
console.log(getType(null));         // "null"
console.log(getType([]));           // "array"
console.log(getType({}));           // "object"
console.log(getType(new Date()));   // "date"
console.log(getType(/pattern/));    // "regexp"
console.log(getType(function(){})); // "function"

// 类型检测工具函数
const typeUtils = {
    isNumber: (value) => typeof value === 'number' && !isNaN(value),
    isString: (value) => typeof value === 'string',
    isBoolean: (value) => typeof value === 'boolean',
    isUndefined: (value) => typeof value === 'undefined',
    isNull: (value) => value === null,
    isArray: (value) => Array.isArray(value),
    isObject: (value) => getType(value) === 'object',
    isFunction: (value) => typeof value === 'function',
    isDate: (value) => getType(value) === 'date',
    isRegExp: (value) => getType(value) === 'regexp',
    isPrimitive: (value) => {
        const type = typeof value;
        return type !== 'object' && type !== 'function';
    }
};

// 使用示例
console.log(typeUtils.isArray([]));     // true
console.log(typeUtils.isObject({}));    // true
console.log(typeUtils.isNull(null));    // true
```

## 🔄 类型转换

### 隐式类型转换

```javascript
// 字符串转换
console.log(1 + '2');        // "12" (数字转字符串)
console.log('5' + 3);        // "53"
console.log('Hello' + true); // "Hellotrue"

// 数字转换
console.log('5' - 2);        // 3 (字符串转数字)
console.log('10' * '2');     // 20
console.log('15' / '3');     // 5
console.log('5' - true);     // 4 (true转为1)
console.log('5' - false);    // 5 (false转为0)

// 布尔转换
console.log(Boolean(1));     // true
console.log(Boolean(0));     // false
console.log(Boolean(''));    // false
console.log(Boolean('0'));   // true (非空字符串)
console.log(Boolean([]));    // true (空数组也是true)
console.log(Boolean({}));    // true (空对象也是true)

// 复杂的隐式转换
console.log([] + []);        // "" (空字符串)
console.log([] + {});        // "[object Object]"
console.log({} + []);        // "[object Object]"
console.log(true + true);    // 2
console.log(true + false);   // 1
```

### 显式类型转换

```javascript
// 转换为数字
console.log(Number('123'));     // 123
console.log(Number('123.45'));  // 123.45
console.log(Number('123abc'));  // NaN
console.log(Number(true));      // 1
console.log(Number(false));     // 0
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN

console.log(parseInt('123'));     // 123
console.log(parseInt('123.45'));  // 123
console.log(parseInt('123abc'));  // 123
console.log(parseInt('abc123'));  // NaN

console.log(parseFloat('123.45')); // 123.45
console.log(parseFloat('123.45abc')); // 123.45

// 转换为字符串
console.log(String(123));       // "123"
console.log(String(true));      // "true"
console.log(String(null));      // "null"
console.log(String(undefined)); // "undefined"

console.log((123).toString());  // "123"
console.log(true.toString());   // "true"

// 转换为布尔值
console.log(Boolean(1));        // true
console.log(Boolean(0));        // false
console.log(Boolean('hello'));  // true
console.log(Boolean(''));       // false
console.log(Boolean(null));     // false
console.log(Boolean(undefined)); // false

// 使用!!进行布尔转换
console.log(!!1);               // true
console.log(!!'hello');         // true
console.log(!!'');              // false
```

## 📋 深浅拷贝

### 浅拷贝实现

```javascript
// 1. Object.assign()
const original = { a: 1, b: { c: 2 } };
const shallowCopy1 = Object.assign({}, original);

// 2. 扩展运算符
const shallowCopy2 = { ...original };

// 3. 数组的浅拷贝
const arr = [1, 2, { a: 3 }];
const arrCopy1 = [...arr];
const arrCopy2 = arr.slice();
const arrCopy3 = Array.from(arr);

// 浅拷贝的问题
shallowCopy1.b.c = 999;
console.log(original.b.c); // 999 (原对象也被修改了)

// 手动实现浅拷贝
function shallowCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    
    if (Array.isArray(obj)) {
        return [...obj];
    }
    
    const copy = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = obj[key];
        }
    }
    return copy;
}
```

### 深拷贝实现

```javascript
// 1. JSON方法（有局限性）
const original = { a: 1, b: { c: 2 } };
const deepCopy1 = JSON.parse(JSON.stringify(original));

// JSON方法的局限性
const complexObj = {
    date: new Date(),
    func: function() {},
    undefined: undefined,
    symbol: Symbol('test'),
    regex: /pattern/g
};

const jsonCopy = JSON.parse(JSON.stringify(complexObj));
console.log(jsonCopy); // { date: "2024-01-15T10:00:00.000Z" }
// 函数、undefined、Symbol、正则等会丢失

// 2. 递归深拷贝实现
function deepClone(obj, hash = new WeakMap()) {
    // 处理null和非对象类型
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // 处理循环引用
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    
    // 处理Date对象
    if (obj instanceof Date) {
        return new Date(obj);
    }
    
    // 处理RegExp对象
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    
    // 处理数组
    if (Array.isArray(obj)) {
        const cloned = [];
        hash.set(obj, cloned);
        for (let i = 0; i < obj.length; i++) {
            cloned[i] = deepClone(obj[i], hash);
        }
        return cloned;
    }
    
    // 处理普通对象
    const cloned = {};
    hash.set(obj, cloned);
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key], hash);
        }
    }
    
    return cloned;
}

// 测试深拷贝
const testObj = {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'coding'],
    address: {
        city: 'Beijing',
        country: 'China'
    },
    date: new Date(),
    regex: /test/g
};

// 创建循环引用
testObj.self = testObj;

const cloned = deepClone(testObj);
cloned.address.city = 'Shanghai';
console.log(testObj.address.city);  // 'Beijing' (原对象未被修改)
console.log(cloned.address.city);   // 'Shanghai'

// 3. 使用第三方库
// Lodash的深拷贝
// const _ = require('lodash');
// const deepCopy = _.cloneDeep(original);
```

### 性能对比

```javascript
// 性能测试函数
function performanceTest() {
    const testData = {
        numbers: Array.from({ length: 1000 }, (_, i) => i),
        strings: Array.from({ length: 1000 }, (_, i) => `string${i}`),
        nested: {
            level1: {
                level2: {
                    level3: {
                        data: 'deep nested data'
                    }
                }
            }
        }
    };
    
    console.time('JSON深拷贝');
    for (let i = 0; i < 1000; i++) {
        JSON.parse(JSON.stringify(testData));
    }
    console.timeEnd('JSON深拷贝');
    
    console.time('递归深拷贝');
    for (let i = 0; i < 1000; i++) {
        deepClone(testData);
    }
    console.timeEnd('递归深拷贝');
    
    console.time('浅拷贝');
    for (let i = 0; i < 1000; i++) {
        { ...testData };
    }
    console.timeEnd('浅拷贝');
}

// performanceTest();
```

## 🎯 实际应用

### 类型安全的工具函数

```javascript
// 类型安全的数据处理
class TypeSafeUtils {
    static safeGet(obj, path, defaultValue = undefined) {
        if (!this.isObject(obj) || !this.isString(path)) {
            return defaultValue;
        }
        
        const keys = path.split('.');
        let current = obj;
        
        for (let key of keys) {
            if (current === null || current === undefined || !(key in current)) {
                return defaultValue;
            }
            current = current[key];
        }
        
        return current;
    }
    
    static safeSet(obj, path, value) {
        if (!this.isObject(obj) || !this.isString(path)) {
            return false;
        }
        
        const keys = path.split('.');
        let current = obj;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || !this.isObject(current[key])) {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = value;
        return true;
    }
    
    static isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }
    
    static isString(value) {
        return typeof value === 'string';
    }
}

// 使用示例
const data = { user: { profile: { name: 'John' } } };
console.log(TypeSafeUtils.safeGet(data, 'user.profile.name')); // 'John'
console.log(TypeSafeUtils.safeGet(data, 'user.profile.age', 0)); // 0

TypeSafeUtils.safeSet(data, 'user.profile.age', 30);
console.log(data.user.profile.age); // 30
```

## 📚 总结

JavaScript的数据类型系统是语言的基础，深入理解它对于编写高质量代码至关重要：

### 🎯 核心概念

- **原始类型**：Number、String、Boolean、null、undefined、Symbol、BigInt七种不可变类型
- **引用类型**：Object及其派生类型，存储在堆内存中，按引用传递
- **类型检测**：typeof、instanceof、Object.prototype.toString各有适用场景
- **类型转换**：理解隐式转换规则，合理使用显式转换

### 💡 关键区别

- **存储方式**：原始类型存储在栈中，引用类型存储在堆中
- **传递方式**：原始类型按值传递，引用类型按引用传递
- **比较方式**：原始类型比较值，引用类型比较引用地址
- **可变性**：原始类型不可变，引用类型可变

### 🔧 实用技巧

- **精确类型检测**：使用Object.prototype.toString.call()获取准确类型
- **安全类型转换**：使用Number()、String()、Boolean()进行显式转换
- **深拷贝实现**：递归处理嵌套对象，考虑循环引用和特殊类型
- **性能优化**：根据数据规模选择合适的拷贝方式

### 🚀 最佳实践

1. **类型安全**：使用TypeScript或JSDoc进行类型注解
2. **避免隐式转换**：明确进行类型转换，提高代码可读性
3. **合理使用深浅拷贝**：根据实际需求选择拷贝策略
4. **内存管理**：及时清理大对象的引用，避免内存泄漏

### ⚡ 性能考虑

- **类型检测性能**：typeof > instanceof > Object.prototype.toString
- **拷贝性能**：浅拷贝 > JSON方法 > 递归深拷贝
- **内存占用**：原始类型占用更少内存，引用类型需要考虑共享

### 🔍 调试技巧

- **类型调试**：使用console.log配合typeof检查变量类型
- **引用调试**：通过修改对象属性验证引用关系
- **转换调试**：在类型转换前后打印值，理解转换过程