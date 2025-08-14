# 手写代码题

手写代码是前端面试的重要环节，考察候选人的编程能力、对底层原理的理解以及解决问题的思路。

## 🎯 考察重点

### 编程基础能力
- 语法熟练度
- 逻辑思维能力
- 代码组织结构
- 边界条件处理

### 原理理解深度
- 内置方法实现原理
- 设计模式应用
- 算法和数据结构
- 性能优化意识

### 工程实践经验
- 错误处理机制
- 代码可读性
- 测试用例设计
- 实际应用场景

## 📚 题目分类

### JavaScript 核心实现
```javascript
// 1. 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 2. 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// 3. 深拷贝
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  if (hash.get(obj)) return hash.get(obj);
  
  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

### Promise 相关实现
```javascript
// 1. 手写 Promise
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 实现链式调用和值传递
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
      // ... 其他状态处理
    });
  }
}

// 2. Promise.all 实现
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }
    
    const results = [];
    let completedCount = 0;
    
    if (promises.length === 0) {
      return resolve(results);
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = value;
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        },
        reason => reject(reason)
      );
    });
  });
};
```

### 数组方法实现
```javascript
// 1. Array.prototype.map
Array.prototype.myMap = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.map called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const O = Object(this);
  const len = parseInt(O.length) || 0;
  const result = new Array(len);
  
  for (let i = 0; i < len; i++) {
    if (i in O) {
      result[i] = callback.call(thisArg, O[i], i, O);
    }
  }
  return result;
};

// 2. Array.prototype.reduce
Array.prototype.myReduce = function(callback, initialValue) {
  if (this == null) {
    throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const O = Object(this);
  const len = parseInt(O.length) || 0;
  let k = 0;
  let accumulator;
  
  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    if (len === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    while (k < len && !(k in O)) {
      k++;
    }
    accumulator = O[k++];
  }
  
  while (k < len) {
    if (k in O) {
      accumulator = callback(accumulator, O[k], k, O);
    }
    k++;
  }
  return accumulator;
};
```

### 设计模式实现
```javascript
// 1. 观察者模式
class Observer {
  constructor() {
    this.observers = [];
  }
  
  subscribe(fn) {
    this.observers.push(fn);
  }
  
  unsubscribe(fn) {
    this.observers = this.observers.filter(observer => observer !== fn);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

// 2. 发布订阅模式
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args));
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

// 3. 单例模式
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    return this;
  }
  
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
```
