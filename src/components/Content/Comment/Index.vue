<template>
    <div class="comment">
        <MobileHeader v-if="isMobile" title="评论"></MobileHeader>
        <SwitchTab :tabs="tabs" @switchTab="handleSwitchTab"></SwitchTab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MobileHeader from '../../Header/MobileHeader.vue'
import SwitchTab from '../../SwitchTab.vue'
export default {
    name: 'Comment',
    components: {
        MobileHeader,
        SwitchTab
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            tabs: [{
                name: '我的评论',
                path: '/comment/myComment',
                routeName: 'myComment',
            },{
                name: '回复我的',
                path: '/comment/replyMe',
                routeName: 'replyMe',
            }]
        }
    },
    methods: {
        handleSwitchTab(tab) {
        }
    }
}
</script>

<style lang="less" scoped>
.comment {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}
</style>