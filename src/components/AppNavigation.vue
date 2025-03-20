<template>
  <div class="app-navigation">
    <!-- 移动端使用MobileNavigation -->
      <MobileNavigation v-if="isMobile && !isContentActive" @navigate="onMobileNavigate" />
    
    <!-- 平板和桌面端使用DesktopNavigation -->
    <DesktopNavigation v-if="!isMobile" :screenWidth="screenWidth" />
  </div>
</template>

<script>
import { screenWidth, isMobile, isTablet, isDesktop } from '../composables/useResponsive'

// 动态按需导入导航组件 - 使用Vue 2的方式
const MobileNavigation = () => import('./MobileNavigation.vue')
const DesktopNavigation = () => import('./DesktopNavigation.vue')

export default {
  name: 'AppNavigation',
  components: {
    MobileNavigation,
    DesktopNavigation
  },
  props: {
    isContentActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    screenWidth() {
      return screenWidth.value
    },
    isMobile() {
      return isMobile.value
    },
    isTablet() {
      return isTablet.value
    },
    isDesktop() {
      return isDesktop.value
    }
  },
  methods: {
    onMobileNavigate() {
      this.$emit('content-active', true)
    }
  }
}
</script>

<style scoped>
.app-navigation {
  /* 导航样式 */
}

/* 导航栏滑动动画 */
.slide-right-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 2; /* 确保进入的元素在上层 */
  will-change: transform, opacity; /* 提示浏览器优化渲染 */
}

.slide-right-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0.0, 0.2, 1);
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 1; /* 确保离开的元素在下层 */
  will-change: transform, opacity;
}

.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}


.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
</style> 