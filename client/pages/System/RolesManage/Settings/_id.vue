<template>
    <card-container>
        <div class="settings">
            <el-button type="primary" plain @click="submitChange(1)">
                保存设置
            </el-button>
            <el-button type="danger" plain @click="handleClear()">
                清空权限
            </el-button>
        </div>
        <el-tree
            ref="AppTree"
            :data="treeData"
            check-strictly
            show-checkbox
            node-key="permissionId"
            :default-expanded-keys="checkeds"
            :default-checked-keys="checkeds"
            :props="defaultProps"
        />
    </card-container>
</template>
<script>
import { getSysRolePermissionListToTree, setSysRolePermission, clearSysRoleAllPermission } from '@/http';
export default {
    name: 'Settings',
    validate ({ params }) {
        return params.id != undefined;
    },
    data () {
        const { id } = this.$route.params;
        return {
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            queryData: { //查询参数
                roleId: id
            },
            treeData: [], //表格数据
            sendData: {
                roleId: id,
                list: []
            },
            checkeds: [] //默认选中
        };
    },

    created() {
        this.init();
    },

    methods: {

        async init () {
            try {
                const { data: { list, checkeds } } = await this.$axios[getSysRolePermissionListToTree.method](getSysRolePermissionListToTree.url, { params: this.queryData });
                this.treeData = list || [];
                this.checkeds = checkeds && checkeds.map(item => item.permissionId) || [];
            } catch (error) {
                console.error(error);
            }
        },

        /**
         * 提交选择
         */
        async submitChange(a) {
            try {
                let nodes = this.$refs.AppTree.getCheckedNodes(false, false);
                this.sendData.list = nodes.map((item) => ({ parentId: item.parentId, permissionId: item.permissionId }));
                console.log(this.sendData);
                const { code } = await this.$axios[setSysRolePermission.method](setSysRolePermission.url, this.sendData);
                if (code == 200) {
                    this.$message.success(this.$t('msg.update_success'));
                    this.init();
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * 清除所有权限
         */
        handleClear () {
            this.$confirm(`此操作将会清除此角色所有的权限,是否继续?`, '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
                center: true,
                customClass: 'bg-warning'
            }).then(async () => {
                const { code } = await this.$axios[clearSysRoleAllPermission.method](clearSysRoleAllPermission.url, { data: this.table.queryData });
                if (code == 200) {
                    this.$message.success(this.$t('msg.deleted_success'));
                    this.init();
                }
            }).catch(() => {});
        }
    }
};
</script>
<style lang="less" scoped>
.settings{
    margin-bottom: 20px;
}
</style>
