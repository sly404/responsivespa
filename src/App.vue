<script>
import { screenWidth } from './router'

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

<template>
  <router-view></router-view>
</template>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
