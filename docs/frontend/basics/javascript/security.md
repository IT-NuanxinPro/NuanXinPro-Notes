# 前端安全

前端安全是Web开发中至关重要的一环。本文将详细介绍常见的前端安全威胁（XSS、CSRF、Cookie安全等）、攻击场景、危害以及相应的防护措施。

## 🚨 XSS攻击（跨站脚本攻击）

### XSS攻击类型

```javascript
// 1. 反射型XSS（非持久型）
// 攻击代码通过URL参数传入，立即执行

// 危险的代码示例
function displayUserInput() {
    const urlParams = new URLSearchParams(window.location.search);
    const userInput = urlParams.get('message');
    
    // ❌ 危险：直接插入用户输入
    document.getElementById('output').innerHTML = userInput;
    
    // 攻击URL示例：
    // https://example.com?message=<script>alert('XSS攻击')</script>
}

// 2. 存储型XSS（持久型）
// 攻击代码存储在服务器，每次访问都会执行
// 这是最危险的XSS类型，因为恶意脚本会持久化存储，影响所有访问用户

// 危险的评论系统示例
function addComment(comment) {
    // ❌ 危险：直接存储和显示用户输入
    const commentElement = document.createElement('div');
    commentElement.innerHTML = comment; // 恶意脚本会被执行
    document.getElementById('comments').appendChild(commentElement);
}

// 3. DOM型XSS
// 通过修改DOM环境执行恶意脚本
// 这种攻击完全在客户端执行，不需要服务器参与

// 危险的DOM操作示例
function updateContent() {
    const hash = window.location.hash.substring(1);

    // ❌ 危险：直接使用URL片段
    document.getElementById('content').innerHTML = decodeURIComponent(hash);

    // 攻击URL示例：
    // https://example.com#<img src=x onerror=alert('DOM XSS')>
}
```

### XSS防护措施

```javascript
// 1. 输入验证和过滤
function sanitizeInput(input) {
    // 基础HTML实体编码
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    };
    
    return String(input).replace(/[&<>"'\/]/g, (s) => entityMap[s]);
}

// 2. 安全的DOM操作
function safeDisplayUserInput() {
    const urlParams = new URLSearchParams(window.location.search);
    const userInput = urlParams.get('message');
    
    if (userInput) {
        // ✅ 安全：使用textContent而不是innerHTML
        document.getElementById('output').textContent = userInput;
        
        // 或者进行HTML编码
        document.getElementById('output').innerHTML = sanitizeInput(userInput);
    }
}

// 3. 使用DOMPurify库进行深度清理
function safeDOMPurify(dirtyHTML) {
    // 需要引入DOMPurify库
    // <script src="https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.min.js"></script>
    
    if (typeof DOMPurify !== 'undefined') {
        return DOMPurify.sanitize(dirtyHTML);
    }
    
    // 降级方案
    return sanitizeInput(dirtyHTML);
}

// 4. 内容安全策略（CSP）配置
// 在HTML头部添加CSP头
/*
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://trusted-cdn.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' https://fonts.googleapis.com;
    connect-src 'self' https://api.example.com;
">
*/

// 5. 安全的事件处理
function setupSecureEventHandlers() {
    // ✅ 安全：使用addEventListener而不是内联事件
    document.getElementById('button').addEventListener('click', function(e) {
        e.preventDefault();
        
        const userInput = document.getElementById('input').value;
        const sanitizedInput = sanitizeInput(userInput);
        
        // 安全地处理用户输入
        processUserInput(sanitizedInput);
    });
}

// 6. 模板引擎的安全使用
function secureTemplateRendering(data) {
    // 使用模板引擎时确保自动转义
    const template = `
        <div class="user-card">
            <h3>{{name}}</h3>  <!-- 自动转义 -->
            <p>{{description}}</p>  <!-- 自动转义 -->
            <div>{{{safeHTML}}}</div>  <!-- 三重括号表示信任的HTML -->
        </div>
    `;
    
    // 确保只有经过验证的HTML才使用三重括号
    const processedData = {
        name: data.name, // 会被自动转义
        description: data.description, // 会被自动转义
        safeHTML: safeDOMPurify(data.htmlContent) // 已清理的HTML
    };
    
    return processedData;
}
```

