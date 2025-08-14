# 表单与交互

HTML表单是网页与用户交互的重要方式，掌握表单元素和验证机制是前端开发的基础技能。

## 🎯 表单基础结构

### 基本表单结构

```html
<form action="/submit" method="POST" enctype="multipart/form-data">
    <!-- 表单内容 -->
    <input type="submit" value="提交">
</form>
```

**form属性说明：**
- `action`：表单提交的目标URL
- `method`：提交方式（GET/POST）
- `enctype`：编码类型（文件上传时使用multipart/form-data）
- `target`：提交结果显示位置
- `novalidate`：禁用浏览器默认验证

## 📝 常用表单元素

### 输入框（input）

```html
<!-- 文本输入 -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username" 
       placeholder="请输入用户名" 
       required 
       minlength="3" 
       maxlength="20">

<!-- 密码输入 -->
<label for="password">密码：</label>
<input type="password" id="password" name="password" 
       required 
       minlength="8">

<!-- 邮箱输入 -->
<label for="email">邮箱：</label>
<input type="email" id="email" name="email" 
       placeholder="example@email.com" 
       required>

<!-- 数字输入 -->
<label for="age">年龄：</label>
<input type="number" id="age" name="age" 
       min="18" 
       max="100" 
       step="1">

<!-- 日期输入 -->
<label for="birthday">生日：</label>
<input type="date" id="birthday" name="birthday">

<!-- 时间输入 -->
<label for="time">时间：</label>
<input type="time" id="time" name="time">

<!-- 颜色选择 -->
<label for="color">喜欢的颜色：</label>
<input type="color" id="color" name="color" value="#ff0000">

<!-- 范围滑块 -->
<label for="volume">音量：</label>
<input type="range" id="volume" name="volume" 
       min="0" max="100" value="50">
<output for="volume">50</output>

<!-- 搜索框 -->
<label for="search">搜索：</label>
<input type="search" id="search" name="search" 
       placeholder="输入搜索关键词">

<!-- URL输入 -->
<label for="website">网站：</label>
<input type="url" id="website" name="website" 
       placeholder="https://example.com">

<!-- 电话输入 -->
<label for="phone">电话：</label>
<input type="tel" id="phone" name="phone" 
       placeholder="138-0000-0000">
```

### 文件上传

```html
<!-- 单文件上传 -->
<label for="avatar">头像：</label>
<input type="file" id="avatar" name="avatar" 
       accept="image/*">

<!-- 多文件上传 -->
<label for="photos">照片：</label>
<input type="file" id="photos" name="photos" 
       accept="image/*" 
       multiple>

<!-- 指定文件类型 -->
<label for="document">文档：</label>
<input type="file" id="document" name="document" 
       accept=".pdf,.doc,.docx">
```

### 选择框（select）

```html
<!-- 单选下拉框 -->
<label for="city">城市：</label>
<select id="city" name="city" required>
    <option value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
    <option value="shenzhen" selected>深圳</option>
</select>

<!-- 多选下拉框 -->
<label for="skills">技能：</label>
<select id="skills" name="skills" multiple size="4">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
</select>

<!-- 分组选项 -->
<label for="country">国家：</label>
<select id="country" name="country">
    <optgroup label="亚洲">
        <option value="china">中国</option>
        <option value="japan">日本</option>
        <option value="korea">韩国</option>
    </optgroup>
    <optgroup label="欧洲">
        <option value="uk">英国</option>
        <option value="france">法国</option>
        <option value="germany">德国</option>
    </optgroup>
</select>
```

### 多行文本（textarea）

```html
<label for="bio">个人简介：</label>
<textarea id="bio" name="bio" 
          rows="4" 
          cols="50" 
          placeholder="请输入个人简介"
          maxlength="500"></textarea>
```

### 单选框和复选框

```html
<!-- 单选框 -->
<fieldset>
    <legend>性别：</legend>
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">男</label>
    
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">女</label>
    
    <input type="radio" id="other" name="gender" value="other">
    <label for="other">其他</label>
</fieldset>

<!-- 复选框 -->
<fieldset>
    <legend>兴趣爱好：</legend>
    <input type="checkbox" id="reading" name="hobbies" value="reading">
    <label for="reading">阅读</label>
    
    <input type="checkbox" id="music" name="hobbies" value="music">
    <label for="music">音乐</label>
    
    <input type="checkbox" id="sports" name="hobbies" value="sports">
    <label for="sports">运动</label>
</fieldset>

<!-- 单个复选框 -->
<input type="checkbox" id="agree" name="agree" required>
<label for="agree">我同意<a href="/terms">用户协议</a></label>
```

