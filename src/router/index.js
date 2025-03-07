import { createRouter, createWebHistory } from 'vue-router'
import { ref, computed , onMounted, onUnmounted } from 'vue'

// 创建一个全局的响应式屏幕宽度状态
export const screenWidth = ref(window.innerWidth)

// 使用计算属性来决定是否为移动端视图
export const isMobileView = computed(() => screenWidth.value <= 600)

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => screenWidth.value > 600 
      ? import('../views/desktop/HomeView.vue')
      : import('../views/mobile/HomeView.vue')
  },
  {
    path: '/gallery',
    component: () => screenWidth.value > 600
      ? import('../views/desktop/GalleryView.vue')
      : import('../views/mobile/GalleryView.vue')
  },
  {
    path: '/favorites',
    component: () => screenWidth.value > 600
      ? import('../views/desktop/FavoritesView.vue')
      : import('../views/mobile/FavoritesView.vue')
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

// 添加和移除窗口大小变化的监听器
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

export default router