<template>
    <div class="my-comment">
        <MobileHeader title="评论"></MobileHeader>
        <SwitchTab :tabs="tabs" @switchTab="handleSwitchTab"></SwitchTab>
        <router-view></router-view>
    </div>
</template>

<script>
import MobileHeader from '../../Header/MobileHeader.vue'
import SwitchTab from '../../SwitchTab.vue'
export default {
    name: 'Comment',
    components: {
        MobileHeader,
        SwitchTab
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
            this.$router.push({
                name: tab.routeName,
            })
        }
    }
}
</script>

<style lang="less" scoped>
.my-comment {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
</style>