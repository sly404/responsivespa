<template>
    <TopNav v-if="isDesktop"></TopNav>
    <TopHeader v-else :title="title"></TopHeader>
</template>

<script>
import { isDesktop } from "../../composables/useResponsive"
const TopHeader = () => import("./TopHeader.vue")
const TopNav = () => import("./TopNav.vue")
export default {
    name: "Header",
    props: {
        title: {
            type: String,
            default: "",
        },
    },
    components: {
        TopHeader,
        TopNav,
    },
    computed: {
        isDesktop() {
            return isDesktop.value
        },
    },
}
</script>

<style>

</style>