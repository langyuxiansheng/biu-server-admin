<template>
    <div>
        欢迎您,管理员!
    </div>
</template>
<script>
// import { getSysRoleList, delSysAdminByIds } from '@/http';
export default {
    name: 'Welcome',
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
