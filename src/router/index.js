import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BlogPost from '../views/BlogPost.vue'
import About from '../views/About.vue'
import Editor from '../views/Editor.vue'
import MyBlogs from '../views/MyBlogs.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/post/:id',
    name: 'BlogPost',
    component: BlogPost,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor,
  },
  {
    path: '/myblogs',
    name: 'MyBlogs',
    component: MyBlogs,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
