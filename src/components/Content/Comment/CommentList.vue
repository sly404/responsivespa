<template>
    <div 
        class="comment-list-wrapper" 
        :data-spm="spmCCode" 
        data-spm-stop="init">
        <comment-item
            v-for="(comment, index) in comments"
            :key="comment.id"
            :data="comment"
            :type="type"
            :index="index"
        ></comment-item>
        <div class="comment-list-wrapper-loading" v-if="finished">已显示全部评论</div>
        <div class="comment-list-wrapper-loading" v-else>
            正在加载
            <div class="glyph glyph-loading"></div>
        </div>
        <ImgView></ImgView>
    </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import ImgView from './ImgView.vue'
import { domDidChange } from 'mpfe-utils'

export default {
    props: {
        type: {
            type: String,
            default: 'comment',
        },
        comments: {
            type: Array,
            default: () => [],
        },
        getMore: {
            type: Function,
            default: () => {
                return function () {}
            },
        },
        isFinished: {
            type: Boolean,
            default: false,
        },
        spmCCode: {
            type: String,
            default: '',
        },
    },
    components: {
        'comment-item': CommentItem,
        ImgView,
    },
    data() {
        return {}
    },
    computed: {
        finished() {
            return this.isFinished
        },
    },
    methods: {
        bindScroll(eight) {
            const load_bar_height =
                document.querySelector('.comment-list-wrapper-loading').clientHeight + 96
            const scrollTop = window.scrollY

            if (scrollTop >= document.body.scrollHeight - window.innerHeight - load_bar_height) {
                this.loadMore()
            }
        },
        loadMore() {
            this.getMore()
        },
    },
    mounted() {
        window.addEventListener('scroll', this.bindScroll)
        this.$nextTick(() => {
            domDidChange(this.spmCCode)
        })
    },
    unmounted() {
        window.removeEventListener('scroll', this.bindScroll)
    },
}
</script>

<style scoped lang="less">
@keyframes rotating {
    0% {
        transform: rotate(0);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.comment-list-wrapper{
    .comment-list-wrapper-loading {
        font-size: 12px; /*px*/
        text-align: center;
        margin: 20px 0;
        color: #a5a5a5;
        .glyph {
            display: inline-block;
            margin-left: 18px;
            animation: rotating 0.8s linear infinite;
        }
    }
}
</style>