## 🛡️ CSRF攻击（跨站请求伪造）

### CSRF攻击原理和场景

```javascript
// CSRF攻击场景示例

// 1. 恶意网站的攻击代码
// 在恶意网站 evil.com 上的代码
function csrfAttack() {
    // 创建隐藏的表单，向目标网站发送请求
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://bank.com/transfer'; // 目标网站
    form.style.display = 'none';
    
    // 添加攻击参数
    const amountInput = document.createElement('input');
    amountInput.name = 'amount';
    amountInput.value = '10000';
    form.appendChild(amountInput);
    
    const toAccountInput = document.createElement('input');
    toAccountInput.name = 'toAccount';
    toAccountInput.value = 'attacker-account';
    form.appendChild(toAccountInput);
    
    document.body.appendChild(form);
    form.submit(); // 自动提交表单
}

// 2. 通过图片标签发起GET请求攻击
// <img src="https://bank.com/transfer?amount=10000&toAccount=attacker" style="display:none">

// 3. 通过AJAX发起攻击（受同源策略限制）
function ajaxCSRFAttempt() {
    // 这种攻击通常会被同源策略阻止
    fetch('https://bank.com/api/transfer', {
        method: 'POST',
        credentials: 'include', // 包含cookies
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: 10000,
            toAccount: 'attacker-account'
        })
    }).catch(error => {
        console.log('CSRF攻击被阻止:', error);
    });
}
```

### CSRF防护措施

```javascript
// 1. CSRF Token防护
class CSRFProtection {
    constructor() {
        this.token = this.generateToken();
        this.setupTokenRefresh();
    }
    
    // 生成CSRF Token
    generateToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    // 获取当前Token
    getToken() {
        return this.token;
    }
    
    // 在所有表单中添加CSRF Token
    addTokenToForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // 移除旧的token输入框
            const oldToken = form.querySelector('input[name="csrf_token"]');
            if (oldToken) {
                oldToken.remove();
            }
            
            // 添加新的token输入框
            const tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = 'csrf_token';
            tokenInput.value = this.token;
            form.appendChild(tokenInput);
        });
    }
    
    // 在AJAX请求中添加CSRF Token
    setupAjaxProtection() {
        const originalFetch = window.fetch;
        const self = this;
        
        window.fetch = function(url, options = {}) {
            // 只对POST、PUT、DELETE等修改性请求添加token
            if (options.method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method.toUpperCase())) {
                options.headers = options.headers || {};
                options.headers['X-CSRF-Token'] = self.getToken();
            }
            
            return originalFetch.call(this, url, options);
        };
    }
    
    // 定期刷新Token
    setupTokenRefresh() {
        setInterval(() => {
            this.refreshToken();
        }, 30 * 60 * 1000); // 30分钟刷新一次
    }
    
    // 刷新Token
    async refreshToken() {
        try {
            const response = await fetch('/api/csrf-token', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                this.token = data.token;
                this.addTokenToForms();
            }
        } catch (error) {
            console.error('Token刷新失败:', error);
        }
    }
}

// 2. SameSite Cookie设置
function setupSameSiteCookies() {
    // 在服务器端设置Cookie时使用SameSite属性
    /*
    Set-Cookie: sessionId=abc123; SameSite=Strict; Secure; HttpOnly
    Set-Cookie: csrfToken=xyz789; SameSite=Lax; Secure
    */
    
    // JavaScript中读取Cookie的安全方法
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    }
    
    // 验证Referer头
    function validateReferer() {
        const referer = document.referrer;
        const currentOrigin = window.location.origin;
        
        if (referer && !referer.startsWith(currentOrigin)) {
            console.warn('可疑的跨站请求，Referer不匹配');
            return false;
        }
        return true;
    }
}

// 3. 双重提交Cookie
class DoubleSubmitCookie {
    constructor() {
        this.cookieName = 'csrf_token';
        this.headerName = 'X-CSRF-Token';
    }
    
    // 设置CSRF Cookie
    setCsrfCookie() {
        const token = this.generateSecureToken();
        const expires = new Date();
        expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // 24小时
        
        document.cookie = `${this.cookieName}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;
        return token;
    }
    
    // 获取CSRF Cookie
    getCsrfCookie() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === this.cookieName) {
                return value;
            }
        }
        return null;
    }
    
    // 验证双重提交
    validateDoubleSubmit(submittedToken) {
        const cookieToken = this.getCsrfCookie();
        return cookieToken && cookieToken === submittedToken;
    }
    
    generateSecureToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return btoa(String.fromCharCode.apply(null, array));
    }
}
```

## 🍪 Cookie安全

### Cookie安全配置

```javascript
// Cookie安全最佳实践
class SecureCookieManager {
    constructor() {
        this.defaultOptions = {
            secure: true,      // 只在HTTPS下传输
            httpOnly: true,    // 防止XSS访问
            sameSite: 'Strict' // 防止CSRF
        };
    }
    
