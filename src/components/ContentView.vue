<template>
  <transition name="fade">
    <div class="content-view">
      <div class="section-header">
        <h2 class="section-title">{{ title }}</h2>
      </div>
      
      <div class="content-list">
        <slot>
          <!-- 默认内容，若子组件未提供内容时显示 -->
          <div v-for="(item, index) in items" :key="index" class="content-item">
            <div v-if="item.thumbnail" class="content-thumbnail">
              <img :src="item.thumbnail" :alt="item.title" />
            </div>
            <div class="content-details">
              <h3 class="content-title">{{ item.title }}</h3>
              <div class="content-meta">
                <span class="meta-date">{{ item.date }}</span>
                <span class="meta-likes">
                  <i class="icon-like"></i>
                  <span>{{ item.likes }}</span>
                </span>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { sampleArticles } from '../assets/placeholder.js'

export default {
  name: 'ContentView',
  props: {
    title: {
      type: String,
      default: '已发布的文章'
    },
    items: {
      type: Array,
      default: () => sampleArticles
    }
  }
}
</script>

<style scoped>
.content-view {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: var(--color-background);
}

.section-header {
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  margin: 0;
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 不同屏幕尺寸的布局调整 */
@media (max-width: 600px) {
  .content-item {
    display: flex;
    background-color: var(--color-white);
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .content-thumbnail {
    width: 120px;
    height: 80px;
    overflow: hidden;
  }

  .content-details {
    flex: 1;
    padding: 8px 12px;
  }

  .content-title {
    margin: 0 0 8px;
    font-size: 14px;
    line-height: 1.4;
    font-weight: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@media (min-width: 600px) and (max-width: 840px) {
  .content-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .content-item {
    background-color: var(--color-white);
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .content-thumbnail {
    width: 100%;
    height: 120px;
    overflow: hidden;
  }

  .content-details {
    padding: 12px;
  }

  .content-title {
    margin: 0 0 8px;
    font-size: 15px;
    line-height: 1.4;
    font-weight: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@media (min-width: 840px) {
  .content-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }

  .content-item {
    display: flex;
    background-color: var(--color-white);
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
    padding: 16px;
  }

  .content-thumbnail {
    width: 180px;
    height: 120px;
    margin-right: 16px;
    overflow: hidden;
    border-radius: 4px;
  }

  .content-details {
    flex: 1;
  }

  .content-title {
    margin: 0 0 12px;
    font-size: 18px;
    line-height: 1.5;
    font-weight: normal;
  }
}

/* 通用样式 */
.content-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-text-tertiary);
}

@media (min-width: 840px) {
  .content-meta {
    font-size: 14px;
  }
}

.meta-likes {
  display: flex;
  align-items: center;
}

.meta-likes i {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  display: inline-block;
  background-color: var(--color-text-tertiary);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z'/%3E%3C/svg%3E");
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z'/%3E%3C/svg%3E");
}

/* 动画效果 */
.fade-enter-active, 
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, 
.fade-leave-to {
  opacity: 0;
}
</style> 