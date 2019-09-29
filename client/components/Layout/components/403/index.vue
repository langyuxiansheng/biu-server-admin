<template>
    <el-container class="layout-container">
        <el-header height="auto">
            <header-top />
        </el-header>
        <el-container>
            <el-main>
                <div class="layout-view">
                    <transition name="fade" mode="out-in">
                        <el-row class="no-auth-container" type="flex">
                            <el-col :span="12">
                                <div class="no-auth-left">
                                    <div class="no-auth-bg" />
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="no-auth-right">
                                    <h1 class="title">
                                        403
                                    </h1>
                                    <p class="q">
                                        抱歉，你无权访问该页面
                                    </p>
                                    <el-button class="back">
                                        <router-link :to="{path:$route.query.redirect}">
                                            返回上一页
                                        </router-link>
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </transition>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script type="text/ecmascript-6">
import HeaderTop from './Header.vue';

export default {
    components: {
        HeaderTop
    }
};
</script>
<style lang="less" scoped>
    .no-auth-container{
        margin: 200px auto;
        .no-auth-left{
            .no-auth-bg{
                margin: 0 auto;
                height: 360px;
                max-width: 430px;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                background-size: contain;
                background-image:url('~@/assets/images/403.svg');
            }
        }
        .no-auth-right{
            .title{
                color: #434e59;
                font-size: 120px;
                font-weight: 600;
                line-height: 120px;
                margin-bottom: 24px;
            }
            .back{
                margin-top: 24px;
            }
        }
    }
</style>