    // 设置安全Cookie
    setSecureCookie(name, value, options = {}) {
        const finalOptions = { ...this.defaultOptions, ...options };
        
        let cookieString = `${name}=${encodeURIComponent(value)}`;
        
        if (finalOptions.expires) {
            cookieString += `; expires=${finalOptions.expires.toUTCString()}`;
        }
        
        if (finalOptions.maxAge) {
            cookieString += `; max-age=${finalOptions.maxAge}`;
        }
        
        if (finalOptions.path) {
            cookieString += `; path=${finalOptions.path}`;
        }
        
        if (finalOptions.domain) {
            cookieString += `; domain=${finalOptions.domain}`;
        }
        
        if (finalOptions.secure) {
            cookieString += '; Secure';
        }
        
        if (finalOptions.httpOnly) {
            cookieString += '; HttpOnly';
        }
        
        if (finalOptions.sameSite) {
            cookieString += `; SameSite=${finalOptions.sameSite}`;
        }
        
        document.cookie = cookieString;
    }
    
    // 获取Cookie（只能获取非HttpOnly的Cookie）
    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }
    
    // 删除Cookie
    deleteCookie(name, path = '/', domain = '') {
        let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
        
        if (domain) {
            cookieString += `; domain=${domain}`;
        }
        
        document.cookie = cookieString;
    }
    
    // 加密Cookie值
    async encryptCookieValue(value, key) {
        const encoder = new TextEncoder();
        const data = encoder.encode(value);
        
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(key),
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        );
        
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            cryptoKey,
            data
        );
        
        const encryptedArray = new Uint8Array(encrypted);
        const result = new Uint8Array(iv.length + encryptedArray.length);
        result.set(iv);
        result.set(encryptedArray, iv.length);
        
        return btoa(String.fromCharCode.apply(null, result));
    }
    
    // 解密Cookie值
    async decryptCookieValue(encryptedValue, key) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        
        const data = new Uint8Array(atob(encryptedValue).split('').map(c => c.charCodeAt(0)));
        const iv = data.slice(0, 12);
        const encrypted = data.slice(12);
        
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(key),
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );
        
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv },
            cryptoKey,
            encrypted
        );
        
        return decoder.decode(decrypted);
    }
}

// 使用示例
const cookieManager = new SecureCookieManager();

// 设置安全的会话Cookie
cookieManager.setSecureCookie('sessionId', 'abc123', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/'
});

// 设置有过期时间的Cookie
const expires = new Date();
expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7天后过期

cookieManager.setSecureCookie('rememberMe', 'true', {
    expires: expires,
    secure: true,
    sameSite: 'Lax'
});
```

## 🔐 其他安全威胁和防护

### 点击劫持防护

```javascript
// 1. X-Frame-Options防护
function preventClickjacking() {
    // 检查是否在iframe中
    if (window.top !== window.self) {
        // 如果在iframe中，检查是否是合法的嵌入
        const allowedDomains = ['trusted-partner.com', 'example.com'];
        const parentDomain = document.referrer ? new URL(document.referrer).hostname : '';
        
        if (!allowedDomains.includes(parentDomain)) {
            // 跳出iframe
            window.top.location = window.self.location;
            
            // 或者隐藏页面内容
            document.body.style.display = 'none';
            alert('检测到点击劫持攻击！');
        }
    }
}

