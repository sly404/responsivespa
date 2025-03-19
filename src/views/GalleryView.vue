<template>
  <div class="gallery-view">
    <nav class="nav-bar">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <main class="main-content">
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
    </main>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
.gallery-view {
  display: flex;
  height: 100vh;
}

/* 移动端样式 */
@media (max-width: 767px) {
  .gallery-view {
    flex-direction: column;
  }

  .nav-bar {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }

  .main-content {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .image-card {
    flex-direction: column;
  }
}

/* 平板端样式 */
@media (min-width: 768px) and (max-width: 1023px) {
  .nav-bar {
    width: 150px;
    background-color: #2c3e50;
    padding: 1.5rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .main-content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    background-color: #f8f9fa;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

/* 桌面端样式 */
@media (min-width: 1024px) {
  .nav-bar {
    width: 200px;
    background-color: #2c3e50;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .main-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background-color: #f8f9fa;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}

/* 通用样式 */
.nav-item {
  text-decoration: none;
  color: #ecf0f1;
  padding: 0.75rem 1rem;
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
</style>