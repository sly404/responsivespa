<template>
  <div class="mobile-home">
    <nav class="mobile-nav">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <div class="content">
      <h1>移动端首页</h1>
      <p>这是一个响应式布局的示例，当前是移动端视图。</p>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
.mobile-home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.mobile-nav {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.nav-item {
  text-decoration: none;
  color: #6c757d;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-item.active {
  color: #007bff;
  background-color: #e9ecef;
}

.content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>