<template>
  <div class="home-view" :class="{ 'mobile': isMobile, 'tablet': isTablet, 'desktop': isDesktop }">
    <!-- 移动端使用MobileNavigation -->
    <MobileNavigation v-if="isMobile && !isContentActive" @navigate="onMobileNavigate" />
    
    <!-- 平板和桌面端使用DesktopNavigation -->
    <DesktopNavigation v-if="!isMobile" :screenWidth="screenWidth" />
    
    <!-- 路由视图区域 - 内容区域 -->
    <transition 
      :name="isMobile ? 'slide-right' : 'fade'" 
      mode="out-in">
      <div 
        v-if="!isMobile || isContentActive" 
        class="content-container" 
        :class="{ 'mobile-active': isMobile && isContentActive }"
        :key="'content-container'">
        <div v-if="isMobile && isContentActive" class="mobile-header">
          <button class="back-button" @click="backToNavigation">
            <i class="icon-back"></i> 返回
          </button>
        </div>
        <div class="router-view-wrapper">
          <router-view v-slot="{ Component }">
            <transition 
              :name="transitionName">
              <div class="transition-wrapper" :key="$route.fullPath">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </div>
            </transition>
          </router-view>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { screenWidth, BREAKPOINTS, viewType } from '../router'
import { defineAsyncComponent } from 'vue'

// 动态按需导入导航组件
const MobileNavigation = defineAsyncComponent(() => 
  import('../components/MobileNavigation.vue')
)

const DesktopNavigation = defineAsyncComponent(() => 
  import('../components/DesktopNavigation.vue')
)

export default {
  name: 'HomeView',
  components: {
    MobileNavigation,
    DesktopNavigation
  },
  data() {
    return {
      screenWidth,
      isContentActive: false,
      transitionName: 'fade', // 默认路由切换动画
      lastRoutePath: ''
    }
  },
  computed: {
    viewType() {
      return viewType.value;
    },
    isMobile() {
      return this.screenWidth < BREAKPOINTS.MOBILE;
    },
    isTablet() {
      return this.screenWidth >= BREAKPOINTS.MOBILE && this.screenWidth < BREAKPOINTS.TABLET;
    },
    isDesktop() {
      return this.screenWidth >= BREAKPOINTS.TABLET;
    }
  },
  watch: {
    '$route'(to, from) {
      // 当路由发生变化且处于移动端时，设置内容为活跃状态
      if (this.isMobile && to.path !== '/home') {
        this.isContentActive = true;
      }
      
      // 设置路由切换的动画效果
      this.setTransitionEffect(to, from);
      this.lastRoutePath = to.path;
    },
    isMobile(newVal, oldVal) {
      // 当屏幕尺寸变化不再是移动端时，重置内容活跃状态
      if (!newVal && oldVal) {
        this.isContentActive = false;
      }
    }
  },
  created() {
    // 初始化上一个路由路径
    this.lastRoutePath = this.$route.path;
    
    // 监听窗口大小变化，更新screenWidth
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // 清理事件监听
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    onMobileNavigate() {
      this.isContentActive = true;
    },
    backToNavigation() {
      this.isContentActive = false;
    },
    setTransitionEffect(to, from) {
      // 特殊处理：如果没有来源路由（首次加载）或目标是首页
      if (!from.name || to.path === '/home') {
        this.transitionName = 'fade';
        return;
      }
      
      // 特殊处理：移动端导航返回
      if (this.isMobile && from.path !== '/home' && to.path === '/home') {
        this.transitionName = 'slide-back';
        return;
      }
      
      // 通过路由路径分析导航方向
      const toPathParts = to.path.split('/').filter(Boolean);
      const fromPathParts = from.path.split('/').filter(Boolean);
      
      // 比较路由深度和路径来判断方向
      if (toPathParts.length > fromPathParts.length) {
        // 向更深层级导航
        this.transitionName = 'slide-forward';
      } else if (toPathParts.length < fromPathParts.length) {
        // 返回上层
        this.transitionName = 'slide-back';
      } else {
        // 同级导航 - 比较路径部分确定是前进还是后退
        const lastCommonIndex = this.findLastCommonPathIndex(toPathParts, fromPathParts);
        
        if (lastCommonIndex === -1 || lastCommonIndex === toPathParts.length - 1) {
          // 完全不同的路径或最后一段相同 - 使用淡入淡出
          this.transitionName = 'fade';
        } else {
          // 比较最后不同部分的字母顺序来决定方向（这只是一种简单的方式）
          const toNext = toPathParts[lastCommonIndex + 1] || '';
          const fromNext = fromPathParts[lastCommonIndex + 1] || '';
          
          this.transitionName = toNext.localeCompare(fromNext) > 0 ? 
            'slide-forward' : 'slide-back';
        }
      }
    },
    findLastCommonPathIndex(path1, path2) {
      const minLength = Math.min(path1.length, path2.length);
      for (let i = 0; i < minLength; i++) {
        if (path1[i] !== path2[i]) {
          return i - 1;
        }
      }
      return minLength - 1;
    },
    handleResize() {
      // 更新屏幕宽度
      screenWidth.value = window.innerWidth;
    }
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  overflow-x: hidden; /* 防止水平滚动条出现 */
  position: relative; /* 确保子元素绝对定位正确 */
  width: 100%; /* 固定宽度防止动画过程中出现滚动条 */
}

/* 移动端样式 (小于 600px) */
.home-view.mobile {
  flex-direction: column;
}

.home-view.mobile .content-container {
  flex: 1;
  width: 100%;
}

.home-view.mobile .content-container.mobile-active {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: var(--color-background);
  width: 100vw; /* 使用视口宽度单位 */
  overflow-x: hidden;
}

.mobile-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 16px;
  color: var(--color-text-primary);
  cursor: pointer;
  padding: 8px 0;
}

.icon-back {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/%3E%3C/svg%3E");
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/%3E%3C/svg%3E");
  margin-right: 8px;
}

.router-view-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
}

/* 路由视图容器，确保动画正确 */
.router-view-wrapper .transition-wrapper {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
}

/* 平板端样式 (600px - 840px) */
.home-view.tablet {
  flex-direction: row;
}

.home-view.tablet .content-container {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 桌面端样式 (大于 840px) */
.home-view.desktop {
  flex-direction: column;
}

.home-view.desktop .content-container {
  display: flex;
  flex: 1;
  overflow-x: hidden;
}

/* 过渡动画 */
/* 淡入淡出动画 */
.fade-enter-active, 
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, 
.fade-leave-to {
  opacity: 0;
}

/* 导航栏滑动动画 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
}

.slide-left-enter-from,
.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-leave-to,
.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

/* 路由切换动画 */
.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1);
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

/* 前进动画 */
.slide-forward-enter-from {
  transform: translateX(-100%); /* 新页面从右侧进入 */
  opacity: 0;
}

.slide-forward-leave-to {
  transform: translateX(100%); /* 旧页面向左侧离开 */
  opacity: 0;
}

/* 返回动画 */
.slide-back-enter-from {
  transform: translateX(100%); /* 新页面从左侧进入 */
  opacity: 0;
}

.slide-back-leave-to {
  transform: translateX(-100%); /* 旧页面向右侧离开 */
  opacity: 0;
}
</style>