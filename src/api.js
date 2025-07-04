// Unified data interface using browser localStorage
const POSTS_KEY = 'simpleblog_posts'
const COMMENTS_KEY = 'simpleblog_comments'

function getData(key, defaultValue) {
  const data = localStorage.getItem(key)
  if (data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      console.error('Failed to parse data for', key, e)
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultValue))
  return defaultValue
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

// Default mock posts
const defaultPosts = [
  {
    id: 1,
    title: 'Vue 3 Composition API 详解',
    excerpt: '深入了解 Vue 3 的 Composition API...',
    content: `# Vue 3 Composition API 详解

## 简介

Vue 3 引入了 **Composition API**，这是一种新的组件编写方式，提供了更好的逻辑复用和代码组织能力。

## 核心概念

### 1. setup() 函数

\`setup()\` 是 Composition API 的入口点：

\`\`\`javascript
import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const state = reactive({
      name: 'Vue 3'
    })
    
    return {
      count,
      state
    }
  }
}
\`\`\`

### 2. reactive 和 ref

- **ref**: 用于基本类型数据
- **reactive**: 用于对象类型数据

### 3. 计算属性和侦听器

\`\`\`javascript
import { computed, watch } from 'vue'

const doubleCount = computed(() => count.value * 2)
watch(count, (newVal, oldVal) => {
  console.log(\`count changed from \${oldVal} to \${newVal}\`)
})
\`\`\`

## 优势

1. **更好的逻辑复用**
2. **更清晰的代码组织**
3. **更好的 TypeScript 支持**
4. **更小的打包体积**

> 💡 **提示**: Composition API 不是必须的，Options API 仍然被完全支持。`,
    date: '2025-07-01',
    category: 'Vue.js',
    image: 'https://dummyimage.com/400x200/007bff/ffffff?text=Vue3',
    readTime: 8,
    views: 1250,
    isMarkdown: true,
  },
  {
    id: 2,
    title: 'JavaScript ES2024 新特性',
    excerpt: 'ES2024 带来了许多令人兴奋的新功能...',
    content: `# JavaScript ES2024 新特性

## 概述

ES2024 为 JavaScript 带来了许多**激动人心**的新特性，让开发者能够编写更加简洁和高效的代码。

## 主要新特性

### 1. Array grouping 方法

\`\`\`javascript
const fruits = [
  { name: 'apple', category: 'fruit' },
  { name: 'carrot', category: 'vegetable' },
  { name: 'banana', category: 'fruit' }
]

// 使用 Object.groupBy
const grouped = Object.groupBy(fruits, ({ category }) => category)
console.log(grouped)
// {
//   fruit: [{ name: 'apple', category: 'fruit' }, { name: 'banana', category: 'fruit' }],
//   vegetable: [{ name: 'carrot', category: 'vegetable' }]
// }
\`\`\`

### 2. Promise.withResolvers()

\`\`\`javascript
const { promise, resolve, reject } = Promise.withResolvers()

// 在其他地方使用
setTimeout(() => resolve('成功!'), 1000)
\`\`\`

### 3. Atomics.waitAsync()

异步等待共享内存变化：

\`\`\`javascript
const { async, value } = Atomics.waitAsync(buffer, 0, 0)
if (async) {
  value.then(() => console.log('值已改变'))
}
\`\`\`

## 总结

这些新特性让 JavaScript 更加强大和灵活，值得开发者们学习和使用。

---

**参考资料**: [ECMAScript 2024 Language Specification](https://tc39.es/ecma262/)`,
    date: '2025-06-28',
    category: 'JavaScript',
    image: 'https://dummyimage.com/400x200/f39c12/ffffff?text=JS',
    readTime: 6,
    views: 980,
    isMarkdown: true,
  },
  {
    id: 3,
    title: 'CSS Grid 布局完整指南',
    excerpt: 'CSS Grid 是现代网页布局的强大工具...',
    content: `# CSS Grid 布局完整指南

## 什么是 CSS Grid？

CSS Grid 是一个二维布局系统，能够同时处理行和列的布局。

## 基本概念

### Grid Container 和 Grid Item

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 200px;
  gap: 10px;
}

.grid-item {
  background-color: #f0f0f0;
  padding: 20px;
}
\`\`\`

### 网格线命名

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: [start] 1fr [middle] 1fr [end];
  grid-template-rows: [header-start] 100px [header-end main-start] 1fr [main-end];
}
\`\`\`

## 实际应用

### 响应式布局

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
\`\`\`

### 复杂布局

\`\`\`css
.complex-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 60px 1fr 40px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## 优势

- ✅ 强大的二维布局能力
- ✅ 简洁的语法
- ✅ 良好的浏览器支持
- ✅ 响应式设计友好

## 总结

CSS Grid 是现代网页布局的未来，值得每个前端开发者深入学习。`,
    date: '2025-06-25',
    category: 'CSS',
    image: 'https://dummyimage.com/400x200/e74c3c/ffffff?text=CSS+Grid',
    readTime: 12,
    views: 1456,
    isMarkdown: true,
  },
  {
    id: 4,
    title: 'Node.js 性能优化技巧',
    excerpt: '提升 Node.js 应用性能的实用技巧...',
    content: `# Node.js 性能优化技巧

## 前言

Node.js 作为服务端 JavaScript 运行环境，性能优化是开发者必须关注的重点。

## 核心优化策略

### 1. 内存管理

\`\`\`javascript
// 避免内存泄漏
const cache = new Map()

// 设置缓存大小限制
const MAX_CACHE_SIZE = 1000
function addToCache(key, value) {
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value
    cache.delete(firstKey)
  }
  cache.set(key, value)
}
\`\`\`

### 2. 异步处理优化

\`\`\`javascript
// 使用 Promise.all 并行处理
const results = await Promise.all([
  fetchUserData(userId),
  fetchUserPosts(userId),
  fetchUserComments(userId)
])

// 使用流处理大文件
const fs = require('fs')
const readline = require('readline')

const fileStream = fs.createReadStream('large-file.txt')
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
})

for await (const line of rl) {
  // 逐行处理，避免内存溢出
  processLine(line)
}
\`\`\`

### 3. 集群和工作进程

\`\`\`javascript
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else {
  // 工作进程
  require('./app.js')
}
\`\`\`

## 监控和调试

### 使用 clinic.js

\`\`\`bash
npm install -g clinic
clinic doctor -- node app.js
\`\`\`

### 内存分析

\`\`\`javascript
// 监控内存使用
setInterval(() => {
  const memUsage = process.memoryUsage()
  console.log(\`Memory usage: \${Math.round(memUsage.heapUsed / 1024 / 1024)} MB\`)
}, 5000)
\`\`\`

## 最佳实践

1. **避免同步操作**
2. **合理使用缓存**
3. **优化数据库查询**
4. **使用CDN**
5. **启用gzip压缩**

> ⚡ **性能提示**: 始终在生产环境中监控应用性能指标！`,
    date: '2025-06-22',
    category: 'Node.js',
    image: 'https://dummyimage.com/400x200/27ae60/ffffff?text=Node.js',
    readTime: 10,
    views: 875,
    isMarkdown: true,
  },
  {
    id: 5,
    title: 'TypeScript 进阶类型系统',
    excerpt: '深入探讨 TypeScript 的高级类型特性...',
    content: `# TypeScript 进阶类型系统

## 概述

TypeScript 的类型系统非常强大，提供了许多高级特性来帮助开发者编写更安全的代码。

## 高级类型特性

### 1. 条件类型

\`\`\`typescript
type IsString<T> = T extends string ? true : false

type Test1 = IsString<string>  // true
type Test2 = IsString<number>  // false

// 实用条件类型
type NonNullable<T> = T extends null | undefined ? never : T
\`\`\`

### 2. 映射类型

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}

// 自定义映射类型
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}

interface User {
  name: string
  age: number
}

type UserGetters = Getters<User>
// {
//   getName: () => string
//   getAge: () => number
// }
\`\`\`

### 3. 模板字面量类型

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`

type ClickEvent = EventName<'click'>  // 'onClick'
type HoverEvent = EventName<'hover'>  // 'onHover'

// 构建复杂的字符串类型
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Endpoint = '/users' | '/posts' | '/comments'
type APIRoute = \`\${HTTPMethod} \${Endpoint}\`
\`\`\`

### 4. 工具类型组合

\`\`\`typescript
// 深度只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P]
}

// 提取函数参数类型
type Parameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never

function example(a: string, b: number, c: boolean) {}
type ExampleParams = Parameters<typeof example>  // [string, number, boolean]
\`\`\`

## 实际应用

### API 类型安全

\`\`\`typescript
interface APIResponse<T> {
  data: T
  status: number
  message: string
}

type UserAPI = {
  '/users': {
    GET: APIResponse<User[]>
    POST: APIResponse<User>
  }
  '/users/:id': {
    GET: APIResponse<User>
    PUT: APIResponse<User>
    DELETE: APIResponse<void>
  }
}
\`\`\`

## 总结

掌握 TypeScript 的高级类型系统能够显著提升代码的类型安全性和开发体验。

**进一步学习**:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)`,
    date: '2025-06-20',
    category: 'TypeScript',
    image: 'https://dummyimage.com/400x200/3498db/ffffff?text=TypeScript',
    readTime: 15,
    views: 1120,
    isMarkdown: true,
  },
  {
    id: 6,
    title: 'React vs Vue 2025年对比',
    excerpt: '全面对比 React 和 Vue 在 2025 年的发展现状...',
    content: `# React vs Vue 2025年对比

## 概述

在 2025 年，React 和 Vue 都已经是非常成熟的前端框架，各有优势。

## 详细对比

| 特性 | React | Vue |
|------|-------|-----|
| **学习曲线** | 中等 | 较低 |
| **性能** | 优秀 | 优秀 |
| **生态系统** | 庞大 | 完整 |
| **TypeScript 支持** | 优秀 | 优秀 |

## React 优势

### 1. 庞大的生态系统

\`\`\`bash
# React 生态系统示例
npm install react react-dom
npm install @reduxjs/toolkit react-redux
npm install react-router-dom
npm install styled-components
\`\`\`

### 2. 灵活性

\`\`\`jsx
// React 函数组件
function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <div className="user-profile">
      {isEditing ? (
        <EditForm user={user} onSave={() => setIsEditing(false)} />
      ) : (
        <UserDisplay user={user} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  )
}
\`\`\`

## Vue 优势

### 1. 渐进式框架

\`\`\`vue
<!-- Vue 单文件组件 -->
<template>
  <div class="user-profile">
    <EditForm v-if="isEditing" :user="user" @save="isEditing = false" />
    <UserDisplay v-else :user="user" @edit="isEditing = true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['user'])
const isEditing = ref(false)
</script>

<style scoped>
.user-profile {
  padding: 20px;
}
</style>
\`\`\`

### 2. 内置功能丰富

\`\`\`javascript
// Vue 内置功能
import { ref, computed, watch, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)
    
    watch(count, (newValue) => {
      console.log(\`Count changed to \${newValue}\`)
    })
    
    onMounted(() => {
      console.log('Component mounted')
    })
    
    return { count, doubled }
  }
}
\`\`\`

## 选择建议

### 选择 React 如果：
- 需要最大的灵活性
- 团队有丰富的 React 经验
- 项目需要复杂的状态管理

### 选择 Vue 如果：
- 团队是中小规模
- 需要快速开发
- 偏好约定优于配置

## 2025年趋势

1. **性能优化**: 两个框架都在持续优化性能
2. **开发体验**: 工具链越来越完善
3. **TypeScript**: 类型安全成为标配
4. **服务端渲染**: SSR/SSG 解决方案成熟

## 结论

没有绝对的"最佳"框架，选择应该基于：
- 团队技能
- 项目需求  
- 长期维护考虑

> 💡 **建议**: 无论选择哪个框架，都要深入理解其核心概念和最佳实践。`,
    date: '2025-06-18',
    category: '前端框架',
    image: 'https://dummyimage.com/400x200/9b59b6/ffffff?text=React+vs+Vue',
    readTime: 9,
    views: 2100,
    isMarkdown: true,
  },
]

