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
          @keyup.enter="handleSearch"
        />
        <button @click="handleSearch" class="search-btn">
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
import { ref, onMounted } from 'vue'
import {
  getPopularPosts,
  getCategories,
  getTags,
  getArchives,
  getRecentComments,
  searchPosts as searchPostsAPI,
} from '../api.js'

const searchQuery = ref('')

// Dynamic data from API
const popularPosts = ref([])
const categories = ref([])
const tags = ref([])
const recentComments = ref([])
const archives = ref([])

onMounted(async () => {
  // Load all sidebar data from API
  popularPosts.value = await getPopularPosts(4)
  categories.value = await getCategories()
  tags.value = await getTags()
  archives.value = await getArchives()
  recentComments.value = await getRecentComments(3)
})

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    // You can use searchPostsAPI here if needed
    const results = await searchPostsAPI(searchQuery.value)
    console.log('搜索结果:', results)
    // You can implement search navigation here
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
  transition: background-color 0.3s ease;
}

/* 暗色模式下的背景颜色 */
body.dark-mode .sidebar {
  background: rgb(33, 32, 32);
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
  transition: color 0.3s ease;
}

/* 暗色模式下的文字颜色 */
body.dark-mode .sidebar-section h3 {
  color: white;
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
