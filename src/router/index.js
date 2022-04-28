import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/home'
import SubCategory from '@/views/category/sub'
import TopCategory from '@/views/category/index'
// 路由规则
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory }

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
