# HTML5 API

HTML5引入了许多强大的API，为Web应用提供了丰富的功能。掌握这些API能够创建出更加交互性和功能性的现代Web应用。

## 🎨 Canvas绘图API

### 基础Canvas使用

```html
<canvas id="myCanvas" width="400" height="300">
    您的浏览器不支持Canvas。
</canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = '#FF6B6B';
ctx.fillRect(10, 10, 100, 80);

// 绘制边框矩形
ctx.strokeStyle = '#4ECDC4';
ctx.lineWidth = 3;
ctx.strokeRect(130, 10, 100, 80);

// 绘制圆形
ctx.beginPath();
ctx.arc(200, 150, 40, 0, 2 * Math.PI);
ctx.fillStyle = '#45B7D1';
ctx.fill();

// 绘制线条
ctx.beginPath();
ctx.moveTo(50, 200);
ctx.lineTo(150, 250);
ctx.lineTo(250, 200);
ctx.strokeStyle = '#96CEB4';
ctx.lineWidth = 5;
ctx.stroke();

// 绘制文字
ctx.font = '20px Arial';
ctx.fillStyle = '#333';
ctx.fillText('Hello Canvas!', 50, 280);
</script>
```

### 高级Canvas功能

```html
<canvas id="advancedCanvas" width="500" height="400"></canvas>

<script>
const canvas = document.getElementById('advancedCanvas');
const ctx = canvas.getContext('2d');

// 渐变填充
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, '#FF6B6B');
gradient.addColorStop(1, '#4ECDC4');
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100);

// 阴影效果
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.fillStyle = '#45B7D1';
ctx.fillRect(250, 10, 100, 100);

// 重置阴影
ctx.shadowColor = 'transparent';

// 图像处理
const img = new Image();
img.onload = function() {
    // 绘制图像
    ctx.drawImage(img, 10, 150, 100, 100);
    
    // 获取图像数据
    const imageData = ctx.getImageData(10, 150, 100, 100);
    const data = imageData.data;
    
    // 图像滤镜（灰度）
    for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = gray;     // Red
        data[i + 1] = gray; // Green
        data[i + 2] = gray; // Blue
    }
    
    // 应用滤镜后的图像
    ctx.putImageData(imageData, 130, 150);
};
img.src = 'sample-image.jpg';

// 动画示例
let x = 250;
let dx = 2;

function animate() {
    // 清除画布
    ctx.clearRect(250, 280, 200, 50);
    
    // 绘制移动的圆
    ctx.beginPath();
    ctx.arc(x, 300, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();
    
    // 更新位置
    x += dx;
    if (x > 430 || x < 270) {
        dx = -dx;
    }
    
    requestAnimationFrame(animate);
}

animate();
</script>
```

## 🗂️ 本地存储API

### localStorage和sessionStorage

```html
<div>
    <input type="text" id="dataInput" placeholder="输入数据">
    <button onclick="saveToLocal()">保存到localStorage</button>
    <button onclick="saveToSession()">保存到sessionStorage</button>
    <button onclick="loadData()">加载数据</button>
    <button onclick="clearData()">清除数据</button>
</div>

<div id="output"></div>

<script>
// 保存到localStorage（持久存储）
function saveToLocal() {
    const data = document.getElementById('dataInput').value;
    localStorage.setItem('myData', data);
    
    // 保存对象
    const userInfo = {
        name: 'John',
        age: 30,
        preferences: ['coding', 'reading']
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    showMessage('数据已保存到localStorage');
}

// 保存到sessionStorage（会话存储）
function saveToSession() {
    const data = document.getElementById('dataInput').value;
    sessionStorage.setItem('sessionData', data);
    showMessage('数据已保存到sessionStorage');
}

// 加载数据
function loadData() {
    const localData = localStorage.getItem('myData');
    const sessionData = sessionStorage.getItem('sessionData');
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    const output = document.getElementById('output');
    output.innerHTML = `
        <h3>存储的数据：</h3>
        <p>localStorage: ${localData || '无数据'}</p>
        <p>sessionStorage: ${sessionData || '无数据'}</p>
        <p>用户信息: ${userInfo.name || '无数据'}</p>
    `;
}

// 清除数据
function clearData() {
    localStorage.removeItem('myData');
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('sessionData');
    
    // 清除所有localStorage数据
    // localStorage.clear();
    
    showMessage('数据已清除');
    loadData();
}

// 监听存储变化（只在其他标签页修改时触发）
window.addEventListener('storage', function(e) {
    console.log('存储发生变化:', e.key, e.oldValue, e.newValue);
});

function showMessage(msg) {
    const output = document.getElementById('output');
    output.innerHTML = `<p style="color: green;">${msg}</p>`;
}

// 页面加载时显示数据
loadData();
</script>
```

### IndexedDB（高级存储）

