<template>
  <div class="home-view">
    <!-- 移动端顶部用户信息 -->
    <div class="user-info">
      <div class="avatar"></div>
      <div class="user-details">
        <h3>用户名</h3>
        <p>用户简介</p>
      </div>
    </div>
    <!-- 移动端功能图标导航栏 -->
    <nav class="mobile-nav">
      <div class="nav-item">
        <i class="icon-message"></i>
        <span>消息</span>
      </div>
      <div class="nav-item">
        <i class="icon-subscribe"></i>
        <span>订阅</span>
      </div>
      <div class="nav-item">
        <i class="icon-favorite"></i>
        <span>收藏</span>
      </div>
      <div class="nav-item">
        <i class="icon-history"></i>
        <span>历史</span>
      </div>
      <div class="nav-item">
        <i class="icon-more"></i>
        <span>更多</span>
      </div>
    </nav>
    <!-- 左侧导航栏 -->
    <nav class="side-nav">
      <div class="nav-group">
        <h3 class="group-title">互动管理</h3>
        <router-link to="/comments" class="nav-item" active-class="active">评论管理</router-link>
        <router-link to="/messages" class="nav-item" active-class="active">消息管理</router-link>
      </div>
      <div class="nav-group">
        <h3 class="group-title">内容管理</h3>
        <router-link to="/articles" class="nav-item" active-class="active">文章管理</router-link>
        <router-link to="/videos" class="nav-item" active-class="active">视频管理</router-link>
      </div>
    </nav>
    <!-- 顶部导航栏（桌面端） -->
    <nav class="top-nav">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/discover" class="nav-item" active-class="active">发现</router-link>
      <router-link to="/following" class="nav-item" active-class="active">关注</router-link>
    </nav>
    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="content-cards">
        <div class="card">
          <h3>评论</h3>
          <p>最新评论动态</p>
        </div>
        <div class="card">
          <h3>动态/评论</h3>
          <p>互动数据统计</p>
        </div>
        <div class="card">
          <h3>视频</h3>
          <p>视频内容管理</p>
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
  background-color: #f5f7fa;
}

/* 移动端样式 */
@media (max-width: 600px) {
  .home-view {
    flex-direction: column;
  }

  .user-info {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: white;
    border-bottom: 1px solid #e4e7ed;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #e4e7ed;
    margin-right: 1rem;
  }

  .user-details h3 {
    margin: 0;
    font-size: 1rem;
    color: #303133;
  }

  .user-details p {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: #909399;
  }

  .mobile-nav {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background-color: white;
    border-bottom: 1px solid #e4e7ed;
  }

  .mobile-nav .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #606266;
    font-size: 0.75rem;
  }

  .mobile-nav .nav-item i {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .side-nav,
  .top-nav {
    display: none;
  }

  .main-content {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }

  .content-cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

/* 平板端样式 */
@media (min-width: 600px) and (max-width: 840px) {
  .home-view {
    display: flex;
    flex-direction: row;
  }

  .user-info,
  .mobile-nav,
  .top-nav {
    display: none;
  }

  .side-nav {
    width: 200px;
    background-color: white;
    padding: 1.5rem 1rem;
    border-right: 1px solid #e4e7ed;
  }

  .nav-group {
    margin-bottom: 1.5rem;
  }

  .group-title {
    font-size: 0.875rem;
    color: #909399;
    margin: 0 0 0.75rem;
    padding: 0 0.75rem;
  }

  .main-content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
  }

  .content-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* 桌面端样式 */
@media (min-width: 840px) {
  .home-view {
    display: flex;
    flex-direction: column;
  }

  .user-info,
  .mobile-nav {
    display: none;
  }

  .top-nav {
    display: flex;
    justify-content: center;
    background-color: #ffd700;
    padding: 1rem;
  }

  .top-nav .nav-item {
    color: #303133;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    margin: 0 1rem;
  }

  .top-nav .nav-item.active {
    color: #409eff;
  }

  .main-wrapper {
    display: flex;
    flex: 1;
  }

  .side-nav {
    width: 220px;
    background-color: white;
    padding: 2rem 1rem;
    border-right: 1px solid #e4e7ed;
  }

  .main-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  .content-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

/* 通用样式 */
.nav-item {
  display: block;
  padding: 0.75rem;
  color: #606266;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-item:hover {
  background-color: #f5f7fa;
  color: #409eff;
}

.nav-item.active {
  background-color: #ecf5ff;
  color: #409eff;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.card h3 {
  margin: 0 0 1rem;
  font-size: 1.125rem;
  color: #303133;
}

.card p {
  color: #606266;
  font-size: 0.875rem;
  margin: 0;
}
</style>