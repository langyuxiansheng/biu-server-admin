<template>
    <card-container>
        欢迎您,管理员!
    </card-container>
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
