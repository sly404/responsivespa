<template>
    <div class="mask-menu-wrapper" v-if="isShow" @touchmove.prevent>
        <div class="mask" @click="handleCancel"></div>
        <div class="button-list">
            <div class="title">{{ title }}</div>
            <div class="btns">
                <div :style="{color:'#F43640'}" @click="handleConfirm" class="confirm-btn">{{ confirmText }}</div>
                <div :style="{color:'#111'}" @click="handleCancel" class="cancel-btn">{{ cancelText }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ConfirmBox',
    computed: {
        isShow() {
            return this.$store.state.ui.confirmBox.isShow
        },
        config() {
            return this.$store.state.ui.confirmBox.config || {}
        },
        title() {
            return this.config.title || '确认操作'
        },
        confirmText() {
            return this.config.confirmText || '确认'
        },
        cancelText() {
            return this.config.cancelText || '取消'
        }
    },
    methods: {
        handleCancel() {
            this.$emit('cancel')
        },
        handleConfirm() {
            this.$emit('confirm')
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
            background: rgba(0,0,0,0.5);
        }
        .button-list {
            position: absolute;
            width: 280px;
            height: 146px;
            background: #FFFFFF;
            border-radius: 4Px;
            top:50%; 
            left:50%;
            transform: translate(-50%,-50%);
            padding: 32px 32px 24px;
            box-sizing: border-box;
            .title {
                line-height: 22px;
                font-size: 16Px;
                color: var(--color-text-primary);
                text-align: center;
            }
            .btns {
                font-size: 14Px !important;
                font-weight: 500;
                margin-top: 32px;
                display: flex;
                justify-content: space-between;
                div {
                    flex: 1;
                    border-radius: 4Px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: 500;
                    height: 36px;
                    background: #F2F2F2;
                }
                .confirm-btn {
                    margin-right: 14px !important;
                }
            }
        }
    }
</style>
