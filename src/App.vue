<template>
  <router-view></router-view>
</template>

<script>
import { screenWidth } from './composables/useResponsive'

export default {
  data() {
    return {}
  },
  methods: {
    handleResize() {
      screenWidth.value = window.innerWidth
    }
  },
  mounted() {
    // 初始化屏幕宽度
    screenWidth.value = window.innerWidth
    // 添加窗口大小变化的监听器
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    // 移除窗口大小变化的监听器
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}
</style>
