<template>
    <div class="sidebar-menu" :class="{'sidebar-width': !isCollapse}">
        <h3 :title="isCollapse ? '点击展开' : '点击收起'" class="title" @click="isCollapse = !isCollapse">
            <template v-if="isCollapse">
                BSA
            </template>
            <template v-else>
                {{ $store.state.config.name }}
            </template>
            <p class="version">
                {{ $store.state.config.version }}
            </p>
        </h3>
        <el-menu :collapse-transition="false" :collapse="isCollapse" background-color="#000c17" text-color="#fff" active-text-color="#1890ff" :default-active="$route.path" unique-opened router>
            <template v-for="(menu,k) in sideMenus">
                <el-submenu :key="k" :index="menu.permissionId" popper-class="sidebar-submenu">
                    <template slot="title">
                        <i :class="menu.icon" />
                        <span>{{ menu.title }}</span>
                    </template>
                    <template v-if="menu.children">
                        <template v-for="item in menu.children">
                            <el-menu-item v-if="item.type == 1 && systems.includes(item.path) && user.isAdmin" :key="item.permissionId" :index="`${menu.path}/${item.path}`">
                                <span class="sidebar-menu-item" @click="setPermission(item)">
                                    {{ item.title }}
                                </span>
                            </el-menu-item>
                            <el-menu-item v-else-if="item.type == 1 && !systems.includes(item.path)" :key="item.permissionId" :index="`${menu.path}/${item.path}`">
                                <span class="sidebar-menu-item" @click="setPermission(item)">
                                    {{ item.title }}
                                </span>
                            </el-menu-item>
                        </template>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script type="text/ecmascript-6">
import { getSysRoleMenusToTree } from '@/http';
export default {
    name: 'Sidebar',
    data() {
        return {
            isCollapse: false,
            sideMenus: [],
            systems: ['PermissionManage', 'AdminManage', 'RolesManage']
        };
    },
    computed: {
        user() {
            if (window && window.localStorage) {
                const user = window.localStorage.getItem(`BIU-SERVER-ADMIN-INFO`);
                return typeof user === 'string' ? JSON.parse(user) : user || {};
            }
            return {};
        }
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            const { data } = await this.$axios[getSysRoleMenusToTree.method](getSysRoleMenusToTree.url);
            let arr = [{
                'permissionId': '6A7715BE30B7E36F239081784C91A1DB',
                'list': 1,
                'title': '首页',
                'path': '/Home',
                'name': 'Home',
                'icon': 'iconfont icon-home',
                'children': [
                    {
                        'permissionId': '94147C10163735F7BC8848C9586342F9',
                        'list': 1,
                        'title': '欢迎页',
                        'path': 'Welcome',
                        'name': 'Welcome'
                    }
                ]
            }];
            this.sideMenus = arr.concat(data) || [];
        },

        /**
         * 设置权限
         */
        setPermission(item) {
            console.log(item);
            if (item.children) {
                this.$store.dispatch('setPermission', item.children.map(v => v.name) || []);
            }
        }
    }
};
</script>
<style lang="less" scoped>
.sidebar-menu {
    // width: 210px;
    background: #001529;
    height: 100%;
    .title {
        padding: 20px 0;
        text-align: center;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: color .2s ease-in;
        &:hover{
            color: #409eff;
        }
        .version{
            font-size: 12px;
            margin-top: 10px;
        }
    }
    & /deep/ .el-menu {
        border-right: 0;
        .sidebar-menu-item {
            padding-left: 20px;
        }
    }
    .sidebar-submenu {
        background: #ccc;
    }
}
.sidebar-width{
    width: 200px;
}
</style>
