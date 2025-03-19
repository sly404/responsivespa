import Vue from 'vue'
import VueRouter from 'vue-router'
import { ref, computed } from 'vue'

Vue.use(VueRouter)

// 创建一个全局的响应式屏幕宽度状态
export const screenWidth = ref(window.innerWidth)

// 定义屏幕尺寸断点
export const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 840
}

// 使用计算属性来决定视图类型
export const viewType = computed(() => {
  if (screenWidth.value < BREAKPOINTS.MOBILE) return 'mobile'
  if (screenWidth.value < BREAKPOINTS.TABLET) return 'tablet'
  return 'desktop'
})

// 动态导入组件
const HomeViewDesktop = () => import('../views/desktop/HomeView.vue')
const HomeViewTablet = () => import('../views/tablet/HomeView.vue')
const HomeViewMobile = () => import('../views/mobile/HomeView.vue')
const GalleryViewDesktop = () => import('../views/desktop/GalleryView.vue')
const GalleryViewTablet = () => import('../views/tablet/GalleryView.vue')
const GalleryViewMobile = () => import('../views/mobile/GalleryView.vue')
const FavoritesViewDesktop = () => import('../views/desktop/FavoritesView.vue')
const FavoritesViewTablet = () => import('../views/tablet/FavoritesView.vue')
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
      tabletComponent: HomeViewTablet,
      mobileComponent: HomeViewMobile
    }
  },
  {
    path: '/gallery',
    component: () => import('./views/ResponsiveView.vue'),
    props: {
      desktopComponent: GalleryViewDesktop,
      tabletComponent: GalleryViewTablet,
      mobileComponent: GalleryViewMobile
    }
  },
  {
    path: '/favorites',
    component: () => import('./views/ResponsiveView.vue'),
    props: {
      desktopComponent: FavoritesViewDesktop,
      tabletComponent: FavoritesViewTablet,
      mobileComponent: FavoritesViewMobile
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 在路由导航前检查屏幕宽度
router.beforeEach((to, from, next) => {
  // 更新屏幕宽度
  screenWidth.value = window.innerWidth
  next()
})

export default router