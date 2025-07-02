<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const darkMode = ref(false)

onMounted(() => {
  // 初始化主题检查
  const savedMode = localStorage.getItem('darkMode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  darkMode.value = savedMode !== null ? savedMode === 'true' : prefersDark
  applyTheme(darkMode.value)
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('darkMode') === null) {
      darkMode.value = e.matches
      applyTheme(darkMode.value)
    }
  })
})

const applyTheme = (isDark) => {
  document.documentElement.classList.toggle('dark', isDark)
  document.body.classList.toggle('dark-mode', isDark)
}

const toggleTheme = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('darkMode', darkMode.value)
  applyTheme(darkMode.value)
}
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <!-- 固定在右上角的主题切换按钮 -->
      <button 
        class="theme-toggle" 
        @click="toggleTheme" 
        :aria-label="darkMode ? '切换到亮色模式' : '切换到暗色模式'"
        :title="darkMode ? '切换到亮色模式' : '切换到暗色模式'"
      >
        <span class="theme-icon">{{ darkMode ? '☀️' : '🌙' }}</span>
        <span class="theme-text">{{ darkMode ? '日间模式' : '夜间模式' }}</span>
      </button>
      
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
/* ===== 基础重置 ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== 全局过渡效果 ===== */
html,
body,
body *:not(.theme-toggle, .theme-toggle *, .no-transition, .no-transition *) {
  transition: 
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* ===== 文档结构 ===== */
html {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background-color: #f8f9fa;
  color: #212529;
}

/* ===== 暗色模式 ===== */
body.dark-mode {
  background-color: #121212;
  color: #f8f9fa;
}

body.dark-mode .main-content {
  background-color: #1a1a1a;
}

/* ===== 应用容器 ===== */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* ===== 主要内容区域 ===== */
.main-content {
  flex: 1;
  width: 100%;
  padding: 20px;
  background-color: inherit;
}

/* ===== 主题切换按钮 ===== */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #ffffff;
  color: #212529;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  z-index: 9999; /* 确保最高层级 */
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.theme-icon {
  font-size: 1.2em;
}

.theme-text {
  font-weight: 500;
}

/* 暗色模式下的按钮样式 */
body.dark-mode .theme-toggle {
  background-color: #2d3748;
  color: #f8f9fa;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
}

body.dark-mode .theme-toggle:hover {
  background-color: #4a5568;
}

/* ===== 响应式设计 ===== */
@media (max-width: 768px) {
  .theme-toggle {
    top: 15px;
    right: 15px;
    padding: 8px 12px;
    font-size: 0.9rem;
  }
  
  .theme-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .theme-toggle {
    padding: 8px;
    width: 40px;
    height: 40px;
    justify-content: center;
  }
}
</style>