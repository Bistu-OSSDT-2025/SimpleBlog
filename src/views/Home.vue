<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>欢迎来到 SimpleBlog</h1>
        <p>分享技术见解，记录学习历程</p>
      </div>
    </section>

    <div class="container">
      <div class="content-wrapper">
        <main class="blog-posts">
          <h2>最新文章</h2>
          <div class="posts-grid">
            <article
              v-for="post in posts"
              :key="post.id"
              class="post-card"
              @click="goToPost(post.id)"
            >
              <div class="post-image">
                <img :src="post.image" :alt="post.title" />
              </div>
              <div class="post-content">
                <div class="post-meta">
                  <span class="post-date">{{ formatDate(post.date) }}</span>
                  <span class="post-category">{{ post.category }}</span>
                </div>
                <h3 class="post-title">{{ post.title }}</h3>
                <p class="post-excerpt">{{ post.excerpt }}</p>
                <div class="post-footer">
                  <span class="read-time">{{ post.readTime }} 分钟阅读</span>
                  <span class="post-views">{{ post.views }} 次阅读</span>
                </div>
              </div>
            </article>
          </div>

          <div class="pagination">
            <button
              v-for="page in totalPages"
              :key="page"
              :class="{ active: currentPage === page }"
              @click="changePage(page)"
              class="page-btn"
            >
              {{ page }}
            </button>
          </div>
        </main>

        <aside class="sidebar">
          <Sidebar />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'

const router = useRouter()
const posts = ref([])
const currentPage = ref(1)
const totalPages = ref(3)

// 模拟博客数据
const mockPosts = [
  {
    id: 1,
    title: 'Vue 3 Composition API 详解',
    excerpt:
      '深入了解 Vue 3 的 Composition API，学习如何使用 setup() 函数、reactive 和 ref 等核心概念...',
    date: '2025-07-01',
    category: 'Vue.js',
    image: 'https://dummyimage.com/400x200/007bff/ffffff?text=Vue3',
    readTime: 8,
    views: 1250,
  },
  {
    id: 2,
    title: 'JavaScript ES2024 新特性',
    excerpt: 'ES2024 带来了许多令人兴奋的新功能，包括新的数组方法、模式匹配等，让我们一起探索...',
    date: '2025-06-28',
    category: 'JavaScript',
    image: 'https://dummyimage.com/400x200/f39c12/ffffff?text=JavaScript',
    readTime: 6,
    views: 980,
  },
  {
    id: 3,
    title: 'CSS Grid 布局完整指南',
    excerpt: 'CSS Grid 是现代网页布局的强大工具，本文将详细介绍如何使用 Grid 创建复杂的布局...',
    date: '2025-06-25',
    category: 'CSS',
    image: 'https://dummyimage.com/400x200/e74c3c/ffffff?text=CSS+Grid',
    readTime: 12,
    views: 1456,
  },
  {
    id: 4,
    title: 'Node.js 性能优化技巧',
    excerpt: '提升 Node.js 应用性能的实用技巧，包括内存管理、异步处理优化等最佳实践...',
    date: '2025-06-22',
    category: 'Node.js',
    image: 'https://dummyimage.com/400x200/27ae60/ffffff?text=Node.js',
    readTime: 10,
    views: 875,
  },
  {
    id: 5,
    title: 'TypeScript 进阶类型系统',
    excerpt: '深入探讨 TypeScript 的高级类型特性，包括条件类型、映射类型和模板字面量类型...',
    date: '2025-06-20',
    category: 'TypeScript',
    image: 'https://dummyimage.com/400x200/3498db/ffffff?text=TypeScript',
    readTime: 15,
    views: 1120,
  },
  {
    id: 6,
    title: 'React vs Vue 2025年对比',
    excerpt: '全面对比 React 和 Vue 在 2025 年的发展现状，帮助你选择最适合的前端框架...',
    date: '2025-06-18',
    category: '前端框架',
    image: 'https://dummyimage.com/400x200/9b59b6/ffffff?text=React+vs+Vue',
    readTime: 9,
    views: 2100,
  },
]

onMounted(() => {
  loadPosts()
})

const loadPosts = () => {
  // 模拟分页加载
  const postsPerPage = 6
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  posts.value = mockPosts.slice(start, end)
}

const goToPost = (id) => {
  router.push(`/post/${id}`)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const changePage = (page) => {
  currentPage.value = page
  loadPosts()
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  text-align: center;
  padding: 80px 20px;
  margin-bottom: 40px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: start;
}

.blog-posts h2 {
  margin-bottom: 30px;
  color: #333;
  font-size: 2rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.post-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.post-image {
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-image img {
  transform: scale(1.05);
}

.post-content {
  padding: 20px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.post-date {
  color: #666;
}

.post-category {
  background-color: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.post-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
}

.post-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover,
.page-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
