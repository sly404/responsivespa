<template>
  <div class="desktop-layout">
    <nav class="sidebar">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <main class="main-content">
      <h1>图片展示</h1>
      <div class="image-grid">
        <div v-for="i in 8" :key="i" class="image-card">
          <div class="image-placeholder">
            <span>示例图片 {{ i }}</span>
          </div>
          <div class="image-info">
            <h3>图片标题 {{ i }}</h3>
            <p>图片描述内容</p>
            <button class="favorite-btn">收藏</button>
          </div>
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

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.image-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.image-card:hover {
  transform: translateY(-5px);
}

.image-placeholder {
  background-color: #e9ecef;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.image-info {
  padding: 1.5rem;
}

.image-info h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.image-info p {
  margin: 0.75rem 0;
  color: #6c757d;
}

.favorite-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.favorite-btn:hover {
  background-color: #2980b9;
}
</style>