// Initialize default data with mock comments
const defaultComments = {
  1: [
    {
      id: 1,
      author: '张三',
      text: '非常有价值的文章！',
      date: '2025-07-02',
      avatar: 'https://dummyimage.com/40x40/007bff/ffffff?text=张',
    },
    {
      id: 2,
      author: '李四',
      text: '请问有没有更多的示例代码？',
      date: '2025-07-01',
      avatar: 'https://dummyimage.com/40x40/28a745/ffffff?text=李',
    },
  ],
  2: [
    {
      id: 1,
      author: '王五',
      text: 'ES2024的新特性确实很实用',
      date: '2025-06-30',
      avatar: 'https://dummyimage.com/40x40/dc3545/ffffff?text=王',
    },
  ],
  3: [
    {
      id: 1,
      author: '赵六',
      text: 'Grid布局学会了，谢谢分享',
      date: '2025-06-29',
      avatar: 'https://dummyimage.com/40x40/ffc107/ffffff?text=赵',
    },
  ],
}

getData(POSTS_KEY, defaultPosts)
getData(COMMENTS_KEY, defaultComments)

// Posts API
export async function getPosts() {
  return getData(POSTS_KEY, defaultPosts)
}

export async function getPost(id) {
  const posts = getData(POSTS_KEY, defaultPosts)
  const post = posts.find((p) => p.id === id)
  if (post) {
    // Increment view count when viewing a post
    post.views = (post.views || 0) + 1
    setData(POSTS_KEY, posts)
  }
  return post || null
}

