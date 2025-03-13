<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { screenWidth } from './router'

const router = useRouter()

const handleResize = () => {
  screenWidth.value = window.innerWidth
  // 在屏幕尺寸变化时重新加载路由组件
  router.replace(router.currentRoute.value.fullPath)
}

onMounted(() => {
  // 初始化屏幕宽度
  screenWidth.value = window.innerWidth
  // 添加窗口大小变化的监听器
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 移除窗口大小变化的监听器
  window.removeEventListener('resize', handleResize)
})
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
