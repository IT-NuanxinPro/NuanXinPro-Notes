# 类与面向对象编程

ES6引入的class语法为JavaScript提供了更清晰的面向对象编程方式。本文将详细介绍类的定义、继承、原型链以及面向对象编程的最佳实践。

## 🏗️ ES6类基础

### 类的定义和实例化

ES6的class语法提供了一种更直观、更接近传统面向对象语言的方式来定义类。它本质上是原型继承的语法糖，但提供了更清晰的语法结构。

**类的核心组成部分：**

- **构造函数（constructor）**：用于初始化实例对象
- **实例方法**：定义在原型上，所有实例共享
- **静态方法**：属于类本身，不属于实例
- **私有成员**：使用#前缀，外部无法访问
- **getter/setter**：提供属性访问的控制

```javascript
// ES6类定义
class Person {
    // 构造函数
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.id = Math.random().toString(36).substr(2, 9);
    }

    // 实例方法
    introduce() {
        return `我是${this.name}，今年${this.age}岁`;
    }

    // 静态方法
    static getSpecies() {
        return 'Homo sapiens';
    }

    // 静态属性（ES2022+）
    static species = 'Human';

    // 私有属性（ES2022+）
    #privateData = '私有数据';

    // 私有方法
    #privateMethod() {
        return '这是私有方法';
    }

    // 公共方法访问私有成员
    getPrivateData() {
        return this.#privateData;
    }

    // getter和setter
    get fullInfo() {
        return `${this.name} (${this.age}岁)`;
    }
    
    set newAge(age) {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            throw new Error('年龄必须在0-150之间');
        }
    }
}

// 创建实例
const person1 = new Person('张三', 25);
const person2 = new Person('李四', 30);

console.log(person1.introduce()); // 我是张三，今年25岁
console.log(Person.getSpecies()); // Homo sapiens
console.log(person1.fullInfo);    // 张三 (25岁)

person1.newAge = 26;
console.log(person1.age); // 26
```

### 类与构造函数的对比

```javascript
// ES5构造函数方式
function PersonES5(name, age) {
    this.name = name;
    this.age = age;
}

PersonES5.prototype.introduce = function() {
    return `我是${this.name}，今年${this.age}岁`;
};

PersonES5.getSpecies = function() {
    return 'Homo sapiens';
};

// ES6类方式（本质上是语法糖）
class PersonES6 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return `我是${this.name}，今年${this.age}岁`;
    }
    
    static getSpecies() {
        return 'Homo sapiens';
    }
}

// 验证类的本质
console.log(typeof PersonES6); // function
console.log(PersonES6 === PersonES6.prototype.constructor); // true

// 实例化对比
const es5Person = new PersonES5('ES5', 20);
const es6Person = new PersonES6('ES6', 20);

console.log(es5Person.introduce()); // 我是ES5，今年20岁
console.log(es6Person.introduce()); // 我是ES6，今年20岁
```

## 🧬 继承机制

### 基础继承

```javascript
// 基类
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.energy = 100;
    }
    
    eat(food) {
        this.energy += 10;
        console.log(`${this.name}吃了${food}，能量增加到${this.energy}`);
    }
    
    sleep() {
        this.energy += 20;
        console.log(`${this.name}睡觉了，能量恢复到${this.energy}`);
    }
    
    move() {
        this.energy -= 5;
        console.log(`${this.name}移动了，能量减少到${this.energy}`);
    }
    
    static getKingdom() {
        return 'Animalia';
    }
}

// 派生类
class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Canine'); // 调用父类构造函数
        this.breed = breed;
        this.loyalty = 100;
    }
    
    // 重写父类方法
    move() {
        this.energy -= 3; // 狗移动消耗更少能量
        console.log(`${this.name}跑了起来，能量减少到${this.energy}`);
    }
    
    // 新增方法
    bark() {
        this.energy -= 2;
        console.log(`${this.name}汪汪叫，能量减少到${this.energy}`);
    }
    
    // 调用父类方法
    playFetch() {
        super.move(); // 调用父类的move方法
        this.bark();
        this.loyalty += 5;
        console.log(`${this.name}玩接球游戏，忠诚度增加到${this.loyalty}`);
    }
}

// 使用继承
const myDog = new Dog('旺财', '金毛');
myDog.eat('狗粮');     // 继承的方法
myDog.bark();         // 自己的方法
myDog.move();         // 重写的方法
myDog.playFetch();    // 调用父类方法的方法

console.log(Dog.getKingdom()); // 继承的静态方法
```

