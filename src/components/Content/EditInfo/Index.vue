<template>
    <div class="edit-info">
        <MobileHeader v-if="isMobile" />
        <div v-else class="content-text edit-head">编辑资料</div>
        <div class="avatar-container">
            <div class="content-text left-text">头像</div>
            <div class="avatar-box">
                <img :src="avatar" alt="avatar" class="avatar-img">
                <span class="avatar-select"></span>
            </div>
        </div>
        <div class="nickname-container">
            <div class="content-text left-text">昵称</div>
            <div class="nickname-box">
                <div class="content-text nickname-input">{{ nickname }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MobileHeader from '../../Header/MobileHeader.vue'

export default {
    name: 'EditInfo',
    components: {
        MobileHeader,
    },
    computed: {
        ...mapGetters(['isMobile']),
        ...mapState(['nickname', 'avatar']),
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="less" scoped>
.edit-info {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .content-text{
        font-size: 16px;
        line-height: 22px;
        white-space: nowrap;
    }
    .edit-head {
        width: 100%;
        height: 40px;
        padding: 9px 20px;
        box-sizing: border-box;
        font-weight: 500;
        color: var(--color-text-primary);
        box-shadow: inset 0px -1px 0px 0px #EBEBEB;
    }
    .left-text{
        font-weight: 400;
        color: var(--color-text-primary);
    }
    .right-text{
        font-weight: 400;
        color: var(--color-text-secondary);
    }
    .avatar-container{
        margin: 12px 16px 0 16px;
        display: flex;
        align-items: center;
        .avatar-box{
            margin-left: 36px;
            width: 68px;
            height: 68px;
            box-sizing: border-box;
            position: relative;
            .avatar-img{
                width: 68px;
                height: 68px;
                border-radius: 50%;
                overflow: hidden;
            }
            .avatar-select{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: #111111;
                background-image: url('../../../assets/images/icon_avatar_select.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: 12px 12px;
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
    }
    .nickname-container{
        margin: 0px 16px;
        display: flex;
        align-items: center;
        .nickname-box{
            margin-left: 36px;
            width: 100%;
            height: 48px;
            .nickname-input{
                font-weight: 400;
                color: var(--color-text-secondary);
                line-height: 48px;
            }  
        }
    }
}
</style>