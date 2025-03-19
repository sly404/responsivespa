<template>
  <div class="home-view">
    <nav class="nav-bar">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <main class="main-content">
      <h1>欢迎来到首页</h1>
      <div class="feature-grid">
        <div v-for="i in 6" :key="i" class="feature-card">
          <div class="feature-icon">
            <span>功能 {{ i }}</span>
          </div>
          <div class="feature-info">
            <h3>功能标题 {{ i }}</h3>
            <p>功能描述内容</p>
            <button class="action-btn">开始使用</button>
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
.home-view {
  display: flex;
  height: 100vh;
}

/* 移动端样式 */
@media (max-width: 767px) {
  .home-view {
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

  .feature-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .feature-card {
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

  .feature-grid {
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

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

.feature-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  background-color: #e9ecef;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.feature-info {
  padding: 1.5rem;
}

.feature-info h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.feature-info p {
  margin: 0.75rem 0;
  color: #6c757d;
}

.action-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #2980b9;
}
</style>