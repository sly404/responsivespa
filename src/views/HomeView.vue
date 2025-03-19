<template>
  <div class="home">
    <nav class="nav">
      <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/gallery" class="nav-item" active-class="active">图片</router-link>
      <router-link to="/favorites" class="nav-item" active-class="active">收藏</router-link>
    </nav>
    <div class="content">
      <div class="content-header">
        <h1>个人中心</h1>
      </div>
      <div class="content-main">
        <div class="content-section">
          <h2>内容管理</h2>
          <div class="section-items">
            <div class="section-item">
              <span>评论</span>
            </div>
            <div class="section-item">
              <span>动态/评论</span>
            </div>
            <div class="section-item">
              <span>视频</span>
            </div>
          </div>
        </div>
        <div class="content-section">
          <h2>更多服务</h2>
          <div class="section-items">
            <div class="section-item">
              <span>搜狐号</span>
            </div>
            <div class="section-item">
              <span>搜狐金券</span>
            </div>
            <div class="section-item">
              <span>黑名单</span>
            </div>
            <div class="section-item">
              <span>设置</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const screenWidth = ref(window.innerWidth)

    const handleResize = () => {
      screenWidth.value = window.innerWidth
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      screenWidth
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.nav {
  display: flex;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.nav-item {
  text-decoration: none;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin: 0 0.5rem;
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

.content-header {
  margin-bottom: 2rem;
}

.content-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
}

.section-items {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.section-item {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
}

.section-item:hover {
  background-color: #e9ecef;
}

/* 窄屏样式 (< 600px) */
@media (max-width: 599px) {
  .home {
    flex-direction: column;
  }

  .nav {
    justify-content: space-around;
  }

  .section-items {
    grid-template-columns: 1fr;
  }
}

/* 中屏样式 (600px - 840px) */
@media (min-width: 600px) and (max-width: 839px) {
  .home {
    flex-direction: row;
  }

  .nav {
    flex-direction: column;
    width: 200px;
    border-right: 1px solid #eee;
    border-bottom: none;
  }

  .nav-item {
    margin: 0.5rem 0;
  }

  .section-items {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 宽屏样式 (> 840px) */
@media (min-width: 840px) {
  .home {
    flex-direction: row;
  }

  .nav {
    flex-direction: column;
    width: 240px;
    border-right: 1px solid #eee;
    border-bottom: none;
  }

  .nav-item {
    margin: 0.5rem 0;
  }

  .section-items {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>