<template>
    <card-container>
        <app-tables :table="table" :utils="table.utils" @pageChange="handleCurrentChange">
            <template>
                <el-button slot="clear" type="danger" plain @click="handleClear()">
                    清空权限
                </el-button>
            </template>
            <template slot="appTable">
                <app-tree-table :data="table.data" :cols="table.cols" border expand-all>
                    <template slot="operation" slot-scope="{data}">
                        <template v-if="data.col.key === 'checkedAll'">
                            <el-checkbox v-model="data.row[data.col.key]" :true-label="1" :false-label="0" @change="handleCheckboxAllChange(data.row)" />
                        </template>
                        <template v-else-if="data.col.key === 'list'">
                            <el-checkbox v-model="data.row[data.col.key]" :true-label="1" :false-label="0" @change="handleCheckboxChange(data.row)" />
                        </template>
                        <template v-else-if="data.col.key === 'add'">
                            <el-checkbox v-model="data.row[data.col.key]" :true-label="1" :false-label="0" @change="handleCheckboxChange(data.row)" />
                        </template>
                        <template v-else-if="data.col.key === 'del'">
                            <el-checkbox v-model="data.row[data.col.key]" :true-label="1" :false-label="0" @change="handleCheckboxChange(data.row)" />
                        </template>
                        <template v-else-if="data.col.key === 'edit'">
                            <el-checkbox v-model="data.row[data.col.key]" :true-label="1" :false-label="0" @change="handleCheckboxChange(data.row)" />
                        </template>
                        <template v-else-if="data.col.key === 'find'">
                            <el-checkbox v-model="data.row[data.col.key]" :true-label="1" :false-label="0" @change="handleCheckboxChange(data.row)" />
                        </template>
                        <template v-else>
                            {{ data.row[data.col.key] || '-' }}
                        </template>
                    </template>
                </app-tree-table>
            </template>
        </app-tables>
    </card-container>
</template>
<script>
import { getSysRolePermissionListToTree, setSysRolePermission, clearSysRoleAllPermission } from '@/http';
export default {
    name: 'Settings',
    layout: 'layout',
    validate ({ params }) {
        return params.id != undefined;
    },
    data () {
        const { id } = this.$route.params;
        return {
            table: {
                queryData: { //查询参数
                    roleId: id,
                    keyWord: null,
                    page: 1,
                    limit: 10
                },
                data: [], //表格数据
                total: 0, //总页数
                page: 1, //页码索引
                tableType: 3, //表格类型
                utils: { //表格工具栏
                    left: [{ slot: 'clear' }],
                    right: [{ slot: '' }],
                    cols: [12, 12]
                },
                cols: [ //表格列配置
                    {
                        key: 'title',
                        label: '菜单名',
                        align: 'left'
                    },
                    {
                        key: 'checkedAll',
                        width: '100px',
                        label: '全选',
                        align: 'center',
                        operation: true
                    },
                    {
                        key: 'list',
                        width: '100px',
                        label: '列表',
                        align: 'center',
                        operation: true
                    },
                    {
                        key: 'add',
                        width: '100px',
                        label: '增加',
                        align: 'center',
                        operation: true
                    },
                    {
                        key: 'del',
                        width: '100px',
                        label: '删除',
                        align: 'center',
                        operation: true
                    },
                    {
                        key: 'edit',
                        width: '100px',
                        label: '修改',
                        align: 'center',
                        operation: true
                    },
                    {
                        key: 'find',
                        width: '100px',
                        label: '查询',
                        align: 'center',
                        operation: true
                    }
                ]
            },
            sendData: {
                roleId: id,
                list: []
            }
        };
    },

    created() {
        this.init();
    },

    methods: {

        async init () {
            try {
                const { data: { list, total } } = await this.$axios[getSysRolePermissionListToTree.method](getSysRolePermissionListToTree.url, this.table.queryData);
                this.table.data = list && list.map((item) => {
                    if (item.list && item.find && item.add && item.edit && item.del) {
                        item.checkedAll = 1;
                    } else {
                        item.checkedAll = 0;
                    }
                    //子菜单
                    if (item.children && item.children.length > 0) {
                        item.children = item.children.map((v) => {
                            if (v.list && v.find && v.add && v.edit && v.del) {
                                v.checkedAll = 1;
                                item.checkedAll = 1;
                            } else {
                                v.checkedAll = 0;
                                item.checkedAll = 0;
                            }
                            return v;
                        });
                    }
                    return item;
                }) || [];
                this.table.total = total;
            } catch (error) {
                console.error(error);
            }
        },

        handleCurrentChange(page) {
            this.table.queryData.page = page;
            this.init();
        },

        /**
	     * 弹出层控制
	     */
        showDialog ({ type, id }) {
            if (type === 'add') {
                this.$refs.UserForm.init({ type, title: '新增用户' });
            } else if (type === 'update') {
                this.$refs.UserForm.init({ type, id, title: '编辑用户' });
            }
        },

        /**
         * 权限选择的全选回调
         */
        async handleCheckboxAllChange(row) {
            this.sendData.list = [];
            const checkedAll = { list: 1, find: 1, add: 1, del: 1, edit: 1, permissionId: row.permissionId, parentId: row.parentId };
            const noCheckedAll = { list: 0, find: 0, add: 0, del: 0, edit: 0, permissionId: row.permissionId, parentId: row.parentId };
            if (row.checkedAll) { //全选
                this.sendData.list.push(checkedAll);
                if (row.children && row.children.length) {
                    row.children.forEach(item => {
                        this.sendData.list.push({ ...checkedAll, permissionId: item.permissionId, parentId: item.parentId });
                    });
                }
            } else {
                this.sendData.list.push(noCheckedAll);
                if (row.children && row.children.length) {
                    row.children.forEach(item => {
                        this.sendData.list.push({ ...noCheckedAll, permissionId: item.permissionId, parentId: item.parentId });
                    });
                }
            }
            this.submitChange();
        },

        /**
         * 权限选择的回调
         */
        handleCheckboxChange({ list, find, add, del, edit, permissionId, parentId }) {
            let data = [{ list: 0, find: 0, add: 0, del: 0, edit: 0, permissionId, parentId }];
            if (add != undefined) data[0].add = add;
            if (del != undefined) data[0].del = del;
            if (edit != undefined) data[0].edit = edit;
            if (find != undefined) data[0].find = find;
            if (list != undefined) data[0].list = list;
            this.sendData.list = data;
            this.submitChange();
        },

        /**
         * 提交选择
         */
        async submitChange() {
            try {
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
