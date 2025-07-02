<template>
  <div class="about">
    <section class="hero">
      <div class="hero-content">
        <h1>关于 SimpleBlog</h1>
        <p>SimpleBlog 致力于分享前端开发技巧与经验，帮助开发者快速成长。</p>
      </div>
    </section>

    <div class="container">
      <div class="content-wrapper">
        <main class="about-content">
          <h2>我们的使命</h2>
          <p>我们相信知识的力量，通过技术分享与实践案例，让更多人能够高效学习并应用于项目中。</p>

          <h2>联系我们</h2>
          <p>如有疑问或合作意向，请通过以下方式联系：</p>
          <ul>
            <li>Email: contact@simpleblog.com</li>
            <li>
              GitHub: <a href="#" target="_blank">https://github.com/Bistu-OSSDT-2025/SimpleBlog</a>
            </li>
          </ul>
        </main>
        <aside class="sidebar">
          <Sidebar />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
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

.about-content h2 {
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 1.8rem;
}

.about-content p {
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

.about-content ul {
  list-style: disc inside;
  margin-left: 20px;
  color: #555;
}

.about-content a {
  color: #007bff;
  text-decoration: none;
}

.about-content a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
