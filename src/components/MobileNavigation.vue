<template>
    <div class="mobile-navigation">
        <div
            v-for="(item, index) in navItems"
            :key="index"
            class="nav-item"
            @click="navigateTo(item.route, index)"
        >
            <i class="icon-nav" :class="'icon-' + item.icon"></i>
            <span>{{ item.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "MobileNavigation",
    data() {
        return {
            activeIndex: 0,
            navItems: [
                { title: "消息", icon: "notification", route: "/messages" },
                { title: "订阅", icon: "bookmark", route: "/follow" },
                { title: "已赞", icon: "like", route: "/likeArticle" },
                { title: "收藏", icon: "star", route: "/favorites" },
                { title: "历史", icon: "history", route: "/history" },
            ],
        }
    },
    created() {
        // 根据当前路由设置活跃项
        this.setActiveFromRoute()
    },
    watch: {
        $route() {
            this.setActiveFromRoute()
        },
    },
    methods: {
        navigateTo(route, index) {
            this.activeIndex = index
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
                (item) => item.route === currentPath
            )
            if (foundIndex !== -1) {
                this.activeIndex = foundIndex
            }
        },
    },
}
</script>

<style scoped>
.mobile-navigation {
    background-color: var(--color-white);
    height: 66px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 27px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 16px 8px 16px;
}

.function-nav {
    background-color: var(--color-white);
    padding: 12px 0;
    border-bottom: 1px solid var(--color-border);
}

.notification-area {
    display: flex;
    justify-content: space-around;
}

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
}

.nav-item i {
    margin-bottom: 4px;
    margin-right: 0;
    display: inline-block;
    width: 22px;
    height: 22px;
    background-color: var(--color-text-tertiary);
    border-radius: 50%;
}

.icon-nav{
    width: 22px;
    height: 22px;
    background-size: 100% 100%;
    margin-bottom: 4px;
}

/* 图标 */
.icon-notification {
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'/%3E%3C/svg%3E");
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'/%3E%3C/svg%3E");
}

.icon-bookmark {
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z'/%3E%3C/svg%3E");
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z'/%3E%3C/svg%3E");
}

.icon-like {
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z'/%3E%3C/svg%3E");
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z'/%3E%3C/svg%3E");
}

.icon-star {
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");
}

.icon-history {
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z'/%3E%3C/svg%3E");
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z'/%3E%3C/svg%3E");
}
</style>
