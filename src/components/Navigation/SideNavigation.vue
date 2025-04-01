<template>
    <div class="sidebar-navigation">
        <!-- 统一处理所有导航项 -->
        <template v-for="(navItem, sectionIndex) in navItems">
            <div
                :key="'section-' + sectionIndex"
                class="sidebar-section"
                v-if="navItem.innerNews && navItem.innerNews.length"
            >
                <div class="section-head">
                    <i class="section-icon" :class="getIconClass(navItem, sectionIndex)"></i>
                    <span class="section-title">{{ navItem.title }}</span>
                </div>
                <ul class="section-list">
                    <li
                        v-for="(item, itemIndex) in navItem.innerNews"
                        :key="'item-' + sectionIndex + '-' + itemIndex"
                        class="section-item"
                        :class="{
                            active: isRouteActive(item),
                        }"
                    >
                        <router-link v-if="!isExternalLink(item.url)" :to="item.url">
                            <span class="section-item-title">{{ item.title }}</span>
                        </router-link>
                        <a v-else :href="item.url">
                            <span class="section-item-title">{{ item.title }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
import navigationMixin from './mixins/navigationMixin'
import { mapGetters } from 'vuex'

export default {
    name: 'SideNavigation',
    mixins: [navigationMixin],
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['isDesktop']),
    },
    methods: {
        isExternalLink(url) {
            return /^(https?:)?\/\//.test(url)
        },
        isRouteActive(item) {
            // 使用路由路径匹配方式判断当前路由是否激活
            return (
                this.$route.path === item.url ||
                (item.routeName && this.$route.name === item.routeName)
            )
        },
        getIconClass(navItem, sectionIndex) {
            // 根据导航项或索引返回适当的图标类名
            if (navItem.routeName) {
                return `icon-${navItem.routeName}`
            }

            // 如果没有routeName，使用默认图标类
            const defaultIcons = ['icon-interaction', 'icon-content', 'icon-more']
            return defaultIcons[sectionIndex] || 'icon-default'
        },
    },
}
</script>

<style lang="less" scoped>
.sidebar-navigation {
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    padding: 12px 8px;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;

    .sidebar-section {
        &::after {
            content: '';
            display: block;
            height: 1px;
            background-color: #ebebeb;
            margin: 12px 0px;
        }
        &:last-of-type::after {
            display: none;
        }
        .section-head {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            padding: 9px 8px;
        }
        .section-icon {
            width: 18px;
            height: 18px;
            margin-right: 8px;
        }
        .section-title {
            font-weight: 500;
            font-size: 16px;
            color: var(--color-text-primary);
        }
        .section-list {
            list-style: none;
            padding: 0;
            margin: 0;
            .section-item {
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                padding: 9px 0px;
                cursor: pointer;
                margin-bottom: 4px;
                &:last-of-type {
                    margin-bottom: 0;
                }
                .section-item-title {
                    margin-left: 34px;
                    color: var(--color-text-secondary);
                    font-size: 14px;
                    line-height: 22px;
                    font-weight: 400;
                }
                &.active {
                    background-color: var(--color-yellow);
                    .section-item-title {
                        color: var(--color-text-primary);
                        font-weight: 500;
                    }
                }
            }
        }
    }
}
.desktop {
    .sidebar-navigation .section-item-title {
        margin-left: 38px !important;
    }
}
</style>
