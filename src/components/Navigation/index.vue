<template>
    <div class="app-navigation">
        <!-- 移动端使用MobileNavigation -->
        <MobileNavigation
            v-if="isMobile && !isContentActive"
            @navigate="onMobileNavigate"
        />
        <!-- 平板和桌面端使用DesktopNavigation -->
        <DesktopNavigation v-if="!isMobile" :screenWidth="screenWidth" />
    </div>
</template>

<script>
import {
    screenWidth,
    isMobile,
    isTablet,
    isDesktop,
} from "../../composables/useResponsive"

// 动态按需导入导航组件 - 使用Vue 2的方式
const MobileNavigation = () => import("./MobileNavigation.vue")
const DesktopNavigation = () => import("./DesktopNavigation.vue")

export default {
    name: "AppNavigation",
    components: {
        MobileNavigation,
        DesktopNavigation,
    },
    props: {
        isContentActive: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        screenWidth() {
            return screenWidth.value
        },
        isMobile() {
            return isMobile.value
        },
        isTablet() {
            return isTablet.value
        },
        isDesktop() {
            return isDesktop.value
        },
    },
    methods: {
        onMobileNavigate() {
            this.$emit("content-active", true)
        },
    },
}
</script>

<style scoped>
</style>
