<template>
    <transition name="fade" mode="out-in">
        <div class="loadingToast" v-show="isShow">
            <div class="loading-icon"></div>
            <div class="text">{{message}}</div>
        </div>
    </transition>
</template>

<script>


export default {
    name: 'LoadingToast',
    computed:{
        isShow(){
            return this.$store.state.loadingToast?.isShow
        },
        message(){
            return this.$store.state.loadingToast?.message
        },
    },
}
</script>

<style lang="less" scoped>
.loadingToast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: rgba(0,0,0,.7);
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    z-index: 999;
    padding: 28px 32px;
    max-width: 456px;
    visibility: visible;
    .loading-icon {
        width: 22PX;
        height: 22PX;
        background: url('../assets/img/loading.gif') no-repeat center;
        background-size: contain;
    }
    .text{
        margin-left: 16px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 32px;
        color: #FFFFFF;
        line-height: 44px;
        text-align: left;
        font-style: normal;
        white-space: nowrap;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: all ease-in-out .2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
    visibility: hidden;
}
</style>