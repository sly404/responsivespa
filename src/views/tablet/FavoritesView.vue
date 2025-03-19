<template>
  <div class="tablet-layout">
    <nav class="sidebar">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <main class="main-content">
      <h1>我的收藏</h1>
      <p>这是一个响应式布局的示例，当前是平板端视图。</p>
      <div class="favorites-list">
        <div class="favorite-item" v-for="i in 4" :key="i">
          <div class="favorite-header">
            <h3>收藏项目 {{ i }}</h3>
            <span class="favorite-date">2024-01-{{ i }}</span>
          </div>
          <p class="favorite-description">这是一个收藏项目的详细描述，展示了该项目的主要内容和特点。</p>
          <div class="favorite-tags">
            <span class="tag">标签1</span>
            <span class="tag">标签2</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'FavoritesViewTablet'
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

.favorites-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.favorite-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.favorite-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.favorite-date {
  color: #6c757d;
  font-size: 0.9rem;
}

.favorite-description {
  color: #495057;
  margin-bottom: 1rem;
}

.favorite-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.85rem;
}
</style>