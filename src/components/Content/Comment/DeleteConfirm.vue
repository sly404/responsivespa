<template>
    <div class="mask-menu-wrapper" v-if="isShowConfirm" @touchmove.prevent>
        <div class="mask" @click="hideMask"></div>
        <div class="button-list">
            <div class="title">确认要删除这条评论吗？</div>
            <div class="btns">
                <div :style="{color:'#F43640'}" @click="deleteComment" class="delete-btn">删除</div>
                <div :style="{color:'#111'}" @click="hideMask" class="cancel-btn">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';
import { mapState } from 'vuex';
import { acodeConfig } from '../../../config/spmConfig';

    export default {
        name: 'DeleteConfirm',
        components: {
            'u-button' : Button
        },
        data() {
            return {
                timeout: null,
            }
        },
        computed: {
            ...mapState(['isShowConfirm', 'deleteCommentInfo'])
        },
        methods: {
            hideMask() {
                this.$store.commit('toggleDeleteConfirm')
            },
            deleteComment() {
                sendSpmAction(acodeConfig.deleteComment)
                this.$store.dispatch('deleteComment', this.deleteCommentInfo)
                this.hideMask();
            }
        },
    }
</script>

<style scoped lang="less">
    .mask-menu-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 300;
        .mask {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
        }
        .button-list {
            position: absolute;
            width: 560px;
            height: 292px;
            background: #FFFFFF;
            border-radius: 4Px;
            top:50%; 
            left:50%;
            transform: translate(-50%,-50%);
            padding: 64px 64px 48px;
            box-sizing: border-box;
            .title {
                line-height: 44px;
                font-size: 16Px;
                color: #111;
                text-align: center;
            }
            .btns {
                font-size: 14Px !important;
                font-weight: 500;
                margin-top: 64px;
                display: flex;
                justify-content: space-between;
                div {
                    flex: 1;
                    border-radius: 4Px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: 500;
                    height: 36Px;
                    background: #F2F2F2;
                }
                .delete-btn {
                    margin-right: 8Px !important;
                }
            }
        }
    }
</style>