### 多层继承

```javascript
// 三层继承示例
class Vehicle {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
    }
    
    start() {
        console.log(`${this.brand} ${this.model} 启动了`);
    }
    
    accelerate(increment) {
        this.speed += increment;
        console.log(`加速到 ${this.speed} km/h`);
    }
    
    stop() {
        this.speed = 0;
        console.log('车辆停止');
    }
}

class Car extends Vehicle {
    constructor(brand, model, doors) {
        super(brand, model);
        this.doors = doors;
        this.fuel = 100;
    }
    
    refuel() {
        this.fuel = 100;
        console.log('加满油了');
    }
    
    // 重写加速方法
    accelerate(increment) {
        if (this.fuel > 0) {
            super.accelerate(increment);
            this.fuel -= increment * 0.1;
            console.log(`剩余油量: ${this.fuel.toFixed(1)}%`);
        } else {
            console.log('没油了，无法加速');
        }
    }
}

class ElectricCar extends Car {
    constructor(brand, model, doors, batteryCapacity) {
        super(brand, model, doors);
        this.batteryCapacity = batteryCapacity;
        this.battery = 100;
        this.fuel = undefined; // 电动车没有燃油
    }
    
    charge() {
        this.battery = 100;
        console.log('电池充满了');
    }
    
    // 再次重写加速方法
    accelerate(increment) {
        if (this.battery > 0) {
            this.speed += increment;
            this.battery -= increment * 0.2;
            console.log(`加速到 ${this.speed} km/h`);
            console.log(`剩余电量: ${this.battery.toFixed(1)}%`);
        } else {
            console.log('电池没电了，无法加速');
        }
    }
    
    // 新增方法
    enableAutoPilot() {
        console.log('自动驾驶模式启动');
    }
}

// 使用多层继承
const tesla = new ElectricCar('Tesla', 'Model 3', 4, 75);
tesla.start();           // 继承自Vehicle
tesla.accelerate(50);    // ElectricCar重写的方法
tesla.enableAutoPilot(); // ElectricCar特有方法
tesla.charge();          // ElectricCar特有方法
```

## 🔧 高级特性

### 抽象类和接口模拟

```javascript
// 模拟抽象类
class AbstractShape {
    constructor(color) {
        if (new.target === AbstractShape) {
            throw new Error('抽象类不能直接实例化');
        }
        this.color = color;
    }
    
    // 抽象方法（必须被子类实现）
    getArea() {
        throw new Error('子类必须实现getArea方法');
    }
    
    getPerimeter() {
        throw new Error('子类必须实现getPerimeter方法');
    }
    
    // 具体方法
    getColor() {
        return this.color;
    }
    
    describe() {
        return `这是一个${this.color}的图形，面积为${this.getArea()}`;
    }
}

// 具体实现类
class Circle extends AbstractShape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle extends AbstractShape {
    constructor(color, width, height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
    
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}

// 使用抽象类
const circle = new Circle('红色', 5);
const rectangle = new Rectangle('蓝色', 4, 6);

console.log(circle.describe());    // 这是一个红色的图形，面积为78.54
console.log(rectangle.describe()); // 这是一个蓝色的图形，面积为24

// 尝试实例化抽象类会报错
// const shape = new AbstractShape('绿色'); // Error: 抽象类不能直接实例化
```

### Mixin模式

