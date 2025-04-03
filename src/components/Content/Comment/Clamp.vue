<template>
    <div class="clamp-container">
        <div class="clamp-wrapper" :class="{ folded: isFolded, expand: isExpand }">
            <CommentText v-if="content" class="clamp-content" ref="clampContent" :text="content"></CommentText>
            <a href="javascript:;" class="clamp-show-more" @click="expand">
                更多
                <i class="glyph glyph-fold"></i>
            </a>
        </div>
        <div 
            v-if="img"
            class="attachment"
            @click.stop="handleImgClick(img, $event)">
            <img :src="getCommentImg(img)">
        </div>
    </div>
</template>

<script>
import { setPicSize } from 'mpfe-utils'
import CommentText from 'common-components/lib/commentText/index'
import 'common-components/lib/commentText/index.css'

export default {
    props: {
        content: {
            type: String,
            default: '',
        },
        img:{
            type: String,
            default: '',
        }
    },
    components: {
        CommentText,
    },
    data() {
        return {
            isFolded: false,
            isExpand: false,
        }
    },
    methods: {
        expand() {
            this.isExpand = true
        },
        checkExpand() {
            // 当内容超出两行时，显示“更多”按钮
            const clampWrapper = this.$el
            const clampContent = this.$el.querySelector('.clamp-content')
            const clampWrapperHeight = clampWrapper.offsetHeight
            const clampContentHeight = clampContent?.offsetHeight
            if (clampContentHeight > clampWrapperHeight) {
                this.isFolded = true
            }
        },
        handleImgClick(imgUrl, event){
            this.$store.commit('setShowImgView', true)
            this.$store.commit('setViewImgUrl', imgUrl) // 预览显示原图
            const clickEl = event.target
            const elHeight = clickEl.offsetHeight
            const elWidth = clickEl.offsetWidth
            const top = clickEl?.getBoundingClientRect().top + elHeight / 2
            const left = clickEl?.getBoundingClientRect().left + elWidth / 2
            this.$store.commit('setViewImgOrigin', `${left}px ${top}px`)
        },
        getCommentImg(img){
            if(!img) return
            return setPicSize(img, 300, 300, 'c_fit', 70)
        },
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.checkExpand()
            }, 300)
        })
    },
    updated() {
        this.checkExpand()
    },
}
</script>

<style scoped lang="less">
    @import '../../../styles/mixin.less';
    .clamp-wrapper {
        position: relative;
        max-height: 1.5; /* no */ 
        margin-bottom: 10px;
        overflow: hidden;
        .clamp-content {
            position: relative;
            color: #656565;
            word-break: break-all;
            line-height: 1.5;
            /deep/ .emoji{
                display: inline-flex;
                align-items: center;
                justify-content: center;
                line-height: normal;
            }
            /deep/ .comment-at{
                color: #143CA8;
            }
        }
        .clamp-show-more {
            display: none;
            position: absolute;
            right: 0;
            bottom: 1px; /* no */
            padding-left: 80px;
            font-size: 26px; /* px */
            color: #6d98d4;
            // background: -webkit-linear-gradient(left, rgba(238,239,241,0) 20%, rgba(238,239,241,0.7) 35%, rgba(238,239,241,1) 48%);
            background: linear-gradient(to right, rgba(238,239,241,0) 20%, rgba(238,239,241,0.7) 35%, rgba(238,239,241,1) 48%);
            .glyph {
                font-size: 36px; /*px*/
                padding-right: 3px;
            }
        }
        &.folded {
            .clamp-show-more {
                display: block;
            }            
        }
        &.expand {
            max-height: none;
            overflow: auto;
            .clamp-show-more {
                display: none;
            }
        }
    }
    .attachment{
        width: 96PX;
        height: 96PX;
        margin: 8PX 0PX;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>