export async function likePost(postId) {
  const posts = getData(POSTS_KEY, defaultPosts)
  const post = posts.find((p) => p.id === postId)
  if (post) {
    post.likes = (post.likes || 0) + 1
    setData(POSTS_KEY, posts)
  }
  return post || null
}

export async function addPost(post) {
  const posts = getData(POSTS_KEY, defaultPosts)
  const newId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1
  const newPost = {
    id: newId,
    date: new Date().toISOString().slice(0, 10),
    views: 0,
    readTime: Math.ceil(post.content?.length / 200) || 5, // Estimate read time
    likes: 0,
    ...post,
  }
  // Generate default image if none provided
  if (!newPost.image) {
    const colors = ['007bff', 'f39c12', 'e74c3c', '27ae60', '3498db', '9b59b6']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    newPost.image = `https://dummyimage.com/400x200/${randomColor}/ffffff?text=${encodeURIComponent(newPost.category || 'Blog')}`
  }
  posts.unshift(newPost) // newest first
  setData(POSTS_KEY, posts)
  return newPost
}

// Comments API
export async function getComments(postId) {
  const all = getData(COMMENTS_KEY, defaultComments)
  return all[postId] || []
}

export async function addComment(postId, comment) {
  const all = getData(COMMENTS_KEY, defaultComments)
  const list = all[postId] || []
  const newComment = {
    id: list.length ? Math.max(...list.map((c) => c.id)) + 1 : 1,
    date: new Date().toISOString(),
    ...comment,
  }
  list.push(newComment)
  all[postId] = list
  setData(COMMENTS_KEY, all)
  return newComment
}