```javascript
// Mixin模式：多重继承的模拟
const Flyable = {
    fly() {
        console.log(`${this.name} 正在飞行`);
    },
    
    land() {
        console.log(`${this.name} 降落了`);
    }
};

const Swimmable = {
    swim() {
        console.log(`${this.name} 正在游泳`);
    },
    
    dive() {
        console.log(`${this.name} 潜水了`);
    }
};

// Mixin工具函数
function mixin(target, ...sources) {
    sources.forEach(source => {
        Object.getOwnPropertyNames(source).forEach(name => {
            if (name !== 'constructor') {
                target.prototype[name] = source[name];
            }
        });
    });
    return target;
}

// 基础类
class Bird {
    constructor(name) {
        this.name = name;
    }
    
    eat() {
        console.log(`${this.name} 正在吃东西`);
    }
}

class Fish {
    constructor(name) {
        this.name = name;
    }
    
    eat() {
        console.log(`${this.name} 正在吃东西`);
    }
}

// 应用Mixin
mixin(Bird, Flyable);
mixin(Fish, Swimmable);

// 特殊情况：既能飞又能游泳的动物
class Duck extends Bird {
    constructor(name) {
        super(name);
    }
}

mixin(Duck, Swimmable);

// 使用Mixin
const sparrow = new Bird('麻雀');
const goldfish = new Fish('金鱼');
const duck = new Duck('鸭子');

sparrow.fly();  // 麻雀 正在飞行
goldfish.swim(); // 金鱼 正在游泳
duck.fly();     // 鸭子 正在飞行
duck.swim();    // 鸭子 正在游泳
```

### 装饰器模式（实验性）

```javascript
// 装饰器函数示例（需要Babel转换）
function readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}

function validate(target, name, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
        // 参数验证逻辑
        if (args.some(arg => arg == null)) {
            throw new Error('参数不能为空');
        }
        return originalMethod.apply(this, args);
    };
    
    return descriptor;
}

function log(target, name, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
        console.log(`调用方法 ${name}，参数:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`方法 ${name} 返回:`, result);
        return result;
    };
    
    return descriptor;
}

// 使用装饰器（需要编译器支持）
class Calculator {
    // @readonly
    version = '1.0.0';
    
    // @log
    // @validate
    add(a, b) {
        return a + b;
    }
    
    // @log
    multiply(a, b) {
        return a * b;
    }
}

// 手动应用装饰器（不依赖编译器）
const calculator = new Calculator();

// 手动装饰方法
const originalAdd = calculator.add;
calculator.add = function(...args) {
    if (args.some(arg => arg == null)) {
        throw new Error('参数不能为空');
    }
    console.log(`调用方法 add，参数:`, args);
    const result = originalAdd.apply(this, args);
    console.log(`方法 add 返回:`, result);
    return result;
};

console.log(calculator.add(5, 3)); // 带日志和验证的加法
```

## 🎯 实际应用场景

### 状态管理类

```javascript
class StateManager {
    constructor(initialState = {}) {
        this.state = { ...initialState };
        this.listeners = [];
        this.history = [{ ...initialState }];
        this.historyIndex = 0;
    }
    
    // 获取状态
    getState() {
        return { ...this.state };
    }
    
    // 更新状态
    setState(updates) {
        const newState = { ...this.state, ...updates };
        const oldState = { ...this.state };
        
        this.state = newState;
        
        // 添加到历史记录
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push({ ...newState });
        this.historyIndex++;
        
        // 通知监听器
        this.listeners.forEach(listener => {
            listener(newState, oldState);
        });
    }
    
    // 订阅状态变化
    subscribe(listener) {
        this.listeners.push(listener);
        
        // 返回取消订阅函数
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
    
    // 撤销
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.state = { ...this.history[this.historyIndex] };
            this.notifyListeners();
        }
    }
    
    // 重做
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.state = { ...this.history[this.historyIndex] };
            this.notifyListeners();
        }
    }
    
    // 私有方法：通知监听器
    notifyListeners() {
        const currentState = { ...this.state };
        this.listeners.forEach(listener => {
            listener(currentState, currentState);
        });
    }
}

// 使用状态管理
const stateManager = new StateManager({ count: 0, name: 'App' });

// 订阅状态变化
const unsubscribe = stateManager.subscribe((newState, oldState) => {
    console.log('状态变化:', { newState, oldState });
});

