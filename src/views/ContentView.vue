<template>
    <div v-if="isShow" class="router-view-container">
        <transition :name="isMobile ? 'slide-right' : 'fade'" mode="out-in">
            <div
                v-if="isShow"
                class="content-container"
                :class="{ 'mobile-active': isMobileView }"
                key="content-container"
            >
                <div class="router-view-wrapper">
                    <router-view></router-view>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ContentView',
    data() {
        return {
            transitionName: 'fade',
            lastRoutePath: '',
        }
    },
    computed: {
        ...mapGetters(['isContentActive', 'isMobile']),
        isShow() {
            return !this.isMobile || this.isContentActive
        },
        isMobileView() {
            return this.isMobile && this.isContentActive
        },
    },
    mounted() {
        // 监听路由变化
        this.$router.afterEach((to, from) => {
            // 设置路由切换的动画效果
            this.setTransitionEffect(to, from)
            this.lastRoutePath = to.path
        })
    },
    methods: {
        // 设置过渡动画效果
        setTransitionEffect(to, from) {
            // 特殊处理：如果没有来源路由（首次加载）或目标是首页
            if (!from.name || to.path === '/home') {
                this.transitionName = 'fade'
                return
            }

            // 特殊处理：移动端导航返回
            if (this.isMobile && from.path !== '/home' && to.path === '/home') {
                this.transitionName = 'slide-back'
                return
            }

            // 通过路由路径分析导航方向
            const toPathParts = to.path.split('/').filter(Boolean)
            const fromPathParts = from.path.split('/').filter(Boolean)

            // 比较路由深度和路径来判断方向
            if (toPathParts.length > fromPathParts.length) {
                // 向更深层级导航
                this.transitionName = 'slide-forward'
            } else if (toPathParts.length < fromPathParts.length) {
                // 返回上层
                this.transitionName = 'slide-back'
            } else {
                // 同级导航 - 比较路径部分确定是前进还是后退
                const lastCommonIndex = this.findLastCommonPathIndex(toPathParts, fromPathParts)

                if (lastCommonIndex === -1 || lastCommonIndex === toPathParts.length - 1) {
                    // 完全不同的路径或最后一段相同 - 使用淡入淡出
                    this.transitionName = 'fade'
                } else {
                    // 比较最后不同部分的字母顺序来决定方向
                    const toNext = toPathParts[lastCommonIndex + 1] || ''
                    const fromNext = fromPathParts[lastCommonIndex + 1] || ''

                    this.transitionName =
                        toNext.localeCompare(fromNext) > 0 ? 'slide-forward' : 'slide-back'
                }
            }
        },

        findLastCommonPathIndex(path1, path2) {
            const minLength = Math.min(path1.length, path2.length)
            for (let i = 0; i < minLength; i++) {
                if (path1[i] !== path2[i]) {
                    return i - 1
                }
            }
            return minLength - 1
        },
    },
}
</script>

<style scoped>
.router-view-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.content-container.mobile-active {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: var(--color-background);
    width: 100vw; /* 使用视口宽度单位 */
    overflow-x: hidden;
}

.router-view-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
}

/* 路由视图容器，确保动画正确 */
.router-view-wrapper .transition-wrapper {
    position: relative;
    width: 100%;
    flex: 1;
    display: flex;
}

/* 过渡动画 */
/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* 路由前进后退动画 */
.slide-forward-enter-active,
.slide-back-enter-active {
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2; /* 确保进入的元素在上层 */
    will-change: transform, opacity;
}

.slide-forward-leave-active,
.slide-back-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1; /* 确保离开的元素在下层 */
    will-change: transform, opacity;
}

/* 前进动画 */
.slide-forward-enter-from {
    transform: translateX(100%); /* 新页面从右侧进入 */
    opacity: 0;
}

.slide-forward-leave-to {
    transform: translateX(-100%); /* 旧页面向左侧离开 */
    opacity: 0;
}

/* 返回动画 */
.slide-back-enter-from {
    transform: translateX(-100%); /* 新页面从左侧进入 */
    opacity: 0;
}

.slide-back-leave-to {
    transform: translateX(100%); /* 旧页面向右侧离开 */
    opacity: 0;
}

/* 内容容器滑动动画 */
.slide-right-enter-active {
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    will-change: transform, opacity;
}

.slide-right-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    will-change: transform, opacity;
}

.slide-right-enter-from {
    transform: translateX(100%); /* 从右侧进入 */
    opacity: 0;
}

.slide-right-leave-to {
    transform: translateX(100%); /* 向右侧离开 */
    opacity: 0;
}
</style>
