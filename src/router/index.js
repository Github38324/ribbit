import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Home from '@/views/home'
import SubCategory from '@/views/category/sub'
import TopCategory from '@/views/category/index'
const Goods = () => import('@/views/goods/index')
// 路由规则
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods }

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 当切换页面的时候，回到顶部
  // 2.0使用的是 x  y
  // 3.0使用的是 left top
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
