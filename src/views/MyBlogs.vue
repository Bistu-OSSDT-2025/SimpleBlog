<template>
  <div class="my-blogs-container">
    <h1>My Blog Posts</h1>
    <div class="blog-list">
      <div v-for="post in blogPosts" :key="post.id" class="blog-entry">
        <h2>{{ post.title }}</h2>
        <p class="date">{{ post.date }}</p>
        <p class="excerpt">{{ post.excerpt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyBlogs',
  data() {
    return {
      blogPosts: [
        // Sample blog posts - you can replace this with your actual blog data
        {
          id: 1,
          title: 'Getting Started with Vue.js',
          date: '2024-01-15',
          excerpt: 'Learn the fundamentals of Vue.js and start building modern web applications.'
        },
        {
          id: 2,
          title: 'Mastering Web Development',
          date: '2024-02-20',
          excerpt: 'A comprehensive guide to modern web development techniques and best practices.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.my-blogs-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.blog-entry {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.blog-entry h2 {
  color: #333;
  margin-bottom: 10px;
}

.date {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.excerpt {
  color: #444;
  line-height: 1.6;
}
</style>
