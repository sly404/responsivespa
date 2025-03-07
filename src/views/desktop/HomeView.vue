<template>
  <div class="desktop-layout">
    <nav class="sidebar">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <main class="main-content">
      <h1>桌面端首页</h1>
      <p>这是一个响应式布局的示例，当前是桌面端视图。</p>
      <div class="feature-grid">
        <div class="feature-card">
          <h3>特色功能 1</h3>
          <p>桌面端特有的布局展示。</p>
        </div>
        <div class="feature-card">
          <h3>特色功能 2</h3>
          <p>更大的显示空间。</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
.desktop-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #2c3e50;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-item {
  text-decoration: none;
  color: #ecf0f1;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #34495e;
}

.nav-item.active {
  background-color: #3498db;
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #f8f9fa;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.feature-card h3 {
  margin-top: 0;
  color: #2c3e50;
}
</style>