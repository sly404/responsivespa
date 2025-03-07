<template>
  <div class="mobile-favorites">
    <nav class="mobile-nav">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <div class="content">
      <h1>我的收藏</h1>
      <div class="favorites-list">
        <div v-for="i in 4" :key="i" class="favorite-item">
          <div class="favorite-image">
            <span>收藏图片 {{ i }}</span>
          </div>
          <div class="favorite-info">
            <h3>收藏标题 {{ i }}</h3>
            <p>收藏时间: 2024-01-{{ i }}</p>
            <button class="remove-btn">取消收藏</button>
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
.mobile-favorites {
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

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}

.favorite-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.favorite-image {
  background-color: #e9ecef;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.favorite-info {
  padding: 1rem;
}

.favorite-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #343a40;
}

.favorite-info p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #c82333;
}
</style>