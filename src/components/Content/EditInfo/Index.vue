<template>
    <div class="edit-info">
        <MobileHeader v-if="isMobile" />
        <div v-else class="content-text edit-head">编辑资料</div>
        <div class="avatar-container">
            <div class="left-text">头像</div>
            <div class="avatar-box">
                <img src="@/assets/images/avatar.png" alt="avatar" class="avatar-img">
                <span class="avatar-select"></span>
            </div>
        </div>
        <div class="nickname-container">
            <div class="left-text">昵称</div>
            <div class="nickname-box">
                <div class="nickname-input">{{ nickname }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditInfo',
    computed: {
        ...mapGetters(['isMobile', 'nickname', 'avatar']),
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
            .avatar-img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;
            }
            .avatar-select{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
                background-color: #111111;
                background-image: url('@/assets/images/avatar-select.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
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
        }
    }
}
</style>