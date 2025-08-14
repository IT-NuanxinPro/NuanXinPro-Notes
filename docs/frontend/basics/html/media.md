# 多媒体与嵌入

现代网页中多媒体内容是提升用户体验的重要元素。掌握图片、音视频和其他嵌入内容的处理技巧是前端开发的必备技能。

## 🖼️ 图片处理

### 基础图片标签

```html
<!-- 基本图片 -->
<img src="image.jpg" alt="图片描述" width="300" height="200">

<!-- 响应式图片 -->
<img src="image.jpg" alt="图片描述" style="max-width: 100%; height: auto;">
```

### 响应式图片

```html
<!-- 使用srcset提供不同分辨率 -->
<img src="image-400.jpg" 
     srcset="image-400.jpg 400w,
             image-800.jpg 800w,
             image-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1000px) 800px,
            1200px"
     alt="响应式图片">

<!-- 使用picture元素 -->
<picture>
    <!-- WebP格式（现代浏览器） -->
    <source srcset="image.webp" type="image/webp">
    <!-- AVIF格式（最新浏览器） -->
    <source srcset="image.avif" type="image/avif">
    <!-- 不同屏幕尺寸 -->
    <source media="(min-width: 800px)" srcset="image-large.jpg">
    <source media="(min-width: 400px)" srcset="image-medium.jpg">
    <!-- 后备图片 -->
    <img src="image-small.jpg" alt="图片描述">
</picture>
```

### 图片懒加载

```html
<!-- 原生懒加载 -->
<img src="image.jpg" alt="图片描述" loading="lazy">

<!-- 使用占位符的懒加载 -->
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     alt="图片描述" 
     class="lazy-image">

<script>
// Intersection Observer 懒加载实现
const lazyImages = document.querySelectorAll('.lazy-image');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
</script>
```

### 图片优化技巧

```html
<!-- 预加载关键图片 -->
<link rel="preload" as="image" href="hero-image.jpg">

<!-- 图片映射 -->
<img src="map.jpg" alt="世界地图" usemap="#worldmap">
<map name="worldmap">
    <area shape="rect" coords="0,0,100,100" href="asia.html" alt="亚洲">
    <area shape="circle" coords="200,200,50" href="europe.html" alt="欧洲">
    <area shape="poly" coords="300,300,400,350,350,400" href="africa.html" alt="非洲">
</map>
```

## 🎵 音频处理

### 基础音频标签

```html
<!-- 基本音频播放器 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <source src="audio.wav" type="audio/wav">
    您的浏览器不支持音频播放。
</audio>

<!-- 自动播放（注意：大多数浏览器会阻止自动播放） -->
<audio controls autoplay muted>
    <source src="background-music.mp3" type="audio/mpeg">
</audio>

<!-- 循环播放 -->
<audio controls loop>
    <source src="loop-sound.mp3" type="audio/mpeg">
</audio>

<!-- 预加载设置 -->
<audio controls preload="metadata">
    <source src="podcast.mp3" type="audio/mpeg">
</audio>
```

### 自定义音频控制

```html
<div class="custom-audio-player">
    <audio id="audioPlayer">
        <source src="music.mp3" type="audio/mpeg">
    </audio>
    
    <div class="controls">
        <button id="playPauseBtn">播放</button>
        <input type="range" id="progressBar" min="0" max="100" value="0">
        <span id="currentTime">0:00</span> / <span id="duration">0:00</span>
        <input type="range" id="volumeControl" min="0" max="1" step="0.1" value="1">
    </div>
</div>

<script>
const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const volumeControl = document.getElementById('volumeControl');

// 播放/暂停控制
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '暂停';
    } else {
        audio.pause();
        playPauseBtn.textContent = '播放';
    }
});

// 更新进度条
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
});

// 设置总时长
audio.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audio.duration);
});

// 进度条控制
progressBar.addEventListener('input', () => {
    const time = (progressBar.value / 100) * audio.duration;
    audio.currentTime = time;
});

// 音量控制
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// 时间格式化
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
</script>
```

