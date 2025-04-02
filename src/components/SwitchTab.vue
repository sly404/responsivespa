<template>
    <div class="switch-tab">
        <div class="inner-container">
            <div class="tab-container">
                <template v-for="(tab, index) in tabs">
                    <router-link 
                        v-if="tab.routeName"
                        :key="tab.routeName + index"
                        :to="{ name: tab.routeName }" 
                        class="tab-item"
                        :data-index="index">
                        {{ tab.name }}
                    </router-link>
                    <div 
                        class="tab-item" v-else
                        :key="index"
                        :class="{ active: currentTabIndex === index }"
                        @click="handleTabClick(tab, index)"
                        :data-index="index"
                    >
                        {{ tab.name }}
                    </div>
                </template>
            </div>
            <div class="tab-underline" :style="underlineStyle"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SwitchTab',
    props: {
        tabs: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            currentTabIndex: 0,
            underlineStyle: {
                left: '0px'
            }
        }
    },
    methods: {
        handleTabClick(tab, index) {
            this.currentTabIndex = index
            this.$emit('switchTab', tab, index)
        },
        updateUnderLineStyle() {
            this.$nextTick(() => {
                const tabElement = this.$el.querySelector(`[data-index="${this.currentTabIndex}"]`)
                if (tabElement) {
                    const tabWidth = tabElement.offsetWidth
                    const tabLeft = tabElement.offsetLeft
                    const underlineWidth = 8
                    const distance = tabLeft + tabWidth / 2 - underlineWidth / 2
                    this.underlineStyle = {
                        transform: `translateX(${distance}px)`,
                    }
                }
            })
        },
        // 根据当前路由设置选中的选项卡
        updateTabFromRoute() {
            const currentRouteName = this.$route.name
            const tabIndex = this.tabs.findIndex(tab => tab.routeName === currentRouteName)
            if (tabIndex !== -1) {
                this.currentTabIndex = tabIndex
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            // 先根据当前路由更新选中的标签
            this.updateTabFromRoute()
            // 然后更新下划线位置
            this.updateUnderLineStyle()
        })
    },
    watch: {
        '$route': {
            handler() {
                this.updateTabFromRoute()
            },
            immediate: true,
            deep: true
        },
        currentTabIndex: {
            handler(curVal, oldVal) {
                console.log('curVal', curVal)
                this.updateUnderLineStyle()
            },
            immediate: true
        },
    }
}
</script>

<style lang="less" scoped>
.switch-tab {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 40px;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px 0px #EBEBEB;
    &::-webkit-scrollbar{
        display: none;
    }
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;
    overflow: -moz-hidden-unscrollable;
    -ms-overflow-style: none;
    .inner-container {
        width: fit-content;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        position: relative;
    }
    .tab-container {
        display: flex;
        flex-wrap: nowrap;
        .tab-item{
            height: 40px;
            padding: 9px 12px;
            font-weight: 400;
            font-size: 16px;
            color: var(--color-text-tertiary);
            line-height: 22px;
            cursor: pointer;
            margin-left: 8px;
            &.active,&.router-link-active {
                color: var(--color-text-primary);
                font-weight: 500;
            }
        }
    }
    .tab-underline {
        position: absolute;
        bottom: 0;
        left: 0px;
        width: 16px;
        height: 2px;
        background: rgba(17,17,17,0.9);
        z-index: 1;
        transition: transform 0.15s ease-in-out;
    }
}
</style>