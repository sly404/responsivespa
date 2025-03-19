<template>
  <div class="tablet-layout">
    <nav class="sidebar">
      <div class="user-profile">
        <div class="user-avatar">搜狐用户P339</div>
      </div>
      <div class="nav-items">
        <div class="nav-item">消息</div>
        <div class="nav-item">订阅</div>
        <div class="nav-item">已赞</div>
        <div class="nav-item">收藏</div>
        <div class="nav-item">历史</div>
      </div>
    </nav>
    <main class="main-content">
      <div class="article-list">
        <div class="article-item">
          <img src="" alt="" class="article-image" />
          <div class="article-info">
            <h3>贵州村民组团去中东打工：5学生今天下午打工，最多是两个月，最大年龄为35岁</h3>
            <p class="article-meta">贵州村民组团去中东打工：5学生今天下午打工，最多是两个月，最大年龄为35岁</p>
          </div>
        </div>
        <div class="article-item">
          <img src="" alt="" class="article-image" />
          <div class="article-info">
            <h3>【独家】巴勒斯坦总统"北京之行"，对和谈意愿如何？</h3>
            <p class="article-meta">巴勒斯坦总统"北京之行"，对和谈意愿如何？</p>
          </div>
        </div>
        <div class="article-item">
          <img src="" alt="" class="article-image" />
          <div class="article-info">
            <h3>短暂罢工后半年内收入翻倍！中国打工人在德国的薪资待遇</h3>
            <p class="article-meta">短暂罢工后半年内收入翻倍！中国打工人在德国的薪资待遇</p>
          </div>
        </div>
        <div class="article-item">
          <img src="" alt="" class="article-image" />
          <div class="article-info">
            <h3>数据7年，中国外汇储备比第一了！</h3>
            <p class="article-meta">数据7年，中国外汇储备比第一了！</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomeViewTablet'
}
</script>

<style scoped>
.tablet-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  width: 200px;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid #eee;
}

.user-profile {
  margin-bottom: 1rem;
}

.user-avatar {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.nav-item {
  padding: 0.8rem;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-item {
  display: flex;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
}

.article-image {
  width: 120px;
  height: 80px;
  background-color: #eee;
  border-radius: 4px;
}

.article-info {
  flex: 1;
}

.article-info h3 {
  margin: 0;
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.article-meta {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}
</style>