## 🎬 视频处理

### 基础视频标签

```html
<!-- 基本视频播放器 -->
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogg" type="video/ogg">
    您的浏览器不支持视频播放。
</video>

<!-- 带海报图的视频 -->
<video controls poster="video-poster.jpg" width="640" height="360">
    <source src="video.mp4" type="video/mp4">
</video>

<!-- 响应式视频 -->
<video controls style="width: 100%; height: auto;">
    <source src="video.mp4" type="video/mp4">
</video>
```

## 🔗 内容嵌入

### iframe嵌入

```html
<!-- 基本iframe -->
<iframe src="https://example.com" 
        width="800" 
        height="600" 
        title="嵌入内容">
</iframe>

<!-- 安全的iframe -->
<iframe src="https://trusted-site.com" 
        width="100%" 
        height="400"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        title="安全嵌入内容">
</iframe>

<!-- YouTube视频嵌入 -->
<iframe width="560" 
        height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>

<!-- 响应式iframe -->
<div class="iframe-container">
    <iframe src="https://example.com" 
            title="响应式嵌入内容">
    </iframe>
</div>

<style>
.iframe-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 宽高比 */
}

.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>
```

### embed和object

```html
<!-- embed标签（用于插件内容） -->
<embed src="document.pdf" 
       type="application/pdf" 
       width="800" 
       height="600">

<!-- object标签（更通用的嵌入） -->
<object data="flash-content.swf" 
        type="application/x-shockwave-flash" 
        width="400" 
        height="300">
    <param name="movie" value="flash-content.swf">
    <p>您的浏览器不支持Flash内容。</p>
</object>
```

## 🎨 多媒体样式优化

### 图片样式

```css
/* 图片基础样式 */
img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* 图片滤镜效果 */
.image-filter {
    filter: brightness(1.2) contrast(1.1) saturate(1.3);
    transition: filter 0.3s ease;
}

.image-filter:hover {
    filter: brightness(1) contrast(1) saturate(1);
}

/* 图片遮罩效果 */
.image-overlay {
    position: relative;
    overflow: hidden;
}

.image-overlay::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-overlay:hover::after {
    opacity: 1;
}
```

### 视频样式

```css
/* 响应式视频容器 */
.video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 */
    overflow: hidden;
}

.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 自定义视频控制栏 */
.custom-video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.custom-video-controls button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px 10px;
}

.custom-video-controls input[type="range"] {
    flex: 1;
    margin: 0 10px;
}
```

## 🚀 性能优化

### 图片优化

```html
<!-- 使用适当的图片格式 -->
<picture>
    <source srcset="image.avif" type="image/avif">
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="优化后的图片">
</picture>

<!-- 关键图片预加载 -->
<link rel="preload" as="image" href="hero-image.jpg">

<!-- 非关键图片懒加载 -->
<img src="placeholder.jpg" data-src="image.jpg" loading="lazy" alt="懒加载图片">
```

### 视频优化

```html
<!-- 视频预加载控制 -->
<video controls preload="none" poster="video-poster.jpg">
    <source src="video.mp4" type="video/mp4">
</video>

<!-- 自适应码率 -->
<video controls>
    <source src="video-1080p.mp4" type="video/mp4" media="(min-width: 1200px)">
    <source src="video-720p.mp4" type="video/mp4" media="(min-width: 800px)">
    <source src="video-480p.mp4" type="video/mp4">
</video>
```

### JavaScript优化

```javascript
// 图片懒加载优化
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // 创建新图片对象预加载
            const newImg = new Image();
            newImg.onload = () => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            };
            newImg.src = img.dataset.src;
            
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px' // 提前50px开始加载
});

// 视频自动暂停（节省带宽）
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.play();
        } else {
            video.pause();
        }
    });
});

document.querySelectorAll('video[autoplay]').forEach(video => {
    videoObserver.observe(video);
});
```

掌握多媒体内容的处理技巧，能够创建出丰富、高性能的用户体验，同时确保内容在各种设备和网络条件下都能良好展示。
