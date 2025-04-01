<template>
    <div>
        <MobileHeader v-if="isMobile" />
        <h1>我的订阅</h1>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MobileHeader from '../../Header/MobileHeader.vue'
export default {
    name: 'Follow',
    components: {
        MobileHeader,
    },
    computed: {
        ...mapGetters(['isMobile']),
    },
}
</script>

<style></style>