// 2. 内容安全策略防护
function setupFrameProtection() {
    // 在HTML头部添加
    /*
    <meta http-equiv="X-Frame-Options" content="DENY">
    或
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    或
    <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'none';">
    */
}

// 调用防护函数
preventClickjacking();
```

### 敏感信息泄露防护

```javascript
// 防止敏感信息泄露
class SensitiveDataProtection {
    constructor() {
        this.setupConsoleProtection();
        this.setupDevToolsDetection();
        this.setupMemoryCleanup();
    }
    
    // 保护控制台输出
    setupConsoleProtection() {
        if (process.env.NODE_ENV === 'production') {
            // 禁用console输出
            console.log = console.warn = console.error = function() {};
            
            // 或者重定向到安全的日志服务
            const originalLog = console.log;
            console.log = function(...args) {
                // 过滤敏感信息
                const filteredArgs = args.map(arg => 
                    typeof arg === 'string' ? arg.replace(/password|token|key/gi, '[REDACTED]') : arg
                );
                originalLog.apply(console, filteredArgs);
            };
        }
    }
    
    // 检测开发者工具
    setupDevToolsDetection() {
        let devtools = false;
        
        setInterval(() => {
            const before = new Date();
            debugger;
            const after = new Date();
            
            if (after - before > 100) {
                if (!devtools) {
                    devtools = true;
                    this.handleDevToolsOpen();
                }
            } else {
                devtools = false;
            }
        }, 1000);
    }
    
    handleDevToolsOpen() {
        // 检测到开发者工具打开
        console.clear();
        document.body.innerHTML = '<h1>请关闭开发者工具</h1>';
        
        // 或者重定向到警告页面
        // window.location.href = '/security-warning';
    }
    
    // 内存清理
    setupMemoryCleanup() {
        // 定期清理敏感数据
        window.addEventListener('beforeunload', () => {
            this.clearSensitiveData();
        });
        
        // 页面隐藏时清理
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.clearSensitiveData();
            }
        });
    }
    
    clearSensitiveData() {
        // 清理表单中的敏感数据
        const sensitiveInputs = document.querySelectorAll('input[type="password"], input[name*="token"], input[name*="key"]');
        sensitiveInputs.forEach(input => {
            input.value = '';
        });
        
        // 清理localStorage中的敏感数据
        const sensitiveKeys = ['authToken', 'userPassword', 'apiKey'];
        sensitiveKeys.forEach(key => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        });
    }
    
    // 安全的数据存储
    secureStore(key, value, temporary = false) {
        const storage = temporary ? sessionStorage : localStorage;
        
        // 加密存储
        const encryptedValue = btoa(JSON.stringify(value));
        storage.setItem(key, encryptedValue);
        
        // 设置过期时间
        const expiry = Date.now() + (temporary ? 30 * 60 * 1000 : 24 * 60 * 60 * 1000);
        storage.setItem(`${key}_expiry`, expiry.toString());
    }
    
    secureRetrieve(key, temporary = false) {
        const storage = temporary ? sessionStorage : localStorage;
        
        // 检查过期时间
        const expiry = storage.getItem(`${key}_expiry`);
        if (expiry && Date.now() > parseInt(expiry)) {
            storage.removeItem(key);
            storage.removeItem(`${key}_expiry`);
            return null;
        }
        
        // 解密数据
        const encryptedValue = storage.getItem(key);
        if (encryptedValue) {
            try {
                return JSON.parse(atob(encryptedValue));
            } catch (error) {
                console.error('数据解密失败:', error);
                return null;
            }
        }
        
        return null;
    }
}

