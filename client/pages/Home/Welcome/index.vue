<template>
    <div>
        <card-container>
            欢迎您,管理员!
        </card-container>
        <el-row :gutter="20">
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
            <el-col :sm="24" :lg="8">
                <card-container>
                    图3
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
            // const { data: { total, list } } = await getSysRoleList(this.table.queryData);
            // this.table.data = list;
            // this.table.total = total;
        }
    }
};
</script>
