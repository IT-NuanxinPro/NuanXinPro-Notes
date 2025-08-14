# JavaScript 手写代码题

手写代码是前端面试的重要环节，考察对 JavaScript 核心概念的理解和编程能力。

## 🔧 工具函数实现

### 1. 防抖和节流

```javascript
/**
 * 防抖函数 - 延迟执行，重复调用会重置计时器
 * @param {Function} func 要防抖的函数
 * @param {number} wait 延迟时间
 * @param {boolean} immediate 是否立即执行
 */
function debounce(func, wait, immediate = false) {
  let timeout
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    
    const callNow = immediate && !timeout
    
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func.apply(this, args)
  }
}

/**
 * 节流函数 - 限制执行频率
 * @param {Function} func 要节流的函数
 * @param {number} limit 时间间隔
 */
function throttle(func, limit) {
  let inThrottle
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 使用示例
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query)
}, 300)

const throttledScroll = throttle(() => {
  console.log('滚动事件')
}, 100)
```

### 2. 深拷贝

```javascript
/**
 * 深拷贝函数 - 处理循环引用和各种数据类型
 * @param {*} obj 要拷贝的对象
 * @param {WeakMap} hash 用于处理循环引用
 */
function deepClone(obj, hash = new WeakMap()) {
  // null 或非对象类型直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  // 处理日期对象
  if (obj instanceof Date) {
    return new Date(obj)
  }
  
  // 处理正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  
  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  
  // 创建新对象，保持原型链
  const cloneObj = new obj.constructor()
  hash.set(obj, cloneObj)
  
  // 拷贝属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  
  return cloneObj
}

// 测试用例
const original = {
  name: 'Alice',
  age: 25,
  hobbies: ['reading', 'coding'],
  address: {
    city: 'Beijing',
    country: 'China'
  },
  date: new Date(),
  regex: /test/g
}

// 添加循环引用
original.self = original

const cloned = deepClone(original)
console.log(cloned)
console.log(cloned !== original) // true
console.log(cloned.self === cloned) // true
```

### 3. 类型判断

```javascript
/**
 * 精确的类型判断函数
 * @param {*} value 要判断的值
 * @returns {string} 类型字符串
 */
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

// 各种类型判断函数
const isArray = (value) => Array.isArray(value)
const isObject = (value) => getType(value) === 'object'
const isFunction = (value) => typeof value === 'function'
const isString = (value) => typeof value === 'string'
const isNumber = (value) => typeof value === 'number' && !isNaN(value)
const isBoolean = (value) => typeof value === 'boolean'
const isNull = (value) => value === null
const isUndefined = (value) => value === undefined
const isDate = (value) => getType(value) === 'date'
const isRegExp = (value) => getType(value) === 'regexp'

// 判断空对象
function isEmptyObject(obj) {
  if (!isObject(obj)) return false
  return Object.keys(obj).length === 0
}

// 判断空值
function isEmpty(value) {
  if (isNull(value) || isUndefined(value)) return true
  if (isString(value) || isArray(value)) return value.length === 0
  if (isObject(value)) return Object.keys(value).length === 0
  return false
}

// 测试
console.log(getType([])) // 'array'
console.log(getType({})) // 'object'
console.log(getType(null)) // 'null'
console.log(getType(new Date())) // 'date'
```

## 🎯 Promise 相关实现

### 1. 手写 Promise

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      
      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    
    return promise2
  }
  
  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'))
    }
    
    if (x instanceof MyPromise) {
      x.then(resolve, reject)
    } else {
      resolve(x)
    }
  }
  
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    )
  }
  
  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }
  
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = []
      let completedCount = 0
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = value
            completedCount++
            if (completedCount === promises.length) {
              resolve(results)
            }
          },
          reject
        )
      })
    })
  }
  
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, reject)
      })
    })
  }
}

// 测试
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('成功'), 1000)
})

promise.then(value => {
  console.log(value) // '成功'
  return '链式调用'
}).then(value => {
  console.log(value) // '链式调用'
})
```

### 2. Promise 工具函数

```javascript
/**
 * Promise.allSettled 实现
 * 等待所有 Promise 完成，无论成功还是失败
 */
function allSettled(promises) {
  return Promise.all(
    promises.map(promise =>
      Promise.resolve(promise)
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    )
  )
}

/**
 * Promise 重试函数
 * @param {Function} fn 要重试的异步函数
 * @param {number} maxRetries 最大重试次数
 * @param {number} delay 重试间隔
 */
