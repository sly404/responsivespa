<template>
  <div class="tablet-layout">
    <nav class="sidebar">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <main class="main-content">
      <h1>图片浏览</h1>
      <p>这是一个响应式布局的示例，当前是平板端视图。</p>
      <div class="image-grid">
        <div class="image-card" v-for="i in 6" :key="i">
          <div class="image-placeholder"></div>
          <p class="image-title">图片标题 {{ i }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'GalleryViewTablet'
}
</script>

<style scoped>
.tablet-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 150px;
  background-color: #2c3e50;
  padding: 1.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-item {
  text-decoration: none;
  color: #ecf0f1;
  padding: 0.75rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  text-align: center;
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
  padding: 1.5rem;
  overflow-y: auto;
  background-color: #f8f9fa;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.image-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.image-placeholder {
  background-color: #e9ecef;
  width: 100%;
  padding-top: 75%;
}

.image-title {
  padding: 0.75rem;
  margin: 0;
  font-size: 0.9rem;
  color: #343a40;
}
</style>