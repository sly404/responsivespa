<template>
  <div class="user-info">
    <div class="user-avatar">
      <img :src="placeholderAvatar" alt="用户头像" />
    </div>
    <h3 class="username">搜狐用户P339</h3>
    <span class="edit-profile">
      <i class="icon-edit"></i>
    </span>
  </div>
</template>

<script>
import { placeholderAvatar } from '../assets/placeholder'

export default {
  name: 'UserInfo',
  data() {
    return {
      placeholderAvatar
    }
  }
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  background-color: var(--color-background);
  padding: 0 16px 16px 16px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #FFFFFF;
  margin-right: 8px;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  margin: 0;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 18px;
  color: #111111;
  line-height: 25px;
  text-align: left;
  font-style: normal;
  margin-right: 13px;
}

.edit-profile {
  width: 14px;
  height: 14px;
  background: url("../assets/images/icon_edit.png") no-repeat center center;
  background-size: 100% 100%;
}
</style> 