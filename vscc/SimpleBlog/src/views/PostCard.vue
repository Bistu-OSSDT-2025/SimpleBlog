<template>
  <div class="post-card" @click="$emit('click')">
    <div class="post-header">
      <h2>{{ post.title }}</h2>
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.date) }}</span>
        <span class="post-views">{{ post.views }} 阅读</span>
      </div>
    </div>
    <p class="post-excerpt">{{ post.excerpt }}</p>
    <div class="post-footer">
      <span class="post-category">{{ post.category }}</span>
      <div class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="post-tag">#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.post-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.post-header {
  margin-bottom: 15px;
}

.post-header h2 {
  font-size: 1.4rem;
  margin-bottom: 5px;
  color: #333;
}

.post-meta {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #666;
}

.post-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.post-category {
  background: #f0f7ff;
  color: #007bff;
  padding: 4px 8px;
  border-radius: 4px;
}

.post-tags {
  display: flex;
  gap: 8px;
}

.post-tag {
  color: #666;
  font-size: 0.8rem;
}
</style>