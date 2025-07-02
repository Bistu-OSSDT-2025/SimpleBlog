<template>
  <div class="sidebar">
    <!-- 搜索框 -->
    <div class="sidebar-section">
      <h3>搜索文章</h3>
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="输入关键词..."
          @keyup.enter="searchPosts"
        />
        <button @click="searchPosts" class="search-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 热门文章 -->
    <div class="sidebar-section">
      <h3>热门文章</h3>
      <div class="popular-posts">
        <div
          v-for="post in popularPosts"
          :key="post.id"
          class="popular-post"
          @click="$router.push(`/post/${post.id}`)"
        >
          <div class="popular-post-content">
            <h4>{{ post.title }}</h4>
            <div class="popular-post-meta">
              <span class="views">{{ post.views }} 阅读</span>
              <span class="date">{{ formatDate(post.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类 -->
    <div class="sidebar-section">
      <h3>文章分类</h3>
      <div class="categories">
        <div
          v-for="category in categories"
          :key="category.name"
          class="category-item"
          @click="filterByCategory(category.name)"
        >
          <span class="category-name">{{ category.name }}</span>
          <span class="category-count">{{ category.count }}</span>
        </div>
      </div>
    </div>

    <!-- 标签云 -->
    <div class="sidebar-section">
      <h3>热门标签</h3>
      <div class="tags">
        <span
          v-for="tag in tags"
          :key="tag.name"
          class="tag"
          :style="{ fontSize: getTagSize(tag.count) }"
          @click="filterByTag(tag.name)"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>

    <!-- 最近评论 -->
    <div class="sidebar-section">
      <h3>最新评论</h3>
      <div class="recent-comments">
        <div v-for="comment in recentComments" :key="comment.id" class="comment-item">
          <div class="comment-avatar">
            <img :src="comment.avatar" :alt="comment.author" />
          </div>
          <div class="comment-content">
            <p class="comment-text">{{ comment.text }}</p>
            <div class="comment-meta">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{ formatDate(comment.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 归档 -->
    <div class="sidebar-section">
      <h3>文章归档</h3>
      <div class="archives">
        <div
          v-for="archive in archives"
          :key="archive.period"
          class="archive-item"
          @click="filterByArchive(archive.period)"
        >
          <span class="archive-period">{{ archive.period }}</span>
          <span class="archive-count">{{ archive.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

// 模拟数据
const popularPosts = ref([
  { id: 6, title: 'React vs Vue 2025年对比', views: 2100, date: '2025-06-18' },
  { id: 3, title: 'CSS Grid 布局完整指南', views: 1456, date: '2025-06-25' },
  { id: 1, title: 'Vue 3 Composition API 详解', views: 1250, date: '2025-07-01' },
  { id: 5, title: 'TypeScript 进阶类型系统', views: 1120, date: '2025-06-20' },
])

const categories = ref([
  { name: 'JavaScript', count: 15 },
  { name: 'Vue.js', count: 12 },
  { name: 'CSS', count: 8 },
  { name: 'Node.js', count: 6 },
  { name: 'TypeScript', count: 10 },
  { name: '前端框架', count: 9 },
])

const tags = ref([
  { name: 'Vue3', count: 20 },
  { name: 'JavaScript', count: 25 },
  { name: 'CSS', count: 15 },
  { name: 'TypeScript', count: 18 },
  { name: 'Node.js', count: 12 },
  { name: 'React', count: 16 },
  { name: '性能优化', count: 8 },
  { name: '前端开发', count: 30 },
])

const recentComments = ref([
  {
    id: 1,
    author: '张三',
    text: '这篇文章写得很详细，对我帮助很大！',
    date: '2025-07-02',
    avatar: 'https://dummyimage.com/40x40/007bff/ffffff?text=张',
  },
  {
    id: 2,
    author: '李四',
    text: '请问有没有更多的实例代码？',
    date: '2025-07-01',
    avatar: 'https://dummyimage.com/40x40/28a745/ffffff?text=李',
  },
  {
    id: 3,
    author: '王五',
    text: '感谢分享，学到了很多新知识。',
    date: '2025-06-30',
    avatar: 'https://dummyimage.com/40x40/dc3545/ffffff?text=王',
  },
])

const archives = ref([
  { period: '2025年7月', count: 3 },
  { period: '2025年6月', count: 8 },
  { period: '2025年5月', count: 6 },
  { period: '2025年4月', count: 5 },
])

const searchPosts = () => {
  if (searchQuery.value.trim()) {
    console.log('搜索:', searchQuery.value)
    // 这里可以实现搜索功能
  }
}

const filterByCategory = (category) => {
  console.log('按分类筛选:', category)
  // 这里可以实现分类筛选功能
}

const filterByTag = (tag) => {
  console.log('按标签筛选:', tag)
  // 这里可以实现标签筛选功能
}

const filterByArchive = (period) => {
  console.log('按时间筛选:', period)
  // 这里可以实现时间筛选功能
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
  })
}

const getTagSize = (count) => {
  const baseSize = 0.8
  const maxSize = 1.2
  const maxCount = Math.max(...tags.value.map((t) => t.count))
  const size = baseSize + (count / maxCount) * (maxSize - baseSize)
  return `${size}rem`
}
</script>

<style scoped>
.sidebar {
  background: white;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar-section {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.sidebar-section:last-child {
  border-bottom: none;
}

.sidebar-section h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

/* 搜索框 */
.search-box {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.search-box input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

.search-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover {
  background: #0056b3;
}

/* 热门文章 */
.popular-post {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.popular-post:last-child {
  border-bottom: none;
}

.popular-post:hover {
  background-color: #f8f9fa;
}

.popular-post h4 {
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #333;
  line-height: 1.4;
}

.popular-post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}

/* 分类 */
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.category-item:hover {
  color: #007bff;
}

.category-count {
  background: #f8f9fa;
  color: #666;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.8rem;
}

/* 标签云 */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f8f9fa;
  color: #666;
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.tag:hover {
  background: #007bff;
  color: white;
}

/* 最近评论 */
.comment-item {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-avatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.comment-content {
  flex: 1;
}

.comment-text {
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 5px;
  color: #333;
}

.comment-meta {
  display: flex;
  gap: 10px;
  font-size: 0.7rem;
  color: #666;
}

/* 归档 */
.archive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.archive-item:hover {
  color: #007bff;
}

.archive-count {
  background: #f8f9fa;
  color: #666;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .sidebar {
    margin-top: 20px;
  }
}
</style>
