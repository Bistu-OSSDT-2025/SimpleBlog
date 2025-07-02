<template>
  <div class="editor-page">
    <div class="container">
      <h2>发布新文章</h2>
      <div class="form-group">
        <input v-model="postTitle" type="text" placeholder="文章标题" class="title-input" />
      </div>
      <div class="form-group">
        <input
          v-model="postCategory"
          type="text"
          placeholder="分类 (可选)"
          class="category-input"
        />
      </div>
      <div id="vditor" class="editor-container"></div>
      <button @click="publish" class="publish-btn">发布文章</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const postTitle = ref('')
const postCategory = ref('')
const editor = ref(null)
const router = useRouter()

onMounted(() => {
  editor.value = new Vditor('vditor', {
    height: 500,
    placeholder: '开始写作...',
    toolbarConfig: {
      pin: true,
    },
    cache: { enable: false },
  })
})

const publish = () => {
  const content = editor.value.getValue()
  if (!postTitle.value.trim() || !content.trim()) {
    alert('标题和内容不能为空')
    return
  }
  const posts = JSON.parse(localStorage.getItem('posts') || '[]')
  posts.unshift({
    id: Date.now(),
    title: postTitle.value,
    excerpt: content.substr(0, 100),
    date: new Date().toISOString(),
    category: postCategory.value || '未分类',
    image: '',
    readTime: Math.ceil(content.length / 200),
    views: 0,
    content,
  })
  localStorage.setItem('posts', JSON.stringify(posts))
  alert('发布成功')
  router.push('/')
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

.title-input,
.category-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.editor-container {
  margin-bottom: 20px;
}

.publish-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.publish-btn:hover {
  background-color: #0056b3;
}
</style>
