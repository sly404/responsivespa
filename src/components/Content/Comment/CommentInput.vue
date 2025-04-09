<template>
    <div class="comment-input-container">
        <!-- 移动端只需要挂载一次，在需要时通过fixed定位显示 -->
        <MobileInput v-if="isMobile" ref="mobileInput" />
        <!-- 桌面端在每个评论项中使用 -->
        <DesktopInput 
            v-else 
            @cancelReplay="handleCancelReply"
            v-show="!isMobile && showInItem"
        />
    </div>
</template>

<script>
import MobileInput from './MobileInput.vue'
import DesktopInput from './DesktopInput.vue'
import { mapGetters } from 'vuex'
import { eventNameMap } from '../../../config/eventConfig'
import { event } from 'mpfe-utils'

export default {
    name: 'CommentInput',
    components: {
        MobileInput,
        DesktopInput
    },
    props: {
        // 用于控制桌面端是否在当前评论项中显示
        showInItem: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters(['isDesktop']),
    },
    methods: {
        // 显示移动端评论输入弹窗
        showMobileInput() {
            if (this.isMobile && this.$refs.mobileInput) {
                this.$refs.mobileInput.showCommentPop();
            }
        },
        
        // 处理回复取消事件
        handleCancelReply() {
            this.showInItem = false;
        }
    },
    mounted() {
        // 移动端监听全局事件，用于显示评论输入弹窗
        if (this.isMobile) {
            event.on(eventNameMap.showCommentPop, () => {
                this.showMobileInput();
            });
        }
    },
    beforeDestroy() {
        // 移动端解绑全局事件
        if (this.isMobile) {
            event.off(eventNameMap.showCommentPop);
        }
    }
}
</script>

<style lang="less" scoped>
.comment-input-container {
    width: 100%;
    position: relative;
}
</style>
