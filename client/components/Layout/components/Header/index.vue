<template>
    <div class="header-top">
        <breadcrumb-bar />
        <div class="header-right">
            <div class="box">
                <div class="user-menu">
                    <i class="iconfont icon-xiaoxi" />
                    <span class="vertical-line" />
                    <img v-if="user.avatar" v-image-preview class="user-avatar" :src="user.avatar" alt="avatar">
                    <img v-else class="user-avatar" :src="require(`@/assets/images/default-avatar.png`)" alt="avatar">
                    <el-dropdown @command="handleCommand">
                        <div class="user-content">
                            <h5>{{ user.adminName || '暂无' }}</h5>
                            <p class="user-name">
                                {{ user.roleName || '未知' }}
                            </p>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="personCenter">
                                个人中心
                            </el-dropdown-item>
                            <el-dropdown-item command="logout">
                                退出系统
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <personal-center ref="PersonalCenter" @refresh="init()" />
    </div>
</template>
<script  type="text/ecmascript-6">
import util from '@/lib/util';
import BreadcrumbBar from './BreadcrumbBar';
import PersonalCenter from './PersonalCenter';
export default {
    name: 'HeaderTop',
    components: {
        BreadcrumbBar,
        PersonalCenter
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

    methods: {
        async init() {
            setTimeout(() => { this.this.clear(); }, 1000 * 1);
        },

        /**
	     * 弹出层操作
	     */
        showDialog () {
            this.$refs.PersonalCenter.init({ title: '个人中心' });
        },

        /**
         * 下拉回调
         */
        handleCommand (command) {
            switch (command) {
            case 'logout': //退出系统
                this.logout(); break;
            case 'personCenter':
                this.showDialog(); break;
            }
        },

        /**
         * 退出系统
         */
        logout () {
            this.$confirm('您确定要退出系统吗?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
                center: true,
                customClass: 'bg-warning'
            }).then(() => {
                this.clear();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },

        clear() {
            util.clearCookie('BIU-SERVER-ADMIN-JWT');
            window.localStorage.removeItem('BIU-SERVER-ADMIN-INFO');
            this.$router.push(`/login`);
        }
    }
};
</script>
<style lang="less" scoped>
@header-height: 55px;
.header-top {
    display: flex;
    background: #fff;
    border-bottom: 1px solid #ccc;
    .header-right {
        flex: 1;
        .box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: @header-height;
        .user-menu {
            min-width: 166px;
            color: #fff;
                .icon-xiaoxi,
                .vertical-line {
                    font-size: 26px;
                    vertical-align: middle;
                }
                .vertical-line {
                    display: inline-block;
                    width: 1px;
                    height: 28px;
                    margin: 0 12px;
                    background-color: #fff;
                }
                .user-avatar {
                    width: 32px;
                    display: inline-block;
                    vertical-align: middle;
                }
                .el-dropdown {
                    vertical-align: middle;
                    color: #000;
                    margin-left: 8px;
                    font-size: 12px;
                    cursor: pointer;
                    .user-name {
                        margin-top: 5px;
                    }
                }
            }
        }
    }
}
</style>
