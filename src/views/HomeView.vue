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
</style>
