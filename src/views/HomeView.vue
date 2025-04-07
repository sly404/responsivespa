<template>
    <div class="home-view" :class="contentClass">
        <TopHeader :title="title" />
        <UserInfo id="userInfo" />
        <div class="home-view-content">
            <!-- 导航组件 -->
            <Navigation class="navigation" />
            <!-- 路由视图容器 -->
            <ContentView class="content-view" />
        </div>
    </div>
</template>

<script>
import Navigation from '../components/Navigation/index.vue'
import ContentView from './ContentView.vue'
import TopHeader from '../components/Header/Index.vue'
import UserInfo from '../components/UserInfo.vue'
export default {
    name: 'HomeView',
    components: {
        Navigation,
        ContentView,
        TopHeader,
        UserInfo,
    },
    data() {
        return {
            cleanupListener: null,
            title: '个人中心',
        }
    },
    computed: {
        isMobile() {
            return this.$store.getters.isMobile
        },
        isTablet() {
            return this.$store.getters.isTablet
        },
        isDesktop() {
            return this.$store.getters.isDesktop
        },
        contentClass() {
            return {
                mobile: this.isMobile,
                tablet: this.isTablet,
                desktop: this.isDesktop,
            }
        },
    },
    created() {
        // 初始化屏幕宽度
        this.$store.commit('setScreenWidth', window.innerWidth)
        // 获取用户信息
        this.$store.dispatch('setUserInfo')
    },
    mounted() {
        // 设置窗口大小监听
        this.cleanupListener = this.$store.dispatch('setupResizeListener')
    },
    beforeUnmount() {
        // 清理窗口大小监听
        if (this.cleanupListener) {
            this.cleanupListener()
        }
    },
    methods: {
        showDeleteConfirm() {
            this.$confirm({
                title: '确定要删除此项吗？',
                confirmText: '删除',
                cancelText: '取消'
            }).then(() => {
                alert('已确认删除')
            }).catch(() => {
                // 用户取消操作
            })
        },
        showPublishConfirm() {
            this.$confirm({
                title: '确定要发布文章吗？',
                confirmText: '发布',
                cancelText: '稍后'
            }).then(() => {
                alert('已确认发布')
            }).catch(() => {
                // 用户取消操作
            })
        },
        showCustomConfirm() {
            this.$confirm({
                title: '您确定要执行此操作吗？',
                confirmText: '确定',
                cancelText: '我再想想'
            }).then(() => {
                alert('操作已执行')
            }).catch(() => {
                // 用户取消操作
            })
        }
    }
}
</script>

<style lang="less" scoped>
.home-view {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
    overflow-x: hidden;
    position: relative;
    width: 100%;
    .home-view-content {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
}
.mobile {
    #userInfo {
        margin-left: 16px;
        margin-right: 16px;
    }
}
.tablet {
    #userInfo,
    .home-view-content {
        margin-left: 16px;
        margin-right: 16px;
    }
    .navigation {
        width: 134px;
        margin-right: 12px;
    }
}
.desktop {
    #userInfo,
    .home-view-content {
        margin-left: auto;
        margin-right: auto;
        width: 930px;
    }
    .navigation {
        width: 174px;
        margin-right: 24px;
        padding: 12px 24px !important;
    }
}

.confirm-test {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    
    .test-btn {
        padding: 10px 15px;
        background: #4285f4;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        
        &:hover {
            background: #3367d6;
        }
    }
}
</style>
