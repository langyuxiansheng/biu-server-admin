<template>
    <el-container class="layout-container">
        <el-container>
            <el-aside width="auto" class="rh-bg-white">
                <sidebar />
            </el-aside>
            <el-main>
                <el-header height="auto">
                    <header-top />
                </el-header>
                <tags-view />
                <div class="layout-view">
                    <nuxt />
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script type="text/ecmascript-6">
import HeaderTop from './components/Header';
import Sidebar from './components/Sidebar';
import TagsView from './components/TagsView';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Main',
    components: {
        HeaderTop,
        Sidebar,
        TagsView
    },
    computed: {
        key () {
            if (this.$route.name == undefined && this.$route.path == '/homeMenuItem') {
                //页面第一次加载时 清空 tab 标签页上的所有标签 回到首页
                this.delAllViews();
            }
            return this.$route.path + Date.parse(new Date());
        },
        ...mapGetters([
            'cachedViews'
        ])
    },

    mounted() {
        // console.log(this.$router);
    },

    methods: {
        ...mapActions([
            'delAllViews'
        ])
    }
};
</script>