## ✅ 表单验证

### HTML5内置验证

```html
<form novalidate> <!-- 可选：禁用浏览器默认验证 -->
    <!-- 必填验证 -->
    <input type="text" name="username" required>
    
    <!-- 长度验证 -->
    <input type="text" name="password" 
           minlength="8" maxlength="20" required>
    
    <!-- 数值范围验证 -->
    <input type="number" name="age" 
           min="18" max="100" required>
    
    <!-- 正则表达式验证 -->
    <input type="text" name="phone" 
           pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" 
           title="请输入格式：138-0000-0000"
           required>
    
    <!-- 自定义验证消息 -->
    <input type="email" name="email" 
           required 
           oninvalid="this.setCustomValidity('请输入有效的邮箱地址')"
           oninput="this.setCustomValidity('')">
</form>
```

### JavaScript自定义验证

```html
<form id="registrationForm">
    <div class="form-group">
        <label for="username">用户名：</label>
        <input type="text" id="username" name="username" required>
        <span class="error-message" id="usernameError"></span>
    </div>
    
    <div class="form-group">
        <label for="password">密码：</label>
        <input type="password" id="password" name="password" required>
        <span class="error-message" id="passwordError"></span>
    </div>
    
    <div class="form-group">
        <label for="confirmPassword">确认密码：</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required>
        <span class="error-message" id="confirmPasswordError"></span>
    </div>
    
    <button type="submit">注册</button>
</form>

<script>
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    let isValid = true;
    
    // 清除之前的错误消息
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // 用户名验证
    if (username.length < 3) {
        document.getElementById('usernameError').textContent = '用户名至少3个字符';
        isValid = false;
    }
    
    // 密码验证
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = '密码至少8个字符';
        isValid = false;
    }
    
    // 确认密码验证
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = '两次密码输入不一致';
        isValid = false;
    }
    
    if (isValid) {
        // 提交表单
        console.log('表单验证通过，可以提交');
        // this.submit(); // 实际提交
    }
});

// 实时验证
document.getElementById('username').addEventListener('input', function() {
    const username = this.value;
    const errorElement = document.getElementById('usernameError');
    
    if (username.length > 0 && username.length < 3) {
        errorElement.textContent = '用户名至少3个字符';
    } else {
        errorElement.textContent = '';
    }
});
</script>
```

## 🎨 表单样式优化

### 基础表单样式

```css
/* 表单容器 */
.form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
}

/* 表单组 */
.form-group {
    margin-bottom: 20px;
}

/* 标签样式 */
label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

/* 输入框样式 */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="tel"],
input[type="url"],
select,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* 错误状态 */
input.error,
select.error,
textarea.error {
    border-color: #dc3545;
}

.error-message {
    color: #dc3545;
    font-size: 14px;
    margin-top: 5px;
    display: block;
}

/* 按钮样式 */
button[type="submit"] {
    background: #007bff;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
    background: #0056b3;
}

button[type="submit"]:disabled {
    background: #6c757d;
    cursor: not-allowed;
}

/* 单选框和复选框样式 */
.radio-group,
.checkbox-group {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

input[type="radio"],
input[type="checkbox"] {
    margin-right: 5px;
}
```

## 🚀 高级表单功能

### 表单数据处理

```javascript
// 获取表单数据
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // 处理多选值
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    return data;
}

// 使用示例
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = getFormData(this);
    console.log('表单数据：', data);
});
```

### 动态表单

```html
<div id="dynamicForm">
    <h3>联系人信息</h3>
    <div id="contactList">
        <div class="contact-item">
            <input type="text" name="contacts[0][name]" placeholder="姓名">
            <input type="tel" name="contacts[0][phone]" placeholder="电话">
            <button type="button" onclick="removeContact(this)">删除</button>
        </div>
    </div>
    <button type="button" onclick="addContact()">添加联系人</button>
</div>

<script>
let contactIndex = 1;

function addContact() {
    const contactList = document.getElementById('contactList');
    const contactItem = document.createElement('div');
    contactItem.className = 'contact-item';
    contactItem.innerHTML = `
        <input type="text" name="contacts[${contactIndex}][name]" placeholder="姓名">
        <input type="tel" name="contacts[${contactIndex}][phone]" placeholder="电话">
        <button type="button" onclick="removeContact(this)">删除</button>
    `;
    contactList.appendChild(contactItem);
    contactIndex++;
}

function removeContact(button) {
    button.parentElement.remove();
}
</script>
```

表单是用户与网站交互的重要桥梁，掌握表单的各种元素和验证机制，能够创建出用户友好的交互界面。
