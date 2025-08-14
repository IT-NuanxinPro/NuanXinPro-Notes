# JavaScript 面试题

JavaScript 是前端面试的重中之重，这里整理了最常见的面试题和详细解答。

## 🔥 高频面试题

### 1. 数据类型与类型检测

**问题**：JavaScript 有哪些数据类型？如何准确检测数据类型？

**答案**：

```javascript
// 基本数据类型（7种）
let num = 42;           // Number
let str = "hello";      // String  
let bool = true;        // Boolean
let undef = undefined;  // Undefined
let nul = null;         // Null
let sym = Symbol('id'); // Symbol
let big = 123n;         // BigInt

// 引用数据类型
let obj = {};           // Object
let arr = [];           // Array
let func = function(){}; // Function

// 类型检测方法
console.log(typeof 42);                    // "number"
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Array.isArray([]));           // true
console.log(null instanceof Object);      // false

// 通用类型检测函数
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

console.log(getType([]));        // "array"
console.log(getType(null));      // "null"
console.log(getType(new Date())); // "date"
```

### 2. 闭包

**问题**：什么是闭包？闭包的应用场景有哪些？

**答案**：

```javascript
// 闭包定义：函数和其词法环境的组合
function outerFunction(x) {
  // 外部函数的变量
  let outerVariable = x;
  
  // 内部函数
  function innerFunction(y) {
    // 访问外部函数的变量
    console.log(outerVariable + y);
  }
  
  return innerFunction;
}

const closure = outerFunction(10);
closure(5); // 输出: 15

// 应用场景1: 数据私有化
function createCounter() {
  let count = 0;
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount());  // 1

// 应用场景2: 模块模式
const module = (function() {
  let privateVariable = 0;
  
  function privateFunction() {
    console.log('私有方法');
  }
  
  return {
    publicMethod() {
      privateVariable++;
      privateFunction();
      return privateVariable;
    }
  };
})();

// 应用场景3: 函数柯里化
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
```

### 3. 原型链

**问题**：解释 JavaScript 的原型链机制

**答案**：

```javascript
// 构造函数
function Person(name) {
  this.name = name;
}

// 在原型上添加方法
Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

// 创建实例
const person1 = new Person('Alice');
const person2 = new Person('Bob');

// 原型链查找
person1.sayHello(); // "Hello, I'm Alice"

// 原型链关系
console.log(person1.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true

// 继承实现
function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}

// 设置原型链
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// 添加子类方法
Student.prototype.study = function() {
  console.log(`${this.name} is studying in grade ${this.grade}`);
};

const student = new Student('Charlie', 10);
student.sayHello(); // 继承的方法
student.study();    // 自己的方法

// ES6 类语法
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog('Rex', 'Golden Retriever');
dog.speak(); // "Rex barks"
```

### 4. 异步编程

**问题**：解释 Promise、async/await 的工作原理

**答案**：

```javascript
// Promise 基础
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve('操作成功');
    } else {
      reject('操作失败');
    }
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Promise 链式调用
function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: `User${id}` }), 1000);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 1, title: 'Post 1', userId },
      { id: 2, title: 'Post 2', userId }
    ]), 1000);
  });
}

// Promise 链
fetchUser(1)
  .then(user => {
    console.log('用户:', user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('文章:', posts);
  })
  .catch(error => {
    console.error('错误:', error);
  });

// async/await 语法
async function getUserPosts(userId) {
  try {
    const user = await fetchUser(userId);
    console.log('用户:', user);
    
    const posts = await fetchPosts(user.id);
    console.log('文章:', posts);
    
    return { user, posts };
  } catch (error) {
    console.error('错误:', error);
    throw error;
  }
}

// 并发执行
async function fetchMultipleUsers() {
  try {
    // 并发执行
    const [user1, user2, user3] = await Promise.all([
      fetchUser(1),
      fetchUser(2),
      fetchUser(3)
    ]);
    
    console.log('所有用户:', { user1, user2, user3 });
  } catch (error) {
    console.error('获取用户失败:', error);
  }
}

// Promise.allSettled - 等待所有 Promise 完成
async function fetchUsersWithResults() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(2),
    Promise.reject('模拟错误')
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`用户 ${index + 1}:`, result.value);
    } else {
      console.error(`用户 ${index + 1} 失败:`, result.reason);
    }
  });
}
```

