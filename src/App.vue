<template>
    <router-view></router-view>
</template>

<script>
export default {
    data() {
        return {
            cleanupResizeListener: null,
        }
    },
}
</script>