// 初始化安全防护
const securityProtection = new SensitiveDataProtection();
```

## 🛠️ 安全开发最佳实践

### 安全检查清单

```javascript
// 前端安全检查清单
const SecurityChecklist = {
    // XSS防护
    xssProtection: {
        inputValidation: '✓ 所有用户输入都经过验证和过滤',
        outputEncoding: '✓ 输出时进行HTML编码',
        cspHeaders: '✓ 配置内容安全策略(CSP)',
        domPurify: '✓ 使用DOMPurify清理HTML',
        avoidInnerHTML: '✓ 避免使用innerHTML，优先使用textContent'
    },
    
    // CSRF防护
    csrfProtection: {
        csrfTokens: '✓ 实现CSRF Token验证',
        sameSiteCookies: '✓ 设置SameSite Cookie属性',
        refererValidation: '✓ 验证Referer头',
        doubleSubmit: '✓ 实现双重提交Cookie'
    },
    
    // Cookie安全
    cookieSecurity: {
        httpOnly: '✓ 敏感Cookie设置HttpOnly',
        secure: '✓ HTTPS下设置Secure标志',
        sameSite: '✓ 设置适当的SameSite属性',
        encryption: '✓ 敏感Cookie值加密存储'
    },
    
    // 其他安全措施
    otherSecurity: {
        httpsOnly: '✓ 强制使用HTTPS',
        frameProtection: '✓ 防止点击劫持',
        sensitiveDataProtection: '✓ 保护敏感信息',
        secureStorage: '✓ 安全的本地存储',
        errorHandling: '✓ 安全的错误处理'
    }
};

// 安全审计函数
function performSecurityAudit() {
    const results = [];
    
    // 检查HTTPS
    if (location.protocol !== 'https:') {
        results.push('⚠️ 网站未使用HTTPS');
    }
    
    // 检查CSP
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!cspMeta) {
        results.push('⚠️ 未设置内容安全策略(CSP)');
    }
    
    // 检查敏感表单
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.form && input.form.method.toLowerCase() !== 'post') {
            results.push('⚠️ 密码表单应使用POST方法');
        }
    });
    
    // 检查外部资源
    const externalScripts = document.querySelectorAll('script[src^="http"]');
    externalScripts.forEach(script => {
        if (!script.integrity) {
            results.push(`⚠️ 外部脚本缺少完整性检查: ${script.src}`);
        }
    });
    
    return results;
}

// 执行安全审计
console.log('安全审计结果:', performSecurityAudit());
```

## 📚 总结

前端安全是Web开发中不可忽视的重要环节，需要开发者具备全面的安全意识和防护技能：

### 🚨 主要威胁类型

- **XSS攻击**：跨站脚本攻击是最常见的前端安全威胁，分为反射型、存储型和DOM型
- **CSRF攻击**：跨站请求伪造利用用户身份执行恶意操作
- **Cookie劫持**：不安全的Cookie配置可能导致会话劫持
- **点击劫持**：通过iframe嵌套诱导用户点击恶意内容

### 🛡️ 核心防护策略

- **输入验证**：对所有用户输入进行严格的验证和过滤
- **输出编码**：在输出用户数据时进行HTML实体编码
- **CSP策略**：配置内容安全策略限制资源加载
- **安全Headers**：设置适当的HTTP安全头部

### 🍪 Cookie安全配置

- **HttpOnly**：防止JavaScript访问敏感Cookie
- **Secure**：确保Cookie只在HTTPS下传输
- **SameSite**：防止跨站请求携带Cookie
- **加密存储**：对敏感Cookie值进行加密

### 🔧 开发最佳实践

1. **安全编码**：从设计阶段就考虑安全因素
2. **定期审计**：使用自动化工具进行安全扫描
3. **依赖管理**：及时更新依赖包，修复已知漏洞
4. **错误处理**：避免在错误信息中泄露敏感信息

### 📋 安全检查清单

- ✅ 实施XSS防护措施
- ✅ 配置CSRF Token验证
- ✅ 设置安全的Cookie属性
- ✅ 启用HTTPS和安全Headers
- ✅ 实施内容安全策略
- ✅ 定期进行安全审计
