<template>
    <!-- 移动端使用MobileNavigation -->
    <MobileNavigation v-if="showMobileNavigation" />
    <!-- 平板和桌面端使用DesktopNavigation -->
    <DesktopNavigation v-else-if="showDesktopNavigation" />
</template>

<script>
import { mapGetters, mapState } from 'vuex'

// 动态按需导入导航组件 - 使用Vue 2的方式
const MobileNavigation = () => import('./MobileNavigation.vue')
const DesktopNavigation = () => import('./SideNavigation.vue')

export default {
    name: 'AppNavigation',
    components: {
        MobileNavigation,
        DesktopNavigation,
    },
    computed: {
        ...mapGetters(['isMobile']),
        ...mapState(['isContentActive']),
        showMobileNavigation() {
            return this.isMobile && !this.isContentActive
        },
        showDesktopNavigation() {
            return !this.isMobile
        },
    },
}
</script>

<style scoped></style>
