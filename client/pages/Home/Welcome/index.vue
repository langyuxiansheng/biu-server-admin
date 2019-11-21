<template>
    <div>
        <card-container>
            欢迎您,管理员!
        </card-container>
        <card-container>
            <el-row :gutter="20">
                <el-col :span="12">
                    图1
                </el-col>
                <el-col :span="12">
                    图2
                </el-col>
            </el-row>
        </card-container>
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