### 5. 事件循环

**问题**：解释 JavaScript 的事件循环机制

**答案**：

```javascript
// 事件循环示例
console.log('1'); // 同步任务

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4'); // 同步任务

// 输出顺序: 1, 4, 3, 2

// 复杂示例
console.log('start');

setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => {
    console.log('promise1');
  });
}, 0);

setTimeout(() => {
  console.log('timeout2');
}, 0);

Promise.resolve().then(() => {
  console.log('promise2');
  setTimeout(() => {
    console.log('timeout3');
  }, 0);
});

console.log('end');

// 输出顺序: start, end, promise2, timeout1, promise1, timeout2, timeout3

// 宏任务和微任务的区别
function eventLoopDemo() {
  console.log('=== 事件循环演示 ===');
  
  // 宏任务
  setTimeout(() => console.log('宏任务1'), 0);
  setImmediate(() => console.log('setImmediate')); // Node.js 环境
  
  // 微任务
  Promise.resolve().then(() => console.log('微任务1'));
  queueMicrotask(() => console.log('微任务2'));
  
  // 同步任务
  console.log('同步任务');
}

// Node.js 中的 process.nextTick
if (typeof process !== 'undefined') {
  process.nextTick(() => console.log('nextTick'));
}
```

### 6. this 指向

**问题**：解释 JavaScript 中 this 的指向规则

**答案**：

```javascript
// 1. 默认绑定
function defaultBinding() {
  console.log(this); // 严格模式下是 undefined，非严格模式下是 window
}

// 2. 隐式绑定
const obj = {
  name: 'Alice',
  sayName() {
    console.log(this.name); // this 指向 obj
  }
};

obj.sayName(); // "Alice"

// 隐式绑定丢失
const sayName = obj.sayName;
sayName(); // undefined (严格模式) 或 window.name

// 3. 显式绑定
function greet() {
  console.log(`Hello, ${this.name}`);
}

const person = { name: 'Bob' };

greet.call(person);    // "Hello, Bob"
greet.apply(person);   // "Hello, Bob"
greet.bind(person)();  // "Hello, Bob"

// 4. new 绑定
function Person(name) {
  this.name = name;
  this.sayName = function() {
    console.log(this.name);
  };
}

const person1 = new Person('Charlie');
person1.sayName(); // "Charlie"

// 5. 箭头函数
const arrowObj = {
  name: 'David',
  regularFunction() {
    console.log('regular:', this.name); // "David"
    
    const arrowFunction = () => {
      console.log('arrow:', this.name); // "David" (继承外层 this)
    };
    
    arrowFunction();
  }
};

arrowObj.regularFunction();

// 6. 优先级：new > 显式绑定 > 隐式绑定 > 默认绑定
function bindingPriority() {
  function test() {
    console.log(this.name);
  }
  
  const obj1 = { name: 'obj1', test };
  const obj2 = { name: 'obj2' };
  
  // 隐式绑定
  obj1.test(); // "obj1"
  
  // 显式绑定优先级更高
  obj1.test.call(obj2); // "obj2"
  
  // new 绑定优先级最高
  const boundTest = test.bind(obj1);
  const instance = new boundTest(); // this 指向新创建的对象
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
- **闭包**：内存泄漏问题、性能影响
- **原型链**：如何实现继承、ES6 类的区别
- **异步**：宏任务微任务执行顺序
- **this**：箭头函数与普通函数的区别

### 3. 加分项
- 能够手写实现相关功能
- 了解底层原理和源码
- 知道性能优化方案
- 能够举出实际应用场景

---

下一步：查看 [Vue 面试题](./vue.md) 或 React 面试题 <!-- [React 面试题](./react.md) -->