stateManager.setState({ count: 1 });
stateManager.setState({ count: 2, name: 'Updated App' });
stateManager.undo(); // 撤销到上一个状态
stateManager.redo(); // 重做

unsubscribe(); // 取消订阅
```

### 事件发射器类

```javascript
class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    // 添加事件监听器
    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
        return this; // 支持链式调用
    }
    
    // 添加一次性事件监听器
    once(event, listener) {
        const onceWrapper = (...args) => {
            listener.apply(this, args);
            this.off(event, onceWrapper);
        };
        return this.on(event, onceWrapper);
    }
    
    // 移除事件监听器
    off(event, listener) {
        if (!this.events.has(event)) return this;
        
        const listeners = this.events.get(event);
        const index = listeners.indexOf(listener);
        
        if (index > -1) {
            listeners.splice(index, 1);
        }
        
        if (listeners.length === 0) {
            this.events.delete(event);
        }
        
        return this;
    }
    
    // 触发事件
    emit(event, ...args) {
        if (!this.events.has(event)) return false;
        
        const listeners = this.events.get(event).slice(); // 复制数组避免修改问题
        
        listeners.forEach(listener => {
            try {
                listener.apply(this, args);
            } catch (error) {
                console.error(`事件监听器执行错误:`, error);
            }
        });
        
        return true;
    }
    
    // 移除所有监听器
    removeAllListeners(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
        return this;
    }
    
    // 获取监听器数量
    listenerCount(event) {
        return this.events.has(event) ? this.events.get(event).length : 0;
    }
}

// 使用事件发射器
class UserService extends EventEmitter {
    constructor() {
        super();
        this.users = [];
    }
    
    addUser(user) {
        this.users.push(user);
        this.emit('userAdded', user);
        this.emit('usersChanged', this.users);
    }
    
    removeUser(userId) {
        const index = this.users.findIndex(u => u.id === userId);
        if (index > -1) {
            const removedUser = this.users.splice(index, 1)[0];
            this.emit('userRemoved', removedUser);
            this.emit('usersChanged', this.users);
        }
    }
}

// 使用示例
const userService = new UserService();

userService
    .on('userAdded', (user) => {
        console.log('用户已添加:', user.name);
    })
    .on('userRemoved', (user) => {
        console.log('用户已移除:', user.name);
    })
    .once('usersChanged', (users) => {
        console.log('用户列表首次变化，当前用户数:', users.length);
    });

userService.addUser({ id: 1, name: '张三' });
userService.addUser({ id: 2, name: '李四' });
userService.removeUser(1);
```

## 📚 总结

ES6类为JavaScript带来了更现代、更清晰的面向对象编程方式，是构建大型应用的重要工具：

### 🎯 核心特性

- **类语法糖**：ES6类本质上是构造函数的语法糖，提供更清晰的语法
- **继承机制**：通过extends关键字实现类继承，支持方法重写和super调用
- **封装特性**：私有属性和方法提供真正的封装能力
- **静态成员**：静态方法和属性属于类本身，不属于实例

### 💡 设计模式应用

- **抽象类模式**：通过检查new.target实现抽象类效果
- **Mixin模式**：实现多重继承的效果，增强代码复用性
- **装饰器模式**：通过装饰器增强类和方法的功能
- **观察者模式**：事件发射器类是观察者模式的典型实现

### 🚀 实际应用场景

- **状态管理**：创建可观察的状态管理类
- **事件系统**：构建灵活的事件发射和监听机制
- **组件开发**：使用类创建可复用的UI组件
- **业务逻辑封装**：将复杂的业务逻辑封装成类

### 🔧 最佳实践

1. **合理使用继承**：优先组合而非继承，避免过深的继承链
2. **封装原则**：使用私有属性保护内部状态，提供公共接口
3. **单一职责**：每个类应该只有一个改变的理由
4. **接口设计**：设计清晰、一致的公共接口

### ⚡ 性能考虑

- **原型链优化**：理解原型链的查找机制，避免过长的原型链
- **内存管理**：及时清理事件监听器和引用，避免内存泄漏
- **实例化成本**：考虑类实例化的性能开销。
