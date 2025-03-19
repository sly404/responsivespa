<template>
  <div class="mobile-home">
    <header class="user-info">
      <div class="user-profile">
        <div class="user-avatar">搜狐用户P339</div>
      </div>
      <div class="user-stats">
        <div class="stat-item">
          <router-link to="/notifications" class="icon">🔔</router-link>
          <span>消息</span>
        </div>
        <div class="stat-item">
          <router-link to="/orders" class="icon">📋</router-link>
          <span>订阅</span>
        </div>
        <div class="stat-item">
          <router-link to="/likes" class="icon">👍</router-link>
          <span>已赞</span>
        </div>
        <div class="stat-item">
          <router-link to="/favorites" class="icon">⭐</router-link>
          <span>收藏</span>
        </div>
        <div class="stat-item">
          <router-link to="/history" class="icon">🕒</router-link>
          <span>历史</span>
        </div>
      </div>
    </header>
    <nav class="content-nav">
      <div class="nav-section">
        <h3>内容管理</h3>
        <div class="nav-items">
          <router-link to="/comments" class="nav-item">评论</router-link>
          <router-link to="/discussions" class="nav-item">动态/评论</router-link>
          <router-link to="/posts" class="nav-item">视频</router-link>
        </div>
      </div>
      <div class="nav-section">
        <h3>更多服务</h3>
        <div class="service-items">
          <div class="service-item">搜狐号</div>
          <div class="service-item">搜狐金券</div>
          <div class="service-item">意见反馈</div>
          <div class="service-item">设置</div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomeViewMobile'
}
</script>

<style scoped>
.mobile-home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.user-info {
  background-color: white;
  padding: 1rem;
}

.user-profile {
  margin-bottom: 1rem;
}

.user-avatar {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.user-stats {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.icon {
  text-decoration: none;
  font-size: 1.5rem;
}

.stat-item span {
  font-size: 0.8rem;
  color: #666;
}

.content-nav {
  flex: 1;
  padding: 1rem;
}

.nav-section {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.nav-section h3 {
  margin: 0;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
}

.nav-items {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
}

.nav-item {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
}

.service-items {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.5rem;
}

.service-item {
  padding: 0.8rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: #333;
  font-size: 0.9rem;
}
</style>