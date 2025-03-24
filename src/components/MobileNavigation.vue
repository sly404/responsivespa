<template>
    <div class="mobile-navigation">
        <div class="interact-navigation">
            <div
                v-for="(item, index) in firstNavList"
                :key="index"
                class="nav-item"
                @click="navigateTo(item.url, index)"
            >
                <div class="icon-nav" :style="getIconStyle(item)"></div>
                <span>{{ item.title }}</span>
            </div>
        </div>
        <div class="content-navigation">
            <div 
                v-if="secondNavItem && secondNavItem.title" 
                class="nav-header">{{ secondNavItem.title }}
            </div>
            <div class="item-wrapper">
                <div 
                    v-for="(item, index) in secondNavList" 
                    :key="index" 
                    class="content-navigation-item"
                    @click="navigateTo(item.url, index)">
                    <div class="content-icon-nav" :style="getIconStyle(item)"></div>
                    <span>{{ item.title }}</span>
                </div>
            </div>  
        </div>
        <div 
            v-for="(otherNavItem, index) in otherNavList" 
            :key="'otherNav'+index" 
            class="list-navigation">
            <div 
                v-if="otherNavItem && otherNavItem.title" 
                class="nav-header">{{ otherNavItem.title }}
            </div>
            <template v-if="otherNavItem && otherNavItem.innerNews && otherNavItem.innerNews.length > 0">
                <div 
                    v-for="(item, childIndex) in otherNavItem.innerNews" 
                    :key="'otherNavList'+childIndex" 
                    class="list-navigation-item"
                    @click="navigateTo(item.url, index)">
                    <span>{{ item.title }}</span>
                    <span class="icon-arrow-right"></span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { setPicSize } from 'mpfe-utils'
import { mockNavItems } from '../requests/mockData'
export default {
    name: "MobileNavigation",
    data() {
        return {
            activeIndex: 0,
            navItems: mockNavItems,
        }
    },
    created() {
        // 根据当前路由设置活跃项
        this.setActiveFromRoute()
    },
    computed:{
        firstNavList(){
            return this.navItems?.[0]?.innerNews
        },
        secondNavItem(){
            return this.navItems?.[1]
        },
        secondNavList(){
            return this.navItems?.[1]?.innerNews
        },
        otherNavList(){
            return this.navItems?.slice(2)
        },
    },
    watch: {
        $route() {
            this.setActiveFromRoute()
        },
    },
    methods: {
        navigateTo(route, index) {
            this.activeIndex = index
            if(/^(https?:)?\/\//.test(route)){
                window.location.href = route
                return
            }
            // 检查当前路由是否已经是目标路由
            if (this.$route.path !== route) {
                this.$router.push(route)
            }
            // 触发导航事件，通知父组件
            this.$emit("navigate")
        },
        setActiveFromRoute() {
            const currentPath = this.$route.path
            const foundIndex = this.navItems.findIndex(
                (item) => item.url === currentPath
            )
            if (foundIndex !== -1) {
                this.activeIndex = foundIndex
            }
        },
        getIconStyle(item){
            const cover = item?.cover?.[0]
            const cutCover = setPicSize(cover, 22*2, 22*2)
            return `background-image: url(${cutCover})`
        }
    },
}
</script>

<style lang="less" scoped>
.mobile-navigation{
    .nav-header{
        font-weight: 500;
        font-size: 14px;
        color: var(--color-text-primary);
        line-height: 20px;
        margin-bottom: 13px
    }
    .interact-navigation {
        background-color: var(--color-white);
        height: 66px;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 16px 8px 16px;
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            color: var(--color-text-primary);
            font-weight: 400;
            line-height: 16px;
            text-align: right;
            font-style: normal;
            cursor: pointer;
            flex: 1;
            .icon-nav{
                width: 22px;
                height: 22px;
                background-size: 100% 100%;
                margin-bottom: 4px;
            }
        }
    }
    .content-navigation{
        background-color: var(--color-white);
        border-radius: 4px;
        box-sizing: border-box;
        padding: 12px;
        margin: 0 16px 8px 16px;
        .item-wrapper{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .content-navigation-item{
            display: flex;
            align-items: center;
            flex-direction: column;
            flex: 1;
            .content-icon-nav{
                width: 32px;
                height: 32px;
                background-color: var(--color-background);
                border-radius: 50%;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                margin-bottom: 5px;
            }
            span{
                font-size: 12px;
                color: var(--color-text-primary);
                line-height: 16px;
            }
        }
    }
    .list-navigation{
        background-color: var(--color-white);
        border-radius: 4px;
        box-sizing: border-box;
        padding: 12px;
        margin: 0 16px 8px 16px;
        .list-navigation-item{
            padding: 10px 4px;
            box-sizing: border-box;
            width: 100%;
            color: var(--color-text-primary);
            font-size: 14px;
            line-height: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .icon-arrow-right{
                width: 14px;
                height: 14px;
                background-image: url('../assets/images/icon_right_8e8e8e.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
    }
}
</style>
