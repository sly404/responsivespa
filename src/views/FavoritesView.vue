<template>
  <div class="favorites-view">
    <nav class="nav-bar">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <main class="main-content">
      <h1>我的收藏</h1>
      <div class="favorites-container">
        <div v-for="i in 6" :key="i" class="favorite-item">
          <div class="favorite-image">
            <span>收藏图片 {{ i }}</span>
          </div>
          <div class="favorite-info">
            <h3>收藏标题 {{ i }}</h3>
            <p>收藏时间: 2024-01-{{ i }}</p>
            <div class="actions">
              <button class="view-btn">查看</button>
              <button class="remove-btn">取消收藏</button>
            </div>
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
.favorites-view {
  display: flex;
  height: 100vh;
}

/* 移动端样式 */
@media (max-width: 767px) {
  .favorites-view {
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
    padding: 1rem;
    overflow-y: auto;
  }

  .favorites-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .favorite-item {
    flex-direction: column;
  }

  .actions {
    flex-direction: column;
    gap: 0.5rem;
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

  .favorites-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

  .favorites-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.favorite-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.favorite-item:hover {
  transform: translateY(-5px);
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
  padding: 1.5rem;
}

.favorite-info h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.favorite-info p {
  margin: 0.75rem 0;
  color: #6c757d;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.view-btn,
.remove-btn {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.view-btn {
  background-color: #3498db;
  color: white;
}

.view-btn:hover {
  background-color: #2980b9;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
}

.remove-btn:hover {
  background-color: #c82333;
}
</style>