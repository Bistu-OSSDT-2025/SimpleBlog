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
                  <span class="post-likes">{{ post.likes }} 喜欢</span>
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
import { getPostsPaginated } from '../api.js'
import Sidebar from '../components/Sidebar.vue'

const router = useRouter()
const posts = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalPosts = ref(0)

onMounted(async () => {
  await loadPosts()
})

const loadPosts = async () => {
  const result = await getPostsPaginated(currentPage.value, 6)
  posts.value = result.posts
  totalPages.value = result.totalPages
  totalPosts.value = result.totalPosts
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

const changePage = async (page) => {
  currentPage.value = page
  await loadPosts()
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
