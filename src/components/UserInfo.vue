<template>
    <div class="user-info">
        <div class="user-avatar">
            <img :src="placeholderAvatar" alt="用户头像" />
        </div>
        <h3 class="username">搜狐用户P339</h3>
        <span class="edit-profile" @click="editProfile">
            <span class="edit-profile-text">编辑</span>
            <i class="icon-right"></i>
        </span>
    </div>
</template>

<script>
import { placeholderAvatar } from '../assets/placeholder'

export default {
    name: 'UserInfo',
    data() {
        return {
            placeholderAvatar,
        }
    },
    methods: {
        editProfile() {
            this.$router.push({name: 'editInfo'})
        }
    }
}
</script>

<style lang="less" scoped>
.user-info {
    display: flex;
    align-items: center;
    background-color: var(--color-background);
    margin-top: 12px;
    margin-bottom: 16px;
    .user-avatar {
        box-sizing: border-box;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #ffffff;
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
        font-size: 16px;
        color: #111111;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        margin-right: 12px;
    }

    .edit-profile {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        .edit-profile-text{
            font-weight: 400;
            font-size: 12px;
            color: var(--color-text-tertiary);
            line-height: 16px;
            margin-right: 2px;
        }
        .icon-right{
            width: 12px;
            height: 12px;
            background: url('../assets/images/icon_right_8e8e8e.png') no-repeat center center;
            background-size: 100% 100%;
        }
    }
}
.mobile {
    .user-avatar {
        width: 48px;
        height: 48px;
    }
    .username {
        font-weight: 500;
        font-size: 18px;
        line-height: 25px;
    }
}
.tablet {
    .user-avatar {
        width: 58px;
        height: 58px;
    }
}
.desktop {
    .user-avatar {
        width: 72px;
        height: 72px;
    }
}
</style>
