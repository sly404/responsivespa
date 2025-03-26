<template>
    <div class="home-view" :class="{ mobile: isMobile, tablet: isTablet, desktop: isDesktop }">
        <Header />
        <UserInfo />
        <!-- 导航组件 -->
        <Navigation />
        <!-- 路由视图容器 -->
        <Content />
    </div>
</template>

<script>
import {
    isMobile,
    isTablet,
    isDesktop,
    setupResizeListener,
} from "../composables/useResponsive";
import Navigation from "../components/Navigation/index.vue";
import Content from "../components/Content/Index.vue";
import Header from "../components/Header/Index.vue";
import UserInfo from "../components/UserInfo.vue";
export default {
    name: "HomeView",
    components: {
        Navigation,
        Content,
        Header,
        UserInfo,
    },
    data() {
        return {
            cleanupListener: null,
        };
    },
    computed: {
        isMobile() {
            return isMobile.value;
        },
        isTablet() {
            return isTablet.value;
        },
        isDesktop() {
            return isDesktop.value;
        },
    },
    mounted() {
        // 设置窗口大小监听
        this.cleanupListener = setupResizeListener();
    },
    beforeDestroy() {
        // 清理窗口大小监听
        if (this.cleanupListener) {
            this.cleanupListener();
        }
    },
    methods: {
    },
};
</script>

<style scoped>
.home-view {
    display: flex;
    min-height: 100vh;
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: "PingFang SC", "Helvetica Neue", Arial, sans-serif;
    overflow-x: hidden;
    /* 防止水平滚动条出现 */
    position: relative;
    /* 确保子元素绝对定位正确 */
    width: 100%;
    /* 固定宽度防止动画过程中出现滚动条 */
}

/* 移动端样式 (小于 600px) */
.home-view {
    flex-direction: column;
}
</style>
