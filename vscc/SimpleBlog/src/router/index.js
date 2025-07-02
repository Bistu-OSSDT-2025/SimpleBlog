import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BlogPost from '../views/BlogPost.vue'
import About from '../views/About.vue'
import Editor from '../views/Editor.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页 - SimpleBlog'
    }
  },
  {
    path: '/post/:id',
    name: 'BlogPost',
    component: BlogPost,
    props: true,
    meta: {
      title: '文章详情 - SimpleBlog'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于 - SimpleBlog'
    }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor,
    meta: {
      title: '写文章 - SimpleBlog'
    }
  },
  // Add a catch-all route for search results
  {
    path: '/search/:query',
    name: 'SearchResults',
    component: Home,
    props: route => ({ searchQuery: route.params.query }),
    meta: {
      title: '搜索结果 - SimpleBlog'
    }
  },
  // Add routes for filtered views
  {
    path: '/category/:category',
    name: 'Category',
    component: Home,
    props: route => ({ category: route.params.category }),
    meta: {
      title: '分类文章 - SimpleBlog'
    }
  },
  {
    path: '/tag/:tag',
    name: 'Tag',
    component: Home,
    props: route => ({ tag: route.params.tag }),
    meta: {
      title: '标签文章 - SimpleBlog'
    }
  },
  {
    path: '/archive/:period',
    name: 'Archive',
    component: Home,
    props: route => ({ archive: route.params.period }),
    meta: {
      title: '归档文章 - SimpleBlog'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'SimpleBlog'
  next()
})

export default router