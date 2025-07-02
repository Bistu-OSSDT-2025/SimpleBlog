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
            <div class="post-content" v-html="post.content"></div>
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import { getPost, getComments, addComment } from '../api.js'

const route = useRoute()
const post = ref({})
const comments = ref([])
const newComment = ref('')

onMounted(async () => {
  const id = parseInt(route.params.id)
  post.value = await getPost(id)
  comments.value = await getComments(id)
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
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