async function retry(fn, maxRetries = 3, delay = 1000) {
  let lastError
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError
}

/**
 * Promise 超时函数
 * @param {Promise} promise 原始 Promise
 * @param {number} timeout 超时时间
 */
function withTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Promise timeout')), timeout)
    })
  ])
}

// 使用示例
async function fetchWithRetry() {
  return retry(
    () => fetch('/api/data').then(res => res.json()),
    3,
    1000
  )
}

async function fetchWithTimeout() {
  return withTimeout(
    fetch('/api/data'),
    5000
  )
}
```

## 🔄 函数式编程

### 1. 柯里化

```javascript
/**
 * 柯里化函数
 * @param {Function} fn 要柯里化的函数
 * @returns {Function} 柯里化后的函数
 */
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs))
      }
    }
  }
}

// 示例函数
function add(a, b, c) {
  return a + b + c
}

const curriedAdd = curry(add)

console.log(curriedAdd(1)(2)(3)) // 6
console.log(curriedAdd(1, 2)(3)) // 6
console.log(curriedAdd(1)(2, 3)) // 6

// 实际应用
const multiply = curry((a, b, c) => a * b * c)
const multiplyByTwo = multiply(2)
const multiplyByTwoAndThree = multiplyByTwo(3)

console.log(multiplyByTwoAndThree(4)) // 24
```

### 2. 函数组合

```javascript
/**
 * 函数组合 - 从右到左执行
 * @param {...Function} fns 要组合的函数
 */
function compose(...fns) {
  return function(value) {
    return fns.reduceRight((acc, fn) => fn(acc), value)
  }
}

/**
 * 管道函数 - 从左到右执行
 * @param {...Function} fns 要组合的函数
 */
function pipe(...fns) {
  return function(value) {
    return fns.reduce((acc, fn) => fn(acc), value)
  }
}

// 示例函数
const add1 = x => x + 1
const multiply2 = x => x * 2
const square = x => x * x

// 使用组合
const composedFn = compose(square, multiply2, add1)
console.log(composedFn(3)) // ((3 + 1) * 2)² = 64

// 使用管道
const pipedFn = pipe(add1, multiply2, square)
console.log(pipedFn(3)) // ((3 + 1) * 2)² = 64
```

## 🎨 数组方法实现

### 1. 手写 map、filter、reduce

```javascript
// 手写 map
Array.prototype.myMap = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function')
  }
  
  const result = []
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this)
    }
  }
  return result
}

// 手写 filter
Array.prototype.myFilter = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function')
  }
  
  const result = []
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i])
    }
  }
  return result
}

// 手写 reduce
Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function')
  }
  
  let accumulator = initialValue
  let startIndex = 0
  
  // 如果没有提供初始值，使用数组第一个元素
  if (initialValue === undefined) {
    if (this.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value')
    }
    accumulator = this[0]
    startIndex = 1
  }
  
  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this)
    }
  }
  
  return accumulator
}

// 测试
const numbers = [1, 2, 3, 4, 5]

console.log(numbers.myMap(x => x * 2)) // [2, 4, 6, 8, 10]
console.log(numbers.myFilter(x => x % 2 === 0)) // [2, 4]
console.log(numbers.myReduce((acc, x) => acc + x, 0)) // 15
```

### 2. 数组扁平化

```javascript
/**
 * 数组扁平化 - 递归实现
 * @param {Array} arr 要扁平化的数组
 * @param {number} depth 扁平化深度
 */
function flatten(arr, depth = 1) {
  if (depth <= 0) return arr.slice()
  
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatten(val, depth - 1))
    } else {
      acc.push(val)
    }
    return acc
  }, [])
}

/**
 * 完全扁平化
 * @param {Array} arr 要扁平化的数组
 */
function flattenDeep(arr) {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flattenDeep(val) : val)
  }, [])
}

/**
 * 使用栈实现扁平化
 * @param {Array} arr 要扁平化的数组
 */
function flattenWithStack(arr) {
  const result = []
  const stack = [...arr]
  
  while (stack.length) {
    const next = stack.pop()
    if (Array.isArray(next)) {
      stack.push(...next)
    } else {
      result.push(next)
    }
  }
  
  return result.reverse()
}

// 测试
const nestedArray = [1, [2, 3], [4, [5, 6]], [[7, 8], 9]]

console.log(flatten(nestedArray, 1)) // [1, 2, 3, 4, [5, 6], [7, 8], 9]
console.log(flatten(nestedArray, 2)) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(flattenDeep(nestedArray)) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