```html
<div>
    <input type="text" id="nameInput" placeholder="姓名">
    <input type="number" id="ageInput" placeholder="年龄">
    <button onclick="addUser()">添加用户</button>
    <button onclick="getUsers()">获取所有用户</button>
    <button onclick="clearUsers()">清除用户</button>
</div>

<div id="userList"></div>

<script>
let db;

// 打开数据库
const request = indexedDB.open('UserDatabase', 1);

request.onerror = function(event) {
    console.error('数据库错误:', event.target.error);
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log('数据库打开成功');
    getUsers(); // 加载现有用户
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    
    // 创建对象存储
    const objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('age', 'age', { unique: false });
    
    console.log('数据库结构创建完成');
};

// 添加用户
function addUser() {
    const name = document.getElementById('nameInput').value;
    const age = parseInt(document.getElementById('ageInput').value);
    
    if (!name || !age) {
        alert('请填写完整信息');
        return;
    }
    
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    
    const user = { name: name, age: age, createdAt: new Date() };
    const request = objectStore.add(user);
    
    request.onsuccess = function() {
        console.log('用户添加成功');
        document.getElementById('nameInput').value = '';
        document.getElementById('ageInput').value = '';
        getUsers();
    };
    
    request.onerror = function() {
        console.error('添加用户失败');
    };
}

// 获取所有用户
function getUsers() {
    const transaction = db.transaction(['users'], 'readonly');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.getAll();
    
    request.onsuccess = function() {
        const users = request.result;
        displayUsers(users);
    };
}

// 显示用户列表
function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '<h3>用户列表：</h3>';
    
    if (users.length === 0) {
        userList.innerHTML += '<p>暂无用户</p>';
        return;
    }
    
    const ul = document.createElement('ul');
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.age}岁) - ${user.createdAt.toLocaleString()}`;
        ul.appendChild(li);
    });
    
    userList.appendChild(ul);
}

// 清除所有用户
function clearUsers() {
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.clear();
    
    request.onsuccess = function() {
        console.log('所有用户已清除');
        getUsers();
    };
}
</script>
```

## 📍 地理定位API

```html
<div>
    <button onclick="getCurrentPosition()">获取当前位置</button>
    <button onclick="watchPosition()">监控位置变化</button>
    <button onclick="stopWatching()">停止监控</button>
</div>

<div id="locationInfo"></div>

<script>
let watchId;

// 获取当前位置
function getCurrentPosition() {
    if (!navigator.geolocation) {
        showLocationInfo('您的浏览器不支持地理定位');
        return;
    }
    
    const options = {
        enableHighAccuracy: true, // 高精度
        timeout: 10000,          // 超时时间
        maximumAge: 60000        // 缓存时间
    };
    
    navigator.geolocation.getCurrentPosition(
        showPosition,
        showError,
        options
    );
}

// 监控位置变化
function watchPosition() {
    if (!navigator.geolocation) {
        showLocationInfo('您的浏览器不支持地理定位');
        return;
    }
    
    watchId = navigator.geolocation.watchPosition(
        showPosition,
        showError,
        { enableHighAccuracy: true }
    );
    
    showLocationInfo('开始监控位置变化...');
}

// 停止监控
function stopWatching() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        showLocationInfo('已停止监控位置变化');
    }
}

// 显示位置信息
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const timestamp = new Date(position.timestamp);
    
    const info = `
        <h3>位置信息：</h3>
        <p>纬度: ${lat.toFixed(6)}</p>
        <p>经度: ${lon.toFixed(6)}</p>
        <p>精度: ${accuracy} 米</p>
        <p>时间: ${timestamp.toLocaleString()}</p>
        <p><a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">在地图中查看</a></p>
    `;
    
    showLocationInfo(info);
}

// 显示错误信息
function showError(error) {
    let message;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = '用户拒绝了地理定位请求';
            break;
        case error.POSITION_UNAVAILABLE:
            message = '位置信息不可用';
            break;
        case error.TIMEOUT:
            message = '获取位置信息超时';
            break;
        default:
            message = '获取位置信息时发生未知错误';
            break;
    }
    showLocationInfo(`错误: ${message}`);
}

function showLocationInfo(info) {
    document.getElementById('locationInfo').innerHTML = info;
}
</script>
```

## 🎵 Web Audio API

```html
<div>
    <button onclick="playTone()">播放音调</button>
    <button onclick="playNoise()">播放噪音</button>
    <button onclick="stopAudio()">停止</button>
    <br><br>
    <label>频率: <input type="range" id="frequency" min="200" max="800" value="440"></label>
    <label>音量: <input type="range" id="volume" min="0" max="1" step="0.1" value="0.5"></label>
</div>

<script>
let audioContext;
let oscillator;
let gainNode;

// 初始化音频上下文
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// 播放音调
function playTone() {
    initAudio();
    stopAudio(); // 停止之前的音频
    
    // 创建振荡器
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    
    // 设置参数
    const frequency = document.getElementById('frequency').value;
    const volume = document.getElementById('volume').value;
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine'; // 正弦波
    
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    
    // 连接节点
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // 开始播放
    oscillator.start();
}

