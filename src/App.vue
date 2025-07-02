<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

// 主题状态管理
const darkMode = ref(false)

// 初始化时检查本地存储和系统偏好
onMounted(() => {
  // 从localStorage读取用户偏好
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    darkMode.value = savedMode === 'true'
  } else {
    // 如果没有设置过，则根据系统偏好设置
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    darkMode.value = prefersDark
  }
  applyTheme(darkMode.value)
})

// 应用主题样式
const applyTheme = (isDark) => {
  document.documentElement.classList.toggle('dark', isDark)
}

// 切换主题
const toggleTheme = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('darkMode', darkMode.value)
  applyTheme(darkMode.value)
}
</script>

<template>
  <div id="app" :class="{ 'dark-mode': darkMode }">
    <Navbar />
    <main class="main-content">
      <!-- 浮动切换按钮 -->
      <button class="theme-toggle" @click="toggleTheme" :title="darkMode ? '切换到亮色模式' : '切换到暗色模式'">
        {{ darkMode ? '☀️' : '🌙' }}
        <span class="theme-text">{{ darkMode ? '日间模式' : '夜间模式' }}</span>
      </button>
      
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-primary, #333);
  background-color: var(--bg-primary, #f8f9fa);
}

#app.dark-mode {
  --text-primary: #f0f0f0;
  --bg-primary: #121212;
  --button-bg: #333;
  --button-text: #f0f0f0;
  --button-hover: #444;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  position: relative;
}

/* 切换按钮样式 */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 12px;
  background-color: var(--button-bg, #f0f0f0);
  color: var(--button-text, #333);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}

.theme-toggle:hover {
  background-color: var(--button-hover, #e0e0e0);
}

.theme-text {
  margin-left: 5px;
}

/* 暗色模式下的其他元素样式 */
.dark-mode .main-content {
  background-color: var(--bg-secondary, #1e1e1e);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .theme-toggle {
    top: 15px;
    right: 15px;
    padding: 6px 10px;
    font-size: 14px;
  }
  
  .theme-text {
    display: none;
  }
}
</style>