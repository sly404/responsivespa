<template>
    <div 
        class="reply-me" 
        ref="replyMe" 
        @scroll.passive="handleScroll">
        <comment-list 
            v-if="replyCommentList.length" 
            :comments="replyCommentList"
            :spmCCode="spmCCode"
            type="reply" 
            :pageNo="pageNo" 
            :isFinished="finished" 
            :getMore="getMoreReplyList">
        </comment-list>
        <div class="no-replies" v-else>
            <img src="../../../assets/images/icon_empty_list.png">
            <div>暂时还没有人回复您哦～</div>
        </div>
        <MobileInput v-if="showMobileInput"></MobileInput>
        <Report v-if="showReport"></Report>
    </div>
</template>

<script>
import { getReplyList } from '../../../requests/commentRequest';
import { mapGetters, mapState } from 'vuex';
import CommentList from './CommentList.vue';
import { throttle, event } from 'mpfe-utils'
// 异步组件
const MobileInput = () => import('./MobileInput.vue')
const Report = () => import('./Report.vue')

export default {
    name: 'ReplyMe',
    components: {
        CommentList,
        MobileInput,
        Report,
    },
    data() {
        return {
            pageNo: 1,
            finished: false,
            spmCCode: 'replytome',
        }
    },
    computed: {
        ...mapState(['replyCommentList']),
        ...mapGetters(['isMobile', 'isTablet']),
        showMobileInput(){
            return (this.isMobile || this.isTablet)
        },
        showReport(){
            return this.$store.state.commentReport?.isShow
        }
    },
    methods: {
        async getReplyList() {
            this.isLoading = true;
            try {
                const res = await getReplyList({
                    pageNo: this.pageNo,
                })
                const hasData = res?.data?.length >= 0
                if(!hasData) {
                    this.finished = true;
                    this.isLoading = false;
                    return;
                }
                // data空数组，且不是第一次请求
                if(res.data.length==0 && this.pageNo > 1) {
                    this.finished = true;
                    this.pageNo--;
                    return;
                }
                // data不足当前页size/2说明获取完了
                this.finished = res.data.length < this.pageSize / 2
                res.data.forEach((data) => {
                    if(data?.topic?.topicTitle) {
                        data.topic.topicTitle = data?.comment?.sourceType ==  17 ? `话题：${data?.topic.topicTitle}` : `原文：${data.topic.topicTitle}` // 17-话题
                    }
                });
                const replyList = this.$store.state.replyCommentList.concat(res.data);
                this.$store.commit('setReplyCommentList', replyList);
            } catch (error) {
                console.log(err);
            } finally {
                this.isLoading = false;
            }
        },
        getMoreReplyList() {
            if(this.finished || this.isLoading) {
                return;
            }
            this.pageNo++;
            this.getReplyList();
        },
        handleScroll() {
            if(!this.scrollFunc) {
                this.scrollFunc = throttle(() => {
                    const container = this.$refs.replyMe;
                    const scrollHeight = container.scrollHeight;
                    const scrollTop = container.scrollTop;
                    const clientHeight = container.clientHeight;
                    // 当距离底部小于100px且不在加载中且未加载完时，触发加载
                    if (scrollHeight - scrollTop - clientHeight < 100 && !this.isLoading && !this.finished) {
                        this.getMoreReplyList();
                    }
                }, 150)
            }
            this.scrollFunc()
        },
    },
    mounted() {
        this.getReplyList();
    }
}
</script>

<style lang="less" scoped>
.reply-me{
    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;
}
.no-replies{
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>