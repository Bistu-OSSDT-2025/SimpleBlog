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
          @click="goToPost(post.id)"
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
          :class="{ active: activeCategory === category.name }"
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
          :class="{ active: activeTag === tag.name }"
        >
          {{ tag.name }}
        </span>
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
          :class="{ active: activeArchive === archive.period }"
        >
          <span class="archive-period">{{ archive.period }}</span>
          <span class="archive-count">{{ archive.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['search', 'filter-category', 'filter-tag', 'filter-archive'])
const router = useRouter()

const searchQuery = ref('')
const activeCategory = ref('')
const activeTag = ref('')
const activeArchive = ref('')

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

const archives = ref([
  { period: '2025年7月', count: 3 },
  { period: '2025年6月', count: 8 },
  { period: '2025年5月', count: 6 },
  { period: '2025年4月', count: 5 },
])

const searchPosts = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
    resetFilters()
  }
}

const filterByCategory = (category) => {
  activeCategory.value = category
  activeTag.value = ''
  activeArchive.value = ''
  emit('filter-category', category)
}

const filterByTag = (tag) => {
  activeTag.value = tag
  activeCategory.value = ''
  activeArchive.value = ''
  emit('filter-tag', tag)
}

const filterByArchive = (period) => {
  activeArchive.value = period
  activeCategory.value = ''
  activeTag.value = ''
  emit('filter-archive', period)
}

const resetFilters = () => {
  activeCategory.value = ''
  activeTag.value = ''
  activeArchive.value = ''
}

const goToPost = (postId) => {
  router.push(`/post/${postId}`)
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
/* Add active state styles */
.category-item.active,
.tag.active,
.archive-item.active {
  color: #007bff;
  font-weight: 600;
}

.category-item.active .category-count,
.archive-item.active .archive-count {
  background: #007bff;
  color: white;
}

.tag.active {
  background: #007bff;
  color: white;
}
</style>