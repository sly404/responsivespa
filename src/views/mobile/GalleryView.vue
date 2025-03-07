<template>
  <div class="mobile-gallery">
    <nav class="mobile-nav">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <div class="content">
      <h1>图片展示</h1>
      <div class="image-grid">
        <div v-for="i in 6" :key="i" class="image-card">
          <div class="image-placeholder">
            <span>示例图片 {{ i }}</span>
          </div>
          <div class="image-info">
            <h3>图片标题 {{ i }}</h3>
            <p>图片描述内容</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
.mobile-gallery {
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

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1rem 0;
}

.image-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.image-placeholder {
  background-color: #e9ecef;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.image-info {
  padding: 0.75rem;
}

.image-info h3 {
  margin: 0;
  font-size: 1rem;
  color: #343a40;
}

.image-info p {
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: #6c757d;
}
</style>