// 播放噪音
function playNoise() {
    initAudio();
    stopAudio();
    
    // 创建白噪音
    const bufferSize = audioContext.sampleRate * 2; // 2秒
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // 生成随机噪音
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    // 创建音频源
    const source = audioContext.createBufferSource();
    gainNode = audioContext.createGain();
    
    source.buffer = buffer;
    source.loop = true;
    
    const volume = document.getElementById('volume').value;
    gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime); // 降低噪音音量
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.start();
    oscillator = source; // 保存引用以便停止
}

// 停止音频
function stopAudio() {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
    if (gainNode) {
        gainNode = null;
    }
}

// 实时更新参数
document.getElementById('frequency').addEventListener('input', function() {
    if (oscillator && oscillator.frequency) {
        oscillator.frequency.setValueAtTime(this.value, audioContext.currentTime);
    }
});

document.getElementById('volume').addEventListener('input', function() {
    if (gainNode) {
        gainNode.gain.setValueAtTime(this.value, audioContext.currentTime);
    }
});
</script>
```

## 📱 设备API

### 设备方向API

```html
<div id="orientationInfo">
    <h3>设备方向信息：</h3>
    <p>请在移动设备上查看效果</p>
</div>

<script>
// 监听设备方向变化
window.addEventListener('deviceorientation', function(event) {
    const alpha = event.alpha; // Z轴旋转角度
    const beta = event.beta;   // X轴旋转角度
    const gamma = event.gamma; // Y轴旋转角度
    
    const info = `
        <h3>设备方向信息：</h3>
        <p>Alpha (Z轴): ${alpha ? alpha.toFixed(2) : 'N/A'}°</p>
        <p>Beta (X轴): ${beta ? beta.toFixed(2) : 'N/A'}°</p>
        <p>Gamma (Y轴): ${gamma ? gamma.toFixed(2) : 'N/A'}°</p>
    `;
    
    document.getElementById('orientationInfo').innerHTML = info;
});

// 监听设备运动
window.addEventListener('devicemotion', function(event) {
    const acceleration = event.acceleration;
    const rotationRate = event.rotationRate;
    
    if (acceleration) {
        console.log('加速度:', {
            x: acceleration.x,
            y: acceleration.y,
            z: acceleration.z
        });
    }
    
    if (rotationRate) {
        console.log('旋转速率:', {
            alpha: rotationRate.alpha,
            beta: rotationRate.beta,
            gamma: rotationRate.gamma
        });
    }
});
</script>
```

### 振动API

```html
<div>
    <button onclick="vibrateShort()">短振动</button>
    <button onclick="vibrateLong()">长振动</button>
    <button onclick="vibratePattern()">振动模式</button>
    <button onclick="stopVibration()">停止振动</button>
</div>

<script>
// 检查振动API支持
if (!navigator.vibrate) {
    console.log('您的设备不支持振动API');
}

// 短振动
function vibrateShort() {
    navigator.vibrate(200); // 振动200毫秒
}

// 长振动
function vibrateLong() {
    navigator.vibrate(1000); // 振动1秒
}

// 振动模式
function vibratePattern() {
    // 振动模式：振动-暂停-振动-暂停...
    navigator.vibrate([200, 100, 200, 100, 200]);
}

// 停止振动
function stopVibration() {
    navigator.vibrate(0);
}
</script>
```

## 🔔 通知API

```html
<div>
    <button onclick="requestPermission()">请求通知权限</button>
    <button onclick="showNotification()">显示通知</button>
    <button onclick="showRichNotification()">显示富通知</button>
</div>

<script>
// 请求通知权限
async function requestPermission() {
    if (!('Notification' in window)) {
        alert('您的浏览器不支持通知API');
        return;
    }
    
    const permission = await Notification.requestPermission();
    console.log('通知权限:', permission);
}

// 显示简单通知
function showNotification() {
    if (Notification.permission === 'granted') {
        new Notification('Hello!', {
            body: '这是一个简单的通知',
            icon: '/favicon.ico'
        });
    } else {
        alert('请先授予通知权限');
    }
}

// 显示富通知
function showRichNotification() {
    if (Notification.permission === 'granted') {
        const notification = new Notification('新消息', {
            body: '您有一条新的消息需要查看',
            icon: '/favicon.ico',
            badge: '/badge.png',
            tag: 'message-notification',
            requireInteraction: true,
            actions: [
                {
                    action: 'view',
                    title: '查看',
                    icon: '/view-icon.png'
                },
                {
                    action: 'dismiss',
                    title: '忽略',
                    icon: '/dismiss-icon.png'
                }
            ]
        });
        
        // 监听通知事件
        notification.onclick = function() {
            console.log('通知被点击');
            window.focus();
            notification.close();
        };
        
        notification.onclose = function() {
            console.log('通知被关闭');
        };
        
        // 自动关闭通知
        setTimeout(() => {
            notification.close();
        }, 5000);
    } else {
        alert('请先授予通知权限');
    }
}
</script>
```

HTML5 API为Web应用提供了丰富的功能，让网页应用能够实现接近原生应用的体验。掌握这些API的使用，能够创建出功能强大的现代Web应用。
