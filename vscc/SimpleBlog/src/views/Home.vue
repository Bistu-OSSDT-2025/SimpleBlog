<template>
  <div class="home-container">
    <div class="main-content">
      <div class="posts-container">
        <h1 v-if="activeFilter">{{ activeFilter }}的文章</h1>
        <h1 v-else>最新文章</h1>
        
        <div v-if="filteredPosts.length > 0">
          <PostCard
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            @click="goToPost(post.id)"
          />
        </div>
        <div v-else class="no-results">
          <p>没有找到符合条件的文章</p>
        </div>
      </div>
      
      <Sidebar
        @search="handleSearch"
        @filter-category="handleCategoryFilter"
        @filter-tag="handleTagFilter"
        @filter-archive="handleArchiveFilter"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import PostCard from '@/components/PostCard.vue'

const router = useRouter()

// Sample blog posts data
const posts = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 详解',
    excerpt: '深入探讨Vue 3的Composition API及其优势',
    date: '2025-07-01',
    views: 1250,
    category: 'Vue.js',
    tags: ['Vue3', '前端框架'],
    content: '...'
  },
  {
    id: 2,
    title: 'JavaScript ES2025 新特性',
    excerpt: '了解即将到来的JavaScript新特性',
    date: '2025-06-28',
    views: 980,
    category: 'JavaScript',
    tags: ['JavaScript', 'ES6'],
    content: '...'
  },
  // Add more posts...
])

const searchTerm = ref('')
const activeCategory = ref('')
const activeTag = ref('')
const activeArchive = ref('')

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    // Search filter
    const matchesSearch = searchTerm.value === '' || 
      post.title.toLowerCase().includes(searchTerm.value.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.value.toLowerCase())
    
    // Category filter
    const matchesCategory = activeCategory.value === '' || 
      post.category === activeCategory.value
    
    // Tag filter
    const matchesTag = activeTag.value === '' || 
      post.tags.includes(activeTag.value)
    
    // Archive filter (simplified - would need proper date parsing in real app)
    const matchesArchive = activeArchive.value === '' || 
      post.date.includes(activeArchive.value.replace('年', '-').replace('月', ''))
    
    return matchesSearch && matchesCategory && matchesTag && matchesArchive
  })
})

const activeFilter = computed(() => {
  if (activeCategory.value) return activeCategory.value
  if (activeTag.value) return `#${activeTag.value}`
  if (activeArchive.value) return activeArchive.value
  if (searchTerm.value) return `搜索: ${searchTerm.value}`
  return ''
})

const handleSearch = (term) => {
  searchTerm.value = term
  activeCategory.value = ''
  activeTag.value = ''
  activeArchive.value = ''
}

const handleCategoryFilter = (category) => {
  activeCategory.value = category
  searchTerm.value = ''
  activeTag.value = ''
  activeArchive.value = ''
}

const handleTagFilter = (tag) => {
  activeTag.value = tag
  searchTerm.value = ''
  activeCategory.value = ''
  activeArchive.value = ''
}

const handleArchiveFilter = (period) => {
  activeArchive.value = period
  searchTerm.value = ''
  activeCategory.value = ''
  activeTag.value = ''
}

const goToPost = (postId) => {
  router.push(`/post/${postId}`)
}
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  display: flex;
  gap: 30px;
}

.posts-container {
  flex: 1;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}
</style>