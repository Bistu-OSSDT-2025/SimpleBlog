# SimpleBlog

一个基于 Vue 3 + Vite 构建的现代化博客应用

## 📖 项目介绍

SimpleBlog 是一个轻量级的个人博客系统，采用前端现代化技术栈构建。项目专注于简洁的用户体验和高效的内容管理，适合个人开发者、技术博主使用。

## ✨ 项目特性

- 🎨 **现代化 UI**：基于 Vue 3 Composition API 构建的响应式界面
- 📝 **Markdown 编辑器**：集成 Vditor 富文本编辑器，支持实时预览
- 📱 **响应式设计**：完美适配桌面端和移动端设备
- 🚀 **快速开发**：基于 Vite 构建工具，提供极速的热重载体验
- 💾 **本地存储\***：使用 localStorage 实现数据持久化，在短期开发中代替后端部署
- 🎯 **路由管理**：基于 Vue Router 4 的单页面应用
- 🏷️ **分类管理**：支持文章分类和标签功能
- 💬 **评论系统**：内置评论功能，支持用户互动
- 📊 **阅读统计**：文章阅读次数和阅读时间统计
- 🔍 **搜索功能**：文章搜索和筛选功能

## 🛠️ 技术栈

- **前端框架**：Vue 3.5.17
- **构建工具**：Vite 7.0.0
- **路由管理**：Vue Router 4.5.1
- **编辑器**：Vditor 3.11.1
- **代码格式化**：Prettier 3.5.3
- **开发工具**：Vue DevTools

## 📦 安装指南

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 克隆项目

```bash
git clone <repository-url>
cd SimpleBlog
```

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 🚀 开发指南

### 项目结构

```
SimpleBlog/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 样式文件
│   │   ├── base.css       # 基础样式
│   │   └── main.css       # 主样式文件
│   ├── components/        # 公共组件
│   │   ├── Footer.vue     # 页脚组件
│   │   ├── Navbar.vue     # 导航栏组件
│   │   └── Sidebar.vue    # 侧边栏组件
│   ├── router/            # 路由配置
│   │   └── index.js       # 路由定义
│   ├── views/             # 页面组件
│   │   ├── About.vue      # 关于页面
│   │   ├── BlogPost.vue   # 文章详情页
│   │   ├── Editor.vue     # 文章编辑器
│   │   └── Home.vue       # 首页
│   ├── api.js             # 数据接口
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── vite.config.js         # Vite 配置
└── jsconfig.json          # JavaScript 配置
```

### 核心功能说明

#### 1. 文章管理

- 支持 Markdown 格式的文章编写
- 文章分类和标签管理
- 文章封面图片设置
- 自动保存草稿功能

#### 2. 数据存储

项目使用 localStorage 作为数据存储方案：

- `simpleblog_posts`：存储文章数据
- `simpleblog_comments`：存储评论数据

#### 3. 路由配置

- `/`：首页，展示文章列表
- `/post/:id`：文章详情页
- `/editor`：文章编辑器
- `/about`：关于页面

### 开发规范

#### 代码格式化

```bash
npm run format
```

#### 组件开发

- 使用 Vue 3 Composition API
- 采用 `<script setup>` 语法
- 遵循单文件组件规范

#### 样式规范

- 使用 CSS 变量定义主题色彩
- 采用 BEM 命名规范
- 响应式设计优先

## 🎯 待开发目标

- [ ] **主题切换**：支持明暗主题切换
- [ ] **文章搜索**：全文搜索功能
- [ ] **标签云**：可视化标签展示
- [ ] **图片上传**：集成图床服务
- [ ] **草稿箱**：未发布文章管理
- [ ] **文章统计**：访问量、点赞数等数据分析
- [ ] **RSS 订阅**：生成 RSS 订阅源
- [ ] **SEO 优化**：meta 标签、sitemap 生成
- [ ] **后端集成**：数据库存储和 API 接口
- [ ] **评论系统增强**：回复、点赞、举报等功能
- [ ] **社交功能**：分享到社交媒体
- [ ] **多语言支持**：国际化功能
- [ ] **文档完善**：API 文档和开发文档

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 邮箱：<contact@simpleblog.com>
- GitHub：[SimpleBlog Repository](https://github.com/Bistu-OSSDT-2025/SimpleBlog)
- 问题反馈：[Issues](https://github.com/Bistu-OSSDT-2025/SimpleBlog/issues)

## 🌙 暗黑模式功能

SimpleBlog 现在支持完整的暗黑模式功能！

### 特性

- 🎨 **智能主题检测** - 自动适配系统主题偏好
- 💾 **用户偏好记忆** - 保存用户的主题选择
- 🔄 **平滑过渡动画** - 优雅的主题切换效果
- 📱 **响应式设计** - 完美适配所有设备
- 🎯 **一键切换** - 右上角便捷的主题切换按钮

### 使用方法

1. 点击右上角的主题切换按钮 (🌙/☀️)
2. 系统会自动记住您的选择
3. 首次访问时会根据系统设置自动选择主题

### 支持的组件

所有组件都完美支持暗黑模式，包括导航栏、侧边栏、文章卡片、编辑器、评论区等。

---
