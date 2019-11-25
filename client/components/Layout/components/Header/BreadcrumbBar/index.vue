<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <template v-for="(item) in levelList">
            <el-breadcrumb-item v-if="item.meta.title" :key="item.path">
                <span v-if="item.meta.hidden" class="no-redirect">
                    {{ item.meta.title }}
                </span>
                <nuxt-link v-else-if="item.meta.title == '首页'" class="home-link" :to="item.redirect">
                    {{ item.meta.title }}
                </nuxt-link>
                <nuxt-link v-else :to="`/`">
                    {{ item.meta.title }}
                </nuxt-link>
            </el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>
<script>
export default {
    transition: 'breadcrumb',
    filters: {
        routeLink (path, params) {
            let pathArr = [];
            if (path && params) {
                //替换掉第一层的路由参数
                for (let par in params) {
                    pathArr.push(path.replace(':' + par, params[par]));
                }

                //替换第二层变量
                for (let par in params) {
                    for (let p in pathArr) {
                        if (par && pathArr[p].indexOf(':' + par) != -1) {
                            return pathArr[p].replace(':' + par, params[par]);
                        }
                    }
                }
            }
            return path;
        }
    },
    data () {
        return {
            levelList: null
        };
    },

    watch: {
        $route () {
            this.getBreadcrumb();
        }
    },

    created () {
        this.getBreadcrumb();
    },

    methods: {
        getBreadcrumb () {
            // console.log(this.$route);
            let matched = this.$route.matched.filter(item => item.meta);
            // console.log(matched);
            // const first = matched[0];
            /*   if (first && first.name !== 'home') {
                matched = [{ path: '/homeMenuItem', meta: { title: '首页' } }].concat(matched);
            } else if (first && first.name == 'home') {
                matched = [{ path: '/homeMenuItem', meta: { title: '首页' } }].concat(matched);
                matched.splice(1, 1);
            } */
            this.levelList = matched;
        }
    }
};
</script>
<style lang="less" scoped>
@import url('~@/assets/styles/layout/index.less');
</style>
