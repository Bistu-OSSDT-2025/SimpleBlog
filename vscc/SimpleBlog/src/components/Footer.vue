<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>SimpleBlog</h3>
          <p>分享生活，记录成长</p>
        </div>

        <div class="footer-section">
          <h4>快速链接</h4>
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/about">关于</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>友情链接</h4>
          <ul>
            <li><a href="#" target="_blank">Vue.js</a></li>
            <li><a href="#" target="_blank">GitHub</a></li>
            <li><a href="#" target="_blank">博客园</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>联系我们</h4>
          <p>Email: contact@simpleblog.com</p>
          <div class="social-links">
            <a href="#" class="social-link">GitHub</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">LinkedIn</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2025 SimpleBlog. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #343a40;
  color: white;
  margin-top: auto;
  width: 100%;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 20px;
  width: 100%;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
}

.footer-section {
  min-height: 120px;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 15px;
  color: #007bff;
  font-weight: 600;
}

.footer-section h3 {
  font-size: 1.5rem;
}

.footer-section h4 {
  font-size: 1.1rem;
}

.footer-section p {
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
  display: inline-block;
  padding: 2px 0;
}

.footer-section ul li a:hover {
  color: #007bff;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.social-link {
  color: #ccc;
  text-decoration: none;
  padding: 8px 12px;
  border: 1px solid #555;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #555;
  color: #ccc;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 30px 15px 15px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 25px;
  }

  .footer-section {
    min-height: auto;
  }

  .social-links {
    justify-content: center;
  }

  .footer-section h3 {
    font-size: 1.3rem;
  }
}
</style>
