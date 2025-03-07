<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { screenWidth } from './router'

const router = useRouter()

const handleResize = () => {
  screenWidth.value = window.innerWidth
  // 在屏幕尺寸变化时重新加载路由组件
  router.replace(router.currentRoute.value.fullPath)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
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
