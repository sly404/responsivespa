<template>
    <div :class="avatarCls">
        <img class="avatar" :src="url" />
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'big',
        },
        url: {
            type: String,
            default: '//statics.itc.cn/mobile/ucenter/images/ic_home_photo_gray.png',
        },
    },
    data() {
        return {
            avatarCls: 'avatar-wrapper ' + this.type,
            mediaTarget: '/media/' + this.$route.params.author_id,
        }
    },
    mounted() {},
}
</script>

<style scoped lang="less">
    .avatar-wrapper {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
        &.noborder{
            border: none;
        }
    }
</style>
