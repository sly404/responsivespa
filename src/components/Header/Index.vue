<template>
    <DesktopHeader v-if="isDesktop"></DesktopHeader>
    <MobileHeader v-else :title="title"></MobileHeader>
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
        ...mapGetters(['isDesktop']),
    },
}
</script>

<style></style>
