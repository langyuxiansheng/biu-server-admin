<template>
    <div>
        <el-row :gutter="20">
            <el-col :sm="24" :lg="24">
                <card-container>
                    <span> 欢迎您,管理员! </span>
                </card-container>
            </el-col>
            <el-col :sm="24" :lg="12">
                <card-container>
                    <el-tag v-if="sayText">
                        {{ sayText }}
                    </el-tag>
                </card-container>
            </el-col>
            <el-col :sm="24" :lg="12">
                <card-container>
                    <el-tag v-if="djtText" type="danger">
                        {{ djtText }}
                    </el-tag>
                </card-container>
            </el-col>
            <el-col :sm="24" :lg="8">
                <card-container>
                    图3
                </card-container>
            </el-col>
            <el-col :sm="24" :lg="8">
                <card-container>
                    图1
                </card-container>
            </el-col>
            <el-col :sm="24" :lg="8">
                <card-container>
                    图2
                </card-container>
            </el-col>
            <el-col :sm="24" :lg="12">
                <card-container>
                    图4
                </card-container>
            </el-col>
            <el-col :sm="24" :lg="12">
                <card-container>
                    图5
                </card-container>
            </el-col>
            <el-col :sm="24" :lg="24">
                <card-container>
                    图8
                </card-container>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// import { getSysRoleList, delSysAdminByIds } from '@/http';
export default {
    name: 'Welcome',
    head: {
        title: '欢迎页'
    },
    data () {
        return {
            sayText: '你知道你和星星有什么区别吗？那就是星星在天上，而你在我心里',
            djtText: '曾经我也是打算靠脸吃饭的，后来差点饿死才放弃的。'
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

        async init () {
            try {
                const { data: { content } } = await this.$axios.get(`https://api.tryto.cn/saylove/text`);
                this.sayText = content || '你知道你和星星有什么区别吗？那就是星星在天上，而你在我心里';
                this.$notify({
                    title: 'Hi~ o(*￣▽￣*)ブ',
                    message: this.sayText,
                    position: 'bottom-right'
                });
                setTimeout(() => {
                    this.getDjt();
                }, 1000 * 30);
            } catch (error) {
                console.log(error);
            }
        },

        async getDjt () {
            try {
                const { data: { content } } = await this.$axios.get(`https://api.tryto.cn/djt/text`);
                this.djtText = content || '曾经我也是打算靠脸吃饭的，后来差点饿死才放弃的。';
                this.init();
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
