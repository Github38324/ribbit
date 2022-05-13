import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Home from '@/views/home'
import SubCategory from '@/views/category/sub'
import TopCategory from '@/views/category/index'
import PageLogin from '@/views/login/index'
import XtxCartPage from '@/views/cart/index'
import store from '@/store'
const Goods = () => import('@/views/goods/index')
const LoginCallback = () => import('@/views/login/callback')

const PayCheckout = () => import('@/views/member/pay/checkout')
const PayIndex = () => import('@/views/member/pay/index')
const XtxPayResultPage = () => import('@/views/member/pay/result')

// 路由规则
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: XtxCartPage },
      { path: '/member/checkout', component: PayCheckout },
      { path: '/member/pay', component: PayIndex },
      { path: '/pay/callback', component: XtxPayResultPage }

    ]
  },
  { path: '/login', component: PageLogin },
  { path: '/login/callback', component: LoginCallback }
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

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登录的地址都是以/member开头的
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
