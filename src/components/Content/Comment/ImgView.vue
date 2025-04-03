<template>
    <div 
        v-if="isShow" 
        class="img-view" 
        @click="handleCLose" 
        @mousewheel.prevent.stop>
        <img :src="imgUrl" alt="预览图片">
    </div>
</template>

<script>

/**
* @description 图片预览
* 显示原图规则:
* 如果宽和高都小于一屏，就原大小展示在屏幕中间（没有撑满）
* 如果宽或高大于一屏的情况下就：宽大于高就宽撑满，高等比缩放，
* 如果高大于宽就高撑满，宽等比缩放
*/
export default {
name: "ImgView",
computed:{
    imgUrl(){
        return this.$store.state.viewImgUrl
    },
    isShow(){
        return this.$store.state.showImgView
    },
},
methods:{
    handleCLose(){
        this.$store.commit('setShowImgView', false)
    }
}
}
</script>

<style lang="less" scoped>
.img-view{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    img{
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
}
</style>