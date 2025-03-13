import { createRouter, createWebHistory } from 'vue-router'
import { ref, computed } from 'vue'

// 创建一个全局的响应式屏幕宽度状态
export const screenWidth = ref(window.innerWidth)

// 使用计算属性来决定是否为移动端视图
export const isMobileView = computed(() => screenWidth.value <= 600)

// 动态导入组件
const HomeViewDesktop = () => import('../views/desktop/HomeView.vue')
const HomeViewMobile = () => import('../views/mobile/HomeView.vue')
const GalleryViewDesktop = () => import('../views/desktop/GalleryView.vue')
const GalleryViewMobile = () => import('../views/mobile/GalleryView.vue')
const FavoritesViewDesktop = () => import('../views/desktop/FavoritesView.vue')
const FavoritesViewMobile = () => import('../views/mobile/FavoritesView.vue')

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('./views/ResponsiveView.vue'),
    props: {
      desktopComponent: HomeViewDesktop,
      mobileComponent: HomeViewMobile
    }
  },
  {
    path: '/gallery',
    component: () => import('./views/ResponsiveView.vue'),
    props: {
      desktopComponent: GalleryViewDesktop,
      mobileComponent: GalleryViewMobile
    }
  },
  {
    path: '/favorites',
    component: () => import('./views/ResponsiveView.vue'),
    props: {
      desktopComponent: FavoritesViewDesktop,
      mobileComponent: FavoritesViewMobile
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 在路由导航前检查屏幕宽度
router.beforeEach((to, from, next) => {
  // 更新屏幕宽度
  screenWidth.value = window.innerWidth
  next()
})

export default router