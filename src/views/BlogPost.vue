<template>
  <div class="blogpost">
    <div class="container">
      <div class="content-wrapper">
        <main class="post-detail">
          <article class="article">
            <h1 class="post-title">{{ post.title }}</h1>
            <div class="post-meta">
              <span>{{ formatDate(post.date) }}</span>
              <span class="post-category">{{ post.category }}</span>
            </div>
            <div class="post-image" v-if="post.image">
              <img :src="post.image" :alt="post.title" />
            </div>
            <div class="post-content" ref="contentContainer"></div>
            <div class="post-actions">
              <button @click="handleLike" class="like-button">
                <span class="like-icon">❤️</span>
                <span class="like-count">{{ post.likes || 0 }}</span>
              </button>
            </div>
          </article>

          <section class="comments">
            <h2>评论</h2>
            <div class="comment-list">
              <div v-for="comment in comments" :key="comment.id" class="comment-item">
                <div class="comment-avatar">
                  <img :src="comment.avatar" :alt="comment.author" />
                </div>
                <div class="comment-body">
                  <p class="comment-text">{{ comment.text }}</p>
                  <div class="comment-meta">
                    <span class="comment-author">{{ comment.author }}</span>
                    <span class="comment-date">{{ formatDate(comment.date) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="comment-form">
              <textarea v-model="newComment" placeholder="写下你的评论"></textarea>
              <button @click="submitComment">提交评论</button>
            </div>
          </section>
        </main>
        <aside class="sidebar">
          <Sidebar />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import { getPost, getComments, addComment, likePost } from '../api.js'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const route = useRoute()
const post = ref({})
const comments = ref([])
const newComment = ref('')
const contentContainer = ref(null)

onMounted(async () => {
  const id = parseInt(route.params.id)
  post.value = await getPost(id)
  comments.value = await getComments(id)

  // 渲染markdown内容
  await nextTick()
  if (contentContainer.value && post.value.content) {
    if (post.value.isMarkdown) {
      // 如果是markdown格式，使用vditor预览
      Vditor.preview(contentContainer.value, post.value.content, {
        hljs: {
          enable: true,
          style: 'github',
        },
        math: {
          engine: 'KaTeX',
        },
      })
    } else {
      // 如果是HTML格式，直接显示
      contentContainer.value.innerHTML = post.value.content
    }
  }
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

async function handleLike() {
  if (post.value.id) {
    try {
      const updatedPost = await likePost(post.value.id)
      post.value = {
        ...post.value,
        likes: updatedPost.likes,
      }
    } catch (error) {
      console.error('Like failed:', error)
    }
  }
}

function submitComment() {
  if (newComment.value.trim()) {
    addComment(post.value.id, {
      author: '匿名',
      text: newComment.value,
      avatar: 'https://dummyimage.com/40x40/6c757d/ffffff?text=?',
    }).then((comment) => {
      comments.value.push(comment)
    })
    newComment.value = ''
  }
}
</script>

<style scoped>
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

.post-detail .post-title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

.post-meta {
  display: flex;
  gap: 10px;
  color: #666;
  margin-bottom: 20px;
}

.post-category {
  background-color: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.post-image img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
}

.post-content {
  line-height: 1.8;
  margin-bottom: 40px;
}

/* Markdown 内容样式 */
.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #24292e;
}

.post-content h1 {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 8px;
}

.post-content h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 8px;
}

.post-content h3 {
  font-size: 1.25em;
}

.post-content p {
  margin-bottom: 16px;
}

.post-content ul,
.post-content ol {
  margin-bottom: 16px;
  padding-left: 20px;
}

.post-content li {
  margin-bottom: 4px;
}

.post-content blockquote {
  border-left: 4px solid #dfe2e5;
  padding: 0 16px;
  color: #6a737d;
  margin: 16px 0;
}

.post-content code {
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
}

.post-content pre {
  background-color: #f6f8fa;
  border-radius: 6px;
  overflow: auto;
  padding: 16px;
  margin: 16px 0;
}

.post-content pre code {
  background-color: transparent;
  border: 0;
  display: inline;
  line-height: inherit;
  margin: 0;
  max-width: auto;
  overflow: visible;
  padding: 0;
  word-wrap: normal;
}

.post-content table {
  border-collapse: collapse;
  border-spacing: 0;
  margin: 16px 0;
  width: 100%;
}

.post-content table th,
.post-content table td {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}

.post-content table th {
  background-color: #f6f8fa;
  font-weight: 600;
}

.post-content img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 16px 0;
}

.post-content hr {
  border: none;
  border-top: 1px solid #eaecef;
  margin: 24px 0;
}

.post-actions {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: flex-start;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f39c12;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.like-button:hover {
  background: #e67e22;
}

.like-icon {
  font-size: 1.2rem;
}

.like-count {
  font-size: 1.1rem;
  font-weight: 500;
}

.comments {
  margin-top: 40px;
}

.comment-list .comment-item {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.comment-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.comment-body {
  flex: 1;
}

.comment-form textarea {
  width: 100%;
  min-height: 80px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.comment-form button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
