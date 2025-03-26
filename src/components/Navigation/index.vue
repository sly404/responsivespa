<template>
    <div class="app-navigation">
        <!-- 移动端使用MobileNavigation -->
        <MobileNavigation v-if="showMobileNavigation" @navigate="onMobileNavigate"/>
        <!-- 平板和桌面端使用DesktopNavigation -->
        <DesktopNavigation v-if="showDesktopNavigation"/>
    </div>
</template>

<script>
import { screenWidth,isMobile } from "../../composables/useResponsive"
import { mapGetters, mapActions } from 'vuex'

// 动态按需导入导航组件 - 使用Vue 2的方式
const MobileNavigation = () => import("./MobileNavigation.vue")
const DesktopNavigation = () => import("./DesktopNavigation.vue")

export default {
    name: "AppNavigation",
    components: {
        MobileNavigation,
        DesktopNavigation,
    },
    computed: {
        ...mapGetters(['isContentActive']),
        screenWidth() {
            return screenWidth.value
        },
        isMobile() {
            return isMobile.value
        },
        showMobileNavigation() {
            return this.isMobile && !this.isContentActive
        },
        showDesktopNavigation() {
            return !this.isMobile
        },
    },
    methods: {
        ...mapActions(['setContentActive']),
        onMobileNavigate() {
            this.setContentActive(true)
        },
    },
}
</script>

<style scoped>
</style>