// Fetch all comments grouped by post
export async function getAllComments() {
  return getData(COMMENTS_KEY, defaultComments)
}

// Statistics and aggregation APIs
export async function getPopularPosts(limit = 4) {
  const posts = await getPosts()
  return posts.sort((a, b) => b.views - a.views).slice(0, limit)
}

export async function getCategories() {
  const posts = await getPosts()
  const catMap = {}
  posts.forEach((p) => {
    catMap[p.category] = (catMap[p.category] || 0) + 1
  })
  return Object.entries(catMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getTags() {
  const posts = await getPosts()
  const tagMap = {}
  posts.forEach((p) => {
    // Extract tags from category and content
    const tags = [p.category]
    if (p.content) {
      // Simple tag extraction from content (you can enhance this)
      const matches =
        p.content.match(
          /\b(Vue|React|JavaScript|TypeScript|CSS|Node\.js|性能|优化|前端|开发)\b/gi,
        ) || []
      tags.push(...matches)
    }
    tags.forEach((tag) => {
      if (tag) tagMap[tag] = (tagMap[tag] || 0) + 1
    })
  })
  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getArchives() {
  // Add likes count to posts
  const posts = await getPosts()
  const archMap = {}
  posts.forEach((p) => {
    const d = new Date(p.date)
    const key = `${d.getFullYear()}年${d.getMonth() + 1}月`
    archMap[key] = (archMap[key] || 0) + 1
  })
  return Object.entries(archMap)
    .map(([period, count]) => ({ period, count }))
    .sort(
      (a, b) =>
        new Date(b.period.replace(/年|月/g, '/')) - new Date(a.period.replace(/年|月/g, '/')),
    )
}

export async function getRecentComments(limit = 3) {
  const allCommentsObj = await getAllComments()
  const flat = []
  for (const pid in allCommentsObj) {
    allCommentsObj[pid].forEach((c) => flat.push({ ...c, postId: pid }))
  }
  return flat.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit)
}

// Search functionality
export async function searchPosts(query) {
  const posts = await getPosts()
  if (!query.trim()) return posts

  const searchTerm = query.toLowerCase()
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm),
  )
}

// Filter posts by category
export async function getPostsByCategory(category) {
  const posts = await getPosts()
  return posts.filter((post) => post.category === category)
}

// Get posts with pagination
export async function getPostsPaginated(page = 1, limit = 6) {
  const posts = await getPosts()
  const start = (page - 1) * limit
  const end = start + limit
  return {
    posts: posts.slice(start, end),
    totalPages: Math.ceil(posts.length / limit),
    currentPage: page,
    totalPosts: posts.length,
  }
}
