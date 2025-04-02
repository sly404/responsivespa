<template>
    <component :is="currentHeader" :title="title"></component>
</template>

<script>
import { mapGetters } from 'vuex'
const MobileHeader = () => import('./MobileHeader.vue')
const DesktopHeader = () => import('./DesktopHeader.vue')
export default {
    name: 'TopHeader',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    components: {
        MobileHeader,
        DesktopHeader,
    },
    computed: {
        ...mapGetters(['isDesktopHeader']),
        currentHeader() {
            return this.isDesktopHeader ? DesktopHeader : MobileHeader
        }
    },
}
</script>

<style lang="less" scoped>
.top-header {
    background-color: var(--color-background) !important;
}
</style>
