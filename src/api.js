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
    content:
      '<p>深入了解 Vue 3 的 Composition API，学习如何使用 setup() 函数、reactive 和 ref 等核心概念。</p>',
    date: '2025-07-01',
    category: 'Vue.js',
    image: 'https://dummyimage.com/400x200/007bff/ffffff?text=Vue3',
    readTime: 8,
    views: 1250,
  },
  {
    id: 2,
    title: 'JavaScript ES2024 新特性',
    excerpt: 'ES2024 带来了许多令人兴奋的新功能...',
    content: '<p>ES2024 带来了许多令人兴奋的新功能，包括新的数组方法、模式匹配等。</p>',
    date: '2025-06-28',
    category: 'JavaScript',
    image: 'https://dummyimage.com/400x200/f39c12/ffffff?text=JS',
    readTime: 6,
    views: 980,
  },
  {
    id: 3,
    title: 'CSS Grid 布局完整指南',
    excerpt: 'CSS Grid 是现代网页布局的强大工具...',
    content: '<p>CSS Grid 是现代网页布局的强大工具。</p>',
    date: '2025-06-25',
    category: 'CSS',
    image: 'https://dummyimage.com/400x200/e74c3c/ffffff?text=CSS+Grid',
    readTime: 12,
    views: 1456,
  },
  {
    id: 4,
    title: 'Node.js 性能优化技巧',
    excerpt: '提升 Node.js 应用性能的实用技巧...',
    content: '<p>提升 Node.js 应用性能的实用技巧，包括内存管理、异步处理优化等最佳实践。</p>',
    date: '2025-06-22',
    category: 'Node.js',
    image: 'https://dummyimage.com/400x200/27ae60/ffffff?text=Node.js',
    readTime: 10,
    views: 875,
  },
  {
    id: 5,
    title: 'TypeScript 进阶类型系统',
    excerpt: '深入探讨 TypeScript 的高级类型特性...',
    content: '<p>深入探讨 TypeScript 的高级类型特性，包括条件类型、映射类型和模板字面量类型。</p>',
    date: '2025-06-20',
    category: 'TypeScript',
    image: 'https://dummyimage.com/400x200/3498db/ffffff?text=TypeScript',
    readTime: 15,
    views: 1120,
  },
  {
    id: 6,
    title: 'React vs Vue 2025年对比',
    excerpt: '全面对比 React 和 Vue 在 2025 年的发展现状...',
    content: '<p>全面对比 React 和 Vue 在 2025 年的发展现状，帮助你选择最适合的前端框架。</p>',
    date: '2025-06-18',
    category: '前端框架',
    image: 'https://dummyimage.com/400x200/9b59b6/ffffff?text=React+vs+Vue',
    readTime: 9,
    views: 2100,
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

export async function addPost(post) {
  const posts = getData(POSTS_KEY, defaultPosts)
  const newId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1
  const newPost = {
    id: newId,
    date: new Date().toISOString().slice(0, 10),
    views: 0,
    readTime: Math.ceil(post.content?.length / 200) || 5, // Estimate read time
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
