import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/layout.vue'

/**
 * 所有页面都挂在 Layout 下面，Header / Footer 只写一次。
 * meta.title 会被 Header 导航和浏览器标题共用，改栏目名只改这里。
 * 页面用 () => import(...) 懒加载：首屏只下载首页的代码。
 */
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: { title: '关于我们' }
      },
      {
        path: 'competition',
        name: 'competition',
        component: () => import('@/views/CompetitionView.vue'),
        meta: { title: '赛事' }
      },
      {
        path: 'works',
        name: 'works',
        component: () => import('@/views/WorksView.vue'),
        meta: { title: '作品' }
      },
      {
        path: 'learn',
        name: 'learn',
        component: () => import('@/views/LearnView.vue'),
        meta: { title: '学习' }
      },
      {
        path: 'join',
        name: 'join',
        component: () => import('@/views/JoinView.vue'),
        meta: { title: '加入我们' }
      }
    ]
  },
  // 兜底：访问不存在的地址时回到首页，避免白屏
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 切换页面时回到顶部，否则从长页面跳过去会停在半空中
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const title = to.meta?.title
  document.title = title ? `${title} · 智能创客社团` : '智能创客社团'
})

export default router
