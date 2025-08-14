# 算法与数据结构

算法和数据结构是前端面试中考察编程基础和逻辑思维的重要内容，也是提升编程能力的核心知识。

## 🎯 学习重点

### 数据结构基础
- **数组**：一维、二维数组操作
- **字符串**：字符串处理和模式匹配
- **链表**：单链表、双链表操作
- **栈和队列**：LIFO和FIFO数据结构
- **树**：二叉树、二叉搜索树
- **图**：图的表示和遍历

### 算法思想
- **双指针**：快慢指针、左右指针
- **滑动窗口**：固定窗口、可变窗口
- **递归**：递归思想和优化
- **动态规划**：状态转移和优化
- **贪心算法**：局部最优解
- **分治算法**：分而治之

## 📚 核心题型

### 数组与字符串

#### 1. 两数之和
```javascript
/**
 * 给定一个整数数组 nums 和一个整数目标值 target
 * 请你在该数组中找出和为目标值 target 的那两个整数
 */
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// 时间复杂度：O(n)
// 空间复杂度：O(n)
```

#### 2. 最长无重复字符子串
```javascript
/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度
 */
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    // 如果当前字符已存在，移动左指针
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// 时间复杂度：O(n)
// 空间复杂度：O(min(m,n))，m是字符集大小
```

#### 3. 数组去重
```javascript
/**
 * 多种数组去重方法
 */

// 方法1：Set
function uniqueArray1(arr) {
  return [...new Set(arr)];
}

// 方法2：filter + indexOf
function uniqueArray2(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// 方法3：reduce
function uniqueArray3(arr) {
  return arr.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item];
  }, []);
}

// 方法4：对象去重（适用于复杂对象）
function uniqueArrayByKey(arr, key) {
  const seen = new Map();
  return arr.filter(item => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    }
    seen.set(keyValue, true);
    return true;
  });
}
```

### 链表操作

#### 1. 反转链表
```javascript
/**
 * 定义链表节点
 */
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 反转链表 - 迭代方法
 */
function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }
  
  return prev;
}

/**
 * 反转链表 - 递归方法
 */
function reverseListRecursive(head) {
  // 基础情况
  if (head === null || head.next === null) {
    return head;
  }
  
  // 递归反转剩余部分
  const newHead = reverseListRecursive(head.next);
  
  // 反转当前连接
  head.next.next = head;
  head.next = null;
  
  return newHead;
}
```

#### 2. 合并两个有序链表

```javascript
/**
 * 合并两个升序链表
 */
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  
  // 连接剩余节点
  current.next = list1 || list2;
  
  return dummy.next;
}
```

### 树的遍历

#### 1. 二叉树遍历

```javascript
/**
 * 二叉树节点定义
 */
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * 前序遍历（根-左-右）
 */
function preorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    
    result.push(node.val);      // 访问根节点
    traverse(node.left);        // 遍历左子树
    traverse(node.right);       // 遍历右子树
  }
  
  traverse(root);
  return result;
}

/**
 * 中序遍历（左-根-右）
 */
function inorderTraversal(root) {
  const result = [];
  const stack = [];
  let current = root;
  
  while (current !== null || stack.length > 0) {
    // 一直向左走到底
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    
    // 处理栈顶节点
    current = stack.pop();
    result.push(current.val);
    
    // 转向右子树
    current = current.right;
  }
  
  return result;
}

/**
 * 层序遍历（广度优先）
 */
function levelOrder(root) {
  if (root === null) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}
```

### 动态规划

#### 1. 斐波那契数列

```javascript
/**
 * 斐波那契数列 - 多种实现方式
 */

// 递归（效率低）
function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 记忆化递归
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// 动态规划
function fibDP(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// 空间优化版本
function fibOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0;
  let prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}
```

#### 2. 最长递增子序列
```javascript
/**
 * 最长递增子序列长度
 */
function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;
  
  const dp = new Array(nums.length).fill(1);
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  
  return Math.max(...dp);
}

// 时间复杂度：O(n²)
// 空间复杂度：O(n)
```

## 🔧 解题技巧

### 1. 分析问题

- **理解题意**：仔细阅读题目要求
- **分析输入输出**：确定数据范围和格式
- **识别模式**：判断属于哪种算法类型
- **考虑边界**：空值、单元素等特殊情况

### 2. 选择数据结构

- **数组**：随机访问、固定大小
- **链表**：动态大小、插入删除高效
- **栈**：后进先出、递归模拟
- **队列**：先进先出、层序遍历
- **哈希表**：快速查找、去重
- **堆**：优先级队列、Top K问题

### 3. 优化策略

- **时间复杂度优化**：减少嵌套循环
- **空间复杂度优化**：原地算法、滚动数组
- **预处理**：排序、建立索引
- **剪枝**：提前终止无效分支
