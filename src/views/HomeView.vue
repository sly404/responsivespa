<template>
    <div class="home-view" :class="{ mobile: isMobile, tablet: isTablet, desktop: isDesktop }">
        <TopHeader />
        <UserInfo />
        <!-- 导航组件 -->
        <AppNavigation :isContentActive="isContentActive" @content-active="onContentActive" />
        <!-- 路由视图容器 -->
        <RouterViewContainer :isContentActive="isContentActive" @back-to-navigation="backToNavigation" />
    </div>
</template>

<script>
import {
    isMobile,
    isTablet,
    isDesktop,
    setupResizeListener,
} from "../composables/useResponsive";
import AppNavigation from "../components/AppNavigation.vue";
import RouterViewContainer from "../components/RouterViewContainer.vue";
import TopHeader from "../components/TopHeader.vue";
import UserInfo from "../components/UserInfo.vue";
export default {
    name: "HomeView",
    components: {
        AppNavigation,
        RouterViewContainer,
        TopHeader,
        UserInfo,
    },
    data() {
        return {
            isContentActive: false,
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
        // 从移动导航激活内容区域
        onContentActive(active) {
            this.isContentActive = active;
        },

        // 返回到导航
        backToNavigation() {
            this.isContentActive = false;
        },
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
.home-view.mobile {
    flex-direction: column;
}

/* 平板端样式 (600px - 840px) */
.home-view.tablet {
    flex-direction: row;
}

/* 桌面端样式 (大于 840px) */
.home-view.desktop {
    flex-direction: row;
}
</style>
